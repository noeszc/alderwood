import { createSelector } from 'reselect';
import get from 'lodash/get';
import { getAppState } from './app';

export const getHeaderState = createSelector([getAppState], appState =>
  get(appState, 'header'),
);

export const getHasHeaderLoadedOnce = createSelector([getHeaderState], header =>
  get(header, 'hasLoadedOnce'),
);

export const getHeaderModel = createSelector([getHeaderState], header =>
  get(header, 'model'),
);

export const getHKS = createSelector([getHeaderModel], model =>
  get(model, 'session_stringvalue'),
);

export const getRegion = createSelector([getHeaderModel], model =>
  get(model, 'region'),
);
