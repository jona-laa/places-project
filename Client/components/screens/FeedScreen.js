import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useSelector } from 'react-redux';

const FeedScreen = () => {

  const { notifications } = useSelector(state => state.notifications)

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <FlatList data={notifications} />
    </View>
  )
}

export default FeedScreen;
