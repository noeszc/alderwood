import _ from 'lodash';
import React from 'react';
import { shallow, mount } from 'enzyme';

import domEvent from 'client/components/lib/domEvent';
import { htmlInputAttrs } from 'client/components/lib';
import Checkbox from '../index';

let attachTo;
let wrapper;
const wrapperMount = (element, opts) => {
  attachTo = document.createElement('div');
  document.body.appendChild(attachTo);

  wrapper = mount(element, { ...opts, attachTo });
  return wrapper;
};
const wrapperShallow = (...args) => {
  wrapper = shallow(...args);
  return wrapper;
};

describe('<Checkbox />', () => {
  beforeEach(() => {
    attachTo = undefined;
    wrapper = undefined;
  });

  afterAll(() => {
    if (wrapper) {
      if (wrapper.unmount) wrapper.unmount();
      if (wrapper.detach) wrapper.detach();
    }
    if (attachTo) document.body.removeChild(attachTo);
  });

  describe('aria', () => {
    ['aria-label', 'role'].forEach(propName => {
      it(`passes "${propName}" to the <input>`, () => {
        expect(
          shallow(<Checkbox {...{ [propName]: 'foo' }} />)
            .find('input')
            .prop(propName),
        ).toEqual('foo');
      });
    });
  });

  describe('checking', () => {
    it('can be checked and unchecked', () => {
      wrapperShallow(<Checkbox />);

      expect(wrapper.find('input').prop('checked')).toBe(false);

      wrapper.simulate('click');
      expect(wrapper.find('input').prop('checked')).toBe(true);

      wrapper.simulate('click');
      expect(wrapper.find('input').prop('checked')).toBe(false);
    });
    it('can be checked but not unchecked when radio', () => {
      wrapperShallow(<Checkbox radio />);

      expect(wrapper.find('input').prop('checked')).toBe(false);

      wrapper.simulate('click');
      expect(wrapper.find('input').prop('checked')).toBe(true);

      wrapper.simulate('click');
      expect(wrapper.find('input').prop('checked')).toBe(true);
    });
  });

  describe('defaultChecked', () => {
    it('sets the initial checked state', () => {
      expect(
        shallow(<Checkbox defaultChecked />)
          .find('input')
          .prop('checked'),
      ).toBe(true);
    });
  });

  describe('defaultIndeterminate', () => {
    it('sets the initial indeterminate state', () => {
      wrapperMount(<Checkbox defaultIndeterminate />);
      const input = document.querySelector('.checkbox input');

      expect(input.indeterminate).toBe(true);
    });

    it('unsets indeterminate state on any click', () => {
      wrapperMount(<Checkbox defaultIndeterminate />);
      const input = document.querySelector('.checkbox input');

      expect(input.indeterminate).toBe(true);

      domEvent.click(input);
      expect(input.indeterminate).toBe(false);

      domEvent.click(input);

      expect(input.indeterminate).toBe(false);
    });
  });

  describe('disabled', () => {
    it('cannot be checked', () => {
      wrapperShallow(<Checkbox disabled />);

      wrapper.simulate('click');
      expect(wrapper.find('input').prop('checked')).toBe(false);
    });

    it('cannot be unchecked', () => {
      wrapperShallow(<Checkbox defaultChecked disabled />);

      wrapper.simulate('click');
      expect(wrapper.find('input').prop('checked')).toBe(true);
    });

    it('is applied to the underlying html input element', () => {
      expect(
        wrapperShallow(<Checkbox disabled />)
          .find('input')
          .props('disabled'),
      ).toHaveProperty('disabled', true);

      expect(
        wrapperShallow(<Checkbox disabled={false} />)
          .find('input')
          .prop('disabled'),
      ).toBe(false);
    });
  });

  describe('id', () => {
    it('passes value to the input', () => {
      expect(
        shallow(<Checkbox id="foo" />)
          .find('input')
          .prop('id'),
      ).toEqual('foo');
    });

    it('adds htmlFor prop to the label', () => {
      expect(
        shallow(<Checkbox id="foo" />)
          .find('label')
          .prop('htmlFor'),
      ).toEqual('foo');
    });

    it('adds htmlFor prop to the label when it is empty', () => {
      expect(
        shallow(<Checkbox id="foo" label={null} />)
          .find('label')
          .prop('htmlFor'),
      ).toEqual('foo');
    });
  });

  describe('input', () => {
    // Heads up! Input handles some of html props
    const props = _.without(
      htmlInputAttrs,
      'defaultChecked',
      'disabled',
      'readOnly',
      'checked',
    );

    _.forEach(props, propName => {
      it(`passes "${propName}" to the input`, () => {
        expect(
          shallow(<Checkbox {...{ [propName]: 'radio' }} />)
            .find('input')
            .props(),
        ).toHaveProperty(propName);
      });
    });
  });

  describe('label', () => {
    it('adds the "checkbox--fitted" class when not present', () => {
      expect(
        shallow(<Checkbox name="firstName" />).hasClass('checkbox--fitted'),
      ).toBe(true);
    });

    it('adds the "checkbox--fitted" class when is null', () => {
      expect(
        shallow(<Checkbox name="firstName" />).hasClass('checkbox--fitted'),
      ).toBe(true);
    });

    it('does not add the "checkbox--fitted" class when is not nil', () => {
      expect(
        shallow(<Checkbox name="firstName" label="" />).hasClass(
          'checkbox--fitted',
        ),
      ).toBe(false);

      expect(
        shallow(<Checkbox name="firstName" label={0} />).hasClass(
          'checkbox--fitted',
        ),
      ).toBe(false);
    });
  });

  describe('onChange', () => {
    it('is called with (event { name, value, !checked }) on click', () => {
      const spy = jest.fn();
      const expectProps = {
        name: 'foo',
        value: 'bar',
        checked: false,
        indeterminate: true,
      };
      mount(<Checkbox onChange={spy} {...expectProps} />).simulate('click');

      expect(spy).toBeCalledTimes(1);
    });

    it('is not called when the checkbox has the disabled prop set', () => {
      const spy = jest.fn();
      mount(<Checkbox disabled onChange={spy} />).simulate('click');

      expect(spy).not.toBeCalled();
    });
  });

  describe('onClick', () => {
    it('is called with (event { name, value, checked }) on label click', () => {
      const spy = jest.fn();
      const expectProps = {
        name: 'foo',
        value: 'bar',
        checked: false,
        indeterminate: true,
      };
      mount(<Checkbox onClick={spy} {...expectProps} />).simulate('click');

      expect(spy).toBeCalledTimes(1);
    });

    it('is not called when the checkbox has the disabled prop set', () => {
      const spy = jest.fn();
      mount(<Checkbox disabled onClick={spy} />).simulate('click');
      expect(spy).not.toBeCalled();
    });
  });

  describe('onMouseDown', () => {
    it('is called with (event { name, value, checked }) on label mouse down', () => {
      const onMousedDown = jest.fn();
      const expectProps = {
        name: 'foo',
        value: 'bar',
        checked: false,
        indeterminate: true,
      };
      mount(<Checkbox onMouseDown={onMousedDown} {...expectProps} />).simulate(
        'mousedown',
      );

      expect(onMousedDown).toBeCalledTimes(1);
    });
    it('prevents default event', () => {
      const preventDefault = jest.fn();
      wrapperShallow(<Checkbox />);

      wrapper.simulate('mousedown', { preventDefault });

      expect(preventDefault).toBeCalledTimes(1);
    });
    it('sets focus to container', () => {
      wrapperMount(<Checkbox />);
      const input = document.querySelector('.checkbox input');

      domEvent.fire(input, 'mousedown');
      expect(document.activeElement).toEqual(input);
    });
  });

  describe('readOnly', () => {
    it('cannot be checked', () => {
      wrapperShallow(<Checkbox readOnly />);

      wrapper.simulate('click');
      expect(wrapper.find('input').prop('checked')).toBe(false);
    });
    it('cannot be unchecked', () => {
      wrapperShallow(<Checkbox defaultChecked readOnly />);

      wrapper.simulate('click');
      expect(wrapper.find('input').prop('checked')).toBe(true);
    });
  });

  describe('type', () => {
    it('renders an input of type checkbox when not set', () => {
      expect(
        shallow(<Checkbox />)
          .find('input')
          .props(),
      ).toHaveProperty('type', 'checkbox');
    });
    it('sets the input type ', () => {
      expect(
        shallow(<Checkbox type="checkbox" />)
          .find('input')
          .props(),
      ).toHaveProperty('type', 'checkbox');

      expect(
        shallow(<Checkbox type="radio" />)
          .find('input')
          .props(),
      ).toHaveProperty('type', 'radio');
    });
  });
});
