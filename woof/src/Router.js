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

const TabIcon = ({ selected}) => {
    return (
        <Text style={{color: selected ? 'red' :'black'}}> </Text>
    );
}

export default class Routes extends Component {
	render() {
		return (
			<Router>
                <Scene key="root">
					<Scene key="Login" initial component={Login} hideNavBar />
					<Scene key="tabbar" tabs={true} hideNavBar={true} tabBarStyle={{backgroundColor: '#c58ff7'}}>
						<Scene key="userhome" title="Home" icon={TabIcon} hideNavBar>
							<Scene component={userhome} />
						</Scene>

						<Scene key="todolist" title="To Do List" icon={TabIcon} hideNavBar>
							<Scene component={todolist} />
						</Scene>

						<Scene key="calendar" title="Calendar" icon={TabIcon} hideNavBar>
							<Scene component={calendar} />
						</Scene>
					</Scene>

				<Scene
					key="signUp"
					component={signUp}
					title="signUp"
				/>

				<Scene
					key="home"
					component={home}
					title="home"
				/>

				<Scene
					key="enterTask"
					component={enterTask}
					title="enterTask"
				/>

				<Scene
					key="testAsyncStorage"
					component={testAsyncStorage}
					title="testAsyncStorage"
				/>
				<Scene
					key="editEvent"
					component={editEvent}
					title="editEvent"
				/>
				<Scene
					key="addEvent"
					component={addEvent}
					title="addEvent"
				/>
				<Scene
					key="moreInfoEvent"
					component={moreInfoEvent}
					title="moreInfoEvent"
				/>
				<Scene
					key="editTask"
					component={editTask}
					title="editTask"
				/>
				</Scene>
			</Router>
		);
	}
}