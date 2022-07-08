const LOAD_PHOTO = 'photo/LOAD'
const POST_PHOTO = 'photo/CREATE'
const CLEAR_ALL_PHOTOS = 'photo/CLEAR/LOGOUT'
const EDIT_PHOTO = 'photo/EDIT'

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

    if (response.ok) {
        const photos = await response.json()
        dispatch(createPhotos(photos))
    }

}

export const editPhotos = (payload, id) => async (dispatch) => {
    console.log(payload, " <<<<<<<<<<<<< PAYLOAD >>>>>>>>>")
    console.log(id, " <<<<<<<<<<<<< id >>>>>>>>>")
    const response = await fetch(`/api/photos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })

    if (response.ok) {
        const photo = await response.json()
        dispatch(updatePhoto(photo))
    }

}


export const clearAllPhotos = () => async (dispatch) => {
    dispatch(clearAllPhoto())
    return {}
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
                    ...state.entries,
                    [action.photo.id]: action.photo
                }
            }
            return newState
        case CLEAR_ALL_PHOTOS:
            return { entries: {}, isLoading: true }
        case EDIT_PHOTO:
            newState = {
                ...state, entries: {
                    ...state.entries,
                    [action.photo.id]: action.photo
                }
            }
        default:
            return state
    }
}

export default photosReducer
