package com.api.map;

import android.app.ProgressDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.pm.ApplicationInfo;
import android.content.res.Resources;
import android.graphics.Color;
import android.graphics.drawable.BitmapDrawable;
import android.support.v4.content.ContextCompat;
import android.util.Log;
import android.widget.Toast;

import com.esri.arcgisruntime.concurrent.Job;
import com.esri.arcgisruntime.concurrent.ListenableFuture;
import com.esri.arcgisruntime.data.FeatureCollection;
import com.esri.arcgisruntime.geometry.Geometry;
import com.esri.arcgisruntime.geometry.GeometryEngine;
import com.esri.arcgisruntime.geometry.Point;
import com.esri.arcgisruntime.geometry.PointCollection;
import com.esri.arcgisruntime.geometry.Polygon;
import com.esri.arcgisruntime.geometry.Polyline;
import com.esri.arcgisruntime.geometry.SpatialReference;
import com.esri.arcgisruntime.geometry.SpatialReferences;
import com.esri.arcgisruntime.layers.ArcGISMapImageLayer;
import com.esri.arcgisruntime.layers.FeatureCollectionLayer;
import com.esri.arcgisruntime.mapping.view.Graphic;
import com.esri.arcgisruntime.mapping.view.GraphicsOverlay;
import com.esri.arcgisruntime.mapping.view.MapView;
import com.esri.arcgisruntime.symbology.PictureMarkerSymbol;
import com.esri.arcgisruntime.symbology.SimpleFillSymbol;
import com.esri.arcgisruntime.symbology.SimpleLineSymbol;
import com.esri.arcgisruntime.symbology.SimpleMarkerSymbol;
import com.esri.arcgisruntime.symbology.SimpleRenderer;
import com.esri.arcgisruntime.tasks.geoprocessing.GeoprocessingJob;
import com.esri.arcgisruntime.tasks.geoprocessing.GeoprocessingParameters;
import com.esri.arcgisruntime.tasks.geoprocessing.GeoprocessingResult;
import com.esri.arcgisruntime.tasks.geoprocessing.GeoprocessingString;
import com.esri.arcgisruntime.tasks.geoprocessing.GeoprocessingTask;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.rnarcgismap.R;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

public class GraphicsKit {

    private final String TAG = GraphicsKit.class.getSimpleName();
    private MapView _mapView;
    private GraphicsOverlay _overlay;
    private Context _context;
    private GeoprocessingTask mGeoprocessingTask;
    private GeoprocessingJob mGeoprocessingJob;

    private static final SpatialReference SPATIAL_REFERENCE = SpatialReferences.getWgs84();

    public GraphicsKit(MapView mapView, GraphicsOverlay overlay) {
        this._mapView = mapView;
        this._overlay = overlay;
    }

    public GraphicsKit(MapView mapView, GraphicsOverlay overlay, Context context, GeoprocessingTask mGeoprocessingTask, GeoprocessingJob mGeoprocessingJob) {
        this._mapView = mapView;
        this._overlay = overlay;
        this._context = context;
        this.mGeoprocessingTask = mGeoprocessingTask;
        this.mGeoprocessingJob = mGeoprocessingJob;

    }

