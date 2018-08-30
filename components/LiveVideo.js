import React, { Component } from 'react';
import { Text, View, Animated, Easing, StyleSheet, Dimensions, WebView, ScrollView, Image, TouchableOpacity, ImageBackground } from 'react-native';
import axios from 'axios';



export default class VideoList extends Component {
    static navigationOptions ={
      title:"Stage"
    }
    constructor(props) {
        super(props)
        this.state = {
            location: this.props.navigation.getParam('location', 'text'),
            uri:'',
            artist: '',
            tracks: []
        }
        axios.post('http://bdd61e2c.ngrok.io/videoAndArtist',
          // method: 'POST',
          // headers: {
          //   // Accept: 'application/json',
          //   'Content-Type': 'application/json'
          // },
          {
            location: this.state.location
          })
        .then((resp) => {
          return JSON.parse(resp.data)
        })
        .then((json) => {
          this.setState({
            uri: json.url,
            artist: json.artist,
            tracks: json.tracks
          })
        })
        .catch((error)=> {
          console.error(error);
        })
    }

    // componentDidMount(){
    //   console.log('componentDidMount')
    //
    //   fetch('http://05d0033b.ngrok.io/videoAndArtist', {
    //     method: 'POST',
    //     headers: {
    //       // Accept: 'application/json',
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //       location: this.state.location
    //     })
    //   })
    //   .then((resp) => {
    //     console.log(resp)
    //     return resp.json()})
    //   .then((json) => {
    //     this.setState({ uri: json.url })
    //     this.setState({ artist: json.name, tracks: json.tracks})
    //     console.log('TRACKS', JSON.parse(json.tracks))
    //   })
    //   .catch((error)=> {
    //     console.error(error);
    //   })
    // }



    render(){
        return(
           <ImageBackground style={styles.BG} source={require('../assets/background.png')} resizeMode='cover'>
          <View>
          <View style={styles.title}>
          <Text style={styles.livenow}>Live Now</Text>
        </View>
              <View
                style={{marginTop: 20, height:300}}>
            <WebView
               style={styles.video}
              source={{uri:this.state.uri}}
              allowsInlineMediaPlayBack={true}
            />
          </View>
          <View style={styles.title2}>
          <Text style={styles.livenow}>Live Now</Text>
        </View>
          <View>
            <Text>{this.state.artist}</Text>
            <View style={{ height: 240, marginTop: 20}}>
              <ScrollView horizontal={true}>
                {this.state.tracks.map(
                  (song) => {
                    return(
                      <View key={this.state.tracks.indexOf(song)}>
                        <Image style={{width: 200, height: 200}} source={{uri: song.release.image}}></Image>
                        <Text>{song.title}</Text>
                      </View>)
                    }
                  )
                }
              </ScrollView>
            </View>
          </View>
          </View>
        </ImageBackground>
      )
    }
}

//styles
const styles = StyleSheet.create({
  BG:{
      height:'100%',
      width:'100%',
  },
  title:{
      alignItems: 'center',
      justifyContent:"center",
      height: '20%',
  },
  livenow:{
      color: "#ffffff",
      fontSize: 36,
      textAlign: 'center',
      margin: 10,
    },
  video:{
      flex:1,
      margin:3,
  },
  title2:{
      alignItems: 'center',
      justifyContent:"center",
      height: '42%',
  }
});
