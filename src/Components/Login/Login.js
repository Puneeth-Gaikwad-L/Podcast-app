import React, { useState } from 'react'
import CustomInput from '../Input/input';

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handelFormSubmission(e) {
        e.preventDefault();
        console.log(email, password);
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