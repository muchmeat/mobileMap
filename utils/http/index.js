import axios from 'axios';
import qs from 'qs'; //axios内置库，将json转为QueryString
import {ToastAndroid, AsyncStorage} from "react-native";
import Global from "../Global"

const CONNECT_TIMEOUT = 5000; //建立连接时间
const READ_TIMEOUT = 10000; //从服务器读取到可用资源所用的时间

//超时取消请求
function generateRequestCancelToken() {
    let cancelRequest;
    return async (config: Axios.AxiosXHRConfigBase<any>) => {
        config.cancelToken = new axios.CancelToken((cancelExecutor) => {
            cancelRequest = cancelExecutor
        });
        setTimeout(() => {
            if (cancelRequest instanceof Function) {
                cancelRequest('ECONNABORTED')
            }
        }, READ_TIMEOUT);
        return config;
    }
}

//新建一个 axios 实例
let instance = axios.create({
    headers: {'content-type': 'application/x-www-form-urlencoded'} //请求格式，数据需要利用qs库处理
});

//新建一个 axios 新建一个 axios 实例实例
let CancelToken = axios.CancelToken;
//存储请求 {urlPath:,cancel}
let pending = [];
//取消请求
let cancelPending = (config) => {
    let data = config.data;
    if (data && data.forwardUrl) {
        data = JSON.parse(data);
        let forwardUrl = data.forwardUrl;
        let urlPath = config.url + forwardUrl;
        pending.forEach((item, index) => {
            if (config) {
                if (item.urlPath === urlPath) {
                    // console.warn("取消请求1" + item.urlPath)
                    item.cancel();
                    pending.splice(index, 1);
                }
            } else {
                // console.warn("取消请求2" + item.urlPath)
                item.cancel();
                pending.splice(index, 1);
            }
        })
    }
};


instance.defaults.timeout = CONNECT_TIMEOUT;
const requestCancelToken = generateRequestCancelToken();
//请求拦截器 When timeout, it will throw an error: { message: 'ECONNABORTED' }, then you can handle this error.
// instance.interceptors.request.use(requestCancelToken, null);
//请求拦截器 总线请求地址加上具体请求地址为取消请求地址
instance.interceptors.request.use(config => {
    cancelPending(config);
    let data = config.data;
    if (data && data.forwardUrl) {
        data = JSON.parse(data);
        let forwardUrl = data.forwardUrl;
        config.cancelToken = new CancelToken(res => {
            let urlPath = config.url + forwardUrl;
            // console.warn("urlPath:" + urlPath)
            pending.push({'urlPath': urlPath, 'cancel': res})
        });
    }
    return config;
}, null);
//响应拦截器
instance.interceptors.response.use(
    response => {
        // 如果返回的状态码为200，说明接口请求成功,这里为方便获取将data作为Promise回调参数
        // 否则抛出错误
        if (response.status === 200) {
            return Promise.resolve(response.data);
        } else {
            console.warn(222)
            return Promise.reject(response);
        }
    },
    // 服务器状态码不以2开头，登录过期提示，错误提示等等
    // 下面列举几个常见的操作，其他需求可自行扩展
    error => {
        console.warn(error)
        // console.warn(JSON.stringify(error))
        // console.warn(error.response)
        if ((error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) || error.message === 'ECONNABORTED') {
            ToastAndroid.show("请求超时", ToastAndroid.SHORT);
            let config = error.config;
            //如果配置不存在或重试属性未设置，抛出promise错误
            if (!config || !config.retry) return Promise.reject(error);
            //设置一个变量记录重新请求的次数
            config.retryCount = config.retryCount || 0;
            // 检查重新请求的次数是否超过我们设定的请求次数
            if (config.retryCount >= config.retry) {
                return Promise.reject(error);
            }
            //重新请求的次数自增
            config.retryCount += 1;
            ToastAndroid.show("网络异常，尝试第" + config.retryCount + "次重连", ToastAndroid.SHORT);
            // 创建新的Promise来处理重新请求的间隙
            let back = new Promise(function (resolve) {
                setTimeout(function () {
                    resolve();
                }, config.retryInterval || 1);
            });
            //返回axios的实体，重试请求
            return back.then(function () {
                return instance(config);
            });
        } else {
            return Promise.reject(error.response);
        }
    }
);

/**
 * 请求头带上token
 */
async function mergeToken() {
    const token = await AsyncStorage.getItem('token');
    let options = {};
    if (token != null) {
        options = {
            headers: {
                "Authorization": token
            }
        }
    }
    return options;
}

async function formDataHeader() {
    const token = await AsyncStorage.getItem('token');
    let options = {
        headers: {
            "Authorization": Global.ACCESS_TOKEN,
            'content-type': 'multipart/form-data'
        }
    };
    if (token != null) {
        options = {
            headers: {
                "Authorization": Global.ACCESS_TOKEN,
                "AppAuthorization": token,
                'content-type': 'multipart/form-data'
            }
        }
    }

    return options;
}

