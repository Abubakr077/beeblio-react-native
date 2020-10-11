import React, { Component,useCallback } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, ScrollView, Dimensions, TouchableOpacity, Linking } from 'react-native';
import { Container, Header,Icon } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {LinearGradient} from "expo-linear-gradient";
class content extends React.Component {
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
        headerTitle: "Content",
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
            <ScrollView>
            <Container style={{backgroundColor:"white"}}>
                <Grid style={{backgroundColor:"white"}}>
                    <Col style={{ backgroundColor: 'white', width: 150,height: 200,marginTop:30 }}>
                        <Image source={require('./../../../../assets/image/dead.jpg')} style={{ height:200, width:120}}/>
                        <Image source={require('./../../../../assets/image/like.png')}
                               style={{ height: 40, width: 30, margin: 2, marginLeft: 60 }}>

                        </Image>
                        <TouchableOpacity
                            style={{ marginTop: 7 }}>
                            <LinearGradient
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                colors={['#256B9B', '#3FB0F1', '#3FB0F1']}
                                style={styles.linearGradient1}>
                                <Text style={styles.buttonText}>RUN SEARCH</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                    </Col>

                    <Col style={{  height: 200, width:240,backgroundColor:"white"}}>
                        <View>
                            <ImageBackground  style={styles.backgroundImage}>

                                <Text style={{ fontSize: 22,fontWeight: 'bold',color: "#2465c7", textAlign: "left", marginHorizontal: 20, marginTop: 30 }}>
                                    Link: </Text>
                                <Text style={{fontSize: 22, fontWeight:'bold', color:'#4976b8', textAlign: "right", marginTop: -30, marginRight: 70}}
                                      onPress={() => Linking.openURL('https://web-test.beebl.io/dashboard/collection')}>
                                    Beeblio
                                </Text>
                                <Text style={{ fontSize: 22,fontWeight: 'bold',color: "#2465c7", textAlign: "left", marginHorizontal: 20, marginTop: 30 }}>
                                    Type: </Text>
                                <Text style={{fontSize:22,fontWeight:'bold', color:"black",textAlign:"left", marginHorizontal:15, marginTop:20}}> Text</Text>
                            </ImageBackground>
                        </View>
                    </Col>
                </Grid>

                <Container style={{ marginTop: -100, width:150}}>
                    <Grid>
                <Text style={{ fontSize: 22,fontWeight: 'bold',color: "#2465c7", textAlign: "left", marginHorizontal: 20, marginTop: -20 }}>
                    Contents: </Text>
                <Text style={{ fontSize: 20,fontWeight: 'bold',color: "#2f3133", textAlign: "left", marginHorizontal: -130, marginTop: 10 }}>
                    git clone | Atlassian Git Tutorial Learn Git Learn Git with Bitbucket Cloud Create a Git repository Copy your Git repository and add files Pull changes from your Git repository on Bitbucket Cloud Use a Git branch to merge a file Learn.   </Text>
                    </Grid>
                </Container>
            </Container>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        flexDirection: "row",
        backgroundColor:"black",
        flex:1,

    },

    backgroundImage: {
        // flex: 1.5,
        flexDirection:"column",
        resizeMode: "center",
        //backgroundColor:"white",


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

export default content
