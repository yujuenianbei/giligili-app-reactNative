import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    RefreshControl,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import * as Actions from '../redux/actions/Main';
import { connect } from 'react-redux';
import { website } from '../../webConfig'
const dimensions = require('Dimensions')
const { width, height } = dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexBasis: '100%',
        backgroundColor: '#f3f3f3',
        paddingBottom: 10
    },
    videoMoreListContent: {
        display: 'flex',
        flexDirection: 'row',
        flexGrow: 1,
        width: '100%',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },
    videListImg: {
        width: 120,
        height: 100,
        borderRadius: 5
    },
    videoMoreListContentInfo: {
        display: 'flex',
        flexDirection: 'column',
        width: width - 130,
        padding: 5
    },
    videoMoreListContentInfo_title: {
        flexWrap: 'wrap',
        fontSize: 18,
        marginTop: -5
    },
    videoMoreListContentInfo_author: {
        position: 'absolute',
        bottom: 20,
        marginLeft: 5
    },
    videoMoreListContentInfo_date: {
        position: 'absolute',
        bottom: 0,
        marginLeft: 5
    }
});

class InfoOne extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.container}>
                    <FlatList
                        numColumns={1}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.props.page.Main.loading}
                                onRefresh={this.updateList}
                                colors={['#0093ff']}
                            />
                        }
                        data={this.props.page.Main.videoListData}
                        renderItem={({ item, index }) => (
                            <View key={item + index + new Date()} style={styles.videoMoreListContent} >
                                <TouchableOpacity activeOpacity={0.9} onPress={
                                    () => {
                                        this.props.navigation.navigate('VideoDetailTwo', { id: item.video_id, name: item.video_name })
                                    }
                                }>
                                    <Image
                                        key={item + index}
                                        style={styles.videListImg}
                                        source={{ uri: website + '/api/img/' + item.video_img }}
                                    />
                                </TouchableOpacity>
                                <View style={styles.videoMoreListContentInfo}>
                                    <Text style={styles.videoMoreListContentInfo_title}>{item.video_name}</Text>
                                    <Text style={styles.videoMoreListContentInfo_author}>{item.author_name}</Text>
                                    <Text style={styles.videoMoreListContentInfo_date}>{item.album_data}</Text>
                                </View>
                            </View>
                        )}
                    />
                </ScrollView>
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
        // GetVideoListing: () => { dispatch(Actions.videoGetListing()) },
        // GetBannerListing: () => { dispatch(Actions.bannerGetListing()) },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(InfoOne);