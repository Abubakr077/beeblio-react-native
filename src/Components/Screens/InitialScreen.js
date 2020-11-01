import React from 'react';
import {
    StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, ImageBackground,
    TextInput, Dimensions, AsyncStorage
} from 'react-native';
import {Item, Input, Icon} from 'native-base';
import {LinearGradient} from 'expo-linear-gradient';
import {SliderBox} from "react-native-image-slider-box";
// const { width, height } = Dimensions.get('window');
const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height) + 10;
import Carousel from 'react-native-looped-carousel';

class InitialScreen extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            images: [
                require('../../../assets/image/ps1.jpg'),          // Local image
                require('../../../assets/image/ps2.jpg'),          // Local image
                require('../../../assets/image/ps3.jpg'),          // Local image
                // Local image
            ],
            size: {width, height},
        };
        this.navigate = this.navigate.bind(this);
    }


    navigate() {
        AsyncStorage.setItem('initial', 'true');
        this.props.navigation.navigate("MainLogin");
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Carousel
                    delay={4000}
                    style={this.state.size}
                    autoplay
                    bullets={true}

                    // onAnimateNextPage={(p) => console.log(p)}
                >
                    <View style={this.state.size}>
                        <ImageBackground source={require('../../../assets/image/ps1.jpg')}
                                         style={{width: width, height: height,}}>
                            <View style={{flex: 4, justifyContent: "center", alignItems: "center"}}>
                                <Text style={{color: "white", fontSize: 25, marginTop: 65}}>WELCOME TO BEEBLIO</Text>
                                <Text style={{
                                    color: "white", fontSize: 15,
                                    marginTop: 15,
                                    paddingLeft: 35,
                                    paddingRight: 35
                                }}>
                                    The best place to get your vocabulary improve
                                    Beebl.io makes use of the most intelligent
                                    dictionary in the world with an innovative research
                                    game that allows you to easily learn new words.
                                </Text>
                            </View>

                            <View style={{flex: .5,}}>

                                <TouchableOpacity style={{
                                    backgroundColor: "#fff",
                                    borderRadius: 35,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginHorizontal: 15
                                }}
                                                  onPress={this.navigate}>
                                    <Text style={{color: "black", fontSize: 18, padding: 10}}>GET STARTED</Text>

                                </TouchableOpacity>

                            </View>


                        </ImageBackground>

                    </View>
                    <View style={this.state.size}>
                        <ImageBackground source={require('../../../assets/image/ps2.jpg')}
                                         style={{width: width, height: height,}}>
                            <View style={{flex: 4, justifyContent: "center", alignItems: "center"}}>
                                <Text style={{color: "white", fontSize: 25, marginTop: 35}}>As your vocabulary </Text>
                                <Text style={{color: "white", fontSize: 25}}>grows, Beebl.io </Text>
                                <Text style={{color: "white", fontSize: 25}}>grows with you</Text>

                            </View>

                            <View style={{flex: .5,}}>

                                <TouchableOpacity style={{
                                    backgroundColor: "#fff",
                                    borderRadius: 35,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginHorizontal: 15
                                }}
                                                  onPress={this.navigate}>
                                    <Text style={{color: "black", fontSize: 18, padding: 10}}>GET STARTED</Text>

                                </TouchableOpacity>

                            </View>


                        </ImageBackground>

                    </View>
                    <View style={this.state.size}>
                        <ImageBackground source={require('../../../assets/image/ps3.jpg')}
                                         style={{width: width, height: height,}}
                        >
                            <View style={{flex: 4, justifyContent: "center", alignItems: "center"}}>
                                <Text style={{color: "white", fontSize: 25, marginTop: 35}}>As your vocabulary </Text>
                                <Text style={{color: "white", fontSize: 25}}>grows, Beebl.io </Text>
                                <Text style={{color: "white", fontSize: 25}}>grows with you</Text>

                            </View>

                            <View style={{flex: .5,}}>

                                <TouchableOpacity style={{
                                    backgroundColor: "#fff",
                                    borderRadius: 35,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginHorizontal: 15
                                }}
                                                  onPress={this.navigate}>
                                    <Text style={{color: "black", fontSize: 18, padding: 10}}>GET STARTED</Text>

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
