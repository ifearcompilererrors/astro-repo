'use strict';

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  AsyncStorage } from 'react-native';
import _ from 'underscore'

export class PinnedItems extends Component {
  constructor(props) {
    super(props);
  }

  _renderItem = ({item}) => {
    return (
      <PinnedListItem id={ item } charts={ this.props.charts } />
    );
  }

  render() {
    return (
      <View>
        <FlatList
          data={ this.props.pinnedItems }
          keyExtractor={(item, index) => index.toString()}
          renderItem={ this._renderItem } />
      </View>
    );
  }
}

class PinnedListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
    }
  }

  componentDidUpdate = () => {
    AsyncStorage.getItem(this.props.id, (err, result) => {
      result = JSON.parse(result);
      if (result) {
        this.setState({
          name: result.firstName + ' ' + result.lastName,
        });
      }
    })
  }

  render() {
    return(
      <View>
        <Text>Pinned item:</Text>
        <Text>{ this.state.name }</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
});