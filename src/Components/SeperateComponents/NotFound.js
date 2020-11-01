import React from 'react'
import Spinner from '../../../assets/spinner.svg';
import {View,Text} from "react-native";
import Image from 'react-native-remote-svg'
const NotFound = () => {
    return (
        <View style={{
            width: '100%',
            height: '100%',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            {/*<Spinner width={120} height={40}/>*/}
            <Text
                style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: "#4976b8",
                    textAlign: "left",
                    marginHorizontal: 20,
                    marginTop: 20
                }}
            >Not Found...</Text>
        </View>
    )
}

export default NotFound
