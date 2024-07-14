import React, { useState } from 'react';
import { ImageBackground, Image, View, StyleSheet, Alert } from 'react-native';
import AddressAutocomplete from './AddressAutocomplete';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';

const BackgroundContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  color: '#fff',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', 
});

const Root = styled(Box)({
  textAlign: 'center',
  padding: '20px',
  backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background for better readability
  borderRadius: '10px',
});

const Title = styled(Typography)({
  marginBottom: '20px',
  color: '#fff', // White text
});

const FiltersContainer = styled(Box)({
  marginTop: '20px',
});

const StyledTextField = styled(TextField)({
  width: '80px',
  backgroundColor: '#fff',
  borderRadius: '5px',
});

const ContinueButton = styled(Button)({
  marginTop: '20px',
  backgroundColor: 'green',
  color: '#fff',
  '&:hover': {
    backgroundColor: 'darkgreen',
  },
});

const RoutePlannerScreen = ({ navigation }) => {
  const [address, setAddress] = useState('');
  const [kosher, setKosher] = useState(false);
  const [vegan, setVegan] = useState(false);
  const [stops, setStops] = useState(1);

  const handleAddressSelect = (place) => {
    setAddress(place.formatted_address);
  };

  const handleSubmit = async () => {
    const data = {
      address,
      kosher,
      vegan,
      num_stops: stops,
    };

    try {
      const response = await fetch('https://eatventure-15176c479d24.herokuapp.com/api/tour/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    
      const result = await response.json();
      if (response.ok) {
        navigation.navigate('Trip',  { places: result, userAddress: address });
      } else {
        Alert.alert('Search Failed', result.message || 'Something went wrong');
      }

    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <ImageBackground source={require('../assets/hand.jpeg')} style={styles.backgroundImage}>
      <BackgroundContainer>
        <Root>
          <Title variant="h4">
            Culinary Food Route
          </Title>
          <Typography variant="body1">
            Enter your address to get suggestions for a culinary food route in your location.
          </Typography>
          <AddressAutocomplete onAddressSelect={handleAddressSelect} />
          <FiltersContainer>
            <FormControlLabel
              control={
                <Checkbox
                  checked={kosher}
                  onChange={(e) => setKosher(e.target.checked)}
                  name="kosher"
                  color="primary"
                />
              }
              label="Kosher"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={vegan}
                  onChange={(e) => setVegan(e.target.checked)}
                  name="vegan"
                  color="primary"
                />
              }
              label="Vegan"
            />
            <StyledTextField
              type="number"
              label="Stops"
              value={stops}
              onChange={(e) => setStops(e.target.value)}
              inputProps={{ min: 1 }}
              margin="normal"
              variant="outlined"
            />
            <ContinueButton variant="contained" onClick={handleSubmit}>
              Continue
            </ContinueButton>
          </FiltersContainer>
        </Root>
      </BackgroundContainer>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  innerContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
});

export default RoutePlannerScreen;
