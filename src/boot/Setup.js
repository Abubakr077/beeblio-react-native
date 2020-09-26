import * as Expo from "expo";
import React, { Component } from "react";
import { StyleProvider } from "native-base";
import { Provider } from "react-redux";
import store from "../Store";

import * as Font from 'expo-font'
import App from "../App";
import getTheme from "../theme/components";
import variables from "../theme/variables/commonColor";

export default class Setup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isReady: false
        };
    }
    componentWillMount() {
        this.loadFonts();
    }
    async loadFonts() {
        await Font.loadAsync({
            Roboto: require("../../node_modules/native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("../../node_modules/native-base/Fonts/Roboto_medium.ttf"),
            // Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
        });
        this.setState({ isReady: true });
    }
    render() {

        if (!this.state.isReady) {
            return <Expo.AppLoading />;
        }

        return (
            <Provider store={store}>
                <StyleProvider style={getTheme(variables)}>
                    <App />
                </StyleProvider>
            </Provider>
        );
    }
}
