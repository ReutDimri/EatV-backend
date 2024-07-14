import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, Switch } from 'react-native';

const SignupScreen = ({ navigation }) => {
    const [full_name, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [is_business_owner, setIsBusinessOwner] = useState(false);
    const [businessName, setBusinessName] = useState('');


  const handleSignup = async () => {
    const userData = {
        full_name,
        email,
        password,
        is_business_owner,
        businessName: is_business_owner ? businessName : null
      };
      console.log('User data:', userData); // Log the data being sent

    try {
      const response = await fetch('https://eatventure-15176c479d24.herokuapp.com/api/signup/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          full_name,
          email,
          password,
          is_business_owner,
          businessName: is_business_owner ? businessName : null
        }),
      });

      const data = await response.json();
      if (response.ok) {
        //Alert.alert('Sign Up Success', 'You have successfully signed up');
        console.log('Sign Up Success', 'You have successfully signed up')
        // Navigate to the Login screen or another screen
        navigation.navigate('Login');
      } else {
        //Alert.alert('Sign Up Failed', data.message || 'Something went wrong');
        console.log('Sign Up Failed', data.message || 'Something went wrong')
      }
    } catch (error) {
      //Alert.alert('Sign Up Error', 'An error occurred. Please try again.');
      console.error(error);
    }
  };

return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Image source={require('../assets/Eat-Venture.png')} style={styles.logo} />
        <Text style={styles.title}>Sign Up</Text>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={full_name}
          onChangeText={setFullName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Business Owner</Text>
          <Switch
            value={is_business_owner}
            onValueChange={setIsBusinessOwner}
          />
        </View>
        {is_business_owner && (
          <TextInput
            style={styles.input}
            placeholder="Business Name"
            value={businessName}
            onChangeText={setBusinessName}
          />
        )}
        <Button title="Sign Up" onPress={handleSignup} />
        <Text style={styles.loginText} onPress={() => navigation.navigate('Login')}>
          Already have an account? Login
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#00796B', // Green background
  },
  container: {
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
    fontSize: 24,
    marginBottom: 20,
    color: '#00796B',
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#00796B',
    borderRadius: 5,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  switchLabel: {
    marginRight: 10,
    color: '#00796B',
  },
  loginText: {
    marginTop: 20,
    color: '#00796B',
    textDecorationLine: 'underline',
  },
});

export default SignupScreen;
