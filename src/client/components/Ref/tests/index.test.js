import React from 'react';
import { shallow, mount } from 'enzyme';
import faker from 'faker';

import Ref from '../index';
import {
  CompositeClass,
  CompositeFunction,
  DOMClass,
  DOMFunction,
} from './fixtures';

const mountNode = (Component, innerRef) =>
  mount(
    <Ref innerRef={innerRef}>
      <Component />
    </Ref>,
  )
    .find('#node')
    .getDOMNode();

describe('<Ref />', () => {
  describe('children', () => {
    it('renders single child', () => {
      const child = <div data-child={faker.hacker.noun()} />;
      const wrapper = shallow(<Ref>{child}</Ref>);

      expect(wrapper.contains(child)).toBe(true);
    });
  });

  describe('innerRef', () => {
    it('returns node from a functional component with DOM node', () => {
      const innerRef = jest.fn();
      const node = mountNode(DOMFunction, innerRef);

      expect(innerRef).toHaveBeenCalledTimes(1);
      expect(innerRef).toBeCalledWith(node);
    });

    it('returns node from a functional component', () => {
      const innerRef = jest.fn();
      const node = mountNode(CompositeFunction, innerRef);

      expect(innerRef).toHaveBeenCalledTimes(1);
      expect(innerRef).toBeCalledWith(node);
    });

    it('returns node from a class component with DOM node', () => {
      const innerRef = jest.fn();
      const node = mountNode(DOMClass, innerRef);

      expect(innerRef).toHaveBeenCalledTimes(1);
      expect(innerRef).toBeCalledWith(node);
    });

    it('returns node from a class component', () => {
      const innerRef = jest.fn();
      const node = mountNode(CompositeClass, innerRef);

      expect(innerRef).toHaveBeenCalledTimes(1);
      expect(innerRef).toBeCalledWith(node);
    });
  });
});
