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
            <div>
                <div className='UserName-Edit-Delete-Container'>

                    <h2>{photo.username.username}</h2>
                    <div>
                        <div className='EditPhotoForm'>

                            <EditPhotoForm photo={photo} />
                        </div>

                    </div>
                </div>
                <div className='Image-Div-Container'>
                    {/* <figure className='photos-profile-page' style={{ backgroundImage: `url(${photo.image})` }} /> */}
                    <img className='photos-profile-page' src={photo.image} />

                </div>
                <PhotoLikesForm photo={photo} />
                {photo.photo_users !== 1 ?
                    <span>{photo.photo_users} likes</span>
                    : <span>
                        {photo.photo_users} like
                    </span>
                }
                <div>{photo.username.username} {photo.caption}</div>
                <div>{photo.createdAt}</div>
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
