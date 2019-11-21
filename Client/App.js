import React from 'react';
import NavBar from './components/NavBar';
import GeoLocation from './components/GeoLocation';
import { store } from './redux/store/store';
import { Provider } from 'react-redux';


const App = () => {
  return (
    <Provider store={store}>
      <NavBar />
      <GeoLocation />
    </Provider>
  );
}


export default App;