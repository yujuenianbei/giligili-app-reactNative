import { combineReducers } from 'redux';
import Main from './Main';
import Detail from './Detail';

const rootReducer = combineReducers({
  Main: Main,
  Detail: Detail,
});

export default rootReducer;