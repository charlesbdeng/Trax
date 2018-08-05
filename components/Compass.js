import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, Animated, Easing, Dimensions} from 'react-native';
import { Location, Permissions } from 'expo';

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
        <View style={styles.imageContainer} >
          <Animated.Image resizeMode='contain' source={require('../assets/compass.png')}
            style={{
            width:  20, height: 30,
            left: 15, top:  15,
            transform: [{rotate: spin}],
          }} />
        </View>
        <View style={styles.arrowContainer} >
          <Image resizeMode='contain' source={require('../assets/arrow.png')} style={styles.arrow} />
        </View>
      </View>
    );
  }
}

// Device dimensions so we can properly center the images set to 'position: absolute'
const deviceWidth  =  Dimensions.get('window').width
const deviceHeight =  Dimensions.get('window').height

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    backgroundColor:'#FDFAEB'
  },

  imageContainer: {
    height:17,
    width:17,
    justifyContent:'flex-start',
    alignItems:'flex-end'
  },
  arrowContainer: {
    height:6,
    width:6,
    justifyContent:'flex-start'
  },
  arrow: {
    width: 6,
    height: 6,
    left: 6,
    top: 6,
    opacity: 0.9
  }
});
