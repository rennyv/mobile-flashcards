import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native'
import { connect } from 'react-redux'
import { gray, white } from '../utils/colors'


function SimpleBtn ({ onPress, txt }) {
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosBtn : styles.AndroidBtn}
      onPress={onPress}>
        <Text style={styles.submitBtnText}>{txt}</Text>
    </TouchableOpacity>
  )
}

class DeckDetails extends React.Component {
  startQuiz = () => { 
    const { deckId } = this.props
  
    this.props.navigation.navigate(
      'FlashCard',
      { 
        deckId: deckId,
        currentQuestion: 0,
        correct: 0
      }
    )}
  
  addCard = () => {
    const { deckId } = this.props

    this.props.navigation.navigate(
      'AddCard',
      { deckId: deckId }
    )
  }
  
  render() {
    const { deckId, deck } = this.props
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 30}}>{ deckId }</Text>
        <Text style={{fontSize: 20, color: gray}}>Cards: {deck.questions.length}</Text>

        <View style={{paddingTop: 70}}>
          <SimpleBtn onPress={this.addCard} txt="Add Card" />
        </View>
        {
          (deck.questions.length > 0 )
          && <View style={{paddingTop: 10}}>
              <SimpleBtn onPress={this.startQuiz} txt="Start Quiz" />
            </View>
        }
      </View>
    )
  }
}


function mapStateToProps ( state, { navigation }) {
  const { deckId } = navigation.state.params

  return {
    deckId,
    deck: state[deckId]
  }
}

export default connect(mapStateToProps,)(DeckDetails)

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