async function jsonHeader() {
    const token = await AsyncStorage.getItem('token');
    let options = {
        headers: {
            'content-type': 'application/json'
        }
    };
    if (token != null) {
        options = {
            headers: {
                "Authorization": token,
                'content-type': 'application/json'
            }
        }
    }
    return options;
}

/**
 * 总线请求服务header
 * @returns {Promise<{headers: {Authorization: string, "content-type": string}}>}
 */
async function busJsonHeader() {
    const token = await AsyncStorage.getItem('token');
    let options = {
        headers: {
            "Authorization": Global.ACCESS_TOKEN,
            'content-type': 'application/json;charset=utf-8'
        }
    };
    if (token != null) {
        options = {
            headers: {
                "Authorization": Global.ACCESS_TOKEN,
                "AppAuthorization": token,
                'content-type': 'application/json;charset=utf-8'
            }
        }
    }
    return options;
}

export async function get(url, params) {
    const options = await mergeToken();
    return instance.request({
        method: 'GET',
        url: url,
        params: params,
        ...options
    });
}

export async function post(url, params) {
    const options = await mergeToken();
    return instance.request({
        method: 'POST',
        data: params ? qs.stringify(params) : null,
        url: Global.REQUEST_BASE_URL + url,
        ...options
    });
}

/**
 * 获取服务总线token
 *
 * {
    "access_token": "bG9jYWw6YzcwODE4MGItMzA0Ni00NjllLTlhZjctZDI4NzgyOWY0ODcy",
    "token_type": "Bearer",
    "expires_in": 36000,
    "refresh_token": "bG9jYWw6M2U5MWY2NGUtNDRlNS00ODA4LWE5NTAtYmYzNmY1ZWNmMmQz",
    "eCode": "local"
}
 * @returns {Promise<AxiosPromise<any>>}
 */
export async function postToken() {
    let options = {
        headers: {
            "Authorization": Global.BASIC_BASE64,
            'content-type': 'application/x-www-form-urlencoded'
        }
    };
    return instance.request({
        method: 'POST',
        url: Global.REQUEST_TOKEN_URL,
        data: "",
        ...options
    });
}

/**
 * 统一日志保存接口
 * json格式 其中optOrgCode必须为12位，否则不传
 * {
    "sysCode": "b581b2a86c742fb3016cdb1756f20010",
    "logType": 1,
    "logLevel": 3,
    "optUserNum": "009641",
    "optUserName": "测试",
    "optOrgCode": "32000000",
    "optOrgName": "安徽省公安厅",
    "optType": 7,
    "content": "内容"
}
 * @param json
 * @returns {Promise<AxiosPromise<any>>}
 */
export async function postLog(content, modelName, logLevel, logType, optType) {
    let options = {
        headers: {
            'content-type': 'application/json'
        }
    };

    let logJson = Global.logJson;
    //业务日志格式  xx使用什么功能/模块做了什么
    let newContent = logJson.optUserNum + logJson.optUserName + "使用" + modelName + "模块" + content;
    logJson.content = newContent;
    logJson.logLevel = logLevel;
    logJson.logType = logType;
    logJson.optType = optType;

    return instance.request({
        method: 'POST',
        url: Global.REQUEST_LOG_URL,
        data: logJson,
        ...options
    });
}

/**
 * 省厅总线提交post
 * @param url
 * @param params
 * @returns {Promise<AxiosPromise<any>>}
 */
export async function postBus(url, params) {
    const options = await busJsonHeader();
    if (params) {
        params.forwardUrl = url;
    } else {
        params = {forwardUrl: url};
    }
    return instance.request({
        url: Global.REQUEST_BUS_URL,
        method: 'POST',
        // data: params ? qs.stringify(params) : null,
        data: params ? JSON.stringify(params) : "",
        ...options
    });
}

/**
 * 省厅总线提交get
 * @param url 地址参数直接写
 * @param params
 * @returns {Promise<AxiosPromise<any>>}
 */
export async function getBus(url) {
    const options = await busJsonHeader();
    return instance.request({
        method: 'GET',
        url: url,
        cache: 'no-cache ',
        ...options
    });
}

export async function postBus2(url, json) {
    const token = await AsyncStorage.getItem('token');
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Authorization', token ? token : "");
    headers.append('content-type', 'application/json;charset=UTF-8');
    if (json) {
        json.forwardUrl = url;
    } else {
        json = {forwardUrl: url};
    }
    let data = encodeURI(JSON.stringify(json));
    return instance.request({
        url: Global.REQUEST_BUS_URL,
        method: 'POST',
        credentials: 'include', // cookies
        cache: 'no-cache ', // cookies
        headers: headers,
        // data: data,
        data: json ? json : {},
        ...options
    });
}

export async function postJson(url, json) {
    const options = await mergeToken();
    return instance.request({
        method: 'POST',
        data: json ? json : null,
        url: url,
        ...options
    });
}

