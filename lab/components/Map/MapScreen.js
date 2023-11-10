import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import { Snackbar } from 'react-native-paper';

import * as Location from 'expo-location';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const window = Dimensions.get('window')
const width = window.width
const height = window.height

const utec = {
  latitude: -12.1378369,
  longitude: -77.0221854,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01
}

// Demo Map Standalone
export default function MapScreen() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [visible, setVisible] = useState(false);

  const onDismissSnackBar = () => setVisible(false)

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setErrorMsg("Permission to access location was denied.");
        setVisible(!visible)
        
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      // Example:
      /*
        {
        "coords": {
          "accuracy": 15.917260027161122,
          "altitude": 90.1187162399292,
          "altitudeAccuracy": 14.673048973083496,
          "heading": -1,
          "latitude": -12.113041750159201,
          "longitude": -77.03575379380143,
          "speed": -1
        }, 
          "timestamp": 1699288090431.6357
        }
      */
      setLocation(location)
    }

    getLocation()
  }, [])

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <MapView
          style={styles.map}
          showsUserLocation={true}
          region={utec}
        >
          {location && <Marker coordinate={{latitude: location.coords.latitude, longitude : location.coords.longitude}} />}
        </MapView>
        <Snackbar
          visible={visible}
          onDismiss={onDismissSnackBar}
        >
          {errorMsg && <Text style={styles.alert}>{errorMsg}</Text>}
        </Snackbar>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: width,
    height: height
  },
  alert: {
    color: "#fff"
  }
});

