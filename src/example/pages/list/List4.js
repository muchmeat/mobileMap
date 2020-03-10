import React, {Component} from 'react';
import {
    PixelRatio,
    SwipeableFlatList,
    FlatList,
    StyleSheet,
    View,
    ImageBackground,
    Dimensions,
    Image,
    Text,
    ScrollView,
    TouchableOpacity,
    TouchableHighlight
} from 'react-native';
import {Input, Button, SearchBar, Card, ListItem, Icon} from 'react-native-elements'
import Svg from 'react-native-svg';
import IconLib from '../../../../assets/svg/IconLib';
import stylesT from '../../style/ThemeStyle';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const list = [
    {
        name: '文件小助手',
        subtitle: '[文件] 移动端技术小组近期工作...',
        value: '2',
        icon: 'av-timer',
        time: "11月27日"
    },
    {
        name: '工作汇报(日志)',
        subtitle: '[日志] 张涛的开发二部工作日志...',
        value: '0',
        icon: 'av-timer',
        time: "上午12:15"
    },
    {
        name: '钉邮',
        subtitle: '菜鸟裹裹:【状态更新】快递单尾...',
        time: "昨天"
    },
    {
        name: '钉盘',
        subtitle: '我在"移动端技术小组"上传了1个...',
        time: "11月27日"
    },
    {
        name: '移动端技术小组',
        subtitle: '[文件] 移动端技术小组近期工作...',
        time: "11月27日"
    },
    {
        name: '研发管理',
        subtitle: '欢迎 张航宇 加入本部门的群聊',
        time: "11月27日"
    },
    {
        name: '基础软件部研发管理群',
        subtitle: '张颖勇(张颖勇):刁总在微信群里...',
        time: "11月27日"
    },
    {
        name: '基础软件部研发管理群',
        subtitle: '张颖勇(张颖勇):刁总在微信群里...',
        time: "11月27日"
    }
]

export default class List4 extends Component {
    static navigationOptions = {
        title: '列表-4',
    };

    constructor(props) {
        super(props);
        this.state = {
            data: list
        }
    }


    _keyExtractor = (item, index) => index.toString();

    //每行的分隔线
    _separatorComponent = () => {
        return(
            <View style={{backgroundColor: "#FFF"}}>
                <View style={{
                    width: SCREEN_WIDTH - 72,
                    marginLeft: 72,
                    borderBottomWidth: stylesT.line.width,
                    borderBottomColor: stylesT.line.color
                }}/>
            </View>)
    };

    _renderItem = ({item, index}) => (
        <TouchableHighlight>
            <View style={{
                height: 64, width: SCREEN_WIDTH,
                justifyContent: "flex-start",
                alignItems: "center",
                flexDirection: "row",
                backgroundColor: "#FFF"
            }}>
                {index == 3 ? <View style={{justifyContent: "center", alignItems: "center", height: 64, width: 64}}>
                    <View style={{
                        justifyContent: "center",
                        alignItems: "center",
                        height: 48,
                        width: 48,
                        backgroundColor: "#3296FD",
                        borderRadius: 24
                    }}>
                        <Text style={{fontSize: 13, color: "#FFF"}}>永波</Text>
                    </View>
                </View> : <View style={{justifyContent: "center", alignItems: "center", height: 64, width: 64}}>
                    <Image source={require('../../../../assets/images/list.png')} style={{width: 48, height: 48}}/>
                </View>}
                <View style={{width: SCREEN_WIDTH - 64 - 70}}>
                    <View style={{
                        paddingTop: 16,
                        paddingBottom: 5,
                        justifyContent: "flex-start",
                        alignItems: "center",
                        flexDirection: "row",
                        flex: 1
                    }}>
                        <Text style={{fontSize: 16, color: "rgba(0, 0, 0,0.87)"}}>{item.name}</Text>
                    </View>
                    <View style={{
                        paddingTop: 5,
                        paddingBottom: 16,
                        justifyContent: "flex-start",
                        alignItems: "center",
                        flexDirection: "row",
                        flex: 1
                    }}>
                        <Text style={{fontSize: 14, color: "rgba(0, 0, 0,0.12)"}}
                              numberOfLines={1}>{item.subtitle}</Text>
                    </View>
                </View>
                <View
                    style={{justifyContent: "center", alignItems: "flex-end", height: 64, width: 70, paddingRight: 16}}>
                    <View style={{paddingTop: 16, paddingBottom: 5}}>
                        <Text style={{fontSize: 12, color: "#C0C2C3", opacity: 0.38}}>{item.time}</Text>
                    </View>
                    <View style={{paddingTop: 5, paddingBottom: 16}}>
                        {index == 3 ? <View style={{
                            height: 18,
                            width: 22,
                            borderRadius: 9,
                            backgroundColor: "#FF4141",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <Text style={{color: "#FFF", fontSize: 10}}>12</Text>
                        </View> : <View style={{
                            height: 18,
                            width: 22,
                            borderRadius: 9,
                            backgroundColor: "#fff",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>

                        </View>}
                    </View>
                </View>
            </View>
        </TouchableHighlight>
    )

    //侧滑菜单渲染
    getQuickActions = ({item})=> {
        return (<View style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: "center"
        }}>

            <View style={{
                backgroundColor: "#F25643",
                height: 64,
                alignItems: 'center',
                justifyContent: 'center',
                width: 70,
            }}>
                <Text style={{
                    color: "#FFF",
                    fontSize: 15
                }}>{"移除"}</Text>
            </View>

        </View>)
    };

    render() {
        return (
            <ScrollView style={styles.container}>
                <SwipeableFlatList data={list}
                                   renderItem={this._renderItem}
                                   keyExtractor={this._keyExtractor}
                                   ItemSeparatorComponent={this._separatorComponent}
                                   renderQuickActions={this.getQuickActions}//创建侧滑菜单
                                   maxSwipeDistance={70}//可展开（滑动）的距离
                                   bounceFirstRowOnMount={false}//进去的时候不展示侧滑效果
                />
            </ScrollView>
        );
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }

});
