import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import { addDeck } from '../actions'
import { connect } from 'react-redux'
import { gray } from '../utils/colors'
import SimpleBtn from './SimpleBtn'
import { NavigationActions } from 'react-navigation'


class AddDeck extends Component {
  state = {
    title: ''
  }

  submit = () => {
    const {title} = this.state
    //const deck = this.state
    const {decks} = this.props

    //Check if it it already exists

    //call action
    this.props.dispatch(addDeck(title))

    //reset state
    this.setState(() => ({ title: "" }))

    //head back
    this.props.navigation.dispatch(NavigationActions.back())

    //add to api
    //submitEntry({ key, entry })

    //clearLocalNotification()
    //  .then(setLocalNotification)
  }

  render() {
    const { title } = this.state

    return (
      <View style={styles.container}>
        <Text style={{fontSize: 40}}>Create New Deck</Text>
        <TextInput placeholder="Deck Tile" style={{height: 40, width: 300}}
        onChangeText={(title) => this.setState({title})}
        value={this.state.title}/>
        <SimpleBtn onPress={this.submit} txt="Add Card" />
      </View>
    )
  }
}

function mapStateToProps ( decks ) {
  return {
    decks
  }
}

export default connect()(AddDeck)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    //justifyContent: 'center',
  },
})