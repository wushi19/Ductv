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
import {Actions} from 'react-native-router-flux';

import bgImage from '../images/bki.jpg'
import logo from '../images/logo.png'


const { width: WIDTH } = Dimensions.get('window');

export default class Login extends React.Component {

    constructor(){
        super();
    
        this.state = {
          username: "",
          password: "",
        }
    }

    signUp() {
		Actions.signUp()
    }
    home() { 
        Actions.home()
    }

    render() {
        return (
            <ImageBackground source={bgImage} style={styles.backgroundContainer}>
                <View style={styles.logoContainer}>
                    <Image source={logo} style={styles.logo} />
                    <Text style={styles.logoText}>Duck</Text>
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder={'Username'}
                        placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
                        underLineColorAndroid='transparent'
                        onChangeText={(username) => this.setState({username})}
                        value={this.state.username}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder={'Password'}
                        secureTextEntry={true}
                        placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
                        underLineColorAndroid='transparent'
                        onChangeText={(password) => this.setState({password})}
                        value={this.state.password}
                    />
                </View>

                <TouchableOpacity style={styles.btnLogin}>
                    <Button
                    color= 'rgba(255, 255, 255, 0.7)'
                    title= "Login"
                    fontSize = '16'
                    //onPress={this.userLogin.bind(this)}
                    onPress={this.home}
                    />
                </TouchableOpacity>

                <View>
                    <TouchableOpacity onPress={this.signUp}>
                        <Text style={styles.signupButton} >
                            Sign Up
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
        width: WIDTH - 55,
        height: 45,
        borderRadius: 45,
        justifyContent: 'center',
        marginTop: 20,
        backgroundColor: 'rgba(0,0,0,0.60)'
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
    signupButton:{
        color: '#ffffff',
        fontSize: 14,
        fontWeight: '500',
        alignItems: 'center',
        paddingVertical: 16,
    },

});
