import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../Components/common/Header/header';
import Button from '../Components/common/Button/button';
import { signOut } from 'firebase/auth';
import { auth } from '../Firebase/firebase';
import { Bounce, toast } from 'react-toastify';

function Profile() {
  const user = useSelector((state) => state.user.user);
  console.log(user);
  if (!user) {
    return <p>Loading...</p>
  }

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        toast.success("you logged out!", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      })
      .catch((error) => {
        toast.error(error.message, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      })
  }
  return (
    <div>
      <Header />
      <div>
        <h1>{user.name}</h1>
        <h1>{user.email}</h1>
        <h1>{user.uid}</h1>
        <Button text={"logout"} onClick={handleLogOut} />
      </div>
    </div>
  )
}

export default Profile