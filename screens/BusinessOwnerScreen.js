import React, { useState } from 'react';
import { Text, StyleSheet, Image, Pressable, TextInput, View, Alert, Switch, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';

const BusinessOwnerScreen = ({ navigation }) => {
  const [placeName, setPlaceName] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [foodCategory, setFoodCategory] = useState('');
  const [isKosher, setIsKosher] = useState(false);
  const [hasVeganOption, setHasVeganOption] = useState(false);
  const [recommendedDishes, setRecommendedDishes] = useState('');
  const [link, setLink] = useState('');
  const [image, setImage] = useState(null);

  const categoryChoices = [
    'Israeli', 'Italian', 'Chinese', 'Mexican', 'Grill', 'Meat', 'Seafood', 
    'Vegetarian', 'Vegan', 'Fast Food', 'Dessert', 'Cafe', 'Bar', 'Pub', 
    'Brewery', 'Steakhouse', 'Sushi', 'Food Truck', 'Bakery', 'Deli', 
    'Juice Bar', 'Asian', 'Vietnamese', 'Moroccan'
  ];
  
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  const handleAddBusiness = async () => {
    try {
      const formData = new FormData();
      formData.append('place_name', placeName);
      formData.append('city', city);
      formData.append('address', address);
      formData.append('food_category', foodCategory);
      formData.append('is_kosher', isKosher);
      formData.append('has_vegan_option', hasVeganOption);
      formData.append('recommended_dishes', recommendedDishes);
      formData.append('link', link);
      if (image) {
        formData.append('image', {
          uri: image,
          type: 'image/jpeg',
          name: 'business_image.jpg',
        });
      }

      const response = await fetch('http://127.0.0.1:8000/api/create_place/', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
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
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.innerContainer}>
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

            <Text style={styles.selectedCategory}>{foodCategory}</Text>

            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>Is Kosher</Text>
              <Switch
                value={isKosher}
                onValueChange={setIsKosher}
              />
            </View>

            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>Has Vegan Option</Text>
              <Switch
                value={hasVeganOption}
                onValueChange={setHasVeganOption}
              />
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
            <Pressable
              style={styles.button}
              onPress={pickImage}
            >
              <Text style={styles.buttonText}>Pick an image from gallery</Text>
            </Pressable>

            {image && <Image source={{ uri: image }} style={styles.previewImage} />}

            <Pressable
              style={styles.button}
              onPress={handleAddBusiness}
            >
              <Text style={styles.buttonText}>Add Business</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: 20,
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
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
  selectedCategory: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 20,
  },
  switchContainer: {
    width: '80%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    backgroundColor: '#004D40',
    borderRadius: 25,
    paddingHorizontal: 20,
  },
  switchLabel: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#004D40',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  previewImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
});

export default BusinessOwnerScreen;
