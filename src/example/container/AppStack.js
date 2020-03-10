import React from 'react';
import {createStackNavigator, createBottomTabNavigator, createSwitchNavigator} from 'react-navigation';
import Icon from "react-native-vector-icons/Ionicons";
import ThemeStyle from '../style/ThemeStyle'
import Wait from '../pages/Wait'
import MainPage from '../pages/main/MainPage'
import MainPage2 from '../pages/main/MainPage2'
import PageList from '../pages/main/PageList'
import MapDemo from '../pages/main/MapDemo'
import MapDemoList from '../pages/main/MapDemoList'
import List1 from '../pages/list/List1'
import List2 from '../pages/list/List2'
import List3 from '../pages/list/List3'
import List4 from '../pages/list/List4'
import screen1 from '../pages/login/screen1'
import screen2 from '../pages/login/screen2'
import screen3 from '../pages/login/screen3'
import Splash from './Splash'
import Login from '../pages/login/Login'
import form from '../pages/form/Form'
import Detail from '../pages/form/Detail'
import Detail2 from '../pages/form/Detail2'
import DynamicsForm from '../pages/form/DynamicsForm'
import FormForStyle from '../pages/form/FormForStyle'
import VideoPlay from '../../base/components/VideoPlay'
import StackViewStyleInterpolator from 'react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator';
import BzdzkMap from "../pages/map/BzdzkMap";
import MainMap from "../pages/map/MainMap";
import PointMap from "../pages/map/PointMap";
import PolygonMap from "../pages/map/PolygonMap";
import PolylineMap from "../pages/map/PolylineMap";
import CircleMap from "../pages/map/CircleMap";
import HeatMap from "../pages/map/HeatMap";
import MultiPointMap from "../pages/map/MultiPointMap";

const Tabs = createBottomTabNavigator({
    'Home': {
        screen: MainPage,
        navigationOptions: {
            tabBarLabel: '首页', // tabBar显示的文字
            tabBarIcon: ({tintColor}) => ( // tabBar显示的图标
                // 这里使用了react-native-vector-icons, 不熟悉的请看上方连接
                <Icon name='md-planet' color={tintColor} size={24} style={ThemeStyle.tabBarImage}/>
            )
        }
    },
    'Page': {
        screen: createStackNavigator({P: PageList}, {
            // headerLayoutPreset: 'center',
            navigationOptions: {
                headerStyle: {
                    backgroundColor: ThemeStyle.color.theme,
                    height: 48,
                },
                headerTitleStyle: {
                    fontSize: ThemeStyle.font.size_L,
                    color: ThemeStyle.color.fontWhite
                },
                //返回图标颜色
                headerTintColor: '#fff',
            }
        }),
        navigationOptions: {
            tabBarLabel: '页面', // tabBar显示的文字
            tabBarIcon: ({tintColor}) => ( // tabBar显示的图标
                // 这里使用了react-native-vector-icons, 不熟悉的请看上方连接
                <Icon name='md-today' color={tintColor} size={24} style={ThemeStyle.tabBarImage}/>
            )
        }
    },
    'Component': {
        screen: BzdzkMap,
        navigationOptions: {
            tabBarLabel: '组件', // tabBar显示的文字
            tabBarIcon: ({tintColor}) => ( // tabBar显示的图标
                // 这里使用了react-native-vector-icons, 不熟悉的请看上方连接
                <Icon name='md-options' color={tintColor} size={24} style={ThemeStyle.tabBarImage}/>
            )
        }
    }
}, {
    headerMode: 'screen',
    initialRouteName: 'Home',
    swipeEnabled: false,
    // tabBarPosition: 'bottom',
    tabBarOptions: {
        activeTintColor: ThemeStyle.color.theme,
        inactiveTintColor: '#999',
        // pressColor: "#26D4FE",   //不使用涟漪效果
        style: {
            height: 48,
            backgroundColor: '#fff',
        },
        indicatorStyle: {
            height: 0, // 不显示indicator
        },
        labelStyle: ThemeStyle.tabBarLabel,
        tabStyle: ThemeStyle.tabBarItem,
        iconStyle: ThemeStyle.tabBarIcon,
        showIcon: true, // 是否显示图标, 默认为false
        showLabel: true, // 是否显示label
    },
});

