import React from 'react';
import {
    StyleSheet, Text, View, Image,
    ImageBackground, ScrollView, FlatList, TouchableOpacity, TextInput, Picker, Dimensions
} from 'react-native';
import { Icon, Drawer } from "native-base";
import { DrawerItems } from 'react-navigation';
import { Searchbar } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const DATA = [
    {
        id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
        title: "First",
        note: "1"
    },
    {
        id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
        title: "Second",
        note: "1"

    },
    {
        id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
        title: "Third",
        note: "1"

    },
    {
        id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
        title: "First",
        note: "1"
    },
    {
        id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
        title: "Second",
        note: "1"

    },
    {
        id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
        title: "Third",
        note: "1"

    },

];

class MainLogin extends React.Component {
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
                <ScrollView>

                    <ImageBackground source={require('./../../../../assets/image/wave.png')} style={styles.backgroundImage}>




                        <View style={{ marginTop: 50, justifyContent: "center", alignItems: "center" }}>
                            <Image source={require('./../../../../assets/image/logobig.png')} style={{ resizeMode: "cover" }} />
                        </View>

                        <View style={{ marginTop: 15, justifyContent: "center", alignItems: "center" }}>
                            <Image source={require('./../../../../assets/image/homeimg.png')} style={{ resizeMode: "cover" }} />
                        </View>



                        <View style={{ flex: 1, justifyContent: "center", flexDirection: "row", }}>

                            <TouchableOpacity
                                style={{ marginTop: 10, flex: 1, }}>
                                <LinearGradient
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    colors={['#256B9B', '#3FB0F1', '#3FB0F1']}
                                    style={styles.linearGradient1}>
                                    <Text style={styles.buttonText}>SIGNUP</Text>
                                </LinearGradient>
                            </TouchableOpacity>


                            <TouchableOpacity
                                style={{ marginTop: 10, flex: 1 }}>
                                <LinearGradient
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    colors={['#256B9B', '#3FB0F1', '#3FB0F1']}
                                    style={styles.linearGradient1}>
                                    <Text style={styles.buttonText}>LIGIN</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>








                    </ImageBackground>
                    <View >




                        <View style={{
                            backgroundColor: "#fff", marginLeft: 10, marginRight: 10, alignItems: "center",
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: 0.8,
                            shadowRadius: 3,
                            elevation: 15,
                            alignItems: "center"
                        }}>



                            <Text style={{ fontSize: 18, color: "black", fontWeight: 'bold', textAlign: "center", marginLeft: 25, marginTop: 15, marginRight: 25 }}>Want to improve your vocabulary? Find and learn less common terms from any text you can access</Text>
                            <TextInput
                                placeholder="Provide the text context"
                                style={{ borderBottomColor: "#000", height: 100, borderBottomWidth: .5, width: "80%" }}></TextInput>


                            <TextInput
                                placeholder="Number of common terms"
                                style={{ borderBottomColor: "#000", borderBottomWidth: .5, width: "80%", marginTop: "10%" }}></TextInput>


                            <View style={{ borderBottomColor: "#000", borderBottomWidth: .5, width: "80%", marginTop: "10%" }}>
                                <Picker
                                // selectedValue={selectedValue}
                                // onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                                >
                                    <Picker.Item label="Java" value="java" />
                                    <Picker.Item label="JavaScript" value="js" />
                                </Picker>
                            </View>
                            <TouchableOpacity
                                style={{ marginTop: 40, width: "100%" }}>
                                <LinearGradient
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    colors={['#3FB0F1', '#3FB0F1', '#256B9B']}
                                    style={styles.linearGradient1}>
                                    <Text style={styles.buttonText}>FILTER - CHECKOUTYOUR RESULTS</Text>
                                </LinearGradient>
                            </TouchableOpacity>

                            <Text style={{ fontSize: 20, color: "black", fontWeight: 'bold', textAlign: "center", marginLeft: 25, marginTop: 15, marginRight: 25 }}>Do you want to save your search history?</Text>


                            <TouchableOpacity
                                style={{ marginTop: 10, width: "100%", marginBottom: 50 }}>
                                <LinearGradient
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    colors={['#3FB0F1', '#3FB0F1', '#256B9B']}
                                    style={styles.linearGradient1}>
                                    <Text style={styles.buttonText}>SIGNUP ITS FREE</Text>
                                </LinearGradient>
                            </TouchableOpacity>



                        </View>







                        <Text style={{ fontSize: 20, color: "black", fontWeight: 'bold', textAlign: "center", marginLeft: 25, marginTop: 15, marginRight: 25, marginBottom: 20 }}>FILTERED RESULTS</Text>


                        <FlatList

                            data={DATA}
                            horizontal={false}
                            numColumns={3}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (

                                <View style={{
                                    backgroundColor: "#fff", padding: 10, shadowColor: '#000',
                                    shadowOffset: { width: 0, height: 1 },
                                    shadowOpacity: 0.8,
                                    shadowRadius: 3,
                                    elevation: 15, margin: 5, flex: 1, borderRadius: 20, flexDirection: "row", marginBottom:5
                                }}>

                                    <View style={{ flex: 1, justifyContent: "center", alignSelf: "center", }}>

                                        <Text style={{ fontSize: 16, color: "black", textAlign: "center", }}>{item.title}</Text>
                                        <Text style={{ fontSize: 16, color: "black", textAlign: "center", marginTop: 7 }}>({item.note})</Text>



                                    </View>

                                    <View style={{ flex: 1, justifyContent: "flex-end", alignSelf: "flex-end", }}>

                                        <TouchableOpacity>

                                            <Image source={require('./../../../../assets/image/02.png')} style={{ width: 35, height: 35, resizeMode: "cover", marginLeft:10 }} />

                                        </TouchableOpacity>

                                        <TouchableOpacity>

                                            <Image source={require('./../../../../assets/image/02.png')} style={{ width: 35, height: 35, resizeMode: "cover",   marginLeft:10}} />

                                        </TouchableOpacity>

                                    </View>






                                </View>

                            )}
                        />

                        <View style={{marginBottom:25}}>

                        </View>


                    </View>
                </ScrollView>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // flexDirection: "column",
        backgroundColor: "#F2F2F2"
    },
    backgroundImage: {
        // flex: .5,
        resizeMode: 'cover',
        height: windowHeight * .65
        // or 'stretch'
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
        marginRight: 10, marginBottom: 10,
    },
    buttonText: {
        fontSize: 13,
        // fontFamily: 'Gill Sans',
        // textAlign: 'center',
        margin: 12,
        color: '#ffffff',
        backgroundColor: 'transparent',
        paddingVertical: 3,
        fontWeight: "bold",
        textAlign: "center"

    },

});


export default MainLogin
