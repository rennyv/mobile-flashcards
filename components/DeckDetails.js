import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native'
import { connect } from 'react-redux'
import { gray, white } from '../utils/colors'
import SimpleBtn from './SimpleBtn'

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
})