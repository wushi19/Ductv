import React from 'react';
import { Alert, StyleSheet, AsyncStorage, StatusBar, ScrollView, FlatList, TouchableOpacity} from 'react-native';
import { Text, View, SwipeRow, Button } from 'native-base';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';
import Moment from 'react-moment';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';


// const getuserId = async () => {
//   let userId = '';
//   try {
//     userId = await AsyncStorage.getItem('userId') || 'none';
//   } catch (error) {
//     // Error retrieving data
//     Alert.alert("here");
//     console.log(error.message);
//   } t@t.com
//   return userId;
// }


//   const getProfId = async () => {
//     let profileId = '';
//     try {
//       profileId = await AsyncStorage.getItem('profileId') || 'none';
//     } catch (error) {
//       // Error retrieving data
//       console.log(error.message);
//     }
//     return profileId;
//   } 

export default class todolist extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: null,
            isLoading: true,
            dataSource: null,
            header: null,
            description: null,
            priority: null,
            userId: null,
            duration: null,
            due: null,
            owner: 'http://durian-django-env.nihngkspzc.us-east-1.elasticbeanstalk.com/profile/2/',
            task: null,
            curTime: null,
            item: null,

        }
    }

    componentDidMount() {
        setInterval(function(){this.setState({curTime: new  Date().toLocaleString()});}.bind(this), 1000);
        return fetch('http://durian-django-env.nihngkspzc.us-east-1.elasticbeanstalk.com/task/?format=json')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    dataSource: responseJson
                })
            })
            .catch((error) => {
                console.log(error)
            });
    }

    // json_funtion = () => {
    //     fetch('http://durian-django-env.nihngkspzc.us-east-1.elasticbeanstalk.com/task/')
    //     .then(response => response.json())
    //     .then(data => {
    //         var json_array = data[0];           //get the first obj from django
    //         var id = json_array.id.toString();  //get the id
    //         var url = json_array.url;           //get url
    //         var header = json_array.header;     //get header
    //         var priority = json_array.priority.toString();  //get priority
    //         var duration = json_array.duration.toString();  //get duration
    //         var due = json_array.due.toString();            //get duedate
    //         var owner = json_array.owner;                   //get owner
    //         Alert.alert(header);
    //     })
    //     .catch(error => console.log(error));

    // }

    goHome() {
        Actions.userhome()
    }

    enterTask() {
        Actions.enterTask()
    }

    editTask(){
        Actions.editTask()
    }

    // getEvent = (number) => {
    //     const { data } = this.state;
    //     response = fetch('http://durian-django-env.nihngkspzc.us-east-1.elasticbeanstalk.com/task/')
    //         .then(function (response) {
    //             return response.json()
    //         })
    //         .then(data => {
    //             var json_array = data[number];           //get the first obj from django
    //             // var id = json_array.id.toString();  //get the id
    //             // var url = json_array.url;           //get url
    //             header = json_array.header;             //get header
    //             description = json_array.description;
    //             priority = json_array.priority;
    //             due = json_array.due;
    //             Alert.alert(header);
    //         })
    //         .catch(function (error) {
    //             console.log('There has been a problem with your fetch operation: ' + error.message);
    //             // ADD THIS THROW error
    //             throw error;
    //             //t@t.com
    //         });
    // }

    deleteData(taskId) {
        var url = "http://durian-django-env.nihngkspzc.us-east-1.elasticbeanstalk.com/task/";
        return fetch(url + '/' + taskId +'/', {
          method: 'DELETE'
        })
    }

    updateData() {
        return fetch('http://durian-django-env.nihngkspzc.us-east-1.elasticbeanstalk.com/task/?format=json')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    dataSource: responseJson
                })
            })
            .catch((error) => {
                console.log(error)
            });
    }

    seeTask(task) {
        Actions.editTask({
            header: task.header,
            description: task.description,
            priority: task.priority,
            duration: task.duration,
            due: task.due,
            id: task.id,
            url: "http://durian-django-env.nihngkspzc.us-east-1.elasticbeanstalk.com/task/" + task.id + "/"
        });

    }
    render() {

        if (this.state.isLoading) {

            return (
                <View style={styles.container}>
                    <Text>Content is loading</Text>
                </View>
            )

        } else {
            // let tasks = this.state.dataSource.map((val, key) => {
            //     return <View key={key} style={styles.item}>
            //         <Text style={{ fontWeight: 'bold' }}>
            //             {val.header} </Text>
            //         <Text> {val.description} </Text>
            //     </View>
            // });
            const config = {
                velocityThreshold: 0.3,
                directionalOffsetThreshold: 80
            };
            return (

                <View style={styles.container}>
                    <StatusBar barStyle="light-content" />
                    <Text style={styles.title}>To Do</Text>
                    <Text style={styles.time}>{this.state.curTime}</Text>
                    <ScrollView style={styles.mostImportantScroll}>
                        <FlatList
                            data={this.state.dataSource}
                            keyExtrator = {this._keyExtractor}
                            renderItem={({item}) => 
                            
                            <SwipeRow
                                leftOpenValue={100}
                                rightOpenValue={-100}
                                left={
                                    <Button success onPress={() => this.seeTask(item)}>
                                        <Text> edit </Text>
                                    </Button>
                                }
                                body={
                                    <Text style={{paddingLeft: 15, fontWeight: 'bold'}}>
                                        {item.header}
                                        <Text style={{fontWeight: 'normal'}}> {item.description} </Text>
                                    </Text>
                                }
                                right={
                                    <Button danger onPress={() => this.deleteData(item.id)
                                        .then(this.updateData())}>
                                        <Text> delete </Text>
                                    </Button>
                                }
                            /> }
                        />
                    
                    </ScrollView>
            
                </View>
            );
        }

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7B6F92',
    },

    item: {
        flex: 1,
        alignSelf: 'stretch',
        margin: 10,
        // alignItems: 'center',
        // justifyContent: 'center',
        borderBottomWidth: 0,
        borderBottomColor: '#eee'
    },
    // title: {
    //     textAlign: 'center',
    //     color: 'white',
    //     fontSize: 20,
    //     fontWeight: '500',
    //     marginTop: 60,
    //     alignItems: 'center',
    //     justifyContent: 'center'
    // },
    title: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 36,
        marginTop: 60,
        marginBottom: 20,
        fontWeight: '300'
    },
    mostImportantScroll: {
        flex: 0.5,
    },
    time: {
        textAlign: 'center',
        color: 'white',
        fontWeight: '500',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
