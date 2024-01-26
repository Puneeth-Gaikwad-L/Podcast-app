import React from 'react'
import './style.css'

function Button({ type, text, onClick, disabled, style, icons }) {
  return (
    <button type={type} onClick={onClick} className='btn' disabled={disabled} style={style}>{text} {icons}</button>
  );
}

export default Button