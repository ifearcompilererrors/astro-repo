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
  Picker } from 'react-native';
import { FormInput } from '../components/FormInput';
import { GeoBytesSearch } from '../components/GeoBytesSearch';

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

  setBdayPickerVisible(val) {
    this.setState({ bdayDatePickerVisible: val });
  }

  setTimePickerVisible(val) {
    this.setState({ timePickerVisible: val });
  }

  setTime(val) {

  }

  render() {
    return (
      <ScrollView>
        <FormInput
          style={ styles.textField }
          onChangeText={(newName) => this.setState({firstName: newName})}
          value={this.state.firstName}
          placeholder="First Name"/>
        <FormInput
          style={ styles.textField }
          onChangeText={(newName) => this.setState({lastName: newName})}
          value={this.state.lastName}
          placeholder="Last Name"/>
        
        <TouchableOpacity
          style={ styles.picker }
          onPress={() => {
            this.setBdayPickerVisible(!this.state.bdayDatePickerVisible);
          }}>
          <Text>Birthday</Text>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.bdayDatePickerVisible}>
          <DatePickerIOS
            date={this.state.birthday}
            mode={'date'}
            onDateChange={(newBirthday) => this.setState({birthday: newBirthday})} />
          <TouchableHighlight
            onPress={() => {
              this.setBdayPickerVisible(!this.state.bdayDatePickerVisible);
            }}>
            <Text>Hide Modal</Text>
          </TouchableHighlight>
        </Modal>

        <TouchableOpacity
          style={ styles.picker }
          onPress={() => {
            this.setTimePickerVisible(!this.state.timePickerVisible);
          }}>
          <Text>Time of Birth (opt)</Text>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.timePickerVisible}>
          <DatePickerIOS
            date={this.state.birthday}
            mode={'time'}
            onDateChange={(newTime) => this.setTime(newTime)} />
          <TouchableHighlight
            onPress={() => {
              this.setTimePickerVisible(!this.state.timePickerVisible);
            }}>
            <Text>Hide Modal</Text>
          </TouchableHighlight>
        </Modal>

        <FormInput
          style={ styles.textField }
          onChangeText={(birthCity) => this.setState({city: birthCity})}
          value={this.state.city}
          placeholder="City of Birth"/>

        <GeoBytesSearch
          style={ styles.textField }
          placeholder="Search"/>
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
  picker: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    margin: 10,
    height: 40,
  }
});
