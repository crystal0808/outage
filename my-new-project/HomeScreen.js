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
            <Button
                title="Go to Jane's profile"
                onPress={() =>
                    navigate('Profile', { name: 'Jane' })
                }
            />
        );
    }
}
export default HomeScreen;