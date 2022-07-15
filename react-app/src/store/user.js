const LOAD_USER_PHOTO = 'user/LOAD'
const EDIT_USER_PHOTO = 'user/EDIT'
const GET_FOLLOW_USER = 'user/FOLLOW'
const CREATE_FOLLOW_USER = 'user/CREATE/DELETE'

export const loadUserPhotos = (userPhotos) => {
    return {
        type: LOAD_USER_PHOTO,
        userPhotos
    }
}

export const followUser = (user) => {
    return {
        type: GET_FOLLOW_USER,
        user
    }
}

export const createDeleteFollower = (user) => {
    return {
        type: CREATE_FOLLOW_USER,
        user
    }
}




export const getuserPhotos = (userId) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}`, {
        method: 'GET',
    })
    if (response.ok) {
        const userPhotos = await response.json()

        dispatch(loadUserPhotos(userPhotos))
    }

}

export const getFollowerUsers = () => async (dispatch) => {
    const response = await fetch(`/api/users/followers`, {
        method: 'GET',
    })
    if (response.ok) {
        const usersFollowers = await response.json()

        dispatch(followUser(usersFollowers))
    }

}

export const postFollow = (payload) => async (dispatch) => {
    const response = await fetch(`/api/users/${payload.followId}/follow`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const followedUser = await response.json()
        dispatch(createDeleteFollower(followedUser))
    }

}


const initialState = { entries: {}, info: {}, isLoading: true }

const userReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_USER_PHOTO:

            newState = { ...state, entries: {}, info: {} }
            action.userPhotos.photos.map(photo => { newState.entries[photo.id] = photo })
            newState.info[action.userPhotos.user.id] = action.userPhotos.user

            return newState
        case GET_FOLLOW_USER:
            newState = {
                ...state, entries: {
                    ...state.entries
                }
            }
            newState.info[action.user.id] = action.user

            return newState
        case CREATE_FOLLOW_USER:
            newState = {
                ...state, entries: {
                    ...state.entries
                }, info: {
                    ...state.info,
                }
            }
            newState.info[action.user.id] = action.user

            return newState

        default:
            return state
    }
}

export default userReducer
