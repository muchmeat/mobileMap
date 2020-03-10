package com.api.map;

import android.Manifest;
import android.annotation.SuppressLint;
import android.content.pm.PackageManager;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.text.TextUtils;
import android.util.Log;
import android.view.Display;
import android.view.MotionEvent;
import android.view.View;
import android.widget.Toast;

import com.esri.arcgisruntime.ArcGISRuntimeEnvironment;
import com.esri.arcgisruntime.geometry.Point;
import com.esri.arcgisruntime.geometry.SpatialReferences;
import com.esri.arcgisruntime.layers.Layer;
import com.esri.arcgisruntime.layers.WebTiledLayer;
import com.esri.arcgisruntime.loadable.LoadStatus;
import com.esri.arcgisruntime.mapping.ArcGISMap;
import com.esri.arcgisruntime.mapping.Basemap;
import com.esri.arcgisruntime.mapping.Viewpoint;
import com.esri.arcgisruntime.mapping.view.DefaultMapViewOnTouchListener;
import com.esri.arcgisruntime.mapping.view.GraphicsOverlay;
import com.esri.arcgisruntime.mapping.view.LocationDisplay;
import com.esri.arcgisruntime.mapping.view.MapView;
import com.esri.arcgisruntime.tasks.geoprocessing.GeoprocessingJob;
import com.esri.arcgisruntime.tasks.geoprocessing.GeoprocessingTask;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.events.RCTEventEmitter;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

/**
 * Created by zxy on 2017/12/6.
 */

public class ArcgisMapManager extends ViewGroupManager<MapView> {
    private ThemedReactContext _context;
    private MapView mapView;
    private static final double DEFAULT_MAX_SCALE = 1500;
    private static final double DEFAULT_MIN_SCALE = 50000000;

    private MapTouchListener mapTouchListener;
    private GraphicsKit graphicsKit;

    private GeoprocessingTask mGeoprocessingTask;
    private GeoprocessingJob mGeoprocessingJob;

    private LocationDisplay locationDisplay;

    GraphicsOverlay overlayLv1;
    GraphicsOverlay overlayLv2;
//    private LocationDisplay.DataSourceStatusChangedListener dataSourceStatusChangedListener = null;

