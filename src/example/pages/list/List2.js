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
import listStyle from '../../style/TwoLineList';
import {list} from "../../../base/tcom/tcomb";
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const datalist = [
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
        subtitle: '张颖勇(张颖勇):刁总在微信群里的发言',
        time: "11月27日"
    }
]

export default class List2 extends Component {
    static navigationOptions = {
        title: '列表-2',
    };

    constructor(props) {
        super(props);
        this.state = {
            data: datalist
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
                borderBottomWidth: stylesT.linePx.width,
                borderBottomColor: stylesT.linePx.color
            }}/>
        </View>)
    };

    _renderItem = ({item, index}) => (
        <TouchableHighlight>
            <View style={listStyle.container}>
                {index == 3 ? <View style={listStyle.header_icon_container}>
                    <View style={listStyle.text_icon_container}>
                        <Text style={listStyle.text_icon}>永波</Text>
                    </View>
                </View> : <View style={listStyle.header_icon_container}>
                    <Image source={require('../../../../assets/images/list.png')} style={listStyle.header_icon}/>
                </View>}
                <View style={listStyle.line_container}>
                    <View style={listStyle.first_Line}>
                        <Text style={listStyle.firstText}>{item.name}</Text>
                    </View>
                    <View style={listStyle.scrend_Line}>
                        <Text style={listStyle.secondText}
                              numberOfLines={1}>{item.subtitle}</Text>
                    </View>
                </View>
                <View
                    style={listStyle.time_container}>
                    <View style={listStyle.time_line}>
                        <Text style={listStyle.time_Text}>{item.time}</Text>
                    </View>
                    <View style={listStyle.message_line}>
                        {index == 3 ? <View style={listStyle.message_icon}>
                            <Text style={listStyle.message_text}>12</Text>
                        </View> : <View style={{height: 16,
                            width: 20,
                            borderRadius: 8,
                            backgroundColor: "#FFF",
                            justifyContent: "center",
                            alignItems: "center"}}>

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
                height: 72,
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
                <SwipeableFlatList data={datalist}
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
