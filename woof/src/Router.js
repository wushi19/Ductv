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

export default class Routes extends Component {
	render() {
		return (
			<Router>
				<Stack key="root" hideNavBar={true}>
					<Scene
						key="startPage"
						component={startPage}
						title="startPage"
						initial={true}
						hideNavBar={true}
					/>

					<Scene
						key="login"
						component={Login}
						title="Login"
					/>

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
						key="calendar"
						component={calendar}
						title="calendar"
					/>
					<Scene
						key="enterTask"
						component={enterTask}
						title="enterTask"
					/>
					<Scene
						key="todolist"
						component={todolist}
						title="todolist"
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
					<Scene
						key="userhome"
						component={userhome}
						title="userhome"
					/>
				</Stack>
			</Router>
		)
	}
}