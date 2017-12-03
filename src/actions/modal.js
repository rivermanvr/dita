export const SET_MODAL = 'SET_MODAL'

export const setModal = () => {
    return {type:SET_MODAL}
}

export const changeActiveModal = () => (dispatch) => {
    dispatch(setModal())
}