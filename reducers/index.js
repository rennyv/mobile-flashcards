
import { RECEIVE_DECKS, ADD_DECK, ADD_CARD } from '../actions'

const initialState = {}

function decks ( state = initialState, action) {
  console.log("state:", state)
  console.log("action:", action)
  console.log("combined:", {
    ...state,
    ...action.decks
  })
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks
      }
    case ADD_DECK:
      return {
        ...state,
        ...action.deck
      }
    case ADD_CARD:
      return {
        ...state,
        [action.deckId]: {
          ...state[action.deckId],
          ['questions']: [
            ...state[action.deckId]['questions'], action.card
          ]
        }
      }

    default:
      return state
  }
}

export default decks