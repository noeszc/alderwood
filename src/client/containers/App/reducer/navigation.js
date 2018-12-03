import { handleActions, combineActions } from 'redux-actions';
import { LOAD_NAVIGATION } from '../constants';

const initialState = {
  loading: false,
  model: null,
  error: false,
};

const navigationReducer = handleActions(
  {
    [LOAD_NAVIGATION.PENDING]: state => ({
      ...state,
      loading: true,
    }),
    [combineActions(
      LOAD_NAVIGATION.CANCELLED,
      LOAD_NAVIGATION.SUCCESS,
      LOAD_NAVIGATION.ERROR,
    )]: state => ({
      ...state,
      loading: false,
    }),
    [LOAD_NAVIGATION.SUCCESS]: (state, { payload }) => ({
      ...state,
      model: payload,
    }),
  },
  initialState,
);

export default navigationReducer;
