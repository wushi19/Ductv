// for sage

import React from 'react';
import { Text, View, Alert, StyleSheet, AsyncStorage, StatusBar } from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import {Actions} from 'react-native-router-flux';


export default class TaskClass extends React.Component {

    constructor(props) {
        super(props);

        this.state = {


        }
    };


    editEvent() {
      Actions.editEvent() 
    }

    render() {

        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" />
                <ActionButton buttonColor="rgba(231,76,60,1)" onPress={this.editEvent} />
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
