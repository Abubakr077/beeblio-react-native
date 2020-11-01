
import React from 'react';
import {Text, View, Image, Dimensions, AsyncStorage,Alert } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';


import DashBoard from './Drawer/DashBoard';
import Search from './Drawer/Search';
import Setting from './Drawer/Setting';
import Collection from './Drawer/Collection';
import * as NavigationService from '../../NavigationService'

import Header from "../SeperateComponents/Header";
import {connect} from "react-redux";
import * as actions from "../../Store/Actions/AuthActions";
import * as actionsUsers from "../../Store/Actions/UserActions";


const LazyPlaceholder = ({ route }) => (
  <View>
    <Text>Loading {route.title}…</Text>
  </View>
);

class HomeScreen extends React.PureComponent {
  static navigationOptions = ({ navigation }) => ({
      header: (props) => <Header navigation={navigation}  previous={false}/>
  })
    componentDidMount() {
        const {getUser, getUserPicture} = this.props;
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
    }
    static getDerivedStateFromProps(props, state) {
        if (props.user !== state.user) {
            return {user: props.user};
        }
        if (props.userImage !== state.userImage) {
            return {userImage: props.userImage};
        }

        return null;
    }

    constructor(props) {
    super(props);
    this.state = {
        index: 2,
        routes: [
            {
                key: 'first', title: 'Collection',
                icon: <Image style={{
                    height: 20,
                    width: 20,
                }} source={require('../../../assets/image/collection.png')} />
            },
            {
                key: 'second', title: 'Search',
                icon: <Image style={{
                    height: 20,
                    width: 20,
                }} source={require('../../../assets/image/searchh.png')} />
            },
            {
                key: 'third', title: 'DashBoard',
                icon: <Image style={{
                    height: 40,
                    width: 40,
                }} source={require('../../../assets/image/page.png')} />
            },
            {
                key: 'fourth', title: 'Setting',
                icon: <Image style={{
                    height: 20,
                    width: 20,
                }} source={require('../../../assets/image/gear.png')} />
            },
            {
                key: 'fifth', title: 'Logout',
                icon: <Image style={{
                    height: 20,
                    width: 20,
                }} source={require('../../../assets/image/logoutt.png')} />
            },

        ],
    }
  }

  _renderLazyPlaceholder = ({ route }) => <LazyPlaceholder route={route} />;
    logoutUser = async () => {
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
  render() {

    return (
      <View style={{ flex: 1 }}>
        <TabView
          tabBarPosition='bottom'
          navigationState={this.state}
          renderScene={SceneMap({
            first: Collection,
            second: Search,
            third: DashBoard,
            fourth: Setting,
            fifth: Setting
          })}
          onIndexChange={index =>
          {
              this.setState({ index })
              if (index===4){
                  Alert.alert(   // Shows up the alert without redirecting anywhere
                      'Confirmation required'
                      ,'Do you really want to logout?'
                      ,[
                          {text: 'Accept', onPress: () =>  this.logoutUser()},
                          {text: 'Cancel'}
                      ]
                  );
              }
          }
          }
          initialLayout={{ width: Dimensions.get('window').width }}
          // lazy ={true}
          renderTabBar={props => (
            <TabBar
              {...props}
              indicatorStyle={{
                backgroundColor: "#fff",
                height: 2,
              }}
              style={{ backgroundColor: "#fff", width: '100%' }}
              // scrollEnabled={true}
              renderIcon={({ route, focused, color }) => (
                <View style={{ paddingTop: route.key === 'fifth' ? 0 : 0 }}>{route.icon}</View>
              )}
              renderLabel={({ route, focused, color }) => (
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 14,
                    width: '100%',
                    height: 0
                  }}
                >
                  {}
                </Text>
              )}
            />
          )}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
    return {
        user: state.UserReducer.user,
        userImage: state.UserReducer.userImage,
    };
};

export default connect(
    mapStateToProps,
    {
        getUser: actionsUsers.getUser,
        getUserPicture: actionsUsers.getUserPicture
    }
)(HomeScreen);
