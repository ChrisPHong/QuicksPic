import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom';
import {getPhotos} from '../../store/photo'
import './Photos.css';



function PhotosPage() {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const photos = useSelector((state) => Object.values(state));
    const userId = useSelector((state) => state.session.user.id);
    const [show, setShow] = useState('hidden')
    console.log(userId, "<<<<<<<<<<<<<<<<<<<< userId >>>>>>>>>>>>>")

    useEffect(()=>{
        dispatch(getPhotos(userId))
    },[])
    return (
        <div className='entire-news-feed'>
            <div className='photo-container'>

            </div>
        </div>

    )
}


export default PhotosPage;
