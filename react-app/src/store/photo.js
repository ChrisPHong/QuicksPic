const LOAD_PHOTO = 'photo/LOAD'
const POST_PHOTO = 'photo/CREATE'
const CLEAR_ALL_PHOTOS = 'photo/CLEAR/LOGOUT'
const EDIT_PHOTO = 'photo/EDIT'
const DELETE_PHOTO = 'photo/DELETE'
const ADD_LIKE = 'photo/ADD/LIKE'
const UNFOLLOW_PICTURES = 'photo/FOLLOWER/DELETE'
const LOAD_ONE_PHOTO = 'photos/LOAD'

export const loadPhotos = (photos) => {
    return {
        type: LOAD_PHOTO,
        photos
    }
}
export const loadPhoto = (photo) => {
    return {
        type: LOAD_ONE_PHOTO,
        photo
    }
}

export const createPhotos = (photo) => {
    return {
        type: POST_PHOTO,
        photo
    }
}

export const clearAllPhoto = (photos) => {
    return {
        type: CLEAR_ALL_PHOTOS,
        photos
    }
}

export const updatePhoto = (photo) => {
    return {
        type: EDIT_PHOTO,
        photo
    }
}


export const delPhoto = (photo) => {
    return {
        type: DELETE_PHOTO,
        photo
    }
}

export const addLikePhoto = (photo) => {
    return {
        type: ADD_LIKE,
        photo
    }
}

export const deleteFollowerPhotos = (photos) => {
    return {
        type: UNFOLLOW_PICTURES,
        photos
    }
}
// This grabs all of the photos that the person is following
export const getPhotos = () => async (dispatch) => {
    const response = await fetch(`/api/photos/`, {
        method: 'GET',
    })
    if (response.ok) {
        const photos = await response.json()
        dispatch(loadPhotos(photos))
    }

}
// This gets only one photo
export const getOnePhoto = (id) => async (dispatch) => {
    const response = await fetch(`/api/photos/${id}`, {
        method: 'GET',
    })
    if (response.ok) {
        const photo = await response.json()
        dispatch(loadPhoto(photo))
    }

}

export const postPhotos = (formData) => async (dispatch) => {

    const response = await fetch(`/api/photos/`, {
        method: 'POST',
        body: formData
    })
    if(!response.ok){

        return "Please provide the correct file type: .png, .jpeg, .jpg, or a .gif"
    }
    if (response.ok) {
        const photos = await response.json()
        dispatch(createPhotos(photos))
    }

}

export const editPhotos = (payload, id) => async (dispatch) => {

    const response = await fetch(`/api/photos/${id}`, {
        method: 'PATCH',
        body: payload
    })

    if (response.ok) {
        const photo = await response.json()
        dispatch(updatePhoto(photo))
    }

}
export const deletePhoto = (photoId) => async (dispatch) => {

    const response = await fetch(`/api/photos/${photoId}/delete`, {
        method: 'DELETE',
    })

    if (response.ok) {
        const photo = await response.json()
        dispatch(delPhoto(photo))
    }
    return response
}


export const clearAllPhotos = () => async (dispatch) => {
    dispatch(clearAllPhoto())
    return {}
}

export const postLikePhoto = (payload) => async (dispatch) => {

    const response = await fetch(`/api/photos/${payload.photoId}/likes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })

    if (response.ok) {
        const photo = await response.json()
        dispatch(addLikePhoto(photo))
    }

}


export const getFollowersPictures = (id) => async (dispatch) => {
    const response = await fetch(`/api/photos/${id}/unfollow`, {
        method: 'GET',
    })
    if (response.ok) {
        const photos = await response.json()
        dispatch(deleteFollowerPhotos(photos))
    }

}
const initialState = { entries: {}, photo: {}, isLoading: true }


const photosReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_ONE_PHOTO:
            newState = {...state, photo:{}}
            newState.photo[action.photo.id] = action.photo
            return newState
        case LOAD_PHOTO:
            newState = { ...state, entries: { } }
            action.photos.map(photo => {
                newState.entries[photo.id] = photo })
            return newState
        case POST_PHOTO:
            newState = {
                ...state, entries: {...state.entries,
                    [action.photo.id]: action.photo,
                }
            }
            return newState
        case CLEAR_ALL_PHOTOS:
            return { entries: {}, isLoading: true }
        case EDIT_PHOTO:
            newState = {
                ...state, entries: {
                    ...state.entries,
                }
            }
            newState.entries[action.photo.id] = action.photo
            return newState
        case DELETE_PHOTO:
            newState = { ...state }
            delete newState.entries[action.photo.id]
            return newState
        case ADD_LIKE:
            newState = {
                ...state, entries: {
                    ...state.entries,
                }
            }

            newState.entries[action.photo.id] = action.photo

            return newState
        case UNFOLLOW_PICTURES:
            newState = {...state}
            action.photos.map(photo => {
               delete newState.entries[photo.id] })
            return newState

        default:
            return state
    }
}

export default photosReducer
