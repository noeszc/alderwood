import faker from 'faker';
import React from 'react';

import { shallow, mount } from 'enzyme';

import DimmerInner from 'client/components/Dimmer/DimmerInner';

describe('<DimmerInner />', () => {
  describe('active', () => {
    it('adds "display: flex" after set to "true"', () => {
      const wrapper = mount(<DimmerInner />);
      const container = wrapper.getDOMNode();

      expect(container).not.toHaveProperty('style');

      wrapper.setProps({ active: true });

      expect(container.style).toHaveProperty('display', 'flex');
    });
  });

  describe('onClickOutside', () => {
    it('called when Dimmer has not children', () => {
      const onClickOutside = jest.fn();
      shallow(<DimmerInner onClickOutside={onClickOutside} />).simulate(
        'click',
      );
      expect(onClickOutside).toHaveBeenCalledTimes(1);
    });

    it('omitted when click on children', () => {
      const element = document.createElement('div');
      document.body.appendChild(element);

      const onClickOutside = jest.fn();

      const wrapper = mount(
        <DimmerInner onClickOutside={onClickOutside}>
          <div>{faker.hacker.phrase()}</div>
        </DimmerInner>,
        {
          attachTo: element,
        },
      );

      wrapper
        .find('div.dimmer__content')
        .childAt(0)
        .simulate('click');

      expect(onClickOutside).not.toBeCalled();

      wrapper.unmount();
      document.body.removeChild(element);
    });

    it('called when click on Dimmer', () => {
      const onClickOutside = jest.fn();

      mount(
        <DimmerInner onClickOutside={onClickOutside}>
          {faker.hacker.phrase()}
        </DimmerInner>,
      ).simulate('click');

      expect(onClickOutside).toHaveBeenCalledTimes(1);
    });

    it('called when click on center', () => {
      const onClickOutside = jest.fn();
      const wrapper = mount(
        <DimmerInner onClickOutside={onClickOutside}>
          {faker.hacker.phrase()}
        </DimmerInner>,
      );

      wrapper.find('div.dimmer__content').simulate('click');
      expect(onClickOutside).toHaveBeenCalledTimes(1);
    });
  });
});
