import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Colors from '../constants/Colors';

import HomeScreen from '../screens/HomeScreen';
import AddNewPersonScreen from '../screens/AddNewPersonScreen';
import ChartsListScreen from '../screens/ChartsListScreen';

export default TabNavigator(
  {
    Add: {
      screen: AddNewPersonScreen, // TODO: change name to AddNewChartScreen
    },
    Home: {
      screen: HomeScreen,
    },
    List: {
      screen: ChartsListScreen,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Add':
            iconName =
              Platform.OS === 'ios'
                ? `ios-person-add${focused ? '' : '-outline'}`
                : 'md-person-add';
            break;
          case 'Home':
            iconName = Platform.OS === 'ios' ? `ios-home${focused ? '' : '-outline'}` : 'md-home';
            break;
          case 'List':
            iconName =
              Platform.OS === 'ios' ? `ios-list${focused ? '' : '-outline'}` : 'md-list';
        }
        return (
          <Ionicons
            name={iconName}
            size={28}
            style={{ marginBottom: -3, width: 25 }}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        );
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  }
);
