import React, {Component} from "react";
import {NativeModules, PixelRatio, Text, TouchableHighlight, View} from "react-native";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import MapView from "../../../base/components/arcgis/map/MapView";

export default class CircleMap extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        let geoJson =
            {
                "type": "Feature",
                "properties": {
                    name: "莲塘新村"
                },
                "geometry": {
                    "type": "Circle",
                    "center": [
                        118.36850166320801,
                        31.3734800138603
                    ],
                    "radius": 1000
                }
            };
        this.refs.mapView.draw(geoJson);
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
                         enableRecenter: false,
                         center: {"latitude": 118.42817544937134, "longitude": 31.35951884293153},
                         minZoom: 50000000,
                         maxZoom: 1500
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


}
