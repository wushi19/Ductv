/**
 * 
 */

import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import Router from './src/Router';
import {AppRegistry} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

AppRegistry.registerComponent('woof', () => App);

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
  }

  componentDidMount() {
    SplashScreen.hide()
  }

  render() {
      return (
        <Router />
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
});
