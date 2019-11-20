import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native';
import Constants from 'expo-constants';
import Card from '../Card';
import { useSelector, useDispatch } from 'react-redux';
import { placesToList } from '../../redux/actions/places';

const HomeScreen = () => {
  const { places } = useSelector(state => state.places)
  const dispatch = useDispatch();
  const baseUrl = 'http://192.168.35.146:3000';

  const fetchList = () => {
    fetch(`${baseUrl}/api/places`)
      .then(res => res.json())
      .then(data => dispatch(placesToList(data)))
      .catch(err => console.log(err))
  };

  useEffect(() => {
    fetchList();
  }, [dispatch]);

  return (
    <View style={styles.view}>
      <View style={styles.headingText}>
        <Text style={styles.heading}>
          Available Places
      </Text>
      </View>

      {places ? <FlatList
        showsVerticalScrollIndicator={false}
        data={places}
        keyExtractor={item => item._id}
        renderItem={({ item }) => <Card url={baseUrl} place={item} />} />
        : <Text>no data yet</Text>}
    </View>
  )
};


const styles = StyleSheet.create({
  view: {
    flex: 1,
    marginTop: Constants.statusBarHeight + 10,
    alignItems: 'center',
    width: Dimensions.get('window').width
  },
  heading: {
    fontSize: 30,
    textAlign: "left",
    fontWeight: 'bold',
    paddingLeft: 30,
    paddingTop: 30,
    paddingBottom: 15,
  },
  headingText: {
    width: Dimensions.get('window').width
  }
})

export default HomeScreen;