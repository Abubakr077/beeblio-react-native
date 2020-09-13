import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { Icon, Drawer } from "native-base";
import { DrawerItems } from 'react-navigation';
import { Searchbar } from 'react-native-paper';
import { ProgressChart } from "react-native-chart-kit";
const screenWidth = Dimensions.get("window").width;
import ProgressCircle from 'react-native-progress-circle'
import { LinearGradient } from 'expo-linear-gradient';



class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    };
  }
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


  render() {

    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

          {/* <View style={{ flex: 1.5, marginBottom: 15 }}> */}

            <ImageBackground source={require('./../../../../assets/image/wave.png')} style={styles.backgroundImage}>
              <Text style={{ fontSize: 18, color: "black", textAlign: "center", marginHorizontal: 20, marginTop: 30 }}>Want to improve your vocabulary?
            Find and learn less common terms from any text you can access</Text>

              <View style={{ marginHorizontal: 15, marginTop: 30, marginBottom: "32%" }}>

                <Searchbar
                  placeholder="Search"
                  onChangeText={(search) => { this.setState({ search }); }}
                  value={this.state.search}
                />
              </View>

            </ImageBackground>


          {/* </View> */}

          {/* <View style={{ flex: 1.7, backgroundColor: "transparent" }}> */}

            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>


              <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>


                <ProgressCircle
                  percent={30}
                  radius={30}
                  borderWidth={8}
                  color="green"
                  shadowColor="#999"
                  bgColor="#fff"
                >
                </ProgressCircle>
                <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 15 }}>{'30%'}</Text>
                <Text style={{ fontSize: 16, marginTop: 5 }}>{'Content Searched'}</Text>
              </View>
              <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>


                <ProgressCircle
                  percent={30}
                  radius={30}
                  borderWidth={8}
                  color="blue"
                  shadowColor="#999"
                  bgColor="#fff"
                >
                </ProgressCircle>
                <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 15 }}>{'30%'}</Text>
                <Text style={{ fontSize: 16, marginTop: 5 }}>{'Texts Filtered'}</Text>

              </View>

            </View>

            <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 15, alignSelf: "center", marginTop: 15, marginHorizontal: 15, marginBottom: 20 }}>{'RESULT'}</Text>

            {/* <FlatList
          // data={this.state.users}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => */}

            <View style={{ backgroundColor: "#fff", marginLeft: 5, marginRight: 5, flexDirection: "row", }}>

              <Image source={require('./../../../../assets/image/others.jpg')}
                style={{ height: 120, width: 100, margin: 5 }}>

              </Image>

              <View style={{ flexDirection: "column" }}>
                <Text style={{ fontSize: 18, color: "black", fontWeight: 'bold', textAlign: "center", marginLeft: 10, marginTop: 15 }}>THE TITLE</Text>
                <Text style={{ fontSize: 16, color: "black", textAlign: "center", marginLeft: 10, marginTop: 5 }}>The Subtitle</Text>

              </View>


              <View style={{ flex: 1, alignItems: "flex-end", flexDirection: "column" }}>

                <TouchableOpacity
                  style={{ marginTop: 10 }}>
                  <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={['#256B9B', '#3FB0F1', '#3FB0F1']}
                    style={styles.linearGradient1}>
                    <Text style={styles.buttonText}>VIEW</Text>
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



          {/* </View> */}
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
    // flex: 1.5,  
    resizeMode: "center"
    // or 'stretch'
    // justifyContent: 'center',
    // marginBottom:20
  },
  contents: {
    justifyContent: 'center',
    alignContent: 'center'
  },
  linearGradient1: {
    // flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 35,
    marginLeft: 10,
    marginRight: 10, marginBottom: 10,
    width: 120,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    fontSize: 13,
    // fontFamily: 'Gill Sans',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
    paddingVertical: 3,
    fontWeight: "bold",
    // alignSelf:"center"

  },

});


export default Search
