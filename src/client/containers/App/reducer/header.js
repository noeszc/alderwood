import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { handleActions, combineActions } from 'redux-actions';
import { LOAD_HEADER } from '../constants';

const initialState = {
  loading: false,
  hasLoadedOnce: false,
  model: null,
  error: false,
};

const persistConfig = {
  key: 'app:header',
  storage,
};

const headerReducer = handleActions(
  {
    [LOAD_HEADER.PENDING]: state => ({
      ...state,
      loading: true,
    }),
    [combineActions(
      LOAD_HEADER.CANCELLED,
      LOAD_HEADER.SUCCESS,
      LOAD_HEADER.ERROR,
    )]: state => ({
      ...state,
      loading: false,
    }),
    [LOAD_HEADER.SUCCESS]: (state, { payload }) => ({
      ...state,
      model: payload,
      hasLoadedOnce: true,
    }),
    [LOAD_HEADER.ERROR]: state => ({
      ...state,
      error: true,
    }),
  },
  initialState,
);

export default persistReducer(persistConfig, headerReducer);
