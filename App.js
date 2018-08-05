import React, { Component } from 'react';
import { Text, View, Animated, Easing, StyleSheet, Dimensions, WebView } from 'react-native';
import { Video } from 'expo';
import VideoListScreen from './components/VideoList.js';
import CompassScreen from './components/Compass.js'
import {StackNavigator} from 'react-navigation';




export default StackNavigator({
 VideoList:{
   screen:VideoListScreen,
 },
 Compass:{
    screen: CompassScreen
 }

},{initialRouteName:'VideoList'}
)
