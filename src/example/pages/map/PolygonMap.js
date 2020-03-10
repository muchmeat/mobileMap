import React, {Component} from "react";
import {NativeModules, PixelRatio, Text, TouchableHighlight, View} from "react-native";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import MapView from "../../../base/components/arcgis/map/MapView";

export default class PolygonMap extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        //一个无孔单面
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
                            [118.36850166320801, 31.3734800138603],
                            [118.36855530738829, 31.372344143074773],
                            [118.36999297142029, 31.37238994458178],
                            [118.3700680732727, 31.371061691814667],
                            [118.37320089340211, 31.371217418972723],
                            [118.37295413017272, 31.374359388264196],
                            [118.37042212486269, 31.374194506190342],
                            [118.37037920951842, 31.37368153788809],
                            [118.36850166320801, 31.3734800138603]
                        ]
                    ]
                }
            };
        //一个有孔单面。
        // 这个数组的第一个元素表示的是外部环。其他后续的元素表示的内部环（或者孔）
        let geoJson2 =
            {
                "type": "Feature",
                "properties": {
                    name: "莲塘新村"
                },
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [
                        [
                            [118.36850166320801, 31.3734800138603],
                            [118.36855530738829, 31.372344143074773],
                            [118.36999297142029, 31.37238994458178],
                            [118.3700680732727, 31.371061691814667],
                            [118.37320089340211, 31.371217418972723],
                            [118.37295413017272, 31.374359388264196],
                            [118.37042212486269, 31.374194506190342],
                            [118.37037920951842, 31.37368153788809],
                            [118.36850166320801, 31.3734800138603]
                        ],
                        [
                            [118.36997151374815, 31.37250902839554],
                            [118.3700144290924, 31.371602155550885],
                            [118.37158083915709, 31.37172124036301],
                            [118.37137699127196, 31.37260063122653],
                            [118.36997151374815, 31.37250902839554]
                        ],
                        [
                            [118.37227821350098, 31.37293956092466],
                            [118.37240695953369, 31.372298341545427],
                            [118.37317943572998, 31.372325822465733],
                            [118.37287902832033, 31.372957881414035],
                            [118.37227821350098, 31.37293956092466]
                        ],
                        [
                            [118.37058305740358, 31.36990747071634],
                            [118.3708620071411, 31.36867995018374],
                            [118.37390899658203, 31.3691929457893],
                            [118.37358713150024, 31.370292212657603],
                            [118.37058305740358, 31.36990747071634]
                        ]
                    ]
                }
            };
        this.refs.mapView.draw(geoJson2);
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
                         // center: null
                         // center: {
                         //     latitude: 118.3710765838623,
                         //     longitude: 31.370585348317537
                         // }
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
