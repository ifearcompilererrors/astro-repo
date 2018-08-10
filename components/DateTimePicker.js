'use strict';

import React, { Component } from 'react';
import moment from 'moment';
import { View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  DatePickerIOS } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import _ from 'underscore'

export class DateTimePicker extends Component {
  render() {
    return <View styles={ styles.container }>
            <TouchableOpacity
              style={ styles.pickerButton }
              onPress={ this.props._onPress }>
              <Text><Ionicons name={ this.props.ionicon } /> { this.props.text }</Text>
            </TouchableOpacity>

            <Text style={ styles.dateString }>
              { this.props.mode == 'date' ? moment(this.props.date).format("MMMM Mo, YYYY").toString() : moment(this.props.date).format("h:mm A").toString()}
            </Text>

            <PickerModal { ...this.props }/>
          </View>;
  }
}

class PickerModal extends Component {
  render() {
    return <Modal
              animationType="slide"
              transparent={ true }
              visible={ this.props.modalVisible } >
              <View style={ styles.modalContainer }>
                <DatePickerIOS
                  date={ this.props.date }
                  mode={ this.props.mode }
                  onDateChange={ this.props._onDateChange } />
                <View>
                  <TouchableOpacity
                    style={ styles.modalButton }
                    onPress={ this.props.onButtonPress }>
                    <Text style={[ styles.textLarge, styles.colorBlue ]}>Done</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickerButton: {
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 12,
    height: 40,
    width: 270,
    borderRadius: 15,
    marginHorizontal: 50,
    marginTop: 20,
  },
  dateString: {
    textAlign: 'center',
    marginTop: 15,
    color: 'white',
    fontSize: 18,
  },
  modalContainer: {
    height: 200,
    width: 350,
    top: 500,
    left: 10,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  modalButton: {
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    height: 50,
    paddingTop: 10,
    top: -10,
  },
  textLarge: {
    fontSize: 23
  },
  colorBlue: {
    color: 'blue',
  },
})