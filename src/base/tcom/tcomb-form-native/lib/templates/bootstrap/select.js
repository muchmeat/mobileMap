import IconLib from "../../../../../../../assets/svg/IconLib";
import Svg from 'react-native-svg'
import formStyle from '../../stylesheets/formStyle'
import {indexOfArray} from '../../util'
import Icon from "react-native-vector-icons/Feather";
import {Component} from "react";
let React = require("react");
let { View,
    Text,
    Modal,
    ScrollView,
    TouchableOpacity
} = require("react-native");

function select(locals) {
    if (locals.hidden) {
        return null;
    }

    let isMaybe = locals.isMaybe;
    let formGroupStyle = formStyle.formGroup.normal;
    let controlLabelStyle = formStyle.label.normal;

    let notNull = isMaybe ? <View style={{width:10}}/>:<View style={{width:10}}><Text style={formStyle.notNull}>*</Text></View>;

    let show = false;
    if(locals.value){
        controlLabelStyle = locals.value != "|show" ? formStyle.label.hasValue : formStyle.label.normal;
        show = locals.value.indexOf("|show") > -1;
        if(show)
            locals.value = locals.value.substring(0,locals.value.length - 5);
    }

    let label = locals.label ? (
        <View style={{flexDirection:"row"}}>{notNull}<Text style={[controlLabelStyle]}>{locals.label}</Text></View>
    ) : null;

    let error =
        locals.hasError ? (
            <View style={[formStyle.error,{paddingLeft:0}]}>
                <Svg height={14} width={14} viewBox="0 0 1024 1024">
                    {IconLib.FORM_ERROR}
                </Svg>
                <View style={formStyle.errorView}>
                    <Text accessibilityLiveRegion="polite" style={formStyle.errorText}>
                        {locals.error ? locals.error : (locals.label ? locals.label.replace("*","") + "不能为空" : "不能为空")}
                    </Text>
                </View>
            </View>
        ) : null;

    let text = "";
    let options = [];
    for(let opt of locals.options){
        if(!locals.mode || locals.mode==="radio"){
            if(opt.value === locals.value){
                text = opt.text;
            }
            options.push(<TouchableOpacity activeOpacity={1}
                                           key={opt.value}
                                           onPress={()=>locals.onChange(opt.value)}>
                <View style={formStyle.picker.tabView}>
                    <Text style={formStyle.picker.tabText}>{(!opt.value) ? "请选择" : opt.text}</Text>
                </View>
            </TouchableOpacity>);
        }else if(locals.mode==="checkbox"){
            let index = -1;
            if(locals.value){
                index = indexOfArray(locals.value.split(","),opt.value);
                if(index!==-1)
                    text += opt.text + "；"
            }
            if(opt.value)
            options.push(<PickerItem key={opt.value} checked={index!==-1} index={index} text={opt.text} lose={()=>{
                locals._click = true;
                if(locals._value){
                    let arr = locals._value.split(",");
                    let i = indexOfArray(arr,opt.value);
                    if(i===-1){
                        arr = locals.value.split(",");
                        i = indexOfArray(arr,opt.value);
                        arr.splice(i,1)
                    }else {
                        arr.splice(i,1)
                    }
                    locals._value = arr.join(",");
                }else {
                    let arr = locals.value.split(",");
                    let i = indexOfArray(arr,opt.value);
                    arr.splice(i,1);
                    locals._value = arr.join(",");
                }
            }} click={()=>{
                locals._click = true;
                if(locals._value)
                    locals._value = locals._value + "," + opt.value;
                else if(locals.value)
                    locals._value = locals.value + "," + opt.value;
                else
                    locals._value = opt.value;
            }} />);
        }
    }

    return (
        <View style={formGroupStyle}>
            <Modal animationType={"none"}
                   visible={show}
                   transparent={true}
                   onRequestClose={() => locals.onChange(locals.value.substring(0,locals.value.length - 5))}>
                    <TouchableOpacity activeOpacity={1} underlayColor='transparent' style={formStyle.picker.modal}
                                      onPress={()=>locals.onChange(locals.value)}>
                        <TouchableOpacity activeOpacity={1} style={[formStyle.picker.modalView,{paddingTop:10}]}>
                            <ScrollView keyboardShouldPersistTaps={"handled"}>
                                {options}
                            </ScrollView>
                            {locals.mode === "checkbox" ?
                                <View style={formStyle.picker.btnView}>
                                    <TouchableOpacity activeOpacity={0.5} style={{flex:1}} onPress={()=>{locals.onChange(locals.value)}}>
                                        <View style={formStyle.picker.btn}><Text style={formStyle.picker.cancel}>取消</Text></View>
                                    </TouchableOpacity>
                                    <TouchableOpacity activeOpacity={0.5} style={{flex:1}} onPress={()=>{
                                        locals.onChange(locals._click ? locals._value : locals.value)
                                    }}>
                                        <View style={formStyle.picker.btn}><Text style={formStyle.picker.makeSure}>确定</Text></View>
                                    </TouchableOpacity>
                                </View>
                                :null
                            }
                        </TouchableOpacity>
                    </TouchableOpacity>
            </Modal>
            <View style={formStyle.picker.view}>
                <View style={formStyle.picker.label}>
                    {label}
                </View>
                <View style={formStyle.picker.pickerView}>
                    <TouchableOpacity activeOpacity={1} onPress={()=>{
                        if(locals.enabled) return;
                        locals.onChange((locals.value ? locals.value : "") +"|show");
                    }}>
                        <View style={{flex:1,flexDirection:"row",justifyContent:"flex-start",alignItems:"center"}}>
                            <View style={{flex:1}}><Text numberOfLines={1} style={formStyle.picker.pickerText}>{(!locals.value) ? "请选择" : text}</Text></View>
                            <View style={{width:40,height:55,justifyContent:"center",alignItems:"center"}}>
                                <Svg height={24} width={24} viewBox="0 0 1024 1024">{IconLib.IC_TODOWN}</Svg>
                            </View>
                        </View>
                    </TouchableOpacity>
                    {error}
                </View>
            </View>
        </View>
    );
}

class PickerItem extends Component{

    constructor(props){
        super(props);
        this.state = {
            checked:this.props.checked ? this.props.checked :false
        }
    }

    _setCheck(bool){
        this.setState({
            checked:bool
        },()=>{
            if(bool)
                this.props.click();
            else
                this.props.lose();
        })
    }

    render(){
        return(
            <TouchableOpacity activeOpacity={1}
                              onPress={()=>{
                                  this._setCheck(!this.state.checked);
                              }}>
                <View style={formStyle.picker.tabView}>
                    <View style={{marginRight:10}}><Icon size={16} name={this.state.checked ? "check-square" : "square"} color={formStyle.picker.checkColor}/></View>
                    <Text style={formStyle.picker.tabText}>{this.props.text}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

module.exports = select;
