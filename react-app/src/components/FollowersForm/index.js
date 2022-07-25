import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { postFollow, getuserPhotos, getFollowerUsers } from '../../store/user'
import {getPhotos, getFollowersPictures} from '../../store/photo'
import './FollowersForm.css';

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
            if (array[i].id == photo.userId) {

                return true
            }

        }
        return false

    }

    return (
        <div className='FollowerPostDiv'>
            {userId !== photo.userId ?
                <button className={areYouFollowing() ? 'UnFollowerButton' : 'FollowerButton'}
                    onClick={async (e) => {
                        e.preventDefault()
                        const payload = {
                            userId,
                            followId
                        }
                        await dispatch(postFollow(payload))
                        await dispatch(getFollowersPictures(followId))
                        await dispatch(getPhotos(userId))
                    }}
                >
                    {areYouFollowing() ? 'Unfollow' : 'Follow'}
                </button>




                : null}
        </div >
    )
}


export default UserFollowerForm;
