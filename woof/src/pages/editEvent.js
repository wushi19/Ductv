import React from 'react';
import { Text, View, Alert, StyleSheet, ScrollView, AsyncStorage, StatusBar, ImageBackground, TextInput, Dimensions } from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';
import bkg from '../images/loginbkg.jpg';
import DatePicker from 'react-native-datepicker';

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
            startTime: this.props.startTime,
            endtime: this.props.endTime,
            date: this.props.date.split("-")[2] + "-" + this.props.date.split("-")[0] + "-" + this.props.date.split("-")[1],
            // recurring: null,
            // private: null, //private is res
            calendar: "http://durian-django-env.nihngkspzc.us-east-1.elasticbeanstalk.com/calendar/1/",
            updated: moment(new Date()).format("YYYY-MM-DD") + "T" + moment(new Date()).format("hh:mm:ss"),
            location: this.props.loc,
            isLoading: true,
            dataSource: null,
            id: this.props.id,
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

    updateEvent = () => {
        this.tasktest();
    }

    tasktest = () => {
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
                startTime: this.state.date + "T" + this.state.startTime + ":00-05:00",
                endtime: this.state.date + "T" + this.state.endtime + ":00-05:00",
            }),
        })
            .then((response) => response.json())
            .then((responseJson) => {


            })
            .catch((error) => {
                console.error(error);
            });
        alert("Event successfully updated!");
        Actions.userhome();
    }

    render() {
        return (
            <ImageBackground source={bkg} style={styles.container}>
                <StatusBar barStyle="light-content" />
                <ScrollView style={styles.eventContainer}>

                    <Text style={styles.title}>Event Information</Text>

                    <Text style={styles.statictextDescriptors}>Event Name:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={this.props.header}
                        // secureTextEntry={true}
                        placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
                        autoCapitalize='none'
                        underLineColorAndroid='transparent'
                        onChangeText={(header) => this.setState({ header })}
                        value={this.state.header}
                    />

                    <Text style={styles.statictextDescriptors}>Location:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={this.props.loc}
                        // secureTextEntry={true}
                        placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
                        autoCapitalize='none'
                        underLineColorAndroid='transparent'
                        onChangeText={(location) => this.setState({ location })}
                        value={this.state.location}
                    />

                    <Text style={styles.statictextDescriptors}>Details:</Text>
                    <TextInput
                        style={styles.input}
                        placehol der={this.props.desc}
                        // secureTextEntry={true}
                        placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
                        autoCapitalize='none'
                        underLineColorAndroid='transparent'
                        onChangeText={(description) => this.setState({ description })}
                        value={this.state.description}
                    />

                    <Text style={styles.statictextDescriptors}>Date:</Text>
                    <DatePicker
                        style={{ width: 200 }}
                        date={this.state.date}
                        mode="date"
                        placeholder={this.state.date}
                        format="YYYY-MM-DD"
                        minDate="2016-05-01"
                        maxDate="2029-12-31"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        showIcon={false}
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 48,
                                color: '#fff',
                                height: 45,
                                borderRadius: 45,
                                fontSize: 16,
                                marginHorizontal: 25,
                                paddingLeft: 10,
                                paddingRight: 10,
                            }
                            // ... You can check the source to find the other keys.
                        }}
                        onDateChange={(date) => { this.setState({ date: date }) }}
                    />

                    <Text style={styles.statictextDescriptors}>Start Time:</Text>
                    <DatePicker
                        style={{ width: 200 }}
                        date={this.state.startTime}
                        mode="time"
                        placeholder={this.state.startTime}
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        showIcon={false}
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 48,
                                color: '#fff',
                                height: 45,
                                borderRadius: 45,
                                fontSize: 16,
                                marginHorizontal: 25,
                                paddingLeft: 10,
                                paddingRight: 10,
                            }
                            // ... You can check the source to find the other keys.
                        }}
                        onDateChange={(startTime) => this.setState({ startTime })}
                    />

                    <Text style={styles.statictextDescriptors}>End Time:</Text>
                    <DatePicker
                        style={{ width: 200 }}
                        date={this.state.endtime}
                        mode="time"
                        placeholder={this.state.endtime}
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        showIcon={false}
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 48,
                                color: '#fff',
                                height: 45,
                                borderRadius: 45,
                                fontSize: 16,
                                marginHorizontal: 25,
                                paddingLeft: 10,
                                paddingRight: 10,
                            }
                            // ... You can check the source to find the other keys.
                        }}
                        onDateChange={(endtime) => this.setState({ endtime })}
                    />

                </ScrollView>
                <ActionButton
                    buttonColor="#EADCD9"
                    onPress={this.updateEvent}
                    renderIcon={active => active ? (<Icon name="md-create" style={styles.actionButtonIcon} />) : (<Icon name="ios-done-all" style={styles.actionButtonIcon} />)}
                />

            </ImageBackground>
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
        backgroundColor: '#7B6F92',
    },
    title: {
        color: '#fff',
        fontSize: 30,
        marginTop: 60,
        marginBottom: 30,
        fontWeight: '300',
        width: WIDTH - 55,
        paddingLeft: 45,
        marginHorizontal: 25,
        fontFamily: 'Montserrat-ExtraLight',
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
        fontFamily: 'Montserrat-ExtraLight',
    },
    statictextDescriptors: {
        color: '#fff',
        fontSize: 15,
        marginTop: 10,
        marginBottom: 5,
        width: WIDTH - 55,
        paddingLeft: 20,
        marginHorizontal: 25,
        fontFamily: 'Montserrat-ExtraLight',
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
        fontFamily: 'Montserrat-ExtraLight',
    },
    actionButtonIcon: {
        fontSize: 30,
        color: '#7B6F92',
    },
});
