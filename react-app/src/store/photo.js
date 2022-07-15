const LOAD_PHOTO = 'photo/LOAD'
const POST_PHOTO = 'photo/CREATE'
const CLEAR_ALL_PHOTOS = 'photo/CLEAR/LOGOUT'
const EDIT_PHOTO = 'photo/EDIT'
const DELETE_PHOTO = 'photo/DELETE'
const ADD_LIKE = 'photo/ADD/LIKE'

export const loadPhotos = (photos) => {
    return {
        type: LOAD_PHOTO,
        photos
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

export const getPhotos = (id) => async (dispatch) => {
    const response = await fetch(`/api/photos/${id}`, {
        method: 'GET',
    })
    if (response.ok) {
        const photos = await response.json()
        dispatch(loadPhotos(photos))
    }

}

export const postPhotos = (formData) => async (dispatch) => {

    const response = await fetch(`/api/photos/`, {
        method: 'POST',
        body: formData
    })
    if(!response.ok){
        console.log('RESPONSE >>>>>>>>>>>>', response)
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

const initialState = { entries: {}, isLoading: true }


const photosReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_PHOTO:
            newState = { ...state, entries: { ...state.entries } }
            action.photos.map(photo => { newState.entries[photo.id] = photo })
            return newState
        case POST_PHOTO:
            newState = {
                ...state, entries: {
                    [action.photo.id]: action.photo,
                    ...state.entries

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

        default:
            return state
    }
}

export default photosReducer
