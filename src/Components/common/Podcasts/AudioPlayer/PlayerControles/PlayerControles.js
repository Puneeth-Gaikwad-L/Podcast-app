import React, { useEffect, useRef, useState } from 'react'
import './style.css'
import { BackwardFilled, CaretRightFilled, ForwardFilled, PauseOutlined } from '@ant-design/icons';
import PlayingPodcastDetails from '../PlayingPodcastInfo/PlayingPodcastDetails';
import AudioControles from '../AudioControles/AudioControles';

function PlayerControles({ podcast, audioSrc, episodeTitle }) {

  const audioRef = useRef();
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying])

  useEffect(() => {
    const audio = audioRef.current;
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    }
  }, [])
  
  const handleTimeUpdate = (e) => {
    setCurrentTime(audioRef.current.currentTime);
  }

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  }

  const handleEnded = (e) => {
    setCurrentTime(0)
    setIsPlaying(false);
  }

  const handleDuration = (e) => {
    setCurrentTime(e.target.value);
    audioRef.current.currentTime = e.target.value;
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  }

  const formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

  
  return (
    <>
      <PlayingPodcastDetails displayImage={podcast.displayImage} episodeTitle={episodeTitle} />
      <div className='audio-controls'>
        <audio ref={audioRef} src={audioSrc} />
        <div className='control-buttons'>
          <div>
            <BackwardFilled />
          </div>

          <div onClick={togglePlay}>
            {isPlaying ? <PauseOutlined /> : <CaretRightFilled />}
          </div>

          <div>
            <ForwardFilled />
          </div>

        </div>
        <div className='duration-flex'>
          <p>{formatTime(currentTime)}</p>
          <input type='range' value={currentTime} max={duration} step={0.01} onChange={handleDuration} className='duration-range' />
          <p>{formatTime(duration-currentTime)}</p>
        </div>
      </div>
      <AudioControles audioRef={audioRef} />
    </>
  )
}

export default PlayerControles