import {
  Map as ImmutableMap,
  Record as ImmutableRecord,
} from 'immutable';
import {
  ENTITY_SAMPLE,
  ENTITY_SAMPLE_ERROR,
  ENTITY_SAMPLE_SUCCESS,
} from './constants';

const ErrorField = new ImmutableRecord({ message: '' });
const initialState = new ImmutableMap({
  error: new ErrorField({ message: '' }),
  isFetching: false,
  data: new ImmutableMap({}),
});

function entitySample(state = initialState, action) {
  switch (action.type) {
    case ENTITY_SAMPLE:
      return state.merge({
        isFetching: true,
        error: state.get('error').set('message', ''),
      });
    case ENTITY_SAMPLE_SUCCESS: {
      return state.merge({
        isFetching: false,
        actions: action.payload,
        error: state.get('error').set('message', ''),
      });
    }
    case ENTITY_SAMPLE_ERROR:
      return state.merge({
        isFetching: false,
        error: state.get('error').set('message', action.error || 'Error dispatching action'),
      });
    default:
      return state;
  }
}

export default entitySample;