    public static final String REACT_CLASS = "RCTArcgisMapManager";
    //    private static final double DEFAULT_SCALE = 100000d;
    private static final double DEFAULT_SCALE = 10000d;

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @SuppressLint("ClickableViewAccessibility")
    @Override
    protected MapView createViewInstance(ThemedReactContext reactContext) {
        _context = reactContext;
        //TianDiTuTiledMapServiceLayer mapBase = new TianDiTuTiledMapServiceLayer("http://www.scgis.net.cn/iMap/iMapServer/DefaultRest/services/newtianditudlg", "");

        // 构造天地图 服务
//        WebTiledLayer webTiledLayer = TianDiTuTiledMapServiceLayer.CreateTianDiTuTiledLayer(TianDiTuTiledMapServiceLayer.LayerType.TIANDITU_VECTOR_2000);
//        Basemap tdtBasemap = new Basemap(webTiledLayer);
//        WebTiledLayer webTiledLayer1 = TianDiTuTiledMapServiceLayer.CreateTianDiTuTiledLayer(TianDiTuTiledMapServiceLayer.LayerType.TIANDITU_VECTOR_ANNOTATION_CHINESE_2000);
//        tdtBasemap.getBaseLayers().add(webTiledLayer1);
//        ArcGISMap arcGISMap = new ArcGISMap();
//        double latitude = 118.4177;
//        double longitude = 31.35152;
//        int levelOfDetail = 11;
//        ArcGISMap map = new ArcGISMap();
//        //PGIS地图
//        PGISLayer pgisLayer = PGISMapServiceLayer.CreatePGISMapLayer("http://192.168.0.233/PGIS_S_FlexClient/bin?services=wuhu");
//        Basemap tdtBasemap = new Basemap(pgisLayer);
//        map.setBasemap(tdtBasemap);
//        Point p1 = new Point(latitude, longitude, SpatialReferences.getWgs84());
//        Viewpoint vp = new Viewpoint(p1, DEFAULT_SCALE);
//        map.setInitialViewpoint(vp);
        mapView = new MapView(reactContext);
//        ArcGISMap map = new ArcGISMap(Basemap.Type.STREETS_VECTOR, 31.370585348317537, 118.3710765838623, 17);
        ArcGISMap map = new ArcGISMap();
        map.setMinScale(DEFAULT_MIN_SCALE);
        map.setMaxScale(DEFAULT_MAX_SCALE);

        //移除下方Powered by Esri logo
        mapView.setAttributionTextVisible(false);
        mapView.setMap(map);

//        mapView.setMap(map);
        locationDisplay = mapView.getLocationDisplay();
        /* ** ADD ** */
//        dataSourceStatusChangedListener = new LocationDisplay.DataSourceStatusChangedListener() {
//
//            }
//        };
        locationDisplay.addDataSourceStatusChangedListener((dataSourceStatusChangedEvent) -> {
            if (dataSourceStatusChangedEvent.isStarted() || dataSourceStatusChangedEvent.getError() == null) {
                return;
            }
            int requestPermissionsCode = 2;
            String[] requestPermissions = new String[]{Manifest.permission.ACCESS_FINE_LOCATION, Manifest.permission.ACCESS_COARSE_LOCATION};
            if (!(ContextCompat.checkSelfPermission(_context, requestPermissions[0]) == PackageManager.PERMISSION_GRANTED
                    && ContextCompat.checkSelfPermission(_context, requestPermissions[1]) == PackageManager.PERMISSION_GRANTED)) {
                ActivityCompat.requestPermissions(Objects.requireNonNull(_context.getCurrentActivity()), requestPermissions, requestPermissionsCode);
            } else {
                String message = String.format("Error in DataSourceStatusChangedListener: %s",
                        dataSourceStatusChangedEvent.getSource().getLocationDataSource().getError().getMessage());
                Toast.makeText(_context, message, Toast.LENGTH_LONG).show();
            }
        });

        //创建两个图层
        overlayLv1 = new GraphicsOverlay();
        overlayLv2 = new GraphicsOverlay();
        mapView.getGraphicsOverlays().add(overlayLv2);
        mapView.getGraphicsOverlays().add(overlayLv1);

        //触摸事件
        mapTouchListener = new MapTouchListener(mapView, overlayLv1, _context);
        mapView.setOnTouchListener(mapTouchListener);
//        graphicsKit = new GraphicsKit(mapView, overlayLv2);
        mGeoprocessingTask = new GeoprocessingTask("https://sampleserver6.arcgisonline.com/arcgis/rest/services/911CallsHotspot/GPServer/911%20Calls%20Hotspot");
        mGeoprocessingTask.loadAsync();
        graphicsKit = new GraphicsKit(mapView, overlayLv2, _context, mGeoprocessingTask, mGeoprocessingJob);

        //
//        _MapView.getMap().setInitialViewpoint();

//        _MapView.setOnTouchListener(new DefaultMapViewOnTouchListener(_context, _MapView) {
//            @Override
//            public boolean onSingleTapConfirmed(MotionEvent e) {
//                mapTouchListener.onSingleTapUp(e);
//                return super.onSingleTapUp(e);
//            }
//
//            @Override
//            public boolean onDoubleTap(MotionEvent e) {
//                android.graphics.Point screenPoint = new android.graphics.Point(Math.round(e.getX()), Math.round(e.getY()));
//                Point clickPoint = _MapView.screenToLocation(screenPoint);
//                mapTouchListener.onDoubleTapEvent(e);
//
//                WritableMap map = Arguments.createMap();
//                map.putDouble("x", clickPoint.getX());
//                map.putDouble("y", clickPoint.getY());
//                map.putString("event", "onDoubleTap");
//                // "topChange"事件在JS端映射到"onChange"，参考UIManagerModuleConstants.java
//                _context.getJSModule(RCTEventEmitter.class).receiveEvent(
//                        _MapView.getId(),
//                        "topChange",
//                        map
//                );
//                return super.onDoubleTapEvent(e);
//            }
//        });
        return mapView;
    }

    @Override
    public void addView(MapView parent, View child, int index) {
        super.addView(parent, child, index);
    }

