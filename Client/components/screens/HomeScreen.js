import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native';
import Constants from 'expo-constants';
import Card from '../Card';
import { bold } from 'ansi-colors';

const HomeScreen = () => {

  const [list, setList] = useState(null);

  const baseUrl = 'http://192.168.35.146:8080';

  const fetchList = () => {
    fetch(`${baseUrl}/api/restaurants`)
      .then(res => res.json())
      .then(data => setList(data))
      .catch(err => console.log(err))
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <View style={styles.view}>
      <View style={styles.headingText}>
        <Text style={styles.heading}>
          Available Places
      </Text>
      </View>
      <View>

        {list ? <FlatList
          data={list}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <Card url={baseUrl} place={item} />} />
          : <Text>no data yet</Text>}
      </View>
    </View>
  )
};


const styles = StyleSheet.create({
  view: {
    flex: 1,
    marginTop: Constants.statusBarHeight + 10,
    alignItems: 'center',
  },
  heading: {
    fontSize: 30,
    textAlign: "left",
    fontWeight: 'bold',
    paddingLeft: 30,
    paddingTop: 30,
  },
  headingText: {
    width: Dimensions.get('window').width
  }
})

export default HomeScreen;