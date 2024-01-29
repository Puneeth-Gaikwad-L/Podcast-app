import React, { useEffect, useState } from 'react'
import Header from '../Components/common/Header/header'
import { useNavigate, useParams } from 'react-router-dom'
import { collection, doc, getDoc, onSnapshot, query } from 'firebase/firestore';
import { auth, db } from '../Firebase/firebase';
import { Bounce, toast } from 'react-toastify';
import Button from '../Components/common/Button/button';
import EpisodesDetail from '../Components/common/Podcasts/Episodes/EpisodesDetail';
import AudioPlayer from '../Components/common/Podcasts/AudioPlayer/AudioPlayer';

function PodcastDetailsPage() {
    const { id } = useParams();
    const [podcast, setPodcast] = useState({});
    const [episodes, setEpisodes] = useState([])
    const [playingFile, setPlayingFile] = useState('')
    const [playingEpisode, setPlayingEpisode] = useState("")
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            getData()
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
            } else {
                toast.error("no such documents found", {
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
                navigate('/podcasts');
            }
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
        }
    };

    useEffect(() => {
        const unsubscribe = onSnapshot(
            query(collection(db, "podcasts", id, "episodes")),
            (querySnapshot) => {
                const episodeData = [];
                querySnapshot.forEach((doc) => {
                    episodeData.push({ id: doc.id, ...doc.data() });
                });
                setEpisodes(episodeData);
                console.log(episodeData);
            },
            (error) => {
                console.error("error fetching episodes", error);
            }

        );

        return () => {
            unsubscribe();
        };
    }, [id]);

    return (
        <div>
            <Header />
            <div className='wrapper' >
                {podcast.id &&
                    <>
                        <div className='podcast-heading-wrapper'>
                            <h1 className='podcast-title-heading'>{podcast.title}</h1>
                            {podcast.createdBy == auth.currentUser.uid &&
                                (<Button text={"Create Episode"} onClick={() => { navigate(`/podcast/${id}/create-episode`) }}
                                    style={{
                                        width: "200px",
                                        margin: "0",
                                        padding: "10px",
                                        borderRadius: "10px",
                                        fontWeight: "400"
                                    }} />
                                )}
                        </div>

                        <div className='banner-wrapper'>
                            <img src={podcast.bannerImage} alt='display image' className='podcast-display-image' />
                        </div>
                        <p className='podcast-desc'>{podcast.description}</p>
                        <h1 className='podcast-title-heading'>Episodes</h1>
                        {episodes.length > 0 ? (
                            <>
                                {episodes.map((episode, index) => {
                                    return (
                                        <EpisodesDetail
                                            key={index}
                                            title={episode.title}
                                            desc={episode.description}
                                            audioFile={episode.audioUrl}
                                            onClick={(file, title) => {
                                                setPlayingEpisode(title)
                                                setPlayingFile(file)
                                            }} />
                                    );
                                }).reverse()}
                            </>
                        ) : (<p>No Episode</p>)
                        }
                    </>
                }
            </div>
            {
                playingFile &&
                <AudioPlayer podcast={podcast} audioSrc={playingFile} episodeTitle={playingEpisode} />
            }
        </div>
    )
}

export default PodcastDetailsPage