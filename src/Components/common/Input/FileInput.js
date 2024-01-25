import React, { useState } from 'react'
import img from './images/upload.svg'
import { FileImageOutlined } from '@ant-design/icons';
function FileInput({ accept, id, label, fileHandleFuc }) {

  const [fileSelected, setFileSelected] = useState("");

  const onChange = (e) => {
    console.log(e.target.FileInput);
    setFileSelected(e.target.files[0].name)
    fileHandleFuc(e.target.files[0])
  }

  return (
    <>
      <label htmlFor={id} className={`custom-input ${!fileSelected ? "custom-fileInput" : "active" }`}><FileImageOutlined />{fileSelected ? ` ${fileSelected}` : label}</label>
      <input type='file' accept={accept} id={id} style={{ display: 'none' }} onChange={onChange} />
    </>
  )
}

export default FileInput