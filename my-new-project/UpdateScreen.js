import React from 'react';
import HomeScreen from "./HomeScreen";
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
    AppRegistry,
    Picker
} from 'react-native';
import {Button} from 'react-native-elements';

class UpdateScreen extends React.Component {
    static navigationOptions = {
        title: 'Update Outage',
    };

    constructor(props) {
        super(props);
        this.state = {
            OutageType:'test',
            City:'',
            ZipCode:'',
            Address:'',
            CustomersImpacted:0,
            Start_Date_Time:'',
            Estimated_Restoration_Time:'',
            Reason:'',
            Crew_Status:'',
            outage: [{
                key: "OutageType",
                desc: "Outage Type",
                value: "Planned"
            },
                {
                    key: "City",
                    desc: "Location City",
                    value: "Glendora"
                },
            {
                key: "ZipCode",
                desc: "Location ZipCode",
                value: "91741"
            },
            {
                key: "Address",
                desc: "Address",
                value: "Hotel Transylvania"
            },
            {
                    key: "CustomersImpacted",
                    desc: "Customers Impacted",
                    value: "100"
                },
                {
                    key: "Start_Date_Time",
                    desc: "Outage Start Date Time",
                    value: "11/1/2018 9:45 AM"
                },
                {
                    key: "Estimated_Restoration_Time",
                    desc: "Estimated Restoration Time",
                    value: "11/1/2018 3:30 PM"
                },
                {
                    key: "Reason",
                    desc: "Reason",
                    value: "Wire Down"
                },
                {
                    key: "Crew_Status",
                    desc: "Crew Status",
                    value: "Not Started"
                },
    ],
    }
}

    postData(url, data) {
        // Default options are marked with *
        return fetch(url, {
            body: JSON.stringify({key: "Outage #: 123456, Location City: Duarte"}), // must match 'Content-Type' header
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, same-origin, *omit
            headers: {
                'user-agent': 'Mozilla/4.0 MDN Example',
                'content-type': 'application/json'
            },
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // *client, no-referrer
        })
            .then(response => response.json()) // parses response to JSON
    }


    updateOutage() {
        console.log("onclick of save update")
    console.log(this.state.ZipCode)
    /*fetch('http://192.168.43.110:3000/'//, {
       // method: 'GET',
       // headers: {
       //     Accept: 'application/json',
       //     'Content-Type': 'application/json',
       // },
    //}
    ).then((response)=>response.json())
        .then ((responseJson) =>
        {
            console.log(responseJson);
        }).catch(function(err) {
        console.log(err);
        });*/
    this.postData('http://192.168.43.110:3000', {answer: 42})
        .then(data => console.log(data)) // JSON from `response.json()` call
        .catch(error => console.error(error))

}

render()
{
    const {navigate} = this.props.navigation;
    var outageList = [];
    outageList = this.state.outageList;
    console.log(this.state.outageList)
    return (
        // noinspection JSAnnotator
        //  this.state.outageList.map((item, i) => {
        //       console.log(item);
        <View style={ {flexWrap:'wrap',flexDirection:'row',backgroundColor:"darkgray",marginTop:20}}>
            <Text style={styles.item}>Outage Type: </Text>
            {/*<TextInput
                style={{height: 40, width:150}}
                placeholder="Please select the outage type!"
                onChangeText={(text) => this.setState({text})}
            />*/}
            <Picker
                selectedValue={this.state.OutageType}
                style={{ height: 50, width: 150 }}
                onValueChange={(itemValue, itemIndex) => this.setState({OutageType: itemValue})}>
                <Picker.Item label="Planned" value="Planned" />
                <Picker.Item label="Not Planned" value="NotPlanned" />
            </Picker>
            <Text style={styles.item}>Location City: </Text>
            <TextInput
                style={{height: 40, width:150}}
                placeholder="Please enter the city"
                value = {this.state.City}
                onChangeText={(text) => this.setState({City:text})}
            />
            <Text style={styles.item}>Location ZipCode: </Text>
            <TextInput
                style={{height: 40, width:150}}
                placeholder="Please enter the Zip Code"
                value = {this.state.ZipCode}
                onChangeText={(text) => this.setState({ZipCode:text})}
            />
            <Text style={styles.item}>Address: </Text>
            <TextInput
                style={{height: 40, width:150}}
                placeholder="Please enter the Address"
                value = {this.state.Address}
                onChangeText={(text) => this.setState({Address:text})}
            />
            <Text style={styles.item}>Customers Impacted: </Text>
            <TextInput
                style={{height: 40, width:150}}
                placeholder="Please enter the Customers Impacted"
                value = {this.state.Customers_Impacted}
                onChangeText={(text) => this.setState({Customers_Impacted:text})}
            />
            <Text style={styles.item}>Start Date Time: </Text>
            <TextInput
                style={{height: 40, width:150}}
                placeholder="Please enter the Outage Start Date Time"
                value = {this.state.Start_Date_Time}
                onChangeText={(text) => this.setState({Start_Date_Time:text})}
            />
            <Text style={styles.item}>Estimated Restoration Time: </Text>
            <TextInput
                style={{height: 40, width:150}}
                placeholder="Please enter the Estimated Restoration Time"
                value = {this.state.Estimated_Restoration_Time}
                onChangeText={(text) => this.setState({Estimated_Restoration_Time:text})}
            />
            <Text style={styles.item}>Reason: </Text>
            <TextInput
                style={{height: 40, width:150}}
                placeholder="Please enter the Reason"
                value = {this.state.Reason}
                onChangeText={(text) => this.setState({Reason:text})}
            />
            <Text style={styles.item}>Crew Status: </Text>
            <Picker
                selectedValue={this.state.Crew_Status}
                style={{ height: 50, width: 150 }}
                onValueChange={(itemValue, itemIndex) => this.setState({Crew_Status: itemValue})}>
                <Picker.Item label="Started" value="Started" />
                <Picker.Item label="Not Started" value="NotStarted" />
            </Picker>
            <Button
                //  key = {i}
                title={"Update"}
                //color="#841584"
                buttonStyle={{
                    //backgroundColor: "rgba(92, 99,216, 1)",
                    backgroundColor: 'yellow',
                    //width: 300,
                    height: 30,
                    //borderColor: "black",
                    borderWidth: 5,
                    borderRadius: 5
                }}
                onPress={() =>{this.updateOutage()}
                }
            />
        </View>
        //   })

    );
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
        width:200,
    },
})
export default UpdateScreen;