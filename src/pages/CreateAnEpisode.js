import React, { useState } from 'react'
import Header from '../Components/common/Header/header'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import CustomInput from '../Components/common/Input/input';
import FileInput from '../Components/common/Input/FileInput';
import Button from '../Components/common/Button/button';
import { Bounce, toast } from 'react-toastify';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { auth, db, storage } from '../Firebase/firebase';
import { addDoc, collection } from 'firebase/firestore';

function CreateAnEpisodePage() {

    const { id } = useParams()

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [audioFile, setAudioFile] = useState();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function handleAudioFile(file) {
        setAudioFile(file);
    }

    async function handelFormSubmission() {
        if (title, desc, audioFile, id) {
            setLoading(true);
            try {
                console.log(title, desc, audioFile);

                const audioRef = ref(
                    storage,
                    `podcast-episode/${auth.currentUser.uid}/${Date.now()}`
                );

                await uploadBytes(audioRef, audioFile);

                const audioUrl = await getDownloadURL(audioRef);
                const episodeData = {
                    title: title,
                    description: desc,
                    audioUrl: audioUrl,
                }

                await addDoc(
                    collection(db, "podcasts", id, "episodes"),
                    episodeData
                );
                toast.success("episode created", {
                    position: "bottom-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                });
                setLoading(false);
                navigate(`/podcast/${id}`)

            } catch (error) {
                toast.error(error.message, {
                    position: "bottom-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                });
                setLoading(false);
            }
        } else {
            toast.error("Please fill all the fields", {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        }

        setTitle("");
        setDesc("");
        setAudioFile("");
        setLoading(false);
    }

    return (
        <div>
            <Header />
            <div className='wrapper create-episode-wrapper'>
                <h1>Create an Episode</h1>
                <CustomInput state={title} setState={setTitle} placeholder={"Episode Title"} type={"text"} required={"true"} />
                <CustomInput state={desc} setState={setDesc} placeholder={"Description"} type={"text"} required={"true"} />
                <FileInput accept={"audio/*"} id={"audio-file-input"} label={"Audio file"} fileHandleFuc={handleAudioFile} />
                <Button type={"submit"} text={loading ? "Creating.." : "Create Episode"} onClick={handelFormSubmission} disabled={loading} />
            </div>
        </div>
    )
}

export default CreateAnEpisodePage