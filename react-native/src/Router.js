import React, { Component } from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';

import Login from './pages/Login';
import signUp from './pages/signUp';
import home from './pages/Home';

export default class Routes extends Component<{}> {
	render() {
		return(
			<Router>
			    <Stack key="root" hideNavBar={true}>
			      <Scene key="login" component={Login} title="Login" initial={true}/>
			      <Scene key="signUp" component={signUp} title="signUp"/>
                  <Scene key="home" component={home} title="home"/>
			    </Stack>
			 </Router>
			)
	}
}
