import { actions } from '../reducers/profile';
import {actionCreators} from '../reducers/stars';

import { filter, switchMap, map, catchError, tap } from 'rxjs/operators'
import { Observable } from 'rxjs/Observable';
import { ajax } from 'rxjs/ajax';

const starsUrl = username => `https://api.github.com/users/${username}/starred`;


export default action$ => action$.pipe(
  filter(action => action.type === actions.GET_PROFILE_FULFILLED),
  switchMap(action => {
    return ajax.getJSON(starsUrl(action.payload.login)).pipe(
      map(actionCreators.getStarsFulfilled),
      catchError(err => Observable.of(actionCreators.getStarsError(err)))
    )
  })
);