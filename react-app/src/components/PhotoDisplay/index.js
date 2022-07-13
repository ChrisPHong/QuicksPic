import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom';
import { deletePhoto } from '../../store/photo';
import PhotoLikesForm from '../PhotoLikesForm';
import './PhotoDisplay.css';
import CommentFormPage from '../CommentForm';
import CommentsPage from '../Comments';
import EditPhotoForm from '../EditPhotoForm';

function PhotoDisplay({ photo }) {
    const dispatch = useDispatch();
    // const state = useSelector((state) => state);


    const userId = useSelector((state) => state.session.user.id);



    return (
        <div className='Photo-Container'>
            <div className='outer-photo-div-Container'>
                <div className='UserName-Edit-Delete-Container'>

                    <h2>{photo.username.username}</h2>
                    <div className='EditPhotoForm-container'>
                        <EditPhotoForm photo={photo} />
                    </div>
                </div>
                <div className='Image-Div-Container'>
                    {/* <figure className='photos-profile-page' style={{ backgroundImage: `url(${photo.image})` }} /> */}
                    <img className='photo-newsfeed-container' src={photo.image} />

                </div>
                <div className='like-form-and-the-likes'>

                <PhotoLikesForm photo={photo} />
                {photo.photo_users !== 1 ?
                    <span className='like-container-photo'>{photo.photo_users} likes</span>
                    : <span className='like-container-photo'>
                        {photo.photo_users} like
                    </span>
                }
                </div>
                <div className='username-caption-container'>
                <div className='username-input'>{photo.username.username}</div>
                <span className='caption-input'>{photo.caption}</span>
                </div>
                <div className='createdAt-input'>{photo.createdAt}</div>
            </div>
            <div>

                <div className='comments-all-div'>
                    {<CommentsPage photoId={photo.id} />}
                </div>
                <div className='comments-form-div'>
                    {<CommentFormPage photoId={photo.id} />}
                </div>

            </div>



        </div>

    )
}


export default PhotoDisplay;
