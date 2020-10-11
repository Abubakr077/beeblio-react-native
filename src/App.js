import React from 'react';
import SplashScreen from "./Components/Screens/SplashScreen";
import HomeScreen from "./Components/Screens/HomeScreen";
import Profile from "./Components/Screens/Profile";
import Collection from "./Components/Screens/Drawer/Collection";
import Search from "./Components/Screens/Drawer/Search";
import Settings from "./Components/Screens/Drawer/Setting";
import InitialScreen from "./Components/Screens/InitialScreen";
import Meaning from "./Components/Screens/Drawer/Meaning";
import DashBoard from './Components/Screens/Drawer/DashBoard';
import content from "./Components/Screens/Drawer/content"
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
import * as actionsUsers from "./Store/Actions/UserActions";
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
        backgroundColor: '#2da4cf',
        height: 340,

        // alignItems: 'center',
        // justifyContent: 'center',

      }}
    >
      <View style={{marginTop:55}}>

      <View style={{ flexDirection: "row" }}>
        <Image source={require('../assets/image/prof.png')}
          style={{ width: 50, height: 50, borderRadius: 100 }} />
          <View style={{marginLeft:12}} >

        <Text style={{fontSize:18, color:"#fff", marginLeft: 5}}>JHON DOE</Text>

        <View style={{backgroundColor:"#fff", borderRadius:35, marginTop:5}}>
        <Text style={{fontSize:15, color:"#000", marginLeft: 5, padding:5,}}>Member Since May 2016</Text>

        </View>

        </View>
      </View>

      <View style={{flexDirection: "row", marginTop:10 }}>



      <View style={{ justifyContent: "center", alignItems: "center", flex:1 }}>

<View style={{ marginTop: 15, justifyContent: "center", alignItems: "center" }}>
  <Image source={require('../assets/image/fil.png')} style={{ width: 45, height: 45, resizeMode: "cover" }} />
</View>

<View style={{ marginVertical: 20 }}>
  <Text style={{ fontSize: 18, color: "white", fontWeight: 'bold', textAlign: "center" }}>450</Text>
  <Text style={{ fontSize: 18, color: "white",  textAlign: "center", marginTop:15 }}>Texts</Text>
  <Text style={{ fontSize: 18, color: "white",  textAlign: "center", marginTop:5 }}>Filtered</Text>


</View>


</View>


<View style={{ justifyContent: "center", alignItems: "center", flex:1 }}>

<View style={{ marginTop: 15, justifyContent: "center", alignItems: "center" }}>
  <Image source={require('../assets/image/sear.png')} style={{ width: 45, height: 45, resizeMode: "cover" }} />
</View>

<View style={{ marginVertical: 20 }}>
  <Text style={{ fontSize: 18, color: "white", fontWeight: 'bold', textAlign: "center" }}>450</Text>
  <Text style={{ fontSize: 18, color: "white",  textAlign: "center", marginTop:15 }}>URL</Text>
  <Text style={{ fontSize: 18, color: "white",  textAlign: "center", marginTop:5 }}>Searched</Text>


</View>


</View>



<View style={{ justifyContent: "center", alignItems: "center", flex:1 }}>

<View style={{ marginTop: 15, justifyContent: "center", alignItems: "center" }}>
  <Image source={require('../assets/image/colle.png')} style={{ width: 45, height: 45, resizeMode: "cover" }} />
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
          <Image style={{
              height: 20,
              width: 20,
          }} source={require('../assets/image/home.jpg')} />

    )
  },
})
const appStackProfile = createStackNavigator({ Profile }, {
    navigationOptions:
        {
            title: 'My Profile', drawerIcon: ({ tintColor }) => (
                <Image style={{
                    height: 20,
                    width: 20,
                }} source={require('../assets/image/profi.png')} />
            )
        },
})
const appStackCollection = createStackNavigator({ Collection }, {
    navigationOptions:
        {
            title: 'My Collection', drawerIcon: ({ tintColor }) => (
                <Image style={{
                    height: 20,
                    width: 20,
                }} source={require('../assets/image/coll.png')} />
            )

        },

})
const appStackSearch = createStackNavigator({ Search }, {
    navigationOptions:
        {
            title: 'My Searches', drawerIcon: ({ tintColor }) => (
                <Image style={{
                    height: 20,
                    width: 20,
                }} source={require('../assets/image/sea.png')} />
            )
        },
})
const appStackMeaning = createStackNavigator({ Meaning }, {
    navigationOptions:
        {
            title: 'Dictionary', drawerIcon: ({ tintColor }) => (
                <Image style={{
                    height: 20,
                    width: 20,
                }} source={require('../assets/image/invi.png')} />
            )
        },
})
const appStackContent = createStackNavigator({ content }, {
    navigationOptions:
        {
            title: 'Content', drawerIcon: ({ tintColor }) => (
                <Image style={{
                    height: 20,
                    width: 20,
                }} source={require('../assets/image/invi.png')} />
            )
        },
})
const appStackSettings = createStackNavigator({ Settings }, {
    navigationOptions:
        {
            title: 'Settings', drawerIcon: ({ tintColor }) => (
                <Image style={{
                    height: 20,
                    width: 20,
                }} source={require('../assets/image/setting.png')} />
            )
        },
})
const appStackLog = createStackNavigator({ Settings }, {
    navigationOptions:
        {
            title: 'Logout', drawerIcon: ({ tintColor }) => (
                <Image style={{
                    height: 20,
                    width: 20,
                }} source={require('../assets/image/log.png')} />
            )
        },
})
const appDrawerNavigator = createDrawerNavigator({
  Home: appStackNavigator,
  'My Profile': appStackProfile,
  'My Collection': appStackCollection,
  'My Searches': appStackSearch,
    'Dictionary': appStackMeaning,
  'Setting': appStackSettings,
    'Content': appStackContent,
    logout: appStackLog,
    //logout: 'LogoutScreen'
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
        AsyncStorage.getItem('initial', (err, result) => {
            if (result){
                const { syncWithAsyncStorage } = this.props;

                syncWithAsyncStorage({
                    onSuccess: ({user, skiped}) => {
                        if(user !== undefined){
                            if((user || skiped === 'true')){
                                this.updateUser();
                            }
                        }
                    }
                });
            }
        });

    }
    updateUser = () => {
        const {getUser,getUserPicture} = this.props;
        this.setState({isLoadingContent: true});
        getUser({
            onError: (error) => {
                alert(error);
                this.setState({isLoadingContent: false, progress: 0});
            },
            onSuccess: () => {
                this.setState({isLoadingContent: false, isReady: true});
            }
        });
        getUserPicture({
            onError: (error) => {
                alert(error);
                this.setState({isLoadingContent: false, progress: 0});
            },
            onSuccess: () => {
                this.setState({isLoadingContent: false, isReady: true});
            }
        });

    }
    render() {
        return <AppContainer ref={navigatorRef => {
            this.navigator = navigatorRef;
        }} />;
    }
}
const mapStateToProps = state => {
    return {
        user: state.AuthReducer.user,
        skiped: state.AuthReducer.skiped,
    };
};

export default connect(
    mapStateToProps,
    {
        logout: actions.logout,
        getUser: actionsUsers.getUser,
        getUserPicture: actionsUsers.getUserPicture,
        syncWithAsyncStorage: actions.syncWithAsyncStorage
    }
)(App);

