import React from 'react';
import DropdownAlert from 'react-native-dropdownalert';
import ProfileScreen from "./ProfileScreen";
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
const url = 'http://192.168.43.110:3000';
//const url = 'http://172.20.10.6:3000';
//613517643980-6u5fab849rfuqcumrpioifnufmmcontj.apps.googleusercontent.com
class UpdateScreen extends React.Component {
    static navigationOptions = {
        title: 'Update Outage',
    };

    constructor(props) {
        super(props);
        this.state = {
            OutageId : '',
            OutageType:'',
            City:'',
            ZipCode:'',
            Address:'',
            CustomersImpacted:0,
            Start_Date_Time:'',
            Estimated_Restoration_Time:'',
            Reason:'',
            Crew_Status:'',
            updateSuccess: false,
            outage: [],
    }
    console.log(this.props.navigation.getParam("OutageId", ''))
}

    postData(url, data) {
        // Default options are marked with *
        console.log("postData")
        console.log(data)
        return fetch(url, {
            body: JSON.stringify(data), // must match 'Content-Type' header
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
            .then((response)=>response.json())
            .then ((responseJson) =>
            {
                console.log("this is itsss!")
                this.dropdown.alertWithType('success', 'Outage updated successfully',"");
                //  console.log(responseJson);
                this.setState({
                    updateSuccess: true,
                }, function(){
                    //          console.log(this.state.outageList)
                });


                //       resp = responseJson;
            }).catch(function(err) {
                console.log(err);
            });
    }


    updateOutage() {
        console.log("onclick of save update")
  //  console.log(this.state)
        var outage = {
            "ADDRESS": this.state.Address,
             "CITY": this.state.City,
             "CREW_STATUS": this.state.Crew_Status,
             "IMPACTED": this.state.CustomersImpacted,
            "ESTIMATED_RES_TIME": this.state.Estimated_Restoration_Time,
            "TYPE": this.state.OutageType,
             "REASON": this.state.Reason,
             "START_TIME": this.state.Start_Date_Time,
            "ZIPCODE": this.state.ZipCode,
            "ID":this.state.OutageId,

        }
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
    this.postData(url + '/outage/' + this.state.OutageId, {outage})
        .then(data => console.log(data)) // JSON from `response.json()` call
        .catch(error => console.error(error))

}

render()
{
    console.log("render")
    const {navigate} = this.props.navigation;
    var outageList = [];
    outageList = this.state.outageList;
    console.log(this.state.outageList)
    return (
        // noinspection JSAnnotator
        //  this.state.outageList.map((item, i) => {
        //       console.log(item);
        <View style={ {flexWrap:'wrap',flexDirection:'row',backgroundColor:"lightblue",marginTop:20}}>

            <Text style={styles.item}>Outage Type: </Text>
            {/*<TextInput
                style={{height: 40, width:150}}
                placeholder="Please select the outage type!"
                onChangeText={(text) => this.setState({text})}
            />*/}
            <Picker
                selectedValue={this.state.OutageType}
                style={{ height: 50, width: 150,borderColor: 'gray', borderWidth: 1,transform: [
                        { scaleX: 1.1 },
                        { scaleY: 1.1 },
                    ]}}

                onValueChange={(itemValue, itemIndex) => this.setState({OutageType: itemValue})}>
                <Picker.Item label="Planned" value="Planned" />
                <Picker.Item label="Not Planned" value="NotPlanned" />
            </Picker>
            <Text style={styles.item}>Location City: </Text>
            <TextInput
                style={{height: 40, width:150,borderColor: 'gray', borderWidth: 1, fontSize: 18}}
                value = {this.state.City}
                onChangeText={(text) => this.setState({City:text})}
            />
            <Text style={styles.item}>Location ZipCode: </Text>
            <TextInput
                style={{height: 40, width:150,borderColor: 'gray', borderWidth: 1, fontSize: 18}}
                value = {this.state.ZipCode}
                onChangeText={(text) => this.setState({ZipCode:text})}
            />
            <Text style={styles.item}>Address: </Text>
            <TextInput
                style={{height: 40, width:150,borderColor: 'gray', borderWidth: 1, fontSize: 18}}
                value = {this.state.Address}
                onChangeText={(text) => this.setState({Address:text})}
            />
            <Text style={styles.item}>Customers Impacted: </Text>
            <TextInput
                style={{height: 40, width:150,borderColor: 'gray', borderWidth: 1, fontSize: 18}}
                value = {this.state.Customers_Impacted}
                onChangeText={(text) => this.setState({Customers_Impacted:text})}
            />
            <Text style={styles.item}>Start Date Time: </Text>
            <TextInput
                style={{height: 40, width:150,borderColor: 'gray', borderWidth: 1, fontSize: 18}}
                value = {this.state.Start_Date_Time}
                onChangeText={(text) => this.setState({Start_Date_Time:text})}
            />
            <Text style={styles.item}>Estimated Restoration Time: </Text>
            <TextInput
                style={{height: 40, width:150,borderColor: 'gray', borderWidth: 1, fontSize: 18}}
                value = {this.state.Estimated_Restoration_Time}
                onChangeText={(text) => this.setState({Estimated_Restoration_Time:text})}
            />
            <Text style={styles.item}>Reason: </Text>
            <TextInput
                style={{height: 40, width:150,borderColor: 'gray', borderWidth: 1, fontSize: 18}}
                value = {this.state.Reason}
                onChangeText={(text) => this.setState({Reason:text})}
            />
            <Text style={styles.item}>Crew Status: </Text>
            <Picker
                selectedValue={this.state.Crew_Status}
                style={{ height: 50, width: 150,borderColor: 'gray', borderWidth: 1, transform: [
                        { scaleX: 1.1 },
                        { scaleY: 1.1 },
                    ]}}
                textStyle={{fontSize:18}}
                onValueChange={(itemValue, itemIndex) => this.setState({Crew_Status: itemValue})}>
                <Picker.Item label="Started" value="Started" />
                <Picker.Item label="Not Started" value="Not Started" />
            </Picker>
            <Button
                //  key = {i}
                title={"Update"}
                color="#841584"
                fontSize = {18}
                buttonStyle={{
                    //backgroundColor: "rgba(92, 99,216, 1)",
                    backgroundColor: 'orange',
                    //width: 300,
                    height: 50,
                    borderColor: "transparent",
                    borderWidth: 5,
                    borderRadius: 5
                }}
                onPress={() =>{this.updateOutage()}
                }
            />
            <DropdownAlert ref={ref => this.dropdown = ref} />
        </View>
        //   })

    );
}
    componentDidMount() {
        console.log("didmont")

        var id = this.props.navigation.getParam("OutageId", '')
        console.log(id)
        var resp = [];
        return fetch(url + '/outage/'+ id//, {
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
                  console.log(responseJson[0]);
                let outage = responseJson[0]
                this.setState({
                    OutageId : outage.ID,
                    OutageType:outage.TYPE,
                    City:outage.CITY,
                    ZipCode:outage.ZIPCODE,
                    Address:outage.ADDRESS,
                    CustomersImpacted:outage.IMPACTED,
                    Start_Date_Time:outage.START_TIME,
                    Estimated_Restoration_Time:outage.ESTIMATED_RES_TIME,
                    Reason:outage.REASON,
                    Crew_Status:outage.CREW_STATUS,
                }, function(){
                   // console.log(this.state.outageList)
                });


                //       resp = responseJson;
            }).catch(function(err) {
                console.log(err);
            });
       // console.log(this.state.test)
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
        width:200,
    },
})
export default UpdateScreen;