/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    View,
    Text,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    ProgressBarAndroid,
    TouchableNativeFeedback,
    Animated
} from 'react-native';

import {
    TabNavigator,
} from 'react-navigation';
import InfoOne from './InfoOne';
import Mine from '../Mine';

import Icon from "react-native-vector-icons/AntDesign";
import Video from 'react-native-video';
import { formatTime } from '../tools/formateTime'
import * as Actions from '../redux/actions/Detail';
import { connect } from 'react-redux';
import { website } from '../../webConfig'

const dimensions = require('Dimensions')
const { width, height } = dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#F5FCFF'
    },
    titleContoller: {
        position: 'absolute',
        width: '100%',
        height: 50,
        zIndex: 99999
    },
    backButton: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginTop: 10,
        marginLeft: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
        overflow: 'hidden',
        height: 0.5625 * width,
        backgroundColor: '#000'
    },
    backgroundVideo: {
        height: 0.5625 * width,
    },

    videoController: {
        height: 30,
        marginTop: -30,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    videoControllerIcon: {
        width: 40,
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 5,
        paddingBottom: 5,
    },
    videoState: {
        width: 20,
        height: 20,
        backgroundColor: '#ccc',
        textAlign: 'center'
    },
    videoProgress: {
        height: 30,
        width: width - 175
    },
    playTime: {
        paddingLeft: 5,
        paddingRight: 5,
        width: 100,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    },
    playTimeFont: {
        lineHeight: 30,
        color: '#fff'
    },

    // 
    videoInfo: {
        height: height - 0.5625 * width - 26,
        backgroundColor: '#F5FCFF'
    }
});

// 
const InfoNavigator = TabNavigator({
    '简介': {
        screen: InfoOne
    },
    '评论': {
        screen: Mine
    },
},{
     initialRouteName: '简介',
     swipeEnabled: true,
     animationEnabled: true,
     lazy: false,
     tabBarPosition:'top',
     tabBarOptions: {
        //Android属性
        upperCaseLabel: false,//是否使标签大写，默认为true
        //共有属性
        showIcon: false,//是否显示图标，默认关闭
        showLabel: true,//是否显示label，默认开启
        activeTintColor: '#0093ff',//label和icon的前景色 活跃状态下（选中）
        inactiveTintColor: 'gray',//label和icon的前景色 活跃状态下（未选中）
        style: { //TabNavigator 的背景颜色
            backgroundColor: 'white',
            height: 30,
        },
        indicatorStyle: {//标签指示器的样式对象（选项卡底部的行）。安卓底部会多出一条线，可以将height设置为0来暂时解决这个问题
            height: 0,
        },
        labelStyle: {//文字的样式
            fontSize: 14,
            lineHeight: 26,
            marginTop: -5,
            // marginBottom: 5,
        },
        iconStyle: {//图标的样式
            // marginBottom: 5,
        }
    },
 });

class VideoDetailOne extends Component {
    constructor(props) {
        super(props);
        this.state = {
            paused: true,
            duration: 0,
            currentTime: 0,
            showContoller: false,
            videoControllerMarginTop: new Animated.Value(0),
            pageControllerTop: new Animated.Value(-50)
        };
    }
    componentWillMount() {
        this.props.GetVideoInfo(this.props.navigation.state.params.id);
    }
    componentDidMount = () => {
        this._navListener = this.props.navigation.addListener('didFocus', () => {
            StatusBar.setBarStyle('light-content');
            StatusBar.setBackgroundColor('#00000000');
            StatusBar.setTranslucent(true)
        });
        this.showControllers()
    }
    static navigationOptions = ({ navigation, screenProps }) => ({
        headerStyle: { backgroundColor: '#0093ff', paddingTop: screenProps.statusBarHeight, height: 0},
        // headerTitle: `${navigation.state.params.name}`,
        // //设置滑动返回的距离
        // gestureResponseDistance: { horizontal: 300 },
        // //是否开启手势滑动返回，android 默认关闭 ios打开
        // // gesturesEnabled: true,
        // //设置跳转页面左侧返回箭头后面的文字，默认是上一个页面的标题
        // headerBackTitle: null,
        // //导航栏的样式
        // headerStyle: styles.headerStyle,
        // //导航栏文字的样式
        // headerTitleStyle: styles.headerTitleStyle,
        // //返回按钮的颜色
        // headerTintColor: 'white',
        // //隐藏顶部导航栏
        // // header: null,
        // //设置顶部导航栏右边的视图  和 解决当有返回箭头时，文字不居中
        headerRight: (<View />),
        // //设置导航栏左边的视图
        headerLeft: (<View/>),

    });

    onLoad = (data) => {
        this.setState({ duration: data.duration });
    };
    onProgress = (data) => {
        this.setState({ currentTime: data.currentTime });
    };
    onEnd = () => {
        this.setState({ paused: true });
        this.video.seek(0)
    };
    // 播放/暂停
    playControl = () => {
        return <TouchableOpacity onPress={() => {
            this.setState({ paused: !this.state.paused })
        }}>
            <Icon name={this.state.paused ? 'caretright' : 'pause'} style={styles.videoControllerIcon} size={20} color='#cccccc'></Icon>
        </TouchableOpacity>
    }
    // 进度
    PlayProgressBar = () => {
        return <ProgressBarAndroid style={styles.videoProgress} color="#0093ff" progress={this.state.currentTime / this.state.duration} styleAttr="Horizontal" indeterminate={false} animating={true} />
    }
    // 时间
    PlayTime = () => {
        return <View style={styles.playTime}>
            <Text style={styles.playTimeFont}>{formatTime(this.state.currentTime)}</Text>
            <Text style={styles.playTimeFont}>/</Text>
            <Text style={styles.playTimeFont}>{formatTime(this.state.duration)}</Text>
        </View>
    }
    // 
    showControllers = () => {
        if(this.state.showContoller) {
            this.hideController()
        } else {
            this.showController()
        }

    }

