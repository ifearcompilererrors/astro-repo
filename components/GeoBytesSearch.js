'use strict';

import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList } from 'react-native';
import axios from 'axios'

export class GeoBytesSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      autocompleteList: '',
    };
  }

  componentDidMount() {}

  handleAutocompleteSearch = (searchTerm) => {
    if (searchTerm.length > 2) {
      return this.getCityDetails(searchTerm);
    }
  }

  getCityDetails = (searchTerm) => {
    return axios.get(`http://gd.geobytes.com/AutoCompleteCity?callback=?&sort=size&q=`+searchTerm)
      .then((response) => {
        let autocompleteList = JSON.parse((response.data).substring(2, response.data.length-2));
        console.log(autocompleteList);

        this.setState({ autocompleteList: autocompleteList });

      });
  }

  _keyExtractor = (item, index) => item.geobytescityid;

  render() {
    return <View>
      <TextInput
        {...this.props} 
        returnKeyType="done"
        onChangeText={ this.handleAutocompleteSearch }
        value={ this.state.value }
      />
      <FlatList
        data={ this.state.autocompleteList }
        keyExtractor={ this._keyExtractor }
        renderItem={({item, index, separators}) => <ListItem key={ index } fqcn={ item } />}
      />
      </View>;
  }
}

class ListItem extends Component {
  render() {
    return <Text>
      { this.props.fqcn }
    </Text>;
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