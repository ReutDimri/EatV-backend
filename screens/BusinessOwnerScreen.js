import React, { useState } from 'react';
import { Text, StyleSheet, Image, TouchableOpacity, TextInput, View, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Picker } from '@react-native-picker/picker';

const BusinessOwnerScreen = ({ navigation }) => {
  const [placeName, setPlaceName] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [foodCategory, setFoodCategory] = useState('');
  const [isKosher, setIsKosher] = useState(false);
  const [hasVeganOption, setHasVeganOption] = useState(false);
  const [recommendedDishes, setRecommendedDishes] = useState('');
  const [link, setLink] = useState('');

  const categoryChoices = [
    'Israeli', 'Italian', 'Chinese', 'Mexican', 'Grill', 'Meat', 'Seafood', 
    'Vegetarian', 'Vegan', 'Fast Food', 'Dessert', 'Cafe', 'Bar', 'Pub', 
    'Brewery', 'Steakhouse', 'Sushi', 'Food Truck', 'Bakery', 'Deli', 
    'Juice Bar', 'Asian', 'Vietnamese', 'Moroccan'
  ];

  const handleAddBusiness = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/add_business/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          place_name: placeName,
          city: city,
          address: address,
          food_category: foodCategory,
          is_kosher: isKosher,
          has_vegan_option: hasVeganOption,
          recommended_dishes: recommendedDishes,
          link: link,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Business information has been added successfully');
        navigation.navigate('Home');
      } else {
        Alert.alert('Failed', data.message || 'Something went wrong');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred. Please try again.');
      console.error(error);
    }
  };

  return (
    <LinearGradient
      colors={['#00796B', '#004D40']}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={require('../assets/Eat-Venture.png')} style={styles.logo} />
        <Text style={styles.title}>Add Your Business</Text>

        <TextInput
          style={styles.input}
          placeholder="Place Name"
          placeholderTextColor="#B2DFDB"
          value={placeName}
          onChangeText={setPlaceName}
        />
        <TextInput
          style={styles.input}
          placeholder="City"
          placeholderTextColor="#B2DFDB"
          value={city}
          onChangeText={setCity}
        />
        <TextInput
          style={styles.input}
          placeholder="Address"
          placeholderTextColor="#B2DFDB"
          value={address}
          onChangeText={setAddress}
        />
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={foodCategory}
            style={styles.picker}
            onValueChange={(itemValue) => setFoodCategory(itemValue)}
          >
            <Picker.Item label="Select Food Category" value="" />
            {categoryChoices.map((category) => (
              <Picker.Item key={category} label={category} value={category} />
            ))}
          </Picker>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Recommended Dishes (optional)"
          placeholderTextColor="#B2DFDB"
          value={recommendedDishes}
          onChangeText={setRecommendedDishes}
        />
        <TextInput
          style={styles.input}
          placeholder="Link (optional)"
          placeholderTextColor="#B2DFDB"
          value={link}
          onChangeText={setLink}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleAddBusiness}
        >
          <Text style={styles.buttonText}>Add Business</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
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
  input: {
    width: '80%',
    height: 50,
    backgroundColor: '#004D40',
    borderRadius: 25,
    paddingHorizontal: 20,
    color: '#FFFFFF',
    marginBottom: 20,
  },
  pickerContainer: {
    width: '80%',
    height: 50,
    backgroundColor: '#004D40',
    borderRadius: 25,
    marginBottom: 20,
    justifyContent: 'center',
  },
  picker: {
    color: '#FFFFFF',
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#004D40',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BusinessOwnerScreen;
