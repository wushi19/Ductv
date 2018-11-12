// this page is going to be worked on by bryan and yibo
import React, {Component} from 'react';
import {
  StyleSheet, 
  Text, 
  View,
  AsyncStorage,
} from 'react-native';
import {Actions} from 'react-native-router-flux';

export default class Validate extends React.Component {
  render() {
    return (
      <View style={styles.container}>

      </View>
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
