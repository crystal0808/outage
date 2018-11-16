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
    AppRegistry, Image
} from 'react-native';
//import Expo from 'expo'
import App from "./App";
class HomeScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {signedIn: false, name: "", photoUrl: ""}
    }
    signIn = async () => {
        try {
            const result = await Expo.Google.logInAsync({
                androidClientId:
                    "613517643980-6u5fab849rfuqcumrpioifnufmmcontj.apps.googleusercontent.com",
                //iosClientId: YOUR_CLIENT_ID_HERE,  <-- if you use iOS
                scopes: ["profile", "email"]
            })

            if (result.type === "success") {
                this.setState({
                    signedIn: true,
                    name: result.user.name,
                    photoUrl: result.user.photoUrl
                })
            } else {
                console.log("cancelled")
            }
        } catch (e) {
            console.log("error", e)
        }
    }
    static navigationOptions = {
        title: 'Welcome',
    };
/*    render() {

        return (
            <View style={styles.container}>
                <View style={styles.item}><Text style={styles.textStyle}>USERNAME：</Text>
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
                <View style={styles.item}><Text style={styles.textStyle}>PASSWORD：</Text>
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
                                 //   onPress={() => navigate('Profile', { name: 'Jane' })}><Text
                                    onPress={() => {this.signIn()}}><Text
                    style={styles.loginText}>Login</Text></TouchableHighlight>
            </View>
        );
    }*/
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                {this.state.signedIn ? (
                    <TouchableHighlight style={styles.login}
                                        underlayColor='transparent'
                                        onPress={() => navigate('Profile', { name: 'Jane' })}><Text
                        style={styles.loginText}>Login</Text></TouchableHighlight>
                ) : (
                    <LoginPage signIn={this.signIn} />
                )}
            </View>
        )
    }
}

const LoginPage = props => {
    return (
        <View>
            <Text style={styles.header}>Sign In With Google</Text>
            <Button title="Sign in with Google" onPress={() => props.signIn()} />
        </View>
    )
}
const LoggedInPage = props => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Welcome:{props.name}</Text>
            <TouchableHighlight style={styles.login}
                                underlayColor='transparent'
                                onPress={() => props.navigate('Profile', { name: 'Jane' })}><Text
                style={styles.loginText}>Welcome</Text></TouchableHighlight>
        </View>
    )
}
const styles = StyleSheet.create({
    container0: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 150
    },
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    },
    header: {
        fontSize: 25
    },
    image: {
        marginTop: 15,
        width: 150,
        height: 150,
        borderColor: "rgba(0,0,0,0.2)",
        borderWidth: 3,
        borderRadius: 150
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
        width:80,
        justifyContent: 'center',
    },
    loginText: {
        fontSize: 20,
        alignSelf: 'center',
        color: '#FFF'
    }
});
export default HomeScreen;