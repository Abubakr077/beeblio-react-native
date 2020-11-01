import React from 'react'
import {Appbar, Avatar} from 'react-native-paper';
import {AsyncStorage, Image, Linking} from "react-native";
import {TouchableOpacity} from 'react-native-gesture-handler';
import * as NavigationService from "../../NavigationService";
import APIModel from "../../Models/APIModal";
import {connect} from "react-redux";
import * as actionsUsers from "../../Store/Actions/UserActions";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: ''
        }

        AsyncStorage.getItem('user_img').then((user) => {
            const imgObj = JSON.parse(user);
            this.setState({
                image: imgObj.fileLink
            })
        })
    }
    // static getDerivedStateFromProps(props, state) {
    //     if (props.userImage !== state.userImage) {
    //         return {
    //             userImage: props.userImage,
    //             image: props.userImage.fileLink
    //         };
    //     }
    //     return null;
    // }
    render() {
        const { navigation,previous} = this.props;
        return (
            <Appbar.Header style={{backgroundColor: 'white'}}>
                {previous ? (
                    <Appbar.BackAction
                        onPress={() => NavigationService.goBack()}
                    />
                ) : (<Appbar.Action icon="menu" onPress={()=>navigation.toggleDrawer()}/>
                )}
                <Appbar.Content style={{alignItems: 'center'}} title={
                    <TouchableOpacity
                        onPress={() => NavigationService.navigate('Profile')}
                    >
                    <Avatar.Image
                        size={40}
                        source={{
                            uri: this.state.image,
                        }}
                    />
                    </TouchableOpacity>
                }
                />
                <TouchableOpacity
                    onPress={() => NavigationService.navigate('MainLogin')}
                >
                    <Image
                        size={80}
                        source={require("./../../../assets/image/logoblue.png")}
                    />
                </TouchableOpacity>
            </Appbar.Header>
        )
    }
}

const mapStateToProps = state => {
    return {
        userImage: state.UserReducer.userImage,
    };
};

export default connect(
    null,
    null
)(Header);
