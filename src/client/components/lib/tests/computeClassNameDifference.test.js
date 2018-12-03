import _ from 'lodash';
import computeClassNamesDifference from '../computeClassNamesDifference';

const fixtures = [
  {
    prevClasses: [],
    currentClasses: [],
    forAdd: [],
    forRemoval: [],
  },
  {
    prevClasses: ['foo', 'bar'],
    currentClasses: ['bar', 'baz'],
    forAdd: ['baz'],
    forRemoval: ['foo'],
  },
];

describe('computeClassNamesDifference', () => {
  it('computes className difference', () => {
    _.forEach(fixtures, fixture => {
      const { prevClasses, currentClasses, forAdd, forRemoval } = fixture;
      expect(
        computeClassNamesDifference(prevClasses, currentClasses),
      ).toContainEqual(forAdd, forRemoval);
    });
  });
});
