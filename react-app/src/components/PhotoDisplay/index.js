import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import PhotoLikesForm from '../PhotoLikesForm';
import './PhotoDisplay.css';
import CommentFormPage from '../CommentForm';
import CommentsPage from '../Comments';
import UserFollowerForm from '../FollowersForm'
import LikesDisplayModal from '../LikesDisplayModal'
import EditPhotoFormModal from '../EditPhotoFormModal'

function PhotoDisplay({ photo }) {
    const history = useHistory()
    const dispatch = useDispatch()

    return (
        <div key={photo.id} className='Photo-Container'>
            <div className='outer-photo-div-Container'>
                <div className='UserName-Edit-Delete-Container'>
                    <div className='UserName-FollowButton-Container'>
                        <div className='profilePicture-username-container'>

                        <figure
                        onClick={() => {
                            history.push(`users/${photo.userId}`)
                        }}
                        className='Profile-Picture' style={{ backgroundImage: `url(${photo?.username?.profilePic})` }} />
                        <h2 onClick={() => {
                            history.push(`users/${photo.userId}`)
                        }}
                        className='usernamePhoto-header'>{photo.username.username}</h2>
                        </div>
                    </div>
                    <div className='EditPhotoForm-container'>
                        <UserFollowerForm followId={photo.userId} photo={photo} />
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
                        <span className='like-container-photo'>{photo.photo_users.length}<LikesDisplayModal likes={photo.photo_users} /></span>
                        : <span className='like-container-photo'>
                            {photo.photo_users.length}<LikesDisplayModal likes={photo.photo_users} />
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
