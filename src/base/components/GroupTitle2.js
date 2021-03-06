import React, { Component } from 'react';
import {
    View
} from "react-native";
import components from "../../example/style/Components";
import {Text} from "react-native-elements";

export default class GroupTitle2 extends Component {
    render() {
        return (
            <View style={components.groupTitle2.view}>
                <Text style={components.groupTitle2.text}>{this.props.title}</Text>
                {this.props.number?
                    <Text style={components.groupTitle2.textNumber}>{this.props.number}</Text>:null
                }
            </View>
        )
    }
}
