package com.api.map;

import android.graphics.Color;
import android.graphics.drawable.BitmapDrawable;
import android.graphics.drawable.Drawable;
import android.support.v4.content.ContextCompat;
import android.text.TextUtils;
import android.util.Log;
import android.view.MotionEvent;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.ListAdapter;
import android.widget.TextView;
import android.widget.Toast;

import com.esri.arcgisruntime.concurrent.ListenableFuture;
import com.esri.arcgisruntime.geometry.GeodeticCurveType;
import com.esri.arcgisruntime.geometry.Geometry;
import com.esri.arcgisruntime.geometry.GeometryEngine;
import com.esri.arcgisruntime.geometry.Point;
import com.esri.arcgisruntime.geometry.PointCollection;
import com.esri.arcgisruntime.geometry.Polygon;
import com.esri.arcgisruntime.geometry.Polyline;
import com.esri.arcgisruntime.geometry.SpatialReference;
import com.esri.arcgisruntime.geometry.SpatialReferences;
import com.esri.arcgisruntime.mapping.GeoElement;
import com.esri.arcgisruntime.mapping.popup.Popup;
import com.esri.arcgisruntime.mapping.popup.PopupDefinition;
import com.esri.arcgisruntime.mapping.view.Callout;
import com.esri.arcgisruntime.mapping.view.DefaultMapViewOnTouchListener;
import com.esri.arcgisruntime.mapping.view.Graphic;
import com.esri.arcgisruntime.mapping.view.GraphicsOverlay;
import com.esri.arcgisruntime.mapping.view.MapView;
import com.esri.arcgisruntime.symbology.PictureMarkerSymbol;
import com.esri.arcgisruntime.symbology.SimpleFillSymbol;
import com.esri.arcgisruntime.symbology.SimpleLineSymbol;
import com.esri.arcgisruntime.symbology.SimpleMarkerSymbol;
import com.esri.arcgisruntime.symbology.SimpleRenderer;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.rnarcgismap.R;

import java.io.File;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.concurrent.ExecutionException;

import static com.api.map.ArcgisMapManager.EVENT_NAME_ON_TAP_UP;

/**
 * Created by zxy on 2017/12/11.
 */

public class MapTouchListener extends DefaultMapViewOnTouchListener {
    private MapView _mapView = null;

    private SimpleMarkerSymbol pointSymbol = null;
    private SimpleFillSymbol fillSymbol = null;
    private SimpleLineSymbol lineSymbol = null;
    private String geoType = "";                    // 绘制类型
    private String currToastText = "";

    private Point ptStart = null;                   //起点
    private Point ptPrevious = null;                //上一个点
    private PointCollection drawPoints = null;     //记录全部点

    public GraphicsOverlay drawOverlay = null;      // 绘制层

    private ThemedReactContext _context = null;

    public MapTouchListener(MapView mapView, GraphicsOverlay overlay, ThemedReactContext context) {
        super(context, mapView);
        _mapView = mapView;
        _context = context;
        drawOverlay = overlay;

//        pointSymbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.Style.DIAMOND, Color.RED, 10);
//
//        fillSymbol = new SimpleFillSymbol(SimpleFillSymbol.Style.SOLID, Color.argb(100, 0, 255, 255), null);
//        fillSymbol.setOutline(new SimpleLineSymbol(SimpleLineSymbol.Style.SOLID, Color.BLUE, 3));
//
//        lineSymbol = new SimpleLineSymbol(SimpleLineSymbol.Style.SOLID, Color.BLUE, 3);
//
//        drawOverlay = new GraphicsOverlay();
//        drawPoints = new PointCollection(SpatialReference.create(4490));
//
//        _mapView.getGraphicsOverlays().add(drawOverlay);
    }

    private void mapOnTapUp(Point point, WritableMap map) {
        //重绘
        drawOverlay.getGraphics().clear();
        BitmapDrawable drawable = (BitmapDrawable) ContextCompat.getDrawable(_context, R.drawable.ic_mark);
        ListenableFuture<PictureMarkerSymbol> symbolListenableFuture = PictureMarkerSymbol.createAsync(Objects.requireNonNull(drawable));
        symbolListenableFuture.addDoneListener(() -> {
            Graphic pinStarBlueGraphic = null;
            try {
                pinStarBlueGraphic = new Graphic(point, symbolListenableFuture.get());
            } catch (ExecutionException e1) {
                e1.printStackTrace();
            } catch (InterruptedException e1) {
                e1.printStackTrace();
            }
            drawOverlay.getGraphics().add(pinStarBlueGraphic);
            //设置点击位置为地图中心点避免被信息框遮挡
            _mapView.setViewpointCenterAsync(point);
            //暂停标注
            geoType = null;
            //触发RN组件 onMarkDown事件
            map.putDouble("x", point.getX());
            map.putDouble("y", point.getY());
            map.putString("event", "onTapUp");
            _context.getJSModule(RCTEventEmitter.class).receiveEvent(
                    _mapView.getId(),
                    EVENT_NAME_ON_TAP_UP,
                    map
            );
        });
    }

