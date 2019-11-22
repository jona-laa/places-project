import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Constants from 'expo-constants';


const InfoScreen = () => {
  return (
    <View style={styles.infoScreen}>
      <View style={styles.headingText}>
        <Text style={styles.heading}>
          About Places
      </Text>
      </View>
      <Text>
        Places transforms under-utilized city space into a network of playful coworking, creating a tribe like community of creatives and startups.{'\n'}{'\n'}
      </Text>
      <Text>
        Follow these steps to start using Places:{'\n'}{'\n'}
        1. Go to joinplaces.co/join{'\n'}{'\n'}
        2. Enter your details and wait for a call from us.{'\n'}{'\n'}
        3. If accepted, enter billion details.{'\n'}{'\n'}
        4. Welcome to Places!{'\n'}
      </Text>
      <Text style={{textAlign:'center', width: Dimensions.get('window').width, alignSelf: 'center', position: 'absolute', bottom: 30}}>
        Places AB{'\n'}
        hello@joinplaces.co{'\n'}
        +46 79 079 0632{'\n'}
        Östermalmsgatan 26A, {'\n'}
        114 26 Stockholm{'\n'}
        Org. Nr: 559213-9694{'\n'}
        </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  infoScreen: {
    flex: 1,
    marginTop: Constants.statusBarHeight + 10,
    alignItems: 'flex-start',
    width: Dimensions.get('window').width,
    paddingHorizontal: 30
  },
  view: {
    flex: 1,
    marginTop: Constants.statusBarHeight + 10,
    alignItems: 'center',
    width: Dimensions.get('window').width
  },
  heading: {
    fontSize: 30,
    textAlign: 'left',
    fontWeight: 'bold',
    paddingLeft: 30,
    paddingTop: 30,
    paddingBottom: 15,
    color: '#4D4D4D'
  },
  headingText: {
    width: Dimensions.get('window').width
  }
})

export default InfoScreen;