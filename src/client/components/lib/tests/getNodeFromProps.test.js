import getNodeFromProps from '../getNodeFromProps';
import isBrowser from '../isBrowser';

describe('getNodeFromProps', () => {
  describe('browser', () => {
    it('returns node when it defined', () => {
      expect(getNodeFromProps({ node: 'foo' })).toEqual('foo');
    });
    it('returns document.body by default', () => {
      expect(getNodeFromProps({})).toEqual(document.body);
    });
  });

  describe('browser', () => {
    beforeAll(() => {
      isBrowser.override = false;
    });

    afterAll(() => {
      isBrowser.override = null;
    });

    it('always returns null', () => {
      expect(getNodeFromProps({ node: 'foo' })).toBeUndefined();
      expect(getNodeFromProps({})).toBeUndefined();
    });
  });
});
