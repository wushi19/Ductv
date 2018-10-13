/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ImageBackground, Image, Dimensions, TextInput, TouchableOpacity} from 'react-native';

const {width: WIDTH} = Dimensions.get('window')
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
import bgImage from './images/bki.jpg'
import logo from './images/logo.png'

export default class App extends Component<Props> {
  render() {
    return (
      <ImageBackground source={bgImage} style={styles.backgroundContainer}>
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo}/>
          <Text style={styles.logoText}>Duck</Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput 
            style = {styles.input}
            placeholder={'Username'}
            placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
            underLineColorAndroid='transparent'
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput 
            style = {styles.input}
            placeholder={'Password'}
            secureTextEntry={true}
            placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
            underLineColorAndroid='transparent'
          />
        </View>

        <TouchableOpacity style={styles.btnLogin}>
          <Text style={styles.text}>Login</Text>
        </TouchableOpacity>

      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    width: null,
    height: null,  
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnLogin:{
    width: WIDTH - 55,
    height: 45,
    borderRadius: 45,
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,

  },
  logo: {
    width: 120,
    height: 120,
  },
  logoText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
    marginTop: 10,
    opacity: 0.5,
  },
  input: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 45,
    fontSize: 16,
    paddingLeft: 45,
    backgroundColor: 'rgba(0,0,0,0.35)',
    color: 'rgba(255, 255, 255, 0.7)',
    marginHorizontal: 25,
  },
  inputContainer: {
    marginTop: 10,
  },
  text: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 16,
    textAlign: 'center',
  }

});