    public void draw(ReadableMap geoJson) {
        ReadableMap geometry = geoJson.getMap("geometry");
        ReadableMap properties = geoJson.getMap("properties");
        String geoType = geometry.getString("type");
        switch (geoType) {
            case "Polygon":
                ReadableArray coordinates = geometry.getArray("coordinates");
                int size = coordinates.size();
                if (size > 0) {
                    //define the fill symbol and outline
                    SimpleLineSymbol outlineSymbol =
                            new SimpleLineSymbol(
                                    SimpleLineSymbol.Style.SOLID,
                                    Color.argb(255, 97, 181, 252), 1.5f);
                    for (int i = 0; i < size; i++) {
                        SimpleFillSymbol fillSymbol =
                                new SimpleFillSymbol(
                                        SimpleFillSymbol.Style.SOLID,
                                        Color.argb(Math.round(100), 1, 21, 244),
                                        outlineSymbol);
                        ReadableArray polygonCoordinates = coordinates.getArray(i);
                        PointCollection points = new PointCollection(SPATIAL_REFERENCE);
                        for (int j = 0; j < polygonCoordinates.size(); j++) {
                            ReadableArray coordinate = polygonCoordinates.getArray(j);
                            points.add(coordinate.getDouble(0), coordinate.getDouble(1));
                        }
                        Polygon polygon = new Polygon(points);
                        // create the graphic with polyline and symbol
                        Graphic graphic = new Graphic(polygon, fillSymbol);
                        _overlay.getGraphics().add(graphic);
                    }
                }
                break;
            case "Point":
                coordinates = geometry.getArray("coordinates");
                SimpleMarkerSymbol pointSymbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.Style.CIRCLE, Color.rgb(226, 119, 40), 10.0f);
                pointSymbol.setOutline(new SimpleLineSymbol(SimpleLineSymbol.Style.SOLID, Color.BLUE, 2.0f));
                Point point = new Point(coordinates.getDouble(0), coordinates.getDouble(1), SPATIAL_REFERENCE);
                String icon = properties.hasKey("icon") ? properties.getString("icon") : null;
                if (StringUtils.isNotEmpty(icon) && getResId(icon) != 0) {
                    BitmapDrawable pinStarBlueDrawable = (BitmapDrawable) ContextCompat.getDrawable(_context, getResId(icon));
                    final PictureMarkerSymbol pinStarBlueSymbol = new PictureMarkerSymbol(pinStarBlueDrawable);
                    pinStarBlueSymbol.setHeight(25);
                    pinStarBlueSymbol.setWidth(25);
                    Graphic pointGraphic = new Graphic(point, pinStarBlueSymbol);
                    _overlay.getGraphics().add(pointGraphic);
                } else {
                    pointSymbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.Style.CIRCLE, Color.rgb(226, 119, 40), 10.0f);
                    pointSymbol.setOutline(new SimpleLineSymbol(SimpleLineSymbol.Style.SOLID, Color.BLUE, 1.0f));
                    Graphic pointGraphic = new Graphic(point, pointSymbol);
                    _overlay.getGraphics().add(pointGraphic);
                }
                break;
//                final PictureMarkerSymbol campsiteSymbol = new PictureMarkerSymbol(
//                        "http://sampleserver6.arcgisonline.com/arcgis/rest/services/Recreation/FeatureServer/0/images/e82f744ebb069bb35b234b3fea46deae");
//                //Optionally set the size, if not set the image will be auto sized based on its size in pixels,
//                //its appearance would then differ across devices with different resolutions.
//                campsiteSymbol.setHeight(18);
//                campsiteSymbol.setWidth(18);
//                campsiteSymbol.loadAsync();
            //[DocRef: END]
//                campsiteSymbol.addDoneLoadingListener(new Runnable() {
//                    @Override
//                    public void run() {
//                        //Once the symbol has loaded, add a new graphic to the graphic overlay
//                        Point point = new Point(coordinates.getDouble(0), coordinates.getDouble(1), SPATIAL_REFERENCE);
//                        Graphic pointGraphic = new Graphic(point, campsiteSymbol);
//                        _overlay.getGraphics().add(pointGraphic);
//                    }
//                });

//                BitmapDrawable pinStarBlueDrawable = (BitmapDrawable) ContextCompat.getDrawable(_context, R.drawable.ic_kk);

