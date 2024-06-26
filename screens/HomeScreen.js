import React from 'react';
import { Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const HomeScreen = ({ navigation}) => {
  return (
    <LinearGradient
      colors={['#00796B', '#004D40']}
      style={styles.container}
    >
      <Image source={require('../assets/Eat-Venture.png')} style={styles.logo} />
      <Text style={styles.title}>Welcome to EatVenture</Text>
      <Text style={styles.subtitle}>Explore the best food adventures around you!</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('SelectLocation')}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#B2DFDB',
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#004D40',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
