import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Alert,
} from 'react-native';
import {Agenda} from 'react-native-calendars';

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
        flex:1,
        paddingTop: 30
    }
});