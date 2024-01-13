import React from 'react'
import './style.css'

function Button({text, onClick}) {
  return (
      <>
          <div onClick={onClick}>{text}</div>
      </>
  )
}

export default Button