    /**
     * 地图服务地址
     *
     * @param mapView
     * @param layer
     */
    @SuppressWarnings("unchecked")
    @ReactProp(name = "layer")
    public void setLayer(MapView mapView, @NonNull ReadableMap layer) {
        String src = layer.getString("src");
        Object subDomains = layer.getArray("subDomains").toArrayList();
        String[] url = src.split("@");
        Layer mLayer;
        if (url[0].equals("pgis")) {
            mLayer = PGISMapServiceLayer.CreatePGISMapLayer(url[1]);
        } else if (url[0].equals("tdt")) {
            mLayer = RxMapLayer.createLayer(url[1], (List<String>) subDomains);
        } else {
            mLayer = RxMapLayer.createLayer(src, (List<String>) subDomains);
        }
        Basemap basemap = new Basemap(mLayer);
        mapView.getMap().setBasemap(basemap);
//        ArcGISMap map = new ArcGISMap(basemap);
//        mapView.setMap(map);
        //https://blog.csdn.net/luofeixiongsix/article/details/79096089
//        map.setMaxScale(1500);
//        map.setMinScale(50000000);
//        mapView.getMap().setBasemap(tdtBasemap);
//        mapView.getMap().setBasemap(basemap);
    }

    @ReactProp(name = "minZoom")
    public void setMinZoom(MapView mapView, double value) {
        mapView.getMap().setMinScale(value);
    }

    @ReactProp(name = "maxZoom")
    public void setMaxZoom(MapView mapView, double value) {
        mapView.getMap().setMaxScale(value);
    }

    /**
     * 中心点
     *
     * @param mapView
     * @param center
     */
    @SuppressWarnings("ConstantConditions")
    @ReactProp(name = "center")
    public void setCenter(MapView mapView, @Nullable ReadableMap center) {
        Point centerPoint;
        if (center != null) {
//            Log.d("arcgis",String.valueOf(center.getDouble("latitude")));
            centerPoint = new Point(center.getDouble("latitude"), center.getDouble("longitude"), SpatialReferences.getWgs84());
        } else {
            centerPoint = mapView.getLocationDisplay().getLocation().getPosition();
        }
        Viewpoint vp = new Viewpoint(centerPoint, DEFAULT_SCALE);
        mapView.getMap().setInitialViewpoint(vp);

        //定位当前位置
        locationDisplay.setAutoPanMode(LocationDisplay.AutoPanMode.RECENTER);
        locationDisplay.startAsync();
        locationDisplay.setShowLocation(false);//隐藏位置符号
//        locationDisplay.setShowAccuracy(false);//隐藏符号的缓存区域
//        locationDisplay.setShowPingAnimation(false);//隐藏位置更新的符号动画

    }


//    @ReactProp(name = "enableTool")
//    public void setEnableTool(BaseMapView view, @Nullable boolean enableTool) {
//        if (enableTool == true) {
//            ImageButton zoomInBtn = new ImageButton(_context);
//            zoomInBtn.setBackgroundResource(R.drawable.mapfangda);
//
//            RelativeLayout rl = new RelativeLayout(_context);
//            RelativeLayout.LayoutParams params = new RelativeLayout.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT);
////            RelativeLayout relativeLayout = new RelativeLayout(_context);
////
////            relativeLayout.setLayoutParams(params);
////
////            ViewGroup.LayoutParams groupParams = new ViewGroup.LayoutParams(40, 40);
////
////            zoomInBtn.setLayoutParams(groupParams);
////
////            relativeLayout.addView(zoomInBtn);
////            view.setOrientation(LinearLayout.HORIZONTAL);
////            params.leftMargin = 100;
////            zoomInBtn.setLayoutParams(params);
////            _MapView.addView(zoomInBtn);
////            params.addRule(RelativeLayout.CENTER_IN_PARENT, -1);
////            params.setMargins(10, 10, 10, 10);//设置左，上，右，下，的距离
//
//            //zoomInBtn.setLayoutParams(params);
//            rl.addView(zoomInBtn);
//
//
//            _MapView.addView(rl, params);
//        }
//    }

    private static final int COMMAND_ZOOMIN = 1;
    private static final int COMMAND_ZOOMOUT = 2;
    private static final int COMMAND_DRAW = 3;
    private static final int COMMAND_CLEAR = 4;
    private static final int COMMAND_START_MARK = 5;
    private static final int COMMAND_STOP_MARK = 6;
    private static final int COMMAND_LOCATE_CURRENT_POSITION = 7;
    private static final int COMMAND_ENABLE_RECENTER = 8;
    private static final int COMMAND_DISABLE_RECENTER = 9;
    //    private static final int COMMAND_DESTROY = 8;
//    private static final int COMMAND_PAUSE = 9;
    private static final int COMMAND_RESUME = 10;

