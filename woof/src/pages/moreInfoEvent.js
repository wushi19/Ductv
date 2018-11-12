import React from 'react';
import { Text, View, Alert, StyleSheet, AsyncStorage, StatusBar, ImageBackground } from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';
import bkg from '../images/yellowbkg.jpg';

export default class moreInfoEvent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

            // id: null,
            // url: "http://durian-django-env.nihngkspzc.us-east-1.elasticbeanstalk.com/event/",
            // header: "",
            // description: "",
            // startTime: "",
            // endtime: "",
            // recurring: null,
            // p: null, //private is res
            // calendar: "http://durian-django-env.nihngkspzc.us-east-1.elasticbeanstalk.com/calendar/1/",
            // created: "",
            // updated: "",
            // location: "",
            // data: null,
            isLoading: true,
            dataSource: null,
            id: '0',

        }
    };


    editEvent() {
        Actions.editEvent()
    }

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

    render() {
        const {id} = this.state;
        if (this.state.isLoading) {

            return (
                <View style={styles.container}>
                    <Text>Content is loading</Text>
                </View>
            )

        } else {
            let tasks = this.state.dataSource.map((val, key) => {
                if(key == id){
                    var rawDateStart = val.startTime
                    date = rawDateStart.substring(0, 10)
                    time = rawDateStart.substring(11,16)

                    var rawDateEnd = val.endtime
                    endtime = rawDateEnd.substring(11,16)

                    var location = val.location;
                    if(location == ""){
                        location = "-";
                    }

                    return <View key={key} style={styles.eventContainer}>

                        <Text style={styles.title}>Event Information</Text>

                        <Text style={styles.statictextDescriptors}>Event:</Text>
                        <Text>{this.props.header}</Text>

                        <Text style={styles.statictextDescriptors}>Location:</Text>
                        <Text>{this.props.loc}</Text>

                        <Text style={styles.statictextDescriptors}>Date:</Text>
                        <Text>{this.props.date}</Text>

                        <Text style={styles.statictextDescriptors}>Start Time:</Text>
                        <Text>{this.props.startTime}</Text>

                        <Text style={styles.statictextDescriptors}>End Time:</Text>
                        <Text>{this.props.endTime}</Text>

                        <Text style={styles.statictextDescriptors}>Details:</Text>
                        <Text>{this.props.desc}</Text>

                    </View>
                }
                else{
                    <Text>Error no such event!</Text>
                }
            });
            return (
                <View style={styles.container}>
                    <StatusBar barStyle="light-content" />
                    {tasks}
                    <ActionButton buttonColor="rgba(231,76,60,1)" onPress={this.editEvent} />

                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: null,
        height: null,
//        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FD6A02',
    },
    title: {
        color: '#fff',
        fontSize: 36,
        marginTop: 60,
        marginBottom: 30,
        fontWeight: '300'
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
        color: '#fff',
        fontSize: 15,
        marginTop: 10,
        marginBottom: 5,
    }
});
