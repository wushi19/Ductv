import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet, Alert
} from 'react-native';
import {Agenda} from 'react-native-calendars';

export default class AgendaScreen extends Component {
  constructor(props) {
      super(props);
      this.state = {
          items: {},
          loading: false,
          data: [],
          error: null,
          refreshing: false,
          base_url: "http://durian-django-env.nihngkspzc.us-east-1.elasticbeanstalk.com"
      };
  }

    componentDidMount() {
        this.fetchDataFromApi();

    }

    fetchDataFromApi = ()  => {
        const url = "http://durian-django-env.nihngkspzc.us-east-1.elasticbeanstalk.com/event/1/?format=json";

        this.setState({ loading: true });

        fetch(url)
            .then(res => res.json())
            .then(res => {

                this.setState({
              //      items: res,
                    data: res,
                    error: null,
                    loading: false,
                    refreshing: false
                });
            })
            .catch(error => {
                this.setState({ error, loading : false });
            })
    };

  render() {
    return (
      <Agenda
          items={this.state.items}
          loadItemsForMonth={this.loadItems.bind(this)}
          selected={this.onDayPress}
          renderItem={this.renderItem.bind(this)}
          renderEmptyDate={this.renderEmptyDate.bind(this)}
          rowHasChanged={this.rowHasChanged.bind(this)}
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
    setTimeout(() => {
        var start = day;
        var header = "Did not save";
        // fetch('http://durian-django-env.nihngkspzc.us-east-1.elasticbeanstalk.com/event.json')
        //     .then(response => response.json())
        //     .then(data => {
        //         var json_array = data[0]
        //         var id = json_array.id.toString();
        //         var url = json_array.url;
        //         header = json_array.header;
        //         start = json_array.startTime;
        //         var end = json_array.endTime;
        //         var location = json_array.location.toString();
        //
        //
        //     })
        //     .catch(error => console.log(error));
        this.fetchDataFromApi();
        header = this.state.data["header"];
        //header = this.state.items["header"];
        time = this.state.data["startTime"]
        time = new Date(time)
        var strTime = time.toISOString().split('T')[0]
        this.state.items[strTime] = [];
        //const numItems = Math.floor(Math.random() * 5);
        //strTime = Date
        this.state.items[strTime].push({
            name: header,
            height: Math.max(50, Math.floor(Math.random() * 150))
        });
      //console.log(this.state.items);
      const newItems = {};
      Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
      this.setState({
        items: newItems
      });
    }, 1000);
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