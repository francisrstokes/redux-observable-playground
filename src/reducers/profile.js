import {createGETReducer} from '../util';

const {reducer, selectors, actions, actionCreators} = createGETReducer('profile');

export default reducer;
export {selectors};
export {actions};
export {actionCreators};