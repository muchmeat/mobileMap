import React from 'react'
import { NativeEventEmitter, Platform, requireNativeComponent, NativeModules,  UIManager, findNodeHandle, DeviceEventEmitter } from 'react-native'
import PropTypes from 'prop-types'
const AGSMap = requireNativeComponent('RNArcGISMapViewManager', ArcGISMapView);


class ArcGISMapView extends React.Component {
  constructor(props) {
    super(props);
    let eventEmitter;
    if (Platform.OS === 'ios') {
      eventEmitter = new NativeEventEmitter(NativeModules.RNArcGISMapViewModule);
    } else {
      eventEmitter = DeviceEventEmitter;
    }
    eventEmitter.addListener('isRoutingChanged', this.props.onRoutingStatusUpdate);
  }
  
  // MARK: Props
  static propTypes = {
    basemapUrl: PropTypes.string,
    initialMapCenter: PropTypes.arrayOf(PropTypes.object),
    minZoom: PropTypes.number,
    maxZoom: PropTypes.number,
    rotationEnabled: PropTypes.bool,
    routeUrl: PropTypes.string,
    onOverlayWasAdded: PropTypes.func,
    onOverlayWasRemoved:  PropTypes.func,
    onOverlayWasModified: PropTypes.func,
    onMapDidLoad: PropTypes.func,
    onMapMoved: PropTypes.func,
    onSingleTap: PropTypes.func,
  };

  static defaultProps = {
    initialMapCenter: [
      {latitude: 36.244797, longitude: -94.148060}
    ],
    minZoom: 0,
    maxZoom: 0,
    rotationEnabled: true,
    basemapUrl: '',
    onSingleTap: () => { },
    onOverlayWasAdded: () => { },
    onOverlayWasRemoved:  () => { },
    onOverlayWasModified: () => { },
    onMapDidLoad: () => { },
    onMapMoved: () => { },
    onRoutingStatusUpdate: () => { },
    routeUrl: '',
  };

  isRouting = false;

  // MARK: Exposed native methods
  showCallout = (args) => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.agsMapRef),
      UIManager.getViewManagerConfig('RNArcGISMapViewManager').Commands.showCalloutViaManager,
      [args]
    );
  };

  recenterMap = (pointArray) => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.agsMapRef),
      UIManager.getViewManagerConfig('RNArcGISMapViewManager').Commands.centerMapViaManager,
      [pointArray]
    );
  }

  addGraphicsOverlay = (overlayData) => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.agsMapRef),
      UIManager.getViewManagerConfig('RNArcGISMapViewManager').Commands.addGraphicsOverlayViaManager,
      [overlayData]
    );
  }

  removeGraphicsOverlay = (overlayId) => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.agsMapRef),
      UIManager.getViewManagerConfig('RNArcGISMapViewManager').Commands.removeGraphicsOverlayViaManager,
      [overlayId]
    );
  }

  addPointsToOverlay = (args) => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.agsMapRef),
      UIManager.getViewManagerConfig('RNArcGISMapViewManager').Commands.addPointsToOverlayViaManager,
      [args]
    );
  }

  updatePointsOnOverlay = (args) => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.agsMapRef),
      UIManager.getViewManagerConfig('RNArcGISMapViewManager').Commands.updatePointsInGraphicsOverlayViaManager,
      [args]
    );
  }

  removePointsFromOverlay = (args) => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.agsMapRef),
      UIManager.getViewManagerConfig('RNArcGISMapViewManager').Commands.removePointsFromOverlayViaManager,
      [args]
    );
  }

  routeGraphicsOverlay = (args) => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.agsMapRef),
      UIManager.getViewManagerConfig('RNArcGISMapViewManager').Commands.routeGraphicsOverlayViaManager,
      [args]
    );
  }
  
  getRouteIsVisible = (callback) => {
    if (Platform.OS === 'ios') { 
      UIManager.dispatchViewManagerCommand(
        findNodeHandle(this.agsMapRef),
        UIManager.getViewManagerConfig('RNArcGISMapViewManager').Commands.getRouteIsVisibleViaManager,
        [callback]
      );
    } else {
      NativeModules.RNArcGISMapViewManager.getRouteIsVisible(findNodeHandle(this.agsMapRef),callback);
    }
  };

  setRouteIsVisible = (args) => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.agsMapRef),
      UIManager.getViewManagerConfig('RNArcGISMapViewManager').Commands.setRouteIsVisibleViaManager,
      [args]
    );
  }

  // MARK: Render
  render () {
    return <AGSMap {...this.props} ref={e => this.agsMapRef = e} />
  }

  // MARK: Disposal
  componentWillUnmount() {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.agsMapRef),
      UIManager.getViewManagerConfig('RNArcGISMapViewManager').Commands.dispose,
      [args]
    );
  }
}

export const setLicenseKey = (string) => {
  NativeModules.RNArcGISMapViewManager.setLicenseKey(string);
};


export default ArcGISMapView;