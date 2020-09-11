import React, { Component } from "react";
import { View, StyleSheet, Image ,TextInput} from "react-native";
import { Text} from "native-base";



export default class InputField extends Component {
    render() {

        const backgroundColor = this.props.backgroundColor
            ? this.props.backgroundColor
            : "#fff";
        const borderRadius = this.props.borderRadius
            ? this.props.borderRadius
            : 35;
        const paddingLeft = this.props.paddingLeft
            ? this.props.paddingLeft
            : 15;
        const height = this.props.height
            ? this.props.height
            : 50;
        const  fontSize = this.props. fontSize
            ? this.props. fontSize
            : 16;
        const style = [
            {  paddingLeft: paddingLeft, borderRadius: borderRadius, height: height,  fontSize: fontSize },
            { backgroundColor: backgroundColor },
            // { borderBottomLeftRadius: borderBottomLeftRadius },
            this.props.style || {}
        ];
        const allProps = Object.assign({}, this.props, { style: style });
        const {  placeholder,round_corner,errorMessage} = this.props;
        return (
            <View>
                <TextInput
                    {...allProps}
                    placeholder={placeholder}
                />
                {(() => {
                    if (errorMessage) {
                        return (
                            <View style={{ width: '100%' }}>
                                <Text style={styles.errorMessage}>{errorMessage}</Text>
                            </View>
                        )
                    }
                })()}
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    message_btn: {
        height: 21,
        width: 21,
    },
    errorMessage: {
        fontSize: 12,
        color: 'red',
        textAlign: 'left',
        paddingLeft: 20,
        marginTop: '2%'
    }
});
