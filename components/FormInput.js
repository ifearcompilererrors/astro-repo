'use strict';

import React, { Component } from 'react';
import { TextInput } from 'react-native';

export class FormInput extends React.Component {
  render() {
    return <TextInput
        {...this.props} 
        returnKeyType="done"
        placeholderTextColor="white"
      />;
  }
}