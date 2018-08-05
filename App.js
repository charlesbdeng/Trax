import React, { Component } from 'react';
import { Text, View, Animated, Easing, StyleSheet, Dimensions, WebView } from 'react-native';
import { Video } from 'expo';
import VideoListScreen from './components/VideoList.js';
import CompassScreen from './components/Compass.js'
import {StackNavigator} from 'react-navigation';

import {
  MapView
} from 'expo';

const {Marker} = MapView;
const sampleSiteMarkers = [
    {
        id: 1,
        title: 'Twin Lakes Hidden Spot',
        description: 'Beautiful view of Twin Lakes off this hidden forest road.',
        coordinate: {
            longitude: -106.391015,
            latitude: 39.085855
        }
    },
    {
        id: 2,
        title: 'Lily Lake',
        description: 'Nice view of the lilypads in this secluded spot, but a pretty tough road to reach it.',
        coordinate: {
            longitude: -106.368051,
            latitude: 39.351661
        }
    },
    {
        id: 3,
        title: 'Slide Lake',
        description: 'Pretty riverside camping, but a REALLY nasty road to get there.',
        coordinate: {
            longitude: -106.389204,
            latitude: 39.372171
        }
    }
];


export default StackNavigator({
 VideoList:{
   screen:VideoListScreen,
 },
 Compass:{
    screen: CompassScreen
 }

},{initialRouteName:'VideoList'}
)
