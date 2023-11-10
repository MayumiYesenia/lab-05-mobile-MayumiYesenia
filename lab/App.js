import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddPhoto from './screens/AddPhoto';
import Carousel from './screens/Carousel';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerTitle: 'Dog App',
          }}
        />
        <Stack.Screen name="AddPhoto" component={AddPhoto} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.homeScreen}>
      {/* Agrega el componente del carrusel aquí */}
      <Carousel />
      <Button
        title="Add Photo"
        onPress={() => navigation.navigate('AddPhoto')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  homeScreen: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default App;
