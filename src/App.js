import React from 'react';
import SplashScreen from "./Components/Screens/SplashScreen";
import HomeScreen from "./Components/Screens/HomeScreen";
import Profile from "./Components/Screens/Profile";
import InitialScreen from "./Components/Screens/InitialScreen";
import DashBoard from './Components/Screens/Drawer/DashBoard';

import LoginScreen from "./Components/Screens/Auth/LoginScreen";
import MainLogin from "./Components/Screens/Auth/MainLogin";
import RegisterScreen from "./Components/Screens/Auth/RegisterScreen";
import {StyleSheet, Text, View, Image, AsyncStorage} from 'react-native';
import { Icon } from "native-base";
import * as NavigationService from './NavigationService';


import { createStackNavigator, createSwitchNavigator, createAppContainer,createDrawerNavigator,DrawerItems } from "react-navigation";
import ForgotPassword from "./Components/Screens/Auth/ForgotPassword";

import {connect} from "react-redux";
import * as actions from "./Store/Actions/AuthActions";
import {logout} from "./Store/Actions/AuthActions";

const logoutUser = async () => {


    try {
            const keys = await AsyncStorage.getAllKeys();
            await AsyncStorage.multiRemove(keys);
        } catch (error) {
            console.error('Error clearing app data.');
        }
    NavigationService.navigate('MainLogin')

    // props.dispatch(logout({
    //     token: props.user,
    //     onError: (error) => {
    //         console.log({error});
    //         NavigationService.navigateAndResetStack('MainLogin')
    //     },
    //     onSuccess: () => {
    //         NavigationService.navigateAndResetStack('MainLogin')
    //     }
    // }))
};
const DrawerContent = (props) => (
  <View>
    <View
      style={{
        backgroundColor: '#256B9B',
        height: 340,
        // alignItems: 'center',
        // justifyContent: 'center',

      }}
    >
      <View style={{marginTop:35}}>

      <View style={{ flexDirection: "row" }}>
        <Image source={require('../assets/image/prof.png')}
          style={{ width: 50, height: 50, borderRadius: 100 }} />
          <View style={{marginLeft:12}} >

        <Text style={{fontSize:18, color:"#fff", marginLeft: 5}}>JHON DOE</Text>

        <View style={{backgroundColor:"#fff", borderRadius:35, marginTop:5}}>
        <Text style={{fontSize:15, color:"#000", marginLeft: 5, padding:5,}}>Member since May 2016</Text>

        </View>

        </View>
      </View>

      <View style={{flexDirection: "row", marginTop:10 }}>



      <View style={{ justifyContent: "center", alignItems: "center", flex:1 }}>

<View style={{ marginTop: 15, justifyContent: "center", alignItems: "center" }}>
  <Image source={require('../assets/image/02.png')} style={{ width: 55, height: 55, resizeMode: "cover" }} />
</View>

<View style={{ marginVertical: 20 }}>
  <Text style={{ fontSize: 18, color: "white", fontWeight: 'bold', textAlign: "center" }}>450</Text>
  <Text style={{ fontSize: 18, color: "white",  textAlign: "center", marginTop:15 }}>Texts</Text>
  <Text style={{ fontSize: 18, color: "white",  textAlign: "center", marginTop:5 }}>Filters</Text>


</View>


</View>


<View style={{ justifyContent: "center", alignItems: "center", flex:1 }}>

<View style={{ marginTop: 15, justifyContent: "center", alignItems: "center" }}>
  <Image source={require('../assets/image/01.png')} style={{ width: 55, height: 55, resizeMode: "cover" }} />
</View>

<View style={{ marginVertical: 20 }}>
  <Text style={{ fontSize: 18, color: "white", fontWeight: 'bold', textAlign: "center" }}>450</Text>
  <Text style={{ fontSize: 18, color: "white",  textAlign: "center", marginTop:15 }}>Url</Text>
  <Text style={{ fontSize: 18, color: "white",  textAlign: "center", marginTop:5 }}>Searched</Text>


</View>


</View>



<View style={{ justifyContent: "center", alignItems: "center", flex:1 }}>

<View style={{ marginTop: 15, justifyContent: "center", alignItems: "center" }}>
  <Image source={require('../assets/image/collect.png')} style={{ width: 55, height: 55, resizeMode: "cover" }} />
</View>

<View style={{ marginVertical: 20 }}>
  <Text style={{ fontSize: 18, color: "white", fontWeight: 'bold', textAlign: "center" }}>450</Text>
  <Text style={{ fontSize: 18, color: "white",  textAlign: "center", marginTop:15 }}>Words</Text>
  <Text style={{ fontSize: 18, color: "white",  textAlign: "center", marginTop:5 }}>Collected</Text>


</View>


</View>

      </View>
      </View>
    </View>
      <DrawerItems
          {...props}
          onItemPress={(route) => {
              if (route.route.routeName !== 'logout') {
                  props.onItemPress(route);
                  return;
              }
              logoutUser();

          }}/>
  </View>
)

const appStackNavigator = createStackNavigator({ HomeScreen }, {
  navigationOptions:
  {
    title: 'Home', drawerIcon: ({ tintColor }) => (
      <Icon
        name="home"
        size={30}
        color='white'
      />
    )
  },

})

const appDrawerNavigator = createDrawerNavigator({
  Home: appStackNavigator,
  'My Profile': Profile,
  'My Collection': Profile,
  'My Searches': Profile,
  'Invite Friends': Profile,
  'Settings': Profile,
    logout: 'LogoutScreen'
}, {
  contentComponent: DrawerContent,
})

const AppNavigator = createSwitchNavigator(
  {
      SplashScreen,
    HomeScreen: appDrawerNavigator,
    Profile,
    MainLogin,
    InitialScreen,
    LoginScreen,
    RegisterScreen,
      ForgotPassword
  }
);

const AppContainer = createAppContainer(AppNavigator);

class App extends React.Component {
    componentDidMount() {
        NavigationService.setNavigator(this.navigator);

    }
    render() {
        return <AppContainer ref={navigatorRef => {
            this.navigator = navigatorRef;
        }} />;
    }
}

export default connect(
    null,
    {
        logout: actions.logout
    }
)(App);

