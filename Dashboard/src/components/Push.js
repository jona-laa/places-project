import React, { useState } from 'react'

const Push = ({ url }) => {

  const [message, setMessage] = useState('')
  const [pushTokens, setPushTokens] = useState('')

  const sendPushMessage = (pushtoken) => {
    fetch(`${url}/notifications/auto`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: 'Places',
        message: message,
        key: pushtoken
      })
    })
  }

  const parseTokensAndSend = () => {
    pushTokens.split(',').length ? pushTokens.split(',').forEach(token => sendPushMessage(token)) : sendPushMessage(pushTokens)
  }


  return (
    <div className='form'>
      <div className='form__row'>
        <p>Recepient/s</p><input type='text' placeholder='pushToken, comma separated' defaultValue={pushTokens} onChange={e => setPushTokens(e.target.value)} />
      </div>
      <div className='form__row'>
        <p>Message</p><input type='text' placeholder='message' defaultValue={message} onChange={e => setMessage(e.target.value)} />
      </div>
      <button onClick={() => parseTokensAndSend()}>Send</button>

    </div>
  )
}

export default Push
