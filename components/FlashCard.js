import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import { white, gray, red, green } from '../utils/colors'
import SimpleBtn from './SimpleBtn'
import { NavigationActions } from 'react-navigation'

class FlashCard extends React.Component {
  state = {
    showQuestion: true,
    card: 0,
    correct: 0,
  }

  
  flipCard = () => {
    const { showQuestion } = this.state

    this.setState((state) => {
      return {
        ...state,
        showQuestion: !showQuestion,
      }
    })
  }

  correct = () => {
    const { card, correct } = this.state

    this.setState((state) => {
      return {
        ...state,
        card: card + 1,
        correct: correct + 1,
      }
    })
  }

  wrong = () => {
    const { card } = this.state
    
    this.setState((state) => {
      return {
        ...state,
        card: card + 1,
      }
    })
  }

  restart = () => {
    const { card, correct } = this.state
    
        this.setState((state) => {
          return {
            ...state,
            card: 0,
            correct: 0,
          }
        })
  }

  backToDeck = () => {
    this.props.navigation.dispatch(NavigationActions.back())
  }
  
  render() {
    const { showQuestion, card, correct } = this.state
    const { deck } = this.props
    

    if (card >= deck.questions.length) {
      return (
        <View style={styles.container}>
          <Text style={{fontSize: 50}}>{((correct/deck.questions.length) * 100).toFixed(1)}%</Text>
          <View style={{paddingTop: 70}}>
            <SimpleBtn onPress={this.restart} txt="Restart Quiz" />
          </View>
          <View style={{paddingTop: 10}}>
            <SimpleBtn onPress={this.backToDeck} txt="Back to Deck" />
          </View>
          
        </View>
      )

    }


    const question = deck.questions[card].question
    const answer = deck.questions[card].answer

    
    return (      
      <View style={styles.container}>
        <View>
          <Text style={{fontSize: 16}}>Card {card+1}/{deck.questions.length} </Text>
        </View>
        <View>
          { (showQuestion) 
            ? <Text style={{fontSize: 30}}>{question}</Text>
            : <Text style={{fontSize: 20}}>{answer}</Text>
          }
        </View>
        <View>
          <TouchableOpacity onPress={this.flipCard}>
            <Text>Flip</Text>
          </TouchableOpacity>
        </View>
        <View style={{paddingTop: 70}}>
          <SimpleBtn onPress={this.correct} txt="Right" style={{backgroundColor: green}} />
        </View>
        <View style={{paddingTop: 10}}>
          <SimpleBtn onPress={this.wrong} txt="Wrong" style={{backgroundColor: red}} />
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
})