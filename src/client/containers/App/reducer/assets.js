import { handleActions, combineActions } from 'redux-actions';
import { LOAD_ASSETS } from '../constants';

const initialState = {
  loading: false,
  model: null,
  error: false,
};

const assetsReducer = handleActions(
  {
    [LOAD_ASSETS.PENDING]: state => ({
      ...state,
      loading: true,
    }),
    [combineActions(
      LOAD_ASSETS.CANCELLED,
      LOAD_ASSETS.SUCCESS,
      LOAD_ASSETS.ERROR,
    )]: state => ({
      ...state,
      loading: false,
    }),
    [LOAD_ASSETS.SUCCESS]: (state, { payload }) => ({
      ...state,
      model: payload,
    }),
  },
  initialState,
);

export default assetsReducer;
