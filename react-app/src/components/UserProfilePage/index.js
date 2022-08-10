import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux'
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { getuserPhotos } from '../../store/user'
import EditPhotoForm from '../EditPhotoForm';
import CommentsPage from '../Comments'
import CommentFormPage from '../CommentForm';
import PhotoLikesForm from '../PhotoLikesForm'
import './UserProfilePage.css';



function UserProfilePage() {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const statePhotos = useSelector((state) => state.user.entries);
    const photos = Object.values(statePhotos)
    const id = useParams()?.userId
    const history = useHistory()


    useEffect(() => {
        dispatch(getuserPhotos(parseInt(id)))
    }, [dispatch])



    return (
        <div className='ProfilePicturePhotos'>
           <div className='Entire-Photo-Container'>

            {photos.map((photo, idx) => {
                return (

                    <div key={idx}>
                    <div>
                        <figure onClick={()=>{
                            history.push(`/photos/${photo.id}`)
                        }} className='photos-profile-page' style={{backgroundImage: `url(${photo.image})`}} />
                    </div>

                </div>
                    )
                })}
                </div>
        </div>

    )
}


export default UserProfilePage;
