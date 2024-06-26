import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Picker, TouchableOpacity, Alert, Image, ImageBackground } from 'react-native';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';

const SelectLocationScreen = ({ navigation }) => {
    const [location, setLocation] = useState(null);
    const [city, setCity] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [cities, setCities] = useState([]);
    const [neighborhoods, setNeighborhoods] = useState([]);
  
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
    
      useEffect(() => {
        // Fetch cities from your API
        fetch('http://127.0.0.1:8000/api/places/')
          .then(response => response.json())
          .then(data => {
            console.log(data);
            setCities(data)})
          .catch(error => console.error(error));
      }, []);
    
      useEffect(() => {
        if (city) {
          // Fetch neighborhoods from your API based on selected city
          fetch(`http://127.0.0.1:8000/api/neighborhoods?city=${city}`)
            .then(response => response.json())
            .then(data => setNeighborhoods(data))
            .catch(error => console.error(error));
        }
      }, [city]);

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
        <Text style={styles.label}>Select City</Text>
        <Picker
          selectedValue={city}
          style={styles.picker}
          onValueChange={(itemValue) => setCity(itemValue)}>
          {cities.map((city) => (
            <Picker.Item key={city.id} label={city.name} value={city.name} />
          ))}
        </Picker>
        <Text style={styles.label}>Select Neighborhood</Text>
        <Picker
          selectedValue={neighborhood}
          style={styles.picker}
          onValueChange={(itemValue) => setNeighborhood(itemValue)}>
          {neighborhoods.map((neighborhood) => (
            <Picker.Item key={neighborhood.id} label={neighborhood.name} value={neighborhood.name} />
          ))}
        </Picker>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

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
  picker: {
    height: 50,
    width: '80%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 20,
    elevation: 2,
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

export default SelectLocationScreen;
