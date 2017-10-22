import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux'

class FlashCard extends React.Component {
  render() {
    const { question, answer } = this.props

    return (
      <View style={styles.container}>
        <Text>{question}</Text>
        <Text>{answer}</Text>
      </View>
    );
  }
}

function mapStateToProps ( state, { navigation }) {
  const { deckId, correct, currentQuestion } = navigation.state.params

  return {
    deckId,
    correct,
    currentQuestion,
    question: state[deckId].questions[currentQuestion].question,
    answer: state[deckId].questions[currentQuestion].answer,
  }
}

export default connect(mapStateToProps,)(FlashCard)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})