const TITLES = ["React Native模板", "通用页面", "通用组件"];
//设置嵌入stack的tab Title
Tabs.navigationOptions = ({navigation}) => {
    if (navigation.state.index === 1) {
        return {
            header: null
        };
    } else {
        return {
            headerTitle: TITLES[navigation.state.index]
        };
    }
};

const AppStack = createStackNavigator({
    tabs: {screen: Tabs},
    screen1: {screen: screen1},
    screen2: {screen: screen2},
    screen3: {screen: screen3},
    Login: {screen: Login},
    main: {screen: MainPage},
    form: {screen: form},
    dynamicsForm: {screen: DynamicsForm},
    List1: {screen: List1},
    List3: {screen: List3},
    List2: {screen: List2},
    List4: {screen: List4},
    Detail: {screen: Detail},
    Detail2: {screen: Detail2},
    MainPage: {screen: MainPage},
    MainPage2: {screen: MainPage2},
    FormForStyle: {screen: FormForStyle},
    VideoPlay: {screen: VideoPlay},
}, {
    initialRouteName: 'tabs', // 默认显示界面
    headerMode: 'screen',       //header的显示模式，值为none时不显示
    // headerTransitionPreset: "fade-in-place",
    navigationOptions: {       //此处设置的navigationOptions属性为所有页面使用，页面可以设置static navigationOptions，将此属性覆盖
        //右边的button，可在页面上写
        // headerRight:<View style={{paddingRight:20,height:50,width:60,alignItems:"center"}}><Text style={{flex:1}} onPress={()=>{alert("曹尼玛啊")}}>重中之重</Text></View>,
        headerStyle: {
            backgroundColor: ThemeStyle.color.theme,
            height: 51,
        },
        headerTitleStyle: {
            fontSize: ThemeStyle.font.size_L,
            color: ThemeStyle.color.fontWhite
        },
        //返回图标颜色
        headerTintColor: '#fff',
        //返回图标按住的样色（MD）
        // headerPressColorAndroid: "transparent",
        //header是否透明，默认false不透明
        // headerTransparent:true
        //返回上一页手势功能，在ios默认true，Android默认false
        // gesturesEnabled:true
        //手势水平垂直滑动多少触发
        // gestureResponseDistance:{
        //     horizontal:25,
        //     vertical:100,
        // }
        //手势滑动的方向
        // gestureDirection:"right-to-left"
        // headerMode:"none"
        //path属性适用于其他app或浏览器使用url打开本app并进入指定页面。path属性用于声明一个界面路径，例如：【/pages/Home】。此时我们可以在手机浏览器中输入：app名称://pages/Home来启动该App，并进入Home界面。
        // path:'../pages/MainPage'
    },
    transitionConfig: () => ({ //自定义动画效果
        screenInterpolator: StackViewStyleInterpolator.forHorizontal,
    })
});

const AppMapStack = createStackNavigator(
    {
        Main: {
            screen: AppStack,
        },
        Map: {
            screen: BzdzkMap,
        },
        Map2: {
            screen: MapDemo,
        },
    },
    {
        mode: 'modal',
        headerMode: 'none',
    }
);
const MobileMapStack = createStackNavigator(
    {
        MapDemoList: {
            screen: MapDemoList
        },
        BzdzkMap: {
            screen: BzdzkMap
        },
        MainMap: {
            screen: MainMap
        },
        PointMap: {
            screen: PointMap
        },
        PolygonMap: {
            screen: PolygonMap
        },
        PolylineMap: {
            screen: PolylineMap
        },
        CircleMap: {
            screen: CircleMap
        },
        HeatMap: {
            screen: HeatMap
        },
        MultiPointMap: {
            screen: MultiPointMap
        }
    },
    {
        mode: 'modal',
        headerMode: 'none',
    }
);

export default createSwitchNavigator(
    {
        Splash: Splash,
        // Auth: AppMapStack,
        // Auth: PageList,
        Auth: MobileMapStack,
        // Auth: MapDemo,
        App: AppMapStack,
    },
    {
        initialRouteName: 'Splash'
    });