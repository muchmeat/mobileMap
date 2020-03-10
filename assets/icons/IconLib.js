import React, {Component} from 'react';
import Svg, {
    G, Path, Circle, Rect, Polygon
} from 'react-native-svg';
export default class IconLib extends Component {
//主页身份证扫描
    static IC_MAIN_SFZSM = <G fill="#FFF">
        <Path
            d="M95.74,7H16.89C10.67,7,5.63,12.59,5.63,19.48V75.62c0,6.89,5,12.47,11.26,12.47H95.74C102,88.09,107,82.51,107,75.62V19.48C107,12.59,102,7,95.74,7Zm5.63,68.62c0,3.44-2.53,6.23-5.63,6.24H16.89c-3.11,0-5.63-2.8-5.63-6.24V19.48c0-3.45,2.52-6.24,5.63-6.24H95.74c3.11,0,5.62,2.79,5.63,6.24Z"/>
        <Path
            d="M85.1,48.72a14.08,14.08,0,1,0-18.14,0A19.73,19.73,0,0,0,56.31,66.2a2.82,2.82,0,0,0,5.64,0,14.08,14.08,0,1,1,28.16,0h0a2.82,2.82,0,0,0,5.63,0h0A19.72,19.72,0,0,0,85.1,48.72ZM67.58,38A8.45,8.45,0,1,1,76,46.49,8.44,8.44,0,0,1,67.58,38ZM53.5,29.59H19.71a2.82,2.82,0,1,0,0,5.63H53.5a2.82,2.82,0,0,0,0-5.63ZM50.68,43.67h-31a2.82,2.82,0,1,0,0,5.63h31a2.82,2.82,0,1,0,0-5.63ZM42.23,57.75H19.71a2.82,2.82,0,1,0,0,5.63H42.23a2.82,2.82,0,1,0,0-5.63Z"/>
    </G>

    //主页二维码扫描
    static IC_MAIN_SCAN = <G fill="#FFF">
        <Path
            d="M82.61,47.08H8.82a3.08,3.08,0,0,1,0-6.16H82.61a3.08,3.08,0,0,1,0,6.16ZM76.49,84H58a3.08,3.08,0,1,1,0-6.15H76.49a3.08,3.08,0,0,0,3.08-3.08V59.38a3.08,3.08,0,0,1,6.15,0V74.77A9.24,9.24,0,0,1,76.49,84ZM30.34,84H15a9.24,9.24,0,0,1-9.23-9.23V59.38a3.08,3.08,0,0,1,6.15,0V74.77A3.09,3.09,0,0,0,15,77.85H30.34a3.08,3.08,0,0,1,0,6.15ZM8.8,31.69a3.08,3.08,0,0,1-3.08-3.07V13.23A9.24,9.24,0,0,1,15,4H30.34a3.08,3.08,0,0,1,0,6.15H15a3.09,3.09,0,0,0-3.08,3.08V28.61A3.07,3.07,0,0,1,8.8,31.69Zm73.84,0a3.07,3.07,0,0,1-3.07-3.07V13.23a3.08,3.08,0,0,0-3.08-3.08H58A3.08,3.08,0,1,1,58,4H76.49a9.24,9.24,0,0,1,9.23,9.23V28.62a3.07,3.07,0,0,1-3.08,3.07Z"/>
    </G>

