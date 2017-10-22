import { uuidv4 } from '../utils/helpers'

export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'

export function receiveDecks (decks) {
  return {
    type: RECEIVE_DECKS,
    decks
  }
}

export function addDeck (title) {
   const key = uuidv4()

  return {
    type: ADD_DECK,
    deck: {[key]: {title, questions: [] }}
  }
}

