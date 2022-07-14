import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { postFollow } from '../../store/user'
import './FollowersForm.css';
import filledHeart from './filledHeart.png'



function UserFollowerForm({followId}) {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const userId = useSelector((state) => state.session.user.id);

    console.log(followId, "<<<<<<<<<<<<<<<<<<< IN THE FORM")
    useEffect(() => {
    }, [dispatch]);


    return (
        <div className='FollowerPostDiv'>

            <button className='FollowerButton'
                onClick={(e) => {
                    e.preventDefault()
                    const payload = {
                        userId,
                        followId
                    }
                    dispatch(postFollow(payload))
                }}
            > <img className='commentLikeButton'src={filledHeart}/></button>




        </div >
    )
}


export default UserFollowerForm;
