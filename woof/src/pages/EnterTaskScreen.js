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
  CheckBox,
  Slider,
  StatusBar,
} from 'react-native';
import DatePicker from 'react-native-datepicker'
import bkg from '../images/loginbkg.jpg'


const { width: WIDTH } = Dimensions.get('window');

var moment = require('moment');

export default class EnterTaskScreen extends React.Component {

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
      priority: 1,
      chosenpri: 1,
      due: null,
      duration: '00:30',
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
      Alert.alert("Please enter Task Name.");
    } else {
      this.tasktest()
      this.props.navigation.navigate('todolist')
    }
  };

  tasktest = () => {
    fetch('http://127.0.0.1:8000/task/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        header: this.state.taskname,
        description: this.state.taskdescription,
        priority: this.state.priority,
        duration: (parseInt(this.state.duration.substring(3, 5), 10) + (parseInt(this.state.duration.substring(0, 2), 10) * 60)),
        due: this.state.due,
        owner: 'http://127.0.0.1:8000/profile/3/',
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        Alert.alert("Task Successfully Added.");
      })
      .catch((error) => {
        console.error(error);
      });

  }

  render() {
    return (
      <ImageBackground source={bkg} style={styles.container} contentContainerStyle={styles.contentContainer}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.getStartedText}>Task Information</Text>

        <View style={styles.inputContainer}>
          <TextInput
            id={'tasknames'}
            style={styles.input}
            placeholder={'Task Name'}
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
        </View>

        <View style={{ flexDirection: 'row', paddingLeft: 40 }}>

          <Text style={{ paddingTop: 10, fontFamily: 'Montserrat-ExtraLight', color: '#fff' }}>Duration: </Text>

          <DatePicker
            style={{ width: 225 }}
            date={this.state.duration}
            mode="time"
            placeholder="select date"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            iconSource={require('../images/stopwatch.png')}
            customStyles={{
              dateIcon: {
                //position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 11
              },
              dateInput: {
                marginLeft: 12
              }
             // ... You can check the source to find the other keys. {(durationFormat) => {this.changedur({date: durationFormat})}}
           }}
           onDateChange={(duration) => this.setState({duration})}/>
        </View>

        <View style={{ flexDirection: 'row', paddingLeft: 40 }}>

          <Text style={{ paddingTop: 10, fontFamily: 'Montserrat-ExtraLight', color: '#fff', paddingRight: 25 }}>Priority:</Text>

          {/* <Image source={require('../images/nimportant.png')} style={{width: 30, height: 30}} /> */}
          <Slider
            style={{ width: 168, paddingLeft: 100 }}
            minimumValue={1}
            maximumValue={5}
            step={1}
            onValueChange={(priority) => this.setState({ priority })}
            value={this.state.priority}
          />
          <Image source={require('../images/vimportant.png')} style={{ width: 30, height: 30, marginLeft: 12, marginTop: 5 }} />
        </View>

        <View style={{ flexDirection: 'row', paddingLeft: 40 }}>
          
          <Text style={{ paddingTop: 10, fontFamily: 'Montserrat-ExtraLight', color: '#fff' }}>Time:</Text>
          <DatePicker
            style={{ width: 253 }}
            date={this.state.due}
            mode="datetime"
            placeholder="select date (Optional)"
            format="YYYY-MM-DD HH:mm"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            iconSource={require('../images/clock.png')}
            customStyles={{
              dateIcon: {
                //position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 11
              },
              dateInput: {
                marginLeft: 42
              }
              // ... You can check the source to find the other keys.
            }}
            onDateChange={(due) => this.setState({due})}/>

        </View>

        <View style={{ flexDirection: 'row', paddingLeft: 40 }}>
          <TouchableOpacity
            onPress={this.taskbarr}
            style={styles.btnLogin}
          >
            <Text style={styles.btnLoginText}> Add Task </Text>
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
    marginTop: 100,
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

module.exports = EnterTaskScreen;