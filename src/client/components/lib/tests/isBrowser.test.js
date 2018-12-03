import { isBrowser } from 'client/components/lib';

describe('isBrowser', () => {
  describe('browser', () => {
    it('should return true in a browser', () => {
      expect(isBrowser()).toBe(true);
    });
  });
  describe('server-side', () => {
    beforeAll(() => {
      isBrowser.override = false;
    });

    afterAll(() => {
      isBrowser.override = null;
    });

    it('should return override value', () => {
      // tests are run in a browser, this should be true
      expect(isBrowser()).toBe(false);
    });
  });
});
