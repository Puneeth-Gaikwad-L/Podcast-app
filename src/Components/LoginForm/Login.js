import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';
import { auth, db } from '../../Firebase/firebase';
import { setUser } from '../../slice/userSlice';
import Button from '../common/Button/button';
import CustomInput from '../common/Input/input';

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    async function handelFormSubmission(e) {
        e.preventDefault();
        console.log(email, password);
        // fetching users account
        console.log(email, password);
        if (email && password) {
            setLoading(true);

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
                toast.success("Login successful", {
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
                console.error(error);
            }
        } else {
            setLoading(false);
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
            });
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
                <Button type={"submit"} text={loading ? "Loading.." : "login"} onClick={handelFormSubmission} disabled={loading} />
            </form>
        </div>
    )
}

export default LoginForm