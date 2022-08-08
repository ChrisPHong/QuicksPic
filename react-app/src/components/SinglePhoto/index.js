import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom';
import PhotoLikesForm from '../PhotoLikesForm';
// import '../PhotoDisplay.css';
import CommentFormPage from '../CommentForm';
import CommentsPage from '../Comments';
import EditPhotoForm from '../EditPhotoForm';
import UserFollowerForm from '../FollowersForm'
import LikesDisplayModal from '../LikesDisplayModal'
import { getOnePhoto } from '../../store/photo'



function SinglePhotoDisplay() {

    const dispatch = useDispatch()
    const state = useSelector((state) => state);
    const photo = useSelector((state) => Object.values(state?.photos?.photo))[0];
    const history = useHistory()
    const id = parseInt(useParams()?.photoId)

    console.log(state, "state !")
    console.log(Object.values(photo)[0], "whyyyyyyyyyyyyy you!")
    console.log(photo?.image, "this is the ID!!!!!!")

    useEffect(() => {
        dispatch(getOnePhoto(id))
    }, [dispatch, id])

    return (
        <div className='Photo-Container'>
             {photo &&
                <>

                    <div className='outer-photo-div-Container'>
                        <div className='UserName-Edit-Delete-Container'>
                            <div className='UserName-FollowButton-Container'>

                                <h2 onClick={() => {
                                    history.push(`users/${photo?.userId}`)
                                }}
                                    className='usernamePhoto-header'>{photo?.username?.username}</h2>
                                <UserFollowerForm followId={photo?.userId} photo={photo} />
                            </div>
                            <div className='EditPhotoForm-container'>
                                <EditPhotoForm photo={photo} />
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
                                    history.push(`users/${photo?.userId}`)
                                }}
                                className='username-input'>{photo?.username?.username}</div>
                            <span className='caption-input'>{photo?.caption}</span>
                        </div>
                        <div className='createdAt-input'>{photo?.createdAt}</div>
                    </div>
                    <div>

                        <div className='comments-all-div'>
                            {<CommentsPage photoId={photo.id} />}
                        </div>
                        <div className='comments-form-div'>
                            {<CommentFormPage photoId={photo.id} />}
                        </div>

                    </div>

                </>
}
        </div>

    )
}


export default SinglePhotoDisplay;
