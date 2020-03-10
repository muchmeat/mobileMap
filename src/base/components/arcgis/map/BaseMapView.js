// 注册原生Arcgis组件
import BaseComponent from "../../BaseComponent";
import {requireNativeComponent, View, PixelRatio} from "react-native";
import PropTypes from "prop-types";
import React, {Component} from "react";

class RctMapView extends BaseComponent {
    static propTypes = {
        ...View.propTypes,

        onDoubleTap: PropTypes.func,
        layer: PropTypes.shape({
            src: PropTypes.string.isRequired,
            subDomains: PropTypes.array
        }),
        center: PropTypes.shape({
            /**
             * Coordinates for the center of the map.
             */
            latitude: PropTypes.number.isRequired,
            longitude: PropTypes.number.isRequired
        })
    };

    _onChange = (event) => {
        if (this.props.onDoubleTap && event.nativeEvent.event === 'onDoubleTap') {
            this.props.onDoubleTap(event.nativeEvent);
        }
    };

    render() {
        return <RCTArcgisMapManager {...this.props} onChange={this._onChange}/>
    }

    name = 'RCTArcgisMapManager'
}

// const RCTArcgisMapManager = requireNativeComponent('RCTArcgisMapManager', RctMapView)
const RCTArcgisMapManager = requireNativeComponent('RCTArcgisMapManager')
export default RCTArcgisMapManager;

class BaseMapView extends Component {
    constructor(props) {
        super(props);
    }

    //Api
    zoomIn() {
        this.refs.rctMapView._sendCommand('zoomIn');
    }

    zoomOut() {
        this.refs.rctMapView._sendCommand('zoomOut');
    }

    draw(geoJson) {
        this.refs.rctMapView._sendCommand("draw", [geoJson]);
    }

    clearMap() {
        this.refs.rctMapView._sendCommand("clear");
    }

    locateCurrentPosition() {
        this.refs.rctMapView._sendCommand('locateCurrentPosition');
    }

    enableRecenter() {
        this.refs.rctMapView._sendCommand('enableRecenter');
    }

    disableRecenter() {
        this.refs.rctMapView._sendCommand('disableRecenter');
    }

    startMark() {
        this.refs.rctMapView._sendCommand("startMark");
    }

    stopMark() {
        this.refs.rctMapView._sendCommand("stopMark");
    }

    componentDidMount(): void {
        if (this.props.mapConfig.enableRecenter) {
            this.enableRecenter();
        }
    }

    render() {
        return (
            <RctMapView
                ref="rctMapView"
                {...this.props}
            >
            </RctMapView>);
    }
}

export {
    BaseMapView,
    RctMapView
}
