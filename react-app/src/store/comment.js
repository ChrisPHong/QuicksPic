const LOAD_COMMENT = 'comment/LOAD'
const POST_COMMENT = 'comment/CREATE'
const CLEAR_ALL_COMMENTS = 'comment/CLEAR/LOGOUT'
const EDIT_COMMENT = 'comment/EDIT'
const DELETE_COMMENT = 'comment/DELETE'

export const loadComments = (comments) => {
    return {
        type: LOAD_COMMENT,
        comments
    }
}

export const createComment = (comment) => {
    return {
        type: POST_COMMENT,
        comment
    }
}

export const clearAllComment = (comments) => {
    return {
        type: CLEAR_ALL_COMMENTS,
        comments
    }
}

export const updateComment = (comment) => {
    return {
        type: EDIT_COMMENT,
        comment
    }
}


export const delComment = (comment) => {
    return {
        type: DELETE_COMMENT,
        comment
    }
}


export const getComments = (photoId) => async (dispatch) => {
    const response = await fetch(`/api/comments/${photoId}`, {
        method: 'GET',
    })
    if (response.ok) {
        const comments = await response.json()
        dispatch(loadComments(comments))
    }

}

export const postComment = (payload) => async (dispatch) => {
    console.log(payload, "IN THE THUNK <<<<<<<<<<<<<<<< PAYLOAD")
    const response = await fetch(`/api/comments/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })

    if (response.ok) {
        const comment = await response.json()
        dispatch(createComment(comment))
    }

}

// export const editPhotos = (payload, id) => async (dispatch) => {

//     const response = await fetch(`/api/photos/${id}`, {
//         method: 'PATCH',
//         body: payload
//     })

//     if (response.ok) {
//         const photo = await response.json()
//         dispatch(updatePhoto(photo))
//     }

// }
export const deleteComment = (commentId) => async (dispatch) => {
    console.log(commentId, "WE IN THE THUNK >>>>>>>>>>>>>>>>>>")
    const response = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE',
    })

    if (response.ok) {
        const comment = await response.json()
        dispatch(delComment(comment))
    }

}


// export const clearAllPhotos = () => async (dispatch) => {
//     dispatch(clearAllPhoto())
//     return {}
// }

const initialState = { entries: {}, isLoading: true }

const commentsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_COMMENT:
            newState = { ...state, entries: { ...state.entries } }
            action.comments.map(comment => { newState.entries[comment.id] = comment })
            return newState
        case POST_COMMENT:
            console.log(action.comment, "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< ACTION IN THE COMMENTS REDUCER")
            newState = {
                ...state, entries: {
                    ...state.entries,
                    [action.comment.id]: action.comment
                }
            }
            return newState
        //     return newState
        // case CLEAR_ALL_PHOTOS:
        //     return { entries: {}, isLoading: true }
        // case EDIT_PHOTO:
        //     newState = {
        //         ...state, entries: {
        //             ...state.entries,
        //         }
        //     }
        //     newState.entries[action.photo.id] = action.photo
        //     return newState
        case DELETE_COMMENT:
            newState = { ...state }
            delete newState.entries[action.comment.id]
            return newState
        default:
            return state
    }
}

export default commentsReducer
