/**
 * 组件样式
 * Created by zk on 18/5/30.
 */

import defualt_themes from "./ThemeStyle"
import {PixelRatio} from "react-native";

const components = Object.freeze({
    //正在加载图标
    load:{
        view:{
            justifyContent:"center",
            alignItems:"center",
            flex:1
        },
        image:{
            height:32,
            width:32,
            resizeMode: 'contain'
        }
    },
    //提交按钮
    defaultBtn:{
        view:{
            height:60,
            borderTopWidth:defualt_themes.linePx.width,
            borderColor:defualt_themes.lineDp.color,
            width:defualt_themes.screen.width,
            backgroundColor:defualt_themes.color.backgroundColor,
            alignItems:"center",
            marginBottom:0,
            justifyContent:"center"
        },
        touch:{
            width:defualt_themes.screen.width - 30,
            height:42,
            backgroundColor:defualt_themes.color.theme,
            alignItems:"center",
            justifyContent:"center",
            borderRadius:4,
            elevation:0
        },
        text:{
            fontSize:defualt_themes.font.size_L,
            color:defualt_themes.color.fontWhite
        }
    },
    //悬浮菜单
    modalMenu:{
        modal:{
          flex:1
        },
        itemView:{
            width:100,
            height:45,
            backgroundColor:defualt_themes.color.theme,
            justifyContent:"center",
            alignItems:"center"
        },
        text:{
            color:defualt_themes.color.fontWhite
        },
        tip:{
            position:"absolute",
            right:10
        },
        tipTop:{
            width: 0,
            height: 0,
            backgroundColor: 'transparent',
            borderStyle: 'solid',
            borderLeftWidth: 10,
            borderRightWidth: 10,
            borderBottomWidth: 15,
            borderLeftColor: 'transparent',
            borderRightColor: 'transparent',
            borderBottomColor: defualt_themes.color.theme,
            position:"absolute",
            right:10,
            top:-15
        }
    },
    //分组列表头
    groupTitle:{
        view:{
            width:defualt_themes.screen.width,
            height:35,
            backgroundColor:defualt_themes.color.defaultBg,
            justifyContent:"center",
            paddingLeft:20
        },
        text:{
            fontSize:defualt_themes.font.size_S
        }
    },
    groupTitle2:{
        view:{
            marginTop:10,
            backgroundColor:defualt_themes.color.backgroundColor,
            width:defualt_themes.screen.width,
            // height:45,
            justifyContent:"space-between",
            alignItems:"center",
            paddingLeft:15,
            flexDirection:"row",
            // borderBottomColor:defualt_themes.form.BORDER_COLOR_GRAY,
            // borderBottomWidth:1/PixelRatio.get()
        },
        text:{
            marginVertical:12,
            fontSize:defualt_themes.font.size_M,
            paddingRight:10
        },
        textNumber:{
            fontSize:defualt_themes.font.size_S,
            color:defualt_themes.form.HELP_COLOR,
            paddingRight:10
        }
    },
    //分组列表item
    groupItem:{
        container:{
            // width:defualt_themes.screen.width,
            height:45,
            paddingLeft:15,
            marginBottom:2,
            backgroundColor:defualt_themes.color.backgroundColor,
            flexDirection:"row"
        },
        left:{
            width:120,
            justifyContent:"center",
            alignItems:"flex-start"
        },
        leftText:{
            fontSize:defualt_themes.font.size_M,
            color:defualt_themes.color.fontBlack
        },
        right:{
            flex:1,
            paddingRight:15,
            justifyContent:"center",
            alignItems:"flex-end"
        },
        rightText:{
            fontSize:defualt_themes.font.size_M,
            color:defualt_themes.color.fontGray
        }
    },
    groupItem2:{
        container:{
            // width:defualt_themes.screen.width,
            borderBottomWidth:1/PixelRatio.get(),
            borderColor:defualt_themes.form.BORDER_COLOR_GRAY,
            // height:40,
            paddingLeft:5,
            backgroundColor:defualt_themes.color.backgroundColor,
            flexDirection:"row"
        },
        left:{
            width:110,
            marginTop:12,
            // justifyContent:"center",
            alignItems:"flex-start"
        },
        leftText:{
            fontSize:defualt_themes.font.size_M,
            color:defualt_themes.color.fontGray
        },
        right:{
            flex:1,
            marginVertical:12,
            paddingRight:5,
            // justifyContent:"center",
            alignItems:"flex-start"
        },
        rightText:{
            fontSize:defualt_themes.font.size_M,
        }
    },
    //亲属item
    qsItems:{
        container:{
            height:44,
            width:defualt_themes.screen.width,
            marginBottom:2,
            backgroundColor:defualt_themes.color.backgroundColor,
            flexDirection:"row",
            justifyContent:"flex-start",
            alignItems:"center"
        },
        title:{
            width:120
        },
        titleView:{
            paddingLeft: 10,
            fontWeight:"normal",
            fontSize:defualt_themes.font.size_M,
            color:"#3E3A39"
        },
        titleError:{
            color:"#a94442"
        },
        iconView:{
            width:50,
            justifyContent:"center",
            alignItems:"center"
        },
        icon:{
            height:20,
            width:20
        },
        errorTip:{
            flex:1,
            flexDirection:"row",
            justifyContent:"flex-end"
        },
        errorText:{
            fontSize:13,
            color:"#a94442",
            marginRight:5,
            marginBottom:2
        }
    }
});

module.exports = components;