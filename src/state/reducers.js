import { combineReducers } from 'redux';

const ownReducers = {};

const appReducer = combineReducers({
  //...ownReducers,
  // add here your reducers after importing the entity state
  // i.e: myStuff: myStuff.reducer, etc...
});

/**
 * This only happens when delete all state, so , we need
 * to delete the app state.
 *
 * @param state
 * @param action
 * @returns {any}
 */
const rootReducer = (state, action) => {
  if (action.type === 'RESET_APP_SUCCESS') {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export default rootReducer;
