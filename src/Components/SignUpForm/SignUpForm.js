import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';
import { setUser } from '../.././slice/userSlice';
import { auth, db } from '../../Firebase/firebase';
import Button from '../common/Button/button';
import CustomInput from '../common/Input/input';
import './style.css';

function SignUpForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch();

    async function handelFormSubmission(e) {
        e.preventDefault();
        if (name && email && password === confirmPassword && password.length >= 6) {
            setLoading(true);
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
                toast.success("Signup successful", {
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
                setLoading(false)
                navigate("/profile");
            } catch (error) {
                console.error(error);
                setLoading(false);
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
                })
            }
        } else {
            if (!name && !email && !password) {
                toast.error("please fill all the fields", {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                })
            }else if (password.length < 6) {
                toast.error("password must be at least 6 characters", {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                })
            } else if (password != confirmPassword) {
                toast.error("password does't match", {
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
            }
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
                <Button type={"submit"} text={loading ? "SigningUp.." : "Signup"} onClick={handelFormSubmission} disabled={loading}/>
            </form>
        </div>
    )
}

export default SignUpForm