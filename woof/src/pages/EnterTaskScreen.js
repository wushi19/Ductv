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
      if (this.state.checkdur) {
        var len = this.state.duration.length;
        this.state.chosendur = parseInt(this.state.duration.substring(len - 2, len), 10);
        this.state.chosendur += parseInt(this.state.duration.substring(0, len - 3), 10) * 60;
      }
      if (this.state.checkpri) this.state.chosenpri = this.state.priority;
      if (this.state.checkdate) {
        if (this.state.checktime) {
          this.state.chosendue = this.state.dated + ' ' + this.state.timed;
        } else {
          this.state.chosendue = this.state.dated + ' 00:00';
        }
      }
      this.tasktest()
      this.props.navigation.navigate('todolist')
    }
  };

  changedur() {
    this.setState({
      checkdur: !this.state.checkdur
    })
    alert("button did a change to " + !this.state.checkdur)
  }

  changepri() {
    this.setState({
      checkpri: !this.state.checkpri
    })
    alert("button did a change to " + !this.state.checkpri)
  }

  changedate() {
    this.setState({
      checkdate: !this.state.checkdate
    })
    alert("button did a change to " + !this.state.checkdate)
  }

  changetime() {
    this.setState({
      checktime: !this.state.checktime
    })
    alert("button did a change to " + !this.state.checktime)
  }

  tasktest = () => {
    fetch('http://durian-django-env.nihngkspzc.us-east-1.elasticbeanstalk.com/task/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        header: this.state.taskname,
        description: this.state.taskdescription,
        priority: this.state.chosenpri,
        duration: this.state.chosendur,
        due: this.state.chosendue,
        owner: 'http://durian-django-env.nihngkspzc.us-east-1.elasticbeanstalk.com/profile/1/',
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
          <CheckBox
            onChange={this.changedur.bind(this)}
            title="checkdur"
            checked={this.state.checkdur}
          />

          <Text style={{ paddingTop: 10, fontFamily: 'Montserrat-ExtraLight', color: '#fff' }}>Duration: </Text>

          <DatePicker
            style={{ width: 211, alignItems: 'center' }}
            date={this.state.duration}
            mode="time"
            placeholder="select date"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            iconSource={require('../images/stopwatch.png')}
            customStyles={{
              dateInput: {
                marginLeft: 12,
                alignItems: 'center'
              },
              dateIcon: {
                //position: 'absolute',
                left: 10,
                top: 4,
                marginLeft: 0
              }
              // ... You can check the source to find the other keys.
            }}
            onDateChange={(date) => { this.setState({ duration: date }) }}
          />
        </View>

        <View style={{ flexDirection: 'row', paddingLeft: 40 }}>

          <CheckBox
            onChange={this.changepri.bind(this)}
            title="checkpri"
            checked={this.state.checkpri}
          />

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
          <CheckBox
            onChange={this.changedate.bind(this)}
            title="checkdate"
            checked={this.state.checkdate}
          />
          <Text style={{ paddingTop: 10, fontFamily: 'Montserrat-ExtraLight', color: '#fff' }}>Date: {"\n"}</Text>
          <DatePicker
            style={{ width: 250 }}
            date={this.state.dated}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD"
            minDate="2016-05-01"
            maxDate="2029-12-31"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                // position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 10
              },
              dateInput: {
                marginLeft: 40
              }
              // ... You can check the source to find the other keys.
            }}
            onDateChange={(date) => { this.setState({ dated: date }) }}
          />
        </View>


        <View style={{ flexDirection: 'row', paddingLeft: 40 }}>
          <CheckBox
            onChange={this.changetime.bind(this)}
            title="checktime"
            checked={this.state.checktime}
          />
          <Text style={{ paddingTop: 10, fontFamily: 'Montserrat-ExtraLight', color: '#fff' }}>Time:</Text>
          <DatePicker
            style={{ width: 253 }}
            date={this.state.timed}
            mode="time"
            placeholder="select date"
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
            onDateChange={(date) => { this.setState({ timed: date }) }}
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