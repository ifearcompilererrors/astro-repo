'use strict';

import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios'

export class GeoBytesSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      autocompleteList: '',
    };
  }

  handleAutocompleteSearch = (searchTerm) => {
    if (searchTerm.length > 2) {
      return this.getCityDetails(searchTerm);
    } else {
      this.setState({
        autocompleteList: '',
      })
    }
  }

  toggleFocus = () => {
    this.setState({
      autocompleteList: '',
    });
    this.props._onTextInputPress();
  }

  getCityDetails = (searchTerm) => {
    return axios.get(`http://gd.geobytes.com/AutoCompleteCity?callback=?&sort=size&q=`+searchTerm)
      .then((response) => {
        const autocompleteList = JSON.parse((response.data).substring(2, response.data.length-2));
        this.setState({
          autocompleteList: autocompleteList,
        });
      });
  }

  _keyExtractor = (item, index) => item.toString();

  _onPressItem = (city) => {
    this.props._onPress(city);
    this.setState({ 
      autocompleteList: [],
      value: city
    });
  }

  _renderItem = ({item}) => (
    <ListItem _onPress={ this._onPressItem }
              fqcn={ item } />
  );

  render() {
    return <View style={ styles.container }>
      <TextInput
        style={ this.props.style }
        placeholder={ this.props.placeholder }
        placeholderTextColor="white"
        returnKeyType="done"
        onChangeText={ this.handleAutocompleteSearch }
        value={ this.props.value }
        onFocus={ this.toggleFocus }
        onBlur={ this.props._onTextInputPress }
      />
      <FlatList
        style={ styles.list__container }
        data={ this.state.autocompleteList }
        keyExtractor={ this._keyExtractor }
        renderItem={ this._renderItem }
      />
      </View>;
  }
}

class ListItem extends Component {
  _onPressItem = () => {
    this.props._onPress(this.props.fqcn);
  }

  render() {
    return <TouchableOpacity onPress={ this._onPressItem }
                             style={ styles.listItem__container }>
        <Text style={ styles.listItem }>
          { this.props.fqcn }
        </Text>
      </TouchableOpacity>;
  }
}

const styles = StyleSheet.create({
  list__container: {
    borderRadius: 10,
  },
  listItem__container: {
    marginHorizontal: 40,
    backgroundColor: 'white',
  },
  listItem: {
    padding: 10,
  }
});