import React from 'react';
import {
  AsyncStorage,
  Animated,
  Easing,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
  ImageBackground
 } from 'react-native';
 import {
   Header
 } from 'react-native-elements'

import Compass from './components/Compass.js'

import {
  MapView
} from 'expo';
const OG_IMG = require('./assets/White.jpg')
const {Marker} = MapView;
const MarkerList = [
    {
        id: 1,
        title: 'Outside Lands',
        color: 'red',
        description: 'OutsideLands',
        coordinate: {
            longitude: -122.486214,
            latitude: 37.769421
        }
    },
    {
        id: 2,
        title: 'Sutro',
        description: 'Dope stage',
        color:'orange',
        coordinate: {
            longitude: -122.49333624373,
            latitude: 37.76992709557
        }
    },
    {
        id: 3,
        title: 'Lands End',
        description: 'Pretty riverside camping, but a REALLY nasty road to get there.',
        color:'#e6e600',
        coordinate: {
            longitude: -122.4934599126,
            latitude: 37.768098991127
        }
    },
    {
      id:4,
      title: 'Twin Peaks',
      description:'Twin shit',
      color:'green',
      coordinate: {
        latitude: 37.7697310,
        longitude: -122.4825382
      }
    },
    {
      id:5,
      title: "Pan handle",
      description:"Get Gold",
      color:'blue',
      coordinate:{
        latitude:37.769567314571,
        longitude:-122.48593004432
      }
    },
    {
      id:6,
      title:"The House",
      description: "Good shit by Heinken",
      color:'purple',
      coordinate:{
        latitude: 37.7680023,
        longitude:-122.4915094
      }
    }
];




class App extends React.Component {
  constructor(props)
  {
    super(props)
    this.state = {
      latitude: 0,
      longitude:0,
      latitudeDelta:0.01,
      longitudeDelta:0.015,
      myLatitude: null,
      myLongitude:null,
      fadeAnim: new Animated.Value(0)
    }
    this.here = this.here.bind(this)
  }

  componentDidMount()
  {
    Animated.timing(
      this.state.fadeAnim,
      {
        toValue: 1,
        duration: 1200,
        easing: Easing.linear
      }
    ).start();

    AsyncStorage.getItem('location').then((result)=>{
      if (result)
      {
      this.setState({latitude: JSON.parse(result).latitude,longitude:JSON.parse(result).longitude})
    }

    })
  }
  markerRender(){

    let x = MarkerList.map((m) => <Marker key={m.id} onPress={()=>console.log("Registered")} pinColor={m.color} description={m.description}
    coordinate={m.coordinate}/>)
    return x

  }

  here()
  {
    navigator.geolocation.getCurrentPosition(
      (success) =>{
        this.setState({latitude:success.coords.latitude,
          longitude:success.coords.longitude,
          myLatitude:success.coords.latitude,
          myLongitude: success.coords.longitude,
        latitudeDelta: 0.0015,
      longitudeDelta:0.004})
      },
      (err)=>{
        console.log(err)
      },
      {}
    )
  }


  navButtonList(){
    let buttons = MarkerList.map(marker=><TouchableHighlight
      underlayColor={'#FFEBCD'}
      key={marker.id}
        style={{flex: 1,
          borderWidth: 1,
          marginTop: -5,
          borderTopLeftRadius:10,
          borderTopRightRadius:10,
          backgroundColor:'#fff3e6',


          alignItems: 'center',
          justifyContent: 'center'}}
          onPress={()=>{
            this.setState({longitude: marker.coordinate.longitude,
              latitude: marker.coordinate.latitude,
              latitudeDelta: marker.title !== "Outside Lands" ? 0.005: 0.015,
              longitudeDelta: marker.title !== "Outside Lands" ? 0.0125: 0.022


            })



          }}>
        <Text style={{fontSize:12,fontWeight: 'bold', color: marker.color}}>{marker.title}</Text>
      </TouchableHighlight>)
    return buttons;
  }
  render() {


    return (
      <View style={{
          flex: 1
        }}>
        <ImageBackground source={OG_IMG} style={{opacity:0.75,width:400,height:80, alignItems:'center', justifyContent:'flex-end'}}>
          {/* <Header
            outerContainerStyles ={{height:90, paddingTop:30}}
            innerContainerStyles={{alignItems:'center'}}
            backgroundColor={'#f8f2ec'}
          centerComponent={ */}
            <View style={{alignItems:'center'}}>
            <Text style={{fontFamily: 'Times New Roman', fontStyle:'italic', fontSize:28, fontWeight:'bold', color:'red'}}><Text style={{fontSize:40, fontWeight:'bold', color:'orange'}}>T
              <Text style={{fontSize:40, fontWeight:'bold', color:'#e6e600'}}
              >R<Text style={{fontSize:40, fontWeight:'bold', color:'green'}}>
              A<Text style={{fontSize:40, fontWeight:'bold', color:'blue'}}>X<Text style={{fontSize:28, fontWeight:'bold', color:'purple'}}>
              </Text></Text></Text></Text></Text></Text>
            </View>
          {/* }/> */}

</ImageBackground>
        <MapView style={{flex: 7, marginBottom:-2}}
          onRegionChangeComplete= {(region)=>{AsyncStorage.setItem('location', JSON.stringify(region))}}
          region ={{latitude: this.state.latitude,
            longitude:this.state.longitude,
            latitudeDelta: this.state.latitudeDelta,
            longitudeDelta: this.state.longitudeDelta}}>







            {this.markerRender()}

            {this.state.myLatitude ? <Marker key={1} pinColor={'black'} description={'Your location'}
            coordinate={{
              latitude: this.state.myLatitude,
              longitude: this.state.myLongitude
            }}/>  : null}


        </MapView>


        <View style={{flex: 1, flexDirection: 'row'}}>
          {this.navButtonList()}
          <TouchableHighlight
            key={1}
            underlayColor={'#FFEBCD'}
            style={{flex: 1,
              borderWidth: 1,
              marginTop: -5,
              borderTopLeftRadius:10,
              borderTopRightRadius:10,
              alignItems: 'center',
              backgroundColor:'#fff3e6',
              justifyContent: 'center',}}
              onPress={this.here}>
            <Text style={{fontWeight:'bold'}}>Me</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

export default App;
