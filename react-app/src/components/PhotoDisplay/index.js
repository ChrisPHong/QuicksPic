import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import PhotoLikesForm from '../PhotoLikesForm';
import './PhotoDisplay.css';
import CommentFormPage from '../CommentForm';
import CommentsPage from '../Comments';
import EditPhotoForm from '../EditPhotoForm';
import UserFollowerForm from '../FollowersForm'

function PhotoDisplay({ photo }) {

    return (
        <div key={photo.id} className='Photo-Container'>
            <div className='outer-photo-div-Container'>
                <div className='UserName-Edit-Delete-Container'>
                    <div className='UserName-FollowButton-Container'>

                    <h2 className='usernamePhoto-header'>{photo.username.username}</h2>
                    <UserFollowerForm followId={photo.userId} photo={photo}/>
                    </div>
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

                {photo.photo_users.length !== 1 ?
                    <span className='like-container-photo'>{photo.photo_users.length} likes</span>
                    : <span className='like-container-photo'>
                        {photo.photo_users.length} like
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
