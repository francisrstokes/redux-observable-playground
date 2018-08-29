import { actions } from '../reducers/profile';
import { actionCreators } from '../reducers/repos';


import { filter, switchMap, map, catchError, tap } from 'rxjs/operators'
import { Observable } from 'rxjs/Observable';
import { ajax } from 'rxjs/ajax';

const reposUrl = username => `https://api.github.com/users/${username}/repos`;


export default action$ => action$.pipe(
  filter(action => action.type === actions.GET_PROFILE_FULFILLED),
  switchMap(action => {
    return ajax.getJSON(reposUrl(action.payload.login)).pipe(
      map(actionCreators.getReposFulfilled),
      catchError(err => Observable.of(actionCreators.getReposError(err)))
    )
  })
);