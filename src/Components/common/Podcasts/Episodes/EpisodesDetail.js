import React from 'react'
import './styles.css'
import Button from '../../Button/button'

function EpisodesDetail({ index, title, desc, audioFile, onClick }) {
    return (
        <div style={{ marginTop: "10px" }}>
            <h1 style={{ textAlign: "left", marginBottom: "0" }}>{index}. {title}</h1>
            <p className='podcast-desc' style={{ marginLeft: "15px" }}>{desc}</p>
            <Button text={"Play"} onClick={() => onClick(audioFile)} style={{ width: "200px", margin: "0", marginLeft: "15px" }} />
        </div>
    )
}

export default EpisodesDetail