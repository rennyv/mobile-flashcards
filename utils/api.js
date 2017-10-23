import { AsyncStorage } from 'react-native'

export const DECK_STORAGE_KEY = 'FlipCards:decks'

export function fetchDecks () {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((data) => {  return JSON.parse(data) })
}

export function submitDeck ({key, deck}) {
  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
    [key]: deck
  }))
}

export function submitCard ({deckId, question}) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[deckId].questions = [...data[deckId].questions, question]
      AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
    })
}