import React from 'react';
import UpdateScreen from "./UpdateScreen";
import {
    StyleSheet,
    ScrollView,
    SectionList,
    Text,
    View,
    FlatList,
    ListView,
    TextInput,
    TouchableHighlight,
    Navigator,
    AppRegistry
} from 'react-native';
import {Button} from 'react-native-elements';

class ProfileScreen extends React.Component {
    static navigationOptions = {
        title: 'Outage List',
    };

    constructor(props) {
        super(props);
        this.state = {
            outageList: [{key: "Outage #: 123456, Location City: Duarte"},
                {key: "Outage #: 987123, Location City: Duarte"},
                {key: "Outage #: 123456, Location City: Pasadena"},
                {key: "Outage #: 81237, Location City: Covina"},
                {key: "Outage #: 81237, Location City: Glendora"},
                {key: "Outage #: 987123, Location City: Glendora"},],
        }
    }

    render() {
        const {navigate} = this.props.navigation;
        var outageList = [];
        outageList = this.state.outageList;
        console.log(this.state.outageList)
        return (
            // noinspection JSAnnotator
            //  this.state.outageList.map((item, i) => {
            //       console.log(item);
            <View>
                <FlatList
                    data={this.state.outageList}
                    renderItem={({item}) => <Button
                        //  key = {i}
                        title={item.key}
                        //color="#841584"
                        buttonStyle={{
                            //backgroundColor: "rgba(92, 99,216, 1)",
                            backgroundColor: 'skyblue',
                            //width: 300,
                            height: 80,
                            borderColor: "black",
                            borderWidth: 5,
                            borderRadius: 5
                        }}
                        onPress={() =>
                            navigate('Update', {name: 'Jane'})
                        }
                    />}
                />
            </View>
            //   })

        );
    }
    componentDidMount() {
        console.log("didmont")
        fetch('http://192.168.43.110:3000/outageList'//, {
            // method: 'GET',
            // headers: {
            //     Accept: 'application/json',
            //     'Content-Type': 'application/json',
            // },
            //}
        ).then((response)=>response.json())
            .then ((responseJson) =>
            {
                console.log("this is it!")
                console.log(responseJson);
            }).catch(function(err) {
            console.log(err);
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
})
export default ProfileScreen;