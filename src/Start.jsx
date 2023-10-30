import React from 'react'

function Start(props) {
  return (
    <div className='start'>
      <h1 className='start-title'>Quizzical</h1>
      <p className='start-p'>Let's have fun</p>
      <button className='start-btn' onClick={props.handleClick}>Start quiz</button>
    </div>
  )
}

export default Start