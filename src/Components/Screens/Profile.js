import React from 'react';
import {
    StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, ImageBackground,
    TextInput, Dimensions, AsyncStorage
} from 'react-native';
import {Item, Input, Icon} from 'native-base';
import {LinearGradient} from 'expo-linear-gradient';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Loader from '../SeperateComponents/Loader';
import moment from 'moment';
import { Avatar } from 'react-native-paper';

class Profile extends React.Component {
    static navigationOptions = ({navigation}) => ({
        drawerIcon: ({tintColor}) => (
            <View>
                <Icon
                    name="home"
                    size={30}
                    color='white'
                />
            </View>
        ),
        headerTitle: "Profile",
        headerLeft:
            <View style={{paddingLeft: 16}}>
                <Icon
                    name="md-menu"
                    size={30}
                    color='white'
                    onPress={() => navigation.toggleDrawer()}/>
            </View>,
    })

    constructor(props) {
        super(props);
        this.state = {
            email_address: 'j',
            user: null,
            isReady: false,
            email: '',
            firstName: '',
            lastName:'',
            password: '',
            image: ''
        };
        AsyncStorage.getItem('user_obj').then((user) => {
            this.setState({
                user: JSON.parse(user),
                isReady: true
            },()=>{
                this.setState({
                    firstName: this.state.user.apiUserProfile.firstName,
                    lastName: this.state.user.apiUserProfile.lastName,
                    email: this.state.user.email,
                })
            })
        })
        AsyncStorage.getItem('user_img').then((user) => {
            const imgObj = JSON.parse(user);
            this.setState({
                image: imgObj.fileLink,
                isReady: true
            })
        })
    }

    _signIn = () => {
        //   alert(this.state.email_address);
    }
    navigatee = () => {
        this.props.navigation.navigate("RegisterScreen")

    }

