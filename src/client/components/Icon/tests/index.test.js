import React from 'react';
import { shallow } from 'enzyme';

import Icon from '../index';

describe('<Icon />', () => {
  it('renders as an <i> by default', () => {
    expect(shallow(<Icon />).type()).toEqual('i');
  });

  describe('aria-hidden', () => {
    it('should add aria-hidden by default', () => {
      expect(shallow(<Icon />).prop('aria-hidden')).toEqual('true');
    });

    it('should pass aria-hidden', () => {
      expect(shallow(<Icon aria-hidden="true" />).prop('aria-hidden')).toEqual(
        'true',
      );

      expect(shallow(<Icon aria-hidden="false" />).prop('aria-hidden')).toEqual(
        'false',
      );
    });

    it('should passed aria-hidden with aria-label', () => {
      expect(
        shallow(<Icon aria-hidden="false" aria-label="icon" />).prop(
          'aria-hidden',
        ),
      ).toEqual('false');
    });
  });

  describe('aria-label', () => {
    it('should not applied by default', () => {
      expect(shallow(<Icon />).prop('aria-label')).toBeUndefined();
    });

    it('should pass value and omit aria-hidden when is set', () => {
      const wrapper = shallow(<Icon aria-label="icon" />);

      expect(wrapper.prop('aria-hidden')).toBeUndefined();
      expect(wrapper.prop('aria-label')).toEqual('icon');
    });
  });
});
