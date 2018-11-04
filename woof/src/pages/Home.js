/**
 */

import React, { Component } from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Button,
  Alert,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class Home extends React.Component {

  calendar() {
		Actions.calendar()
  }

  enterTask(){
    Actions.enterTask()
  }

  taskdjangotest(){
    Actions.taskdjangotest()
  }


  tasktest = () =>{
    fetch('http://durian-django-env.nihngkspzc.us-east-1.elasticbeanstalk.com/task/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      header: 'Post Task 3',
      description: 'AAAAAAAAAAAAAAAAAAAAA',
      owner: 'http://durian-django-env.nihngkspzc.us-east-1.elasticbeanstalk.com/profile/1/',
    }),
})
  .then((response) => response.json())
  .then((responseJson) => {
Alert.alert("You did it. I am so proud.");
  })
  .catch((error) => {
    console.error(error);
  });
}
    // var url = 'http://durian-django-env.nihngkspzc.us-east-1.elasticbeanstalk.com/profile/1/';
    // var task = fetch('http://durian-django-env.nihngkspzc.us-east-1.elasticbeanstalk.com/task/', {
    //   method: 'POST',
    //   contenttype: 'application/json',
    //     body: JSON.stringify({
    //       header: 'Post Task 3',
    //       description: ';lfne[flin]',
    //       owner: 'http://durian-django-env.nihngkspzc.us-east-1.elasticbeanstalk.com/profile/1/',
    //     }),
    // });
    //return task
  //}


  render() {
    return (
      <View style={styles.container}>
        <Text>I''m home</Text>

        <View>
        <TouchableOpacity onPress={this.tasktest}>
          <Text style={styles.calendarbutton} >
            Clksjdnfsodhf
          </Text>
        </TouchableOpacity>

          <TouchableOpacity onPress={this.calendar}>
            <Text style={styles.calendarbutton} >
              Calendar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.enterTask}>
            <Text style={styles.calendarbutton} >
              Entering Task
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.taskdjangotest}>
            <Text style={styles.calendarbutton} >
              Task Django Test
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
