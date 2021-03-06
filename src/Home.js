import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    StyleSheet,
    StatusBar,

    ScrollView,
    FlatList,
    RefreshControl,

    TouchableOpacity,
    TouchableHighlight,
    TouchableNativeFeedback,

    // ActivityIndicator,
    Modal,
    Picker,
    ProgressBarAndroid
} from 'react-native';
import * as Actions from './redux/actions/Main';
import { connect } from 'react-redux';
import { website } from '../webConfig'
const dimensions = require('Dimensions')
const { width } = dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexGrow: 1,
        flexBasis: '100%',
        backgroundColor: '#f3f3f3',
    },

    // header: {
    //     display: 'flex',
    //     flexDirection: 'row',
    //     height: 55,
    //     width: '100%',
    //     backgroundColor: '#0093ff',
    //     justifyContent: 'space-between',
    // },
    // headerButton: {
    //     width: 55,
    //     height: 55,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    // },
    // headerSearch: {
    //     width: '50%',
    //     marginTop: 10,
    //     marginBottom: 10,
    //     backgroundColor: '#fff',
    //     borderRadius: 5,
    //     borderColor: '#fff',
    //     borderWidth: 1,
    //     padding: 5,
    //     fontSize: 14
    // },

    // 
    banner: {
        display: 'flex',
        flexDirection: 'column',
    },
    bannerContent: {
        flexGrow: 1,
        flexShrink: 1,
    },
    bannerStyle: {
        width: width,
        height: 60,
    },

    // 
    circleWrapperStyle: {
        display: 'flex',
        flexBasis: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        left: '30%',
        bottom: 10,
        position: 'absolute'
    },
    circleStyle: {
        width: '10%',
        height: 3,
        marginLeft: 5,
        marginRight: 5,
        backgroundColor: '#fff'
    },

    // 
    videoList: {
        display: 'flex',
        flexDirection: 'row',
        paddingBottom: 60
    },
    videoListContent: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: '50%',
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
    },
    videImg: {
        borderRadius: 5,
        height: 120
    },
    videoInfo: {
        marginLeft: 5,
        lineHeight: 30
    },
    button: {
        width: 120,
        height: 45,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4398ff',
    },
});

class Home extends Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        //隐藏顶部导航栏
        // header: null,
    });
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            modalVisible: false,
            currentPage: 0
        };
    }
    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }
    componentDidMount() {
        // 设置状态栏样式
        this._navListener = this.props.navigation.addListener('didFocus', () => {
            StatusBar.setBarStyle('light-content');
            StatusBar.setBackgroundColor('#00000000');
            StatusBar.setTranslucent(true)
        });
        this.startTimer();
    }

    componentWillUnmount() {
        this._navListener.remove();
    }
    componentWillMount() {
        this.props.GetVideoListing();
        this.props.GetBannerListing()
    }
    updateList = () => {
        this.props.GetVideoListing();
        this.props.GetBannerListing()
    }

    // banner
    renderScrollView = () => {
        return this.props.page.Main.banner.map((item, index) => {
            return <View style={styles.bannerContent} key={item + index + 'bannerView'}>
                <Image
                    key={item + index + 'banner'}
                    style={styles.bannerStyle}
                    source={{ uri: website + '/api/img/' + item.img_img }}
                />
            </View>
        })
    }
    //绘制圆点
    renderCircle = () => {
        return this.props.page.Main.banner.map((item, index) => {
            var style = {};
            if (index === this.state.currentPage) {
                style = { width: '10%', backgroundColor: '#0093ff' };
            }
            return <View key={Math.random().toString()} style={[styles.circleStyle, style]}></View>
        })
    }
    //开始拖拽
    handleScrollBegin = () => {
        clearInterval(this.timer);
    }
    //　停止拖拽 
    handleScrollEnd = (e) => {
        var x = e.nativeEvent.contentOffset.x;
        var position = Math.round(x / width)
        this.setState({ currentPage: position })
        this.startTimer();
    }
    // 自动播放定时器
    startTimer = () => {
        this.timer = setInterval(() => {
            var currentPage = ++this.state.currentPage == this.props.page.Main.banner.length ? 0 : this.state.currentPage;
            this.refs.scrollView.scrollTo({ x: currentPage * width, y: 0, animated: true });
            this.setState({ currentPage });
        }, 5000)
    }

    render() {
        return (
            <View style={styles.container}>
                {/* <StatusBar
                        barStyle="light-content"
                        backgroundColor="#6a51ae"
                        /> */}
                {/* <View style={styles.header}>
                    <TouchableNativeFeedback
                        background={TouchableNativeFeedback.SelectableBackground()}
                        onPress={() => {
                            this.props.navigation.openDrawer()
                        }}>
                        <View style={styles.headerButton}>
                            <Image
                                style={{ height: 24, width: 24, tintColor: '#fff' }}
                                source={require('../images/ic_home.png')}
                            />
                        </View>
                    </TouchableNativeFeedback>
                    <TextInput
                        style={styles.headerSearch}
                        placeholder="搜索"
                        placeholderTextColor="#555"
                        onChangeText={(text) => this.setState({ text })}
                    />
                    <TouchableNativeFeedback
                        background={TouchableNativeFeedback.SelectableBackground()}
                        onPress={() => {
                            this.setModalVisible(true);
                        }}>
                        <View style={styles.headerButton}>
                            <Image
                                style={{ height: 24, width: 24, tintColor: '#fff' }}
                                source={require('../images/ic_home.png')}
                            />
                        </View>
                    </TouchableNativeFeedback>
                </View> */}
                <View style={styles.banner}>
                    <ScrollView
                        ref="scrollView"
                        scrollEnabled={true} //内容不能滚动
                        horizontal={true}
                        pagingEnabled={true}
                        showsHorizontalScrollIndicator={false}
                        onMomentumScrollEnd={e => this.handleScrollEnd(e)}
                        onTouchStart={this.handleScrollBegin}
                    >
                        {this.renderScrollView()}
                    </ScrollView>
                    <View style={styles.circleWrapperStyle}>
                        {this.renderCircle()}
                    </View>
                </View>
                <View style={styles.videoList}>
                    <FlatList
                        key={Math.random().toString()}
                        numColumns={2}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.props.page.Main.loading}
                                onRefresh={this.updateList}
                                colors={['#0093ff']}
                            />
                        }
                        data={this.props.page.Main.videoListData}
                        renderItem={({ item, index }) => (
                            <View key={item + index + 'video'} style={styles.videoListContent} >
                                <TouchableOpacity activeOpacity={0.9}
                                    keys={item + index + 'videoImgButton'}
                                    onPress={
                                        () => {
                                            this.props.navigation.navigate('VideoDetailOne', { id: item.video_id, name: item.video_name })
                                        }
                                    }>
                                    <Image
                                        keys={item + index + 'videoImg'}
                                        style={styles.videImg}
                                        source={{ uri: website + '/api/img/' + item.video_img }}
                                    />
                                </TouchableOpacity>
                                <Text style={styles.videoInfo}>{item.video_name}</Text>
                            </View>
                        )}
                    />
                </View>
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
        GetVideoListing: () => { dispatch(Actions.videoGetListing()) },
        GetBannerListing: () => { dispatch(Actions.bannerGetListing()) },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);