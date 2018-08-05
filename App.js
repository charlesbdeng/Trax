import React from 'react';
import {
  AsyncStorage,
  TouchableOpacity,
  StyleSheet,
  Text,
  View
 } from 'react-native';

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

class App extends React.Component {
  constructor(props)
  {
    super(props)
    this.state = {
      latitude: 0,
      longitude:0
    }
    this.here = this.here.bind(this)
  }
  componentDidMount()
  {
    AsyncStorage.getItem('location').then((result)=>{
      if (result)
      {
      this.setState({latitude: JSON.parse(result).latitude,longitude:JSON.parse(result).longitude})
    }

    })
  }

  here()
  {
    navigator.geolocation.getCurrentPosition(
      (success) =>{
        this.setState({latitude:success.coords.latitude,longitude:success.coords.longitude})
      },
      (err)=>{
        console.log(err)
      },
      {}
    )
  }
  render() {
    return (
      <View style={{
          flex: 1
        }}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <TouchableOpacity
            style={{flex: 1,
              borderWidth: 1,
              alignItems: 'center',
              justifyContent: 'center'}}
              onPress={()=>{
                this.setState({longitude: 100,latitude:100})


              }}>
            <Text>Istanbul</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{flex: 1,
              borderWidth: 1,
              alignItems: 'center',
              justifyContent: 'center'}}
              onPress={()=>{
                this.setState({longitude:151.220345,latitude:-33.866174})


              }}>
            <Text>Sydney</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{flex: 1,
              borderWidth: 1,
              alignItems: 'center',
              justifyContent: 'center'}}
              onPress={()=>{
                this.setState({longitude: 114.171995,latitude:22.294074})
              }}>
            <Text>Hong Kong</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{flex: 1,
              borderWidth: 1,
              alignItems: 'center',
              justifyContent: 'center'}}
              onPress={this.here}>
            <Text>Here</Text>
          </TouchableOpacity>
        </View>
        <MapView style={{flex: 7}}
          onRegionChangeComplete= {(region)=>{AsyncStorage.setItem('location', JSON.stringify(region))}}
          region ={{latitude: this.state.latitude,
            longitude:this.state.longitude,
            latitudeDelta:0.007,
            longitudeDelta:0.003}}>
            <Marker id = {1}
            color={'green'}
            description={'Beautiful view of Twin Lakes off this hidden forest road.'}
            coordinate= {{
                longitude: 114.171995,
                latitude: 22.294074
              }
            }
          />
        </MapView>
      </View>
    );
  }
}

export default App;
