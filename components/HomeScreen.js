import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ListView,
  Alert,
  Button,
  RefreshControl,
  Image,
  ScrollView,
  ImageBackground,
  AsyncStorage
} from 'react-native';
 // Version can be specified in package.json
import { Ionicons } from '@expo/vector-icons';
import {Header, Icon} from 'react-native-elements';
import React from 'react';
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import { createStackNavigator } from 'react-navigation';
import styles from './Styles'
import RegisterScreen from './RegisterScreen'
import LoginScreen from './LoginScreen'
import ResultScreen from './ResultScreen'
import GroceryListScreen from './GroceryListScreen'
import HorizontalMealScroll from './HorizontalMealScroll'
import SearchScreen from './SearchScreen'
import CheckoutScreen from './CheckoutScreen'
import FeedbackScreen from './FeedbackScreen'
import CategoriesScreen from './CategoriesScreen'
import CartScreen from './CartScreen'
import HomeNavigator from './HomeNavigator'
import CategoriesNavigator from './CategoriesNavigator'
import SearchNavigator from './SearchNavigator'
import HomeSearch from './HomeSearch'
const G_IMG = require('../assets/goldenImage.jpg')
const D_IMG = require('../assets/goldenTemple.jpg')
const L_IMG = require('../assets/Coupon.jpg')


export default class HomeScreen extends React.Component {

  cartNavigate()
  {
    this.props.screenProps.cart()

  }

  static navigationOptions =({navigation}) => {
    const {state} = navigation
    return {
    title: <Text style={{color:'white'}}> Home </Text>,
     headerStyle:{ position: 'absolute', backgroundColor: 'transparent', zIndex: 100, top: 0, left: 0, right: 0 },
    headerRight: <TouchableOpacity style={{marginRight:10}}>
        <Icon
        name='shopping-cart'
        color='blue'
        onPress={()=>{state.params.cart()}}/>
      </TouchableOpacity>
    }

  };

  constructor(props)
  {
    super(props)
    this.state = {
      search:"",
      meals: [],
      searchBar: false,
      message:'',
      search: '',
    }
    this.cartNavigate = this.cartNavigate.bind(this)
    this.searchBar = this.searchBar.bind(this)


  }


  //run the coponoennt and have it fetch the data
  //each ingredient has i\ts own page that displays what it looks like
  //how to make an image, where do i source
  //user gives quantities
  //algo updates quantiies with respect to recipe and user's desires
  submit() {
    console.log('clicked search');
    this.setState({searchBar:!this.state.searchBar})
    this.props.navigation.navigate('BrowseGrocery', {
      query: this.state.search,
    });
  }




  componentDidMount() {
    //fetch meallist
    //display top Meals
    //fetch recommended meals
    //create alogirthm that displays certain meals
    const {setParams} = this.props.navigation;
    setParams({cart: this.props.screenProps.cart})
    AsyncStorage.getItem('meals')
      .then((data) => {
        console.log('meals from AsyncStorage', JSON.parse(data));
        this.setState({
          meals: JSON.parse(data)
        })
      })
      .catch(err => console.log('err',err))

  }
  press() {
    this.props.navigation.navigate('Search')
  }

  searchBar(){
    this.props.navigation.navigate('HomeSearch')
  }

  render() {
    // console.log(this.state);
    // const view = () => {
    //   if (this.state.searchBar)
    //   {
    //     return {
    //       flex: 1,
    //       backgroundColor: '#F5FCFF',
    //       alignItems:'stretch'
    //     }
    //   }
    //   else {
    //
    //       return {}
    //
    //   }
    // }
    // const display = () => {
    //   return this.state.searchBar ? 'none': null;
    // }
    //
    // const searchBarScreen = () => {
    //   console.log("Registered press")
    //   if (!this.state.searchBar)
    //   {
    //     this.setState({searchBar:true})
    //   }
    // }
    // console.log(view())
    // console.log(display())
    // console.log(this.state)
    return (

      // <View style={{
      //   flex: 1,
      //   alignItems: 'center',
      //   backgroundColor: '#F5FCFF',
      // }}>
      //   <Text>{this.state.message}</Text>
      //
      //   <TextInput
      //     style={{height: 40}}
      //     placeholder="Search for a Recipe"
      //     onChangeText={(text) => this.setState({search: text})}
      //   />
      //
      // <TouchableOpacity style={[styles.button, styles.buttonBlue]} onPress={ () => {this.submit()} }>
      //   <Text style={styles.buttonLabel}>Search</Text>
      // </TouchableOpacity>
      // </View>


<View style={{flex:1, alignItems: 'flex-start'}}>
  <View style={{flex:0.0005}}>
      <TouchableOpacity style={{marginLeft:200,marginTop:59}}>
          <Icon
          name='shopping-cart'
          color='blue'
          onPress={()=>{state.params.cart()}}/>
        </TouchableOpacity>
      </View>


      <ScrollView style={{
        flex:12,
      }} scrollEnabled={true}
      enableEmptySections={true}
      >

        <ImageBackground
          source={G_IMG}
          style={[styles.goldenImage, {
            opacity: 0.8,
            justifyContent: 'flex-end',
            height: 170,

          }]}>


          {/* <View style={{
            flex: 1,
            alignItems: 'stretch',
            backgroundColor: '#F5FCFF',
          }}>
          <Text>{this.state.message}</Text> */}

          <TouchableOpacity
            style={{height: 40, backgroundColor:'white', borderRadius: 20, margin: 10, padding:3,display:null, alignItems:'center', justifyContent:'center', }}
            placeholder="Search for a Recipe"
            onPress={()=>{this.searchBar()}
          }>
          <Text style={{color:'grey'}}> Search Golden Express </Text>

          {/* <TouchableOpacity style={[styles.button, styles.buttonBlue]} onPress={ () => {this.submit()} }>
          <Text style={styles.buttonLabel}>Search</Text>
        </TouchableOpacity> */}
        {/* </View> */}
      </TouchableOpacity>
    </ImageBackground>
      <View style={{backgroundColor:'#e5e5e5', alignItems:'center'}}>
        <Image
          source={L_IMG}
          style={{backgroundColor: 'grey',height:175, width: 240}}/>
      </View>
      <View style={{flex:1,
        backgroundColor:'#e8ecf4',

        alignItems:'flex-start'}}>

        <HorizontalMealScroll style={{flex:1}}/>
        <HorizontalMealScroll style={{flex:1}}/>
        <HorizontalMealScroll style={{flex:1}}/>
        <HorizontalMealScroll style={{flex:1}}/>
        <HorizontalMealScroll style={{flex:1}}/>
      </View>

    </ScrollView>
  </View>

)
}
}
