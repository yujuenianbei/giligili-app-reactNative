import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

export default class Home extends Component {
    static navigationOptions = ({navigation, screenProps}) => ({
        //隐藏顶部导航栏
        header: null,
    });

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.button} activeOpacity={0.5} onPress={
                    () => {
                        this.props.navigation.navigate('Details')
                    }
                }>
                    <Text style={{color: 'white'}}>666</Text>
                </TouchableOpacity>
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