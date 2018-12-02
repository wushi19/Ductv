import React from 'react';
import { Text, View, Alert, StyleSheet, AsyncStorage, StatusBar, ImageBackground, Dimensions } from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';
import bkg from '../images/loginbkg.jpg';

const { width: WIDTH } = Dimensions.get('window');

export default class moreInfoEvent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

            id: this.props.id,
            url: "http://durian-django-env.nihngkspzc.us-east-1.elasticbeanstalk.com/event/" + this.props.id + "/",
            header: this.props.header,
            startTime: (parseInt(this.props.startTime.split(":")[0], 10) - 5) + ":" + this.props.startTime.split(":")[1],
            endTime: (parseInt(this.props.endTime.split(":")[0], 10) - 5) + ":" + this.props.endTime.split(":")[1],
            desc: this.props.desc,
            date: this.props.date,
            loc: this.props.loc,
            // description: "",
            // startTime: "",
            // endtime: "",
            // recurring: null,
            // p: null, //private is res
            calendar: "http://durian-django-env.nihngkspzc.us-east-1.elasticbeanstalk.com/calendar/1/",
            // created: "",
            // updated: "",
            // location: "",
            // data: null,
            isLoading: true,
            dataSource: null,
            id: this.props.id
        }
    };


    //editEvent(the) {
    //    Actions.editEvent(the)
    //}

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
        return (
            <ImageBackground source={bkg} style={styles.container}>
                <StatusBar barStyle="light-content" />
                <View style={styles.eventContainer}>

                    <Text style={styles.title}>Event Information</Text>

                    <Text style={styles.statictextDescriptors}>Event:</Text>
                    <Text style={styles.statictextresult}>{this.props.header}</Text>

                    <Text style={styles.statictextDescriptors}>Location:</Text>
                    <Text style={styles.statictextresult}>{this.props.loc}</Text>

                    <Text style={styles.statictextDescriptors}>Date:</Text>
                    <Text style={styles.statictextresult}>{this.props.date}</Text>

                    <Text style={styles.statictextDescriptors}>Start Time:</Text>
                    <Text style={styles.statictextresult}>{this.state.startTime}</Text>

                    <Text style={styles.statictextDescriptors}>End Time:</Text>
                    <Text style={styles.statictextresult}>{this.state.endTime}</Text>

                    <Text style={styles.statictextDescriptors}>Details:</Text>
                    <Text style={styles.statictextresult}>{this.props.desc}</Text>

                </View>
                <ActionButton
                    buttonColor="#EADCD9"
                    onPress={() => { Actions.editEvent(this.state) }}
                    renderIcon={active => active ? (<Icon name="md-create" style={styles.actionButtonIcon} />) : (<Icon name="md-create" style={styles.actionButtonIcon} />)}
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
        fontSize: 28,
        marginTop: 60,
        marginBottom: 30,
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
        alignItems: 'center',
        fontFamily: 'Montserrat-ExtraLight',
    },
    statictextDescriptors: {
        color: '#fff',
        fontSize: 18,
        marginTop: 10,
        marginBottom: 5,
        width: WIDTH - 55,
        paddingLeft: 20,
        marginHorizontal: 25,
        fontFamily: 'Montserrat-ExtraLight',
    },
    actionButtonIcon: {
        fontSize: 30,
        color: '#7B6F92',
    },
    statictextresult:{
        color: '#fff',
        fontSize: 15,
        marginTop: 10,
        marginBottom: 5,
        width: WIDTH - 55,
        paddingLeft: 20,
        marginHorizontal: 25,
        fontFamily: 'Montserrat-ExtraLight',
    }
});