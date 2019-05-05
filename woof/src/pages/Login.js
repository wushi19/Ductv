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
    StatusBar,
} from 'react-native';
import {Actions} from 'react-native-router-flux';

import bgImage from '../images/loginbkg.jpg'
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
      // const { email } = this.state;
      // response = fetch('http://durian-django-env.nihngkspzc.us-east-1.elasticbeanstalk.com/user/')
      //   .then(function(response) {
      //     return response.json()
      //   })
      //   .then(function(myJson){
      //     users =JSON.stringify(myJson);
      //     users = JSON.parse(users);
      //     loggedInUser = null;
      //     for(var i = 0; i<users.length;i++){
      //       if (users[i].email == email){
      //         loggedInUser = users[i];
      //       }
      //     }
      //     //Alert.alert()
      //     if (loggedInUser != null){
      //       try {
      //         loggedInUser = JSON.stringify(loggedInUser);
      //         answer = AsyncStorage.setItem('user', loggedInUser);
      //         Actions.userhome();
      //       } catch (error) {
      //         Alert.alert("oh shit waddup");
      //       }
      //     } else { Alert.alert("Invalid Email")}
      // });
        Actions.userhome();
    };

    goHome(){
      fetch('http://durian-django-env.nihngkspzc.us-east-1.elasticbeanstalk.com/user/3/')
        .then(function(response) {
          return response.json()
        })
        .then(function(myJson){
          var user = JSON.stringify(myJson);
          try {
            answer = AsyncStorage.setItem('user', user);
            Actions.userhome();
          } catch (error) {
            Alert.alert("Error");
          }
          //Alert.alert(user);
          //usr = JSON.parse(usr);
      });
    }

    render() {
        return (
            <ImageBackground source={bgImage} style={styles.backgroundContainer}>
                <StatusBar barStyle="light-content"/>

                <View style={styles.logoContainer}>
                    <Image source={logo} style={styles.logo} />
                    <Text style={styles.logoText}>Ducktive</Text>
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
                        marginBottom={10}
                        fontFamily= 'Montserrat-ExtraLight'
                    />
                    <TextInput
                        style={styles.input}
                        placeholder={'Password'}
                        secureTextEntry={true}
                        placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
                        autoCapitalize = 'none'
                        underLineColorAndroid='transparent'
                        onChangeText={(password) => this.setState({ password })}
                        value={this.state.password}
                        fontFamily= 'Montserrat-ExtraLight'
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
        backgroundColor: '#413a5d',
        opacity: 0.8,
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
        fontWeight: '500',
        marginTop: 10,
        // opacity: ,
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
