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
      <PinnedListItem chart={ item[1] } />
    );
  }

  render() {
    return (
      <View>
        <FlatList
          data={ _.filter(this.props.charts, chart => JSON.parse(chart[1]).pinned == true) }
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
      chart: JSON.parse(this.props.chart),
    }
  }

  render() {
    return(
      <View>
        <Text>Pinned chart:</Text>
        <Text>{ this.state.chart.firstName } { this.state.chart.lastName }</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
});