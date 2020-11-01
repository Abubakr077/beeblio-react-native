import React from 'react';
import SplashScreen from "./Components/Screens/SplashScreen";
import HomeScreen from "./Components/Screens/HomeScreen";
import Profile from "./Components/Screens/Profile";
import Collection from "./Components/Screens/Drawer/Collection";
import Search from "./Components/Screens/Drawer/Search";
import Settings from "./Components/Screens/Drawer/Setting";
import InitialScreen from "./Components/Screens/InitialScreen";
import SavedResources from "./Components/Screens/Drawer/SavedResources";

import LoginScreen from "./Components/Screens/Auth/LoginScreen";
import MainLogin from "./Components/Screens/Auth/MainLogin";
import RegisterScreen from "./Components/Screens/Auth/RegisterScreen";
import {ScrollView, Text, View, Image, AsyncStorage, Alert, LogBox} from 'react-native';
import * as NavigationService from './NavigationService';
import {
    createAppContainer,
} from "react-navigation";
import { createDrawerNavigator,DrawerItems } from 'react-navigation-drawer';
import ForgotPassword from "./Components/Screens/Auth/ForgotPassword";
import { createStackNavigator } from 'react-navigation-stack'
import {connect} from "react-redux";
import * as actions from "./Store/Actions/AuthActions";
import * as actionsUsers from "./Store/Actions/UserActions";
import {logout} from "./Store/Actions/AuthActions";
import moment from "moment";
import {Avatar} from "react-native-paper";
import Details from "./Components/Screens/Drawer/Details";
import Meaning from './Components/Screens/Drawer/Meaning';
LogBox.ignoreAllLogs()
let image, userObj, statics,propsGlobal;
const logoutUser = async () => {
    try {
        const keys = await AsyncStorage.getAllKeys();
        await AsyncStorage.multiRemove(keys);
        const {logout} = propsGlobal;
        logout({
            onError: (error) => {
                console.log({error});
                NavigationService.navigate('MainLogin')
            },
            onSuccess: () => {
                NavigationService.navigate('MainLogin')
            }
        })
    } catch (error) {
        const {logout} = propsGlobal;
        logout({
            onError: (error) => {
                console.log({error});
                NavigationService.navigate('MainLogin')
            },
            onSuccess: () => {
                NavigationService.navigate('MainLogin')
            }
        })
        console.error('Error clearing app data.');
    }
};
const DrawerContent = (props) => (
    <ScrollView>
        <View
            style={{
                backgroundColor: '#2da4cf',
                height: 340,

                // alignItems: 'center',
                // justifyContent: 'center',

            }}
        >
            <View style={{marginTop: 55}}>

                <View style={{flexDirection: "row"}}>
                    <Avatar.Image size={50} style={{borderRadius: 100}} source={{uri: image ? image : ''}}/>
                    <View style={{marginLeft: 12}}>

                        <Text style={{
                            fontSize: 18,
                            color: "#fff",
                            marginLeft: 5
                        }}>{userObj ? userObj.apiUserProfile.firstName + ' ' + userObj.apiUserProfile.lastName : ''} </Text>

                        <View style={{backgroundColor: "#fff", borderRadius: 35, marginTop: 5}}>
                            <Text style={{fontSize: 14, color: "#000", marginLeft: 5, padding: 5,}}>Member
                                Since {userObj ? moment(userObj.apiUserProfile.dateCreated).format('MMMM YYYY') : ''}</Text>


                        </View>
                    </View>
                </View>

                <View style={{flexDirection: "row", marginTop: 10}}>


                    <View style={{justifyContent: "center", alignItems: "center", flex: 1}}>

                        <View style={{marginTop: 15, justifyContent: "center", alignItems: "center"}}>
                            <Image source={require('../assets/image/fil.png')}
                                   style={{width: 45, height: 45, resizeMode: "cover"}}/>
                        </View>

                        <View style={{marginVertical: 20}}>
                            <Text style={{
                                fontSize: 18,
                                color: "white",
                                fontWeight: 'bold',
                                textAlign: "center"
                            }}>{statics ? statics.totalContentSearched : 0}</Text>
                            <Text
                                style={{fontSize: 18, color: "white", textAlign: "center", marginTop: 15}}>Texts</Text>
                            <Text style={{
                                fontSize: 18,
                                color: "white",
                                textAlign: "center",
                                marginTop: 5
                            }}>Filtered</Text>


                        </View>


                    </View>


                    <View style={{justifyContent: "center", alignItems: "center", flex: 1}}>

                        <View style={{marginTop: 15, justifyContent: "center", alignItems: "center"}}>
                            <Image source={require('../assets/image/sear.png')}
                                   style={{width: 45, height: 45, resizeMode: "cover"}}/>
                        </View>

                        <View style={{marginVertical: 20}}>

                            <Text style={{
                                fontSize: 18,
                                color: "white",
                                fontWeight: 'bold',
                                textAlign: "center"
                            }}>{statics ? statics.totalUrlSearched : 0}</Text>
                            <Text style={{fontSize: 18, color: "white", textAlign: "center", marginTop: 15}}>Url</Text>

                            <Text style={{
                                fontSize: 18,
                                color: "white",
                                textAlign: "center",
                                marginTop: 5
                            }}>Searched</Text>


                        </View>


                    </View>


                    <View style={{justifyContent: "center", alignItems: "center", flex: 1}}>

                        <View style={{marginTop: 15, justifyContent: "center", alignItems: "center"}}>
                            <Image source={require('../assets/image/colle.png')}
                                   style={{width: 45, height: 45, resizeMode: "cover"}}/>
                        </View>

                        <View style={{marginVertical: 20}}>
                            <Text style={{
                                fontSize: 18,
                                color: "white",
                                fontWeight: 'bold',
                                textAlign: "center"
                            }}>{statics ? statics.totalWordCollected : 0}</Text>
                            <Text
                                style={{fontSize: 18, color: "white", textAlign: "center", marginTop: 15}}>Words</Text>
                            <Text style={{
                                fontSize: 18,
                                color: "white",
                                textAlign: "center",
                                marginTop: 5
                            }}>Collected</Text>


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
                Alert.alert(   // Shows up the alert without redirecting anywhere
                    'Confirmation required'
                    , 'Do you really want to logout?'
                    , [
                        {text: 'Accept', onPress: () => logoutUser()},
                        {text: 'Cancel'}
                    ]
                );

            }}/>
    </ScrollView>
)
const appStackNavigator = createStackNavigator({HomeScreen}, {
    navigationOptions:
        {
            title: 'Home', drawerIcon: ({tintColor}) => (
                <Image style={{
                    height: 20,
                    width: 20,
                }} source={require('../assets/image/home.jpg')}/>

            )
        },
})
const appStackProfile = createStackNavigator({Profile}, {
    navigationOptions:
        {
            title: 'Profile', drawerIcon: ({tintColor}) => (
                <Image style={{
                    height: 20,
                    width: 20,
                }} source={require('../assets/image/profi.png')}/>
            )
        },
})
const appStackCollection = createStackNavigator({Collection}, {
    navigationOptions:
        {
            title: 'Content', drawerIcon: ({tintColor}) => (
                <Image style={{
                    height: 20,
                    width: 20,
                }} source={require('../assets/image/coll.png')}/>
            )

        },

})
const appStackSearch = createStackNavigator({Search}, {
    navigationOptions:
        {
            title: 'Searches', drawerIcon: ({tintColor}) => (
                <Image style={{
                    height: 20,
                    width: 20,
                }} source={require('../assets/image/sea.png')}/>
            )
        },
})
const appStackSavedResources = createStackNavigator({SavedResources}, {
    navigationOptions:
        {
            title: 'Saved Resources', drawerIcon: ({tintColor}) => (
                <Image style={{
                    height: 20,
                    width: 20,
                }} source={require('../assets/image/invi.png')}/>
            )
        },
})
const appStackSettings = createStackNavigator({Settings}, {
    navigationOptions:
        {
            title: 'Settings', drawerIcon: ({tintColor}) => (
                <Image style={{
                    height: 20,
                    width: 20,
                }} source={require('../assets/image/setting.png')}/>
            )
        },
})
const appStackLog = createStackNavigator({Settings}, {
    navigationOptions:
        {
            title: 'Logout', drawerIcon: ({tintColor}) => (
                <Image style={{
                    height: 20,
                    width: 20,
                }} source={require('../assets/image/log.png')}/>
            )
        },
})
const appDrawerNavigator = createDrawerNavigator({
    Home: appStackNavigator,
    'Profile': appStackProfile,
    'Content': appStackCollection,
    'Searches': appStackSearch,
    'Saved': appStackSavedResources,
    'Setting': appStackSettings,
    logout: appStackLog
}, {
    contentComponent: DrawerContent,
})

