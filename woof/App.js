/**
 * 
 */

import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import Router from './src/Router';
import {AppRegistry} from 'react-native';

AppRegistry.registerComponent('woof', () => App);

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
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
