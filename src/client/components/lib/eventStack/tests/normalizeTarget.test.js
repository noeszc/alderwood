import normalizeTarget from '../normalizeTarget';

describe('normalizeTarget', () => {
  describe('document', () => {
    it('returns `document` when it passed as string', () => {
      expect(normalizeTarget('document')).toEqual(document);
    });

    it('returns `document` when `false` passed', () => {
      expect(normalizeTarget(false)).toEqual(document);
    });

    it('returns `document` when it passed', () => {
      expect(normalizeTarget(document)).toEqual(document);
    });
  });

  describe('element', () => {
    it('returns `element` when it passed', () => {
      const element = document.createElement('div');

      expect(normalizeTarget(element)).toEqual(element);
    });
  });

  describe('window', () => {
    it('returns `document` when it passed as string', () => {
      expect(normalizeTarget('window')).toEqual(window);
    });

    it('returns document when it passed', () => {
      expect(normalizeTarget(window)).toEqual(window);
    });
  });
});
