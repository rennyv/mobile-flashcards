import { AsyncStorage } from 'react-native'

export const DECK_STORAGE_KEY = 'FlipCards:decks'

export function fetchDecks () {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
}