            case "MultiPoint":
                coordinates = geometry.getArray("coordinates");
                pointSymbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.Style.CIRCLE, Color.rgb(226, 119, 40), 10.0f);
                pointSymbol.setOutline(new SimpleLineSymbol(SimpleLineSymbol.Style.SOLID, Color.BLUE, 2.0f));
                for (int i = 0; i < coordinates.size(); i++) {
                    ReadableArray polygonCoordinates = coordinates.getArray(i);
                    for (int j = 0; j < polygonCoordinates.size(); j++) {
                        ReadableArray coordinate = polygonCoordinates.getArray(j);
                        point = new Point(coordinate.getDouble(0), coordinate.getDouble(1), SPATIAL_REFERENCE);
                        Graphic onePointGraphic = new Graphic(point, pointSymbol);
                        _overlay.getGraphics().add(onePointGraphic);
                    }
                }
                break;
            case "Polyline":
                coordinates = geometry.getArray("coordinates");
                size = coordinates.size();
                if (size > 0) {
                    PointCollection polylinePoints = new PointCollection(SPATIAL_REFERENCE);
                    for (int i = 0; i < size; i++) {
                        ReadableArray polygonCoordinates = coordinates.getArray(i);
                        polylinePoints.add(new Point(polygonCoordinates.getDouble(0), polygonCoordinates.getDouble(1)));
                    }
                    Polyline polyline = new Polyline(polylinePoints);
                    SimpleLineSymbol polylineSymbol = new SimpleLineSymbol(SimpleLineSymbol.Style.SOLID, Color.BLUE, 3.0f);
                    Graphic polylineGraphic = new Graphic(polyline, polylineSymbol);
                    _overlay.getGraphics().add(polylineGraphic);
                }
                break;
            case "Circle":
                double radius = geometry.getDouble("radius");
                ReadableArray center = geometry.getArray("center");
                point = new Point(center.getDouble(0), center.getDouble(1), SPATIAL_REFERENCE);
                SimpleLineSymbol planarOutlineSymbol = new SimpleLineSymbol(SimpleLineSymbol.Style.SOLID, Color.argb(15, 1, 21, 244), 2);
                SimpleFillSymbol planarBufferFillSymbol = new SimpleFillSymbol(SimpleFillSymbol.Style.SOLID, Color.argb(15, 1, 21, 244),
                        planarOutlineSymbol);

                double tansferRadius = radius / (111000 * Math.cos(point.getY()));
                Geometry bufferGeometryPlanar = GeometryEngine.buffer(point, tansferRadius);
                Graphic planarBufferGraphic = new Graphic(bufferGeometryPlanar);
                planarBufferGraphic.setSymbol(planarBufferFillSymbol);
                _overlay.getGraphics().add(planarBufferGraphic);

                break;
//                double radius = 1000;
//                point = _mapView.screenToLocation(new android.graphics.Point(Math.round(e.getX()), Math.round(e.getY())));
//                point = new Point(116.79620531100864, 30.486868353212397, SPATIAL_REFERENCE);

//                List<Point> mPointList = new ArrayList<>();
//                mPointList.add(point);
//                if (mPointList.size() == 2) {
//                    double x = (mPointList.get(1).getX() - mPointList.get(0).getX());
//                    double y = (mPointList.get(1).getY() - mPointList.get(0).getY());
//                    radius = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
//                }
            case "Heat":
                //TODO 此方法实现的不是热力图，而是热点图
                analyzeHotspots("2020-01-01", "2020-03-04");
