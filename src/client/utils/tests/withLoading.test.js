import React from 'react';
import { shallow } from 'enzyme';
import withLoading from '../withLoading';

const Component = () => null;

describe('withLoading', () => {
  it('should render the component only when the condition passes', () => {
    const ConditionalComponent = withLoading(Component);
    const wrapper = shallow(<ConditionalComponent loading />);
    expect(wrapper.html()).not.toBe(null);
  });

  it('should return null when the condition fails', () => {
    const ConditionalComponent = withLoading(Component);
    const wrapper = shallow(<ConditionalComponent loading={false} />);
    expect(wrapper.html()).toBe('');
  });
});
