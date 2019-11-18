import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import Constants from 'expo-constants';
import Card from '../Card';

const HomeScreen = () => {

  const [list, setList] = useState(null);

  const baseUrl = 'http://192.168.35.146:8080/';

  const fetchList = () => {
    fetch(`${baseUrl}api/restaurants`)
      .then(res => res.json())
      .then(data => setList(data))
      .catch(err => console.log(err))
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <View style={{ flex: 1, marginTop: Constants.statusBarHeight+10, justifyContent: 'center', alignItems: 'center' }}>
      {list ? <FlatList
        data={list}
        keyExtractor={item => item.id}
      renderItem={({ item }) => <Card url={} place={item} />} />
        : <Text>no data yet</Text>}
      <Button title="CLICKME" onPress={() => fetchList()} />
    </View>
  )
};

export default HomeScreen;