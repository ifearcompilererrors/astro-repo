import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export class ButtonLarge extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={ styles.container }>
        <TouchableOpacity style={ styles.button }
                          onPress={ this.props._onPress }
        >
          <Text>
            <Ionicons
              name={ this.props.icon }
              size={ 25 }
            />
            <View style={[ styles.paddingBottom__sm, styles.paddingLeft__sm ]}><Text style={ styles.font__md }>{ this.props.text }</Text></View>
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    borderStyle: 'solid',
    borderRadius: 2,
    borderWidth: 1,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  paddingBottom__sm: {
    paddingBottom: 1,
  },
  paddingLeft__sm: {
    paddingLeft: 15,
  },
  font__md: {
    fontSize: 20,
  },
});