import React from 'react'
import {
  View, TouchableOpacity, Alert, Platform
} from 'react-native'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/FontAwesome'

import * as Permissions from 'expo-permissions'

const styles = {
  container: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: 'transparent'
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: global.arkadBlue,
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    borderRadius: 80,
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 0.39,
    shadowRadius: 80,
    elevation: 13
  },
  text: {
    fontSize: 16,
    color: '#fff'
  }
}

async function reqPermissions(navigation, setCameraPermission) {
  const { status } = await Permissions.getAsync(Permissions.CAMERA)
  setCameraPermission()
  navigation.navigate('CameraScreen')
}

function alertForPhotosPermission(
  navigation,
  cameraPermissionGiven,
  setCameraPermission
) {
  {
    cameraPermissionGiven
      ? navigation.navigate('CameraScreen')
      : Alert.alert(
        'Can we access your camera?',
        'We need access to scan student QR-Codes',
        [
          {
            text: 'No',
            onPress: () => console.log('Permission denied'),
            style: 'cancel'
          },
          {
            text: 'Yes',
            onPress: () => reqPermissions(navigation, setCameraPermission)
          }
        ]
      )
  }
}

const { container, button, text } = styles
const CameraButton = ({
  navigation,
  cameraPermissionGiven,
  setCameraPermission
}) => (
  <View style={container}>
    <TouchableOpacity
      style={button}
      onPress={() => alertForPhotosPermission(
        navigation,
        cameraPermissionGiven,
        setCameraPermission
      )}
    >
      <Icon name="plus" size={30} color="#fff" />
    </TouchableOpacity>
  </View>
)

CameraButton.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func.isRequired })
    .isRequired
}

export default CameraButton
