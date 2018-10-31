import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
        <View style={styles.container}>
          <StatusBar barStyle="light-content" />
        </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#DDA0DD',
      alignItems: 'center',
      justifyContent: 'center'
    }
});