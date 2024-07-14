import React from 'react';
import { View, StyleSheet, FlatList, Text, Linking, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';

const TripScreen = ({ route }) => {
  const { places, userAddress } = route.params;
  console.log('Received places:', places);
  console.log('User address:', userAddress);

  const renderPlace = ({ item, index }) => (
    <Card style={[styles.card, index === 0 ? styles.startCard : index === places.length - 1 ? styles.endCard : {}]}>
      <Card.Content>
        <Title>{index === 0 ? "Start: " : index === places.length - 1 ? "Finish: " : `Stop ${index + 1}: `}{item.place_name}</Title>
        <Paragraph>{item.food_category}</Paragraph>
        <Paragraph>{item.address}, {item.city}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button onPress={() => openSpecificPlaceOnMap(item)}>View on Map</Button>
      </Card.Actions>
    </Card>
  );

  const openGoogleMaps = () => {
    const origin = encodeURIComponent(userAddress);
    const destination = `${places[places.length - 1].latitude},${places[places.length - 1].longitude}`;
    const waypoints = places.slice(0, places.length - 1)
      .map(place => `${place.latitude},${place.longitude}`)
      .join('|');

    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&waypoints=${waypoints}`;
    Linking.openURL(googleMapsUrl);
  };

  const openSpecificPlaceOnMap = (place) => {
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${place.latitude},${place.longitude}`;
    Linking.openURL(googleMapsUrl);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.routeTitle}>Your Culinary Route</Text>
        {places && places.length > 0 ? (
          <FlatList
            data={places}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderPlace}
          />
        ) : (
          <Paragraph>No places to show</Paragraph>
        )}
        <TouchableOpacity style={styles.button} onPress={openGoogleMaps}>
          <Text style={styles.buttonText}>Open in Google Maps</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#00796B', // Green background
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  card: {
    marginBottom: 16,
    borderLeftWidth: 5,
    borderLeftColor: 'gray',
  },
  startCard: {
    borderLeftColor: 'green',
  },
  endCard: {
    borderLeftColor: 'red',
  },
  routeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'green',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default TripScreen;
