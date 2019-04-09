import React, { Component } from 'react';
import { Text, View, StyleSheet, SafeAreaView, Button, StatusBar, Platform } from 'react-native';
import { createStackNavigator, createAppContainer, createDrawerNavigator, createBottomTabNavigator,
StackNavigator } from 'react-navigation';


const isAndroid = Platform.OS === 'android';

class Screen1 extends React.Component {
    componentDidMount() {
        this._navListener = this.props.navigation.addListener('didFocus', () => {
          StatusBar.setBarStyle('light-content');
          isAndroid && StatusBar.setBackgroundColor('#00000000');
          StatusBar.setTranslucent(true)
        });
      }
    
      componentWillUnmount() {
        this._navListener.remove();
      }
  render() {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: '#6a51ae' }]}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#6a51ae"
        />
        <Text style={[styles.paragraph, { color: '#fff' }]}>
          Light Screen
        </Text>
        <Button
          title="Next screen"
          onPress={() => this.props.navigation.navigate('Screen2')}
          color={isAndroid ? "blue" : "#fff"}
        />
      </SafeAreaView>
    );
  }
}

class Screen2 extends React.Component {
    componentDidMount() {
        this._navListener = this.props.navigation.addListener('didFocus', () => {
          StatusBar.setBarStyle('dark-content');
          isAndroid && StatusBar.setBackgroundColor('#FF4400');
          StatusBar.setTranslucent(true)
        });
      }
    
      componentWillUnmount() {
        this._navListener.remove();
      }
  render() {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: '#ecf0f1' }]}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="#ecf0f1"
        />
        <Text style={styles.paragraph}>
          Dark Screen
        </Text>
        <Button
          title="Next screen"
          onPress={() => this.props.navigation.navigate('Screen1')}
        />
      </SafeAreaView>
    );
  }
}

// export default createAppContainer(createStackNavigator({
//   Screen1: {
//     screen: Screen1,
//   },
//   Screen2: {
//     screen: Screen2,
//   },
// }, {
//   headerMode: 'none',
// }));

// Uncomment this area and comment out the other navigators to see a drawer example
//
export default data = createDrawerNavigator({
  Screen1: {
    screen: Screen1,
  },
  Screen2: {
    screen: Screen2,
  },
});

// Uncomment this area and comment out the other navigators to see a tab example
//
// export default createAppContainer(createBottomTabNavigator({
//   Screen1: {
//     screen: Screen1,
//     navigationOptions: {
//       tabBarOnPress: ({ previousScene, scene, jumpToIndex }) => {
//         // TODO: This doesn't handle the initial render because the second screen renders last. What to do?
//         StatusBar.setBarStyle('light-content');
//         isAndroid && StatusBar.setBackgroundColor('#6a51ae');
//         jumpToIndex(scene.index);
//       },
//     },
//   },
//   Screen2: {
//     screen: Screen2,
//     navigationOptions: {
//       tabBarOnPress: ({ previousScene, scene, jumpToIndex }) => {
//         StatusBar.setBarStyle('dark-content');
//         isAndroid && StatusBar.setBackgroundColor('#ecf0f1');
//         jumpToIndex(scene.index);
//       },
//     },
//   },
// }));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  paragraph: {
    fontSize: 18,
    fontWeight: 'bold',
  },
})