import React, {Component} from "react";
import {NativeModules, PixelRatio, Text, TouchableHighlight, View} from "react-native";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import MapView from "../../../base/components/arcgis/map/MapView";

export default class MultiPointMap extends Component {
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
                    "type": "MultiPoint",
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
