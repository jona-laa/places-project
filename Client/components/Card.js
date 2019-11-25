import React, { useEffect } from 'react'
import { View, Text, StyleSheet, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCheckingIn } from '../redux/actions/checkingIn'

const Card = ({ place, url, fetchList }) => {
  const { checkingIn } = useSelector(state => state);
  const dispatch = useDispatch();
  const imgURL = url + place.imgURL;
  const isNear = place.distance < 0.01;

  const isOpen = () => {
    const date = new Date().toString();
    const currentTime = date.match(/\d{2}:\d{2}(?=:)/).join();
    return place.hours.opens < currentTime && place.hours.closes > currentTime
  }

  const toggleDetailView = () => {
    console.log(place.distance)
    fetchList();
  }

  const delayFetch = useEffect(() => {
    const timer = setTimeout(() => {
      fetchList()
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const dispatchToggleCheckingIn = () => {
    dispatch(toggleCheckingIn(checkingIn));
    fetchPatch();
    delayFetch;
  }

  const fetchPatch = () => {
    fetch(`${url}/api/places/${place._id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        status: {
          isCheckedIn: checkingIn
        }
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
  }

  const cardBackground = () => {
    if (isNear) {
      return {
        width: Dimensions.get('window').width - 100,
        height: Dimensions.get('window').width * 0.5 + 40,
        marginTop: 25,
        marginBottom: 25,
        paddingTop: 10,
        paddingRight: 16,
        paddingBottom: 10,
        paddingLeft: 16,
      }
    }
    return {
      width: Dimensions.get('window').width - 100,
      height: Dimensions.get('window').width * 0.50,
      marginTop: 25,
      marginBottom: 25,
      paddingTop: 10,
      paddingRight: 16,
      paddingBottom: 10,
      paddingLeft: 16,
    }
  };

  const highlights = () => {
    if (isNear) {
      return {
        color: '#B6B6B6',
        zIndex: 1,
        fontSize: 8,
        textAlign: 'center',
        position: 'absolute',
        bottom: 48,
        left: 16,
        width: '100%'
      }
    }
    return {
      color: '#B6B6B6',
      zIndex: 1,
      fontSize: 8,
      textAlign: 'center',
      position: 'absolute',
      bottom: 13,
      left: 16,
      width: '100%'
    }
  }

  const renderButton = () => {
    if (isNear) {
      return <TouchableOpacity style={styles.toggleCheckIn} activeOpacity={1} onPress={() => dispatchToggleCheckingIn()}>
        <Text style={styles.toggleCheckIn_text}>{checkingIn ? 'Check In' : 'Check Out'}</Text>
      </TouchableOpacity>
    }
  }

  return (
    <TouchableOpacity activeOpacity={1} onPress={() => toggleDetailView()}>
      <ImageBackground source={{ uri: imgURL }} imageStyle={{ borderRadius: 12 }} style={cardBackground()}>
        <Text style={[styles.hours, { backgroundColor: isOpen() ? 'rgba(102,225,137,0.45)' : 'rgba(225,102,102,0.45)' }]}>Open {place.hours.opens.split(':')[0]}-{place.hours.closes.split(':')[0]}</Text>
        <Text style={styles.heading}>{place.name}</Text>
        <Text style={styles.address}>{place.address.street}</Text>
        <Text style={styles.membersHere}>Members here</Text>
        <Text style={styles.capacity}>{place.currentUsers}/{place.capacity}</Text>
        <Text style={highlights()}>{place.info.highlights.join(' · ')}</Text>
        <View style={styles.overlay} />
        {renderButton()}
      </ImageBackground>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  toggleCheckIn_text2: {
    display: 'none'
  },
  toggleCheckIn_text: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
    zIndex: 1
  },
  toggleCheckIn: {
    backgroundColor: '#FA8993',
    position: 'absolute',
    bottom: 0,
    width: Dimensions.get('window').width - 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    padding: 10
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.75)',
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
    color: '#B6B6B6',
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
