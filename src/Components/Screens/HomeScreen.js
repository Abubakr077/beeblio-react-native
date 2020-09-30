
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, Dimensions } from 'react-native';
import { Icon, Drawer } from "native-base";
import { DrawerItems } from 'react-navigation';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';


import DashBoard from './Drawer/DashBoard';
import Search from './Drawer/Search';
import Setting from './Drawer/Setting';
import Collection from './Drawer/Collection';
import {connect} from "react-redux";
import * as actions from '../../Store/Actions/UserActions';
import * as NavigationService from '../../NavigationService'
import {LOGOUT} from "../../Store/Actions/type";


const LazyPlaceholder = ({ route }) => (
  <View>
    <Text>Loading {route.title}…</Text>
  </View>
);

class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    drawerIcon: ({ tintColor }) => (
      <View>

        <Icon
          name="home"
          size={30}
          color='white'
        />



      </View>

    ),
    headerTitle: "Home",
    headerLeft:
      <View style={{ paddingLeft: 16 }}>
        <Icon
          name="md-menu"
          size={30}
          color='white'
          onPress={() => navigation.toggleDrawer()} />

            </View>,


    })

  constructor(props) {
    super(props);
    this.updateUser();
  }
    updateUser = () => {
        const {getUser} = this.props;
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

    }
  state = {
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

  componentDidMount = () => {

    // const Logout = new logoutt();
    // Logout.navigate_data(this.props.navigation);
  }


  _renderLazyPlaceholder = ({ route }) => <LazyPlaceholder route={route} />;
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
            fifth: Setting,
          })}
          onIndexChange={index => this.setState({ index })}
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
                <View style={{ paddingTop: route.key === 'fifth' ? 8 : 0 }}>{route.icon}</View>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch'
        justifyContent: 'center',
    },
    contents: {
        justifyContent: 'center',
        alignContent: 'center'
    },

});
const mapStateToProps = state => {
    return {
        user: state.UserReducer.user,
    };
};

export default connect(
    mapStateToProps,
    {
        getUser: actions.getUser,
    },
)(HomeScreen);