    //入户走访 32*32
    static IC_RHZF = <G fill="#129E47">
        <Path
            d="M721.536 97.024C665.984 41.472 589.44 8.96 511.872 8.96h-1.024C346.112 8.96 211.968 144.256 211.968 309.888c0 57.728 15.744 113.28 46.08 161.536 23.04 36.736 54.528 69.248 91.264 92.288-56.576 22.016-107.008 55.552-151.04 99.584-80.64 82.816-127.872 197.12-127.872 314.496 0 20.992 17.792 37.76 38.784 37.76s37.76-16.768 38.784-37.76c0-199.168 155.136-360.704 352.384-365.952h11.52c164.608 0 298.88-135.296 298.88-300.928-1.152-79.616-33.664-157.184-89.216-213.888z m10.496 212.864c0 120.576-97.536 221.312-217.088 223.36H499.2c-118.528-5.248-210.816-103.808-210.816-223.36 1.024-122.624 100.608-223.36 222.336-223.36 122.752 0 221.312 100.736 221.312 223.36z m0 0M694.784 845.44c0.384 10.88 2.048 26.24 5.12 46.336-22.784 15.488-42.752 31.232-59.776 47.232l-23.424-30.08c5.504-7.296 8.32-16 8.576-26.112v-88.576h-33.536v-39.808h76.032v109.696l27.008-18.688z m-51.968-192.768c16.512 21.504 30.336 40.448 41.856 56.96l-40.576 23.552c-10.368-17.92-23.168-38.016-38.272-60.032l36.992-20.48zM789.12 948.48c-3.584-17.792-7.168-32.64-10.752-44.8 16.768 0.64 30.336 0.896 40.704 0.896 6.016 0 10.752-1.536 14.208-4.736 3.456-3.2 5.504-8.832 6.144-16.896 0.64-8.064 1.664-32.768 3.2-73.984H775.68c-1.536 60.544-19.2 109.056-52.736 145.664-16.512-13.44-29.824-23.552-39.936-30.08 14.336-14.464 25.216-30.08 32.64-47.104s11.904-33.408 13.44-49.28c1.536-15.872 2.304-45.568 2.56-89.344h-35.584v-40.832h81.024c-3.456-10.88-7.808-23.808-12.928-38.656l47.488-7.936 13.184 46.592H903.68v40.832h-126.592l-0.512 29.184h112.256c-1.792 73.728-3.328 117.376-4.736 130.816s-5.12 24.064-11.264 31.744c-6.144 7.808-13.696 12.672-22.656 14.592-9.088 1.92-29.44 3.072-61.056 3.328z"/>
    </G>;
    //人口登记 32*32
    static IC_RKDJ = <G fill="#F9A02C">
        <Path
            d="M169.66164559 958.48011918c-35.45251567 0-48.74720904-13.29469337-48.74720903-48.74720905V170.76953671c0-35.45251567 16.61836672-45.4235357 52.07088237-45.42353569h63.14979353c12.18680227 0 25.48149564-15.5104756 25.48149564-33.23673345 0-14.40258449-9.97102003-33.23673343-24.37360451-33.23673343h-88.63128917c-58.71822907 0-94.17074474 34.34462456-94.17074474 94.17074474v772.20010685c0 58.71822907 37.66829788 94.17074474 94.17074474 94.17074475h331.25944326s-31.02095121-33.23673343-44.31564458-62.04190241l-265.89386751 1.10789111z m559.48501288-832.02622706h72.01292243c35.45251567 0 45.4235357 12.18680227 45.42353571 47.63931793v257.03073859c15.5104756 7.7552378 50.96299127 25.48149564 64.25768464 34.34462455V153.04327888c0-58.71822907-34.34462456-94.17074474-94.17074475-94.17074474h-87.52339803c-14.40258449 0-25.48149564 19.94204006-25.48149564 34.34462454 0 17.72625783 13.29469337 33.23673343 25.48149564 33.23673344z m0 0"/>
        <Path
            d="M702.55727171 189.60368566h-91.95496252V79.92246531c0-42.09986234-34.34462456-76.4444869-76.44448689-76.44448691h-103.03387366c-42.09986234 0-76.4444869 34.34462456-76.44448691 76.44448691v109.68122035h-91.95496251c-26.58938676-1.10789112-44.31564459 23.2657134-44.31564459 49.85510015s17.72625783 49.85510015 44.31564459 49.85510016h439.83277249c26.58938676 0 44.31564459-24.37360451 44.31564458-49.85510016s-16.61836672-49.85510015-44.31564458-49.85510015z m-220.4703318-36.56040678c-27.69727787 0-50.96299127-22.1578223-50.96299127-50.96299128 0-28.80516897 22.1578223-50.96299127 50.96299127-50.96299125 27.69727787 0 50.96299127 22.1578223 50.96299127 50.96299125 0 27.69727787-22.1578223 50.96299127-50.96299127 50.96299128zM636.08380483 404.53456189H262.72449922c-26.58938676 0-44.31564459 24.37360451-44.31564459 49.85510015 0 26.58938676 17.72625783 49.85510015 44.31564459 49.85510016h196.09672727c45.4235357-45.4235357 110.78911147-84.19972472 177.26257834-99.71020031zM217.30096351 663.7810827c0 26.58938676 16.61836672 49.85510015 43.20775348 49.85510015h113.00489369c5.53945557-36.56040679 15.5104756-72.01292244 38.77618901-100.81809141H262.72449922c-27.69727787 1.10789112-45.4235357 25.48149564-45.42353571 50.96299126zM720.28352955 475.43959321c-149.56530046 0-271.43332307 121.8680226-271.43332307 271.43332308s121.8680226 271.43332307 271.43332307 271.43332307 271.43332307-121.8680226 271.43332306-271.43332307-121.8680226-271.43332307-271.43332306-271.43332308z m-2.21578224 95.27863586c45.4235357 0 81.98394247 36.56040679 81.98394248 81.98394247 0 45.4235357-36.56040679 81.98394247-81.98394248 81.98394249-45.4235357 0-81.98394247-36.56040679-81.98394248-81.98394249 0-45.4235357 36.56040679-81.98394247 81.98394248-81.98394247zM575.14979352 894.22243453c-1.10789112-83.0918336 39.88408013-135.16271599 91.95496253-155.10475604l53.1787735 87.52339804 55.39455571-85.30761582c49.85510015 22.1578223 88.63128916 73.12081355 89.73918028 153.99686494-91.95496252 35.45251567-188.34148947 37.66829788-290.26747202-1.10789112z m0 0"/>
    </G>;

