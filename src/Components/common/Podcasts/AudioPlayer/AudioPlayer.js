import React from 'react'
import './style.css'
import PlayingPodcastDetails from './PlayingPodcastInfo/PlayingPodcastDetails'
import PlayerControles from './PlayerControles/PlayerControles'
import AudioContoles from './AudioControles/AudioControles'

function AudioPlayer({ podcast, audioSrc }) {
  return (
    <div className='custom-audio-player'>
      <div className='player-gradient'></div>
      <PlayingPodcastDetails displayImage={podcast.displayImage} podcastTitle={podcast.title} />
      <PlayerControles audioSrc={audioSrc} />
      <AudioContoles />
    </div>
  )
}

export default AudioPlayer