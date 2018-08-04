import React, { Component } from 'react';
import {
  View,
  Text,
  AsyncStorage,
  TouchableOpacity,
  FlatList,
  ScrollView,
  StyleSheet } from 'react-native';
import { PinnedItems } from '../components/PinnedItems';
import { Ionicons } from '@expo/vector-icons';
import _ from 'underscore';

export default class ChartsListScreen extends React.Component {
  static navigationOptions = {
    title: 'Charts',
  };

  constructor(props) {
    super(props);
    this.state = {
      charts: [],
      pinnedItems: [],

      zodiac: { 
        1: 'aries',
        2: 'taurus',
        3: 'gemini',
        4: 'cancer',
        5: 'leo',
        6: 'virgo',
        7: 'libra',
        8: 'scorpio',
        9: 'sagittarius',
        10: 'capricorn',
        11: 'aquarius',
        12: 'pisces',
      }
    }
  }

  componentDidMount = () => {
    this.fetchChartsList();
  }

  fetchChartsList = async () => {
    try {
      AsyncStorage.getAllKeys((error, keys) => {
        AsyncStorage.multiGet(keys, (error, result) => {
          this.setState({
            charts: _.reject(result, item => item[0] == 'pinned'),
            pinnedItems: _.keys(JSON.parse(_.find(result, item => item[0] == 'pinned')[1])),
          });
          console.log(this.state.charts, this.state.pinnedItems)
        });
      });
    } catch(error) {
      console.log(error);
    }
  }

  _renderItem = ({item}) => (
    <ChartListItem chart={ item[1] }
                   isPinned={ _.contains(this.state.pinnedItems, item[0]) }
                   zodiac={ this.state.zodiac }/>
  );

  // TODO: render PinnedItems after fetch is done
  render() {
    return (
      <View style={ styles.container }>
        <ScrollView>
            <PinnedItems pinnedItems={ this.state.pinnedItems }
                         charts={ this.state.charts } />

            <FlatList
              data={ this.state.charts }
              keyExtractor={ (item, index) => index.toString() }
              renderItem={ this._renderItem } />
        </ScrollView>
      </View>
    );
  }
}

class ChartListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chart: JSON.parse(this.props.chart),
    }
  }

  pinItem = async () => {
    let delta = {};
    delta[this.state.chart.id] = '';
    AsyncStorage.mergeItem('pinned', JSON.stringify(delta), () => {
      AsyncStorage.getItem('pinned', (err, result) => {
        console.log(result);        
      })
    })
  }

  render() {
    return (
      <View style={ styles.chartListItem__container }>
        <View style={ styles.chartListItem__border }>
          <Text style={ styles.name }>{ this.state.chart.firstName } { this.state.chart.lastName }</Text>
          <View style={ styles.content } >
            <Text>
              sun: { this.props.zodiac[(this.state.chart).sun] } moon: { this.props.zodiac[(this.state.chart).moon] } asc: { this.props.zodiac[(this.state.chart).asc] }
            </Text>
            <Ionicons style={ styles.pinIcon } 
                      name={ this.props.isPinned ? 'md-star' : 'md-star-outline' }
                      size={ 30 }
                      onPress={() => this.pinItem()} />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  chartListItem__container: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  chartListItem__border: {
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: 'grey',
  },
  name: {
    fontSize: 20
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pinIcon: {
    color: 'grey',
  }
});