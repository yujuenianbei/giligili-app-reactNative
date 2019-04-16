import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    WebView,
    BackHandler, ToastAndroid,
    Linking,
    TouchableOpacity,
} from 'react-native';
const dimensions = require('Dimensions')
const { width } = dimensions.get('window');
export default class Mine extends Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        //隐藏顶部导航栏
        header: null,
    });
    componentWillMount(){
        BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
}
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }
    onBackAndroid = () => {
        if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
            //最近2秒内按过back键，可以退出应用。
            BackHandler.exitApp();
            return;
        }
        this.lastBackPressed = Date.now();
        ToastAndroid.show('再按一次退出应用',ToastAndroid.SHORT);
        return true;
    }
    render() {
        return (
            <View style={styles.container}>
                <WebView
                    ref="webView"
                    source={{ uri: 'https://www.hpstore.cn' }}
                    style={{ width: width, height: 500 }}
                />
            </View>)
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
    },
    viewForText: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});
