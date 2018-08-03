'use strict';

import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import _ from 'underscore'

export class Card extends Component {
  render() {
    return <View style={ styles.container }>
            <View style={ styles.card_container }>
              <View style={ styles.img_container }>
                <Image style={ styles.img }
                       source={ this.props.source } />
              </View>
              <View style={ styles.text_container }>
                <Text style={ styles.cardIdentifier }>{ this.props.cardIdentifier.toUpperCase() }</Text>
                <Text style={ styles.title }>{ this.props.title }</Text>
                <Text style={ styles.subtitle }>{ this.props.subtitle } Tap to read.</Text>
              </View>
            </View>
          </View>;
  }
}

const styles = StyleSheet.create({
  container: {
    borderStyle: 'solid',
    alignItems: 'center',
    elevation: 1, // for Android

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
  },
  card_container: {
    borderRadius: 10,
    marginTop: 25,
    width: 340,
    height: 450,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  img_container: {
    height: 350,
    overflow: 'hidden',
  },
  img: {
    resizeMode: 'cover',
  },
  text_container: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  cardIdentifier: {
    color: 'grey',
  },
  title: {
    fontSize: 25,
  },
  subtitle: {
    color: 'grey',
    paddingTop: 5,
  }
})