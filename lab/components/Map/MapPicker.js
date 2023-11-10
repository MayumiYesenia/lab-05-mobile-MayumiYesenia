import { useEffect, useState } from 'react';
import { Alert, View, StyleSheet, Image, Text } from 'react-native'; //importe alert
import {
  useNavigation,
  useRoute,
  useIsFocused,
} from '@react-navigation/native';

import { getMapPreview } from './location';

import OutlinedButton from '../UI/OutlinedButton';
import * as Location from 'expo-location';
import { ActivityIndicator } from 'react-native-paper';
import { Colors } from '../util/Colors';


function MapPicker({onPickChange}) {
  const [pickedLocation, setPickedLocation] = useState();
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();
  const route = useRoute();

  const navigation = useNavigation();

  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation = {
        lat: route.params.pickedLat,
        lng: route.params.pickedLng,
      };

      setPickedLocation(mapPickedLocation);
    }
  }, [route, isFocused]);

  async function getLocationHandler() { 
    setLoading(true);
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      // TODO: Show a Snackbar (react-native-paper) or Alert (react-native)

      Alert.alert(
        'Permission to access location was denied..'
      );
      // https://callstack.github.io/react-native-paper/docs/components/Snackbar/
      //setErrorMsg("Permission to access location was denied.");
      //setVisible(!visible)

      console.log("Permission to access location was denied.")

      setLoading(false);
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

    console.log(location)

    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
    setLoading(false);
  }

  function pickOnMapHandler() {
    navigation.navigate('Map');
  }

  let locationPreview = <Text style={styles.imageText}>No map</Text>;

  if (loading) {
    locationPreview = (<ActivityIndicator animating={true} color={Colors.white} />);
  }

  if (pickedLocation) {
    locationPreview = (
      <Image
        style={styles.image}
        source={{
          uri: getMapPreview(pickedLocation.lat, pickedLocation.lng),
        }}
      />
    );
  }

  useEffect(() => {
    onPickChange(pickedLocation)
  }, [pickedLocation])

  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.actions}>
        <OutlinedButton icon="location" onPress={getLocationHandler}>
            Locate
        </OutlinedButton> 
        <OutlinedButton icon="map" onPress={pickOnMapHandler}>
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mapPreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#333",
    overflow: 'hidden',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageText: {
    color: "#fff"
  },
});

export default MapPicker;
