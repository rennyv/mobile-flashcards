import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { AppLoading } from 'expo'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'

class DeckList extends Component {
  state = {
    ready: false,
  }

  componentDidMount () {
    const { dispatch } = this.props

    dispatch(receiveDecks({}))
    //  .then()

    this.setState(() => ({ready: true}))
  }

  render() {
    const { ready } = this.state
    const { decks } = this.props

    if (ready === false) {
      return <AppLoading />
    }


    return (
      <View style={styles.container}>
        <Text>List of Decks</Text>

        {Object.keys(decks).map((key) => 

        <TouchableOpacity key={key}
            onPress={() => this.props.navigation.navigate(
              'DeckDetails',
              { entryId: key }
            )}
          >
            <Text>{key}</Text>
            <Text>{decks[key].questions.length}</Text>
          </TouchableOpacity>
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
})