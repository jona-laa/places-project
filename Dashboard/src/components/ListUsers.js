import React, { useState, useEffect } from 'react'

const ListUsers = ({ user, fetchUsers, url }) => {
  const [userClicked, setUserClicked] = useState(false)

  const [userFirstName, setUserFirstName] = useState(user.name.firstName)
  const [userLastName, setUserLastName] = useState(user.name.lastName)
  const [userPhone, setUserPhone] = useState(user.contactInfo.phone)
  const [userEmail, setUserEmail] = useState(user.contactInfo.email)
  const [userCheckedIn, setUserCheckedIn] = useState(user.status.isCheckedIn)



  const userForm = <div className='form'>
    <div className='form__row'>
      <p>First Name: </p>
      <input type='text' defaultValue={userFirstName} onChange={(e) => setUserFirstName(e.target.value)} />
    </div>
    <div className='form__row'>
      <p>Last Name: </p>
      <input type='text' defaultValue={userLastName} onChange={(e) => setUserLastName(e.target.value)} />
    </div>
    <div className='form__row'>
      <p>PushToken: </p>
      <p>{user.pushToken}</p>
    </div>
    <div className='form__row'>
      <p>DB ID: </p>
      <p>{user._id}</p>
    </div>
    <div className='form__row'>
      <p>Phone: </p>
      <input type='text' defaultValue={userPhone} onChange={(e) => setUserPhone(e.target.value)} />
    </div>
    <div className='form__row'>
      <p>E-Mail: </p>
      <input type='text' defaultValue={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
    </div>
    <div className='form__row'>
      <p>Checked In: </p>
      <input type='checkbox' defaultChecked={userCheckedIn} onChange={() => setUserCheckedIn(!userCheckedIn)} />
    </div>
    <div className='form__row'>
      <button onClick={() => patchUser()}>UPDATE</button>
      <button onClick={() => deleteAndUpdate()}>DELETE</button>
    </div>
  </div>

  const patchUser = () => {
    fetch(`${url}/api/users/update/${user._id}`, {
      method: 'PATCH',
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
          place: user.status.place
        },
        pushToken: user.status.pushToken
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
  }

  const deleteAndUpdate = () => {
    fetch(`${url}/api/users/${user._id}`, { method: 'DELETE' })
    fetchUsers()
  }

  return (
    <div className='list'>
      <div className='list__title'>
        <h3 onClick={() => setUserClicked(!userClicked)}>{user.name.firstName} {user.name.lastName}</h3>
      </div>
      {userClicked && userForm}

    </div>
  )
}

export default ListUsers
