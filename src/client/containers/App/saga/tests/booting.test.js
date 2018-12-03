import sagaHelper from 'redux-saga-testing';
import { put, select } from 'redux-saga/effects';

import { push } from 'connected-react-router';

import { bootingError, finishedBooting, onStartBooting } from '../booting';
import { getRegion } from '../../selectors/header';
import { booting, loadConfig } from '../../actions';

describe('bootingError', () => {
  const it = sagaHelper(bootingError());
  it('an error occurred during boot loader, should redirect to "/not-supported" url', result => {
    expect(result).toEqual(put(push('/not-supported')));
  });
});

describe('finishedBooting', () => {
  const it = sagaHelper(finishedBooting());

  it('shoudl select the region country', result => {
    expect(result).toEqual(select(getRegion));
    return 'mexico';
  });

  it('should redirect to home page', result => {
    expect(result).toEqual(put(push('/mexico/homeuser')));
  });
});

describe('onStartBooting', () => {
  const it = sagaHelper(onStartBooting());

  it('should dispatch the "booting" action', result => {
    expect(result).toEqual(put(booting()));
  });

  it('should dispatch the "loadConfig" action', result => {
    expect(result).toEqual(put(loadConfig()));
  });
});
