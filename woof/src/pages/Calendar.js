import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableHighlight,
    StyleSheet, Alert, StatusBar
} from 'react-native';
import {Agenda} from 'react-native-calendars';
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/Ionicons";
import {Actions} from "react-native-router-flux";
import PriorityQueue from "js-priority-queue";

export default class AgendaScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first: true,
            items: {},
            //tasks: new PriorityQueue({ comparator: {function(a, b) { return b - a}} }),
            tasks: new PriorityQueue(),
            markedDates: {},
            gameCount: 0
        };
    }

    render() {
        return (
            <Agenda
                //minDate={'2018-01-01'}
                //pastScrollRange={50}
                items={this.state.items}
                //tasks={this.state.tasks}
                loadItemsForMonth={this.loadItems.bind(this)}
                //tasks = {this.makeEvents.bind(this)}
                selected={this.onDayPress}
                renderItem={this.renderItem.bind(this)}
                markedDates={this.state.markedDates}
                markingType={'period'}
                renderEmptyDate={this.renderEmptyDate.bind(this)}
                rowHasChanged={this.rowHasChanged.bind(this)}
                monthFormat={'yyyy'}
                //button={this.addButton()}
            />
        );
    }


    goHome() {
        Actions.home()
    }

    addEvent() {
        Actions.addEvent()
    }

    seeEvent(item) {
        Actions.moreInfoEvent({
            id: item.id,
            url: item.url,
            header: item.name,
            startTime: item.startTime,
            endTime: item.endTime,
            desc: item.desc,
            dur: item.duration,
            date: item.date,
            loc: item.loc
        })
    }

    loadItems(day) {
        const {items} = this.state
        const {tasks} = this.state
        if (this.state.first) {
            const AWS = 'http://durian-django-env.nihngkspzc.us-east-1.elasticbeanstalk.com/event/'
            const Heroku = 'https://ductv.herokuapp.com/event/'
            fetch(AWS).then(function (response) {
                return response.json()
            }).then(function (data) {
                const newItems = {}
                for (var i = 0; i < data.length; i++) {
                    var time = data[i]['startTime']
                    var header = data[i]['header']
                    time = new Date(time)
                    var strTime = time.toISOString().split('T')[0]
                    var endtime = new Date(data[i]['endtime'])
                    var len = ((endtime - time) / 60) / 1000
                    var endtime = endtime.toISOString().split('T')[1]
                    var year = strTime.slice(0, 4)
                    if (!items[strTime]) {
                        items[strTime] = [];
                        items[strTime].push({
                            name: header,
                            date: strTime.slice(5, 10) + "-" + year,
                            startTime: time.toISOString().split('T')[1].slice(0, -8),
                            endTime: endtime.slice(0, -8),
                            desc: data[i]['description'],
                            loc: data[i]['location'],
                            height: Math.max(60, Math.floor(len)),
                            duration: len,
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
                            var repeats = 1
                            if (data[i]["recurring"]) {
                                repeats = 10
                            }
                            for (var j = 0; j < repeats; j++) {
                                var time = data[i]['startTime']
                                time = new Date(time)
                                time.setTime(time.getTime() + j * 24 * 60 * 60 * 1000)
                                var strTime = time.toISOString().split('T')[0]
                                items[strTime].push({
                                    name: header,
                                    date: strTime.slice(5, 10) + "-" + year,
                                    startTime: time.toISOString().split('T')[1].slice(0, -8),
                                    recurrence: data[i]["recurring"],
                                    endTime: endtime.slice(0, -8),
                                    desc: data[i]['description'],
                                    loc: data[i]['location'],
                                    height: Math.max(60, Math.floor(len)),
                                    duration: len,
                                    id: data[i]['id']
                                });
                            }

                        }
                    }
                    for (var k = -15; k < 16; k++) {
                        var newDay = day.timestamp + k * 24 * 60 * 60 * 1000;
                        newDay = new Date(newDay)
                        var strTime = newDay.toISOString().split('T')[0]
                        if (!items[strTime]) {
                            items[strTime] = []
                        }
                    }
                    ;
                    for (var k = -15; k < 16; k++) {
                        var newDay = day.timestamp + k * 24 * 60 * 60 * 1000;
                        newDay = new Date(newDay)
                        var strTime = newDay.toISOString().split('T')[0]
                        if (!items[strTime]) {
                            items[strTime] = []
                        }
                    }
                }
            });
            const AWS2 = 'http://durian-django-env.nihngkspzc.us-east-1.elasticbeanstalk.com/task/?format=json'
            const Heroku2 = 'https://ductv.herokuapp.com/task/'
            fetch(AWS2).then(function (response) {
                return response.json()
            }).then(function (data) {
                const newItems = {}
                for (var i = 0; i < data.length; i++) {
                    var header = data[i]['header'].toString()
                    var whatis = data[i]['description'].toString()
                    tasks.queue({
                        name: header,
                        desc: whatis,
                        priority: data[i]['priority'],
                        duration: data[i]['duration'],
                        due: data[i]['due'],
                        height: Math.max(60, Math.floor(Number(data[i]['duration']))),
                        id: "Task - " + data[i]['id'].toString(),
                        die: data[i]['id'] / ((data[i]['priority'] + 1) * data[i]['duration'])
                    });
                }
            });
        }
        const it = this.makeEvents(items)
        const markedD = this.markDays(it)
        this.setState({
            items: it,
            markedDays: markedD
        })
    }

    renderItem(item) {
        const id = item.id.toString()
        const letter = id.slice(0, 1)
        const b = Boolean(letter == "T")
        if (b) {
            return (
                <TouchableHighlight onPress={() => this.seeEvent(item)}>
                    <View style={[styles.task, {height: item.height}]}><Text>{item.name}</Text>
                    </View>
                </TouchableHighlight>
            );
        }
        else {
            return (
                <TouchableHighlight onPress={() => this.seeEvent(item)}>
                    <View style={[styles.item, {height: item.height}]}><Text>{item.name}</Text>
                    </View>
                </TouchableHighlight>
            );
        }
    }

    makeEvents(items) {
        const {tasks} = this.state
        var time = new Date()
        var strTime = time.toISOString().split('T')[0]
        var year = strTime.slice(0, 4)
        while (tasks.length > 0) {
            if (!items[strTime]) {
                items[strTime] = []
                var total = 0
            }
            else {
                const today = items[strTime]
                var total = 0
                for (var i = 0; i < today.length; i++) {
                    total = total + today[i].duration
                }
            }
            total = total + Math.min(tasks.peek().duration, 299)
            if (total < 300) {
                var t = tasks.dequeue()
                var dupe = false
                for (var key in items) {
                    for (var j = 0; j < items[key].length; j++) {
                        if (items[key][j]["id"] == t.id) {
                            dupe = true
                        }
                    }
                }
                if (!dupe) {
                    items[strTime].push({
                        name: t.name,
                        date: strTime.slice(5, 10) + "-" + year,
                        startTime: "",
                        endTime: "",
                        desc: t.desc,
                        loc: "",
                        height: t.height,
                        duration: t.duration,
                        id: t.id
                    });
                    total = total + t.duration
                }
            }
            else {
                total = 0
                time.setTime(time.getTime() + 24 * 60 * 60 * 1000)
                time = new Date(time)
                strTime = time.toISOString().split('T')[0]
            }
        }
        return (items)
    }

    markDays(items) {
        //const {items} = this.state
        const {markedDates} = this.state
        for (var key in items) {
            var day = items[key];
            var total = 0
            for (var i = 0; i < day.length; i++) {
                total = total + day[i].duration
            }
            var col = "#FFFFFF"
            if (total > 0) {
                col = "#d1d0ef"
                if (total >= 150) {
                    col = "#a385cb"
                    if (total > 300) {
                        col = "#774699"
                        if (total > 450) {
                            col = "#4c2359"
                        }
                    }
                }
                markedDates[key] = {startingDay: true, color: col, endingDay: true}
            }

        }
        return (markedDates)
    }


    renderEmptyDate(day) {
        return (
            <TouchableHighlight onPress={() => this.GameOrNah()}>
                <View style={styles.emptyDate}><Text>Nothing scheduled - Go feed ducks!</Text></View>
            </TouchableHighlight>

        );
    }

    GameOrNah() {
        var {gameCount} = this.state
        var game = false
        if (gameCount < 5) {
            gameCount = gameCount + 1
            Alert.alert(gameCount.toString())
        }
        else {
            gameCount = 0
            game = true
        }
        this.setState({
            gameCount: gameCount
        })
        if (game) {
            Actions.userhome()
        }
    }

    addButton() {
            <ActionButton buttonColor='#9b59b6' title="Add New Event" onPress={this.addEvent}/>
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
        //backgroundColor: 'lightblue',
        backgroundColor: '#d0c9e1',
        flex: 1,
        borderRadius: 5,
        padding: 10
    },
    task: {
        //backgroundColor: 'lightcyan',
        backgroundColor: '#eadcd9',
        flex: 1,
        borderRadius: 5,
        padding: 10
    },
    emptyDate: {
        height: 15,
        flex: 1,
        paddingTop: 30
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    }
});