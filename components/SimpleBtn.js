import React from 'react'
import { Text, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import { purple, white, gray } from '../utils/colors'

export default function SimpleBtn ({ onPress, txt, style = {}  }) {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}>
        <Text style={styles.submitBtnText}>{txt}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: gray,
    padding: 10,
    height: 45,
    ...Platform.select({
      ios: {
        borderRadius: 7,
        marginLeft: 40,
        marginRight: 40,
      },
      android: {
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 2,
        justifyContent: 'center',
        alignItems: 'center',
      }
    })
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
})