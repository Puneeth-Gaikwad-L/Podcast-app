import React from 'react'
import './styles.css'
import Button from '../../Button/button'
import { CaretRightFilled } from '@ant-design/icons'

function EpisodesDetail({ index, title, desc, audioFile, onClick }) {

    return (
        <div style={{ marginTop: "10px" }}>
            <h1 style={{ textAlign: "left", marginBottom: "0" }}>{index}. {title}</h1>
            <p className='podcast-desc' style={{ marginLeft: "15px" }}>{desc}</p>
            <Button icons={<CaretRightFilled />} text={"Play"}
                onClick={() => {
                onClick(audioFile, title)
            }} style={{ width: "150px", margin: "0", marginLeft: "15px", display: "flex", alignItems: "center", justifyContent: "center", gap: "5px" }} />
        </div>
    )
}

export default EpisodesDetail