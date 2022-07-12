import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom';
import './Comments.css';
import { getComments, deleteComment } from '../../store/comment'
import EditCommentsPage from '../EditCommentForm';
import CommentLikeForm from '../CommentLikesForm'



function CommentsPage({ photo }) {
    const dispatch = useDispatch();
    const commentsState = useSelector((state) => state.comments);
    const state = useSelector((state) => state);
    const userId = useSelector((state) => state.session.user.id);
    const allComments = Object.values(commentsState)[0]
    const comments = Object.values(allComments)
    const [show, setShow] = useState(false)
    const [caption, setCaption] = useState('')

    useEffect(() => {
        dispatch(getComments(photo))
    }, [dispatch])

    useEffect(() => {

    }, [caption])

    const showEditDeleteForm = () => {
        if (show === false) {
            return setShow(true)
        }
        if (show === true) {
            return setShow(false)
        }
    }

    return (
        <div className='entire-comments-picture'>
            {comments.map(comment => {
                return (
                    <>
                        {console.log(comment, '<<<<<<<<<<< COMMENT')}
                        {comment.photoId === photo ?
                            <div>
                                <div>
                                    <div className='comment-username-div'>{comment.username.username}
                                    </div>
                                    <div className='comment-comment-div'>
                                        {comment.comments}
                                        </div>
                                </div>
                            </div>
                            : null}

                        {userId === comment.userId && photo === comment.photoId ?
                            <div className='Edit-Delete-Photo-Container'>
                                <button className='bullet-points-button'>
                                    <img className='bullet-points-img' src='images/bullet-points.png' alt='edit-delete-options' onClick={showEditDeleteForm} />
                                </button>
                            </div>
                            : null}
                        {userId === comment.userId && photo === comment.photoId && show ?
                            <div>
                                <EditCommentsPage comment={comment} />
                            </div>
                            : null}
                        {comment.photoId === photo ?
                            <div>
                                <div className='comment-delete'>

                                    {comment.userId === userId && show ?

                                        <button
                                            onClick={(e) => {
                                                dispatch(deleteComment(comment.id))
                                            }}
                                        >Delete</button>
                                        : null}
                                </div>
                                <div className='Likes-Comment-Div'>
                                        < CommentLikeForm comment={comment} />
                                    <div className='comment-likes'>{comment.commentLikes} likes</div>
                                </div>
                                <div>
                                    {comment.createdAt}
                                </div>

                            </div>
                            : null}
                    </>
                )
            })}
        </div>

    )
}


export default CommentsPage;
