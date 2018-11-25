import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import ToDoList from './ToDoList';

export default class App extends React.Component {
  render() {
    return (
        <ScrollView><ToDoList /></ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});