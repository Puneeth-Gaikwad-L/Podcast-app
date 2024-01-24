import React, { useEffect } from 'react'
import Header from '../Components/common/Header/header'
import { collection, onSnapshot, query } from 'firebase/firestore'
import { db } from "../Firebase/firebase"
import { useDispatch, useSelector } from 'react-redux'
import { setPodcasts } from "../slice/podcastSlice"
import PodcastCard from '../Components/common/Podcasts/PodcastCards/PodcastCard'
import CustomInput from '../Components/common/Input/input'

function Podcasts() {

    const dispatch = useDispatch();
    const podcasts = useSelector((state) => state.podcasts.podcasts);

    const [search, setSearch] = React.useState("");

    useEffect(() => {
        const unSubscribe = onSnapshot(
            query(collection(db, "podcasts")),
            (querySnapshot) => {
                const podcastData = [];
                querySnapshot.forEach((doc) => {
                    podcastData.push({ id: doc.id, ...doc.data() });
                });
                dispatch(setPodcasts(podcastData));
            },
            (error) => {
                console.error("error fetching podcast", error);
            }
        );
        return () => {
            unSubscribe();
        };
    }, [dispatch]);

    var filteredPodcasts = podcasts.filter((item) => item.title.trim().toLowerCase().includes(search.toLowerCase()))


    return (
        <>
            <Header />
            <div className='wrapper'>
                <h1 className='page-title'>Discover Podcasts</h1>
                <CustomInput type='text' state={search} setState={setSearch} placeholder='Search By Title' />
                {filteredPodcasts.length > 0 ? (
                    <div className='podcasts-container'>
                        {filteredPodcasts.map((item) => {
                            return <PodcastCard id={item.id} displayImage={item.displayImage} title={item.title} />
                        })}
                    </div>
                ) : <p className='display-text'>{search ? "Podcast Not Found" : "No podcasts" }</p>}
            </div>
        </>
    )
}

export default Podcasts