import React, { Component } from 'react';
import { Router, Stack, Scene } from 'react-native-router-flux';

import Login from './pages/Login';
import signUp from './pages/signUp';
import home from './pages/Home';
import calendar from './pages/Calendar';
import enterTask from './pages/EnterTaskScreen';

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
				</Stack>
			</Router>
		)
	}
}