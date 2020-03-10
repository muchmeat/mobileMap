import React, {Component} from "react";
import {NativeModules, PixelRatio, Text, TouchableHighlight, View} from "react-native";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import MapView from "../../../base/components/arcgis/map/MapView";

export default class MainMap extends Component {
    constructor(props) {
        super(props);
        this.markType = "add";
        this.state = {
            infoViewDom: null,
            infoViewHeight: 0,
            mode: "view"
        };
    }


    //开始标注
    _startMark() {
        let dom = <View style={{
            backgroundColor: "transparent",
            elevation: 1,
            paddingLeft: 10,
            paddingRight: 10,
            paddingBottom: 10,
        }}>
            <View style={{
                flexDirection: "row",
                width: "100%",
                elevation: 1,
                borderRadius: 5,
                backgroundColor: "#fff",
            }}>
                <TouchableHighlight underlayColor="#e4e4e4"
                                    style={{
                                        flex: 1,
                                        paddingVertical: 10,
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                    onPress={() => {
                                        this._stopMark();
                                        this.setState({
                                            infoViewDom: null,
                                            mode: "view",
                                        });
                                    }}>

                    <Text style={{fontSize: 18, color: "#FF1744"}}>退出标注</Text>
                </TouchableHighlight>
            </View>
        </View>;
        this.refs.mapView.startMark();
        this.setState({
            infoViewDom: dom,
            mode: "mark"
        });
    }


    render() {
        let _this = this;
        return (
            <MapView ref="mapView"
                     mapConfig={{
                         layer: {
                             src: "tdt@http://www.ruixin.net:48080/",
                             subDomains: ["tdtjwd"]
                         },
                         enableRecenter: true,
                         onTapUp: (e) => {
                             let nativeMap = e.nativeEvent;
                             if (nativeMap) {
                                 switch (nativeMap.target) {
                                     case "mark":
                                         _this._onMarkDown(e.nativeEvent);
                                         break;
                                     case "longPress":
                                         _this._onLongPress(e.nativeEvent);
                                         break;
                                     default:
                                         break;
                                 }
                             }
                         }
                     }}
                     buttonConfig={[
                         {
                             text: "切换图层",
                             icon: "layers",
                             iconSet: "Feather",
                             action: function () {
                                 alert("切换图层");
                             }
                         },
                         {
                             text: "标注A",
                             icon: "map-marker-outline",
                             iconSet: "MaterialCommunityIcons",
                             action: function () {
                                 _this.markType = "add";
                                 _this._startMark();
                             }
                         },
                         {
                             text: "标注R",
                             icon: "map-marker-outline",
                             iconSet: "MaterialCommunityIcons",
                             action: function () {
                                 _this.markType = "relate";
                                 _this._startMark();
                             }
                         },
                         {
                             text: "辖区",
                             icon: "map",
                             iconSet: "Feather",
                             action: function () {
                                 alert("辖区");
                             }
                         }
                     ]}
                     showZoomArea={true}
                     infoViewDom={this.state.infoViewDom}
            />
        );
    }


    //退出标注
    _stopMark() {
        this.refs.mapView.stopMark();
    }

    //完成标注
    _onMarkDown(data) {
        let dom = <View style={{
            flexDirection: "column",
            backgroundColor: "#fff",
            elevation: 1,
        }}>
            <View style={{
                flexDirection: "column",
                paddingHorizontal: 18,
            }}>
                <Text style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    paddingTop: 20,
                    paddingBottom: 8,
                    color: "#000000",
                }}>标注(仅作演示)</Text>
                <Text style={{
                    fontSize: 14,
                    paddingBottom: 8,
                    color: "#333333",
                }}>X坐标 {data.x}</Text>
                <Text style={{
                    fontSize: 14,
                    paddingBottom: 20,
                    color: "#333333",
                }}>Y坐标 {data.y}</Text>
            </View>
            <View style={{
                borderBottomWidth: 1.5 / PixelRatio.get(),
                borderBottomColor: "#e5e5e5",
                width: "100%",
            }}/>
            <View style={{
                flexDirection: "row",
                paddingVertical: 10,
                paddingHorizontal: 18,
                justifyContent: "center",
            }}>
                <TouchableHighlight underlayColor="#e4e4e4"
                                    style={{
                                        flex: 1,
                                        paddingVertical: 12,
                                        paddingHorizontal: 20,
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexDirection: "row",
                                        borderRadius: 30,
                                        borderColor: "#e5e5e5",
                                        borderWidth: 1.5 / PixelRatio.get(),
                                    }}
                                    onPress={() => {
                                        this.refs.mapView.clearMap();
                                        this._startMark();
                                    }}>
                    <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                        <Feather name="rotate-ccw" color="#333333" size={18}/>
                        <Text style={{
                            paddingHorizontal: 5,
                            fontSize: 16,
                            fontWeight: "bold",
                            color: "#333333"
                        }}>重新标注</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
                    underlayColor="#1565C0"
                    style={{
                        flex: 1,
                        paddingVertical: 12,
                        paddingHorizontal: 20,
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "row",
                        borderRadius: 30,
                        backgroundColor: "#3d8afd",
                        marginLeft: 20,
                    }}
                    onPress={() => {
                        this._clearMap();
                        this._stopMark();
                        this.setState({
                            infoViewDom: null,
                            mode: "view",
                        });
                    }}>
                    <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center",}}>
                        <Feather name="check-circle" color="#fff" size={18}/>
                        <Text style={{
                            paddingHorizontal: 5,
                            fontSize: 16,
                            fontWeight: "bold",
                            color: "#fff"
                        }}>确认</Text>
                    </View>
                </TouchableHighlight>
            </View>
        </View>;
        if (this.markType === "relate") {
            let geoJson =
                {
                    "type": "Feature",
                    "properties": {
                        name: "莲塘新村"
                    },
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": [
                            [
                                [
                                    118.36850166320801,
                                    31.3734800138603
                                ],
                                [
                                    118.36855530738829,
                                    31.372344143074773
                                ],
                                [
                                    118.36999297142029,
                                    31.37238994458178
                                ],
                                [
                                    118.3700680732727,
                                    31.371061691814667
                                ],
                                [
                                    118.37320089340211,
                                    31.371217418972723
                                ],
                                [
                                    118.37295413017272,
                                    31.374359388264196
                                ],
                                [
                                    118.37042212486269,
                                    31.374194506190342
                                ],
                                [
                                    118.37037920951842,
                                    31.37368153788809
                                ],
                                [
                                    118.36850166320801,
                                    31.3734800138603
                                ]
                            ]
                        ]
                    }
                };
            this.refs.mapView.draw(geoJson);
        }
        this.setState({
            infoViewDom: dom
        });
    }

    _onLongPress(data) {
        let dom = <View style={{
            flexDirection: "column",
            backgroundColor: "#fff",
            elevation: 1,
        }}>
            <View style={{
                flexDirection: "column",
                paddingHorizontal: 18,
            }}>
                <Text style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    paddingTop: 20,
                    paddingBottom: 8,
                    color: "#000000",
                }}>莲塘新村紫竹园10栋(仅作演示)</Text>
                <Text style={{
                    fontSize: 14,
                    paddingBottom: 8,
                    color: "#333333",
                }}>镜湖区</Text>
                <Text style={{
                    fontSize: 14,
                    paddingBottom: 20,
                    color: "#808080",
                }}>坐标 {data.x + "," + data.y}</Text>
            </View>
            <View style={{
                borderBottomWidth: 1.5 / PixelRatio.get(),
                borderBottomColor: "#e5e5e5",
                width: "100%",
            }}/>
            <View style={{
                flexDirection: "row",
                paddingVertical: 10,
                paddingHorizontal: 18,
                justifyContent: "center",
            }}>
                <TouchableHighlight underlayColor="#e4e4e4"
                                    style={{
                                        flex: 1,
                                        paddingVertical: 12,
                                        paddingHorizontal: 20,
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexDirection: "row",
                                        borderRadius: 30,
                                        borderColor: "#e5e5e5",
                                        borderWidth: 1.5 / PixelRatio.get(),
                                    }}
                                    onPress={() => {
                                        this.refs.mapView.clearMap();
                                        this._startMark();
                                    }}>
                    <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                        <Feather name="list" color="#333333" size={18}/>
                        <Text style={{
                            paddingHorizontal: 5,
                            fontSize: 16,
                            fontWeight: "bold",
                            color: "#333333"
                        }}>查看详情</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
                    underlayColor="#e4e4e4"
                    style={{
                        flex: 1,
                        paddingVertical: 12,
                        paddingHorizontal: 20,
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "row",
                        borderRadius: 30,
                        marginLeft: 20,
                        borderColor: "#e5e5e5",
                        borderWidth: 1.5 / PixelRatio.get(),
                    }}
                    onPress={() => {
                        this.refs.mapView.clearMap();
                        this._stopMark();
                        this.setState({
                            infoViewDom: null,
                            mode: "view",
                        });
                    }}>
                    <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center",}}>
                        <Feather name="minus-circle" color="#333" size={18}/>
                        <Text style={{
                            paddingHorizontal: 5,
                            fontSize: 16,
                            fontWeight: "bold",
                            color: "#333"
                        }}>移除标注</Text>
                    </View>
                </TouchableHighlight>
            </View>
        </View>;
        this.setState({
            infoViewDom: dom
        });
    }

    //信息框
    _createInfoWindow() {
        let dom = <View style={{
            flexDirection: "column",
            backgroundColor: "#fff",
            elevation: 1,
            paddingLeft: 18,
            paddingRight: 18,
        }}><Text style={{
            fontSize: 18,
            fontWeight: "bold",
            paddingTop: 20,
            paddingBottom: 8,
            color: "#000000",
        }}>繁昌县</Text>
            <Text style={{
                fontSize: 14,
                paddingBottom: 8,
                color: "#333333",
            }}>距您36.0公里</Text>
            <Text style={{
                fontSize: 14,
                paddingBottom: 20,
                color: "#808080",
            }}>区县</Text></View>;
        this.setState({
            infoViewDom: dom
        });
    }

    _onLayout = (e) => {
        let _this = this;
        NativeModules.UIManager.measure(e.target, (x, y, width, height, pageX, pageY) => {
            _this.setState({"infoViewHeight": height});
        });
    };
}
