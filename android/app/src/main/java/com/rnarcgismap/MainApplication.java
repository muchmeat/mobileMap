package com.rnarcgismap;

import android.app.Application;

import com.api.map.ArcgisMapManager;
import com.api.map.MapImageBtn;
import com.facebook.react.ReactApplication;
import com.davidgalindo.rnarcgismapview.RNArcGISMapViewPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;

import org.devio.rn.splashscreen.SplashScreenReactPackage;

import com.brentvatne.react.ReactVideoPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.reactlibrary.RNReactNativeDocViewerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.horcrux.svg.SvgPackage;
import com.imagepicker.ImagePickerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.api.DocPickerPackage;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
            new RNArcGISMapViewPackage(),
                    new RNGestureHandlerPackage(),
                    new SplashScreenReactPackage(),
                    new ReactVideoPackage(),
                    new RNReactNativeDocViewerPackage(),
                    new VectorIconsPackage(),
                    new SvgPackage(),
                    new DocPickerPackage(),
                    new ImagePickerPackage(),
                    new ReactPackage() {
                        @Override
                        public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
                            return Collections.emptyList();
                        }

                        @Override
                        public List<ViewManager> createViewManagers(
                                ReactApplicationContext reactContext) {
                            return Arrays.<ViewManager>asList(
                                    new ArcgisMapManager(),
                                    new MapImageBtn()
                            );
                        }
                    }
            );
        }

        @Override
        protected String getJSMainModuleName() {
            return "index";
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
    }
}
