import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    StyleSheet,

    TouchableOpacity,
    TouchableHighlight,
    TouchableNativeFeedback,

    FlatList,
    RefreshControl,

    ActivityIndicator,
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
            modalVisible: false
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
    
    render() {
        return (
            <View>
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

                <View><Text >{this.props.page.Main.videoListData[0].video_id}</Text></View>
                <View>
                    <FlatList
                        refreshControl={
                            <RefreshControl
                                refreshing={this.props.page.Main.loading}
                                onRefresh={this.props.updateList}
                            />
                        }
                        data={this.props.page.Main.videoListData}
                        renderItem={({ item }) => <Text style={styles.item}>{item.video_id}</Text>}
                    />
                </View>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        alert("Modal has been closed.");
                        this.setModalVisible(!this.state.modalVisible);
                    }}
                >
                    <View style={{ marginTop: 22 }}>
                        <View>
                            <Text>Hello World!</Text>

                            <TouchableHighlight
                                onPress={() => {
                                    this.setModalVisible(!this.state.modalVisible);
                                }}
                            >
                                <Text>Hide Modal</Text>
                            </TouchableHighlight>


                            {/* picker　类似select */}
                            <Picker
                                selectedValue={this.state.language}
                                style={{ height: 50, width: 100 }}
                                onValueChange={(itemValue, itemIndex) => this.setState({ language: itemValue })}>
                                <Picker.Item label="Java" value="java" />
                                <Picker.Item label="JavaScript" value="js" />
                            </Picker>

                            {/* ProgressBarAndroid */}
                            <ProgressBarAndroid color="#ff4400" />
                            <ProgressBarAndroid styleAttr="Horizontal" />
                            <ProgressBarAndroid styleAttr="Horizontal" color="#2196F3" />
                            <ProgressBarAndroid
                                styleAttr="Horizontal"
                                indeterminate={false}
                                progress={0.5}
                            />

                            {/* loading */}
                            <View style={[styles.container, styles.horizontal]}>
                                <ActivityIndicator size="large" color="#ff4400" />
                                <ActivityIndicator size="small" color="#00ff00" />
                                <ActivityIndicator size="large" color="#0000ff" />
                                <ActivityIndicator size="small" color="#f45420" />
                            </View>
                        </View>
                    </View>
                </Modal>
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