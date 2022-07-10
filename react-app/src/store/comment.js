const LOAD_COMMENT = 'comment/LOAD'
const POST_COMMENT = 'comment/CREATE'
const CLEAR_ALL_COMMENTS = 'comment/CLEAR/LOGOUT'
const EDIT_COMMENT = 'comment/EDIT'
const DELETE_COMMENT = 'comment/DELETE'
const UPDATE_COMMENT = 'comment/UPDATE'

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

export const editComment = (payload) => async (dispatch) => {
    const response = await fetch(`/api/comments/${payload.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })

    if (response.ok) {
        const comment = await response.json()
        dispatch(updateComment(comment))
    }

}

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


// export const clearAllcomments = () => async (dispatch) => {
//     dispatch(clearAllcomment())
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
            newState = {
                ...state, entries: {
                    ...state.entries,
                    [action.comment.id]: action.comment
                }
            }
            return newState

        // case CLEAR_ALL_COMMENTS:
        //     return { entries: {}, isLoading: true }
        case EDIT_COMMENT:
            newState = {
                ...state, entries: {
                    ...state.entries,
                }
            }
            newState.entries[action.comment.id] = action.comment
            return newState
        case DELETE_COMMENT:
            newState = { ...state }
            delete newState.entries[action.comment.id]
            return newState
        default:
            return state
    }
}

export default commentsReducer
