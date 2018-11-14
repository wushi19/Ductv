import React, {Component} from 'react';
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
import {Actions} from 'react-native-router-flux';

const { width: WIDTH } = Dimensions.get('window');

//Gets value related to key parameter
function getData(key){
  try {
    rec = AsyncStorage.getItem(String(key), (error, val) =>{
      Alert.alert(val);
    });
  } catch (error){
    return "None to show"
  }
}

export default class Validate extends React.Component {
  constructor() {
    super();

    this.state = {
      addingdata: "",
      gettingkey:"",
    }
  }

//Stores strings in the text field to async with key testdat
  storeData = () =>{
    //var addingdata = this.state.addingdata;
    //var testData = addingdata;
    var testData = {"a":1, "b":2};
    testData = JSON.stringify(testData);
    try {
      answer = AsyncStorage.setItem('testdat', testData);
      Alert.alert('storing: '+ testData);
    } catch (error) {
  // Error saving data
    }
  }

  //click alert data to show displayed data
  showData = () =>{
    var getkey = String(this.state.gettingkey);
    getData(getkey);
    // try {
    //   rec = AsyncStorage.getItem(getkey, (error, val) =>{
    //     Alert.alert(val);
    //   });
    // } catch (error){
    //
    // }
  }

  showTest = () =>{
    try {
      rec = AsyncStorage.getItem('testdat', (error, val) =>{
        Alert.alert(val);
      });
    } catch (error){

    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.props.test}</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={'Data'}
            placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
            underLineColorAndroid='transparent'
            onChangeText={(addingdata) => this.setState({ addingdata })}
            value={this.state.addingdata}
          />
        </View>




        <TouchableOpacity style={styles.btnLogin}>
          <Button
            color='rgba(255, 255, 255, 0.7)'
            title="store"
            fontSize='16'
            onPress={this.storeData}
          />
        </TouchableOpacity>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={'key'}
            placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
            underLineColorAndroid='transparent'
            onChangeText={(gettingkey) => this.setState({ gettingkey })}
            value={this.state.gettingkey}
          />
        </View>




        <TouchableOpacity style={styles.btnLogin}>
          <Button
            color='rgba(255, 255, 255, 0.7)'
            title="show"
            fontSize='16'
            onPress={this.showData}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnLogin}>
          <Button
            color='rgba(255, 255, 255, 0.7)'
            title="testData"
            fontSize='16'
            onPress={this.showTest}
          />
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    width: null,
    height: null,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: WIDTH - 55, //padding on right
    height: 45, //height of text box
    borderRadius: 45,
    fontSize: 16,
    paddingLeft: 45, //text padding on left
    backgroundColor: 'rgba(0,0,0,0.35)',
    color: 'rgba(255, 255, 255, 0.7)',
    marginHorizontal: 25, //padding on left
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  logo: {
    width: 120,
    height: 120,
  },
  logoText: {
    color: 'black',
    fontSize: 20,
    fontWeight: '500',
    marginTop: 10,
    opacity: 0.5,
  },
  inputContainer: {
    marginTop: 10,
  },
  btnLogin: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 45,
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: 'rgba(0,0,0,0.75)'
  },
});
