import React, { useState } from 'react'


const ListPlaces = ({ place, fetchPlaces, url }) => {

  const [placeClicked, setPlaceClicked] = useState(false)
  const [placeName, setPlaceName] = useState(place.name)
  const [placeImgUrl, setPlaceImgUrl] = useState(place.imgURL)
  const [placeStreet, setPlaceStreet] = useState(place.address.street)
  const [placeZip, setPlaceZip] = useState(place.address.zip)
  const [placeCity, setPlaceCity] = useState(place.address.city)
  const [placeLongitude, setPlaceLongitude] = useState(place.address.longitude)
  const [placeLatitude, setPlaceLatitude] = useState(place.address.latitude)
  const [placeOpens, setPlaceOpens] = useState(place.hours.opens)
  const [placeCloses, setPlaceCloses] = useState(place.hours.closes)
  const [placeDescription, setPlaceDescription] = useState(place.info.description)
  const [placeHighlights, setPlaceHighlights] = useState(place.info.highlights.join(', '))
  const [placeCapacity, setPlaceCapacity] = useState(place.capacity)
  const [placeCurrentUsers, setPlaceCurrentUsers] = useState(place.currentUsers)
  const [placeLaunched, setPlaceLaunched] = useState(place.launched)

  const placeForm = <div className='form'>
    <div className='form__row'>
      <p>Name: </p><input type='text' defaultValue={placeName} onChange={(e) => setPlaceName(e.target.value)} />
    </div>
    <div className='form__row'>
      <p>Launched: </p>
      <input type='checkbox' className='checkbox' defaultChecked={placeLaunched} onChange={() => setPlaceLaunched(!placeLaunched)} />
    </div>
    <div className='form__row'>
      <p>DB ID: </p>
      <p>{place._id}</p>
    </div>
    <div className='form__row'>
      <p>Address: </p>
      <input type='text' defaultValue={placeStreet} onChange={(e) => setPlaceStreet(e.target.value)} />
    </div>
    <div className='form__row'>
      <p>City: </p>
      <input type='text' defaultValue={placeCity} onChange={(e) => setPlaceCity(e.target.value)} />
    </div>
    <div className='form__row'>
      <p>Postal: </p>
      <input type='text' defaultValue={placeZip} onChange={(e) => setPlaceZip(e.target.value)} />
    </div>
    <div className='form__row'>
      <p>Long: </p>
      <input type='text' defaultValue={placeLongitude} onChange={(e) => setPlaceLongitude(e.target.value)} />
    </div>
    <div className='form__row'>
      <p>Lat: </p>
      <input type='text' defaultValue={placeLatitude} onChange={(e) => setPlaceLatitude(e.target.value)} />
    </div>
    <div className='form__row'>
      <p>Opens: </p>
      <input type='text' defaultValue={placeOpens} onChange={(e) => setPlaceOpens(e.target.value)} />
    </div>
    <div className='form__row'>
      <p>Closes: </p>
      <input type='text' defaultValue={placeCloses} onChange={(e) => setPlaceCloses(e.target.value)} />
    </div>
    <div className='form__row'>
      <p>HighLights: </p>
      <input type='text' defaultValue={placeHighlights} onChange={(e) => setPlaceHighlights(e.target.value)} />
    </div>
    <div className='form__row'>
      <p>Description: </p>
      <input type='text' defaultValue={placeDescription} onChange={(e) => setPlaceDescription(e.target.value)} />
    </div>
    <div className='form__row'>
      <p>Capacity: </p>
      <input type='text' defaultValue={placeCapacity} onChange={(e) => setPlaceCapacity(e.target.value)} />
    </div>
    <div className='form__row'>
      <p>currentUsers: </p>
      <input type='text' defaultValue={placeCurrentUsers} onChange={(e) => setPlaceCurrentUsers(e.target.value)} />
    </div>
    <div className='form__row'>
      <p>IMG URL: </p>
      <input type='text' defaultValue={placeImgUrl} onChange={(e) => setPlaceImgUrl(e.target.value)} /></div>
    <div className='form__row'>
      <button onClick={() => patchPlace()}>UPDATE</button>
      <button onClick={() => deleteAndUpdate()}>DELETE</button>
    </div>

  </div>

  const patchPlace = () => {
    fetch(`${url}/api/places/update/${place._id}`, {
      method: 'PATCH',
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
        currentUsers: Number(placeCurrentUsers),
        launched: placeLaunched
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
  }

  const deleteAndUpdate = () => {
    fetch(`${url}/api/places/${place._id}`, { method: 'DELETE' })
    fetchPlaces()
  }

  return (
    <div className='list'>

      <div className='list__title'>
        <h3 onClick={() => setPlaceClicked(!placeClicked)}>{place.name}</h3>

      </div>
      {placeClicked && placeForm}

    </div>
  )
}

export default ListPlaces
