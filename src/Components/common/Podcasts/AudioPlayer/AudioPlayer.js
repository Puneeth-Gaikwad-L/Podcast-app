import React from 'react'
import './style.css'
import PlayingPodcastDetails from './PlayingPodcastInfo/PlayingPodcastDetails'
import PlayerControles from './PlayerControles/PlayerControles'
import AudioContoles from  './AudioControles/AudioControles'

function AudioPlayer({playingFile, displayImage}) {
  return (
      <div className='custom-audio-player'>
          <PlayingPodcastDetails displayImage={displayImage} />
          <PlayerControles />
          <AudioContoles />
      </div>
  )
}

export default AudioPlayer