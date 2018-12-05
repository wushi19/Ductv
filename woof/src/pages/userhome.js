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
import { Actions } from 'react-native-router-flux';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import bgImage from '../images/purpleuserhome.jpg';
import logo from '../images/logo.png';
import PriorityQueue from "js-priority-queue";
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';

const { width: WIDTH } = Dimensions.get('window');

export default class Login extends React.Component {

    constructor() {
        super();

        this.state = {
            email: "",
            hour: null,
            minute: null,
            quote: "\"A goal should scare you a little and excite you a lot.\" - Joe Vitale",
        }
    }

    formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? '' : '';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }

    todolist() {
        Actions.todolist()
    }

    calendar() {
        Actions.calendar()
    }

    componentDidMount() {

        var date = new Date();

        setInterval(() => {
            this.setState({
                hour: this.formatAMPM(date)
            })
        })

    }

    render() {
        const config = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80
        };
        
        return (
            <GestureRecognizer
                onSwipeRight={(state) => Actions.todolist()}
                onSwipeLeft={(state) => Actions.calendar()}
                config={config}
                style={{
                    flex: 1,
                    backgroundColor: '#fff'
                }}
            >

                <ImageBackground source={bgImage} style={styles.backgroundContainer}>
                    
                    <View style={styles.textContainer}>
                        <Text style={styles.timeText}>{this.state.hour}</Text>
                        <Text style={styles.nameText}>Good Morning, Dorian.</Text>
                    </View>

                    <View style={styles.quoteContainer}>
                        <Text style={styles.quoteText}>{this.state.quote}</Text>
                    </View>
                </ImageBackground>
            </GestureRecognizer>

        );
            
    }
}

const styles = StyleSheet.create({
    backgroundContainer: {
        alignItems: 'center', //bkg to be centered
        justifyContent: 'center', //text to be centered
        flex: 1,
        // paddingTop:20
    },
    textContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    nameText: {
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Montserrat-ExtraLight',
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        opacity: 1,
    },
    timeText: {
        fontFamily: 'Montserrat-ExtraLight',
        color: 'white',
        fontSize: 100,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 1,
    },
    quoteContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 36
    },
    quoteText:{
        color: 'white',
        fontFamily: 'Montserrat-Medium',
    },
});
