import React, { Component } from 'react';
import { StyleSheet, Text, View, Image ,ImageBackground,Dimensions} from 'react-native';
import { Icon, Drawer } from "native-base";
import {DrawerItems} from 'react-navigation';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import DashBoard from './Drawer/DashBoard';
import Search from './Drawer/Search';
import Setting from './Drawer/Setting';
import Collection from './Drawer/Collection';

const LazyPlaceholder = ({ route }) => (
    <View>
      <Text>Loading {route.title}…</Text>
    </View>
  );

class HomeScreen extends React.Component {
  static navigationOptions = ({  navigation }) => ({
    drawerIcon: ({ tintColor }) => (
      <Icon
      name="home"
      size={30}
      color='white'
      />
    ),
    headerTitle: "Home",
    headerLeft:
    <View style={{paddingLeft:16}}>
        <Icon
            name="md-menu"
            size={30}
            color='white'
            onPress={() => navigation.toggleDrawer()} />

    </View>,


})

constructor(props) {
  super(props);
}
state={
  index: 3,
  routes: [
      { key: 'first', title: 'Collection', 
      // icon:<Image style={{
      //     height:20,
      //     width:20,
      // }} source={require('../Images/radio.png')}/> 
    },
      { key: 'second', title: 'Search', 
      // icon:<Image style={{
      //     height:20,
      //     width:20,
      // }} source={require('../Images/full_star.png')}/> 
    },
      { key: 'third', title: 'DashBoard', 
      // icon:<Image style={{
      //     height:20,
      //     width:20,
      // }} source={require('../Images/listen.png')}/> 
    },
      { key: 'fourth', title: 'Setting' , 
      // icon:<Image style={{
      //     height:20,
      //     width:20,
      // }} source={require('../Images/setting.png')}/>
     },
     { key: 'fifth', title: 'Logout' , 
      // icon:<Image style={{
      //     height:20,
      //     width:20,
      // }} source={require('../Images/setting.png')}/>
     },
      
  ],
}
_renderLazyPlaceholder = ({ route }) => <LazyPlaceholder route={route} />;
  render() {

    return (
      <View style={{flex:1}}>
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
                          height:2,
                      }}
                      style={{ backgroundColor: "#9f9f9f", width:'100%' }}
                      // scrollEnabled={true}
                      renderIcon={({ route, focused, color }) => (
                        <View style={{paddingTop:route.key==='fifth'?8:0}}>{route.icon}</View>
                      )}
                      renderLabel={({ route, focused, color }) => (
                          <Text
                              style={{
                                  color: "#fff",
                                  fontSize: 14,
                                  width:'100%',
                              }}
                          >
                          {route.title}
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
    alignContent:'center'
  },

});


export default HomeScreen