const AppNavigator = createStackNavigator(
    {
        SplashScreen,
        HomeScreen: appDrawerNavigator,
        Profile,
        MainLogin,
        InitialScreen,
        LoginScreen,
        RegisterScreen,
        Meaning,
        ForgotPassword,
        Details,
    }, {
        initialRouteName: "SplashScreen",
        headerMode: 'none'
    }
);

const AppContainer = createAppContainer(AppNavigator);

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                user: null,
                userImage: null,
                statics:null
        }
    }
    componentDidMount() {
        propsGlobal = this.props;
        NavigationService.setNavigator(this.navigator);
        AsyncStorage.getItem('initial', (err, result) => {
            if (result) {
                const {syncWithAsyncStorage} = this.props;

                syncWithAsyncStorage({
                    onSuccess: ({user, skiped}) => {
                        if (user !== undefined) {
                            if ((user || skiped === 'true')) {
                                this.updateUser();
                            }
                        }
                    }
                });
            }
        });

    }

    updateUser = () => {
        const {getUser, getUserPicture, getStatistics} = this.props;
        this.setState({isLoadingContent: true});
        getUser({
            onError: (error) => {
                Alert.alert(
                    'Error',
                    error
                    , [
                        {text: 'Okay'}
                    ]
                );
                this.setState({isLoadingContent: false});
            },
            onSuccess: () => {
                this.setState({
                    isReady: true
                })
            }
        });
        getUserPicture({
            onError: (error) => {
                Alert.alert(
                    'Error',
                    error
                    , [
                        {text: 'Okay'}
                    ]
                );
                this.setState({isLoadingContent: false});
            },
            onSuccess: () => {
                this.setState({
                    isReady: true
                })
            }
        });
        getStatistics({
            onError: (error) => {
                Alert.alert(
                    'Error',
                    error
                    , [
                        {text: 'Okay'}
                    ]
                );
                this.setState({isLoadingContent: false, progress: 0});

            },
            onSuccess: () => {
                this.setState({isLoadingContent: false, progress: 0});
            }
        });

    }

    static getDerivedStateFromProps(props, state) {
        if (props.user !== state.user) {
            userObj = props.user;
            return {user: props.user};
        }
        if (props.userImage !== state.userImage) {
            image = props.userImage.fileLink;
            return {userImage: props.userImage};
        }
        if (props.statics !== state.statics) {
            statics = props.statics;
            return {statics: props.statics};
        }
        return null;
    }
    render() {
        return <AppContainer ref={navigatorRef => {
            this.navigator = navigatorRef;
        }}/>;
    }
}

const mapStateToProps = state => {
    return {
        user: state.UserReducer.user,
        userImage: state.UserReducer.userImage,
        statics: state.UserReducer.statics,
        skiped: state.AuthReducer.skiped,
    };
};

export default connect(
    mapStateToProps,
    {
        logout: actions.logout,
        getUser: actionsUsers.getUser,
        getUserPicture: actionsUsers.getUserPicture,
        syncWithAsyncStorage: actions.syncWithAsyncStorage,
        getStatistics: actionsUsers.getStatistics,
    }
)(App);

