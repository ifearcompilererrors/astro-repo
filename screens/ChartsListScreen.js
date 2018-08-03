import React, { Component } from 'react';
import { View, Text, AsyncStorage, TouchableOpacity, FlatList } from 'react-native';
import _ from 'underscore';

export default class ChartsListScreen extends React.Component {
  static navigationOptions = {
    title: 'Charts',
  };

  constructor(props) {
    super(props);
    this.state = {
      charts: [],

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
    this.fetchChartList();
  }

  fetchChartList = async () => {
    try {
      AsyncStorage.getAllKeys((error, keys) => {
        AsyncStorage.multiGet(keys, (error, result) => {
          console.log(result);
          this.setState({ charts: result });
        });
      });
    } catch(error) {
      console.log(error);
    }
  }

  _renderItem = ({item}) => (
    <ChartListItem chart={ item[1] } zodiac={ this.state.zodiac }/>
  );

  render() {
    return <View>
      <FlatList
        data={ this.state.charts }
        keyExtractor={ (item, index) => index.toString() }
        renderItem={ this._renderItem } />

    </View>;
  }
}

class ChartListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chart: JSON.parse(this.props.chart)
    }
  }

  render() {
    return <View>
      <Text>{ this.state.chart.firstName } { this.state.chart.lastName }</Text>
      <Text>sun: { this.props.zodiac[(this.state.chart).sun] } moon: { this.props.zodiac[(this.state.chart).moon] } asc: { this.props.zodiac[(this.state.chart).asc] }</Text>
    </View>;
  }
}
