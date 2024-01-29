import React, { useState } from 'react'
import './style.css'
import { SoundFilled } from '@ant-design/icons'

function AudioControles() {
  const [volume, setVolume] = useState("")
  return (
    <div className='sound-controls'>
      <div>
        <SoundFilled />
        <input type='range' className='volume-range' />
      </div>
    </div>
  )
}

export default AudioControles