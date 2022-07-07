import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom';
import {getPhotos} from '../../store/photo'
import './Photos.css';



function PhotosPage() {
    const dispatch = useDispatch();
    // const state = useSelector((state) => state);
    const photoState = useSelector((state) => Object.values(state.photos));
    const allPhotos = Object.values(photoState[0])
    const userId = useSelector((state) => state.session.user.id);
    const [show, setShow] = useState('hidden')



    useEffect(()=>{
        dispatch(getPhotos(userId))
    },[dispatch])

    return (
        <div className='entire-news-feed'>
            {allPhotos.map((photo) => {
                return (
            <div className='photo-container'>
                <img src={photo.image} />
                <p>{photo.caption}</p>
                <p>{photo.createdAt}</p>
                <h1>END OF PHOTO</h1>
            </div>

                )
            })}
        </div>

    )
}


export default PhotosPage;
