import React from 'react';
import { shallow } from 'enzyme';
import _ from 'lodash';

import { htmlImageProps } from 'client/components/lib/htmlPropsUtils';
import Image from '../index';

describe('<Image />', () => {
  describe('as', () => {
    it('renders an img tag', () => {
      expect(shallow(<Image />).type()).toEqual('img');
    });
  });
  describe('href', () => {
    it('renders an a tag', () => {
      expect(shallow(<Image href="http://google.com" />).type()).toEqual('a');
    });
  });

  describe('image props', () => {
    _.forEach(htmlImageProps, propName => {
      it(`keeps "${propName}" on root element by default`, () => {
        const wrapper = shallow(<Image {...{ [propName]: 'foo' }} />);

        expect(wrapper.name()).toBe('img');
        expect(wrapper.props()).toHaveProperty(propName, 'foo');
      });

      it(`passes "${propName}" to the img tag when wrapped`, () => {
        expect(
          shallow(<Image wrapped {...{ [propName]: 'foo' }} />)
            .find('img')
            .props(),
        ).toHaveProperty(propName, 'foo');
      });
    });
  });

  describe('wrapped', () => {
    it('renders an div tag when true', () => {
      expect(shallow(<Image wrapped />).type()).toEqual('div');
    });
  });
});
