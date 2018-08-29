import {combineReducers} from 'redux';

import profile from './profile';
import repos from './repos';
import stars from './stars';

export default combineReducers({
  profile,
  repos,
  stars
});
