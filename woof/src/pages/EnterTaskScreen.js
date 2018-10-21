import React from 'react';
import {
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
  DatePickerIOS
} from 'react-native';

const { width: WIDTH } = Dimensions.get('window');

var moment = require('moment');

export default class EnterTaskScreen extends React.Component {
  static navigationOptions = {
    title: 'EnterTaskScreen',
  };

  constructor(props) {
    super(props);
    this.setDate = this.setDate.bind(this);
    this.state = {
      chosenDate: new Date(),
      date: new Date(),
      showDatePicker: false
    }
  }


  setDate(newDate) {
    this.setState({ chosenDate: newDate })
  }

  render() {
    var showDatePicker = this.state.showDatePicker ?
      <DatePickerIOS
        style={{ height: 150 }}
        date={this.state.date} onDateChange={(date) => this.setState({ date })}
        mode="date" /> : <View />
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.getStartedText}>WHAT NEEDS TO GET DONE?</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={'Task Name'}
            secureTextEntry={false}
            placeholderTextColor={'rgba(100, 100, 100, 0.7)'}
          />
          <TextInput
            style={styles.input}
            placeholder={'Task Description(Optional)'}
            secureTextEntry={false}
            placeholderTextColor={'rgba(100, 100, 100, 0.7)'}
            multiline={true}
          />
        </View>
        <TouchableOpacity
          onPress={() => this.setState({ showDatePicker: !this.state.showDatePicker })}>
          <Text style={styles.input}>Start Date: {moment(this.state.date).format('DD/MM/YYYY')}</Text>
        </TouchableOpacity>
        {showDatePicker}

        <View style={styles.addButtonContainer}>
          <Button
            onPress={() => alert("Task Added!")}
            title="ADD TASK"
            color="#000000"
          />
        </View>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  getStartedText: {
    paddingTop: 10,
    fontSize: 20,
    color: 'rgba(50, 50, 50, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  inputContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  input: {
    width: WIDTH - 55,
    height: 45,
    borderColor: 'rgba(0,0,0,1)',
    fontSize: 16,
    paddingLeft: 45,
    backgroundColor: 'rgba(0,0,0,0.1)',
    color: 'rgba(0, 0, 0, 1)',
    marginHorizontal: 25,
  },
  dateContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  addButtonContainer: {
    paddingTop: 50
  },
  container: {
    flex: 0,
    backgroundColor: '#FFF',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
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
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
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
  },
});

module.exports = EnterTaskScreen;