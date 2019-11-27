import React from 'react'
import Login from './Login';
import NavBar from './NavBar';
import { View } from 'react-native'
import { useSelector,Provider } from 'react-redux'
import { store } from '../redux/store/store';



const LoginVerification = () => {

  const loggedIn = useSelector(state => state.login);

  return (
    <Provider store={store}>
      {/* {loggedIn ? <NavBar /> : <Login/>} */}
      <NavBar />
    </Provider>
  )
}

export default LoginVerification