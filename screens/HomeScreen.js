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
import { Card } from '../components/Card';
import { ButtonLarge } from '../components/ButtonLarge';
import _ from 'underscore';

// TODO: rename to something like Newsfeed
export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    // TODO: refactor banner
    return (
      <View style={ styles.container }>
        <Image source={ require('../assets/images/newsfeed-bg2.png') }
               style={ styles.background } />

        <ScrollView style={ styles.container } contentContainerStyle={ styles.content__container }>

          <View style={ styles.banner__container }>
            <Ionicons
              name={ 'ios-planet' }
              size={ 50 }
            />
            <Text style={ styles.header1 }>Astrological Repositories</Text>
          </View>

        <Card source={require('../assets/images/placeholder-img.jpeg')}
              cardIdentifier={ 'Stars today' }
              title={ 'Mercury in Retrograde' }
              subtitle={ 'Challenges and endings galore-- impetus for new energy.' } />

        </ScrollView>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content__container: {
    paddingTop: 30,
  },
  banner__container: {
    alignItems: 'center',
    marginTop: 20,
  },
  header1: {
    fontSize: 25,
  },
});
