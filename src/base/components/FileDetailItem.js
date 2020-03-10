/**
 * Created by zk on 2018/3/22.
 */
import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableHighlight, PixelRatio,
} from 'react-native';
import Svg from 'react-native-svg';
import ThemeStyle from "../../example/style/ThemeStyle";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import IconLib from "../../../assets/svg/IconLib";
import {NavigationActions} from "react-navigation";

/**
 * video:
 * path,fullBuffer,poster,navigation
 */
export default class FileDetailItem extends Component {

    render(){
        const {name,type,navigation,video} = this.props;
        let svg;
        if("xls,xlsx".indexOf(type.toLowerCase()) > -1){
            svg = IconLib.FILE_EXCEL;
        }else if("doc,docx".indexOf(type.toLowerCase()) > -1){
            svg = IconLib.FILE_DOCX;
        }else if("mp4".indexOf(type.toLowerCase()) > -1){
            svg = IconLib.FILE_VIDEO;
        }
        return (
            <TouchableHighlight activeOpacity={1} underlayColor='transparent' style={{paddingLeft:10}} onPress={()=>{
                if(type==="mp4"){
                    navigation.dispatch(NavigationActions.navigate({routeName: "VideoPlay",params:video}))
                }
            }}>
                <View style={{height:40,backgroundColor:"#FFF",paddingLeft:5,flexDirection:"row",justifyContent:"flex-start",alignItems:"center",borderColor:ThemeStyle.form.BORDER_COLOR_GRAY,borderBottomWidth:1/PixelRatio.get()}}>
                    <Svg height={20} width={20} viewBox={"0 0 1024 1024"}>{svg}</Svg>
                    <Text style={{fontSize:16,paddingLeft:10,color:ThemeStyle.color.clickLine}}>{name}</Text>
                </View>
            </TouchableHighlight>
            );
    }
}