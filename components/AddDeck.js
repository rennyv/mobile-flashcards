import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import { addDeck } from '../actions'
import { connect } from 'react-redux'
import { red } from '../utils/colors'
import SimpleBtn from './SimpleBtn'
import { NavigationActions } from 'react-navigation'
import { uuidv4 } from '../utils/helpers'
import { submitDeck } from '../utils/api'

class AddDeck extends Component {
  state = {
    title: '',
    error: ''
  }

  submit = () => {
    const {title} = this.state

    if (title.trim().length>0) {
      this.setState(() => ({ error: "" }))
    } else {
      this.setState(() => ({ error: "Please enter a deck title!"}))
      return
    }

    const key = uuidv4()
    const deck = {
      title,
      questions: []
    }

    //call action
    this.props.dispatch(addDeck({
      [key]: deck
    }))

    //reset state
    this.setState(() => ({ title: "" }))

    //head back
    this.props.navigation.dispatch(NavigationActions.back())

    //add to api
    submitDeck({ key, deck })
  }

  render() {
    const { title, error } = this.state

    return (
      <View style={styles.container}>
        <Text style={{fontSize: 40}}>Create New Deck</Text>
        <TextInput placeholder="Deck Title" style={{height: 40, width: 300}}
        onChangeText={(title) => this.setState({title})}
        value={this.state.title}/>
        <SimpleBtn onPress={this.submit} txt="Add Deck" />
        <Text style={{color: red}}>{error}</Text>
      </View>
    )
  }
}

export default connect()(AddDeck)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
})