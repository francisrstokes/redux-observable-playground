export const selectorsToState = (selectors, state) =>
  Object.entries(selectors).reduce((state2, [key, selector]) => {
    return {
      ...state2,
      [key]: selector(state)
    };
  }, {});

const captialize = s => s.slice(0, 1).toUpperCase() + s.slice(1).toLowerCase();
const camelCaseToActionName = s => s.replace(/[A-Z]/g, a => '_' + a).toUpperCase();
const actionNameToActionCreator = s => {
  const ss = s.split('_').map(captialize).join('');
  return ss.slice(0, 1).toLowerCase() + ss.slice(1);
};

export const createGETReducer = (name) => {
  const getName = `get${captialize(name)}`;

  const getAction = camelCaseToActionName(getName);
  const fulfilledAction = camelCaseToActionName(getName + 'Fulfilled');
  const errorAction = camelCaseToActionName(getName + 'Error');

  const initialState = {
    loading: false,
    error: null,
    data: null
  };

  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case getAction:
        return {
          loading: true,
          data: null,
          error: null,
        }
      case fulfilledAction:
        return {
          loading: false,
          data: action.payload,
          error: null,
        }
      case errorAction:
        return {
          ...state,
          loading: false,
          error: action.payload
        }
      default:
        return state;
    }
  };

  const selectors = {
    isLoading: state => state.loading,
    data: state => state.data,
    error: state => state.error,
  };

  return {
    actions: {
      [getAction]: getAction,
      [fulfilledAction]: fulfilledAction,
      [errorAction]: errorAction
    },
    actionCreators: {
      [actionNameToActionCreator(getAction)]: payload => ({ type: getAction, payload }),
      [actionNameToActionCreator(fulfilledAction)]: payload => ({ type: fulfilledAction, payload }),
      [actionNameToActionCreator(errorAction)]: error => ({ type: errorAction, payload: error.message }),
    },
    selectors,
    reducer
  };
}
