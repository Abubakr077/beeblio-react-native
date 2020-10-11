import React, { Component,useCallback } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, ScrollView, Dimensions, TouchableOpacity, Button } from 'react-native';
import { Container, Header,Content,Icon } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import {LinearGradient} from "expo-linear-gradient";
class Meaning extends React.Component {
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
                        <Col style={{ backgroundColor: 'white',height: 200,marginTop:30 }}>
                            <Text style={{ fontSize: 42,fontWeight: 'bold',color: "#4976b8", textAlign: "left", marginHorizontal: 20, marginTop: 20 }}>
                                Word: </Text>
                            <Text style={{ fontSize: 22,fontWeight: 'bold',color: "#2f3133", textAlign: "left", marginHorizontal: 20, marginTop: 10 }}>
                                Adverb  </Text>
                            <Text style={{ fontSize: 22,color: "#2f3133", textAlign: "left", marginHorizontal: 20, marginTop: 10 }}>
                                [ˈlidərəlē] (American English) </Text>
                            <Text style={{ fontSize: 22,color: "#2f3133", textAlign: "left", marginHorizontal: 20, marginTop: 10 }}>
                                [ˈlɪdərəli] (American English)</Text>

                            <TouchableOpacity style={styles.button} onPress={()=>{alert("you clicked me")}}>
                                <Image source={require('./../../../../assets/image/sou.png')}
                                style={{marginRight:15,height:30,width:30}}/>
                                <Text style={{marginTop:-25, color:"#4976b8", textAlign: "right",fontWeight: "bold",fontSize:18}}>Play Audio</Text>
                            </TouchableOpacity>


                            <Text style={{ fontSize: 22,color: "#2f3133", textAlign: "left", marginHorizontal: 20, marginTop: 10 }}>
                                [ˈlitrəlē] (American English) </Text>

                            <Text style={{ fontSize: 22,color: "#2f3133", textAlign: "left", marginHorizontal: 20, marginTop: 10 }}>
                                [ˈlɪtrəli] (American English)</Text>
                            <TouchableOpacity style={styles.button} onPress={()=>{alert("you clicked me")}}>
                                <Image source={require('./../../../../assets/image/sou.png')}
                                       style={{marginRight:15,height:30,width:30}}/>
                                <Text style={{marginTop:-25, color:"#4976b8", textAlign: "right",fontWeight: "bold",fontSize:18}}>Play Audio</Text>
                            </TouchableOpacity>
                            <Text style={{ fontSize: 22, fontWeight: "bold",color: "#2f3133", textAlign: "left", marginHorizontal: 20, marginTop: 10 }}>
                                Inflections </Text>
                            <Text style={{ fontSize: 20,color: "#2f3133", textAlign: "left", marginHorizontal: 20, marginTop: 10 }}>
                                Word </Text>
                            <Text style={{ fontSize: 20, fontStyle:"italic",color: "#2f3133", textAlign: "left", marginHorizontal: 20, marginTop: 10 }}>
                                Definition 1: </Text>
                            <Text style={{ fontSize: 20,color: "#2f3133", textAlign: "left", marginHorizontal: 20, marginTop: 10 }}>
                                in a literal manner or sense; exactly </Text>
                             <Text style={{ fontSize: 20,color: "#2f3133", textAlign: "left", marginHorizontal: 20, marginTop: 10 }}>
                                in literal manner or sense (short def) </Text>
                            <Text style={{ fontSize: 22, fontWeight:"bold",color: "#2f3133", textAlign: "left", marginHorizontal: 20, marginTop: 10 }}>
                                Examples: </Text>
                            <Text style={{ fontSize: 20,color: "#2f3133", textAlign: "left", marginHorizontal: 20, marginTop: 10 }}>
                            the driver took it literally when asked to go straight across the traffic circle
                                tiramisu, literally translated “pick me up.” </Text>
                        </Col>
                    </Grid>
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
        paddingLeft: 10,
        paddingRight: 15,
        borderRadius: 5,
        marginLeft: 10,
        marginRight: 10, marginTop: 20,
        width: 120,
        height:40,
        alignItems: "center",
        justifyContent: "center",

    },
    button: {
        backgroundColor: '#c0c5cc',
        borderRadius: 10,
        padding: 10,
        marginTop:10,
        marginBottom: 10,
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 10,
        shadowOpacity: 0.35,
        marginLeft: 20,
        height:50,
        width:150,
    },
    buttonText: {
        fontSize: 15,

        // fontFamily: 'Gill Sans',
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10,
        color: '#4976b8',
        backgroundColor: 'transparent',
        paddingVertical: 5,
        fontWeight: "bold",
        // alignSelf:"center"

    },
});

export default Meaning
