import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import PhotoLikesForm from '../PhotoLikesForm';
import './PhotoDisplay.css';
import CommentFormPage from '../CommentForm';
import CommentsPage from '../Comments';
import EditPhotoForm from '../EditPhotoForm';
import UserFollowerForm from '../FollowersForm'
import LikesDisplayPage from '../LikesDisplay'
import LikesDisplayModal from '../LikesDisplayModal'
import EditPhotoFormModal from '../EditPhotoFormModal'

function PhotoDisplay({ photo }) {
    const history = useHistory()
    const dispatch = useDispatch


    return (
        <div key={photo.id} className='Photo-Container'>
            <div className='outer-photo-div-Container'>
                <div className='UserName-Edit-Delete-Container'>
                    <div className='UserName-FollowButton-Container'>

                        <h2 onClick={() => {
                            history.push(`users/${photo.userId}`)
                        }}
                            className='usernamePhoto-header'>{photo.username.username}</h2>
                        <UserFollowerForm followId={photo.userId} photo={photo} />
                    </div>
                    <div className='EditPhotoForm-container'>
                        <EditPhotoFormModal photo={photo} />
                    </div>
                </div>
                <div className='Image-Div-Container'
                >
                    <img className='photo-newsfeed-container' src={photo.image} />

                </div>
                <div className='like-form-and-the-likes'>

                    <PhotoLikesForm photo={photo} />

                    {photo.photo_users.length !== 1 ?
                        <span className='like-container-photo'>{photo.photo_users.length}<LikesDisplayModal likes={photo.photo_users}/></span>
                        : <span className='like-container-photo'>
                            {photo.photo_users.length}<LikesDisplayModal likes={photo.photo_users}/>
                        </span>
                    }

                </div>
                <div className='username-caption-container'>
                    <div
                    onClick={() => {
                        history.push(`users/${photo.userId}`)
                    }}
                    className='username-input'>{photo.username.username}</div>
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
