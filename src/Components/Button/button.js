import React from 'react'
import './style.css'

function Button({ text, onClick, disabled }) {
  return (
    <div onClick={onClick} className='btn' disabled={disabled}>{text}</div>
  );
}

export default Button