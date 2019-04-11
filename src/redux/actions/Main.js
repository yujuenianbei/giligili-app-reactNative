import { website } from '../../../webConfig'
export const LOADING = 'LOADING';
export const VIDEO_LIST = 'VIDEO_LIST';
export const BANNER_LIST = 'BANNER_LIST';

export function loading(data) {
  return {
    type: LOADING,
    data
  }
}

export function videoList(data) {
  return {
    type: VIDEO_LIST,
    data
  }
}

export function bannerList(data) {
    return {
      type: BANNER_LIST,
      data
    }
}


// 访问登录接口 根据返回结果来划分action属于哪个type,然后返回对象,给reducer处理
export function videoGetListing() {
  return dispatch => {
    dispatch(loading(true));
    // 模拟用户登录
    let result = fetch( website + '/api/videoList')
    .then((res) => {
      return res.text();
      })
      .then((res) => {
          dispatch(videoList(JSON.parse(res).reqData.videoInfo));
          dispatch(loading(false));
      })
  }
}


export function bannerGetListing() {
  return dispatch => {
    dispatch(loading(true));
    let result = fetch( website + '/api/imgList/1')
    .then((res) => {
      return res.text();
      })
      .then((res) => {
          dispatch(bannerList(JSON.parse(res).reqData.imgTypeList));
          dispatch(loading(false));
      })
  }
}
