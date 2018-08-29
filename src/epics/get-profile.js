import { actions, actionCreators } from '../reducers/profile';

import { filter, switchMap, map, catchError,  debounceTime, tap } from 'rxjs/operators'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { ajax } from 'rxjs/ajax';

const profileUrl = username => `https://api.github.com/users/${username}`;

console.log(actionCreators)

export default action$ => action$.pipe(
  filter(action => action.type === actions.GET_PROFILE),
  debounceTime(500),
  tap(action => console.log('hellllo', action)),
  switchMap(action => {
    return ajax.getJSON(profileUrl(action.payload)).pipe(
      map(actionCreators.getProfileFulfilled),
      catchError(err => Observable.of(actionCreators.getProfileError(err)))
    )
  })
);