export async function postForm(formData, upload) {
    const options = await formDataHeader();
    let time = 0;
    return instance.request({
        method: 'POST',
        data: formData ? formData : null,
        url: Global.REQUEST_BUS_URL,
        ...options,
        onUploadProgress: progressEvent => {
            let complete = progressEvent.loaded / progressEvent.total;
            let nowTime = new Date().getTime();
            complete = complete == 1 ? 0.99 : complete;
            // if (nowTime - time >= 1000 || complete == 1) {
            if (nowTime - time >= 1000) {
                time = nowTime;
                upload(complete)
            }
        }
    });
}


export async function upload(file, start, uploadProgress) {
    const options = await formDataHeader();
    let time = 0;
    return instance.request({
        method: 'POST',
        data: formData ? formData : null,
        url: Global.REQUEST_BUS_URL,
        ...options,
        onUploadProgress: progressEvent => {
            let complete = progressEvent.loaded / progressEvent.total;
            let nowTime = new Date().getTime();
            complete = complete == 1 ? 0.99 : complete;
            // if (nowTime - time >= 1000 || complete == 1) {
            if (nowTime - time >= 1000) {
                time = nowTime;
                upload(complete)
            }
        }
    });
}

/*****************************************************/

/**
 * json-server
 * @param urlKey
 * @param params
 * @returns {Promise<AxiosPromise<any>>}
 */
export async function getMockPageList(urlKey, params) {
    const options = {
        headers: {
            'content-type': 'application/json'
        }
    };
    console.warn(params)
    let _page = params.pageNum;
    let _limit = params.pageSize;
    let keyword = params.keyword;
    let desc = params.desc;
    let _order = undefined;
    let _sort = undefined;
    if (desc) {
        if (desc.indexOf("升序") !== -1) {
            _order = "asc";
        }
        if (desc.indexOf("降序") !== -1) {
            _order = "desc";
        }
        if (desc.indexOf("下发") !== -1) {
            _sort = "ZLXFSJ";
        }
        if (desc.indexOf("反馈") !== -1) {
            _sort = "ZLFKSJ";
        }
    }
    let newParams = {
        _page: _page,
        _limit: _limit,
        keyword: keyword,
        _sort: _sort,
        _order: _order,
    };
    return instance.request({
        method: 'get',
        url: Global.REQUEST_BASE_URL + urlKey + (newParams ? "?" + qs.stringify(newParams) : ""),
        ...options
    });
}

export async function getMockList(urlKey, params) {
    const options = {
        headers: {
            'content-type': 'application/json'
        }
    };
    console.warn(params)
    return instance.request({
        method: 'get',
        url: Global.REQUEST_BASE_URL + urlKey + "?zlId=" + params.zlId,
        ...options
    });
}

export async function getMockDetail(urlKey, params) {
    const options = {
        headers: {
            'content-type': 'application/json'
        }
    };
    return instance.request({
        method: 'get',
        url: Global.REQUEST_BASE_URL + urlKey + (params ? "?" + qs.stringify(params) : ""),
        ...options
    });
}

export async function getMockLogin(urlKey, params) {
    const options = {
        headers: {
            'content-type': 'application/json'
        }
    };
    console.warn(params)
    return instance.request({
        method: 'get',
        // data: params ? qs.stringify(params) : null,
        url: Global.REQUEST_BASE_URL + urlKey,
        ...options
    });
}

export async function postMock(url, data) {
    const options = {
        headers: {
            'content-type': 'application/json'
        }
    };
    return instance.request({
        method: 'PATCH',
        data: data,
        url: Global.REQUEST_BASE_URL + url,
        ...options
    });
}

export async function postMockTransfer(urlKey, params) {
    const options = {
        headers: {
            'content-type': 'application/json'
        }
    };
    console.warn(params)
    return instance.request({
        // method: 'post',
        method: 'PATCH',
        // data: params,
        data: {dutyUnitList: params.transfer},
        url: Global.REQUEST_BASE_URL + urlKey + "?zlId=" + params.zlId,
        ...options
    });
}


export async function postMockForm(formData, upload) {
    const options = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    };
    let count = 0;
    return instance.request({
        // method: 'POST',
        method: 'PATCH',
        data: formData ? formData : null,
        url: Global.REQUEST_BASE_URL + "/app/saveFile",
        ...options,
        onUploadProgress: progressEvent => {
            let complete = progressEvent.loaded / progressEvent.total;
            if (count % 20 == 0 || complete == 1) {
                upload(complete)
            }
            count++;
        }
    });
}

export async function getMockFile(onDownloadProgress) {
    const options = {
        responseType: 'blob'
    };
    let count = 0;
    return instance.request({
        method: 'get',
        url: "http://192.168.0.117/Voice_005.m4a",
        ...options,
        onDownloadProgress: progressEvent => {
            let complete = progressEvent.loaded / progressEvent.total;
            if (count % 10 == 0 || complete == 1) {
                onDownloadProgress(complete)
            }
            count++;
        }
    });
}