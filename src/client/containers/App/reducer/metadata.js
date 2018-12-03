import { handleActions, combineActions } from 'redux-actions';
import { LOAD_METADATA } from '../constants';

const initialState = {
  loading: false,
  model: null,
  error: false,
};

const metadataReducer = handleActions(
  {
    [LOAD_METADATA.PENDING]: state => ({
      ...state,
      loading: true,
    }),
    [combineActions(
      LOAD_METADATA.CANCELLED,
      LOAD_METADATA.SUCCESS,
      LOAD_METADATA.ERROR,
    )]: state => ({
      ...state,
      loading: false,
    }),
    [LOAD_METADATA.SUCCESS]: (state, { payload }) => ({
      ...state,
      model: payload,
    }),
  },
  initialState,
);

export default metadataReducer;
