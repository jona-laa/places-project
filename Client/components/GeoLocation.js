import React, { useEffect, useRef } from 'react';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { useDispatch } from 'react-redux';
import { updateLocation, setErrorMessage } from '../redux/actions/location'

const GeoLocation = () => {
  const dispatch = useDispatch()

  // Update state every 5 seconds
  const useInterval = (callback, delay) => {
    const savedCallback = useRef();

    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      const tick = () => savedCallback.current();
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  useInterval(() => {
    getLocationSum();
  }, 500);

  // Sum of current position long + lat
  const locationSum = (geo) => geo.coords.latitude + geo.coords.longitude;

  // Updates state
  const getLocationSum = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      dispatch(setErrorMessage('Permission to access location was denied'));
    }
    let geoLocation = await Location.getCurrentPositionAsync({});
    dispatch(updateLocation(locationSum(geoLocation)))
  };

  return null;
}
export default GeoLocation
