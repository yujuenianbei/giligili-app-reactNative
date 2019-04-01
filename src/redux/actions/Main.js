export const VIDEO_LIST = 'VIDEO_LIST';
export const VIDEO_GET_LIST = 'VIDEO_GET_LIST';

export function videoList(data) {
  return {
    type: VIDEO_LIST,
    data
  }
}
export function videoGetList(data) {
    return {
      type: VIDEO_GET_LIST,
      data
    }
}

// // 访问登录接口 根据返回结果来划分action属于哪个type,然后返回对象,给reducer处理
// export function login() {
//   console.log('登录方法');
//   return dispatch => {
//     dispatch(isLogining());
//     // 模拟用户登录
//     let result = fetch('https://www.baidu.com/')
//       .then((res) => {
//         dispatch(loginSuccess(true, user));
//       }).catch((e) => {
//         dispatch(loginError(false));
//       })
//   }
// }
