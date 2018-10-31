import React, { Component } from 'react';
import { Router, Stack, Scene } from 'react-native-router-flux';

import Login from './pages/Login';
import signUp from './pages/signUp';
import home from './pages/Home';
import calendar from './pages/Calendar';
import enterTask from './pages/EnterTaskScreen';
import taskdjangotest from './component/TaskClass';
import todolist from './component/todolist';

export default class Routes extends Component {
	render() {
		return (
			<Router>
				<Stack key="root" hideNavBar={true}>
					<Scene
						key="login"
						component={Login}
						title="Login"
						initial={true}
						hideNavBar={true}
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
						key="taskdjangotest"
						component={taskdjangotest}
						title="taskdjangotest"
					/>
					<Scene
						key="todolist"
						component={todolist}
						title="todolist"
					/>
				</Stack>
			</Router>
		)
	}
}