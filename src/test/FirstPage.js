import React, { Component } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native';
export default class SecondPage extends Component {
    static navigationOptions = ({navigation, screenProps}) => ({
        tabBarLabel: '首页',
        tabBarIcon: ({tintColor}) => (
            <Image
                source={require('../../images/ic_home.png')}
                style={[{height: 24, width: 24}, {tintColor: tintColor}]}/>
        ),

    });
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    This is First Page!
                </Text>
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
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    textView: {
        fontSize: 16,
        textAlign: 'center',
        margin: 10,
        color:'red'
    },
});