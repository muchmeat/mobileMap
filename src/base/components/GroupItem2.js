import React, { Component } from 'react';
import {
    View,
    TouchableHighlight
} from "react-native";
import components from "../../example/style/Components";
import themeStyle from "../../example/style/ThemeStyle";
import {Text} from "react-native-elements";

export default class GroupItem2 extends Component {
    render() {
        return (
            <TouchableHighlight activeOpacity={1} underlayColor='transparent' style={{paddingLeft:10}} onPress={()=>{
                if(this.props.onClick)
                    this.props.onClick();
            }}>
                <View style={components.groupItem2.container}>
                    <View style={components.groupItem2.left}>
                        <Text numberOfLines={1} style={components.groupItem2.leftText}>{this.props.text}</Text>
                    </View>
                    <View style={[components.groupItem2.right,this.props.right ? { paddingRight: 0} : null]}>
                        <Text style={[components.groupItem2.rightText,this.props.onClick?{color:themeStyle.color.clickLine}:null]}>{this.props.value}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        )

    }
}
