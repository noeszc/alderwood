import React from 'react';
import { shallow, mount } from 'enzyme';

import MountNode from '../index';

describe('<MountNode />', () => {
  describe('node', () => {
    it('will add className to specified node', () => {
      const node = document.createElement('div');
      shallow(<MountNode className="foo" node={node} />);

      expect(node.classList.contains('foo')).toBe(true);
    });

    it('will update className on specified node', () => {
      const node = document.createElement('div');
      const wrapper = mount(<MountNode className="foo" node={node} />);

      wrapper.setProps({ className: 'bar' });
      expect(node.classList.contains('foo')).toBe(false);
      expect(node.classList.contains('bar')).toBe(true);
    });

    it('will remove className on specified node', () => {
      const node = document.createElement('div');
      const wrapper = mount(<MountNode className="foo" node={node} />);

      expect(node.classList.contains('foo')).toBe(true);

      wrapper.unmount();

      expect(node.classList.contains('foo')).toBe(false);
    });
  });
});
