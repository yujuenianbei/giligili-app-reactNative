import {
    VIDEO_INFO,
    DETAIL_LOADING
  } from '../actions/Detail'

const initialState = {
    loading: false,
    videoData: {},
}

export default function loginIn(state = initialState, action) {
    const data = action.data
    switch (action.type) {
        case VIDEO_INFO: {
            return Object.assign({}, state, { videoData: data })
        }
        case DETAIL_LOADING: {
            return Object.assign({}, state, { loading: data })
        }
        default:
            return state;
    }
}
