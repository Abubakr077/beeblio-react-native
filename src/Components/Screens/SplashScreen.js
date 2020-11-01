import React from 'react';

import { connect } from "react-redux";

import {StyleSheet, Text, View, Image, AsyncStorage} from 'react-native';
import * as actions from '../../Store/Actions/AuthActions';
import * as NavigationService from '../../NavigationService'

class SplashScreen extends React.PureComponent {


  componentDidMount(){

    AsyncStorage.getItem('initial', (err, result) => {
      if (result){
        const { syncWithAsyncStorage } = this.props;

        syncWithAsyncStorage({
          onSuccess: ({user, skiped}) => {
            if(user !== undefined){
              let screen = (user || skiped === 'true') ? "HomeScreen" : "MainLogin";
              setTimeout(() => {
                NavigationService.navigate(screen);
              }, 1000);
            }
          }
        });
      } else {
        NavigationService.navigate('InitialScreen');
      }
    });

  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('./../../../assets/image/logobig.png')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

});

const mapStateToProps = state => {
  return {
    user: state.AuthReducer.user,
    skiped: state.AuthReducer.skiped,
  };
};

export default connect(
  mapStateToProps,
    { syncWithAsyncStorage: actions.syncWithAsyncStorage }
)(SplashScreen);
