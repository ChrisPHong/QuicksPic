import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom';
import PhotoLikesForm from '../PhotoLikesForm';
// import '../PhotoDisplay.css';
import './SinglePhoto.css'
import CommentFormPage from '../CommentForm';
import CommentsPage from '../Comments';
import EditPhotoForm from '../EditPhotoForm';
import UserFollowerForm from '../FollowersForm'
import LikesDisplayModal from '../LikesDisplayModal'
import { getOnePhoto } from '../../store/photo'
import '../PhotoDisplay/PhotoDisplay.css'
import EditPhotoFormModal from '../EditPhotoFormModal'


function SinglePhotoDisplay() {

    const dispatch = useDispatch()
    const state = useSelector((state) => state);
    const id = parseInt(useParams()?.photoId)
    const photo = useSelector((state) => state?.photos?.photo)[id];
    const history = useHistory()


    useEffect(() => {
        dispatch(getOnePhoto(id))
    }, [dispatch, id])

    return (
        <>
            {photo &&
                <div className='Entire-Div-Solo'>

                <div className='Photo-Container-Solo'>
                    <div className='outer-photo-div-Container'>
                        <div className='UserName-Edit-Delete-Container'>
                            <div className='UserName-FollowButton-Container'>

                                <h2 onClick={() => {
                                    history.push(`/users/${photo?.userId}`)
                                }}
                                className='usernamePhoto-header'>{photo?.username?.username}</h2>
                                <UserFollowerForm followId={photo?.userId} photo={photo} />
                            </div>
                            <div className='EditPhotoForm-container'>
                            <EditPhotoFormModal photo={photo} />
                            </div>
                        </div>
                        <div className='Image-Div-Container'>
                            <img className='photo-newsfeed-container' src={photo?.image} />

                        </div>
                        <div className='like-form-and-the-likes'>
                            {photo &&
                                <PhotoLikesForm photo={photo} />
                            }

                            {photo?.photo_users?.length !== 1 ?
                                <span className='like-container-photo'>{photo?.photo_users?.length}<LikesDisplayModal likes={photo?.photo_users} /></span>
                                : <span className='like-container-photo'>
                                    {photo.photo_users.length}<LikesDisplayModal likes={photo?.photo_users} />
                                </span>
                            }

                        </div>
                        <div className='username-caption-container'>
                            <div
                                onClick={() => {
                                    console.log(photo.userId)
                                    history.push(`/users/${photo.userId}`)
                                }}
                                className='username-input'>{photo?.username?.username}</div>
                            <span className='caption-input'>{photo?.caption}</span>
                        </div>
                        <div className='createdAt-input'>{photo?.createdAt}</div>
                    </div>
                    <div>

                        <div className='comments-all-div-singlephoto'>
                            {<CommentsPage photoId={photo.id} />}
                        </div>
                        <div className='comments-form-div'>
                            {<CommentFormPage photoId={photo.id} />}
                        </div>

                    </div>

                </div>
            </div>
            }
        </>

)
}


export default SinglePhotoDisplay;
