import React, {Component} from "react";
import ArcGISMapView from 'react-native-arcgis-mapview'
import {connect} from "react-redux";

class MapDemo extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ArcGISMapView ref={mapView => this.mapView = mapView}
                // your props here
                //            routeUrl={"tdt@http://www.ruixin.net:48080/"}
                //            basemapUrl={"http://www.ruixin.net:48080/tdtjwd"}
                           basemapUrl={{
                               src: "tdt@http://www.ruixin.net:48080/",
                               subDomains: ["tdtjwd"]
                           }}
            />
        )
    }
}

export default connect(
    (state) => ({}),
    (dispatch) => ({})
)(MapDemo)
