import React, {Component} from "react";
import {NativeModules, PixelRatio, Text, TouchableHighlight, View} from "react-native";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import MapView from "../../../base/components/arcgis/map/MapView";

export default class PointMap extends Component {
    constructor(props) {
        super(props);
        this.markType = "add";
        this.state = {
            infoViewDom: null,
            infoViewHeight: 0,
            mode: "view"
        };
    }

    componentDidMount() {
        let geoJson =
            {
                "type": "Feature",
                "properties": {
                    name: "家",
                    icon:"ic_kk"
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        118.36855530738829,
                        31.372344143074773
                    ]
                }
            };
        let geoJson2 =
            {
                "type": "Feature",
                "properties": {
                    name: "家",
                    // icon:""
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        118.36955530738829,
                        31.372344143074773
                    ]
                }
            };
        this.refs.mapView.draw(geoJson);
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
