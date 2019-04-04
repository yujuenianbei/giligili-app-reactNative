export const DETAIL_LOADING = 'DETAIL_LOADING';
export const VIDEO_INFO = 'VIDEO_INFO';

export function detailLoading(data) {
  return {
    type: DETAIL_LOADING,
    data
  }
}

export function videoInfo(data) {
  return {
    type: VIDEO_INFO,
    data
  }
}

export function videoGet(data) {
  return dispatch => {
    dispatch(detailLoading(true));
    // 模拟用户登录
    let result = fetch('http://192.168.1.128:3000/api/video?id=' + data)
    .then((res) => {
      return res.text();
      })
      .then((res) => {
          dispatch(videoInfo(JSON.parse(res).reqData));
          dispatch(detailLoading(false));
      })
  }
}
