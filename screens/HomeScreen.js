import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { MonoText } from '../components/StyledText';
import _ from 'underscore';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={ styles.container }>
        <ScrollView style={ styles.container } contentContainerStyle={ styles.content__container }>

          <View style={ styles.banner__container }>
            <Ionicons
              name={ 'ios-planet' }
              size={ 50 }
            />
            <Text style={ styles.header1 }>Astrological Repositories</Text>
          </View>

          <View style={ styles.createNew__container }>
            <TouchableOpacity style={ styles.createNew__btn }
                              onPress={() => this.props.navigation.navigate('Add')}
            >
              <Text>
                <Ionicons
                  name={ 'ios-moon' }
                  size={ 25 }
                />
                <View style={[ styles.paddingBottom__sm, styles.paddingLeft__sm ]}><Text style={ styles.btnFont__md }>Create new chart</Text></View>
              </Text>
            </TouchableOpacity>
          </View>

          <View>
            TODO: Stars today card
          </View>          
        </ScrollView>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content__container: {
    paddingTop: 30,
  },
  banner__container: {
    alignItems: 'center',
    marginTop: 10,
  },
  createNew__container: {
    alignItems: 'center',
    marginTop: 10,
  },
  createNew__btn: {
    borderStyle: 'solid',
    borderRadius: 2,
    borderWidth: 1,
    paddingLeft: 5,
    paddingRight: 5,
  },

  header1: {
    fontSize: 25,
  },
  btnFont__md: {
    fontSize: 20,
  },
  paddingBottom__sm: {
    paddingBottom: 1,
  },
  paddingLeft__sm: {
    paddingLeft: 15,
  }
});
