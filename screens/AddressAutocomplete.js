import React, { useState, useRef, useCallback } from 'react';
import { LoadScript, StandaloneSearchBox } from '@react-google-maps/api';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';


const libraries = ['places'];
const apiKey = 'AIzaSyAJLe6L_bHnzqC6K3YO0ET_iw7D1gmo07I';

const Container = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
});

const InputField = styled(TextField)({
  width: '100%',
  maxWidth: 400,
  margin: '0 auto',
  backgroundColor: '#fff',
  borderRadius: '5px',
});

const AddressAutocomplete = ({ onAddressSelect }) => {
  const [address, setAddress] = useState('');
  const searchBoxRef = useRef(null);

  const onLoad = useCallback((ref) => {
    searchBoxRef.current = ref;
  }, []);

  const onPlacesChanged = useCallback(() => {
    const places = searchBoxRef.current.getPlaces();
    const place = places[0];
    if (place) {
      setAddress(place.formatted_address);
      onAddressSelect(place);
    }
  }, [onAddressSelect]);

  return (
    <LoadScript googleMapsApiKey={apiKey} libraries={libraries}>
      <Container>
        <StandaloneSearchBox onLoad={onLoad} onPlacesChanged={onPlacesChanged}>
          <InputField
            label="Enter an address"
            variant="outlined"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </StandaloneSearchBox>
      </Container>
    </LoadScript>
  );
};

export default AddressAutocomplete;