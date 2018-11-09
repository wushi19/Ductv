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

import bgImage from '../images/bki.jpg'
import logo from '../images/logo.png'


const { width: WIDTH } = Dimensions.get('window');

export default class startPage extends React.Component {

    constructor(){
        super();

        this.state = {
          email: ""
        }
    }

    login() {
		Actions.login()
    }

    signUp() {
        Actions.signUp()
    }

    render() {
        return (
            <ImageBackground source={bgImage} style={styles.backgroundContainer}>


                <View style={styles.logoContainer}>
                    <Image source={logo} style={styles.logo} />
                    <Text style={styles.logoText}>Ducktv To-Do</Text>
                </View>

                <TouchableOpacity
                    style={styles.btnLogin}
                    onPress={this.login}
                >
                <Text style = {styles.btnLoginText}> Log in </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={this.signUp}>
                    <Text style={styles.signupButton} >
                        Don't have an account? {' '}
                        <Text style = {{fontWeight: 'bold'}}>
                            Sign up here
                        </Text>
                    </Text>
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
    btnLogin: {
        width: WIDTH - 55,
        height: 60,
        borderRadius: 45,
        justifyContent: 'center',
        marginTop: 200,
        backgroundColor: 'rgba(247, 172, 24, 1)'
    },

    btnLoginText: {
        textAlign: 'center',
        fontFamily: 'Montserrat-Light',
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
        marginTop: 100,
        width: 200,
        height: 200,
    },
    logoText: {
        fontFamily: 'Montserrat-Black',
        color: 'black',
        fontSize: 30,
        justifyContent: 'center',
        fontWeight: 'bold',
        marginTop: 50,
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
        marginTop: 10,
    },
    signupButton:{
        fontFamily: 'Montserrat-Light',
        color: 'black',
        fontSize: 14,
        fontWeight: '500',
        alignItems: 'center',
        paddingVertical: 16,
    },

});
