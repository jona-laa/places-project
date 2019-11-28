import React, { useState, useEffect } from 'react'
import ListPlaces from './ListPlaces'
import Push from './Push'




const Places = () => {
  const [places, setPlaces] = useState(null)
  const [showPush, setShowPush] = useState(false)

  const baseUrl = 'http://192.168.35.146:3000';

  const [createPlaceClicked, setCreatePlaceClicked] = useState(false)
  const [placeName, setPlaceName] = useState('')
  const [placeImgUrl, setPlaceImgUrl] = useState('')
  const [placeStreet, setPlaceStreet] = useState('')
  const [placeZip, setPlaceZip] = useState('')
  const [placeCity, setPlaceCity] = useState('')
  const [placeLongitude, setPlaceLongitude] = useState('')
  const [placeLatitude, setPlaceLatitude] = useState('')
  const [placeOpens, setPlaceOpens] = useState('')
  const [placeCloses, setPlaceCloses] = useState('')
  const [placeDescription, setPlaceDescription] = useState('')
  const [placeHighlights, setPlaceHighlights] = useState('')
  const [placeCapacity, setPlaceCapacity] = useState(0)
  const [placeLaunched, setPlaceLaunched] = useState(false)

  const createPlaceForm = <div className='form'>
    <div className='form__row'>
      <p>Name: </p><input type='text' defaultValue={placeName} placeholder='Required' onChange={(e) => setPlaceName(e.target.value)} />
    </div>
    <div className='form__row'>
      <p>Launched: </p>
      <input type='checkbox' className='checkbox' defaultChecked={placeLaunched} onChange={() => setPlaceLaunched(!placeLaunched)} />
    </div>
    <div className='form__row'>
      <p>Address: </p>
      <input type='text' placeholder='Required' defaultValue={placeStreet} onChange={(e) => setPlaceStreet(e.target.value)} />
    </div>
    <div className='form__row'>
      <p>City: </p>
      <input type='text' placeholder='Required' defaultValue={placeCity} onChange={(e) => setPlaceCity(e.target.value)} />
    </div>
    <div className='form__row'>
      <p>Postal: </p>
      <input type='text' placeholder='Required' defaultValue={placeZip} onChange={(e) => setPlaceZip(e.target.value)} />
    </div>
    <div className='form__row'>
      <p>Long: </p>
      <input type='text' placeholder='Required' defaultValue={placeLongitude} onChange={(e) => setPlaceLongitude(e.target.value)} />
    </div>
    <div className='form__row'>
      <p>Lat: </p>
      <input type='text' placeholder='Required' defaultValue={placeLatitude} onChange={(e) => setPlaceLatitude(e.target.value)} />
    </div>
    <div className='form__row'>
      <p>Opens: </p>
      <input type='text' placeholder='00:00' defaultValue={placeOpens} onChange={(e) => setPlaceOpens(e.target.value)} />
    </div>
    <div className='form__row'>
      <p>Closes: </p>
      <input type='text' placeholder='00:00' defaultValue={placeCloses} onChange={(e) => setPlaceCloses(e.target.value)} />
    </div>
    <div className='form__row'>
      <p>HighLights: </p>
      <input type='text' placeholder='Required' defaultValue={placeHighlights} onChange={(e) => setPlaceHighlights(e.target.value)} />
    </div>
    <div className='form__row'>
      <p>Description: </p>
      <input type='text' placeholder='Required' defaultValue={placeDescription} onChange={(e) => setPlaceDescription(e.target.value)} />
    </div>
    <div className='form__row'>
      <p>Capacity: </p>
      <input type='text' placeholder='Required' defaultValue={placeCapacity} onChange={(e) => setPlaceCapacity(e.target.value)} />
    </div>
    <div className='form__row'>
      <p>IMG URL: </p>
      <input type='text' placeholder='Required' defaultValue={placeImgUrl} onChange={(e) => setPlaceImgUrl(e.target.value)} /></div>
    <div className='form__row'>
      <button onClick={() => createNewPlace()}>CREATE NEW Place</button>
    </div>
  </div>


  useEffect(() => {
    fetchPlaces()
  }, [places])

  const createNewPlace = () => {
    fetch(`${baseUrl}/api/places`, {
      method: 'POST',
      body: JSON.stringify({
        name: placeName.toString(),
        imgURL: placeImgUrl.toString(),
        address: {
          street: placeStreet.toString(),
          city: placeCity.toString(),
          zip: placeZip.toString(),
          longitude: placeLongitude.toString(),
          latitude: placeLatitude.toString()
        },
        hours: {
          opens: placeOpens.toString(),
          closes: placeCloses.toString()
        },
        info: {
          description: placeDescription.toString(),
          highlights: placeHighlights.split(', ')
        },
        capacity: Number(placeCapacity),
        currentUsers: 0,
        launched: placeLaunched
      }),
      headers: {
        "Content-type": "application/json;  charset=UTF-8"
      }
    })
  }

  const fetchPlaces = () => {
    fetch(`${baseUrl}/api/places`)
      .then(res => res.json())
      .then(data => setPlaces(data))
  }



  return (
    <div className='content-box'>
      <div className='content-box__buttons'>
        <button onClick={() => setShowPush(!showPush)}>Push</button>
        <button onClick={() => setCreatePlaceClicked(!createPlaceClicked)}>New Place</button>
      </div>
      {showPush && <Push url={baseUrl} />}
      {createPlaceClicked && createPlaceForm}
      {places ? places.map(place => <ListPlaces key={place._id} place={place} fetchPlaces={fetchPlaces} url={baseUrl} />) : 'LOADING'}
    </div>
  )
}

export default Places
