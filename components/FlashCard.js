import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import { white, gray, red, green } from '../utils/colors'
import SimpleBtn from './SimpleBtn'
import { NavigationActions } from 'react-navigation'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'

class FlashCard extends React.Component {
  state = {
    showQuestion: true,
    card: 0,
    correct: 0,
  }

  
  flipCard = () => {
    const { showQuestion } = this.state

    this.setState({ showQuestion: !showQuestion })
  }

  correct = () => {
    const { card, correct } = this.state

    this.setState({
        card: card + 1,
        correct: correct + 1,
        showQuestion: true
    })
  }

  wrong = () => {
    const { card } = this.state
    
    this.setState({
      card: card + 1,
      showQuestion: true
    })
  }

  restart = () => {
    const { card, correct } = this.state

    clearLocalNotification()
      .then(setLocalNotification)

    this.setState({
      card: 0,
      correct: 0,
    })

  }

  backToDeck = () => {
    this.props.navigation.dispatch(NavigationActions.back())

    clearLocalNotification()  
      .then(setLocalNotification)
  }
  
  render() {
    const { showQuestion, card, correct } = this.state
    const { deck } = this.props    

    if (card >= deck.questions.length) {
      return (
        <View style={styles.container}>
          <Text style={styles.resultText}>
            {((correct/deck.questions.length) * 100).toFixed(1)}%
          </Text>
          <View style={styles.btnSpace}>
            <SimpleBtn onPress={this.restart} txt="Restart Quiz" />
          </View>
          <View style={styles.betweenButtons}>
            <SimpleBtn onPress={this.backToDeck} txt="Back to Deck" />
          </View>
          
        </View>
      )
    }

    const { question, answer } = deck.questions[card]
    
    return (      
      <View style={styles.container}>
        <View>
          <Text style={styles.deckInfo}>Card {card+1}/{deck.questions.length} </Text>
        </View>
        <View>
          { (showQuestion) 
            ? <Text style={styles.question}>{question}</Text>
            : <Text style={styles.answer}>{answer}</Text>
          }
        </View>
        <View>
          <TouchableOpacity onPress={this.flipCard}>
            <Text>Flip</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btnSpace}>
          <SimpleBtn onPress={this.correct} txt="Correct" style={{backgroundColor: green}} />
        </View>
        <View style={styles.betweenButtons}>
          <SimpleBtn onPress={this.wrong} txt="Incorrect" style={{backgroundColor: red}} />
        </View>
      </View>
    );
  }
}

function mapStateToProps ( decks, { navigation }) {
  const { deckId } = navigation.state.params

  return {
    deckId,
    deck: decks[deckId]
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
  btnSpace: {
    paddingTop: 70
  },
  betweenButtons: {
    paddingTop: 10
  },
  resultText: {
    fontSize: 50
  },
  deckInfo: {
    fontSize: 16
  },
  question: {
    fontSize: 30
  },
  answer: {
    fontSize: 20
  }
})