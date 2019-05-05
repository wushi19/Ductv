import React from 'react';
import {
  Alert,
  Component,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Dimensions,
  TextInput,
  Button,
  NavigatorIOS,
  DatePickerIOS,
  DatePickerAndroid,
  Slider,
  StatusBar,
} from 'react-native';
import DatePicker from 'react-native-datepicker'
import bkg from '../images/loginbkg.jpg'
import { CheckBox } from 'react-native-elements'

const { width: WIDTH } = Dimensions.get('window');

var moment = require('moment');

export default class addEvent extends React.Component {

  constructor(props) {
    super(props);
    this.setDate = this.setDate.bind(this);
    this.state = {

      chosenDate: new Date(),
      dated: new Date(),
      timed: '00:00',
      showDatePicker: false,
      taskname: '',
      taskdescription: '',
      tasklocation: '',
      private: false,
      recurring: false,
      date: null,
      startTime: null,
      endtime: null,
      priority: 1,
      chosenpri: 1,
      due: null,
      updated: moment(new Date()).format("YYYY-MM-DD") + "T" + moment(new Date()).format("hh:mm:ss"),
      duration: '00:30',
      calendar: "http://127.0.0.1:8000/calendar/1/",
      chosendur: '30',
      chosendue: null,
      checkdur: false,
      checkpri: false,
      checkdate: false,
      checktime: false
    }
  }

  setDate(newDate) {
    this.setState({ chosenDate: newDate })
  }

  taskbarr = () => {
    if (this.state.taskname == '') {
      Alert.alert("Please enter an Event Name.");
    } else if(this.state.startTime == null || this.state.endtime == null || this.state.date == null) {
        Alert.alert("Please enter start/end time.")
    }else{
        this.state.startTime = this.state.date + "T" + this.state.startTime + ":00-05:00"
        this.state.endtime = this.state.date + "T" + this.state.endtime + ":00-05:00"
      this.tasktest()
      this.props.navigation.navigate('calendar')
    }
  };

