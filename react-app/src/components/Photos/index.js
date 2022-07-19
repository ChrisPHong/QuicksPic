import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom';
import { getPhotos, deletePhoto } from '../../store/photo'
import EditPhotoForm from '../EditPhotoForm';
import CommentsPage from '../Comments'
import CommentFormPage from '../CommentForm';
import PhotoLikesForm from '../PhotoLikesForm'
import bulletPoints from './bulletPoints.png'
import PhotoDisplay from '../PhotoDisplay';
import './Photos.css';



function PhotosPage() {
    const dispatch = useDispatch();
    const photoState = useSelector((state) => Object.values(state.photos));
    const allPhotos = Object.values(photoState[0])
    const userId = useSelector((state) => state.session.user.id);

    allPhotos.reverse()
    useEffect(() => {
        dispatch(getPhotos(userId))
    }, [dispatch])



    return (
        <div className='entire-news-feed'>
            {allPhotos.map((photo) => {
                return (
                    <div className='photo-container'>
                        <div className='FullImageContainer'>
                            <PhotoDisplay photo={photo} />
                        </div>
                    </div>
                )
            })}
        </div>

    )
}


export default PhotosPage;
