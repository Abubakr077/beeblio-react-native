import {Icon} from 'native-base';
import {connect} from "react-redux";
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ImageBackground,
    TextInput,
    ScrollView

} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import InputField from '../../SeperateComponents/InputField'
import * as actions from '../../../Store/Actions/AuthActions';
import * as NavigationService from '../../../NavigationService';

class RegisterScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
        drawerIcon: ({tintColor}) => (
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
            confirmPassword: '',
            email: '',
            firstName: '',
            password: '',
            screenName: '',
            confirmPasswordError: '',
            emailError: '',
            firstNameError: '',
            passwordError: '',
            screenNameError: '',
        };
    }

    moveToLogin = () => {
        NavigationService.navigateAndResetStack('LoginScreen');
    };
    toggleSubmitting = () => {
        const {submitting} = this.state;
        this.setState({
            submitting: !submitting,
        });
    };
    handleSignup = () => {
        this.setState({
            confirmPasswordError: '',
            emailError: '',
            firstNameError: '',
            passwordError: '',
            screenNameError: ''
        });
        const {register} = this.props;

        const {firstName, email, password, confirmPassword, screenName} = this.state;

        if (firstName.length < 5 || firstName.length > 50) {
            console.log('Name must be greater than 5 and less than 50.');
            return this.setState({
                firstNameError: "Name must be greater than 5 and less than 50."
            });
        }

        if (screenName.length < 5 || screenName.length > 50) {
            return this.setState({
                screenNameError: "Screen Name must be greater than 5 and less than 50."
            });
        }

        if (!email) {
            return this.setState({
                emailError: "Email is required."
            });
        }

        if (password.length < 6 || password.length > 50) {
            return this.setState({
                passwordError: "Password must be greater than 6 and less than 50."
            });
        }

        if (password !== confirmPassword) {
            return this.setState({
                confirmPasswordError: "Please type same password in both fields."
            });
        }
        this.toggleSubmitting();
        register({
            data: {email, screenName, password, firstName},
            onSuccess: (response) => {
                alert(response);
                this.moveToLogin();
            },
            onError: message => {
                alert(message);
                this.toggleSubmitting();
            }
        });

    }

    render() {

        const {
            confirmPassword,
            email,
            firstName,
            password,
            screenName,
            submitting,
            confirmPasswordError,
            emailError,
            firstNameError,
            passwordError,
            screenNameError,
        } = this.state;

        return (
            <View style={styles.container}>

                <ImageBackground
                    source={require('./../../../../assets/image/signupbg.jpg')}

                    style={styles.image}>

                    <View style={{flex: .65, justifyContent: "flex-end"}}>

                        <Image
                            source={require('./../../../../assets/image/logo.png')}
                            style={styles.logo}>
                        </Image>
                    </View>
                    <View style={{flex: .3}}></View>
                    <View style={{flex: 2,marginBottom: 15}}>
                        <ScrollView
                            style={{height:'100%', width:'100%'}}
                        >
                            <View style={styles.searchSection}>
                                <View style={{flex: .3, alignItems: "center"}}>
                                    <Image source={require('./../../../../assets/image/user_input.png')}
                                           style={styles.TextInput_img}>
                                    </Image>
                                </View>
                                <View style={{flex: 2}}>
                                    <InputField
                                        placeholder="First Name"
                                        onChangeText={firstName => this.setState({firstName})}
                                    />
                                </View>
                            </View>
                            <Text style={styles.errorMessage}>{this.state.firstNameError}</Text>



                            <View style={styles.searchSection1}>
                                <View style={{flex: .3, alignItems: "center"}}>
                                    <Image source={require('./../../../../assets/image/user_input.png')}
                                           style={styles.TextInput_img}>
                                    </Image>
                                </View>
                                <View style={{flex: 2}}>
                                    <InputField
                                        placeholder="Screen Name"
                                        onChangeText={screenName => this.setState({screenName})}
                                    />
                                </View>
                            </View>

                            <Text style={styles.errorMessage}>{this.state.screenNameError}</Text>

                            <View style={styles.searchSection1}>
                                <View style={{flex: .3, alignItems: "center"}}>
                                    <Image source={require('./../../../../assets/image/email.png')}
                                           style={styles.TextInput_img}>

                                    </Image>
                                </View>

                                <View style={{flex: 2}}>
                                    <InputField
                                        placeholder="Email"
                                        onChangeText={email => this.setState({email})}
                                    />
                                </View>


                            </View>
                            <Text style={styles.errorMessage}>{this.state.emailError}</Text>


                            <View style={styles.searchSection1}>

                                <View style={{flex: .3, alignItems: "center"}}>

                                    <Image source={require('./../../../../assets/image/password.png')}
                                           style={styles.TextInput_img}>

                                    </Image>
                                </View>
                                <View style={{flex: 2}}>
                                    <InputField
                                        placeholder="Password"
                                        onChangeText={password => this.setState({password})}
                                    />
                                </View>


                            </View>
                            <Text style={styles.errorMessage}>{this.state.passwordError}</Text>


                            <View style={styles.searchSection1}>

                                <View style={{flex: .3, alignItems: "center"}}>

                                    <Image source={require('./../../../../assets/image/password.png')}
                                           style={styles.TextInput_img}>
                                    </Image>
                                </View>


                                <View style={{flex: 2}}>
                                    <InputField
                                        placeholder="Confirm Password"
                                        onChangeText={confirmPassword => this.setState({confirmPassword})}
                                    />
                                </View>


                            </View>
                            <Text style={styles.errorMessage}>{this.state.confirmPasswordError}</Text>

                            <TouchableOpacity
                                disabled={submitting}
                                onPress={this.handleSignup}
                                style={{marginTop: 10}}
                            >
                                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                                                colors={submitting ? ['#666666', '#666666'] : ['#256B9B', '#3FB0F1', '#256B9B']}
                                                style={styles.linearGradient}>
                                    <Text style={styles.buttonText}>
                                        {submitting ? 'Please wait...' : 'REGISTER'}
                                    </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                            <View style={{flexDirection: "row", marginLeft: 20}}>
                                <TouchableOpacity
                                    onPress={this.moveToLogin}
                                >
                                    <Text style={{color: "#3FB0F1", fontWeight: "bold", fontSize: 18}}>Already
                                        Registered? Login</Text>

                                </TouchableOpacity>
                            </View>
                            <View style={{flexDirection: "row", justifyContent: "center", marginTop: 20}}>

                                <Image source={require('./../../../../assets/image/social/g.png')}

                                       style={styles.social_img}>

                                </Image>

                                <Image
                                    source={require('./../../../../assets/image/social/f.png')}

                                    style={styles.social_img}>

                                </Image>

                                <Image
                                    source={require('./../../../../assets/image/social/a.png')}

                                    style={styles.social_img}>
                                </Image>
                                <Image
                                    source={require('./../../../../assets/image/social/t.png')}
                                    style={styles.social_img}>
                                </Image>
                            </View>
                            <Text style={styles.back}>Go Back</Text>
                        </ScrollView>
                    </View>
                    <View style={{flex: .1}}/>
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
        resizeMode: "cover",

    },
    logo: {
        resizeMode: "cover",
        alignSelf: "center",
        marginBottom: "12%"
    },
    searchSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 35,
        backgroundColor: "#3FB0F1",
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.8,
        shadowRadius: 3,
        elevation: 15
    },
    searchSection1: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 35,
        backgroundColor: "#3FB0F1",
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.8,
        shadowRadius: 3,
        elevation: 15
        // flex:1
    },
    input: {
        flex: 2,
        backgroundColor: "white",
        borderRadius: 35,
        paddingLeft: 15,
    },

    linearGradient: {
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 35,
        margin: 15,
    },
    buttonText: {
        fontSize: 18,
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
    TextInput_img: {
        width: 20, height: 20, marginLeft: 5, marginRight: 5
    },
    social_img: {
        width: 45, height: 45, marginLeft: 5, marginRight: 5
    },
    back: {
        color: "#3FB0F1", fontWeight: "bold", fontSize: 18, alignSelf: "center", marginTop: 15
    },
    errorMessage: {
        fontSize: 12,
        color: 'red',
        textAlign: 'center',
        paddingLeft: 20,
    }
});

export default connect(
    null,
    {
        register: actions.register,
    }
)(RegisterScreen);
