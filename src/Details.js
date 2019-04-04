/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ProgressBarAndroid
} from 'react-native';
import Video from 'react-native-video';
import * as Actions from './redux/actions/Detail';
import { connect } from 'react-redux';
const dimensions = require('Dimensions')
const { width } = dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#F5FCFF',
        flexBasis: '100%'
    },
    button: {
        width: 240,
        height: 45,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4398ff',
    },
    headerStyle: {
        backgroundColor: '#0093ff',
    },
    headerTitleStyle: {
        color: 'white',
        //设置标题的大小
        fontSize: 18,
        //居中显示
        alignSelf: 'center',
    },

    videContainer: {
        height: 230,
    },
    backgroundVideo: {
        height: 230,
    },

    // 
    videoController: {
        width: '100%',
        height: 20,
        backgroundColor: '#f54120',
        display: 'flex',
        flexDirection: 'row',
    },
    videoState: {
        width: 20,
        height: 20,
        backgroundColor: '#ccc',
    },
    videoProgress: {
        flexBasis: '100%',
        // width: 100,
        height: 20,
        backgroundColor: '#ff1010'
    },
    // 
    videoInfo: {
        height: 50,
        backgroundColor: '#ff1010'
    }
});

class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            paused: true,
        };
    }
    componentWillMount() {
        this.props.GetVideoInfo(this.props.navigation.state.params.id);
    }
    static navigationOptions = ({ navigation, screenProps }) => ({

        headerTitle: `${navigation.state.params.name}`,
        //设置滑动返回的距离
        gestureResponseDistance: { horizontal: 300 },
        //是否开启手势滑动返回，android 默认关闭 ios打开
        // gesturesEnabled: true,
        //设置跳转页面左侧返回箭头后面的文字，默认是上一个页面的标题
        headerBackTitle: null,
        //导航栏的样式
        headerStyle: styles.headerStyle,
        //导航栏文字的样式
        headerTitleStyle: styles.headerTitleStyle,
        //返回按钮的颜色
        headerTintColor: 'white',
        //隐藏顶部导航栏
        // header: null,
        //设置顶部导航栏右边的视图  和 解决当有返回箭头时，文字不居中
        headerRight: (<View />),
        //设置导航栏左边的视图
        // headerLeft: (<View/>),

    });

    // 播放/暂停
    playControl = () => {
        return <View style={styles.videoState}>
            <TouchableOpacity onPress={() => {
                this.setState({ paused: !this.state.paused })
            }}>
                <Text >
                    {this.state.paused ? 'on' : 'off'}
                </Text>
            </TouchableOpacity>
        </View>
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.videContainer}>
                    <Video
                        style={styles.backgroundVideo}
                        source={{ uri: 'http://192.168.1.128:3000/api/video/' + this.props.page.Detail.videoData.video_url }}   // 可以是一个 URL 或者 本地文件
                        ref={(ref: Video) => {
                            this.video = ref
                        }}
                        paused={this.state.paused}
                    // onBuffer={this.onBuffer}                // 远程视频缓冲时的回调
                    // onEnd={this.onEnd}                      // 播放完成后的回调
                    // onError={this.videoError}               // 播放失败后的回调
                    // onFullscreenPlayerWillPresent={this.fullScreenPlayerWillPresent} // 全屏启动前的回调
                    // onFullscreenPlayerDidPresent={this.fullScreenPlayerDidPresent}   // 全屏启动后的回调
                    // onFullscreenPlayerWillDismiss={this.fullScreenPlayerWillDismiss} // 全屏停止前的回调
                    // onFullscreenPlayerDidDismiss={this.fullScreenPlayerDidDismiss}  // 全屏停止后的回调
                    />
                </View>
                <View style={styles.videoController}>
                    {this.playControl()}
                    <View style={styles.videoProgress}>
                        <ProgressBarAndroid styleAttr="Horizontal" />
                    </View>
                </View>
                {/* <View style={styles.videoInfo}>
                    <Text style={{ color: 'black' }}>{this.props.navigation.state.params.id}</Text>
                    <Text style={{ color: 'black' }}>{this.props.page.Detail.videoData.video_id}</Text>
                </View> */}

            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        page: state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        GetVideoInfo: (data) => { dispatch(Actions.videoGet(data)) },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Details)
// https://www.jianshu.com/p/80e095d9b9b9 安装react-native-video 方法

// 注
// android/app/build.gradle
// 添加 
// android {   
    // compileOptions {
    //     sourceCompatibility 1.8
    //     targetCompatibility 1.8
    // }
// }


// dependencies {
//     implementation project(':react-native-video')   //用这个写法　3.0后改写法了
//     implementation fileTree(dir: "libs", include: ["*.jar"])
//     implementation "com.android.support:appcompat-v7:${rootProject.ext.supportLibVersion}"
//     implementation "com.facebook.react:react-native:+"  // From node_modules
// }



