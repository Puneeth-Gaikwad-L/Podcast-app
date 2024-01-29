import React from 'react'
import './style.css'
import PlayerControles from './PlayerControles/PlayerControles'

function AudioPlayer({ podcast, audioSrc, episodeTitle }) {
  return (
    <div className='custom-audio-player'>
      <div className='player-gradient'></div>
      <PlayerControles podcast={podcast} audioSrc={audioSrc} episodeTitle={episodeTitle} />
    </div>
  )
}

export default AudioPlayer