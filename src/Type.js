import React, { Component } from 'react';
import {
    View,
    FlatList,
    Text,
    StyleSheet,
    TouchableOpacity,
    RefreshControl
} from 'react-native';

export default class Type extends Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        //隐藏顶部导航栏
        header: null,
    });
    constructor(props) {
        super(props);
        this.state = {
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
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