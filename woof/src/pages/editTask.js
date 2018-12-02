import React from 'react';
import {Text, View, Alert, StyleSheet, AsyncStorage, StatusBar, ImageBackground, TextInput, Dimensions, Slider} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import {Actions} from 'react-native-router-flux';
import bkg from '../images/loginbkg.jpg';
import DatePicker from 'react-native-datepicker'

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
            id: this.props.id,
            header: this.props.header,
            description: this.props.description,
            priority: this.props.priority,
            durationFormat: (parseInt(this.props.duration /60) > 9) ? parseInt(this.props.duration /60) : ('0' + parseInt(this.props.duration /60)) + ':' + (((this.props.duration % 60) > 9) ? (this.props.duration % 60) : ('0' + (this.props.duration % 60)) ),
            duration: this.props.duration,
            due: this.props.due,
            id: this.props.id,
            url: this.props.url
        }
    };


    editEvent() {
        Alert.alert(this.props.header.url)
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

    updateTask = () =>{
        this.tasktest();
    }

    tasktest = () =>{
        fetch(this.state.url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                header: this.state.header,
                description: this.state.description,
                priority: this.state.priority,
                duration: (parseInt(this.state.durationFormat.substring(3, 5), 10) + (parseInt(this.state.durationFormat.substring(0, 2), 10) * 60)),
                due: this.state.due,
                owner: "http://durian-django-env.nihngkspzc.us-east-1.elasticbeanstalk.com/profile/1/"
            }),
        })
            .then((response) => response.json())
            .then((responseJson) => {

                
            })
            .catch((error) => {
                console.error(error);
            });
            Actions.userhome();
    }
    
    render() {
        return (
            <ImageBackground source={bkg} style={styles.container}>
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
                        onChangeText={(header) => this.setState({ header })}
                        value={this.state.header}
                    />

                    <Text style={styles.statictextDescriptors}>Details:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={this.props.description}
                        // secureTextEntry={true}
                        placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
                        autoCapitalize = 'none'
                        underLineColorAndroid='transparent'
                        onChangeText={(description) => this.setState({ description })}
                        value={this.state.description}
                    />

                    <Text style={styles.statictextDescriptors}>Priority:</Text>
                    <Slider
                        style={{ width: 168, marginLeft: 45 }}
                        minimumValue={1}
                        maximumValue={5}
                        step={1}
                        onValueChange={(priority) => this.setState({ priority })}
                        value={this.state.priority}
                    />

                    <Text style={styles.statictextDescriptors}>Duration:</Text>
                    <DatePicker
                        style={{width: 200}}
                        date={this.state.durationFormat}
                        mode="time"
                        //color ="#fff"
                        placeholder="select date"
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
                        }}
                        onDateChange={(durationFormat) => this.setState({durationFormat})}/>

                    <Text style={styles.statictextDescriptors}>Due:</Text>
                    <DatePicker
                        style={{width: 200}}
                        date={this.state.due}
                        mode="datetime"
                        placeholder="select date"
                        format="YYYY-MM-DD HH:mm"
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
                                // width: WIDTH,
                                color: '#fff',
                                height: 45,
                                borderRadius: 100,
                                fontSize: 16,
                                marginHorizontal: 25,
                                paddingLeft: 10,
                                paddingRight: 10,
                            }
                            // ... You can check the source to find the other keys. {(durationFormat) => {this.changedur({date: durationFormat})}}
                        }}
                        onDateChange={(due) => this.setState({due})}/>
                    
                </View>
                <ActionButton 
                buttonColor="#EADCD9" 
                onPress={this.updateTask} 
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
    actionButtonIcon: {
        fontSize: 30,
        color: '#7B6F92',
    },
    title: {
        fontFamily: 'Montserrat-ExtraLight',
        color: '#fff',
        fontSize: 30,
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
      fontSize: 16,
      paddingLeft: 40,  //inside text paddinging
      backgroundColor: 'rgba(0,0,0,0.35)',
      color: '#EADCD9',
      marginHorizontal: 40,
      fontFamily: 'Montserrat-ExtraLight',
  },
});
