'use strict';

import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, DatePickerIOS } from 'react-native';
import _ from 'underscore'

export class DateTimePicker extends Component {
  render() {
    return <View>
            <TouchableOpacity
              style={ styles.picker }
              onPress={ this.props._onPress }>
              <Text>{ this.props.text }</Text>
            </TouchableOpacity>
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
  picker: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 12,
    margin: 10,
    height: 40,
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