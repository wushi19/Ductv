import React, {Component} from 'react';
import {
    Text,
    View,
<<<<<<< HEAD
    StyleSheet, Alert, StatusBar
} from 'react-native';
import {Agenda} from 'react-native-calendars';
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/Ionicons";
=======
    StyleSheet,
    Alert,
} from 'react-native';
import {Agenda} from 'react-native-calendars';
>>>>>>> a4c641d8453506fd03de70378b10780d0fe12cd3

export default class AgendaScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: {}
        };
    }

    render() {
        return (
            <Agenda
                items={this.state.items}
                loadItemsForMonth={this.loadItems.bind(this)}
                selected={this.onDayPress}
                renderItem={this.renderItem.bind(this)}
                renderEmptyDate={this.renderEmptyDate.bind(this)}
                rowHasChanged={this.rowHasChanged.bind(this)}
<<<<<<< HEAD
                // markingType={'period'}
                // markedDates={{
                //    '2017-05-08': {textColor: '#666'},
                //    '2017-05-09': {textColor: '#666'},
                //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
                //    '2017-05-21': {startingDay: true, color: 'blue'},
                //    '2017-05-22': {endingDay: true, color: 'gray'},
                //    '2017-05-24': {startingDay: true, color: 'gray'},
                //    '2017-05-25': {color: 'gray'},
                //    '2017-05-26': {endingDay: true, color: 'gray'}}}
                monthFormat={'yyyy'}
                //theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
                //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}

            />

        );
    }

    loadItems(day) {
        const {items} = this.state
        fetch('http://durian-django-env.nihngkspzc.us-east-1.elasticbeanstalk.com/event/').then(function (response) {
            return response.json()
        }).then(function (data) {
            const newItems = {}
            for (var i = 0; i < data.length; i++) {
                var time = data[i]['startTime']
                var header = data[i]['header']
                time = new Date(time)
                var strTime = time.toISOString().split('T')[0]
                if (!items[strTime]) {
                    items[strTime] = [];
                    items[strTime].push({
                        name: header,
                        height: Math.max(50, Math.floor(Math.random() * 150)),
                        id: data[i]['id']
                    });
                }
                else {
                    var dupe = false
                    for (var j = 0; j < items[strTime].length; j++) {
                        if (items[strTime][j]["id"] == data[i]["id"]) {
                            dupe = true
                        }
                    }
                    if (!dupe) {
                        items[strTime].push({
                            name: header,
                            height: Math.max(50, Math.floor(Math.random() * 150)),
                            id: data[i]['id']
                        });
                    }
                }
                for (var k = -15; k < 16; k++) {
                    //const newDay = moment(SelectedDay).add(i, 'day')
                    var newDay = day.timestamp + k * 24 * 60 * 60 * 1000;
                    newDay = new Date(newDay)
                    var strTime = newDay.toISOString().split('T')[0]
                    if (!items[strTime]) {
                        items[strTime] = []
                    }
                    //return newItems
                }
                const SelectedDay = new Date(day.timestamp);
                for (var k = -15; k < 16; k++) {
                    //const newDay = moment(SelectedDay).add(i, 'day')
                    var newDay = day.timestamp + k * 24 * 60 * 60 * 1000;
                    newDay = new Date(newDay)
                    var strTime = newDay.toISOString().split('T')[0]
                    if (!items[strTime]) {
                        items[strTime] = []
                    }

                }
                // const newItems = {};
                // Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
                // this.setState({
                //     items: newItems
                // });

            }
        });
        // Alert.alert(newItems["2018-11-12"].name)

        //Alert.alert(response)
        //this.fetchDataFromApi();
        //header = this.state.data["header"];
        //header = this.state.items["header"];
        //time = this.state.data["startTime"]

        //console.log(this.state.items);
        // console.log(`Load Items for ${day.year}-${day.month}`);
    }

    renderItem(item) {
        return (
            <View style={[styles.item, {height: item.height}]}><Text>{item.name}</Text>
            </View>
        );
    }

    renderEmptyDate(day) {
        return (
            <View style={styles.emptyDate}><Text>Nothing scheduled - Go feed ducks!</Text></View>
=======
                monthFormat={'yyyy'}
            />
        );
    }

    loadItems(day) {
        const {items} = this.state
        fetch('http://durian-django-env.nihngkspzc.us-east-1.elasticbeanstalk.com/event/').then(function (response) {
            return response.json()
        }).then(function(data) {
            const newItems = {}
            for (var i = 0; i < data.length; i++) {
                var time = data[i]['startTime']
                var header = data[i]['header']
                time = new Date(time)
                var strTime = time.toISOString().split('T')[0]
                if (!items[strTime]){
                    items[strTime] = [];
                }
                items[strTime].push({
                    name: header,
                    height: Math.max(50, Math.floor(Math.random() * 150)),
                    id: data[i]['id']
                });
                this.setState({items: Set(this.state.items)})
                //return newItems
            }


        });
        // Alert.alert(newItems["2018-11-12"].name)

        //Alert.alert(response)
        //this.fetchDataFromApi();
        //header = this.state.data["header"];
        //header = this.state.items["header"];
        //time = this.state.data["startTime"]

        //console.log(this.state.items);
        // console.log(`Load Items for ${day.year}-${day.month}`);
    }

    renderItem(item) {
        return (
            <View style={[styles.item, {height: item.height}]}><Text>{item.name}</Text></View>
        );
    }

    renderEmptyDate() {
        return (
            <View style={styles.emptyDate}><Text>This is empty date!</Text></View>
>>>>>>> a4c641d8453506fd03de70378b10780d0fe12cd3
        );
    }

    rowHasChanged(r1, r2) {
        return r1.name !== r2.name;
    }

    timeToString(time) {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
    }
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'lightblue',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
    },
    emptyDate: {
        height: 15,
<<<<<<< HEAD
        flex: 1,
=======
        flex:1,
>>>>>>> a4c641d8453506fd03de70378b10780d0fe12cd3
        paddingTop: 30
    }
});