import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import './EditCommentForm.css';
import { editComment } from '../../store/comment'



function EditCommentsPage({ comment }) {
    const dispatch = useDispatch();
    const commentsState = useSelector((state) => state.comments);
    const state = useSelector((state) => state);
    const userId = useSelector((state) => state.session.user.id);
    const [show, setShow] = useState(false);
    const [comments, setComments] = useState(comment.comments);
    const [errors, setErrors] = useState([]);


    useEffect(() => {
    }, [dispatch])

    useEffect(() => {
        let error = []
        if (comments.length < 1) error.push("Please put a comment with at least one character")
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
                        <input
                            placeholder="Comment..."
                            value={comments}
                            onChange={(e) => { setComments(e.target.value) }} />
                        <button type='submit'>Save Changes</button>
                    </form>
                    <h2> THIS IS THE END OF THE EDIT COMMENT</h2>
                </div>
                : null}
        </div>

    )
}


export default EditCommentsPage;
