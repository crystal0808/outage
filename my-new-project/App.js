import React from 'react';
import {
    StyleSheet,
    ScrollView,
    SectionList,
    Text,
    View,
    ListView,
    Button,
    TextInput,
    TouchableHighlight,
    Navigator,
    AppRegistry
} from 'react-native';

import HomeScreen from './HomeScreen'
import ProfileScreen from './ProfileScreen'
import {
    createStackNavigator,
} from 'react-navigation';

const App = createStackNavigator({
    Home: { screen: HomeScreen },
    Profile: { screen: ProfileScreen },
});

export default App;
/*

export default class App extends React.Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            text: '',
            dataSource: ds.cloneWithRows(['Outage #: 123456, Outage Type : Planned', 'Outage #: 123456, Outage Type : Planned']),
        };

    }

    render() {
        return (<View style={styles.container}>
                <View style={styles.item}><Text style={styles.textStyle}>username：</Text>
                    <TextInput
                        ref="inputLoginName"
                        autoFocus={true}
                        underlineColorAndroid="gray"
                        placeholder="Please enter username"
                        clearTextOnFocus={true}
                        clearButtonMode="while-editing"
                        style={{flex: 1}}
                        onChangeText={(input) => this.setState({username: input})}
                    ></TextInput>
                </View>
                <View style={styles.item}><Text style={styles.textStyle}>password：</Text>
                    <TextInput
                        ref="inputLoginPwd"
                        underlineColorAndroid="gray"
                        placeholder="Please enter password"
                        clearTextOnFocus={true}
                        clearButtonMode="while-editing"
                        style={{flex: 1}}
                        onChangeText={(input) => this.setState({userpwd: input})}></TextInput>
                </View>
                <TouchableHighlight style={styles.login}
                                    underlayColor='transparent'
                                    onPress={() => this.loginInMainpage()}><Text
                    style={styles.loginText}>Login</Text></TouchableHighlight>
            </View>
        );
    }

    /!**
     * 登录进入主页面
     *!/
    loginInMainpage() {
        console.log(this.props.navigator);
        this.refs.inputLoginName.blur();
        this.refs.inputLoginPwd.blur();
        this.props.navigator.resetTo({
            component: MainPage,
            params: {
                logNmae: this.state.username,
                logPwd: this.state.userpwd,
                parentComponent: this,
                ...this.props
            },
        });
    }

    setLoginName(input) {
        this.setState = {inputName: input}
    }

    setLoginPwd(input) {
        this.setState = {inputPwd: input}
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10
    },
    textStyle: {
        fontSize: 18,
        color: 'black',
        marginRight: 10
    },
    login: {
        height: 40,
        backgroundColor: 'green',
        margin: 20,
        justifyContent: 'center',
    },
    loginText: {
        fontSize: 20,
        alignSelf: 'center',
        color: '#FFF'
    }
});
*/
