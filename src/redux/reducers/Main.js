import {
    VIDEO_LIST,
    BANNER_LIST,
    LOADING
  } from '../actions/Main'

const initialState = {
    loading: false,
    banner: [{
        "img_id": 1553231812226,
        "img_name": "baner1",
        "img_top": 0,
        "img_img": "1553231810874.jpg"
      },
      {
        "img_id": 1553231827329,
        "img_name": "banner2",
        "img_top": 0,
        "img_img": "1553231826119.jpg"
      }],
    videoListData: [],
}

export default function loginIn(state = initialState, action) {
    const data = action.data
    switch (action.type) {
        case VIDEO_LIST: {
            return Object.assign({}, state, { videoListData: data })
        }
        case BANNER_LIST: {
            return Object.assign({}, state, { banner: data })
        }
        case LOADING: {
            return Object.assign({}, state, { loading: data })
        }
        default:
            return state;
    }
}
