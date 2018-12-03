import { handleActions, combineActions } from 'redux-actions';
import { LOAD_SESSION } from '../constants';

const initialState = {
  loading: false,
  model: null,
  error: false,
};

const sessionReducer = handleActions(
  {
    [LOAD_SESSION.PENDING]: state => ({
      ...state,
      loading: true,
    }),
    [combineActions(
      LOAD_SESSION.CANCELLED,
      LOAD_SESSION.SUCCESS,
      LOAD_SESSION.ERROR,
    )]: state => ({
      ...state,
      loading: false,
    }),
    [LOAD_SESSION.SUCCESS]: (state, { payload }) => ({
      ...state,
      model: payload,
    }),
  },
  initialState,
);

export default sessionReducer;
