import React, { Component } from 'react';
import moment from 'moment';
import { 
  View,
  ScrollView, 
  StyleSheet,
  Text,
  TextInput,
  DatePickerIOS,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
  Picker,
  AsyncStorage } from 'react-native';
import { FormInput } from '../components/FormInput';
import { GeoBytesSearch } from '../components/GeoBytesSearch';
import { DateTimePicker } from '../components/DateTimePicker'
import _ from 'underscore'

// TODO: change name to AddNewChartScreen
export default class AddNewPersonScreen extends Component {
  static navigationOptions = {
    title: 'Add',
  };

  constructor(props) {
    super(props);
    this.state = { 
      firstName: '',
      lastName: '',
      birthday: new Date(),
      city: '',
      bdayDatePickerVisible: false,
      timePickerVisible: false,
    };
  }

  // TODO
  setLocale = (fqcn) => {
    // return axios.get(`http://gd.geobytes.com/GetCityDetails?callback=?&fqcn=`+fqcn)
    //   .then((response) => {
    //     const data = JSON.parse((response.data).substring(2, response.data.length-2));
    //     data.geobytestimezone
    //   });
  }

  setCity = (city) => {
    this.setState({ 
      city: city,
    });

    // this.setLocale(city);
  }

  save = async () => {
    try {
      // uuid e.g., 8
      let UID8_object = {
        sun: 8,
        moon: 2,
        asc: 11,
      };

      AsyncStorage.setItem('UID8',  JSON.stringify(UID8_object), () => {
        AsyncStorage.getItem('UID8', (err, result) => {
          console.log(result);
        });
      });
    } catch (error) {
      console.log(error);
    }


  }

  render() {
    return (
      <ScrollView>
        <FormInput
          style={ styles.textField }
          onChangeText={ newName => this.setState({firstName: newName}) }
          value={ this.state.firstName }
          placeholder="First Name *"/>

        <FormInput
          style={ styles.textField }
          onChangeText={ newName => this.setState({lastName: newName}) }
          value={ this.state.lastName }
          placeholder="Last Name"/>

        <DateTimePicker
          _onPress={ () => this.setState({ bdayDatePickerVisible: true }) }
          text="Birthday *"
          modalVisible={ this.state.bdayDatePickerVisible }
          date={ this.state.birthday }
          mode={ 'date' }
          _onDateChange={ date => this.setState({ birthday: date }) }
          onButtonPress={ () => this.setState({ bdayDatePickerVisible: false }) } />

        <DateTimePicker
          _onPress={ () => this.setState({ timePickerVisible: true }) }
          text="Time of Birth"
          modalVisible={ this.state.timePickerVisible}
          date={ this.state.birthday }
          mode={ 'time' }
          _onDateChange={ time => this.setState({ birthday: time }) }
          onButtonPress={ () => this.setState({ timePickerVisible: false }) } />

        <GeoBytesSearch
          style={ styles.textField }
          placeholder="Search"
          value={ this.state.city }
          _onPress={ this.setCity }/>

        <TouchableOpacity
          style={ styles.bigButton }
          onPress={ this.save }>
          <Text style={ styles.textLarge }>Done</Text>
        </TouchableOpacity>

        <View>
          <Text>First Name: { this.state.firstName }</Text>
          <Text>Last Name: { this.state.lastName }</Text>
          <Text>Birthday: { (this.state.birthday).toString() }</Text>
          <Text>City: { this.state.city }</Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  textField: {
    height: 40, 
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 1,
    borderLeftWidth: 0,
    borderColor: 'gray',
    marginHorizontal: 10,
  },
  bigButton: {
    backgroundColor: 'lightblue',
    width: 300,
    height: 40,
    borderRadius: 2,
    alignItems: 'center',
    marginTop: 15,
    marginLeft: 35,
    paddingTop: 5,
  },
  textLarge: {
    fontSize: 23
  },
});
