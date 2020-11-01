import React from 'react';
import {
    StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, ImageBackground,
    TextInput, Alert
} from 'react-native';
import { Item, Input, Icon } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import * as NavigationService from '../../../NavigationService';
import InputField from '../../SeperateComponents/InputField'
import {connect} from "react-redux";
import * as actions from "../../../Store/Actions/AuthActions";
class ForgotPassword extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password:''
        };
    }

    moveToLogin = () => {
        this.props.navigation.navigate("LoginScreen");
    };
    moveBack=()=>{
        this.props.navigation.goBack();
    }
    toggleSubmitting = () => {
        const {submitting} = this.state;
        this.setState({
            submitting: !submitting,
        });
    };
    forgotPassword = () => {
        const { forgotPassword } = this.props;

        const { email } = this.state;
        if (!email) {
             Alert.alert(
                'Error',
                 'Email is required.'
                ,[
                    {text: 'Okay'}
                ]
            );
            return
        }

        this.toggleSubmitting();

        forgotPassword({
            data: { email},
            onSuccess: (response) => {
                Alert.alert(
                    'Success',
                    response
                    ,[
                        {text: 'Okay'}
                    ]
                );
                this.moveToHome();
            },
            onError: (message) => {
                Alert.alert(
                    'Error',
                    message
                    ,[
                        {text: 'Okay'}
                    ]
                );
                this.toggleSubmitting();
            }
        });
    }

    render() {
        const {
            submitting
        } = this.state;

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
                                <InputField
                                    placeholder="Email Address"
                                    onChangeText={(email) => {
                                        this.setState({ email });
                                    }} />
                            </View>


                        </View>

                        <TouchableOpacity
                            disabled={submitting}
                            onPress={this.forgotPassword}
                            style={{ marginTop: 10 }}>
                            <LinearGradient
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                colors={submitting ? ['#666666', '#666666'] : ['#256B9B', '#3FB0F1', '#256B9B']}
                                style={styles.linearGradient}>
                                <Text style={styles.buttonText}>
                                    {submitting ? 'Please wait...' : 'RESET PASSWORD'}
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>



                        <TouchableOpacity
                            onPress={ ()=>this.moveBack()}
                        >
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
                        </TouchableOpacity>
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

export default connect(
    null,
    {
        forgotPassword: actions.forgotPassword
    }
)(ForgotPassword);
