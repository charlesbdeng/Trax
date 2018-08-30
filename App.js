import React, { Component } from 'react';
import { Text, View, Animated, Easing, StyleSheet, Dimensions, WebView } from 'react-native';
import { Video } from 'expo';
import { StackNavigator } from 'react-navigation';
//Components
import Map from "./components/Map.js";
import LiveVideo from "./components/LiveVideo.js";

export default StackNavigator ({
  Map:{
    screen:Map,

  },
  LiveVideo:{
    screen:LiveVideo
  }
},{initialRouteName: 'Map'});
