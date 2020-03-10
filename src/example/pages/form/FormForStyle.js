import React, {Component} from 'react';
import {
    View,
    NativeModules
} from 'react-native';
import {connect} from 'react-redux';
import styles from '../../style/ThemeStyle';
import RxForm from '../../../base/components/RxForm';
import {isTel} from '../../../../utils/common';
import t from "tcomb-form-native";
import DefualtBtn from '../../../base/components/DefualtBtn';

class FormForStyle extends Component {

    static navigationOptions = {
        title: '表单信息',
    };


    componentWillMount() {
        let _this = this;
        let thfs = t.enums({
            "mt":"面谈",
            "ycth":"远程谈话",
            "sx":"书信",
        });
        let cxfs = t.enums({
            "1":"步行/骑行",
            "2":"自驾",
            "3":"公交/打的",
            "4":"其它",
            "5":"其它5",
            "6":"其它6",
            "7":"其它7",
            "8":"其它8",
            "9":"其它9",
            "10":"其它10",
            "11":"其它11",
            "12":"其它12",
            "13":"其它13",
            "14":"其它14",
            "15":"其它15",
        }, 'cxfs');
        _this.rows = t.struct({
            thry:t.String,
            sfjzd:t.maybe(t.Boolean),
            // cxfs:t.maybe(cxfs),
            thfs:thfs,
            cxfs:cxfs,
            thrq:t.maybe(t.Date),
            jdry:t.String,
            fj:t.maybe(t.list(t.String)),
            zp:t.maybe(t.list(t.String)),
        });
        _this.options = {
            fields: {
                zp:{
                    label:"现场照片",
                    mode:"imagePicker",
                    limit:4,
                },
                thry:{
                    label: '谈话人员',
                    placeholder:' 输入谈话人员',
                    maxLength:50,
                    onSubmitEditing:() => _this.refs.RxForm.refs.form.getComponent('thdd').refs.input.focus()
                },
                sfjzd:{
                    label: '是否居住地'
                },
                cxfs:{
                    label: '出行方式',
                    mode:"checkbox",   //radio单选，checkbox多选，默认为单选
                    number:2            //多选个数限制
                },
                thfs:{
                    label: '谈话方式',
                    mode:"radio",   //radio单选，checkbox多选，默认为单选
                },
                thrq:{
                    label:"谈话日期",
                    mode:"date",
                    maximumDate:new Date()
                },
                jdry:{
                    label:"接待人员",
                    placeholder:' 输入接待人员',
                },
                fj:{
                    label:"谈话材料",
                    mode:"filePicker",
                    navigation:this.props.navigation,
                    // fileType:"image",
                    limit:4,
                },
                pynr:{
                    label:"评语内容",
                    mode:"textarea",
                    placeholder:' 输入评语内容',
                    maxLength:500,
                    onSubmitEditing:() => _this._commit()
                }
            }
        };
        _this.values = {
            thrq:new Date()
        };
    }

    _commit(){
        let _this = this;
        let val = _this.refs.RxForm._commit();
        console.warn(val)
        // NativeModules.DocPickerModule.openFilePicker();
    }

    componentDidMount() {

    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    render() {
        let _this = this;
        return (
            <View style={styles.container}>
                <RxForm ref="RxForm" rows={_this.rows} options={_this.options} values={_this.values}/>
                <DefualtBtn text={"保  存"} click={()=>{_this._commit()}}/>
            </View>
        )
    }

    componentWillUnmount() {

    }

}

/**
 * this.props
 */
export default connect(
    (state) => ({
    }),
    (dispatch) => ({
    })
)(FormForStyle)