    //单位登记 32*32
    static IC_DWDJ = <G fill="#019eeb">
        <Path
            d="M829.89056 150.9376l-136.369493-134.403413c-6.580907-6.485333-15.469227-10.130773-24.753493-10.130773L128.98304 6.403413c-19.456 0-35.239253 15.755947-35.239253 35.211947l0 940.72832c0 19.510613 15.7696 35.26656 35.239253 35.26656L464.896 1017.61024c-14.240427-21.777067-25.832107-45.397333-34.338133-70.464853L164.20864 947.145387 164.20864 76.88192l467.899733 0 0 114.824533c0 11.659947 9.46176 21.149013 21.17632 21.149013l116.667733 0 0 323.351893c24.507733 3.31776 48.073387 9.489067 70.423893 18.158933L840.37632 176.073387C840.37632 166.611627 836.608 157.586773 829.89056 150.9376L829.89056 150.9376z"/>
        <Path
            d="M841.045333 982.166187 624.052907 982.166187c-1.174187 0.669013-2.321067 1.39264-3.577173 1.911467l-78.56128 31.70304L841.045333 1015.780693c9.284267 0 16.7936-7.53664 16.7936-16.7936C857.838933 989.689173 850.315947 982.166187 841.045333 982.166187L841.045333 982.166187z"/>
        <Path
            d="M926.324053 634.51136l-68.07552-68.061867c-5.229227-5.270187-13.76256-5.270187-18.991787 0L530.322773 875.342507c-1.256107 1.26976-2.266453 2.78528-2.962773 4.450987l-46.08 114.141867c-1.993387 4.99712-0.832853 10.704213 2.976427 14.527147 2.566827 2.566827 6.007467 3.93216 9.489067 3.93216 1.693013 0 3.413333-0.314027 5.051733-0.955733l72.4992-29.300053 0 0 41.629013-16.779947c1.652053-0.682667 3.19488-1.67936 4.450987-2.962773l308.933973-308.933973c2.53952-2.49856 3.918507-5.925547 3.918507-9.475413C930.24256 640.423253 928.84992 637.023573 926.324053 634.51136L926.324053 634.51136zM600.35072 941.4656l-44.591787 17.995093-22.473387-22.48704 17.995093-44.56448 297.465173-297.478827 22.582613 22.582613L588.322133 900.532907c-2.635093 2.62144-2.635093 6.867627 0 9.489067 1.31072 1.324373 3.017387 1.993387 4.75136 1.993387 1.706667 0 3.44064-0.669013 4.75136-1.993387l283.019947-283.019947 16.95744 16.984747L600.35072 941.4656 600.35072 941.4656z"/>
        <Path
            d="M619.246933 597.23776l-18.88256 0L600.364373 417.9968c0-10.417493-8.451413-18.868907-18.855253-18.868907l-94.344533 0 0 18.868907 84.86912 0c5.20192 0 9.46176 4.232533 9.46176 9.434453l0 160.385707c0 5.229227-4.273493 9.4208-9.46176 9.4208l-113.199787 0L458.83392 276.493653c0-10.40384-8.43776-18.868907-18.855253-18.868907L298.51648 257.624747c-10.417493 0-18.868907 8.465067-18.868907 18.868907l0 320.744107-18.88256 0c-5.20192 0-9.434453 4.246187-9.434453 9.4208 0 5.20192 4.232533 9.434453 9.434453 9.434453l358.48192 0c5.174613 0 9.434453-4.246187 9.434453-9.434453C628.69504 601.483947 624.421547 597.23776 619.246933 597.23776L619.246933 597.23776zM440.005973 597.23776 298.51648 597.23776 298.51648 285.928107c0-5.20192 4.21888-9.434453 9.4208-9.434453l122.620587 0c5.20192 0 9.434453 4.232533 9.434453 9.434453L439.99232 597.23776 440.005973 597.23776zM326.806187 399.127893l28.289707 0 0-28.289707-28.289707 0L326.806187 399.127893 326.806187 399.127893zM326.806187 342.534827l28.289707 0 0-28.317013-28.289707 0L326.806187 342.534827 326.806187 342.534827zM383.412907 399.127893l28.289707 0 0-28.289707-28.289707 0L383.412907 399.127893 383.412907 399.127893zM383.412907 342.534827l28.289707 0 0-28.317013-28.289707 0L383.412907 342.534827 383.412907 342.534827z"/>
    </G>;

