import _ from 'lodash';

export const getBaseURL = instance => instance.defaults.baseURL;

export const updateDefaults = (axiosInstance, properties = {}) => {
  const instance = axiosInstance;
  // invariant
  _.merge(instance.defaults, properties);
  return instance;
};