    render() {
        const {
            isReady,
            user,
            email,
            firstName,
            lastName,
            password,
            image
        } = this.state;
        return (

            <View style={styles.container}>

                {isReady?<ScrollView>

                    <ImageBackground
                        source={require('./../../../assets/image/wave.png')}
                        style={styles.image}>

                        <View style={{
                            backgroundColor: "#fff",
                            shadowColor: '#000',
                            shadowOffset: {width: 0, height: 1},
                            shadowOpacity: 0.8,
                            shadowRadius: 3,
                            elevation: 15,
                            marginTop: 60,
                            marginLeft: 20,
                            marginRight: 20,
                            justifyContent: "center",
                            alignItems: "center"
                        }}>


                            <View style={{flexDirection: "row"}}>


                                <View style={{
                                    borderRadius: 100,
                                    borderWidth: .3,
                                    borderColor: "#000",
                                    marginTop: "10%",
                                    marginLeft: 35
                                }}>


                                    {/*<Image source = {{uri : image}}*/}
                                    {/*       style={{height: 130, width: 130, resizeMode: "center",}}/>*/}
                                    <Avatar.Image size={130} source = {{uri : image}} />
                                </View>

                                <TouchableOpacity style={{marginTop: "10%"}}>

                                    <Image source={require('./../../../assets/image/icons-edit.png')}
                                           style={{width: 25, height: 25, resizeMode: "cover", marginLeft: 10}}/>
                                </TouchableOpacity>
                            </View>


                            <Text style={{
                                fontSize: 20,
                                color: "black",
                                fontWeight: 'bold',
                                textAlign: "center",
                                marginLeft: 25,
                                marginTop: 15,
                                marginRight: 25,
                                marginBottom: 20
                            }}>{user.apiUserProfile.firstName}</Text>
                            <View style={{borderWidth: .3, borderColor: "#000", width: "100%", marginTop: "10%"}}>

                            </View>


                            <Text style={{
                                fontSize: 15,
                                color: "black",
                                fontWeight: 'bold',
                                textAlign: "center",
                                marginVertical: 25
                            }}>Member Since {moment(user.apiUserProfile.dateCreated).format('MMMM YYYY')}</Text>


                        </View>

                    </ImageBackground>


                    <View style={{
                        backgroundColor: "#fff",
                        shadowColor: '#000',
                        shadowOffset: {width: 0, height: 1},
                        shadowOpacity: 0.8,
                        shadowRadius: 3,
                        elevation: 15,
                        marginTop: 60,
                        marginLeft: 20,
                        marginRight: 20,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 25
                    }}>

                        <Text style={{
                            fontSize: 18,
                            color: "black",
                            fontWeight: 'bold',
                            textAlign: "center",
                            marginTop: 15,
                            marginBottom: 20
                        }}>YOUR PROFILE DETAILS</Text>

                        <View style={{flexDirection: "row", flex: 1, marginBottom: 50}}>

                            <TextInput
                                placeholder="first name"
                                onChangeText={(firstName) => {
                                    this.setState({ firstName });
                                }}
                                value={firstName}
                                style={{
                                    borderBottomColor: "#000",
                                    borderBottomWidth: .5,
                                    width: "80%",
                                    marginTop: "10%",
                                    flex: 1,
                                    marginLeft: 25,
                                }}/>


                            <TouchableOpacity style={{flex: .2, alignSelf: "flex-end"}}>

                                <Image source={require('./../../../assets/image/02.png')}
                                       style={{width: 35, height: 35, resizeMode: "cover", marginLeft: 3,}}/>

                            </TouchableOpacity>

                        </View>


                        <View style={{flexDirection: "row", flex: 1, marginBottom: 50}}>

                            <TextInput
                                placeholder="last name"
                                onChangeText={(lastName) => {
                                    this.setState({ lastName });
                                }}
                                value={lastName}
                                style={{
                                    borderBottomColor: "#000",
                                    borderBottomWidth: .5,
                                    width: "80%",
                                    marginTop: "10%",
                                    flex: 1,
                                    marginLeft: 25,
                                }}/>


                            <TouchableOpacity style={{flex: .2, alignSelf: "flex-end"}}>

                                <Image source={require('./../../../assets/image/02.png')}
                                       style={{width: 35, height: 35, resizeMode: "cover", marginLeft: 3,}}/>

                            </TouchableOpacity>

                        </View>


                        <View style={{flexDirection: "row", flex: 1, marginBottom: 50}}>

                            <TextInput
                                placeholder="email"
                                value={email}
                                onChangeText={(email) => {
                                    this.setState({ email });
                                }}
                                style={{
                                    borderBottomColor: "#000",
                                    borderBottomWidth: .5,
                                    width: "80%",
                                    marginTop: "10%",
                                    flex: 1,
                                    marginLeft: 25,
                                }}/>


                            <TouchableOpacity style={{flex: .2, alignSelf: "flex-end"}}>

                                <Image source={require('./../../../assets/image/02.png')}
                                       style={{width: 35, height: 35, resizeMode: "cover", marginLeft: 3,}}/>

                            </TouchableOpacity>

                        </View>


                        {/*<View style={{flexDirection: "row", flex: 1, marginBottom: 50}}>*/}

                        {/*    <TextInput*/}
                        {/*        placeholder="********"*/}
                        {/*        style={{*/}
                        {/*            borderBottomColor: "#000",*/}
                        {/*            borderBottomWidth: .5,*/}
                        {/*            width: "80%",*/}
                        {/*            marginTop: "10%",*/}
                        {/*            flex: 1,*/}
                        {/*            marginLeft: 25,*/}
                        {/*        }}/>*/}


                        {/*    <TouchableOpacity style={{flex: .2, alignSelf: "flex-end"}}>*/}

                        {/*        <Image source={require('./../../../assets/image/02.png')}*/}
                        {/*               style={{width: 35, height: 35, resizeMode: "cover", marginLeft: 3,}}/>*/}

                        {/*    </TouchableOpacity>*/}

                        {/*</View>*/}


                    </View>
                    <View style={{marginTop: "10%"}}>

                    </View>
                </ScrollView>:<Loader/>}


            </View>


        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F2F2F2"

    },
    image: {
        resizeMode: 'cover',
        height: windowHeight * .75
        // justifyContent:
    },
    logo: {
        resizeMode: 'cover',
        alignSelf: 'center',
        marginBottom: '9%',
    },
    icon: {
        width: 20,
        height: 20,
        marginLeft: 5,
        marginRight: 5,
    },

    searchSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 35,
        margin: 10,
        borderRadius: 35,
        backgroundColor: '#3FB0F1',

        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.8,
        shadowRadius: 3,
        elevation: 15,
        // flex:1
    },
    input: {
        flex: 2,
        // paddingTop: 10,
        // paddingRight: 10,
        // paddingBottom: 10,
        // paddingLeft: 0,
        backgroundColor: '#fff',
        borderRadius: 35,
        paddingLeft: 15,
        // marginLeft: 50,
    },

    linearGradient: {
        // flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 35,
        margin: 15,
    },
    buttonText: {
        fontSize: 18,
        // fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
});

export default Profile
