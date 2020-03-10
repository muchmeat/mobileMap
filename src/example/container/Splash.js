import {Component} from "react";
import SplashScreen from "react-native-splash-screen";
import {post} from "../../../utils/http";
import {storeAccount} from "../../../utils/account";
import Global from "../../../utils/Global";
import {ToastAndroid} from "react-native";

export default class Splash extends Component {
    constructor(props) {
        super(props);
        this._bootstrapAsync();
    }

    _bootstrapAsync = () => {
        post(Global.REQUEST_BASE_URL + "/tokenVali").then((res) => {
            // This will switch to the App screen or Auth screen and this loading
            // screen will be unmounted and thrown away.
            if (res && res.success) {
                storeAccount(res.data).then(() => this.props.navigation.navigate('App'));
            } else {
                this.props.navigation.navigate('Auth');
            }
            SplashScreen.hide();
        }).catch((error) => {
            this.props.navigation.navigate('Auth');
            ToastAndroid.show("请求服务异常", ToastAndroid.SHORT);
            SplashScreen.hide();
        });
    };

    render() {
        return null;
    }

}