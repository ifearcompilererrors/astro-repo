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
            charts: result,
          });

          console.log('charts', this.state.charts)
        });
      });
    } catch(error) {

      console.log(error);
    }
  }

  togglePin = async (id) => {
    AsyncStorage.getItem(id, (error, result) => {
      let delta = { pinned: !JSON.parse(result).pinned }
      AsyncStorage.mergeItem(id, JSON.stringify(delta), () => {
        this.fetchChartsList();
      })
    })
  }

  removeAllCharts = () => {
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiRemove(keys, (err) => {
        if (err) console.log(err);
        else { this.setState({ charts: [], pinnedItems: [] })}
      });
    })
  }

  _renderItem = ({item}) => (
    <ChartListItem chart={ item[1] }
                   zodiac={ this.state.zodiac }
                   _onPress={ this.togglePin } />
  );

  render() {
    return (
      <View style={ styles.container }>
        <ScrollView>
          <PinnedItems charts={ this.state.charts } />

          <FlatList
            data={ this.state.charts }
            keyExtractor={ (item, index) => index.toString() }
            renderItem={ this._renderItem } />

          <TouchableOpacity onPress={ this.removeAllCharts }>
            <Text>Remove all charts</Text>
          </TouchableOpacity>
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

  shouldComponentUpdate = (nextProps, nextState) => {
    if (JSON.parse(nextProps.chart).pinned != nextState.chart.pinned) {
      nextState.chart.pinned = !nextState.chart.pinned;
    }
    return true;
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
            <TouchableOpacity onPress={() => { this.props._onPress(this.state.chart.id) }}>
              <Ionicons style={ styles.pinIcon } 
                      name={ this.state.chart.pinned ? 'md-star' : 'md-star-outline' }
                      size={ 30 } />
            </TouchableOpacity>
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