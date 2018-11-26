import React from 'react';
import {Text, View, Alert, StyleSheet, AsyncStorage, StatusBar, ImageBackground, TextInput, Dimensions} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import {Actions} from 'react-native-router-flux';
import bkg from '../images/yellowbkg.jpg';

const { width: WIDTH } = Dimensions.get('window');

export default class editTask extends React.Component {

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
        Alert.alert(this.props.header)
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

    // componentDidMount() {
    //     return fetch('http://durian-django-env.nihngkspzc.us-east-1.elasticbeanstalk.com/event/?format=json')
    //         .then((response) => response.json())
    //         .then((responseJson) => {
    //             this.setState({
    //                 isLoading: false,
    //                 dataSource: responseJson
    //             })
    //         })
    //         .catch((error) => {
    //             console.log(error)
    //         });
    // }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content"/>
                <View style={styles.eventContainer}>

                    <Text style={styles.title}>Task Information</Text>

                    <Text style={styles.statictextDescriptors}>Event:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={this.props.header}
                        // secureTextEntry={true}
                        placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
                        autoCapitalize = 'none'
                        underLineColorAndroid='transparent'
                        //onChangeText={(email) => this.setState({ email })}
                        //value={this.state.email}
                    />

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
                <ActionButton buttonColor="#EADCD9" onPress={this.editEvent}/>

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
        backgroundColor: '#7B6F92',
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
      paddingLeft: 40,  //inside text paddinging
      backgroundColor: 'rgba(0,0,0,0.35)',
      color: '#EADCD9',
      marginHorizontal: 40,
  },
});
