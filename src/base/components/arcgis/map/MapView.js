import {RctMapView, BaseMapView} from "./BaseMapView";
import React from "react";
import {
    View,
    PixelRatio, Text, TouchableHighlight, NativeModules
} from 'react-native';
import FeatherIcon from "react-native-vector-icons/Feather";
import {getIcon} from "../../../../../utils/icon";

export default class MapView extends BaseMapView {
    constructor(props) {
        super(props);
        this.state = {
            operationArea: null,
            infoViewHeight: 0,
            mode: "view"
        }
    }

    _generateBtn(btn) {
        let child = getIcon(btn);
        return <TouchableHighlight underlayColor="#e4e4e4"
                                   style={{
                                       flex: 1,
                                       flexDirection: "column",
                                       width: "100%",
                                       alignItems: "center",
                                       justifyContent: "center"
                                   }}
                                   onPress={btn.action}>
            {child}
        </TouchableHighlight>;
    }

    _generateTextBtn(btn) {
        let child = getIcon(btn);
        return <TouchableHighlight underlayColor="#e4e4e4"
                                   style={{
                                       flex: 1,
                                       flexDirection: "column",
                                       width: "100%",
                                       alignItems: "center",
                                       justifyContent: "center"
                                   }}
                                   onPress={btn.action}>
            <View style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
            }}>
                {child}
                <Text style={{fontSize: 10, color: "#363636"}}>{btn.text}</Text>
            </View>
        </TouchableHighlight>;
    }

    /**
     * 定位按钮
     * @returns {*}
     * @private
     */
    _generateLocateBtn() {
        let _this = this;
        return <View style={{
            position: "absolute",
            bottom: this.state.infoViewHeight > 0 ? this.state.infoViewHeight + 10 : 105,
            left: 10,
            zIndex: 99999,
            height: 40,
            width: 40,
            borderRadius: 5,
            backgroundColor: "#fff",
            elevation: 1
        }}>
            {_this._generateBtn({
                icon: "md-locate",
                iconSet: "Ionicons",
                size: 24,
                action: function () {
                    _this.locateCurrentPosition();
                }
            })}
        </View>
    }

    /**
     * 缩放地图操作区
     * @returns {null|*}
     * @private
     */
    _generateZoomArea() {
        let _this = this;
        if (_this.props.showZoomArea) {
            return <View style={{
                position: "absolute",
                bottom: this.state.infoViewHeight > 0 ? this.state.infoViewHeight + 80 : 180,
                right: 10,
                height: 80,
                width: 40,
                borderRadius: 5,
                backgroundColor: "#fff",
                flexDirection: "column",
                alignItems: "center",
                elevation: 1,
            }}>
                {
                    [_this._generateBtn({
                        icon: "md-add",
                        iconSet: "Ionicons",
                        action: function () {
                            _this.zoomIn();
                        }
                    }),
                        _this._generateBtn({
                            icon: "md-remove",
                            iconSet: "Ionicons",
                            action: function () {
                                _this.zoomOut();
                            }
                        }),
                    ]
                }
            </View>;
        } else {
            return null;
        }
    }

    /**
     * 操作区
     * @private
     */
    _generateOperationArea() {
        let _this = this;
        let btnGroup = [], btnConfig = _this.props.buttonConfig;
        if (btnConfig && btnConfig.length) {
            btnConfig.forEach((btn, i) => {
                if (i > 0) {
                    btnGroup.push(<View style={{
                        paddingLeft: 6,
                        paddingRight: 6,
                        width: "100%",
                    }} key={"btn_" + i}><View style={{
                        borderBottomWidth: 1 / PixelRatio.get(),
                        borderBottomColor: "#d8d8d8",
                        width: "100%",
                    }}>
                    </View></View>);
                }
                btnGroup.push(_this._generateTextBtn(btn));
            });
        }
        this.setState({
            operationArea: <View style={{
                position: "absolute",
                top: 25,
                right: 10,
                height: 192,
                width: 40,
                borderRadius: 5,
                backgroundColor: "#fff",
                flexDirection: "column",
                alignItems: "center",
                elevation: 1
            }}>{btnGroup}</View>
        });
    }

    /**
     * 信息框布局发生变化
     * @param e
     * @private
     */
    _onInfoViewLayout = (e) => {
        let _this = this;
        NativeModules.UIManager.measure(e.target, (x, y, width, height, pageX, pageY) => {
            _this.setState({"infoViewHeight": height});
        });
    };

    componentDidMount(): void {
        let _this = this;
        super.componentDidMount();
        _this._generateOperationArea();
    }

    /**
     * 默认的地图布局
     *   地图容器View设置padding为解决通过react-navgation多次跳转屏幕下方会出现灰条，地图无法完全展示的问题
     *     |主地图（相对定位）
     *     |业务操作区(绝对定位)
     *     |地图缩放按钮(绝对定位)
     *     |定位按钮(绝对定位)
     *     |信息展示区(绝对定位)
     */
    render() {
        let _this = this;
        return (<View style={{height: "100%", padding: 1 / PixelRatio.get()}}>
            <RctMapView
                ref="rctMapView"
                {..._this.props.mapConfig}
                style={{
                    height: "100%",
                    position: "relative"
                }}
            >
            </RctMapView>
            <View onLayout={(e) => this._onInfoViewLayout(e)} style={{
                position: "absolute",
                width: "100%",
                bottom: 0,
                left: 0,
                backgroundColor: "transparent"
            }}>
                {_this.props.infoViewDom}
            </View>
            {_this.state.operationArea}
            {_this._generateLocateBtn()}
            {_this._generateZoomArea()}
        </View>);
    }
}
