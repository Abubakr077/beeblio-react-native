import React from 'react';
import { StyleSheet, Text, View, Image ,ImageBackground} from 'react-native';
import { Icon, Drawer } from "native-base";
import {DrawerItems} from 'react-navigation';

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
  render() {

    return (
      <View style={styles.container}>
        <ImageBackground source={require('./../../../assets/image/wave.png')} style={styles.backgroundImage}>
          <View style={styles.contents}>
          <Text>HomeScreen</Text>
          </View>
        </ImageBackground>
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
