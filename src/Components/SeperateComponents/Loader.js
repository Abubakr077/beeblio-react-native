import React from 'react'
import Spinner from '../../../assets/spinner.svg';
import {View,Text} from "react-native";
import Image from 'react-native-remote-svg'
const Loader = () => {
    return (
        <View style={{
            width: '100%',
            height: '100%',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            {/*<Spinner width={120} height={40}/>*/}
            {/*<Text >Loading...</Text>*/}
            <Image
                style={{
                    width: 50,
                    height: 50,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                source={Spinner} alt="spinner"/>
        </View>
    )
}

export default Loader
