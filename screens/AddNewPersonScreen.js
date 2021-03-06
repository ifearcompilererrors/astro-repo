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
  AsyncStorage,
  Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FormInput } from '../components/FormInput';
import { GeoBytesSearch } from '../components/GeoBytesSearch';
import { DateTimePicker } from '../components/DateTimePicker';
import calculateBirthChart from '../api/calculateBirthChart';
import _ from 'underscore';

// TODO: change name to AddNewChartScreen
// TODO: check if birthtime set
export default class AddNewPersonScreen extends Component {
  static navigationOptions = {
    title: 'Create',
  };

  constructor(props) {
    super(props);
    this.state = { 
      firstName: '',
      lastName: '',
      birthday: new Date(),
      city: '',
      pinned: false,
      
      bdayDatePickerVisible: false,
      timePickerVisible: false,

      containerOffset: 0,
    };
  }

  setCity = (city) => {
    this.setState({ 
      city: city,
    });
  }

  toggleContainerOffset = () => {
    this.setState({
      containerOffset: this.state.containerOffset == 0 ? -100 : 0,
    });
  }

  clearState = () => {
    this.setState({
      firstName: '',
      lastName: '',
      birthday: new Date(),
      city: '',
    })
  }

  createChart = (chart_id, chartDetails) => {
    if (_.isEmpty(chartDetails.firstName) && _.isEmpty(chartDetails.lastName)) {
      return;
    }

    console.log(chartDetails.city);

    let chart_object = {
      id: chart_id,
      firstName: chartDetails.firstName,
      lastName: chartDetails.lastName,
      birthday: chartDetails.birthday,
      city: chartDetails.city,

      sun: _.random(1, 12),
      moon:_.random(1, 12),
      asc: _.random(1, 12),
      avatar: _.random(0, 5),

      year: moment(chartDetails.birthday).get('year'),
      month: moment(chartDetails.birthday).get('month'),
      day: moment(chartDetails.birthday).get('day'),
      hour: moment(chartDetails.birthday).get('hour'),
      minute: moment(chartDetails.birthday).get('minute'),
    };

    let calculatedChart;
    calculateBirthChart(chart_object).then((result) => {
      console.log('!!calculatedChart', result);
      chart_object.sun = result.sun;
      chart_object.moon
    });

    AsyncStorage.setItem(chart_id,  JSON.stringify(chart_object), () => {
      // TODO: route to chart profile
      AsyncStorage.getItem(chart_id, (err, result) => {
        console.log(result);
        this.clearState();
        this.props.navigation.navigate('List');
      });
    });

  }

  save = async () => {
    try {
      const chart_id = this.state.firstName.toUpperCase() + '_' + this.state.lastName.toUpperCase();

      // Create chart if duplicate not found
      AsyncStorage.getItem(chart_id, (err, result) => {
        if (_.isNull(result)) {
          this.createChart(chart_id, this.state);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  // TODO: chart calculator api
  // TODO: refactor: changes to fields updates DateTimePicker via this.state.birthday
  render() {
    return (
      <View style={[ styles.container, { top: this.state.containerOffset }]}>

        <Image source={ require('../assets/images/add-bg.png') }
               style={ styles.background } />

        <ScrollView>
          <FormInput
            style={[ styles.textField, styles.marginTop ]}
            onChangeText={ newName => this.setState({firstName: newName.trim()}) }
            value={ this.state.firstName }
            placeholder="First Name"/>

          <FormInput
            style={[ styles.textField, styles.marginBottom ]}
            onChangeText={ newName => this.setState({lastName: newName.trim()}) }
            value={ this.state.lastName }
            placeholder={ "Last Name" }/>

          <DateTimePicker
            _onPress={ () => this.setState({ bdayDatePickerVisible: true }) }
            text={ "Birthday" }
            modalVisible={ this.state.bdayDatePickerVisible }
            date={ this.state.birthday }
            mode={ 'date' }
            ionicon={ 'md-calendar' }
            _onDateChange={ date => this.setState({ birthday: date }) }
            onButtonPress={ () => this.setState({ bdayDatePickerVisible: false }) } />

          <DateTimePicker
            _onPress={ () => this.setState({ timePickerVisible: true }) }
            text={ "Time of Birth" }
            modalVisible={ this.state.timePickerVisible}
            date={ this.state.birthday }
            mode={ 'time' }
            ionicon={ 'md-time' }
            _onDateChange={ time => this.setState({ birthday: time }) }
            onButtonPress={ () => this.setState({ timePickerVisible: false }) } />

          <GeoBytesSearch
            style={ styles.textField }
            placeholder={ 'Place of Birth' }
            value={ this.state.city }
            _onPress={ this.setCity }
            _onTextInputPress={ this.toggleContainerOffset }/>

          <TouchableOpacity
            style={ styles.bigButton }
            onPress={ this.save }>
            <Text style={ styles.bigButton__text }>
              <Ionicons name={ 'md-checkmark-circle-outline' } /> Done!
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },
  background: {
    position: 'absolute',
    height: '200%',
  },
  marginTop: {
    marginTop: 50,
  },
  marginBottom:  {
    marginBottom: 20,
  },
  textField: {
    height: 50,
    fontSize: 18,
    color: 'white',
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 1,
    borderLeftWidth: 0,
    borderColor: 'white',
    marginHorizontal: 40,
    marginTop: 20,
  },
  bigButton: {
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 12,
    height: 40,
    width: 270,
    borderRadius: 15,
    marginHorizontal: 50,
    marginTop: 50,
  },
  bigButton__text: {
    fontSize: 15
  },
});
