import React, { Component } from 'react';
import {
    View,
    ScrollView, findNodeHandle, UIManager
} from "react-native";
import t from 'tcomb-form-native';
import {parseJson} from '../../../utils/common';
import ValidateUtil from '../../../utils/validator/ValidateUtil';
import defualt_themes from "../../example/style/ThemeStyle";

const Form = t.form.Form;

export default class RxForm extends Component {

    _commit(){
        let _this = this;
        let result = _this.refs.form.validate();
        let fields = _this.props.options.fields;
        let fj = {};
        for(let field in fields){
            if(fields[field].mode && (fields[field].mode === "imagePicker" || fields[field].mode === "filePicker")){
                fj[field] = _this._getValue(field);
            }else if(fields[field].mode && ("datetime" === fields[field].mode)){
                let utc = _this._getValue(field);
                if(utc){
                    fj[field] = ValidateUtil.dateFtt("yyyy-MM-dd hh:mm:ss",utc);
                }
            }else if(fields[field].mode && "time" === fields[field].mode){
                let utc = _this._getValue(field);
                if(utc){
                    fj[field] = ValidateUtil.dateFtt("hh:mm:00",utc);
                }
            }else if("date" === fields[field].mode){
                let utc = _this._getValue(field);
                if(utc){
                    fj[field] = ValidateUtil.dateFtt("yyyy-MM-dd",utc);
                }
            }
        }

        if(result.errors && result.errors.length){
            setTimeout(()=>{
                this.myScrollView.scrollTo({ y :0,animated: false});
                const handle = findNodeHandle(this.refs.form.getComponent(result.errors[0].path[0]));
                UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
                    let _pageY = pageY - _this.scrollY; //相对屏幕的绝对位置 => 相对scrollview的位置
                    this.myScrollView.scrollTo({ y :_pageY,animated: true});
                });
                try {
                    this.refs.form.getComponent(result.errors[0].path[0]).refs.input.focus();
                } catch (e) {
                }
            },200)
        }
        result = parseJson(result);
        result.value = {
            ...result.value,
            ...fj
        };
        return result;
    }

    _getValue(code){
        return this.refs.form.getComponent(code).state.value;
    }

    _setValue(code,v){
        let _this = this;
        _this.refs.form.getComponent(code).setState({
            value:v
        },function () {
            let v2 = _this.refs.form.getComponent(code).state.value;
            if(v2!=v)
                this.setState({value:v})
        })
    }

    _onLayout = (e) => {
        UIManager.measure(e.target, (x, y, width, height, pageX, pageY) => {
            //scroll相对屏幕的y坐标
            this.scrollY = pageY;
        });
    };

    render() {
        let _this = this;
        return (
            <View style={{flex:1,backgroundColor:defualt_themes.color.fontWhite,paddingLeft:10,marginTop:5}}>
                <ScrollView onLayout={(e)=>this._onLayout(e)}
                            ref={(view) => { this.myScrollView = view; }}
                            keyboardShouldPersistTaps={"handled"}
                            style={{ backgroundColor:defualt_themes.color.fontWhite,}}
                            >
                    <Form
                        ref="form"
                        type={_this.props.rows}
                        value={_this.props.values}
                        options={_this.props.options}
                    />
                </ScrollView>
                <View/>
            </View>
        )

    }
}
