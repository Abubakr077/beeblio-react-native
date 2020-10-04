import React from 'react'
import Spinner from '../../../assets/spinner.svg';
import {View, Image} from "react-native";

const Loader = () => {
    return (
        <View style={{
            // position: 'fixed',
            // top: 0,
            // left: 0,
            // right: 0,
            // bottom: 0,
            // minHeight: '100vh',
            width: 20,
            height: 20,
            // display: 'flex;',
            // flexDirection: 'column',
            // justifyContent: 'center',
            // alignItems: 'center',
            // zIndex: '100000',
            // background: rgba($color: #fff, $alpha: .8);
        }}>
            <Image source={Spinner} alt="spinner"/>
        </View>
    )
}

export default Loader
