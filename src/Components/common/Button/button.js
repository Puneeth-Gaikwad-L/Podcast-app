import React from 'react'
import './style.css'

function Button({ type, text, onClick, disabled }) {
  return (
    <button type={type} onClick={onClick} className='btn' disabled={disabled}>{text}</button>
  );
}

export default Button