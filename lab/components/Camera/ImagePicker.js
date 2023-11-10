import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
  launchImageLibraryAsync,
  MediaTypeOptions
} from 'expo-image-picker';
import { useEffect, useState } from 'react';

import OutlinedButton from '../UI/OutlinedButton';

function ImagePicker({onImageChange}) {
  const [pickedImage, setPickedImage] = useState();

  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

  async function verifyPermissions() {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED || cameraPermissionInformation.status=== PermissionStatus.DENIED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient Permissions!',
        'You need to grant camera permissions to use this app.'
      );
      return false;
    }

    return true;
  }

  async function selectImageHandler() { //selecciona la imagen desde la lib
    let image = await launchImageLibraryAsync({
        mediaTypes: MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });

    if (!image.canceled) {
      setPickedImage(image.assets[0].uri);
      console.log(image.assets[0].uri);
    }
  }

  async function takeImageHandler() { //toma foto y primero verifica permiso
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    if (!image.canceled) {
      console.log(image.assets[0].uri);
      setPickedImage(image.assets[0].uri);
    }
  }

  let imagePreview = <Text style={styles.imageText}>No image</Text>;

  if (pickedImage) {
    imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />;
  }

  useEffect(() => {
    onImageChange(pickedImage)
  }, [pickedImage])

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <View style={styles.actions}>
        <OutlinedButton icon="images" onPress={selectImageHandler}>
          Select
        </OutlinedButton>
        <OutlinedButton icon="camera" onPress={takeImageHandler}>
          Take
        </OutlinedButton>
      </View>
    </View>
  );
}

export default ImagePicker;

const styles = StyleSheet.create({
  imagePreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#333",
    borderRadius: 4,
    overflow: 'hidden',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  imageText: {
    color: "#fff"
  },
  image: {
    width: 300,
    height: 300,
  },
});
