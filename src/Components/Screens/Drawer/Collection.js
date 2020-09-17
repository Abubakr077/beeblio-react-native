import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, ScrollView, FlatList, TouchableOpacity,  } from 'react-native';
import { Icon, Drawer } from "native-base";
import { DrawerItems } from 'react-navigation';
import { Searchbar } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';


class Collection extends React.Component {
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
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    };
  }
  render() {

    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

          <ImageBackground source={require('./../../../../assets/image/wave.png')} style={styles.backgroundImage}>
            <View style={{ marginHorizontal: 15, marginTop: 30, marginBottom: 10 }}>

              <Searchbar
                placeholder="Search"
                onChangeText={(search) => {
                  this.setState({ search });
                }}
                value={this.state.search}
              />
            </View>


            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>

              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['#66AECF', '#82D1F5', '#66AECF']}
                style={styles.linearGradient}>
                <View style={{ justifyContent: "center", alignItems: "center" }}>

                  <View style={{ marginTop: 15, justifyContent: "center", alignItems: "center" }}>
                    <Image source={require('./../../../../assets/image/i1.png')} style={{ width: 45, height: 45, resizeMode: "cover" }} />
                  </View>

                  <View style={{ marginVertical: 20 }}>
                    <Text style={{ fontSize: 16, color: "white", fontWeight: 'bold', textAlign: "center" }}>450</Text>


                  </View>


                </View>
              </LinearGradient>


              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['#66AECF', '#82D1F5', '#66AECF']}
                style={styles.linearGradient}>
                <View style={{ justifyContent: "center", alignItems: "center" }}>

                  <View style={{ marginTop: 15, justifyContent: "center", alignItems: "center" }}>
                    <Image source={require('./../../../../assets/image/i2.png')} style={{ width: 45, height: 45, resizeMode: "cover" }} />
                  </View>

                  <View style={{ marginVertical: 20 }}>
                    <Text style={{ fontSize: 16, color: "white", fontWeight: 'bold', textAlign: "center" }}>450</Text>


                  </View>


                </View>
              </LinearGradient>


              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['#66AECF', '#82D1F5', '#66AECF']}
                style={styles.linearGradient}>
                <View style={{ justifyContent: "center", alignItems: "center" }}>

                  <View style={{ marginTop: 15, justifyContent: "center", alignItems: "center" }}>
                    <Image source={require('./../../../../assets/image/i3.png')} style={{ width: 45, height: 45, resizeMode: "cover" }} />
                  </View>

                  <View style={{ marginVertical: 20 }}>
                    <Text style={{ fontSize: 16, color: "white", fontWeight: 'bold', textAlign: "center" }}>450</Text>


                  </View>


                </View>
              </LinearGradient>


              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['#66AECF', '#82D1F5', '#66AECF']}
                style={styles.linearGradient}>
                <View style={{ justifyContent: "center", alignItems: "center" }}>

                  <View style={{ marginTop: 15, justifyContent: "center", alignItems: "center" }}>
                    <Image source={require('./../../../../assets/image/i4.png')} style={{ width: 45, height: 45, resizeMode: "cover" }} />
                  </View>

                  <View style={{ marginVertical: 20 }}>
                    <Text style={{ fontSize: 16, color: "white", fontWeight: 'bold', textAlign: "center" }}>450</Text>


                  </View>


                </View>
              </LinearGradient>



            </View>


          </ImageBackground>
          <View style={{ flex: 1 }}>


          {/* <FlatList
          // data={this.state.users}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => */}
         
          <View style={{ backgroundColor: "#fff", marginLeft: 5, marginRight: 5, flexDirection: "row", }}>

          <Image source={require('./../../../../assets/image/others.jpg')}
            style={{ height: 120, width: 100, margin: 5 }}>

          </Image>

          <View style={{flexDirection:"column"}}>
          <Text style={{ fontSize: 18, color: "black", fontWeight: 'bold', textAlign: "center", marginLeft: 10, marginTop:15 }}>THE TITLE</Text>
          <Text style={{ fontSize: 16, color: "black",  textAlign: "center", marginLeft: 10, marginTop:5 }}>The Subtitle</Text>

          </View>


          <View style={{flex:1, alignItems:"flex-end", flexDirection:"column"}}>

            <TouchableOpacity
              style={{ marginTop: 10 }}>
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['#256B9B', '#3FB0F1', '#3FB0F1']}
                style={styles.linearGradient1}>
                <Text style={styles.buttonText}>VIEW DETAILS</Text>
              </LinearGradient>
            </TouchableOpacity>


            <TouchableOpacity
              style={{ marginTop: 10 }}>
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['#256B9B', '#3FB0F1', '#3FB0F1']}
                style={styles.linearGradient1}>
                <Text style={styles.buttonText}>RUN SEARCH</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>


        </View>



          {/* }
        /> */}


          </View>
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
    flex: .5,
    resizeMode: 'cover', // or 'stretch'
    // justifyContent: 'center',
  },
  contents: {
    justifyContent: 'center',
    alignContent: 'center'
  },
  linearGradient: {
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 12,
    margin: 7,
    height: 100,
    width: 75,
    marginTop: 15
  },
  linearGradient1: {
    // flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 35,
    marginLeft: 10,
    marginRight:10,marginBottom:10
  },
  buttonText: {
    fontSize: 13,
    // fontFamily: 'Gill Sans',
    // textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
    paddingVertical:3,
    fontWeight:"bold"
  
  },

});


export default Collection
