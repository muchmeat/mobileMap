import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Text,
    Image,
    TouchableOpacity,
    TouchableHighlight,
    ImageBackground
} from "react-native";

import styles from "../../style/Personal";
import GroupItem from "../../../base/components/GroupItem2";
import FileItem from "../../../base/components/FileDetailItem";
import GroupTitle from "../../../base/components/GroupTitle2";
import { connect } from 'react-redux';
import Svg from "react-native-svg";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ThemeStyle from "../../style/ThemeStyle";
import IconLib from "../../../../assets/svg/IconLib";
import OpenFile from "react-native-doc-viewer";

class Detail2 extends Component {

    static navigationOptions = {
        title: '详情-2',
    };

    componentDidMount(){

    }

    render() {
        return(
            <View style={styles.detail.container}>
                <ScrollView>
                    <View style={styles.idCard}>
                        <View style={styles.idCardImgView}>
                            <Image style={styles.idCardImg} resizeMode={"cover"} source={require("../../../../assets/images/header.png")}/>
                        </View>
                        <View style={{flex:1,height:90}}>
                            <View style={{flex:1,flexDirection:"row",justifyContent:"flex-start",alignItems:"center",paddingTop:5}}>
                                {/*<FontAwesome name={"user"} size={20} color={ThemeStyle.color.theme}/>*/}
                                <Svg height={20} width={20} viewBox={"0 0 1024 1024"}>{IconLib.IC_HEADER}</Svg>
                                <Text style={{fontSize:16,paddingLeft:10}}>朱二壮</Text>
                            </View>
                            <View style={{flex:1,flexDirection:"row",justifyContent:"flex-start",alignItems:"center",paddingBottom:5}}>
                                <Svg height={20} width={20} viewBox={"0 0 1024 1024"}>{IconLib.IC_CARD}</Svg>
                                <Text style={{fontSize:16,paddingLeft:10}}>34020119890213095X</Text>
                            </View>
                        </View>
                    </View>
                    <GroupTitle title={"主要信息"}/>
                    <View style={styles.group2}>
                        <GroupItem text={"姓名"} value={"朱二壮"}/>
                        <GroupItem text={"身份证号码"} value={"34020119890213095X"}/>
                        <GroupItem text={"出生日期"} value={"1989-02-13"}/>
                        <GroupItem text={"户籍地详址"} value={"芜湖市镜湖区伟星城17A座五栋二单元801伟星城17座五栋二单元80117座五栋二单元801"}/>
                    </View>
                    <GroupTitle title={"其他信息"}/>
                    <View style={styles.group2}>
                        <GroupItem text={"涉毒人员来源"} value={"市局分发"}/>
                        <GroupItem text={"别名/绰号"} value={"二子"}/>
                        <GroupItem text={"通讯信息"} value={"18326908768"} onClick={()=>{}}/>
                    </View>
                    <GroupTitle title={"附件"}/>
                    <View style={styles.group2}>
                        <FileItem name={"朱二壮社区康复记录.doc"} type={"doc"}/>
                        <FileItem name={"朱二壮吸毒记录.xls"} type={"xls"}/>
                        <FileItem name={"审判录像.mp4"} type={"mp4"} navigation={this.props.navigation} video={{
                            poster:null,
                            // uri:"http://samples.mplayerhq.hu/MPEG-4/video.mp4",
                            uri:"https://media.w3.org/2010/05/sintel/trailer.mp4",
                            // fullBuffer:true,
                        }}/>
                    </View>
                    <View style={styles.group2}>
                        <View style={styles.detail.imgRow2}>
                            <View style={styles.detail.imgRow2View}>
                    <TouchableOpacity onPress={()=>{
                        try {
                            OpenFile.openDoc([{
                                url:"http://172.28.1.208:8082/zybzzxt/attachment/getImage?id=361", // Local "file://" + filepath
                                fileName:"111",
                                cache:false,
                                fileType:"png"
                            }], (error, url) => {
                                if (error) {
                                    console.warn(error)
                                }
                            })
                        }catch(e) {
                            console.warn(e)
                        }
                    }}>
                        <Image resizeMode={"cover"}  style={styles.detail.imgItem} source={{uri:"http://172.28.1.208:8082/zybzzxt/attachment/getImage?id=361"}}/>
                    </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <GroupTitle title={"图片"} number={"1/4"}/>
                    <View style={styles.group2}>
                        <View style={styles.detail.imgRow2}>
                            <View style={styles.detail.imgRow2View}>
                                <Image resizeMode={"cover"}  style={styles.detail.imgItem} source={require("../../../../assets/images/assert.png")}/>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

export default connect((state)=>({

}),(dispatch)=>({

}))(Detail2)
