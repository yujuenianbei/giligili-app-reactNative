import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    StyleSheet,

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


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        height: 40,
        width: '100%',
        backgroundColor: '#0093ff',
        justifyContent: 'space-between',
    },
    headerButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerSearch: {
        width: '50%',
        marginTop: 5,
        marginBottom: 5,
        backgroundColor: '#fff',
        borderRadius: 5,
        borderColor: '#fff',
        borderWidth: 1,
        padding: 5,
        fontSize: 14
    },
    button: {
        width: 120,
        height: 45,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4398ff',
    }
});

class Home extends Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        //隐藏顶部导航栏
        header: null,
    });
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            modalVisible: false,
            refreshing: false,
            movies: [
                {
                    "video_id": 1553242127271,
                    "video_name": "Perfect",
                    "author_name": "Ed Sheeran",
                    "album_name": "Perfect",
                    "video_img": "1553246355983.jpg",
                    "video_url": "1553242125217.mp4",
                    "video_time": null,
                    "album_data": "2019-03-22"
                }
            ]
        };
    }
    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }
    componentWillMount() {
    }
    updateList = () =>{
        this.props.GetListing()
    }


    
    fetching =() => {
        fetch("http://192.168.1.128:3000/api/videoList", {
            method: 'GET'
        })
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({
                movies:responseData.reqData.videoInfo,
            });
            this.setState({ refreshing: false });
        })
        .catch((error) => {
                callback(error);
        });
    }
    _onRefresh = () => {
        this.setState({ refreshing: true });
        this.fetching()
    }
    
    render() {
        return (
            <View style={styles.container}>
            <View style={styles.header}>
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
                </View>

            <FlatList
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}
                    />
                }
                data={this.state.movies}
                renderItem={({ item }) => <Text style={styles.item}>{item.video_id}</Text>}
            />
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
        GetListing: () => { dispatch(Actions.videoGetListing()) },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);