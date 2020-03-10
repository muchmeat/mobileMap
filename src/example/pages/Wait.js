/**
 * Created by Administrator on 2018/10/25.
 */
import React, {Component} from 'react';
import {
    AsyncStorage,
    StyleSheet,
    Text,
    TextInput,
    View,
    ScrollView,
    Dimensions,
    PixelRatio,
    TouchableHighlight
} from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';

export default
class Wait extends Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        header: null
    };

    render() {
        return (<View style={{flex: 1}}>
            <View style={{height: Dimensions.get('window').height, width: Dimensions.get('window').width}}>
                <TouchableHighlight onPress={()=>{
                    AsyncStorage.setItem("token", "");
                    this.props.navigation.dispatch(NavigationActions.navigate({routeName: "screen1"}))
                }}>
                    <Text style={{fontSize: 16}}>
                        该模块还在奋力开发中
                    </Text>
                </TouchableHighlight>
            </View>
        </View>)
    }
}