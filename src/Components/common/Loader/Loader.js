import React from 'react'
import './style.css'
import { LoadingOutlined } from '@ant-design/icons'

function Loader() {
    return (
        <div className='loading-screen'>
            <LoadingOutlined />
        </div>
    )
}

export default Loader