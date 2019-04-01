import {
    VIDEO_LIST
  } from '../actions/Main'

const initialState = {
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
        default:
            return state;
    }
}
