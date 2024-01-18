import React, { useState } from 'react';
import LoginForm from '../Components/LoginForm/Login';
import SignUpForm from '../Components/SignUpForm/SignUpForm';
import Header from '../Components/common/Header/header';

function SignUp() {

    const [flag, setFlag] = useState(false);

    function handelFlag() {
        setFlag(!flag);
    }

    return (
        <>
            <Header />
            {!flag ? <SignUpForm /> : <LoginForm />}
            {!flag ? <p className='label'>have an account ? <span onClick={handelFlag} className='span'>login</span></p> : <p className='label'>don't have an account ? <span onClick={handelFlag} className='span'>signup</span></p>}
        </>
    )
}

export default SignUp