import React from 'react';
import { shallow } from 'enzyme';
import faker from 'faker';

import Loader from '../index';

describe('<Loader />', () => {
  describe('text (class)', () => {
    it('omitted by default', () => {
      expect(shallow(<Loader />).hasClass('loader--text')).toBe(false);
    });

    it('add class when has children', () => {
      const text = faker.hacker.phrase();

      expect(shallow(<Loader>{text}</Loader>).hasClass('loader--text')).toBe(
        true,
      );
    });

    it('add class when has content prop', () => {
      const text = faker.hacker.phrase();

      expect(shallow(<Loader content={text} />).hasClass('loader--text')).toBe(
        true,
      );
    });
  });
});
