import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { postLikePhoto, getOnePhoto} from '../../store/photo'
import './PhotoLikesForm.css';
import filledHeart from './filledHeart.png'
import emptyHeart from './emptyHeart.png'



function PhotoLikesForm({photo}) {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const userId = useSelector((state) => state.session.user.id);
    const photoId = photo.id

    useEffect(() => {

    }, [dispatch]);

    const photoLikes = photo.photo_users

    const didYouLikeIt = ()=>{
        for(let i = 0; i < photoLikes?.length; i++){
            if(photoLikes[i].id === userId){
                return true
            }

        }
        return false

    }

    return (
        <div className='PhotoLikesDiv'>

            <button className='photoLikeButton'
                onClick={async (e) => {
                    e.preventDefault()
                    const payload = {
                        userId,
                        photoId

                    }
                    await dispatch(postLikePhoto(payload))
                    await dispatch(getOnePhoto(photoId))
                }}
            >
                {didYouLikeIt() ?
                <img className='commentLikeButton'src={filledHeart}/> :
                <img className='commentLikeButton'src={emptyHeart}/> }

            </button>




        </div >
    )
}


export default PhotoLikesForm;