    //情报线索
    static IC_MAIN_QBXS = <G fill="#d81e06">
        <Path
            d="M511.146667 334.08c3.413333-17.92 23.893333-18.346667 25.173333-38.4-14.08-20.053333-36.266667-31.573333-52.48-49.493333-10.666667 8.96-28.586667 29.866667-28.586667 38.4 15.36 20.053333 34.56 35.84 55.893334 49.493333z m-112.213334-53.333333c-13.226667-14.933333-41.386667-15.36-70.4-14.506667 0 34.986667 48.213333 17.493333 70.4 14.506667z m-109.653333 5.973333c-12.8 12.8-16.213333 35.413333-14.506667 63.146667 11.946667-11.946667 54.186667-53.76 14.506667-63.146667zM398.08 364.8c31.573333-1.28 54.186667-11.093333 84.906667-13.226667-15.786667-36.693333-72.96-47.786667-116.48-29.013333 8.96 15.36 17.493333 32 31.573333 42.24z m134.4-5.973333c17.493333 29.013333 53.333333 64.426667 87.893333 28.586666-15.786667-22.613333-34.986667-42.666667-52.48-63.573333-14.506667 8.96-23.04 23.893333-35.413333 34.986667z m-223.146667 107.093333c24.746667-21.333333 37.12-54.186667 60.586667-76.373333-10.24-19.2-26.026667-32.426667-34.986667-52.906667-37.12 23.04-55.893333 84.906667-25.6 129.28zM253.44 377.6c-20.48-1.706667-32 5.546667-49.493333 6.826667 7.253333 26.453333 12.373333 55.04 24.32 77.226666 14.506667-6.4 29.013333-13.226667 46.08-17.066666-6.826667-22.613333-13.653333-44.8-20.906667-66.986667z m204.373333 71.68c38.826667-0.426667 65.28-14.08 102.4-16.64-15.786667-55.466667-79.36-52.906667-137.386666-36.266667 6.4 23.04 20.053333 38.4 34.986666 52.906667z m172.373334 54.186667c20.053333-1.28 31.146667-11.093333 46.08-17.066667-8.106667-26.88-23.466667-46.933333-34.986667-70.4-15.36 5.973333-23.466667 18.773333-35.413333 27.733333 4.693333 23.466667 17.92 37.973333 24.32 59.733334z m-235.946667-82.773334c-33.706667 29.44-91.733333 98.133333-25.6 129.28 23.466667-38.826667 83.2-87.893333 25.6-129.28z m214.613333 100.266667c-3.413333-23.466667-18.346667-35.413333-24.32-56.32-37.973333 1.706667-64 15.36-102.4 16.64 7.68 23.893333 23.466667 39.68 38.4 56.32 30.293333-5.12 56.746667-13.653333 88.32-16.64z m-296.533333 11.52c-2.986667-38.4-36.266667-70.4-70.4-39.253333 8.106667 25.6 22.613333 45.226667 34.986667 66.986666 14.506667-6.826667 26.88-15.786667 35.413333-27.733333z m138.24-34.133333c-20.48 25.173333-41.386667 49.92-57.173333 80.213333 20.48 6.826667 31.146667 23.04 52.906666 28.586667 48.213333-32.426667 48.64-69.973333 4.266667-108.8z m200.533333 36.693333c-8.106667 20.48 0 52.48 10.24 66.56 18.773333 1.28 33.706667-1.28 45.653334-6.826667-5.546667-24.746667-12.8-47.786667-17.066667-73.813333-15.786667 1.706667-27.306667 8.106667-38.826667 14.08z m-105.813333 34.133333c11.52 24.746667 29.013333 43.52 45.653333 63.573334 21.76-1.706667 35.413333-11.52 46.08-24.32 1.706667-58.026667-46.933333-57.173333-91.733333-39.253334z m-247.466667 19.2c13.226667 19.2 30.293333 35.413333 49.066667 49.493334 17.493333-6.826667 28.586667-20.906667 35.413333-37.973334-20.48-22.613333-57.6-40.533333-84.48-11.52z m180.053334 40.106667c14.933333 19.2 45.653333 43.52 77.653333 25.173333-8.106667-27.733333-31.146667-41.386667-41.813333-66.986666-16.213333 9.813333-22.186667 29.866667-35.84 41.813333z m-92.16 34.133333c28.586667 20.48 64.853333 34.986667 88.32 0.853334-16.213333-32-80.213333-53.333333-88.32-0.853334z m477.013333-107.52c0.853333-5.546667 1.706667-10.666667 2.56-16.213333 1.706667-11.52 2.986667-23.466667 3.84-35.413333 8.96-170.666667-92.586667-326.826667-248.746667-390.4-25.173333-9.813333-51.626667-17.493333-78.933333-21.76-55.893333-9.813333-114.773333-7.68-173.653333 8.106666-157.013333 42.24-267.946667 171.093333-293.546667 320v0.426667c-7.253333 42.666667-7.253333 84.48-1.28 125.013333 0.853333 4.266667 1.706667 8.96 2.56 13.226667 1.28 5.973333 2.133333 11.52 3.413333 17.066667 36.693333 150.613333 159.573333 272.64 322.56 300.373333 204.373333 34.986667 398.933333-90.453333 453.546667-284.16 2.986667-11.946667 5.546667-23.893333 7.68-36.266667z m-320 204.8c-156.586667 41.813333-316.16-48.64-357.12-203.093333-18.346667-69.546667-9.386667-140.373333 20.48-200.96 0 0.853333 0 1.706667 0.426667 2.56 56.32 6.4 38.4-46.506667 64-76.373333 35.413333-41.386667 101.546667-40.533333 158.72-9.386667 8.96-13.226667 20.053333-24.32 24.746666-41.813333-20.053333-11.093333-43.093333-19.626667-67.84-26.453334 2.986667-0.853333 5.546667-1.706667 8.533334-2.56 156.586667-42.24 316.586667 49.066667 357.12 203.093334 40.96 154.026667-52.48 313.173333-209.066667 354.986666z m398.506667 68.693334l-88.32-82.346667c-26.453333 37.973333-58.453333 71.68-94.72 100.266667l81.066666 75.52c20.48 21.333333 55.893333 21.76 78.506667 1.28l20.48-18.773334c22.186667-20.48 23.466667-54.613333 2.986667-75.946666z"/>
    </G>

}