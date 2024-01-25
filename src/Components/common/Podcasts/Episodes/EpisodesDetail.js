import React from 'react'
import './styles.css'
import Button from '../../Button/button'

function EpisodesDetail({ title, desc, audioFile, onClick }) {
    return (
        <div>
            <h1>{title}</h1>
            <p>{desc}</p>
            <Button text={"Play"} onClick={() => onClick(audioFile)} />
        </div>
    )
}

export default EpisodesDetail