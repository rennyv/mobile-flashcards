import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux'

class AddCard extends React.Component {
  render() {
    const { deckId } = this.props

    return (
      <View style={styles.container}>
        <Text>Create New Card for {deckId}</Text>
      </View>
    );
  }
}

function mapStateToProps ( decks, { navigation }) {
  const { deckId } = navigation.state.params

  return {
    deckId,
    title: decks[deckId].title
  }
}

export default connect(mapStateToProps,)(AddCard)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})