import React from 'react';
import {Text, View, Alert, StyleSheet, ScrollView, AsyncStorage, StatusBar, ImageBackground, TextInput, Dimensions} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import {Actions} from 'react-native-router-flux';
import bkg from '../images/yellowbkg.jpg';

const { width: WIDTH } = Dimensions.get('window');

var moment = require('moment');

export default class editEvent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

            id: this.props.id,
            url: this.props.url,
            header: this.props.header,
            description: this.props.desc,
            startTime: "",
            endtime: "",
            // recurring: null,
            // private: null, //private is res
            calendar: "http://durian-django-env.nihngkspzc.us-east-1.elasticbeanstalk.com/calendar/1/",
            updated: moment(new Date()).format("YYYY-MM-DD") + "T" + moment(new Date()).format("hh:mm:ss"),
            location: this.props.loc,
            isLoading: true,
            dataSource: null,
            id: '0',

        }
    };

    // getEvent = (number) => {
    //     response = fetch('http://durian-django-env.nihngkspzc.us-east-1.elasticbeanstalk.com/event/0/')
    //         .then(function (response) {
    //         })
    //         .then((responseJson) => {
    //             this.setState({data: responseJson});
    //            })
    //         .catch(function (error) {
    //             console.log('There has been a problem with your fetch operation: ' + error.message);
    //             // ADD THIS THROW error
    //             throw error;
    //             //t@t.com
    //         });
    // }

    componentDidMount() {
        return fetch('http://durian-django-env.nihngkspzc.us-east-1.elasticbeanstalk.com/event/?format=json')
            .then((response) => response.json())
            .then((responseJson) => {
              this.setState({
                   isLoading: false,
                   dataSource: responseJson
               })
            })
            .catch((error) => {
               console.log(error)
            });
    }

    updateEvent = () =>{
        this.tasktest();
        alert(this.state.url + "\nPROPS: " + this.props.url)
    }

    tasktest = () =>{
        fetch(this.state.url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                header: this.state.header,
                updated: this.state.updated,
                description: this.state.description,
                location: this.state.location,
            }),
        })
            .then((response) => response.json())
            .then((responseJson) => {

                
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content"/>
                <ScrollView style={styles.eventContainer}>

                    <Text style={styles.title}>Event Information</Text>

                    <Text style={styles.statictextDescriptors}>Event Name:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={this.props.header}
                        // secureTextEntry={true}
                        placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
                        autoCapitalize = 'none'
                        underLineColorAndroid='transparent'
                        onChangeText={(header) => this.setState({header})}
                        value={this.state.header}
                    />

                    <Text style={styles.statictextDescriptors}>Location:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={this.props.loc}
                        // secureTextEntry={true}
                        placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
                        autoCapitalize = 'none'
                        underLineColorAndroid='transparent'
                        onChangeText={(location) => this.setState({ location })}
                        value={this.state.location}
                    />

                    <Text style={styles.statictextDescriptors}>Date:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={this.props.date}
                        // secureTextEntry={true}
                        placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
                        autoCapitalize = 'none'
                        underLineColorAndroid='transparent'
                        //onChangeText={(email) => this.setState({ email })}
                        //value={this.state.email}
                    />

                    <Text style={styles.statictextDescriptors}>Start Time:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={this.props.startTime}
                        // secureTextEntry={true}
                        placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
                        autoCapitalize = 'none'
                        underLineColorAndroid='transparent'
                        //onChangeText={(email) => this.setState({ email })}
                        //value={this.state.email}
                    />

                    <Text style={styles.statictextDescriptors}>End Time:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={this.props.endTime}
                        // secureTextEntry={true}
                        placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
                        autoCapitalize = 'none'
                        underLineColorAndroid='transparent'
                        //onChangeText={(email) => this.setState({ email })}
                        //value={this.state.email}
                    />

                    <Text style={styles.statictextDescriptors}>Details:</Text>
                    <TextInput
                        style={styles.input}
                        placehol der={this.props.desc}
                        // secureTextEntry={true}
                        placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
                        autoCapitalize = 'none'
                        underLineColorAndroid='transparent'
                        onChangeText={(description) => this.setState({ description })}
                        value={this.state.description}
                    />

                </ScrollView>
                <ActionButton buttonColor="#EADCD9" onPress={this.updateEvent}/>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: null,
        height: null,
//        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D0C9E4',
    },
    title: {
        color: '#413A5D',
        fontSize: 36,
        marginTop: 60,
        marginBottom: 30,
        fontWeight: '300',
        width: WIDTH - 55,
        paddingLeft: 45,
        marginHorizontal: 25,
    },
    eventContainer: {
        flex: 1,
        //alignItems: 'center'
    },
    headerstyle: {
        color: '#fff',
        fontSize: 26,
        marginTop: 18,
        marginBottom: 15,
    },
    statictextDescriptors: {
        color: '#413A5D',
        fontSize: 15,
        marginTop: 10,
        marginBottom: 5,
        width: WIDTH - 55,
        paddingLeft: 20,
        marginHorizontal: 25,
    },
    input: {
      width: WIDTH - 90, //left-right text input size
      height: 40,         //up-down text input size
      borderRadius: 20,
      fontSize: 16,
      paddingLeft: 20,  //inside text paddinging
      backgroundColor: 'rgba(0,0,0,0.35)',
      color: '#EADCD9',
      marginHorizontal: 40,
  },
    input: {
        width: WIDTH - 90, //left-right text input size
        height: 40,         //up-down text input size
        borderRadius: 20,
        marginBottom: 20,
        fontSize: 16,
        paddingLeft: 20,  //inside text paddinging
        backgroundColor: 'rgba(0,0,0,0.35)',
        color: '#EADCD9',
        marginHorizontal: 40,
    },
});
