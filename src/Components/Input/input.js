import React from 'react';
import './style.css'

function CustomInput({ type, state, setState, placeholder, required}) {
    return (
        <>
            <input
                type={type}
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder={placeholder}
                required={Boolean(required)}
                className='custom-input'
            />
        </>
    )
}

export default CustomInput