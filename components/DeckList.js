import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

export default class DeckList extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>List of Decks</Text>

        <TouchableOpacity
            onPress={() => this.props.navigation.navigate(
              'DeckDetails',
              { entryId: 1 }
            )}
          >
            <Text>Deck 1</Text>
          </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})