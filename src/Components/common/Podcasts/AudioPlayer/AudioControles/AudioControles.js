import React, { useEffect, useRef, useState } from 'react'
import './style.css'
import { SoundFilled } from '@ant-design/icons'
import { FaVolumeMute, FaVolumeUp } from'react-icons/fa'

function AudioControles({ audioRef }) {
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false);


  useEffect(() => {
    if (!isMuted) {
      audioRef.current.volume = 1;
      setVolume(1)
    } else {
      audioRef.current.volume = 0;
      setVolume(0)
    }
  }, [isMuted])

  
  const handleVolume = (e) => {
    setVolume(e.target.value);
    audioRef.current.volume = e.target.value;
  }

  const toggleMute = () => {
    setIsMuted(!isMuted);
  }


  return (
    <div className='sound-controls'>
      <div>
        <p onClick={toggleMute} className='volume-mute'>{!isMuted ? <FaVolumeUp /> : <FaVolumeMute />}</p>
        <input type='range' value={volume} max={1} min={0} step={0.01} className='volume-range' onChange={handleVolume}/>
      </div>
    </div>
  )
}

export default AudioControles