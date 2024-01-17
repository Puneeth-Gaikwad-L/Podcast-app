import React, { useState } from 'react'
import CustomInput from '../Input/input';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../Firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../slice/userSlice';

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate()

    async function handelFormSubmission(e) {
        e.preventDefault();
        console.log(email, password);

        // creating users account
        console.log(email, password);
        try {
            const userCredentials = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredentials.user;
            // fetching user details
            const userDoc = await getDoc(doc(db, "users", user.uid));
            const userData = userDoc.data();
            console.log(userData);

            // save data in redux
            dispatch(setUser({
                name: userData.name,
                email: userData.email,
                uid: userData.uid,
                profilePic: userData.profilePic
            }));

            navigate("/profile");
        } catch (error) {
            console.error(error);
        }
        // setEmail('')
        // setPassword('')
    }
    return (
        <div className='sign-up-container'>
            <h1>Login</h1>
            <form className='sign-up-form' onSubmit={handelFormSubmission}>
                <CustomInput type='email' state={email} setState={setEmail} placeholder='Email' required='true' />
                <CustomInput type='password' state={password} setState={setPassword} placeholder='Password' required='true' />
                <button className='signUp-btn' type='submit'>Login</button>
            </form>
        </div>
    )
}

export default LoginForm