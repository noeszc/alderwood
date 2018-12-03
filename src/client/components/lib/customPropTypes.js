import _ from 'lodash/fp';
import PropTypes from 'prop-types';

const typeOf = (...args) => Object.prototype.toString.call(...args);

/**
 * Ensure a component can render as a give prop value.
 */
export const as = (...args) =>
  PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.symbol])(
    ...args,
  );

/**
 * Ensure a prop is a valid DOM node.
 */
export const domNode = (props, propName) => {
  const prop = _.get(props, propName);
  // skip if prop is undefined
  if (prop === undefined) return;
  // skip if prop is valid
  if (prop instanceof Element) return;

  throw new Error(`Invalid prop "${propName}" supplied, expected a DOM node.`);
};

/**
 * Disallow other props from being defined with this prop.
 * @param {string[]} disallowedProps An array of props that cannot be used with this prop.
 */
export const disallow = disallowedProps => (props, propName, componentName) => {
  if (!Array.isArray(disallowedProps)) {
    throw new Error(
      [
        'Invalid argument supplied to disallow, expected an instance of array.',
        ` See \`${propName}\` prop in \`${componentName}\`.`,
      ].join(''),
    );
  }

  // skip if prop is undefined
  if (_.isNil(props[propName]) || props[propName] === false) return;

  // find disallowed props with values
  const disallowed = disallowedProps.reduce((acc, disallowedProp) => {
    if (!_.isNil(props[disallowedProp]) && props[disallowedProp] !== false) {
      return [...acc, disallowedProp];
    }
    return acc;
  }, []);

  if (disallowed.length > 0) {
    return new Error(
      [
        `Prop \`${propName}\` in \`${componentName}\` conflicts with props: \`${disallowed.join(
          '`, `',
        )}\`.`,
        'They cannot be defined together, choose one or the other.',
      ].join(' '),
    );
  }
};

/**
 * Ensure a prop adherers to multiple prop type validators.
 * @param {function[]} validators An array of propType functions.
 */
export const every = validators => (
  props,
  propName,
  componentName,
  ...rest
) => {
  if (!Array.isArray(validators)) {
    throw new Error(
      [
        'Invalid argument supplied to every, expected an instance of array.',
        `See \`${propName}\` prop in \`${componentName}\`.`,
      ].join(' '),
    );
  }

  const errors = _.flow(
    _.map(validator => {
      if (typeof validator !== 'function') {
        throw new Error(
          `every() argument "validators" should contain functions, found: ${typeOf(
            validator,
          )}.`,
        );
      }
      return validator(props, propName, componentName, ...rest);
    }),
    _.compact,
  )(validators);

  // we can only return one error at a time
  return errors[0];
};

export const contentShorthand = (...args) =>
  every([disallow(['children']), PropTypes.node])(...args);

/**
 * Ensure a prop adherers to at least one of the given prop type validators.
 * @param {function[]} validators An array of propType functions.
 */
export const some = validators => (props, propName, componentName, ...rest) => {
  if (!Array.isArray(validators)) {
    throw new Error(
      [
        'Invalid argument supplied to some, expected an instance of array.',
        `See \`${propName}\` prop in \`${componentName}\`.`,
      ].join(' '),
    );
  }

  const errors = _.compact(
    _.map(validators, validator => {
      if (!_.isFunction(validator)) {
        throw new Error(
          `some() argument "validators" should contain functions, found: ${typeOf(
            validator,
          )}.`,
        );
      }
      return validator(props, propName, componentName, ...rest);
    }),
  );

  // fail only if all validators failed
  if (errors.length === validators.length) {
    const error = new Error('One of these validators must pass:');
    error.message += `\n${_.map(
      errors,
      (err, i) => `[${i + 1}]: ${err.message}`,
    ).join('\n')}`;
    return error;
  }
};

/**
 * Item shorthand is a description of a component that can be a literal,
 * a props object, or an element.
 */
export const itemShorthand = (...args) =>
  every([
    disallow(['children']),
    PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.object,
      PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.node, PropTypes.object]),
      ),
    ]),
  ])(...args);

/**
 * Collection shorthand ensures a prop is an array of item shorthand.
 */
export const collectionShorthand = (...args) =>
  every([disallow(['children']), PropTypes.arrayOf(itemShorthand)])(...args);
