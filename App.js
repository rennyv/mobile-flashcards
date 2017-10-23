import React from 'react'
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'
import AddDeck from './components/AddDeck'
import DeckList from './components/DeckList'
import DeckDetails from './components/DeckDetails'
import AddCard from './components/AddCard'
import FlashCard from './components/FlashCard'
import { Constants } from 'expo'
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'
import { black, white } from './utils/colors'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { setLocalNotification } from './utils/helpers'

function MyStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = TabNavigator({
  Decks: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='cards' size={30} color={tintColor} />
    },
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    },
  }
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? black : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : black,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  DeckDetails: {
    screen: DeckDetails,
    navigationOptions: {
      tabBarLabel: 'Deck',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: black,
      }
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      tabBarLabel: 'Add Card',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: black,
      }
    }
  },
  FlashCard: {
    screen: FlashCard,
    navigationOptions: {
      tabBarLabel: 'Quiz',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: black,
      }
    }
  }
})

export default class App extends React.Component {
  componentDidMount () {
    setLocalNotification()
  }
  
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <MyStatusBar backgroundColor={black} barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
