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
import Icon from 'react-native-vector-icons/FontAwesome';
//const url = 'http://192.168.43.110:3000';
const url = 'http://172.20.10.6:3000';

class ProfileScreen extends React.Component {
    static navigationOptions = {
        title: 'Outage List',
    };

    constructor(props) {
        super(props);
        this.state = {
            OutageId:'',
            outageList: [],
            test:[],
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
                    renderItem={({item, i}) => <Button
                        icon={{
                            name: 'home',
                            size: 30,
                            color: 'white'
                        }}
                        title={"#" + item.ID + " " + item.CITY}
                        fontSize = {24}
                        //color="#841584"
                        buttonStyle={{
                            //backgroundColor: "rgba(92, 99,216, 1)",
                            backgroundColor: 'skyblue',
                            //width: 300,
                            height: 80,
                            borderColor: "transparent",
                            borderWidth: 5,
                            borderRadius: 5,
                        }}
                        onPress={() =>
                            navigate('Update', {OutageId: item.ID})
                        }
                    />}
                    keyExtractor={(item, index) => index.toString()}

                />
            </View>
            //   })

        );
    }
    componentDidMount() {
        console.log("didmont")
        var resp = [];
        return fetch(url + '/outageList'//, {
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
                //  console.log(responseJson);
                this.setState({
                    outageList: responseJson,
                }, function(){
                    //          console.log(this.state.outageList)
                });


                //       resp = responseJson;
            }).catch(function(err) {
                console.log(err);
            });
        //  console.log(this.state.test)
        //  this.setState({test:resp})
        //   console.log("test")
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