import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default class App extends React.Component {
  render() {
    return (
        <LinearGradient style={styles.container} colors={['#DA4453', '#89216B']}>
          <StatusBar barStyle="light-content" />
          <Text>Open up App.js to start working on your app!</Text>
        </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#9C559C',
      alignItems: 'center',
      justifyContent: 'center'
    }
});