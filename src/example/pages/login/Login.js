import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    ToastAndroid,
    ImageBackground,
    TouchableHighlight,
    TouchableOpacity,
    Dimensions,
    Image,
    TextInput,
    AsyncStorage
} from 'react-native';
import {Button} from 'react-native-elements'
import Svg from 'react-native-svg';
import IconLib from '../../../../assets/svg/IconLib';
import stylesT from '../../style/ThemeStyle';
import {post,getMockDetail} from "../../../../utils/http";
import Global from "../../../../utils/Global";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
import {StackActions, NavigationActions} from 'react-navigation';
import {storeAccount} from "../../../../utils/account";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            enClick: false,
            username: '',
            password: '',
        }
    }

    static navigationOptions = {
        header: null
    };

    submitLoginCredentials = () => {
        let _this = this;
        const {password, username, loading, enClick} = _this.state;
        if (loading || !enClick) return;
        _this.setState({loading: true}, () => {
            if (password && username) {
                let json = {
                    username: username, password: password, loginType: "Account"
                };
                // post(Global.REQUEST_BASE_URL + "/loginValiApp", json).then((res) => {
                getMockDetail("/loginValiApp2", json).then((res) => {
                    _this.setState({loading: false});
                    console.warn(res)
                    if (res && res.success) {
                        storeAccount(res.data).then(() => this.props.navigation.navigate('App'));
                    }
                }).catch((error) => {
                    _this.setState({loading: false});
                });
            } else {
                _this.setState({loading: false});
                ToastAndroid.show("用户名密码为空", ToastAndroid.SHORT);
            }
        });
    };

    _formUpdateState(text, targetName) {//表单输入框 更新状态
        this.setState({[targetName]: text}, () => {
            this.setState({
                enClick: !!(this.state.username && this.state.password)
            })
        });
    }

    render() {
        let _this = this;
        let {enClick} = _this.state;

        return (
            <View style={styles.container}>
                <ImageBackground style={{width: SCREEN_WIDTH, height: SCREEN_HEIGHT - 20}}
                                 source={require('../../../../assets/images/bg_login.png')}>
                    <View style={styles.logo}>
                        <Image style={{width: SCREEN_WIDTH - 120}} resizeMode={"contain"}
                               source={require("../../../../assets/images/logo2.png")}/>
                    </View>
                    <View style={{width: SCREEN_WIDTH, paddingTop: 10, alignItems: "center"}}>
                        <View style={{
                            width: SCREEN_WIDTH - 66,
                            flexDirection: "row",
                            marginBottom: 20,
                            borderBottomWidth: 1,
                            borderColor: "rgba(255,255,255,0.2)"
                        }}>
                            <View style={{flex: 1, justifyContent: "center"}}>
                                <Svg width={22} height={22} viewBox="0 0 1024 1024">{IconLib.IC_USER}</Svg>
                            </View>
                            <TextInput placeholder="请输入账号"
                                       placeholderTextColor={"rgba(255,255,255,0.4)"}
                                       keyboardType="email-address"
                                       underlineColorAndroid="transparent"
                                       style={{width: SCREEN_WIDTH - 110, color: "#FFF", fontSize: 16}}//input框的基本样式
                                       onFocus={() => {
                                       }}
                                       onChangeText={(text) => _this._formUpdateState(text, "username")}
                                       value={_this.state.username}
                                       onBlur={() => {
                                       }}/>
                        </View>
                        <View style={{
                            width: SCREEN_WIDTH - 66,
                            flexDirection: "row",
                            marginBottom: 20,
                            borderBottomWidth: 1,
                            borderColor: "rgba(255,255,255,0.2)"
                        }}>
                            <View style={{flex: 1, justifyContent: "center"}}>
                                <Svg width={25} height={25} viewBox="0 0 1024 1024">{IconLib.IC_PWD}</Svg>
                            </View>
                            <TextInput placeholder="请输入密码"
                                       placeholderTextColor={"rgba(255,255,255,0.4)"}
                                       secureTextEntry={true}
                                       underlineColorAndroid="transparent"
                                       style={{width: SCREEN_WIDTH - 110, color: "#FFF", fontSize: 16}}//input框的基本样式
                                       onChangeText={(text) => _this._formUpdateState(text, "password")}
                                       value={_this.state.password}
                                       onFocus={() => {
                                       }}
                                       onBlur={() => {
                                       }}/>
                        </View>
                    </View>
                    <Button title={"登 录"} titleStyle={{color: enClick ? "#FFF" : "rgba(255,255,255,0.6)", fontSize: 18}}
                            TouchableComponent={TouchableOpacity}
                            activeOpacity={1}
                            buttonStyle={{
                                backgroundColor: enClick ? stylesT.color.clickLine : "rgba(255,255,255,0.2)",
                                // borderWidth: 0,
                                borderRadius: 8,
                                marginHorizontal: 33,
                                elevation: 0,
                                height: 50,
                            }}
                            loading={_this.state.loading}
                            onPress={_this.submitLoginCredentials}/>
                </ImageBackground>
            </View>
        );
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    logo: {
        paddingTop: 35,
        width: SCREEN_WIDTH,
        justifyContent: "center",
        alignItems: "center",
    },
});