    // 显示视频控制条
    showController = () => {
        clearTimeout(this.nextController)
        Animated.parallel([
            Animated.timing(                  // 随时间变化而执行动画
                this.state.pageControllerTop,            // 动画中的变量值
                {
                  toValue: 0,                   // 透明度最终变为1，即完全不透明
                  duration: 1000,              // 让动画持续一段时间
                }
              ),
            Animated.timing(                  // 随时间变化而执行动画
                this.state.videoControllerMarginTop,            // 动画中的变量值
                {
                  toValue: -30,                   // 透明度最终变为1，即完全不透明
                  duration: 1000,              // 让动画持续一段时间
                }
              )
        ]).start(()=>{
            this.setState({showContoller: true});
            this.nextController = setTimeout(
                () => {
                   this.hideController();
                }, 5000
            )
          });
    }
    // 隐藏视频控制条
    hideController = () => {
        Animated.parallel([
            Animated.timing(                  
                this.state.pageControllerTop,            
                {
                  toValue: -50,                
                  duration: 1000,
                }
            ),
            Animated.timing(                  
                this.state.videoControllerMarginTop,            
                {
                  toValue: 0,                
                  duration: 1000,
                }
            )
        ]).start(()=>{
            this.setState({showContoller: false})
        });
    }

    render() {
        return (
            <View style={styles.container} keys={new Date()}>
                <Animated.View style={[styles.titleContoller, {top: this.state.pageControllerTop}]}>
                    <TouchableOpacity style={styles.backButton} activeOpacity={0.5} onPress={
                        () => {
                            this.props.navigation.goBack()
                        }
                    }>
                        <Icon name='arrowleft' style={styles.videoControllerIcon} size={20} color='#fff'></Icon>
                    </TouchableOpacity>
                </Animated.View>
                <View style={styles.videContainer}>
                    <TouchableNativeFeedback style={styles.videContainer} onPress={this.showControllers}>
                        <Video
                            style={styles.backgroundVideo}
                            keys={new Date()}
                            source={{ uri: website + '/api/video/' + this.props.page.Detail.videoData.video_url }}   // 可以是一个 URL 或者 本地文件
                            ref={(ref: Video) => {
                                this.video = ref
                            }}
                            // poster={'http://192.168.31.203:3000/api/img/' + this.props.page.Detail.videoData.video_img}
                            paused={this.state.paused} //暂停
                            // rate={this.state.rate}//播放速率
                            // paused={this.state.paused}
                            // volume={this.state.volume}//调节音量
                            // muted={this.state.muted}//控制音频是否静音
                            // resizeMode={this.state.resizeMode}//缩放模式
                            onLoad={this.onLoad}//加载媒体并准备播放时调用的回调函数。
                            onProgress={this.onProgress}//视频播放过程中每个间隔进度单位调用的回调函数
                            onEnd={this.onEnd}//视频播放结束时的回调函数
                            // onAudioBecomingNoisy={this.onAudioBecomingNoisy}//音频变得嘈杂时的回调 - 应暂停视频
                            // onAudioFocusChanged={this.onAudioFocusChanged}//音频焦点丢失时的回调 - 如果焦点丢失则暂停
                            repeat={false}//确定在到达结尾时是否重复播放视频。

                        // onBuffer={this.onBuffer}                // 远程视频缓冲时的回调
                        // onEnd={this.onEnd}                      // 播放完成后的回调
                        // onError={this.videoError}               // 播放失败后的回调
                        // onFullscreenPlayerWillPresent={this.fullScreenPlayerWillPresent} // 全屏启动前的回调
                        // onFullscreenPlayerDidPresent={this.fullScreenPlayerDidPresent}   // 全屏启动后的回调
                        // onFullscreenPlayerWillDismiss={this.fullScreenPlayerWillDismiss} // 全屏停止前的回调
                        // onFullscreenPlayerDidDismiss={this.fullScreenPlayerDidDismiss}  // 全屏停止后的回调
                        />
                    </TouchableNativeFeedback>
                    {/* <Animated.View style={[styles.videoController,{ marginTop: this.state.showContoller ? -30 : 0}]}>opacity: fadeAnim */}
                    <Animated.View style={[styles.videoController,{marginTop: this.state.videoControllerMarginTop}]}>
                        <View>{this.playControl()}</View>
                        <View>{this.PlayProgressBar()}</View>
                        <View>{this.PlayTime()}</View>
                        <View><Icon name='arrowsalt' style={styles.videoControllerIcon} size={20} color='#cccccc'></Icon></View>
                    </Animated.View>
                </View>
                <View style={styles.videoInfo}>
                    <InfoNavigator navigation={this.props.navigation}/>
                </View>
            </View>
        );
    }
}
// 嵌套页面时要继承之前的
VideoDetailOne.router = InfoNavigator.router;

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
export default connect(mapStateToProps, mapDispatchToProps)(VideoDetailOne)

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



