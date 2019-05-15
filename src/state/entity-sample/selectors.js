export const getEntitySampleState = state => state.entitySample;
export const getEntitySampleFetching = state => getEntitySampleState(state).get('isFetching');
export const getEntitySampleData = state => getEntitySampleState(state).get('data');
