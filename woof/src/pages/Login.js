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
    Alert,
} from 'react-native';
import {Actions} from 'react-native-router-flux';

import bgImage from '../images/background2.jpg'
import logo from '../images/logo.png'


const { width: WIDTH } = Dimensions.get('window');

export default class Login extends React.Component {

    constructor(){
        super();

        this.state = {
          email: ""
        }
    }

    signUp() {
		Actions.signUp()
    }

    validHome = () => {
      const { email } = this.state;
      response = fetch('http://durian-django-env.nihngkspzc.us-east-1.elasticbeanstalk.com/user/')
        .then(function(response) {
          return response.json()
        })
        .then(function(myJson){
          users =JSON.stringify(myJson);
          users = JSON.parse(users);
          loggedInUser = null;
          for(var i = 0; i<users.length;i++){
            if (users[i].email == email){
              loggedInUser = users[i];
            }
          }
          //Alert.alert()
          if (loggedInUser != null){
            Actions.home()
          } else { Alert.alert("Invalid Email")}
      });
    }

    render() {
        return (
            <ImageBackground source={bgImage} style={styles.backgroundContainer}>
                <View style={styles.logoContainer}>
                    {/*<Image source={logo} style={styles.logo} />*/}
                    <Text style={styles.logoText}>Log In</Text>
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder={'Email'}
                        // secureTextEntry={true}
                        placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
                        autoCapitalize = 'none'
                        underLineColorAndroid='transparent'
                        onChangeText={(email) => this.setState({ email })}
                        value={this.state.email}
                    />
                </View>

                <TouchableOpacity
                    onPress={this.validHome}
                    style={styles.btnLogin}
                >
                <Text style = {styles.btnLoginText}> Log in </Text>
                </TouchableOpacity>

                <View>
                    <TouchableOpacity onPress={this.signUp}>
                        <Text style={styles.signupButton} >
                            First time here? {' '}
                            <Text style = {{fontWeight: 'bold'}}>
                                Sign up.
                            </Text>
                        </Text>
                    </TouchableOpacity>
                </View>

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
    btnLogin: {
        width: WIDTH - 70,
        height: 60,
        borderRadius: 45,
        justifyContent: 'center',
        marginTop: 160,
        backgroundColor: 'rgba(33, 36, 44, 1)'
    },

    btnLoginText: {
        textAlign: 'center',
        fontFamily: 'Montserrat-ExtraLight',
        color: 'white',
        fontSize: 20,
        justifyContent: 'center',
        fontWeight: 'bold',
        opacity: 1,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 60,
    },
    logo: {
        width: 120,
        height: 120,
    },
    logoText: {
        fontFamily: 'Montserrat-ExtraLight',
        color: 'white',
        fontSize: 40,
        justifyContent: 'center',
        fontWeight: 'bold',
        marginTop: 10,
        opacity: 1,
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
        marginTop: 50,
    },
    signupButton:{
        fontFamily: 'Montserrat-ExtraLight',
        color: 'white',
        fontSize: 14,
        fontWeight: '500',
        alignItems: 'center',
        paddingVertical: 16,
    },

});
