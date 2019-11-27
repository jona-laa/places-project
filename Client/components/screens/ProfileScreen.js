import React, {useEffect} from 'react';
import { View, Text, StyleSheet, Dimensions, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Constants from 'expo-constants';
import { setProfileData } from '../../redux/actions/profile'
import { setLogin } from '../../redux/actions/login'


const ProfileScreen = () => {


  const dispatch = useDispatch()
  const { profile, checkingIn, login } = useSelector(state => state)
  const baseUrl = 'http://192.168.35.146:3000';
  const userID = '5dd50ab87153751890c06087';

  const getUserData = () => {
    fetch(`${baseUrl}/api/users/${userID}`)
      .then(res => res.json())
      .then(data => dispatch(setProfileData(data)))
  }

  useEffect(() => {
    getUserData()
  }, [checkingIn])

  return (
<View style={styles.profileScreen}>
      <View style={styles.headingText}>
        <Text style={styles.heading}>
          Profile
      </Text>
      </View>
      <Button title='LOGOUT' onPress={() => dispatch(setLogin(!login))} />
      <Text>{profile && profile.name.firstName}</Text>
      <Text>{profile && profile.name.lastName}</Text>
      <Text>{profile && profile.contactInfo.phone}</Text>
      <Text>{profile && profile.contactInfo.email}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  profileScreen: {
    marginTop: Constants.statusBarHeight + 10,
    alignItems: 'center'
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

export default ProfileScreen;