
import { RECEIVE_DECKS, ADD_DECK, ADD_CARD } from '../actions/types'

const initialState = {}

function decks ( state = initialState, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.payload
      }
    case ADD_DECK:
      return {
        ...state,
        ...action.payload
      }
    case ADD_CARD:
      const { deckId, card } = action.payload
      return {
        ...state,
        [deckId]: {
          ...state[deckId],
          ['questions']: [
            ...state[deckId]['questions'], card
          ]
        }
      }
    default:
      return state
  }
}

export default decks