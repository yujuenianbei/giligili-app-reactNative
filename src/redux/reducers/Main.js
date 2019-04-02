import {
    VIDEO_LIST,
    LOADING
  } from '../actions/Main'

const initialState = {
    loading: false,
    videoListData: [
        {
            data: 1
        }
    ],
}

export default function loginIn(state = initialState, action) {
    const data = action.data
    switch (action.type) {
        case VIDEO_LIST: {
            return Object.assign({}, state, { videoListData: data })
        }
        case LOADING: {
            return Object.assign({}, state, { loading: data })
        }
        default:
            return state;
    }
}
