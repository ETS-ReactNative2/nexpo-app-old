import React from 'react'
import { View, TouchableOpacity, Linking, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const IconButton = ({ name, data }) => (
  <TouchableOpacity onPress={data=='Not set' ? false : () => openUrl(data)}>
    <Icon name={name} size={34} color={data=='Not set' ? global.arkadGray : global.arkadBlue} style={{height: 34}} />
  </TouchableOpacity>
)

function isEmpty(str) {
    return (!str || 0 === str.length);
}

const openUrl = (url) => {
  Linking.canOpenURL(url)
    .then((supported) => {
      if (supported) {
        Linking.openURL(url)
      } else {
        Alert.alert(`Could not open URL: ${this.url}`)
      }
    })
    .catch(err => Alert.alert(`Could not open URL: ${err}`))
}

export default IconButton
