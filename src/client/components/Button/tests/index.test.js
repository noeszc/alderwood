import React from 'react';
import { shallow, mount } from 'enzyme';

import Button from '../index';

const syntheticEvent = { preventDefault: () => undefined };

describe('<Button />', () => {
  it('renders a button by default', () => {
    expect(shallow(<Button />).type()).toBe('button');
  });

  describe('disabled', () => {
    it('is not set by default', () => {
      expect(shallow(<Button />).prop('disabled')).toBeUndefined();
    });

    it('applied when defined', () => {
      expect(shallow(<Button disabled />).prop('disabled')).toBe(true);
    });

    it("don't apply when the element's type isn't button", () => {
      expect(
        shallow(<Button as="div" disabled />).prop('disabled'),
      ).toBeUndefined();
    });
  });

  describe('focus', () => {
    it('can be set via a ref', () => {
      const mountNode = document.createElement('div');
      document.body.appendChild(mountNode);

      const wrapper = mount(<Button />, { attachTo: mountNode });
      wrapper.instance().focus();

      const button = document.querySelector('button');
      expect(document.activeElement).toEqual(button);

      wrapper.detach();
      document.body.removeChild(mountNode);
    });
  });

  describe('onClick', () => {
    it('is called with (e, data) when clicked', () => {
      const onClick = jest.fn();

      shallow(<Button onClick={onClick} />).simulate('click', syntheticEvent);

      expect(onClick).toHaveBeenCalledTimes(1);
      expect(onClick).toHaveBeenCalledWith(syntheticEvent, {
        onClick,
        ...Button.defaultProps,
      });
    });

    it('is not called when is disabled', () => {
      const onClick = jest.fn();

      shallow(<Button disabled onClick={onClick} />).simulate(
        'click',
        syntheticEvent,
      );
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe('role', () => {
    it('defaults to a button', () => {
      expect(Button.defaultProps.role).toBe('button');
      expect(shallow(<Button />).prop('role')).toBe('button');
    });
    it('is configurable', () => {
      expect(shallow(<Button role="link" />).prop('role')).toBe('link');
    });
  });

  describe('tabIndex', () => {
    it('is not set by default', () => {
      expect(shallow(<Button />).prop('tabIndex')).toBeUndefined();
    });
    it('defaults to 0 as div', () => {
      expect(shallow(<Button as="div" />).prop('tabIndex')).toBe(0);
    });
    it('defaults to -1 when disabled', () => {
      expect(shallow(<Button disabled />).prop('tabIndex')).toBe(-1);
    });
    it('can be set explicitly', () => {
      expect(shallow(<Button tabIndex={0} />).prop('tabIndex')).toBe(0);
    });
    it('can be set explicitly when disabled', () => {
      expect(shallow(<Button tabIndex="0" disabled />).prop('tabIndex')).toBe(
        '0',
      );
    });
  });
});
