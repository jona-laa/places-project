import React from 'react';
import NavBar from './components/NavBar';
import { store } from './redux/store/store';
import { Provider } from 'react-redux';


const App = () => {
  return (
  <Provider store={store}>
    <NavBar />
  </Provider>
  );
}


export default App;