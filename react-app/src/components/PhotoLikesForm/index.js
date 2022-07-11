import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { postLikePhoto } from '../../store/photo'
import './PhotoLikesForm.css';



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
            > Heart Button Like Thing</button>




        </div >
    )
}


export default PhotoLikesForm;
