import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom';
import './Comments.css';
import { getComments, deleteComment } from '../../store/comment'
import EditCommentsPage from '../EditCommentForm';



function CommentsPage({ photo }) {
    const dispatch = useDispatch();
    const commentsState = useSelector((state) => state.comments);
    const state = useSelector((state) => state);
    const userId = useSelector((state) => state.session.user.id);
    const allComments = Object.values(commentsState)[0]
    const comments = Object.values(allComments)
    const [show, setShow] = useState('hidden')
    const [caption, setCaption] = useState('')

    useEffect(() => {
        dispatch(getComments(photo))
    }, [dispatch])

    useEffect(() => {

    }, [caption])



    return (
        <div className='entire-comments-picture'>
            {comments.map(comment => {
                return (
                    <>

                        {userId === comment.userId && photo === comment.photoId?
                        <div>
                            <EditCommentsPage comment={comment} />
                        </div>
                            : null}
                        {comment.photoId === photo ?
                            <div>
                                <div className='comment-delete'>

                                    {comment.userId === userId ?

                                        <button
                                        onClick={(e) => {
                                            dispatch(deleteComment(comment.id))
                                        }}
                                        >Delete</button>
                                        : null}
                                    <div>
                                        {comment.comments}
                                    </div>
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
