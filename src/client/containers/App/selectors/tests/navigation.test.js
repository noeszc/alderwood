import { getNavigationState } from '../navigation';
describe('getNavigationState', () => {
  const appNavigation = {
    model: null,
    loading: false,
    error: false,
  };
  const mockedState = {
    app: {
      navigation: appNavigation,
    },
  };
  it('should select the navigation state', () => {
    expect(getNavigationState(mockedState)).toEqual(appNavigation);
  });
});
