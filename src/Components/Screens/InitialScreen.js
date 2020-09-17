import React from 'react';
import {
    StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, ImageBackground,
    TextInput, Dimensions
} from 'react-native';
import { Item, Input, Icon } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import { SliderBox } from "react-native-image-slider-box";
// const { width, height } = Dimensions.get('window');
const width= Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import Carousel from 'react-native-looped-carousel';

class InitialScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [
              require('../../../assets/image/ps1.jpg'),          // Local image
              require('../../../assets/image/ps2.jpg'),          // Local image
              require('../../../assets/image/ps3.jpg'),          // Local image
                    // Local image
            ],
            size: { width, height },
          };
    }

   

   
    componentDidMount = () => {

    }

    fun = () =>
    {
        this.props.navigation.navigate("HomeScreen");
    }

    render() {
        return (
            <View style={{ flex: 1 }} >
            <Carousel
              delay={2000}
              style={this.state.size}
              autoplay
              pageInfo
              onAnimateNextPage={(p) => console.log(p)}
            >
              <View style={ this.state.size}>
              <ImageBackground source={require('../../../assets/image/ps1.jpg')} style={{ width: width*1, height: height*1,}} >
                  <View style={{flex: 4, justifyContent:"center", alignItems:"center"}}>
                  <Text style={{color:"white", fontSize:25, marginTop:35}}>WELCOME TO BEEBLIO</Text>

                  </View>

                  <View style={{flex: .5,}}>

                  <TouchableOpacity style={{backgroundColor:"#fff", borderRadius:35, alignItems:"center", justifyContent:"center", marginHorizontal:15}}
                  onPress ={() => this.fun()}>
                  <Text style={{color:"black", fontSize:18, padding:10}}>GET STARTED</Text>

                  </TouchableOpacity>

                  </View>

                 

                 
              </ImageBackground>
              
                  </View>


                  <View style={ this.state.size}>
              <ImageBackground source={require('../../../assets/image/ps2.jpg')} style={{ width: width*1, height: height*1,}} >
                  <View style={{flex: 4, justifyContent:"center", alignItems:"center"}}>
                  <Text style={{color:"white", fontSize:25, marginTop:35}}>WELCOME TO BEEBLIO</Text>

                  </View>

                  <View style={{flex: .5,}}>

                  <TouchableOpacity style={{backgroundColor:"#fff", borderRadius:35, alignItems:"center", justifyContent:"center", marginHorizontal:15}}
                  onPress ={() => this.fun()}>
                  <Text style={{color:"black", fontSize:18, padding:10}}>GET STARTED</Text>

                  </TouchableOpacity>

                  </View>

                 

                 
              </ImageBackground>
              
                  </View>




                  <View style={ this.state.size}>
              <ImageBackground source={require('../../../assets/image/ps3.jpg')} style={{ width: width*1, height: height*1,}}
               >
                  <View style={{flex: 4, justifyContent:"center", alignItems:"center"}}>
                  <Text style={{color:"white", fontSize:25, marginTop:35}}>WELCOME TO BEEBLIO</Text>

                  </View>

                  <View style={{flex: .5,}}>

                  <TouchableOpacity style={{backgroundColor:"#fff", borderRadius:35, alignItems:"center", justifyContent:"center", marginHorizontal:15}}
                  onPress ={() => this.fun()}>
                  <Text style={{color:"black", fontSize:18, padding:10}}>GET STARTED</Text>

                  </TouchableOpacity>

                  </View>

                 

                 
              </ImageBackground>
              
                  </View>


            </Carousel>
          </View>

        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
   
});

export default InitialScreen
