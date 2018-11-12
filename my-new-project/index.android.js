import React, {Component} from 'react';
import {
    AppRegistry,
    Navigator
} from 'react-native';
import LoginScene from './scene/LoginScene';

export default class Login extends Component {

    renderScene = (route, navigator) => {
        return(
            <route.scene
                navigator={navigator}/>
        );
    }
    initialRoute = {
        scene: LoginScene,
    }

    render() {
        return (
            <Navigator
                initialRoute={this.initialRoute}
                renderScene={this.renderScene}/>
        );
    }
}

AppRegistry.registerComponent('Login', () => Login);