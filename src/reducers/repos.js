import {createGETReducer} from '../util';

const {reducer, selectors, actions, actionCreators} = createGETReducer('repos');

export default reducer;
export {selectors};
export {actions};
export {actionCreators};