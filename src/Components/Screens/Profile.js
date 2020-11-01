import React from 'react';
import {
    StyleSheet, Text, View, Image, ScrollView, ImageBackground,
    TextInput, Dimensions, AsyncStorage, Alert
} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Loader from '../SeperateComponents/Loader';
import moment from 'moment';
import { Avatar } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {connect} from "react-redux";
import * as actions from "../../Store/Actions/UserActions";
import APIModel from "../../Models/APIModal";
import Header from "../SeperateComponents/Header";


class Profile extends React.PureComponent {
    static navigationOptions = ({ navigation }) => ({
        header: (props) => <Header navigation={navigation}  previous={false}/>
    })
    constructor(props) {
        super(props);
        this.state = {
            email_address: 'j',
            user: null,
            userImage: null,
            isReady: false,
            email: '',
            firstName: '',
            lastName:'',
            password: '',
            image: '',
            selectedImage: undefined,
        };
        this.updateProfileInfo = this.updateProfileInfo.bind(this);
        this.uploadPhoto = this.uploadPhoto.bind(this);
    }
    static getDerivedStateFromProps(props, state) {
        if (props.userImage !== state.userImage) {
            return {
                userImage: props.userImage,
                image:  props.userImage.fileLink
            };
        }
        if (props.user !== state.user) {
            return {
                user: props.user,
                firstName: props.user.apiUserProfile.firstName,
                lastName: props.user.apiUserProfile.lastName,
                email: props.user.email,
                isReady: true
            };
        }
        return null;
    }
    componentDidMount() {
        const {user,userImage} = this.state;
        if (user){
            this.setState({
                firstName: user.apiUserProfile.firstName,
                lastName: user.apiUserProfile.lastName,
                email: user.email,
                isReady: true
            })
        }
        if (userImage){
            this.setState({
                image: userImage.fileLink,
                isReady: true
            })
        }
    }

    updateProfileInfo() {
        const {updateProfile} = this.props;
        const { firstName,lastName,email} = this.state;

        this.setState({isReady: false});
        updateProfile({
            onError: (error) => {
                this.setState({isReady: true});
                Alert.alert(
                    'Error',
                    error
                    ,[
                        {text: 'Okay'}
                    ]
                );
            },
            onSuccess: () => {
                Alert.alert(
                    'Success',
                    'Profile updated successfully'
                    ,[
                        {text: 'Okay'}
                    ]
                );
                this.setState({isReady: true});
            },data:{
                firstName,
                lastName,
                email
            }
        });
    }

    uploadPhoto() {
        const {updateUserPicture} = this.props;
        const {selectedImage} = this.state;
        this.setState({isReady: false});
        updateUserPicture({
            onError: (error) => {
                this.setState({isReady: true});
                alert(error)
                Alert.alert(
                    'Error',
                    error
                    ,[
                        {text: 'Okay'}
                    ]
                );
            },
            onSuccess: () => {
                this.setState({isReady: true,image: selectedImage});
                Alert.alert(
                    'Success',
                    'Photo updated successfully'
                    ,[
                        {text: 'Okay'}
                    ]
                );
            },selectedImage
        });
    }
    async takeAndUploadPhotoAsync() {
        // Display the camera to the user and wait for them to take a photo or to cancel
        // the action
        let result = await ImagePicker.launchImageLibraryAsync();

        if (result.cancelled) {
            return;
        }

        // ImagePicker saves the taken photo to disk and returns a local URI to it
        let localUri = result.uri;
        let filename = localUri.split('/').pop();

        // Infer the type of the image
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;

        // Upload the image using the fetch and FormData APIs
        let formData = new FormData();
        // Assume "photo" is the name of the form field the server expects
        formData.append('file', { uri: localUri, filename: filename, type:'"multipart/form-data",' });
        const token = await AsyncStorage.getItem('user')
        console.log(formData);
        this.setState({
            isReady: false
        })
        await fetch(`${APIModel.HOST}/user/image`, {
            method: 'POST',
            body: formData,
            headers: {
                'content-type': 'multipart/form-data',
                'authorization': token,
            },
        }).then(response => response.json())
            .then(json => {
                console.log(json);
                this.setState({
                    isReady: true
                })
                // if (json.error){
                //     alert('error')
                // }else {
                //     alert('success')
                // }
            });
    }
    openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

        if (permissionResult.granted === false) {
            Alert.alert(
                'Permission',
                'Permission to access camera roll is required!'
                ,[
                    {text: 'Okay'}
                ]
            );
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        if (pickerResult.cancelled === true) {
            return;
        }
        this.setState({
            selectedImage: pickerResult.uri
        },()=>this.uploadPhoto())
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


                                    <TouchableOpacity onPress={this.openImagePickerAsync} style={styles.button}>
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
                        <View style={{flexDirection: "row", flex: 1, marginBottom: 50}}>
                        <TouchableOpacity
                            style={{marginTop: 10}}
                            onPress={this.updateProfileInfo}
                        >
                            <LinearGradient
                                start={{x: 0, y: 0}}
                                end={{x: 1, y: 0}}
                                colors={['#256B9B', '#3FB0F1', '#3FB0F1']}
                                style={styles.linearGradient1}>
                                <Text style={styles.buttonText}>UPDATE</Text>
                            </LinearGradient>
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
        fontSize: 18,
        // fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
});

const mapStateToProps = state => {
    return {
        dictionaries: state.DictionaryReducer.dictionaries,
        user: state.UserReducer.user,
        userImage: state.UserReducer.userImage,
    };
};

export default connect(
    mapStateToProps,
    {
        updateUserPicture: actions.updateUserPicture,
        updateProfile: actions.updateProfile,
    },
)(Profile);
