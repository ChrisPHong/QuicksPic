const LOAD_PHOTO = 'photo/LOAD'
const CLEAR_ALL_PHOTOS = 'photo/CLEAR/LOGOUT'

export const loadPhotos = (photos) => {
    return {
        type: LOAD_PHOTO,
        photos
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


// export const clearAllPhotos = () => async (dispatch) => {
//         dispatch(loadPhotos()))
//         return {}
// }

const initialState = { entries: {}, isLoading: true }


const photosReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_PHOTO:
            newState = { ...state, entries: { ...state.entries } }
            action.photos.map(photo => { newState.entries[photo.id] = photo })
            return newState

        default:
            return state
    }
}

export default photosReducer
