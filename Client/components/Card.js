import React from 'react'
import { View, Text, StyleSheet, ImageBackground, Dimensions, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { useSelector } from 'react-redux';

const Card = ({ place, url }) => {
  const { location } = useSelector(state => state.location);
  const imgURL = url + place.imgURL;

  const isOpen = () => {
    const date = new Date().toString();
    const currentTime = date.match(/\d{2}:\d{2}(?=:)/).join();
    return place.hours.opens < currentTime && place.hours.closes > currentTime
  }

  const toggleDetailView = () => {
    console.log(place.distance)
  }

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={() => toggleDetailView()}>
    <ImageBackground source={{ uri: imgURL }} imageStyle={{ borderRadius: 12 }} style={styles.cardBackground}>
      <Text style={[styles.hours, { backgroundColor: isOpen() ? 'rgba(77,115,79,0.8)' : 'rgba(223,129,135,0.5)' }]}>Open {place.hours.opens.split(':')[0]}-{place.hours.closes.split(':')[0]}</Text>
      <Text style={styles.heading}>{place.name}</Text>
      <Text style={styles.address}>{place.address.street}</Text>
      <Text style={styles.membersHere}>Members here</Text>
      <Text style={styles.capacity}>{place.currentUsers}/{place.capacity}</Text>
      <Text style={styles.highlights}>{place.info.highlights.join(' · ')}</Text>
      <View style={styles.overlay} />
      <TouchableOpacity title="Hello"></TouchableOpacity>
    </ImageBackground>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  cardBackground: {
    width: Dimensions.get('window').width - 100,
    height: Dimensions.get('window').width * 0.50,
    marginTop: 25,
    marginBottom: 25,
    paddingTop: 10,
    paddingRight: 16,
    paddingBottom: 10,
    paddingLeft: 16,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 12,
    zIndex: 0
  },
  hours: {
    color: 'white',
    zIndex: 1,
    fontSize: 10,
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 6,
    alignSelf: 'flex-start'
  },
  heading: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    zIndex: 1
  },
  address: {
    color: 'white',
    zIndex: 1,
    fontSize: 11
  },
  membersHere: {
    color: 'white',
    zIndex: 1,
    textAlign: 'right',
    fontSize: 11,
    fontWeight: 'bold',
    paddingTop: 25
  },
  capacity: {
    color: 'white',
    zIndex: 1,
    textAlign: 'right',
    fontSize: 20,
    fontWeight: 'bold',
  },
  highlights: {
    color: 'white',
    zIndex: 1,
    fontSize: 8,
    textAlign: 'center',
    position: 'absolute',
    bottom: 13,
    left: 16,
    width: '100%'
  }
})


export default Card
