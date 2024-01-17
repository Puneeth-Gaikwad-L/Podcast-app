import React from 'react'
import { useSelector } from 'react-redux'
import Header from '../Components/Header/header'

function Profile() {
  const user = useSelector((state) => state.user.user);
  console.log(user);
  return (
    <div>
      <Header />
      <div>
        <h1>{user.name}</h1>
        <h1>{user.email}</h1>
        <h1>{user.uid}</h1>
      </div>
    </div>
  )
}

export default Profile