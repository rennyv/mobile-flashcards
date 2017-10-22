import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native'
import { AppLoading } from 'expo'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'
import { white, gray, black } from '../utils/colors'
import { fetchDecks } from '../utils/api'

class DeckList extends Component {
  state = {
    ready: false,
  }

  componentDidMount () {
    const { dispatch } = this.props

    fetchDecks()
      .then((decks) => dispatch(receiveDecks(decks)))
      .then( () => this.setState(() => ({ready: true})))
  }

  render() {
    const { ready } = this.state
    const { decks } = this.props

    if (ready === false) {
      return <AppLoading />
    }

    if (Object.keys(decks).length === 0 && decks.constructor === Object) {
      return (
        <View style={styles.container}>
          <View style={styles.item}>
              <Text style={{fontSize: 30}}>No Decks Found</Text>
              <Text style={{fontSize: 20, color: gray}}>You should add a deck</Text>
          </View>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        {Object.keys(decks).map((key) =>
          <View key={key}  style={styles.item}>
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate(
                  'DeckDetails',
                  { deckId: key }
                )}
              >
                <Text style={{fontSize: 20}}>{decks[key].title}</Text>
                <Text style={{fontSize: 16, color: white}}>Cards: {decks[key].questions.length}</Text>
              </TouchableOpacity>
            </View>
        )}
      </View>
    );
  }
}

function mapStateToProps (decks) {
  return {
    decks
  }
}

export default connect(mapStateToProps,)(DeckList)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    backgroundColor: gray,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
    height: 100,
    width: 300
  }
})