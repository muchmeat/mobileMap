/**
 * 两行列表 样式
 * Created by zk on 18/5/30.
 */

import defualt_themes from "./ThemeStyle";
import components from "./Components";
import {PixelRatio} from "react-native";

const twoLineList = Object.freeze({
    container:{
        height: 72, width: defualt_themes.screen.width,
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "#FFF"
    },
    line_container:{
        width: defualt_themes.screen.width - 150
    },
    first_Line:{
        paddingTop: 16,
        paddingBottom: 5,
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        flex: 1
    },
    scrend_Line:{
        paddingTop: 5,
        paddingBottom: 16,
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        flex: 1
    },
    firstText:{
        fontSize: defualt_themes.font.size_M, color: "#333"
    },
    secondText:{
        fontSize: defualt_themes.font.size_S, color: "#999"
    },
    header_icon_container:{
        justifyContent: "center", alignItems: "center", height: 72, width: 72
    },
    header_icon:{
        width: 40, height: 40
    },
    message_icon:{
        height: 16,
        width: 20,
        borderRadius: 8,
        backgroundColor: "#FF4141",
        justifyContent: "center",
        alignItems: "center"
    },
    text_icon_container:{
        justifyContent: "center",
        alignItems: "center",
        height: 40,
        width: 40,
        backgroundColor: "#3296FD",
        borderRadius: 20
    },
    text_icon:{
        fontSize: 13, color: "#FFF"
    },
    message_line:{
        paddingTop: 5, paddingBottom: 16
    },
    message_text:{
        color: "#FFF", fontSize: 10
    },
    time_container:{
        justifyContent: "center", alignItems: "flex-end", height: 72, width: 78, paddingRight: 16
    },
    time_line:{
        paddingTop: 16, paddingBottom: 5
    },
    time_Text:{
        fontSize: 12, color: "#C0C2C3"
    }
});

module.exports = twoLineList;