    // 单击
    @Override
    public boolean onSingleTapUp(MotionEvent e) {
        Log.i("aa", "" + _mapView.getMapScale());
        android.graphics.Point screenPoint = new android.graphics.Point(Math.round(e.getX()), Math.round(e.getY()));
        Point clickPoint = _mapView.screenToLocation(screenPoint);

        if (_mapView == null || drawOverlay == null) {
            return true;
        }

        // 当前点
//        ptPrevious = clickPoint;
//        drawPoints.add(clickPoint);

        //直接画点
        if (!TextUtils.isEmpty(geoType)) {
            if (geoType.equals("Point")) {
                WritableMap map = Arguments.createMap();
                map.putString("target", "mark");
                this.mapOnTapUp(clickPoint, map);
            } else {
                // 重绘需要清除之前的点
                drawOverlay.getGraphics().clear();
//            // 如果是画线
                if (geoType.equals("Polyline")) {
                    if (drawPoints.size() > 1) {
                        Polyline polyline = new Polyline(drawPoints);
                        Graphic g = new Graphic(polyline, lineSymbol);
                        SimpleRenderer lineRenderer = new SimpleRenderer(lineSymbol);
                        drawOverlay.setRenderer(lineRenderer);
                        drawOverlay.getGraphics().add(g);


                        // 计算当前线段的长度
                        double result = GeometryEngine.lengthGeodetic(polyline, null, GeodeticCurveType.GEODESIC);
                        currToastText = String.format("%.1f", result) + " 米";
                    }
                    // 添加此点
                    Graphic graphic = new Graphic(clickPoint);
                    SimpleRenderer pointRenderer = new SimpleRenderer(pointSymbol);
                    drawOverlay.setRenderer(pointRenderer);
                    drawOverlay.getGraphics().add(graphic);
                } else if (geoType.equals("Polygon")) {

                    // 如果有两个点以上 连成线
                    if (drawPoints.size() >= 2) {
                        Polyline polyline = new Polyline(drawPoints);
                        Graphic g = new Graphic(polyline, lineSymbol);
//                    SimpleRenderer lineRenderer = new SimpleRenderer(lineSymbol);
//                    drawOverlay.setRenderer(lineRenderer);
                        drawOverlay.getGraphics().add(g);
                    }

                    if (drawPoints.size() > 2) {
                        // 连成面
                        Polygon polygon = new Polygon(drawPoints);
                        Graphic g = new Graphic(polygon, fillSymbol);
//                    SimpleRenderer fillRenderer = new SimpleRenderer(fillSymbol);
//                    drawOverlay.setRenderer(fillRenderer);
                        drawOverlay.getGraphics().add(g);
                        // 计算当前线段的长度
                        double result = GeometryEngine.areaGeodetic(polygon, null, GeodeticCurveType.GEODESIC);
                        currToastText = getAreaString(result);
                    }

                    // 添加此点
                    Graphic graphic = new Graphic(clickPoint, pointSymbol);
//                SimpleRenderer pointRenderer = new SimpleRenderer(pointSymbol);
//                drawOverlay.setRenderer(pointRenderer);
                    drawOverlay.getGraphics().add(graphic);
                }
            }
        }
        return true;
    }

    /**
     * 长按地图
     *
     * @param e
     */
    @Override
    public void onLongPress(MotionEvent e) {
        android.graphics.Point screenPoint = new android.graphics.Point(Math.round(e.getX()), Math.round(e.getY()));
        Point presssPoint = _mapView.screenToLocation(screenPoint);
        WritableMap map = Arguments.createMap();
        map.putString("target", "longPress");
        this.mapOnTapUp(presssPoint, map);
    }

    // 双击
//    public void onDoubleTapEvent(MotionEvent e) {
//        if (drawOverlay == null || _mapView == null) {
//            return;
//        }
//
//        if (geoType != "" && geoType != "Point" && drawPoints.size() >= 2) {
//            TextView calloutContent = new TextView(_context.getApplicationContext());
//
//            calloutContent.setTextColor(Color.BLACK);
//            calloutContent.setSingleLine();
//            calloutContent.setText("测量结果为: " + currToastText);
//
//            // get callout, set content and show
//            Callout mCallout = _mapView.getCallout();
//            mCallout.setLocation(ptPrevious);
//            mCallout.setContent(calloutContent);
//            mCallout.show();
//
//            if (mCallout.isShowing()) {
//                Toast.makeText(_context.getApplicationContext(), currToastText, Toast.LENGTH_LONG).show();
//            }
//
//        }
//        drawPoints.clear();
//    }

    public void clearDrawLayer() {
        if (drawOverlay != null && drawOverlay.getGraphics() != null) {
            drawOverlay.getGraphics().clear();
        }
        if (drawPoints != null) {
            drawPoints.clear();
        }
    }

    public void setGeoType(@SuppressWarnings("ConstantConditions") String type) {
        switch (type) {
            case "Point":
                geoType = "Point";
                break;
            case "Polyline":
                geoType = "Polyline";
                break;
            case "Polygon":
                geoType = "Polygon";
                break;
            default:
                geoType = "";
                break;
        }
    }

    private String getAreaString(double dValue) {
//        long area = Math.abs(Math.round(dValue));
        String sArea = "";
        // 顺时针绘制多边形，面积为正，逆时针绘制，则面积为负
//        DecimalFormat df = new DecimalFormat("#0.0");
        if (dValue >= 1000000) {
            double dArea = dValue / 1000000.0;
            sArea = Double.toString(dArea) + " 平方公里";
        } else {
            sArea = String.format("%.1f", dValue) + " 平方米";
        }
        return sArea;
    }
}