  tasktest = () =>{
    fetch('http://127.0.0.1:8000/event/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            header: this.state.taskname,
            description: this.state.taskdescription,
            startTime: this.state.startTime,
            endtime: this.state.endtime,
            recurring: this.state.recurring,
            private: this.state.private,
            calendar: this.state.calendar,
            created: this.state.updated,
            updated: this.state.updated,
            location: this.state.tasklocation,
        }),
    })
        .then((response) => response.json())
        .then((responseJson) => {
            Alert.alert("Event Successfully Added.");
        })
        .catch((error) => {
            console.error(error);
        });
}


  render() {
    return (
      <ImageBackground source={bkg} style={styles.container} contentContainerStyle={styles.contentContainer}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.getStartedText}>Event Information</Text>

        <View style={styles.inputContainer}>
          <TextInput
            id={'tasknames'}
            style={styles.input}
            placeholder={'Event Name'}
            secureTextEntry={false}
            placeholderTextColor={'#fff'}
            onChangeText={(taskname) => this.setState({ taskname })}
            value={this.state.taskname}
          />
          <TextInput
            style={styles.input}
            placeholder={'Description'}
            secureTextEntry={false}
            placeholderTextColor={'#fff'}
            onChangeText={(taskdescription) => this.setState({ taskdescription })}
            value={this.state.taskdescription}
          />
          <TextInput
            style={styles.input}
            placeholder={'Location'}
            secureTextEntry={false}
            placeholderTextColor={'#fff'}
            onChangeText={(tasklocation) => this.setState({ tasklocation })}
            value={this.state.tasklocation}
          />
        </View>
        
        <View style={{ flexDirection: 'row', paddingLeft: 40 }}>
        <Text style={{ paddingTop: 10, fontFamily: 'Montserrat-ExtraLight', color: '#fff' }}>Date:</Text>
        <DatePicker
                        style={{ width: 245, alignItems: 'center' }}
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
                                marginLeft: 74
                            }
                            // ... You can check the source to find the other keys.
                        }}
                        onDateChange={(date) => { this.setState({ date: date }) }}
                    />
         </View>
         <View style={{ flexDirection: 'row', paddingLeft: 40 }}>              
                    <Text style={{ paddingTop: 10, fontFamily: 'Montserrat-ExtraLight', color: '#fff' }}>Start Time:</Text>
                    <DatePicker
                        style={{ width: 207, alignItems: 'center' }}
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
                                marginLeft: 36
                            }
                            // ... You can check the source to find the other keys.
                        }}
                        onDateChange={(startTime) => this.setState({ startTime })}
                    />
        </View>
        <View style={{ flexDirection: 'row', paddingLeft: 40 }}>              
                    <Text style={{ paddingTop: 10, fontFamily: 'Montserrat-ExtraLight', color: '#fff' }}>End Time:</Text>
                    <DatePicker
                        style={{ width: 211, alignItems: 'center' }}
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
                                marginLeft: 41
                            }
                    // ... You can check the source to find the other keys.
               }}
                onDateChange={(endtime) => this.setState({ endtime })}
            />
        </View>
        
        <View style={{ flexDirection: 'row', paddingLeft: 40 }}>
            <CheckBox
                fontFamily='Montserrat-ExtraLight'
                title='Recurring?'
                checkedColor='#413a5d'
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checked={this.state.recurring}
                onPress={() => this.setState({recurring: !this.state.recurring})}
            />

            <CheckBox
                fontFamily='Montserrat-ExtraLight'
                title='Private?'
                checkedColor='#413a5d'
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checked={this.state.private}
                onPress={() => this.setState({private: !this.state.private})}
            />
        </View>

        <View style={{ flexDirection: 'row', paddingLeft: 40 }}>
          <TouchableOpacity
            onPress={this.taskbarr}
            style={styles.btnLogin}
          >
            <Text style={styles.btnLoginText}> Add Event </Text>
          </TouchableOpacity>
        </View>

      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  btnLogin: {
    width: WIDTH - 70,
    height: 60,
    borderRadius: 45,
    justifyContent: 'center',
    marginTop: 1,
    backgroundColor: '#413A5D',
    opacity: 0.8,
},

btnLoginText: {
    textAlign: 'center',
    fontFamily: 'Montserrat-ExtraLight',
    color: 'white',
    fontSize: 20,
    justifyContent: 'center',
    opacity: 1,
},
  getStartedText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 36,
    marginTop: 60,
    marginBottom: 10,
    fontWeight: '300',
    fontFamily: 'Montserrat-ExtraLight',
  },
  inputContainer: {
    marginTop: 40,
    marginBottom: 20,
    alignItems: 'center',
    fontFamily: 'Montserrat-ExtraLight',
  },
  input: {
    width: WIDTH - 55,
    height: 45,
    borderColor: 'rgba(0,0,0,0.3)',
    fontSize: 16,
    paddingLeft: 45,
    backgroundColor: 'rgba(0,0,0,0.3)',
    color: '#fff',
    marginHorizontal: 25,
    borderRadius: 45,
    marginTop: 5,
    marginBottom: 10,
    fontFamily: 'Montserrat-ExtraLight',
  },
  dateContainer: {
    flex: 1,
    justifyContent: 'center',
    fontFamily: 'Montserrat-ExtraLight',
  },
  addButtonContainer: {
    paddingTop: 50,
    fontFamily: 'Montserrat-ExtraLight'
  },
  container: {
    flex: 1,
    backgroundColor: '#7B6F92',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
    fontFamily: 'Montserrat-ExtraLight',
  },
  contentContainer: {
    paddingTop: 0,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
    fontFamily: 'Montserrat-ExtraLight',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
    fontFamily: 'Montserrat-ExtraLight',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
    fontFamily: 'Montserrat-ExtraLight',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
    fontFamily: 'Montserrat-ExtraLight',
  },
});

module.exports = addEvent;