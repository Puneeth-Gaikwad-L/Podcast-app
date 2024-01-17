import React from 'react'
import CustomInput from '../Input/input'
import { useState } from 'react';
import { auth, db } from '../../Firebase/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { setUser } from '../.././slice/userSlice';
import './style.css'
import { useNavigate } from 'react-router-dom';

function SignUpForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate()

    const dispatch = useDispatch();

    async function handelFormSubmission(e) {
        e.preventDefault();
        if (password === confirmPassword) {
            // creating users account
            console.log(name, email, password, confirmPassword);
            try {
                const userCredentials = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );
                const user = userCredentials.user;
                console.log(user);
                // saving user details
                await setDoc(doc(db, "users", user.uid), {
                    name: name,
                    email: user.email,
                    uid: user.uid,
                });

                // save data in redux
                dispatch(setUser({
                    name: name,
                    email: user.email,
                    uid: user.uid
                }));

                navigate("/profile");
            } catch (error) {
                console.error(error);
            }
        } else {
            console.error("password does't match");
        }
    }
    return (
        <div className='sign-up-container'>
            <h1>SignUp</h1>
            <form className='sign-up-form' onSubmit={handelFormSubmission}>
                <CustomInput type='text' state={name} setState={setName} placeholder='Full Name' required='true' />
                <CustomInput type='email' state={email} setState={setEmail} placeholder='Email' required='true' />
                <CustomInput type='password' state={password} setState={setPassword} placeholder='Password' required='true' />
                <CustomInput type='password' state={confirmPassword} setState={setConfirmPassword} placeholder='Confirm Password' required='true' />
                <button className='signUp-btn' type='submit'>Sign Up</button>
            </form>
        </div>
    )
}

export default SignUpForm