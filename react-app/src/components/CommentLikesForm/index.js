import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { likeComment } from '../../store/comment'
import './CommentLikeForm.css';



function CommentLikeForm({comment}) {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const userId = useSelector((state) => state.session.user.id);
    const commentId = comment.id

    useEffect(() => {
    }, [dispatch]);


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
            > Heart Button Like Thing</button>




        </div >
    )
}


export default CommentLikeForm;
