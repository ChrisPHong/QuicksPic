import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { postFollow, getuserPhotos, getFollowerUsers } from '../../store/user'
import './FollowersForm.css';
import filledHeart from './filledHeart.png'




function UserFollowerForm({ followId, photo }) {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const userId = useSelector((state) => state?.session?.user?.id);
    const followers = useSelector((state) => state?.user.info);
    const result = Object.values(followers)[0]
    const array = result?.followers

    useEffect(() => {
        dispatch(getFollowerUsers())
        dispatch(getuserPhotos(userId))

    }, [dispatch]);

    const areYouFollowing = () => {
        for (let i = 0; i < array?.length; i++) {
            if (array[i].id == photo.id) {
                console.log('this is true')
                return true
            }

        }
        return false

    }

    return (
        <div className='FollowerPostDiv'>
            {userId !== photo.userId ?
                <button className='FollowerButton'
                    onClick={(e) => {
                        e.preventDefault()
                        const payload = {
                            userId,
                            followId
                        }
                        dispatch(postFollow(payload))
                    }}
                >
                    {areYouFollowing() ? 'Unfollow' : 'Follow'}
                </button>




                : null}
        </div >
    )
}


export default UserFollowerForm;
