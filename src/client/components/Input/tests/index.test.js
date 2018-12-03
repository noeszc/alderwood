import _ from 'lodash';
import React from 'react';
import { shallow, mount } from 'enzyme';
import { htmlInputProps } from 'client/components/lib';
import Input from '../index';

describe('<Input />', () => {
  it('renders with conditional children', () => {
    const wrapper = shallow(
      <Input>
        {true && <span />}
        {false && <div />}
      </Input>,
    );
    expect(wrapper.contains(<span />)).toBe(true);

    expect(wrapper.contains(<div />)).toBe(false);
  });

  it('renders a text <input> by default', () => {
    const wrapper = shallow(<Input />);
    expect(wrapper.find('input').prop('type')).toEqual('text');
  });

  describe('input props', () => {
    _.without(htmlInputProps, 'disabled').forEach(propName => {
      it(`passes \`${propName}\` to the <input>`, () => {
        const propValue = propName === 'onChange' ? () => null : 'foo';
        const wrapper = shallow(<Input {...{ [propName]: propValue }} />);

        // account for overloading the onChange prop
        const expectedValue =
          propName === 'onChange' ? wrapper.instance().handleChange : propValue;

        expect(wrapper.find('input').prop(propName)).toEqual(expectedValue);
      });

      it(`passes \`${propName}\` to the <input> when using children`, () => {
        const propValue = propName === 'onChange' ? () => null : 'foo';
        const wrapper = shallow(
          <Input {...{ [propName]: propValue }}>
            <input />
          </Input>,
        );

        // account for overloading the onChange prop
        const expectedValue =
          propName === 'onChange' ? wrapper.instance().handleChange : propValue;

        expect(wrapper.find('input').prop(propName)).toEqual(expectedValue);
      });
    });
  });

  describe('focus', () => {
    it('can be set via a ref', () => {
      const mountNode = document.createElement('div');
      document.body.appendChild(mountNode);

      const wrapper = mount(<Input />, { attachTo: mountNode });
      wrapper.instance().focus();

      const input = document.querySelector('.input input');
      expect(document.activeElement).toEqual(input);

      wrapper.detach();
      document.body.removeChild(mountNode);
    });
  });

  describe('select', () => {
    beforeAll(() => {
      window.getSelection = () => 'expect this text to be selected';
    });
    it('can be set via a ref', () => {
      const mountNode = document.createElement('div');
      document.body.appendChild(mountNode);

      const value = 'expect this text to be selected';
      const wrapper = mount(<Input value={value} />, { attachTo: mountNode });
      wrapper.instance().select();

      expect(window.getSelection().toString()).toEqual(value);

      wrapper.detach();
      document.body.removeChild(mountNode);
    });
  });

  describe('loading', () => {
    it("don't add icon if it's defined", () => {
      expect(
        shallow(<Input icon="user" loading />)
          .find('Icon')
          .prop('name'),
      ).toBe('user');
    });

    it("adds icon if it's not defined", () => {
      expect(
        shallow(<Input loading />)
          .find('Icon')
          .prop('name'),
      ).toBe('spinner');
    });
  });

  describe('onChange', () => {
    it('is called with (e, data) on change', () => {
      const spy = jest.fn();
      const e = { target: { value: 'name' } };
      const props = { 'data-foo': 'bar', onChange: spy };

      const wrapper = shallow(<Input {...props} />);

      wrapper.find('input').simulate('change', e);
      expect(spy).toBeCalledTimes(1);
    });

    it('is called with (e, data) on change when using children', () => {
      const spy = jest.fn();
      const e = { target: { value: 'name' } };
      const props = { 'data-foo': 'bar', onChange: spy };

      const wrapper = shallow(
        <Input {...props}>
          <input />
        </Input>,
      );

      wrapper.find('input').simulate('change', e);

      expect(spy).toBeCalledTimes(1);
    });
  });

  describe('ref', () => {
    it('maintains ref on child node', () => {
      const ref = jest.fn();
      const mountNode = document.createElement('div');
      document.body.appendChild(mountNode);

      const wrapper = mount(
        <Input>
          <input ref={ref} />
        </Input>,
        { attachTo: mountNode },
      );
      const input = document.querySelector('.input input');

      expect(ref).toBeCalledTimes(1);
      expect(ref).toBeCalledWith(input);
      expect(wrapper.instance().inputRef).toEqual(input);

      wrapper.detach();
      document.body.removeChild(mountNode);
    });
  });

  describe('disabled', () => {
    it('is applied to the underlying html input element', () => {
      expect(
        shallow(<Input disabled />)
          .find('input')
          .prop('disabled'),
      ).toBe(true);

      expect(
        shallow(<Input disabled={false} />)
          .find('input')
          .prop('disabled'),
      ).toBe(false);
    });
  });

  describe('tabIndex', () => {
    it('is not set by default', () => {
      expect(
        shallow(<Input />)
          .find('input')
          .prop('tabIndex'),
      ).toBeUndefined();
    });

    it('defaults to -1 when disabled', () => {
      expect(
        shallow(<Input disabled />)
          .find('input')
          .prop('tabIndex'),
      ).toBe(-1);
    });

    it('can be set explicitly', () => {
      expect(
        shallow(<Input tabIndex={123} />)
          .find('input')
          .prop('tabIndex'),
      ).toBe(123);
    });

    it('can be set explicitly when disabled', () => {
      expect(
        shallow(<Input tabIndex={123} disabled />)
          .find('input')
          .prop('tabIndex'),
      ).toBe(123);
    });
  });

  describe('icon', () => {
    it('is second child', () => {
      expect(
        shallow(<Input icon="search" />)
          .children()
          .at(1)
          .is('Icon'),
      ).toBe(true);
    });
  });
});
