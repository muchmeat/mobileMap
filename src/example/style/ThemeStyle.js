/**
 * 全局配置项组件
 * Created by zk on 18/5/30.
 */
import {
    Dimensions,
    PixelRatio,
} from "react-native";


const default_themes = Object.freeze({
    screen: {
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width
    },
    color: {
        theme: "#008EFE",
        iconGray: "#bbb",
        theme_a: "rgba(0,127,250,0.5)",
        // theme_a:"red",
        defaultBg: "#F5F5F9",
        backgroundColor: "#FFF",
        fontWhite: "#FFF",
        fontBlack: "#333",
        fontGray: "#999",
        clickLine: "#008FFD",
    },
    font: {
        sizeXL: 20,
        size_L: 18,
        size_M: 16,
        size_S: 14
    },
    linePx: {
        width: 1 / PixelRatio.get(),
        color: "#ededed"
    },
    lineDp: {
        width: 1,
        color: "#ededed"
    },
    container: {
        flex: 1,
        backgroundColor: "#F5F5F9",
    },
    tabBarImage: {
        marginTop: 6,
        height: 24
    },
    tabBarIcon: {
        height: 30,
    },
    tabBarLabel: {
        fontSize: 10,
        lineHeight: 14,
        marginBottom: 6,
    },
    tabBarItem: {
        height: 50,
    },
    form: {
        LABEL_COLOR: "#999",
        INPUT_COLOR: "#333",
        ERROR_COLOR: "#a94442",
        HELP_COLOR: "#BBB",
        BORDER_COLOR_TINT: "#ddd",
        BORDER_COLOR_GRAY: "#ebebeb",
        DISABLED_COLOR: "#777777",
        DISABLED_BACKGROUND_COLOR: "#eeeeee",
        FONT_SIZE: 16,
        ERROR_SIZE: 14,
        FONT_WEIGHT: "normal",
    }
});

module.exports = default_themes;