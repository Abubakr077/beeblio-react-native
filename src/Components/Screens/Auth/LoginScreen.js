import React from 'react';
import {
    StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, ImageBackground,
    TextInput
} from 'react-native';
import { Item, Input, Icon } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';

import InputField from '../../SeperateComponents/InputField'
import Input_field from '../../SeperateComponents/InputField'
class LoginScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        drawerIcon: ({ tintColor }) => (
            <Icon
                name="home"
                size={30}
                color='white'
            />
        )
    })
    constructor(props) {
        super(props);
        this.state = {
            email_address: 'j'
        };
    }

    _signIn = () => {
        //   alert(this.state.email_address);
    }
    navigatee = () => {
     this.props.navigation.navigate("RegisterScreen")

    }

    render() {
        return (

            <View style={styles.container}>
                <ImageBackground
                    source={require('./../../../../assets/image/signupbg.jpg')}
                    style={styles.image}>
                    <View style={{ flex: 0.8, justifyContent: 'flex-end' }}>
                        <Image source={require('./../../../../assets/image/logo.png')} style={styles.logo} />
                    </View>

                    <View style={{ flex: 0.3 }} />

                    <View style={{ flex: 2 }}>
                        <View style={styles.searchSection}>
                            <View style={{ flex: 0.3, alignItems: 'center' }}>
                                <Image
                                    source={require('./../../../../assets/image/email.png')}
                                    style={styles.icon}
                                />
                            </View>


                            <View style={{ flex: 2, }}>
                                <Input_field
                                    placeholder="Email Address"
                                    onChangeText={(email_address) => {
                                        this.setState({ email_address });
                                    }} />


                            </View>


                        </View>

                        <View style={styles.searchSection}>
                            <View style={{ flex: 0.3, alignItems: 'center' }}>
                                <Image
                                    source={require('./../../../../assets/image/password.png')}
                                    style={styles.icon}
                                />
                            </View>

                            <View style={{ flex: 2, }}>
                                <Input_field
                                    placeholder="Password"
                                    onChangeText={(email_address) => {
                                        this.setState({ email_address });
                                    }} />


                            </View>
                        </View>

                        <TouchableOpacity
                            onPress={this._signIn}
                            style={{ marginTop: 10 }}>
                            <LinearGradient
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                colors={['#256B9B', '#3FB0F1', '#256B9B']}
                                style={styles.linearGradient}>
                                <Text style={styles.buttonText}>LOGIN</Text>
                            </LinearGradient>
                        </TouchableOpacity>



                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <TouchableOpacity
                            onPress={this.navigatee}
                             >
                                <Text
                                    style={{ color: '#3FB0F1', fontWeight: 'bold', fontSize: 18 }}>
                                    Not Registered? Signup
                            </Text>
                            </TouchableOpacity>
                            <Text
                                style={{
                                    color: '#3FB0F1',
                                    marginLeft: 20,
                                    fontWeight: 'bold',
                                    fontSize: 18,
                                }}>
                                Forget Password?
                        </Text>
                        </View>

                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                marginTop: 20,
                            }}>
                            <Image
                                source={require('./../../../../assets/image/f.png')}
                                style={{
                                    width: 45,
                                    height: 45,
                                    marginLeft: 5,
                                    marginRight: 5,
                                }}
                            />

                            <Image
                                source={require('./../../../../assets/image/i.png')}
                                style={{
                                    width: 45,
                                    height: 45,
                                    marginLeft: 5,
                                    marginRight: 5,
                                }}
                            />

                            <Image
                                source={require('./../../../../assets/image/t.png')}
                                style={{
                                    width: 45,
                                    height: 45,
                                    marginLeft: 5,
                                    marginRight: 5,
                                }}
                            />

                            <Image
                                source={require('./../../../../assets/image/s.png')}
                                style={{
                                    width: 45,
                                    height: 45,
                                    marginLeft: 5,
                                    marginRight: 5,
                                }}
                            />
                        </View>

                        <Text
                            style={{
                                color: '#3FB0F1',
                                fontWeight: 'bold',
                                fontSize: 18,
                                alignSelf: 'center',
                                marginTop: 15,
                            }}>
                            Go Back
                    </Text>
                    </View>

                    <View style={{ flex: 0.5 }} />
                </ImageBackground>


            </View>


        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        // justifyContent:
    },
    logo: {
        resizeMode: 'cover',
        alignSelf: 'center',
        marginBottom: '9%',
    },
    icon:{
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
        shadowOffset: { width: 0, height: 1 },
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

export default LoginScreen
