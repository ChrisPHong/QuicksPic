import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { likeComment } from '../../store/comment'
import './CommentLikeForm.css';
import filledHeart from './filledHeart.png'
import emptyHeart from './emptyHeart.png'



function CommentLikeForm({ comment }) {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const userId = useSelector((state) => state.session.user.id);
    const commentId = comment.id

    useEffect(() => {
    }, [dispatch]);

    const commentLikes = comment.commentLikes

    const didYouLikeIt = () => {
        for (let i = 0; i < commentLikes.length; i++) {
            if (commentLikes[i].id === userId) {
                return true
            }

        }
        return false

    }


    return (
        <div className='CommentLikesDiv'>

            <button className='CommentLikeButton'
                onClick={(e) => {
                    e.preventDefault()
                    const payload = {
                        userId,
                        commentId

                    }
                    dispatch(likeComment(payload))
                }}
            >
                {didYouLikeIt() ?
                    <img className='commentLikeButton' src={filledHeart} /> :
                    <img className='commentLikeButton' src={emptyHeart} />}
            </button>


        </div >
    )
}


export default CommentLikeForm;