    @Override
    public Map<String, Integer> getCommandsMap() {
        Map<String, Integer> map = new HashMap<>();
        map.put("zoomIn", COMMAND_ZOOMIN);
        map.put("zoomOut", COMMAND_ZOOMOUT);
        map.put("draw", COMMAND_DRAW);
        map.put("clear", COMMAND_CLEAR);
        map.put("startMark", COMMAND_START_MARK);
        map.put("stopMark", COMMAND_STOP_MARK);
        map.put("locateCurrentPosition", COMMAND_LOCATE_CURRENT_POSITION);
        map.put("enableRecenter", COMMAND_ENABLE_RECENTER);
        map.put("disableRecenter", COMMAND_DISABLE_RECENTER);
//        map.put("destroy", COMMAND_DESTROY);
//        map.put("pause", COMMAND_PAUSE);
        map.put("resume", COMMAND_RESUME);
        return map;
    }

    private int mDuration = 10;

    @Override
    public void receiveCommand(final MapView mapView, int commandId, @Nullable ReadableArray args) {
        switch (commandId) {
            case COMMAND_ZOOMIN: {
                double currZoomScale = mapView.getMapScale();
                mapView.setViewpointScaleAsync(currZoomScale * 0.5);
            }
            break;
            case COMMAND_ZOOMOUT: {
                double currZoomScale = mapView.getMapScale();
                mapView.setViewpointScaleAsync(currZoomScale * 2);
            }
            break;
            case COMMAND_DRAW: {
                ReadableMap geoMap = Objects.requireNonNull(args).getMap(0);
                graphicsKit.draw(geoMap);
            }
            break;
            case COMMAND_CLEAR: {
                mapTouchListener.clearDrawLayer();
                graphicsKit.clearDrawLayer();

            }
            break;
            case COMMAND_START_MARK: {
                mapTouchListener.setGeoType("Point");
            }
            break;
            case COMMAND_STOP_MARK: {
                mapTouchListener.setGeoType("");
            }
            break;
//            case COMMAND_LENGTH: {
//                mapTouchListener.clearDrawLayer();
////
////                // 设置激活 画线
//                mapTouchListener.setGeoType("Polyline");
//            }
//            break;
//            case COMMAND_AREA: {
////                _MapTouchListener.clearDrawLayer();
////                _MapTouchListener.createDrawLayer();
////
////                // 设置激活 画线
////                _MapTouchListener.setType(Geometry.Type.POLYGON);
//                mapTouchListener.clearDrawLayer();
////
////                // 设置激活 画线
//                mapTouchListener.setGeoType("Polygon");
//            }
//            break;
            case COMMAND_LOCATE_CURRENT_POSITION:
                //显示位置符号
                locationDisplay.setShowLocation(true);
                //在最大缩放级别下重新定位到用户当前位置
                Viewpoint viewpoint = new Viewpoint(locationDisplay.getLocation().getPosition(), PGISMapServiceLayer.getDefaultScale());
                mapView.setViewpoint(viewpoint);
                break;
            case COMMAND_ENABLE_RECENTER:
                locationDisplay.setAutoPanMode(LocationDisplay.AutoPanMode.RECENTER);
                locationDisplay.startAsync();
                break;
            case COMMAND_DISABLE_RECENTER:
                locationDisplay.setAutoPanMode(LocationDisplay.AutoPanMode.OFF);
                break;
//            case COMMAND_DESTROY:
////                mapView.getLocationDisplay().removeDataSourceStatusChangedListener(dataSourceStatusChangedListener);
//                mapView.dispose();
//                break;
//            case COMMAND_PAUSE:
//                mapView.pause();
//                break;
            case COMMAND_RESUME:
                mapView.resume();
                break;
        }
    }

    final static String EVENT_NAME_ON_TAP_UP = "onTapUp";

    /**
     * 自定义事件
     *
     * @return
     */
    @Nullable
    @Override
    public Map<String, Object> getExportedCustomDirectEventTypeConstants() {
        return MapBuilder.of(EVENT_NAME_ON_TAP_UP, MapBuilder.of("registrationName", EVENT_NAME_ON_TAP_UP));
    }

    @Nullable
    @Override
    public Map<String, Object> getExportedCustomBubblingEventTypeConstants() {
        return null;
    }
}
