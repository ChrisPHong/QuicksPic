import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom';
import {getPhotos} from '../../store/photo'
import EditPhotoForm from '../EditPhotoForm';
import './Photos.css';



function PhotosPage() {
    const dispatch = useDispatch();
    // const state = useSelector((state) => state);
    const photoState = useSelector((state) => Object.values(state.photos));
    const allPhotos = Object.values(photoState[0])
    const userId = useSelector((state) => state.session.user.id);
    const [show, setShow] = useState('hidden')
    const [caption, setCaption] = useState('')



    useEffect(()=>{
        dispatch(getPhotos(userId))
    },[dispatch])

    useEffect(()=>{

    },[caption])

    return (
        <div className='entire-news-feed'>
            {allPhotos.map((photo) => {
                return (
            <div className='photo-container'>
                {console.log('<<<<<<<<<<<<<<< PHOTO USERID >>>>>>>>>', photo.userId)}
                {photo.userId === userId ?
                <div>
                <EditPhotoForm photo={photo}/>
                </div>
                : null}
                <img
                className='picture-div'
                src={photo.image} />
                <p
                onChange={(e)=> {
                    setCaption(e.target.value)
                }}>{photo.caption}</p>
                <p>{photo.createdAt}</p>
                <h1>END OF PHOTO</h1>
            </div>

                )
            })}
        </div>

    )
}


export default PhotosPage;
