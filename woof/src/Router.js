import React, { Component } from 'react';
import { Router, Stack, Scene } from 'react-native-router-flux';

import Login from './pages/Login';
import signUp from './pages/signUp';
import home from './pages/Home';
import calendar from './pages/Calendar';
import enterTask from './pages/EnterTaskScreen';
import todolist from './pages/todolist';
import testAsyncStorage from './pages/TestAsyncStorage';
import startPage from "./pages/startPage";
import editEvent from "./pages/editEvent";
import addEvent from "./pages/addEvent";
import moreInfoEvent from "./pages/moreInfoEvent";
import editTask from "./pages/editTask";
import userhome from "./pages/userhome";
import {Text} from "react-native-elements";
import {Icon} from "react-native-elements";

const TabIcon = ({ selected, title}) => {
    return (
        <Text style={{color: selected ? 'white' :'white'}}> {title} </Text>
    );
}

const ToDoTabIcon = () => {
    return <Icon name='list' size={28} type={"font-awesome"} color={'white'}  />
};

const CalendarTabIcon = () => {
    return <Icon name='calendar' size={28} type={"font-awesome"} color={'white'}  />
};

const HomeTabIcon = () => {
    return <Icon name='home' size={28} type={"font-awesome"} color={'white'}  />
};

export default class Routes extends Component {
	render() {
		return (
			<Router>
                <Scene key="root">
					<Scene key="Login" initial component={Login} hideNavBar />
					<Scene key="tabbar" tabs={true} hideNavBar={true} tabBarStyle={{backgroundColor: '#1c1c1c'}}>

						<Scene key="todolist" title="To Do List" icon={ToDoTabIcon} hideNavBar>
							<Scene component={todolist} />
						</Scene>

                        <Scene key="userhome" title="Home" icon={HomeTabIcon} hideNavBar>
                            <Scene component={userhome} />
                        </Scene>

						<Scene key="calendar" title="Calendar" icon={CalendarTabIcon} hideNavBar>
							<Scene component={calendar} />
						</Scene>
					</Scene>

				<Scene
					key="signUp"
					hideNavBar
					component={signUp}
					title="signUp"
				/>

				<Scene
					key="home"
					hideNavBar
					component={home}
					title="home"
				/>

				<Scene
					key="enterTask"
					hideNavBar
					component={enterTask}
					title="enterTask"
				/>

				<Scene
					key="testAsyncStorage"
					hideNavBar
					component={testAsyncStorage}
					title="testAsyncStorage"
				/>
				<Scene
					key="editEvent"
					hideNavBar
					component={editEvent}
					title="editEvent"
				/>
				<Scene
					key="addEvent"
					hideNavBar
					component={addEvent}
					title="addEvent"
				/>
				<Scene
					key="moreInfoEvent"
					hideNavBar
					component={moreInfoEvent}
					title="moreInfoEvent"
				/>
				<Scene
					key="editTask"
					hideNavBar
					component={editTask}
					title="editTask"
				/>
				</Scene>
			</Router>
		);
	}
}