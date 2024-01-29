import React from 'react'
import './style.css'

function PlayingPodcastDetails({ displayImage, episodeTitle }) {

  return (
    <div className='playingPodcast'>
      <img src={displayImage} alt="Podcast image" />
      <div style={{width : '70%', overflow: 'hidden'}}>
        <h3>{episodeTitle}</h3>
      </div>
    </div>
  )
}

export default PlayingPodcastDetails