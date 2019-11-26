import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const FeedCard = ({data:{item:{data:{message, title}}}}) => {

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    paddingBottom: 30,
    paddingTop: 23,
    borderBottomWidth: 0.5,
    width: Dimensions.get('window').width - 40
  },
  title: {
    fontWeight: '600',
    paddingBottom: 10,
    paddingLeft: 10
  },
  message: {
    paddingLeft: 10
  }
})

export default FeedCard
