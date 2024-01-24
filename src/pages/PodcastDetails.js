import React, { useEffect, useState } from 'react'
import Header from '../Components/common/Header/header'
import { useNavigate, useParams } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../Firebase/firebase';
import { Bounce, toast } from 'react-toastify';

function PodcastDetailsPage() {
    const { id } = useParams();
    const [podcast, setPodcast] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            getData();
        }
    }, [id])

    const getData = async () => {
        try {
            const docRef = doc(db, "podcasts", id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Document data", docSnap.data());
                setPodcast({
                    id: docSnap.id,
                    ...docSnap.data()
                })
                toast.success("Podcast found", {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                });
            } else {
                toast.error("no such documents found", {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                });
                navigate('/podcasts');
            }
        } catch (error) {
            toast.error(error.message, {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        }
    };

    return (
        <div>
            <Header />
            <div className='wrapper'>
                {podcast.id &&
                    <>
                        <div style={{ display: "none", justifyContent: "space-between", alignItems: 'center' }}><h1 className='podcast-title-heading'>{podcast.title}</h1></div>

                        <div className='banner-wrapper'>
                            <img src={podcast.bannerImage} alt='display image' className='podcast-display-image' />
                        </div>
                        <p className='podcast-desc'>{podcast.description}</p>
                        <h1 className='podcast-title-heading'>Episodes</h1>
                    </>
                }
            </div>
        </div>
    )
}

export default PodcastDetailsPage