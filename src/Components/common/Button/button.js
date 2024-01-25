import React from 'react'
import './style.css'

function Button({ type, text, onClick, disabled, style }) {
  return (
    <button type={type} onClick={onClick} className='btn' disabled={disabled} style={style}>{text}</button>
  );
}

export default Button