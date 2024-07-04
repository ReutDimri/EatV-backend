import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, Image, ImageBackground, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const SelectLocationScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [city, setCity] = useState('');
  const [neighborhood, setNeighborhood] = useState('');

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const handleContinue = () => {
    if (!city || !neighborhood) {
      Alert.alert('Incomplete Selection', 'Please select both a city and a neighborhood');
      return;
    }
    navigation.navigate('RouteOptions', { city, neighborhood, location });
  };

  return (
    <ImageBackground
      source={require('../assets/hand.jpeg')}
      style={styles.background}
      imageStyle={{ resizeMode: 'cover' }}
    >
      <View style={styles.overlay}>
        <Image source={require('../assets/Eat-Venture.png')} style={styles.logo} />
        <Text style={styles.title}>Select Your Location</Text>
        <TouchableOpacity
          style={styles.locationButton}
          onPress={() => console.log(location)}
        >
          <Ionicons name="location-sharp" size={24} color="#FFF" />
          <Text style={styles.locationButtonText}>Use Current Location</Text>
        </TouchableOpacity>
        <Text style={styles.orText}>OR</Text>
        
        {/* Replace City and Neighborhood Pickers with GooglePlacesAutocomplete */}
        <Text style={styles.label}>Select City</Text>
        <GooglePlacesAutocomplete
          placeholder='Enter City'
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(data, details);
            setCity(data.description);
          }}
          fetchDetails={true}
          query={{
            key: 'AIzaSyCXA-2ogmX_O4eFcyXUqto6LFOHwzMwLco',
            language: 'en', // language of the results
          }}
          styles={{
            textInputContainer: {
              backgroundColor: '#FFF',
              borderRadius: 10,
              marginBottom: 20,
              elevation: 2,
              width: '80%',
            },
            textInput: {
              color: '#000',
              fontSize: 16,
            },
          }}
        />

        <Text style={styles.label}>Select Neighborhood</Text>
        <GooglePlacesAutocomplete
          placeholder='Enter Neighborhood'
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(data, details);
            setNeighborhood(data.description);
          }}
          fetchDetails={true}
          query={{
            key: 'YOUR_GOOGLE_PLACES_API_KEY',
            language: 'en', // language of the results
          }}
          styles={{
            textInputContainer: {
              backgroundColor: '#FFF',
              borderRadius: 10,
              marginBottom: 20,
              elevation: 2,
              width: '80%',
            },
            textInput: {
              color: '#000',
              fontSize: 16,
            },
          }}
        />

        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional: add a semi-transparent overlay
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    position: 'absolute',
    top: 40,
    left: 20,
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 30,
  },
  orText: {
    marginVertical: 20,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00796B',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 2,
  },
  locationButtonText: {
    marginLeft: 10,
    fontSize: 18,
    color: '#FFF',
  },
  continueButton: {
    backgroundColor: '#004D40',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
    elevation: 2,
  },
  continueButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SelectLocationScreen
