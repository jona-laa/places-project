import React, { useState, useEffect } from 'react'
import Places from './components/Places'
import Users from './components/Users'
import './App.css';

function App() {

  const [showingPlaces, setShowingPlaces] = useState(true)

  const showPlaces = (bool) => {
    setShowingPlaces(bool)
  }

  useEffect(() => {
    document.title = "Places Dashboard"
  }, []);

  return (
    <div className='App'>
      <header className='header'>
        <p>PLACES - DASHBOARD</p>
        <nav className='main-nav'>
          <ul className='main-nav__ul'>
            <li className='main-nav__ul__li' onClick={() => showPlaces(true)}><button className='nav-button'>Places</button></li>
            <li className='main-nav__ul__li' onClick={() => showPlaces(false)}><button className='nav-button'>Users</button></li>
          </ul>
        </nav>
      </header>
      <main>
        {showingPlaces ? <Places /> : <Users />}
      </main>
    </div>
  );
}

export default App;
