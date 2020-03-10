package com.api.map;

import com.esri.arcgisruntime.arcgisservices.LevelOfDetail;
import com.esri.arcgisruntime.arcgisservices.TileInfo;
import com.esri.arcgisruntime.data.TileKey;
import com.esri.arcgisruntime.geometry.Envelope;
import com.esri.arcgisruntime.geometry.Point;
import com.esri.arcgisruntime.geometry.SpatialReference;
import com.esri.arcgisruntime.layers.ImageTiledLayer;

import java.io.BufferedInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

/**
 * Created by Administrator on 2018/2/14.
 */

public class PGISLayer extends ImageTiledLayer {

    private String mainURL;
    private TileInfo mTileInfo;
    private static final SpatialReference SRID_4326 = SpatialReference.create(4326);
    private static final int minZoomLevel = 4;
    private static final int maxZoomLevel = 19;

    public static double[] iScale =
            {
                    49152000, 24576000, 12288000, 6144000, 3072000, 1536000, 768000,
                    384000, 192000, 96000, 48000, 24000, 12000, 6000, 3000, 1500
            };
    public static double[] iRes =
            {
                    0.123769981, 0.061884990, 0.030942495, 0.015471247, 0.007735623,
                    0.00386781191973003, 0.00193390595986501, 0.000966952979932507, 0.000483476489966253, 0.000241738244983127,
                    0.000120869122491563, 6.04346e-005, 3.02173e-005, 1.51086e-005, 7.55432e-006, 3.77716e-006
            };


    public PGISLayer(String mainURL, TileInfo tileInfo, Envelope fullExtent) {
        super(tileInfo, fullExtent);
        this.mainURL = mainURL;
    }

//    public static PGISLayer getInstance(String mainURL, TileInfo tileInfo, Envelope fullExtent) {
//        if (pgisLayer == null) {
//            pgisLayer = new PGISLayer(mainURL, tileInfo, fullExtent);
//        }
//        return pgisLayer;
//    }


    @Override
    protected byte[] getTile(TileKey tileKey) {
        byte[] iResult = null;
        HttpURLConnection iHttpURLConnection = null;
        BufferedInputStream iBufferedInputStream = null;
        ByteArrayOutputStream iByteArrayOutputStream = null;
        try {
            URL iURL = null;
            byte[] iBuffer = new byte[1024];
            iURL = new URL(this.getMapUrl(tileKey));
            iHttpURLConnection = (HttpURLConnection) iURL.openConnection();
            iHttpURLConnection.connect();
            iBufferedInputStream = new BufferedInputStream(iHttpURLConnection.getInputStream());
            iByteArrayOutputStream = new ByteArrayOutputStream();
            while (true) {
                int iLength = iBufferedInputStream.read(iBuffer);
                if (iLength > 0) {
                    iByteArrayOutputStream.write(iBuffer, 0, iLength);
                } else {
                    break;
                }
            }
            iBufferedInputStream.close();
            iHttpURLConnection.disconnect();

            iResult = iByteArrayOutputStream.toByteArray();
        } catch (Exception ex) {
            ex.printStackTrace();
        } finally {
            if(iBufferedInputStream!=null){
                try {
                    iBufferedInputStream.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            if(iByteArrayOutputStream!=null){
                try {
                    iByteArrayOutputStream.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        return iResult;
    }

    private String getMapUrl(TileKey tileKey) {
        String iResult = null;
        Random iRandom = null;
        int level = tileKey.getLevel();
        int c = tileKey.getColumn();
        int r = tileKey.getRow();
        r = (int) ((Math.pow(2, level)) - 1 - r);
        iResult = mainURL + "&row=" + r + "&col=" + c + "&level=" + level;
        return iResult;
    }

    @Override
    public TileInfo getTileInfo() {
        Point iPoint = new Point(-252.316, 253.7895, SRID_4326);
        List<LevelOfDetail> levelOfDetails = new ArrayList<>();
        for (int i = minZoomLevel; i <= maxZoomLevel; i++) {
            LevelOfDetail item = new LevelOfDetail(i, iRes[i - minZoomLevel], iScale[i - minZoomLevel]);
            levelOfDetails.add(item);
        }
        mTileInfo = new TileInfo(96, TileInfo.ImageFormat.PNG24, levelOfDetails, iPoint, SpatialReference.create(4326), 256, 256);
        return mTileInfo;
    }

//    public static TileInfo buildTileInfo(Activity activity) {
//        Point iPoint = new Point(-252.316, 253.7895, SRID_4326);
//        List<LevelOfDetail> levelOfDetails = new ArrayList<>();
//        for (int i = minZoomLevel; i <= maxZoomLevel; i++) {
//            LevelOfDetail item = new LevelOfDetail(i, iRes[i - minZoomLevel], iScale[i - minZoomLevel]);
//            levelOfDetails.add(item);
//        }
//        mTileInfo = new TileInfo(96, TileInfo.ImageFormat.PNG24, levelOfDetails, iPoint, SpatialReference.create(4326), 256, 256);
//        return mTileInfo;
//    }
}

