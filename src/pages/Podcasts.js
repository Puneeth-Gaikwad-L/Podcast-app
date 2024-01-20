import React, { useEffect } from 'react'
import Header from '../Components/common/Header/header'
import { collection, onSnapshot, query } from 'firebase/firestore'
import { db } from "../Firebase/firebase"
import { useDispatch, useSelector } from 'react-redux'
import { setPodcasts} from "../slice/podcastSlice"

function Podcasts() {

    const dispatch = useDispatch();
    const podcasts = useSelector((state) => state.podcasts.podcasts);

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


    return (
        <div>
            <Header />
            <h1>Discover Podcasts</h1>
            {podcasts.length > 0 ? <>{podcasts.map((item) => {
                return <p>{item.title}</p>
            })}</> : <p>no podcasts found</p>}
        </div>
    )
}

export default Podcasts