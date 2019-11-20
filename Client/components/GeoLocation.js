import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { useSelector, useDispatch } from 'react-redux';
import { updateLocation, setErrorMessage } from '../redux/actions/location'

const GeoLocation = () => {
  const location = useSelector(state => state.location)
  const place = useSelector(state => state.places)
  const dispatch = useDispatch()

  useEffect(() => {
    _getLocationAsync();
  }, [])

  const getCoordinates = async (street) => {
    const coordinates = await Location.geocodeAsync(street);
    const placeCoordAverage = coordinates[0].longitude + coordinates[0].latitude;
    if (location.location) {
      return placeCoordAverage - locationAverage()
    }
  }

  place.places.length ? place.places.map(async (place, index) => {
    // console.log(index, place);
    console.log(await getCoordinates(place.address.street));
  }) : console.log('loading things');

  const _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      dispatch(setErrorMessage('Permission to access location was denied'));
    }

    let location = await Location.getCurrentPositionAsync({});
    //let location = await Location.reverseGeocodeAsync(geocode.coords);
    dispatch(updateLocation({ location }))
  };

  const locationAverage = () => {
    const lat = location.location.location.coords.latitude;
    const long = location.location.location.coords.longitude;
    return (long + lat);
  }

  location.location ? console.log(locationAverage()) : console.log('fetching')

  return null;
}




export default GeoLocation
