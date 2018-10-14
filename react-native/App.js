

import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import Router from './src/Router';

type Props = {};
export default class App extends Component<Props> {
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
