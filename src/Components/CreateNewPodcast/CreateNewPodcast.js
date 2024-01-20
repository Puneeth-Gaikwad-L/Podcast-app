import React, { useState } from 'react'
import CustomInput from '../common/Input/input'
import './styles.css'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Button from '../common/Button/button';
import { Bounce, toast } from 'react-toastify';
import FileInput from '../common/Input/FileInput';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { auth, db } from '../../Firebase/firebase';
import { addDoc, collection } from 'firebase/firestore';

function CreateNewPodcast() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [displayImage, setDisplayImage] = useState("");
  const [bannerImage, setBannerImage] = useState("");

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch();

  async function handelFormSubmission(e) {
    e.preventDefault();

    if (title && desc && displayImage && bannerImage) {
      setLoading(true);

      try {
        const storage = getStorage();

        const bannerImageRef = ref(
          storage,
          `podcast/${auth.currentUser.uid}/${Date.now()}`
        )
        await uploadBytes(bannerImageRef, bannerImage)

        const bannerImageUrl = await getDownloadURL(bannerImageRef);
        console.log(bannerImageUrl);



        const displayImageRef = ref(
          storage,
          `podcast/${auth.currentUser.uid}/${Date.now()}`
        )
        await uploadBytes(displayImageRef, displayImage)
        const displayImageUrl = await getDownloadURL(displayImageRef);
        console.log(displayImageUrl);

        const podcastData = {
          title: title,
          description: desc,
          bannerImage: bannerImageUrl,
          displayImage: displayImageUrl,
          createdBy: auth.currentUser.uid,
        }
        const docRef = await addDoc(collection(db, "podcasts"), podcastData);

        toast.success("Podcast Created", {
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
        setTitle("");
        setDesc("");
        setBannerImage(null);
        setDisplayImage(null);
      } catch (error) {
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
        console.error(error);
      }
    } else {
      toast.error("Please fill all the fields", {
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

  }

  function handelingBannerImg(file) {
    setBannerImage(file)
  }

  function handelingDisplayImg(file) {
    setDisplayImage(file)
  }

  return (
    <div className='container'>
      <h1>Create A Podcast</h1>
      <form className='create-podcast-form' onSubmit={handelFormSubmission}>
        <CustomInput state={title} setState={setTitle} placeholder={"Podcast Title"} type={"text"} required={"true"} />
        <CustomInput state={desc} setState={setDesc} placeholder={"Description"} type={"text"} required={"true"} />
        <FileInput accept={"image/*"} id={"banner-image-input"} label={"Banner Image"} fileHandleFuc={handelingBannerImg} />
        <FileInput accept={"image/*"} id={"display-image-input"} label={"Display Image"} fileHandleFuc={handelingDisplayImg} />
        <Button type={"submit"} text={loading ? "Creating.." : "Create Podcast"} onClick={handelFormSubmission} disabled={loading} />
      </form>
    </div>
  )
}

export default CreateNewPodcast