import {createGETReducer} from '../util';

const {reducer, selectors, actions, actionCreators} = createGETReducer('stars');

export default reducer;
export {selectors};
export {actions};
export {actionCreators};