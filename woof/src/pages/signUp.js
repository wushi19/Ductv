/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Button,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import bgImage from '../images/homebkg.jpg'
import logo from '../images/homelogo.png'

const { width: WIDTH } = Dimensions.get('window');


export default class signUp extends React.Component {

  constructor() {
    super();

    this.state = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      errors: [],
    }
  }

  async handleSubmit() {

    async function getMoviesFromApi() {
      try {
        let response = await fetch(
          'http://durian-django-env.nihngkspzc.us-east-1.elasticbeanstalk.com/user/?format=api'
        );
        let responseJson = await response.json();
        return responseJson.users;
      } catch (error) {
        console.error(error);
      }
    }
    // try{

    //   let response = await fetch('http://durian-django-env.nihngkspzc.us-east-1.elasticbeanstalk.com/user/?format=api', {
    //     method: 'POST',
    //     headers: {
    //       Accept: 'application/json',
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //       user: {
    //         username: this.state.username,
    //         email: this.state.email,

    //         // password: this.state.password,
    //         // password_confirmation: this.state.password_confirmation,

    //       }
    //     })
    //   });

    //   let res = await response.text();
    //   console.log();

    // } catch(errors){

    // }

    // const { username, email, password, confirmPassword } = this.state;
    // // perform all neccassary validations
    // if (username == '' || password == '' || email == '') {
    //   alert("Username and Password cannot be empty")
    // }
    // else {
    //   if (password !== confirmPassword) {
    //     alert("Password don't match")
    //   } else {
    //       Actions.home()
    //   }
    // }
  }

  render() {
    return (
      <ImageBackground source={bgImage} style={styles.backgroundContainer}>

        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo} />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={'Username'}
            placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
            underLineColorAndroid='transparent'
            onChangeText={(val) => this.setState({username: val})}
            value={this.state.username}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={'Email address'}
            placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
            underLineColorAndroid='transparent'
            onChangeText={(val) => this.setState({email: val})}
            value={this.state.email}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={'Password'}
            secureTextEntry={true}
            placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
            underLineColorAndroid='transparent'
            onChangeText={(val) => this.setState({password: val })}
            value={this.state.password}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={'Confirm Password'}
            secureTextEntry={true}
            placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
            underLineColorAndroid='transparent'
            onChangeText={(val) => this.setState({confirmPassword: val })}
            value={this.state.confirmPassword}
          />
        </View>

        <TouchableOpacity style={styles.btnLogin}>
          <Button
            color='rgba(255, 255, 255, 0.7)'
            title="Sign me up!"
            fontSize='16'
            //onPress={this.userLogin.bind(this)}
            onPress={this.handleSubmit.bind(this)}
          />
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
  input: {
    width: WIDTH - 55, //padding on right
    height: 45, //height of text box
    borderRadius: 45,
    fontSize: 16,
    paddingLeft: 45, //text padding on left
    backgroundColor: 'rgba(0,0,0,0.35)',
    color: 'rgba(255, 255, 255, 0.7)',
    marginHorizontal: 25, //padding on left
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
    color: 'black',
    fontSize: 20,
    fontWeight: '500',
    marginTop: 10,
    opacity: 0.5,
  },
  inputContainer: {
    marginTop: 10,
  },
  btnLogin: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 45,
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: 'rgba(0,0,0,0.75)'
  },
});
