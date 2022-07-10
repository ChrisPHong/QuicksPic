import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import './EditCommentForm.css';
import { editComment } from '../../store/comment'



function EditCommentsPage({ comment }) {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.session.user.id);
    const [show, setShow] = useState(false);
    const [comments, setComments] = useState(comment.comments);
    const [errors, setErrors] = useState([]);


    useEffect(() => {
    }, [dispatch])

    useEffect(() => {
        let error = []
        if (comments.length < 1) error.push("Please put a comment with at least one character")
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
                user_id: comment.userId,
                photo_id: comment.photoId,
                id: comment.id,
                comments,

            }
            dispatch(editComment(payload))

        }
    }

    return (
        <div className='editingCommentFormDiv'>
            {comment.userId === userId ?
                <div>

                    <h2>Edit your Comment</h2>
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
                        <input
                            placeholder="Comment..."
                            value={comments}
                            onChange={(e) => { setComments(e.target.value) }} />
                        <button type='submit'>Save Changes</button>
                    </form>
                </div>
                : null}
        </div>

    )
}


export default EditCommentsPage;
