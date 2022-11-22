import React from 'react'
import { useNavigate } from 'react-router-dom'
import Inbox from './Inbox'

const WelcomePage = () => {
    const history = useNavigate()

    const composeMailHandler = ()=>{
        history('/compose')
    }

  return (
    <div>
        <h1>Welcome to your mail box</h1>
        <button onClick={composeMailHandler}>Compose</button>
        <div>
          <Inbox/>
        </div>
    </div>
  )
}

export default WelcomePage