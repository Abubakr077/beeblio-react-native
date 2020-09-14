import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, ScrollView, FlatList, Dimensions } from 'react-native';
import { Icon, Drawer } from "native-base";
import { DrawerItems } from 'react-navigation';
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';

const DATA = [
  {
    title: 'Help',
  },
  {
    title: 'Hello',
  },
  {
    title: 'Hello',
  },
];



class Setting extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: "first", title: "Active", indx: 0 },
      { key: "second", title: "Servicing", indx: 1 },
    ],
    email: "",
    selectedItem: 0

  };
  static navigationOptions = ({ navigation }) => ({
    drawerIcon: ({ tintColor }) => (
      <Icon
        name="home"
        size={30}
        color='white'
      />
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
  _handleIndexChange = index => {
    this.setState({ index });
    this.setState({ selectedItem: index });
    //  alert(index);
  }

  renderScene = ({ route }) => {
    switch (route.key) {
      case 'first':
        return <View style={{
          flex: 1,
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.8,
          shadowRadius: 3,
          elevation: 15, marginLeft: 15, marginRight: 15, backgroundColor: "white"
        }}>

          <View style={{
            margin: 10,
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.8,
            shadowRadius: 3,
            elevation: 15, backgroundColor: "white"
          }}>
            <FlatList

              data={DATA}

              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (

                <View>


                  <View style={{ justifyContent: "center", alignItems: "center", flexDirection: "row", height: 60 }}>

                    <Text style={{ flex: 1, alignSelf: "center", textAlign: "center" }}>{item.title}</Text>
                    <View style={{ flex: 1, justifyContent:"center", alignSelf:"center", flexDirection: "row" }}>

                      <TouchableOpacity>

                        <Image source={require('./../../../../assets/image/02.png')} style={{ width: 35, height: 35, resizeMode: "cover" }} />
                       
                      </TouchableOpacity>

                      <TouchableOpacity>

                       <Image source={require('./../../../../assets/image/02.png')} style={{ width: 35, height: 35, resizeMode: "cover",}} />

                      </TouchableOpacity>

                    </View>

                  </View>
                  <View style={{ backgroundColor: "black", height: .5, width: "100%" }}></View>

                </View>



              )}
            />


          </View>


        </View>
          ;
      case 'second':
        return <View style={{
          flex: 1,
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.8,
          shadowRadius: 3,
          elevation: 15, marginLeft: 15, marginRight: 15, backgroundColor: "white"
        }}>

          <View style={{
            margin: 10,
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.8,
            shadowRadius: 3,
            elevation: 15, backgroundColor: "white"
          }}>
            <FlatList

              data={DATA}

              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (

                <View>


                  <View style={{ justifyContent: "center", alignItems: "center", flexDirection: "row", height: 60 }}>

                    <Text style={{ flex: 1, alignSelf: "center", textAlign: "center" }}>{item.title}</Text>
                    <View style={{ flex: 1, justifyContent:"center", alignSelf:"center", flexDirection: "row" }}>

                      <TouchableOpacity>

                        <Image source={require('./../../../../assets/image/02.png')} style={{ width: 35, height: 35, resizeMode: "cover" }} />
                       
                      </TouchableOpacity>

                      <TouchableOpacity>

                       <Image source={require('./../../../../assets/image/02.png')} style={{ width: 35, height: 35, resizeMode: "cover",}} />

                      </TouchableOpacity>

                    </View>

                  </View>
                  <View style={{ backgroundColor: "black", height: .5, width: "100%" }}></View>

                </View>



              )}
            />


          </View>


        </View>
          ;
      default:
        return null;
    }
  };

  render() {

    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <ImageBackground source={require('./../../../../assets/image/wave.png')} style={styles.backgroundImage}>

            <Text style={{ fontSize: 20, color: "black", fontWeight: 'bold', textAlign: "center", marginTop: "13%" }}>RECOMMENDED SITES</Text>

            {/* <FlatList
              data={}
              showsVerticalScrollIndicator={false}
              horizontal={true}
              renderItem={({ item }) => */}

            <Image source={require('./../../../../assets/image/news.jpg')} style={{ height: 150, width: 150, borderRadius: 100, marginTop: 40, marginBottom: "40%", marginRight: 50 }} />


            {/* }
             />  */}

          </ImageBackground>

          <TabView
            navigationState={this.state}
            tabStyle={styles.tab_Style}
            lazy={true}
            renderTabBar={props => (
              <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#FFF', '#FFF', '#FFF']}
                style={{
                  borderTopLeftRadius: 30, borderTopRightRadius: 30, shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.8,
                  shadowRadius: 3,
                  elevation: 15, marginLeft: 15, marginRight: 15
                }}>
                <TabBar
                  {...props}
                  indicatorStyle={{
                    backgroundColor: "transparent"
                  }}
                  style={{ backgroundColor: "transparent" }}
                  // renderIcon={({ route, focused, color }) => (
                  //   <Icon name={"images"} color="#fff" />
                  // )}
                  renderLabel={({ route, focused, color }) => (
                    <View
                      style={
                        this.state.selectedItem === route.indx ? {
                          backgroundColor: 'rgba(37,107,155,0.4)',
                          borderRadius: 30,
                          width: 150,
                          alignItems: "center"

                        } : {
                            alignItems: "center"

                          }
                      }
                    >
                      <Text
                        style={{
                          color: "black",
                          padding: 7,
                          margin: 5,
                          fontSize: 14,
                          fontWeight: "bold"
                        }}
                      >
                        {route.title}
                      </Text>
                    </View>
                  )}
                />
              </LinearGradient>
            )}
            style={{ marginTop: 0 }}
            renderScene={this.renderScene}
            onIndexChange={this._handleIndexChange}
            initialLayout={{
              width: Dimensions.get("window").width,
              height: Dimensions.get("window").height
            }}
          />


        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#F2F2F2"

  },
  backgroundImage: {
    // flex: 1,
    resizeMode: 'cover', // or 'stretch'
    justifyContent: 'center',
    alignItems: "center"
  },
  contents: {
    justifyContent: 'center',
    alignContent: 'center'
  },

});


export default Setting
