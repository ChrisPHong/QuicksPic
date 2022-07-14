import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom';
import './CommentDisplay.css';
import { getComments, deleteComment } from '../../store/comment'
import EditCommentsPage from '../EditCommentForm';
import CommentLikeForm from '../CommentLikesForm'





function CommentDisplay({ photoId, comment }) {
    const userId = useSelector((state) => state.session.user.id);

    return (
        <div className='One-Comment-Container'>

            {comment.photoId === photoId ?
                <>
                    <div>
                        <div className='Comment-Container-Whole'>
                            <div className='comment-username-div'>
                                {comment.username.username}
                            </div>

                            <div className='comment-comment-div'>
                                <div className='one-comment-div'>
                                    {comment.comments}
                                </div>
                                <div>          </div>
                                <div className='Likes-Form-Div'>
                                    < CommentLikeForm comment={comment} />
                                </div>
                                <div className='commentLikes'>

                                    {comment.commentLikes === 1 ?
                                        <div className='comment-likes'>{comment.commentLikes} like</div>
                                        :
                                        <div className='comment-likes'>{comment.commentLikes} likes</div>
                                    }
                                </div>
                                {userId === comment.userId ?
                                    <div className='EditCommentPage'>
                                        <EditCommentsPage comment={comment} photoId={photoId} />

                                    </div>
                                    : null}
                            </div>
                        </div>
                    </div>
                    <div className='timeframe-commentLikes-Container'>
                        <>
                            <div className='commentDatePosted'>{comment.createdAt}</div>

                        </>
                    </div>


                </>
                : null}

        </div>

    )
}


export default CommentDisplay;