//                _overlay.getGraphics().add(polylineGraphic);
                break;
            default:
                break;
        }
    }

    public int getResId(String name) {
        Resources r = _context.getResources();
        int id = r.getIdentifier(name, "drawable", _context.getPackageName());
        return id;
    }

    private static final String EVENT_NAME_ONCLICK = "onClick";

    public void clearDrawLayer() {
        if (_overlay != null && _overlay.getGraphics() != null) {
            _overlay.getGraphics().clear();
        }
    }

    private void analyzeHotspots(final String from, final String to) {
        // cancel previous job request
        if (mGeoprocessingJob != null) {
            mGeoprocessingJob.cancel();
        }

        // a map image layer is generated as a result. Remove any layer previously added to the map
        _mapView.getMap().getOperationalLayers().clear();


        // parameters
        final ListenableFuture<GeoprocessingParameters> paramsFuture = mGeoprocessingTask.createDefaultParametersAsync();
        paramsFuture.addDoneListener(new Runnable() {
            @Override
            public void run() {
                try {
                    GeoprocessingParameters geoprocessingParameters = paramsFuture.get();
                    geoprocessingParameters.setProcessSpatialReference(_mapView.getSpatialReference());
                    geoprocessingParameters.setOutputSpatialReference(_mapView.getSpatialReference());

                    StringBuilder queryString = new StringBuilder("(\"DATE\" > date '")
                            .append(from)
                            .append(" 00:00:00' AND \"DATE\" < date '")
                            .append(to)
                            .append(" 00:00:00')");

                    geoprocessingParameters.getInputs().put("Query", new GeoprocessingString(queryString.toString()));

                    Log.i(TAG, "Query: " + queryString.toString());

                    // create job
                    mGeoprocessingJob = mGeoprocessingTask.createJob(geoprocessingParameters);

                    // start job
                    mGeoprocessingJob.start();

                    // create a dialog to show progress of the geoprocessing job
                    final ProgressDialog progressDialog = new ProgressDialog(_context);
                    progressDialog.setTitle("Running geoprocessing job");
                    progressDialog.setIndeterminate(false);
                    progressDialog.setProgressStyle(ProgressDialog.STYLE_HORIZONTAL);
                    progressDialog.setMax(100);
                    progressDialog.setCancelable(false);
                    progressDialog.setButton(DialogInterface.BUTTON_NEGATIVE, "Cancel", new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialog, int which) {
                            dialog.dismiss();
                            mGeoprocessingJob.cancel();
                        }
                    });
                    progressDialog.show();

                    // update progress
                    mGeoprocessingJob.addProgressChangedListener(new Runnable() {
                        @Override
                        public void run() {
                            progressDialog.setProgress(mGeoprocessingJob.getProgress());
                        }
                    });

                    mGeoprocessingJob.addJobDoneListener(new Runnable() {
                        @Override
                        public void run() {
                            progressDialog.dismiss();
                            if (mGeoprocessingJob.getStatus() == Job.Status.SUCCEEDED) {
                                Log.i(TAG, "Job succeeded.");

                                GeoprocessingResult geoprocessingResult = mGeoprocessingJob.getResult();
                                final ArcGISMapImageLayer hotspotMapImageLayer = geoprocessingResult.getMapImageLayer();

                                // add the new layer to the map
                                _mapView.getMap().getOperationalLayers().add(hotspotMapImageLayer);

                                hotspotMapImageLayer.addDoneLoadingListener(new Runnable() {
                                    @Override
                                    public void run() {
                                        // set the map viewpoint to the MapImageLayer, once loaded
                                        _mapView.setViewpointGeometryAsync(hotspotMapImageLayer.getFullExtent());
                                    }
                                });
                            } else {
                                Log.e(TAG, "Job did not succeed!");
                                Toast.makeText(_context, "Job did not succeed!", Toast.LENGTH_LONG).show();
                            }
                        }
                    });
                } catch (InterruptedException | ExecutionException e) {
                    e.printStackTrace();
                }
            }
        });
    }

    private void getCircle(Point point, double radius) {
        //        polygon.setEmpty();
        Point[] points = getPoints(point, radius);
        PointCollection pointCollection = new PointCollection(SPATIAL_REFERENCE);
        for (Point p : points) {
            pointCollection.add(p);
        }
        Polygon polygon = new Polygon(pointCollection);

        SimpleMarkerSymbol simpleMarkerSymbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.Style.CIRCLE, Color.RED, 10);
        Graphic pointGraphic = new Graphic(point, simpleMarkerSymbol);
        _overlay.getGraphics().add(pointGraphic);

        SimpleLineSymbol lineSymbol = new SimpleLineSymbol(SimpleLineSymbol.Style.SOLID, Color.parseColor("#FC8145"), 3.0f);
        SimpleFillSymbol simpleFillSymbol = new SimpleFillSymbol(SimpleFillSymbol.Style.SOLID, Color.parseColor("#33e97676"), lineSymbol);

        Graphic graphic = new Graphic(polygon, simpleFillSymbol);

        _overlay.getGraphics().add(graphic);
    }

    private static Point[] getPoints(Point center, double radius) {
        Point[] points = new Point[50];
        double sin;
        double cos;
        double x;
        double y;
        for (double i = 0; i < 50; i++) {
            sin = Math.sin(Math.PI * 2 * i / 50);
            cos = Math.cos(Math.PI * 2 * i / 50);
            x = center.getX() + radius * sin;
            y = center.getY() + radius * cos;
            points[(int) i] = new Point(x, y);
        }
        return points;
    }
}
