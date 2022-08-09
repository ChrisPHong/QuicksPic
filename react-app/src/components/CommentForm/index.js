import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom';
import './CommentForm.css';
import { postComment } from '../../store/comment'



function CommentFormPage({ photoId }) {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.session.user.id);
    const username = useSelector((state) => state.session.user.username);
    const [show, setShow] = useState(false)
    const [comments, setComments] = useState('')
    const [errors, setErrors] = useState([])

    useEffect(() => {
    }, [dispatch])


    useEffect(() => {
        const error = [];

        if (comments.length > 2200) error.push('Comment length must be less than 2,2000 characters')
        if (comments.length < 1) error.push('Please put a comment with at least one character')
        if (!comments.replace(/\s/g, '').length) error.push('Please provide a comment that does not only contain spaces');
        setErrors(error)




    }, [comments])

    const onSubmit = (e) => {
        e.preventDefault()
        if (errors.length > 0) {
            setShow(true)
            return
        }

        if (errors.length === 0) {
            const payload = {
                user_id: userId,
                photo_id: photoId,
                comments,

            }
            dispatch(postComment(payload))
            setComments('')
            setShow(false)
        }
    }

    return (
        <div className='entire-comments-picture'>
            <form onSubmit={onSubmit}>
                {show ?

                    errors.length > 0 ?
                        <>
                            <h4>Fix Errors Before Posting:</h4>
                            <ul className='errorsArray'>{errors.map(error => {
                                return (
                                    <>
                                        <li className='CommentFormErrorItem'
                                            key={error}>{error}</li>
                                    </>
                                )
                            })}
                            </ul>
                        </>
                        : null

                    : null}
                    {/* <div className='Comment-input-container'> */}

                <input
                    className='commentForm-input-value'
                    value={comments}
                    placeholder={`Add a comment as ${username}...`}
                    onChange={e => { setComments(e.target.value) }} />
                <button
                className='commentForm-Button'
                type='submit'>Post</button>
                {/* </div> */}
                    {comments.length > 2200 ?
                    <p className='number-length-comments' style={{color: 'red'}}>{comments.length} / 2200</p>
                    :
                    <p className='number-length-comments'>{comments.length} / 2200</p>
                    }
            </form>
        </div>

    )
}


export default CommentFormPage;
