import React from 'react'
import CustomInput from '../Input/input'
import { useState } from 'react';
import { auth } from '../../Firebase/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import './style.css'

function SignUpForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    async function handelFormSubmission(e) {
        e.preventDefault();
        console.log(name, email, password, confirmPassword);
        try {
            const userCredentials = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredentials.user;
        } catch (error) {
            console.error(error);
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