import React, { useState, useEffect } from 'react'
import ListUsers from './ListUsers'
import Push from './Push'


const Users = () => {
  const [users, setUsers] = useState(null)
  const [createUserClicked, setCreateUserClicked] = useState(false)
  const [showPush, setShowPush] = useState(false)

  const [userFirstName, setUserFirstName] = useState('')
  const [userLastName, setUserLastName] = useState('')
  const [userPhone, setUserPhone] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userCheckedIn, setUserCheckedIn] = useState(false)

  const baseUrl = 'http://192.168.35.146:3000';

  const createUserForm = <div className='form'>
    <div className='form__row'>
      <p>First Name: </p>
      <input type='text' defaultValue={userFirstName} placeholder='Required' onChange={(e) => setUserFirstName(e.target.value)} />
    </div>
    <div className='form__row'>
      <p>Last Name: </p>
      <input type='text' defaultValue={userLastName} placeholder='Required' onChange={(e) => setUserLastName(e.target.value)} />
    </div>
    <div className='form__row'>
      <p>PushToken: </p>
      <p>{'Will be added by client'}</p>
    </div>
    <div className='form__row'>
      <p>DB ID: </p>
      <p>{'Will be added by database'}</p>
    </div>
    <div className='form__row'>
      <p>Phone: </p>
      <input type='text' defaultValue={userPhone} placeholder='Required' onChange={(e) => setUserPhone(e.target.value)} />
    </div>
    <div className='form__row'>
      <p>E-Mail: </p>
      <input type='text' defaultValue={userEmail} placeholder='Required' onChange={(e) => setUserEmail(e.target.value)} />
    </div>
    <div className='form__row'>
      <p>Checked In: </p>
      <input type='checkbox' defaultChecked={userCheckedIn} placeholder='Required' onChange={() => setUserCheckedIn(!userCheckedIn)} />
    </div>
    <div className='form__row'>
      <button onClick={() => createNewUser()}>CREATE NEW USER</button>
    </div>
  </div>

  const createNewUser = () => {
    fetch(`${baseUrl}/api/users`, {
      method: 'POST',
      body: JSON.stringify({
        name: {
          firstName: userFirstName.toString(),
          lastName: userLastName.toString()
        },
        contactInfo: {
          phone: userPhone.toString(),
          email: userEmail.toString()
        },
        status: {
          isCheckedIn: userCheckedIn,
          place: 'N/A'
        },
        pushToken: 'N/A'
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
  }

  useEffect(() => {
    fetchUsers()
  }, [users])

  const fetchUsers = () => {
    fetch(`${baseUrl}/api/users`)
      .then(res => res.json())
      .then(data => setUsers(data))
  }

  return (
    <div className='content-box'>
      <div className='content-box__buttons'>
        <button onClick={() => setShowPush(!showPush)}>Push</button>
        <button onClick={() => setCreateUserClicked(!createUserClicked)}>New User</button>
      </div>
      {showPush && <Push url={baseUrl} />}
      {createUserClicked && createUserForm}
      {users ? users.map(user => <ListUsers key={user._id} user={user} fetchUsers={fetchUsers} url={baseUrl} />) : 'LOADING'}
    </div>
  )
}

export default Users
