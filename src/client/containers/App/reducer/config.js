import { handleActions, combineActions } from 'redux-actions';
import { LOAD_CONFIG } from 'client/containers/App/constants';

const initialState = {
  loading: false,
  model: null,
  error: false,
};

const configReducer = handleActions(
  {
    [LOAD_CONFIG.PENDING]: state => ({
      ...state,
      loading: true,
    }),
    [combineActions(
      LOAD_CONFIG.CANCELLED,
      LOAD_CONFIG.SUCCESS,
      LOAD_CONFIG.ERROR,
    )]: state => ({
      ...state,
      loading: false,
    }),
    [LOAD_CONFIG.SUCCESS]: (state, { payload }) => ({
      ...state,
      model: payload,
    }),
  },
  initialState,
);

export default configReducer;
