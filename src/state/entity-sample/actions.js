import { Map as ImmutableMap } from 'immutable';
import {
  ENTITY_SAMPLE,
  ENTITY_SAMPLE_ERROR,
  ENTITY_SAMPLE_SUCCESS,
} from './constants';

function entitySampleAction() {
  return {
    type: ENTITY_SAMPLE,
  };
}

function entitySampleActionSuccess(data) {
  return {
    type: ENTITY_SAMPLE_SUCCESS,
    payload: new ImmutableMap({ ...data }),
    error: '',
  };
}

function entitySampleActionError(error) {
  console.error(error);
  return {
    type: ENTITY_SAMPLE_ERROR,
    payload: new ImmutableMap({}),
    error,
  };
}

/**
 * Action creator.
 *
 * @param data
 *
 * @returns {function(*): Promise<any>}
 */
// eslint-disable-next-line import/prefer-default-export
export function handleEntitySampleActionCreator(data) {
  return function(dispatch) {
    dispatch(entitySampleAction());
    return new Promise((resolve, reject) => {
      if (data) {
        dispatch(entitySampleActionSuccess(data));
        resolve();
      } else {
        dispatch(entitySampleActionError('No data provided'));
        reject(new Error('No data provided'));
      }
    });
  };
}
