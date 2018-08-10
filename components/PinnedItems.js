'use strict';

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  AsyncStorage } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import _ from 'underscore'

export class PinnedItems extends Component {
  constructor(props) {
    super(props);
  }

  _renderItem = ({item}) => {
    return (
      <PinnedListItem chart={ item[1] }
                      zodiac={ this.props.zodiac } />
    );
  }

  // TODO: refactor
  render() {
    return (
      <View style={ styles.container }>
        { _.filter(this.props.charts, chart => JSON.parse(chart[1]).pinned == true).length > 0 ? <FlatList
          data={ _.filter(this.props.charts, chart => JSON.parse(chart[1]).pinned == true) }
          keyExtractor={(item, index) => item.toString()}
          renderItem={ this._renderItem }
          horizontal={ true } /> : <View style={ styles.pinnedChart__container }>
            <Image source={ require('../assets/images/pinned-bg-2.png') } style={ styles.pinnedChart__bg }
               resizeMode={ 'cover' }/><Text>No favorite charts </Text></View>
        }
        <Ionicons name={ 'md-star' } style={ styles.headerIcon } size={ 35 }/>
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
      <View style={ styles.pinnedChart__container }>
        <Image source={ require('../assets/images/pinned-bg-1.png') }
               style={ styles.pinnedChart__bg }
               resizeMode={ 'cover' }/>
        <Text>{ this.state.chart.firstName } { this.state.chart.lastName }</Text>
        <Text>
          <Ionicons name={'md-sunny'}/> { this.props.zodiac[(this.state.chart).sun] } <Ionicons name={'md-moon'}/> { this.props.zodiac[(this.state.chart).moon] } <Ionicons name={'md-arrow-up'}/> { this.props.zodiac[(this.state.chart).asc] }
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    height: 100,
    borderBottomColor: 'grey',
  },
  headerIcon: {
    marginLeft: 5,
    marginBottom: -10,
    position: 'absolute',
  },
  pinnedChart__container: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    height: '100%',
    width: 330,
    padding: 10,
    borderRadius: 10,
    marginLeft: 10,
  },
  pinnedChart__bg: {
    position: 'absolute',
    width: '200%',
  }
});