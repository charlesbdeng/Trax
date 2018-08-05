import React, { Component } from 'react';
import { Text, View, Animated, Easing, StyleSheet, Dimensions, WebView } from 'react-native';

export default class VideoList extends Component {
    
    constructor (){
        super()
        this.state={
            uri:'',
            location:''
        }
    }

    getUri(location){}

    render(){
        return(
    <View>        
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
    </View>
        )
    }
}