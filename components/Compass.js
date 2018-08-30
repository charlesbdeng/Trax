import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, Animated, Easing, Dimensions} from 'react-native';
import { Location, Permissions } from 'expo';
const proportions={
  animated:{
    width: 27,
    height:28.5,
    left:7.5,
    top:29.25,
  },
  transform: -23.375,
  arrow:{
    width:6,
    height:6,
    left: 6,
    top: 27
  }




}
export default class Compass extends Component {
  constructor() {
    super();
    this.spinValue = new Animated.Value(0);
    this.state =  {
        location: null,
        errorMessage: null,
        heading: null,
        truenoth: null
      };
  }

  componentWillMount() {
    this._getLocationAsync();
  }

  componentWillUpdate() {
    this.spin()
  }

  _getLocationAsync = async () => {
    // Checking device location permissions
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }
    else
    {
      Expo.Location.watchHeadingAsync((obj) => {
        let heading = obj.magHeading;
        this.setState({heading: heading})
      })
    }
  };

  spin() {
    let start = JSON.stringify(this.spinValue);
    let heading =  Math.round(this.state.heading);

    let rot  = +start;
    let rotM = rot % 360;

    if(rotM < 180 && (heading > (rotM + 180)))
      rot -= 360;
    if(rotM >= 180 && (heading <= (rotM - 180)))
      rot += 360

    rot += (heading - rotM)

    Animated.timing(
      this.spinValue,
      {
        toValue: rot,
        duration: 300,
        easing: Easing.easeInOut
      }
    ).start()
  }

  render() {
    let LoadingText = 'Loading...';
    let display = LoadingText;

    if (this.state.errorMessage)
      display = this.state.errorMessage;

    const spin = this.spinValue.interpolate({
      inputRange: [0,360],
      outputRange: ['-0deg', '-360deg']
    })

    display = Math.round(JSON.stringify(this.spinValue))

    if(display < 0)
      display += 360
    if(display > 360)
      display -= 360


    return (
      <View style={styles.container}>
        <View style={{marginBottom:-12.5, marginRight:-16.2}}>
        <Text style={styles.text}>{display+'°'}</Text>
      </View>

        <View style={[styles.imageContainer,{marginTop:-5}]} >
          <Animated.Image resizeMode='contain' source={require('../assets/compass.png')}
            style={{
            width:  27, height: 28.5,
            left: 7.5, top:  29.25,
            transform: [{rotate: spin}],
          }} />
        </View>

        <View style={[styles.arrowContainer,{marginTop:-5}]} >
          <Image resizeMode='contain' source={require('../assets/arrow.png')} style={styles.arrow} />
        </View>

      </View>
    );
  }
}

// Device dimensions so we can properly center the images set to 'position: absolute'


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#FDFAEB'
  },
  text: {
    color: 'black',
    fontSize: 8,
    transform: ([{translateY:-23.375 }])
  },

  imageContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  arrowContainer: {
  ...StyleSheet.absoluteFillObject,
  },
  arrow: {
    width: 6,
    height: 6,
    left: 18,
    top: 27,
    opacity: 0.9
  }
});
