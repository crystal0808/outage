import React from 'react';
import HomeScreen from "./HomeScreen";
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

class ProfileScreen extends React.Component {
    static navigationOptions = {
        title: 'ProfileScreen',
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
export default ProfileScreen;