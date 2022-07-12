import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { postLikePhoto } from '../../store/photo'
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


    return (
        <div className='PhotoLikesDiv'>

            <button className='photoLikeButton'
                onClick={(e) => {
                    e.preventDefault()
                    const payload = {
                        userId,
                        photoId

                    }
                    dispatch(postLikePhoto(payload))
                }}
            > <img className='commentLikeButton'src={filledHeart}/></button>




        </div >
    )
}


export default PhotoLikesForm;
