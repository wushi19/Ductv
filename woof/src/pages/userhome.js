/**

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
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import bgImage from '../images/purpleuserhome.jpg'
import logo from '../images/logo.png'


const { width: WIDTH } = Dimensions.get('window');

export default class Login extends React.Component {

    constructor(){
        super();

        this.state = {
          email: ""
        }
    }

    todolist() {
        Actions.todolist()
    }

    calendar(){
        Actions.calendar()
    }

    render() {
        return (
            <ImageBackground source={bgImage} style={styles.backgroundContainer}>
                <View style={styles.logoContainer}>
                    <Text style={styles.logoText}>Good Morning</Text>
                </View>

                <ActionButton buttonColor="#C7AFA3">
                        <ActionButton.Item buttonColor='#413A5D' title="Calendar" onPress={this.calendar}>
                            <Icon name="ios-calendar" style={styles.actionButtonIcon} size={30} color='#fff'/>
                        </ActionButton.Item>
                        <ActionButton.Item buttonColor='#413A5D' title="To Do List" onPress={this.todolist}>
                            <Icon name="ios-list" style={styles.actionButtonIcon} size={30} color='#fff'/>
                        </ActionButton.Item>
                </ActionButton>

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
