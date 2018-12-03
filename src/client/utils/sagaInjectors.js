import isEmpty from 'lodash/isEmpty';
import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';
import invariant from 'invariant';
import conformsTo from 'lodash/conformsTo';

import checkStore from './checkStore';

import { DAEMON, ONCE_TILL_UNMOUNT, RESTART_ON_REMOUNT } from './constants';

const allowedModes = [RESTART_ON_REMOUNT, DAEMON, ONCE_TILL_UNMOUNT];

const checkKey = key =>
  invariant(
    isString(key) && !isEmpty(key),
    '(client/utils...) injectSaga: Expected `key` to be a non empty string',
  );

const checkDescriptor = descriptor => {
  const shape = {
    saga: isFunction,
    mode: mode => isString(mode) && allowedModes.includes(mode),
  };
  invariant(
    conformsTo(descriptor, shape),
    '(client/utils...) injectSaga: Expected a valid saga descriptor',
  );
};

export const injectSagaFactory = (store, isValid) => (
  key,
  descriptor = {},
  args,
) => {
  if (!isValid) checkStore(store);

  const newDescriptor = {
    ...descriptor,
    mode: descriptor.mode || RESTART_ON_REMOUNT,
  };
  const { saga, mode } = newDescriptor;

  checkKey(key);
  checkDescriptor(newDescriptor);

  let hasSaga = Reflect.has(store.injectedSagas, key);

  if (process.env.NODE_ENV !== 'production') {
    const oldDescriptor = store.injectedSagas[key];
    if (hasSaga && oldDescriptor.saga !== saga) {
      oldDescriptor.task.cancel();
      hasSaga = false;
    }
  }

  if (!hasSaga || (hasSaga && mode !== DAEMON && mode !== ONCE_TILL_UNMOUNT)) {
    /* eslint-disable no-param-reassign */
    store.injectedSagas[key] = {
      ...newDescriptor,
      task: store.runSaga(saga, args),
    };
  }
};

export const ejectSagaFactory = (store, isValid) => key => {
  if (!isValid) checkStore(store);

  checkKey(key);

  if (Reflect.has(store.injectedSagas, key)) {
    const descriptor = store.injectedSagas[key];
    if (descriptor.mode && descriptor.mode !== DAEMON) {
      descriptor.task.cancel();
      if (process.env.NODE_ENV === 'production') {
        store.injectedSagas[key] = 'done';
      }
    }
  }
};

const getInjectors = store => {
  checkStore(store);
  return {
    injectSaga: injectSagaFactory(store, true),
    ejectSaga: ejectSagaFactory(store, true),
  };
};

export default getInjectors;
