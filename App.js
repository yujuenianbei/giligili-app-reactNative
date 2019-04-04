import React, { Component } from 'react';
import { 
  // Alert, AppRegistry, Platform, StyleSheet, Text, TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback, View 
  AppRegistry,
  StyleSheet,
  PixelRatio,
  Text,
  Image,
  TouchableHighlight,
  DrawerLayoutAndroid,
  ProgressBarAndroid,
  View
} from 'react-native';

export default class Touchables extends Component {
  show(txt) {
    alert(txt);
  }
  // _onPressButton() {
  //   Alert.alert('You tapped the button!')
  // }

  // _onLongPressButton() {
  //   Alert.alert('You long-pressed the button!')
  // }


  render() {
    // return (
    //   <View style={styles.container}>
    //     <TouchableHighlight onPress={this._onPressButton} underlayColor="white">
    //       <View style={styles.button}>
    //         <Text style={styles.buttonText}>TouchableHighlight</Text>
    //       </View>
    //     </TouchableHighlight>
    //     <TouchableOpacity onPress={this._onPressButton}>
    //       <View style={styles.button}>
    //         <Text style={styles.buttonText}>TouchableOpacity</Text>
    //       </View>
    //     </TouchableOpacity>
    //     <TouchableNativeFeedback
    //         onPress={this._onPressButton}
    //         background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : ''}>
    //       <View style={styles.button}>
    //         <Text style={styles.buttonText}>TouchableNativeFeedback</Text>
    //       </View>
    //     </TouchableNativeFeedback>
    //     <TouchableWithoutFeedback
    //         onPress={this._onPressButton}
    //         >
    //       <View style={styles.button}>
    //         <Text style={styles.buttonText}>TouchableWithoutFeedback</Text>
    //       </View>
    //     </TouchableWithoutFeedback>
    //     <TouchableHighlight onPress={this._onPressButton} onLongPress={this._onLongPressButton} underlayColor="white">
    //       <View style={styles.button}>
    //         <Text style={styles.buttonText}>Touchable with Long Press</Text>
    //       </View>
    //     </TouchableHighlight>
    //   </View>
    // );
    var nagvigationView = (
      <View style={{ flex: 1, backgroundColor: "#ff0" }}>
        <Text style={{ margin: 10, fontSize: 12, textAlign: 'left' }}>i  m nagvigation</Text>
      </View>
    );

    return (

      <DrawerLayoutAndroid
        drawerWidth = {300}
        drawerPosition = {DrawerLayoutAndroid.positions.Left}
        renderNavigationView = {() => nagvigationView}
        // renderNavigationView={() => navigationView}
        >
        <View style ={styles.flex}>

          <Image style={styles.img}
            source={{ uri: 'http://facebook.github.io/react/img/logo_og.png' }}
            />
          <TouchableHighlight  onPress={this.show.bind(this, '欢迎学习React Native技术') }
            underlayColor='#333'>
            <Text style={styles.touchtext}>haha</Text>
          </TouchableHighlight>
        </View>

      </DrawerLayoutAndroid >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    alignItems: 'center'
  },
  button: {
    marginBottom: 30,
    width: 260,
    alignItems: 'center',
    backgroundColor: '#2196F3'
  },
  buttonText: {
    padding: 20,
    color: 'white'
  }
})