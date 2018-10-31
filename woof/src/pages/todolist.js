import React from 'react';
import { Platform, TextInput, Dimensions, ImageBackground, StatusBar, StyleSheet, Text, View } from 'react-native';

import bkgimage from '../images/pgradientbkg.png';

const { heigh, width } = Dimensions.get('window');

export default class todolist extends React.Component {

  constructor(){
    super();
    state = {
      newTodoItem: ''
    };
  }

  newTodoItemController = textValue => {
    this.setState({
      newTodoItem: textValue
    });
  };

  render() {
    return (
      <ImageBackground source={bkgimage} style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.appTitle}>Minimalist Todo App</Text>
        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder={'Add an item!'}
            value={this.newTodoItem}
            onChangeText={this.newTodoItemController}
            placeholderTextColor={'#999'}
            returnKeyType={'done'}
            autoCorrect={false}
          />
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f23657',
    alignItems: 'center',
    //justifyContent: 'center'
  },
  appTitle: {
    color: '#fff',
    fontSize: 36,
    marginTop: 60,
    marginBottom: 30,
    fontWeight: '300'
  },
  card: {
    backgroundColor: '#fff',
    flex: 1,
    width: width - 25,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: 'rgb(50,50,50)',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          height: -1,
          width: 0
        }
      },
      android: {
        elevation: 5
      }
    })
  },
  input: {
    padding: 20,
    borderBottomColor: '#bbb',
    borderBottomWidth: 1,
    fontSize: 24
  },
});