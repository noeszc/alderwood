import _ from 'lodash';
import React, { isValidElement } from 'react';
import { shallow } from 'enzyme';
import { createShorthand, createShorthandFactory } from '../factories';

/**
 * Returns the result of a shorthand factory.
 */
const getShorthand = ({
  Component = 'div',
  defaultProps,
  mapValueToProps = () => ({}),
  overrideProps,
  autoGenerateKey,
  value,
}) =>
  createShorthand(Component, mapValueToProps, value, {
    defaultProps,
    overrideProps,
    autoGenerateKey,
  });

// ----------------------------------------
// Common tests
// ----------------------------------------
const itReturnsNull = value => {
  it('returns null', () => {
    expect(getShorthand({ value })).toBeNull();
  });
};

const itReturnsNullGivenDefaultProps = value => {
  it('returns null given defaultProps object', () => {
    expect(
      getShorthand({ value, defaultProps: { 'data-foo': 'foo' } }),
    ).toBeNull();
  });
};

const itReturnsAValidElement = value => {
  it('returns a valid element', () => {
    expect(isValidElement(getShorthand({ value }))).toBe(true);
  });
};

const itAppliesDefaultProps = value => {
  it('applies defaultProps', () => {
    const defaultProps = { some: 'defaults' };

    expect(shallow(getShorthand({ value, defaultProps })).props()).toEqual(
      defaultProps,
    );
  });
};

const itDoesNotIncludePropsFromMapValueToProps = value => {
  it('does not include props from mapValueToProps', () => {
    const props = { 'data-foo': 'foo' };
    const wrapper = shallow(
      getShorthand({ value, mapValueToProps: () => props }),
    );

    _.each(props, (val, key) => {
      expect(wrapper.props()).not.toHaveProperty(key, val);
    });
  });
};

const itMergesClassNames = (
  classNameSource,
  extraClassName,
  shorthandConfig,
) => {
  it(`merges defaultProps className and ${classNameSource} className`, () => {
    const defaultProps = { className: 'default' };
    const overrideProps = { className: 'override' };

    expect(
      shallow(
        getShorthand({ defaultProps, overrideProps, ...shorthandConfig }),
      ).hasClass(`default override ${extraClassName}`),
    ).toBe(true);
  });
};

const itAppliesProps = (propsSource, expectedProps, shorthandConfig) => {
  it(`applies props from the ${propsSource} props`, () => {
    expect(shallow(getShorthand(shorthandConfig)).props()).toEqual(
      expectedProps,
    );
  });
};

const itOverridesDefaultProps = (
  propsSource,
  defaultProps,
  expectedProps,
  shorthandConfig,
) => {
  it(`overrides defaultProps with ${propsSource} props`, () => {
    expect(
      shallow(getShorthand({ defaultProps, ...shorthandConfig })).props(),
    ).toEqual(expectedProps);
  });
};

const itOverridesDefaultPropsWithFalseyProps = (
  propsSource,
  shorthandConfig,
) => {
  it(`overrides defaultProps with falsey ${propsSource} props`, () => {
    const defaultProps = { undef: '-', nil: '-', zero: '-', empty: '-' };
    const expectedProps = { undef: undefined, nil: null, zero: 0, empty: '' };

    expect(
      shallow(getShorthand({ defaultProps, ...shorthandConfig })).props(),
    ).toEqual(expectedProps);
  });
};

