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