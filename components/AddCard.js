import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { connect } from 'react-redux'
import SimpleBtn from './SimpleBtn'
import { addCard } from '../actions'
import { NavigationActions } from 'react-navigation'
import { submitCard } from '../utils/api'


class AddCard extends React.Component {
  state = {
    question: "",
    answer: "",
  }

  submit = () => {
    const card = this.state
    const {deckId} = this.props

    //Check if it it already exists

    //call action
    this.props.dispatch(addCard(deckId, card))

    //reset state
    this.setState(() => ({ question: "", answer: "" }))

    //head back
    this.props.navigation.dispatch(NavigationActions.back())

    //add to api
    submitCard({ deckId, card })

    //clearLocalNotification()
    //  .then(setLocalNotification)
  }

  render() {
    const { question, answer } = this.state

    return (
      <View style={styles.container}>
        <Text style={{fontSize: 30}}>Question</Text>
        <TextInput placeholder="Question" style={{height: 40, width: 300}}
        onChangeText={(question) => this.setState({question})}
        value={this.state.question}/>
        <Text style={{fontSize: 30}}>Answer</Text>
        <TextInput placeholder="Answer" style={{height: 40, width: 300}}
        onChangeText={(answer) => this.setState({answer})}
        value={this.state.answer}/>
        <SimpleBtn onPress={this.submit} txt="Add Card" />
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

  },
})