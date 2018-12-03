import { handleActions } from 'redux-actions';
import { START_SET_COMMON_CONFIG, END_SET_COMMON_CONFIG } from 'shared/redux/types/config';

const defaultState = {
  loading: false,
  error: false,
  model: false,
};

export const configReducer = handleActions({
  [START_SET_COMMON_CONFIG]: (state, action) => ({
    ...state,
    loading: true,
  }),
  [END_SET_COMMON_CONFIG]: (state, action) => ({
    ...state,
    model: { ...action.payload },
  }),
}, defaultState);

export default configReducer;
