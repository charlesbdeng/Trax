import React, { Component } from 'react';
import { Text, View, Animated, Easing, StyleSheet, Dimensions, WebView } from 'react-native';
import Compass from './components/Compass.js'
import { Video } from 'expo';



export default class App extends Component {

state = {
  fadeAnim: new Animated.Value(0)
}

componentDidMount() {
    // Fade in on app launch
    Animated.timing(
      this.state.fadeAnim,
      {
        toValue: 1,
        duration: 1200,
        easing: Easing.linear
      }
    ).start();
  }
//AIzaSyANVrDWLmzHUCdpGRiRlBLbgkVVAKDCyjw

render() {
  return (
    <Animated.View style={
      {
      flex: 1,
      backgroundColor: "#ecedef",
      opacity: this.state.fadeAnim
      }
    } >
    <WebView
          style={{flex:1, margin: 20}}
          javaScriptEnabled={true}
          source={{uri: 'https://youtu.be/AAnIJzqRHFI'}}
  />
  <WebView
        style={{flex:1, margin:20}}
        javaScriptEnabled={true}
        source={{uri: 'https://www.youtube.com/embed/UifuuynvrlY'}}
/>
    </Animated.View>
  );
}
}
