import { handleActions, combineActions } from 'redux-actions';
import { BOOTING } from 'client/containers/App/constants';

const initialState = false;

const readyReducer = handleActions(
  {
    [BOOTING.PENDING]: () => false,
    [combineActions(BOOTING.CANCELLED, BOOTING.SUCCESS, BOOTING.ERROR)]: () =>
      true,
  },
  initialState,
);

export default readyReducer;
