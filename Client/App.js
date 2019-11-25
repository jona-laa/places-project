import React from 'react';
import NavBar from './components/NavBar';
import GeoLocation from './components/GeoLocation';
import PushHandler from './components/PushHandler';
import { store } from './redux/store/store';
import { Provider } from 'react-redux';


const App = () => {
  return (
    <Provider store={store}>
      <NavBar />
      <GeoLocation />
      <PushHandler />
    </Provider>
  );
}


export default App;