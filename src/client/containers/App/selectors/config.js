import { createSelector } from 'reselect';
import get from 'lodash/get';
import { getAppState } from './app';
import { getRegion } from './header';

export const getConfigState = createSelector([getAppState], appState =>
  get(appState, 'config'),
);

export const getConfigModel = createSelector([getConfigState], configState =>
  get(configState, 'model'),
);

export const getPathDomains = createSelector([getConfigModel], configModel =>
  get(configModel, 'paths'),
);

export const getAppKey = createSelector([getConfigModel], configModel =>
  get(configModel, 'appKey'),
);

export const getApiBaseURL = createSelector([getPathDomains], domains =>
  get(domains, 'microfwkDomain'),
);

export const getApaBaseURL = createSelector([getPathDomains], domains =>
  get(domains, 'apaDomain'),
);

export const getApiDefaultParams = createSelector([getConfigModel], model =>
  get(model, 'apiParamsDefault'),
);

/**
 * Compound selector of app key and the region
 */
export const getSessionAppKey = createSelector(
  [getAppKey, getRegion],
  (appKey, region) => `${appKey}-${region}`,
);
