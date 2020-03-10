package com.api.map;

import com.esri.arcgisruntime.arcgisservices.LevelOfDetail;
import com.esri.arcgisruntime.arcgisservices.TileInfo;
import com.esri.arcgisruntime.geometry.Envelope;
import com.esri.arcgisruntime.geometry.Point;
import com.esri.arcgisruntime.geometry.SpatialReference;
import com.esri.arcgisruntime.layers.WebTiledLayer;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Created by zxy on 2017/12/11.
 */

public class PGISMapServiceLayer {

    private static final String LAYER_NAME = "pgis";

    private static final double[] RESOLUTIONS = {0.123769981, 0.061884990, 0.030942495, 0.015471247, 0.007735623,
            0.00386781191973003, 0.00193390595986501, 0.000966952979932507, 0.000483476489966253, 0.000241738244983127,
            0.000120869122491563, 6.04346e-005, 3.02173e-005, 1.51086e-005, 7.55432e-006, 3.77716e-006
    };

    private static final double[] SCALES = {
            49152000, 24576000, 12288000, 6144000, 3072000, 1536000, 768000,
            384000, 192000, 96000, 48000, 24000, 12000, 6000, 3000, 1500
    };

    private static final SpatialReference SRID_4326 = SpatialReference.create(4326);
    private static final double X_MIN = -180;
    private static final double Y_MIN = -90;
    private static final double X_MAX = 180;
    private static final double Y_MAX = 90;

    private static final Envelope ENVELOPE = new Envelope(X_MIN, Y_MIN, X_MAX, Y_MAX, SRID_4326);
    private static final Point ORIGIN = new Point(-252.316, 253.7895, SRID_4326);

    private static final int MIN_ZOOM_LEVEL = 4;
    private static final int MAX_ZOOM_LEVEL = 19;
    private static final int DPI = 96;
    private static final int TILE_WIDTH = 256;
    private static final int TILE_HEIGHT = 256;

    public static PGISLayer CreatePGISMapLayer(String mainURL) {
        PGISLayer pgisLayer = null;
        TileInfo mainTileInfo;
        Envelope mainEnvelope;
        try {
            List<LevelOfDetail> mainLevelOfDetail = new ArrayList<>();
            Point mainOrigin;

            for (int i = MIN_ZOOM_LEVEL; i <= MAX_ZOOM_LEVEL; i++) {
                LevelOfDetail item = new LevelOfDetail(i, RESOLUTIONS[i - MIN_ZOOM_LEVEL], SCALES[i - MIN_ZOOM_LEVEL]);
                mainLevelOfDetail.add(item);
            }
            mainEnvelope = ENVELOPE;
            mainOrigin = ORIGIN;

            mainTileInfo = new TileInfo(
                    DPI,
                    TileInfo.ImageFormat.PNG24,
                    mainLevelOfDetail,
                    mainOrigin,
                    mainOrigin.getSpatialReference(),
                    TILE_HEIGHT,
                    TILE_WIDTH
            );
            pgisLayer = new PGISLayer(
                    mainURL,
                    mainTileInfo,
                    mainEnvelope);
            pgisLayer.setName(LAYER_NAME);
            pgisLayer.loadAsync();
        } catch (Exception e) {
            e.getCause();
        }
        return pgisLayer;
    }

    public static double getDefaultScale() {
        return SCALES[12];
    }
}
