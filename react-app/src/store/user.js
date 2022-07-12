const LOAD_USER_PHOTO = 'user/LOAD'
const EDIT_USER_PHOTO = 'user/EDIT'

export const loadUserPhotos = (userPhotos) => {
    return {
        type: LOAD_USER_PHOTO,
        userPhotos
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



const initialState = { entries: {}, isLoading: true }

const userReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_USER_PHOTO:
            newState = { ...state, entries: {} }
            action.userPhotos.photos.map(photo => { newState.entries[photo.id] = photo })
            return newState

        default:
            return state
    }
}

export default userReducer
