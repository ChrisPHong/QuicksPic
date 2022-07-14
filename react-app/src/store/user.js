const LOAD_USER_PHOTO = 'user/LOAD'
const EDIT_USER_PHOTO = 'user/EDIT'
const FOLLOW_USER = 'user/FOLLOW'

export const loadUserPhotos = (userPhotos) => {
    return {
        type: LOAD_USER_PHOTO,
        userPhotos
    }
}

export const followUser = (user) => {
    return {
        type: FOLLOW_USER,
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

export const postFollow = (payload) => async (dispatch) => {
    const response = await fetch(`/api/users/${payload.followId}/follow`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const followedUser = await response.json()
        dispatch(followUser(followedUser))
    }

}


const initialState = { entries: {}, info: {}, isLoading: true }

const userReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_USER_PHOTO:

            newState = { ...state, entries: {}, info:{}}
            action.userPhotos.photos.map(photo => { newState.entries[photo.id] = photo })
            newState.info[action.userPhotos.user.id] = action.userPhotos.user

            return newState
        case FOLLOW_USER:
                newState = {
                    ...state, entries: {
                        ...state.entries,
                    }
                }
            console.log(action, "ACTION >>>>>>>>>>>>>>")
                return newState

        default:
            return state
    }
}

export default userReducer
