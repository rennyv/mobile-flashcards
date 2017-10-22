import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux'
import { white, gray } from '../utils/colors'
import SimpleBtn from './SimpleBtn'

class FlashCard extends React.Component {
  submit() {

  }
  
  render() {
    const { question, answer } = this.props

    return (
      <View style={styles.container}>
        <Text>{question}</Text>
        <Text>{answer}</Text>

        <View style={{paddingTop: 70}}>
          <SimpleBtn onPress={this.submit} txt="Right" />
        </View>
        <View style={{paddingTop: 10}}>
          <SimpleBtn onPress={this.startQuiz} txt="Wrong" />
        </View>
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
  iosBtn: {
    backgroundColor: gray,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  AndroidBtn: {
    backgroundColor: gray,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
})