// ----------------------------------------
// Assertions
// ----------------------------------------
describe('factories', () => {
  describe('createShorthandFactory', () => {
    it('does not throw if passed a function Component', () => {
      const goodUsage = () => createShorthandFactory(() => <div />, () => ({}));

      expect(goodUsage).not.toThrow();
    });

    it('does not throw if passed a string Component', () => {
      const goodUsage = () => createShorthandFactory('div', () => ({}));

      expect(goodUsage).not.toThrow();
    });

    it('throw if passed Component that is not a string nor function', () => {
      const badComponents = [undefined, null, true, false, [], {}, 123];

      _.each(badComponents, badComponent => {
        const badUsage = () => createShorthandFactory(badComponent, () => ({}));

        expect(badUsage).toThrow();
      });
    });
  });

  describe('createShorthand', () => {
    it('does not throw if passed a function Component', () => {
      const goodUsage = () => createShorthand(() => <div />, () => ({}));

      expect(goodUsage).not.toThrow();
    });

    it('does not throw if passed a string Component', () => {
      const goodUsage = () => createShorthand('div', () => ({}));

      expect(goodUsage).not.toThrow();
    });

    it('throw if passed Component that is not a string nor function', () => {
      const badComponents = [undefined, null, true, false, [], {}, 123];

      _.each(badComponents, badComponent => {
        const badUsage = () => createShorthand(badComponent, () => ({}));

        expect(badUsage).toThrow();
      });
    });

    describe('defaultProps', () => {
      it('can be an object', () => {
        const defaultProps = { 'data-some': 'defaults' };

        expect(
          shallow(getShorthand({ value: 'foo', defaultProps })).props(),
        ).toEqual(defaultProps);
      });
    });

    describe('childKey', () => {
      it('is consumed', () => {
        expect(
          getShorthand({
            value: { childKey: 123 },
          }).props,
        ).not.toHaveProperty('childKey');
      });

      it('is called with the final `props` if it is a function', () => {
        const props = { foo: 'bar', childKey: jest.fn(({ foo }) => foo) };
        const element = getShorthand({ value: props });

        expect(props.childKey).toHaveBeenCalledTimes(1);
        expect(props.childKey).toHaveBeenCalledWith({
          foo: 'bar',
          key: 'bar',
        });
        expect(element.key).toEqual('bar');
      });

      describe('on an element', () => {
        it('works with a string', () => {
          expect(
            getShorthand({ value: <div childKey="foo" /> }),
          ).toHaveProperty('key', 'foo');
        });

        it('works with a number', () => {
          expect(
            getShorthand({ value: <div childKey={123} /> }),
          ).toHaveProperty('key', '123');
        });

        it('works with falsy values', () => {
          expect(
            getShorthand({ value: <div childKey={null} /> }),
          ).toHaveProperty('key', null);

          expect(getShorthand({ value: <div childKey={0} /> })).toHaveProperty(
            'key',
            '0',
          );

          expect(getShorthand({ value: <div childKey="" /> })).toHaveProperty(
            'key',
            '',
          );
        });
      });

      describe('on an object', () => {
        it('works with a string', () => {
          expect(getShorthand({ value: { childKey: 'foo' } })).toHaveProperty(
            'key',
            'foo',
          );
        });

        it('works with a number', () => {
          expect(getShorthand({ value: { childKey: 123 } })).toHaveProperty(
            'key',
            '123',
          );
        });

        it('works with falsy values', () => {
          expect(getShorthand({ value: { childKey: null } })).toHaveProperty(
            'key',
            null,
          );

          expect(getShorthand({ value: { childKey: 0 } })).toHaveProperty(
            'key',
            '0',
          );

          expect(getShorthand({ value: { childKey: '' } })).toHaveProperty(
            'key',
            '',
          );
        });
      });
    });

    describe('overrideProps', () => {
      it('can be an object', () => {
        const overrideProps = { 'data-some': 'overrides' };

        expect(
          shallow(getShorthand({ value: 'foo', overrideProps })).props(),
        ).toEqual(overrideProps);
      });

      it('can be a function that returns defaultProps', () => {
        const overrideProps = () => ({ 'data-some': 'overrides' });

        expect(
          shallow(getShorthand({ value: 'foo', overrideProps })).props(),
        ).toEqual(overrideProps());
      });

      it("is called with the user's element's and default props", () => {
        const defaultProps = { 'data-some': 'defaults' };
        const overrideProps = jest.fn(() => ({}));
        const userProps = { 'data-user': 'props' };
        const value = <div {...userProps} />;

        shallow(getShorthand({ defaultProps, overrideProps, value }));
        expect(overrideProps).toBeCalledWith({
          ...defaultProps,
          ...userProps,
        });
      });

      it("is called with the user's props object", () => {
        const defaultProps = { 'data-some': 'defaults' };
        const overrideProps = jest.fn(() => ({}));
        const userProps = { 'data-user': 'props' };

        shallow(
          getShorthand({ defaultProps, overrideProps, value: userProps }),
        );

        expect(overrideProps).toBeCalledWith({
          ...defaultProps,
          ...userProps,
        });
      });

      it('is called with the result of mapValueToProps', () => {
        const defaultProps = { 'data-some': 'defaults' };
        const overrideProps = jest.fn(() => ({}));
        const value = 'foo';
        const mapValueToProps = val => ({ 'data-mapped': val });

        shallow(
          getShorthand({ defaultProps, mapValueToProps, overrideProps, value }),
        );

        expect(overrideProps).toHaveBeenCalledWith({
          ...defaultProps,
          ...mapValueToProps(value),
        });
      });
    });

    describe('from null', () => {
      itReturnsNull(null);
      itReturnsNullGivenDefaultProps(null);
    });

    describe('from true', () => {
      itReturnsNull(true);
      itReturnsNullGivenDefaultProps(true);
    });

    describe('from false', () => {
      itReturnsNull(false);
      itReturnsNullGivenDefaultProps(false);
    });

    describe('from an element', () => {
      itReturnsAValidElement(<div />);
      itAppliesDefaultProps(<div />);
      itDoesNotIncludePropsFromMapValueToProps(<div />);
      itMergesClassNames('element', 'user', {
        value: <div className="user" />,
      });
      itAppliesProps('element', { foo: 'foo' }, { value: <div foo="foo" /> });
      itOverridesDefaultProps(
        'element',
        { some: 'defaults', overridden: false },
        { some: 'defaults', overridden: true },
        { value: <div overridden /> },
      );
      itOverridesDefaultPropsWithFalseyProps('element', {
        value: <div undef={undefined} nil={null} zero={0} empty="" />,
      });
    });

    describe('from a string', () => {
      itReturnsAValidElement('foo');
      itAppliesDefaultProps('foo');
      itMergesClassNames('mapValueToProps', 'mapped', {
        value: 'foo',
        mapValueToProps: () => ({ className: 'mapped' }),
      });

      itAppliesProps(
        'mapValueToProps',
        { 'data-prop': 'present' },
        {
          value: 'foo',
          mapValueToProps: () => ({ 'data-prop': 'present' }),
        },
      );

      itOverridesDefaultProps(
        'mapValueToProps',
        { some: 'defaults', overridden: false },
        { some: 'defaults', overridden: true },
        {
          value: 'a string',
          mapValueToProps: () => ({ overridden: true }),
        },
      );

      itOverridesDefaultPropsWithFalseyProps('mapValueToProps', {
        value: 'a string',
        mapValueToProps: () => ({
          undef: undefined,
          nil: null,
          zero: 0,
          empty: '',
        }),
      });
    });

    describe('from a props object', () => {
      itReturnsAValidElement({});
      itAppliesDefaultProps({});
      itDoesNotIncludePropsFromMapValueToProps({});
      itMergesClassNames('props object', 'user', {
        value: { className: 'user' },
      });

      itOverridesDefaultProps(
        'props object',
        { some: 'defaults', overridden: false },
        { some: 'defaults', overridden: true },
        {
          value: { overridden: true },
        },
      );

      itOverridesDefaultPropsWithFalseyProps('props object', {
        value: { undef: undefined, nil: null, zero: 0, empty: '' },
      });
    });

    describe('from a function', () => {
      itReturnsAValidElement(() => <div />);
      itDoesNotIncludePropsFromMapValueToProps(() => <div />);

      it('is called once', () => {
        const spy = jest.fn();

        getShorthand({ value: spy });
        expect(spy).toBeCalledTimes(1);
      });

      it('is called with Component, props, children', () => {
        const spy = jest.fn(() => <div />);

        getShorthand({ Component: 'p', value: spy });
        expect(spy).toHaveBeenCalledWith('p', {}, undefined);
      });

      it('receives defaultProps in its props argument', () => {
        const spy = jest.fn(() => <div />);
        const defaultProps = { defaults: true };

        getShorthand({ Component: 'p', defaultProps, value: spy });

        expect(spy).toHaveBeenCalledWith('p', defaultProps, undefined);
      });

      it('receives overrideProps in its props argument', () => {
        const spy = jest.fn(() => <div />);
        const overrideProps = { overrides: true };

        getShorthand({ Component: 'p', overrideProps, value: spy });
        expect(spy).toHaveBeenCalledWith('p', overrideProps, undefined);
      });
    });

    describe('from an array', () => {
      itReturnsAValidElement(['foo']);
      itAppliesDefaultProps(['foo']);
      itMergesClassNames('mapValueToProps', 'mapped', {
        value: ['foo'],
        mapValueToProps: () => ({ className: 'mapped' }),
      });

      itAppliesProps(
        'mapValueToProps',
        { 'data-prop': 'present' },
        {
          value: ['foo'],
          mapValueToProps: () => ({ 'data-prop': 'present' }),
        },
      );

      itOverridesDefaultProps(
        'mapValueToProps',
        { some: 'defaults', overridden: false },
        { some: 'defaults', overridden: true },
        {
          value: ['an array'],
          mapValueToProps: () => ({ overridden: true }),
        },
      );

      itOverridesDefaultPropsWithFalseyProps('mapValueToProps', {
        value: ['an array'],
        mapValueToProps: () => ({
          undef: undefined,
          nil: null,
          zero: 0,
          empty: '',
        }),
      });
    });

    describe('style', () => {
      it('merges style prop', () => {
        const defaultProps = { style: { left: 5 } };
        const userProps = { style: { bottom: 5 } };
        const overrideProps = { style: { right: 5 } };

        const wrapper = shallow(
          getShorthand({ defaultProps, overrideProps, value: userProps }),
        );

        expect(wrapper.props()).toHaveProperty('style');
        expect(wrapper.prop('style')).toEqual({ left: 5, bottom: 5, right: 5 });
      });

      it('merges style prop and handles override by userProps', () => {
        const defaultProps = { style: { left: 10, bottom: 5 } };
        const userProps = { style: { bottom: 10 } };

        const wrapper = shallow(
          getShorthand({ defaultProps, value: userProps }),
        );

        expect(wrapper.props()).toHaveProperty('style');
        expect(wrapper.prop('style')).toEqual({ left: 10, bottom: 10 });
      });

      it('merges style prop and handles override by overrideProps', () => {
        const userProps = { style: { bottom: 10, right: 5 } };
        const overrideProps = { style: { right: 10 } };

        const wrapper = shallow(
          getShorthand({ overrideProps, value: userProps }),
        );

        expect(wrapper.props()).toHaveProperty('style');
        expect(wrapper.prop('style')).toEqual({ bottom: 10, right: 10 });
      });

      it('merges style prop from defaultProps and overrideProps', () => {
        const defaultProps = { style: { left: 10, bottom: 5 } };
        const overrideProps = { style: { bottom: 10 } };

        const wrapper = shallow(
          getShorthand({ defaultProps, overrideProps, value: 'foo' }),
        );
        expect(wrapper.props()).toHaveProperty('style');
        expect(wrapper.prop('style')).toEqual({ left: 10, bottom: 10 });
      });
    });
  });
});
