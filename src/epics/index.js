import {combineEpics} from 'redux-observable';
import getProfile from './get-profile';
import getRepos from './get-repos';
import getStars from './get-stars';

export default combineEpics(
  getProfile,
  getRepos,
  getStars
);