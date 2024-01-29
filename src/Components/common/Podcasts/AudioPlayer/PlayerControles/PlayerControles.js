import React, { useRef, useState } from 'react'
import './style.css'
import { BackwardFilled, CaretRightFilled, ForwardFilled, PauseOutlined } from '@ant-design/icons';

function PlayerControles({ audioSrc }) {

  const audioRef = useRef();
  const [duration, setDuration] = useState("");
  const [isPlaying, setIsPlaying] = useState(true);

  const handleDuration = (e) => {
    setDuration(e.target.value);
  }
  return (
    <div className='audio-controls'>
      <audio ref={audioRef} src={audioSrc} />
      <div className='control-buttons'>
        <div>
          <BackwardFilled />
        </div>

        <div onClick={()=>{setIsPlaying(!isPlaying)}}>
          {isPlaying ? <CaretRightFilled /> : <PauseOutlined />}
        </div>

        <div>
          <ForwardFilled />
        </div>

      </div>
      <div className='duration-flex'>
        <p>00:00</p>
        <input type='range' onChange={handleDuration} className='duration-range' />
        <p>21:00</p>
      </div>
    </div>
  )
}

export default PlayerControles