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

import App from "./App";
class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Welcome',
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
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
                                    onPress={() => navigate('Profile', { name: 'Jane' })}><Text
                    style={styles.loginText}>Login</Text></TouchableHighlight>
            </View>
        );
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
        marginRight: 10,
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
export default HomeScreen;