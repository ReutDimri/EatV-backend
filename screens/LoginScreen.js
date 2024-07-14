import React, { useState } from 'react';
import { View, TextInput, Pressable, StyleSheet, Alert, Text, Image } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch(`https://eatventure-15176c479d24.herokuapp.com/api/login/?email=${email}&password=${password}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();
      console.log(data.message);
      if (response.ok) {
        Alert.alert('Login Success', 'You have successfully logged in');
        if (data.user.is_business_owner)
          navigation.navigate('BusinessOwner')
        else
          navigation.navigate('Home');
      } else {
        Alert.alert('Login Failed', data.message || 'Something went wrong');
      }
    } catch (error) {
      Alert.alert('Login Error', 'An error occurred. Please try again.');
      console.error(error);
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.overlay}>
        <Image source={require('../assets/Eat-Venture.png')} style={styles.logo} />
        <Text style={styles.title}>Login</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#B2DFDB"
          value={email}
          onChangeText={setEmail}
          inputMode="email"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#B2DFDB"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Pressable
          style={styles.button}
          onPress={handleLogin}
          role="button"
        >
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate('Signup')}
          role="link"
        >
          <Text style={styles.signupText}>Don't have an account? Sign Up</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#00796B', // Green background
  },
  overlay: {
    flex: 1,
    backgroundColor: '#E0F7FA',
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
    fontSize: 34,
    fontWeight: 'bold',
    color: '#00796B',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: '#00796B',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
    alignItems: 'center',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', 
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupText: {
    marginTop: 16,
    color: 'blue',
    textAlign: 'center',
  },
});

export default LoginScreen;
