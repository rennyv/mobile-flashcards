import React from 'react'
import { Text, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import { purple, white, gray } from '../utils/colors'

export default function SimpleBtn ({ onPress, txt, style = {}  }) {
  return (
    <TouchableOpacity
      style={[Platform.OS === 'ios' ? styles.iosBtn : styles.AndroidBtn, style]}
      onPress={onPress}>
        <Text style={styles.submitBtnText}>{txt}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  iosBtn: {
    backgroundColor: gray,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  AndroidBtn: {
    backgroundColor: gray,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
})