/**
 *
 * Input
 * An Input is a field used to elicit a response from a user.
 *
 */

import React, { Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import cx from 'bem-classnames';

import Icon from '../Icon';

import {
  getElementType,
  getUnhandledProps,
  partitionHTMLProps,
  childrenUtils,
  createHTMLInput,
  customPropTypes,
} from '../lib';

import './Input.scss';
import { BEM } from '../lib/classNameBuilders';

/* eslint-disable react/prefer-stateless-function */
class Input extends React.Component {
  static propTypes = {
    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** An Input field can show that it is disabled. */
    disabled: PropTypes.bool,

    /** An Input field can show the data contains errors. */
    error: PropTypes.bool,

    /** Take on the size of its container. */
    fluid: PropTypes.bool,

    /** An Input field can show a user is currently interacting with it. */
    focus: PropTypes.bool,

    /** Optional Icon to display inside the Input. */
    icon: PropTypes.oneOfType([PropTypes.bool, customPropTypes.itemShorthand]),

    /** An Icon can appear inside an Input on the left or right. */
    iconPosition: PropTypes.oneOf(['left']),

    /** Shorthand for creating the HTML Input. */
    input: customPropTypes.itemShorthand,

    /** An Icon Input field can show that it is currently loading data. */
    loading: PropTypes.bool,

    /**
     * Called on change.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props and proposed value.
     */
    onChange: PropTypes.func,

    /** An Input can receive focus. */
    tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    /** The HTML input type. */
    type: PropTypes.string,
  };

  static defaultProps = {
    type: 'text',
  };

  computeIcon = () => {
    const { loading, icon } = this.props;

    if (!_.isNil(icon)) return icon;
    if (loading) return 'spinner';
  };

  computeTabIndex = () => {
    const { disabled, tabIndex } = this.props;

    if (!_.isNil(tabIndex)) return tabIndex;
    if (disabled) return -1;
  };

  focus = () => this.inputRef.focus();

  select = () => this.inputRef.select();

  handleChange = e => {
    const value = _.get(e, 'target.value');

    _.invoke(this.props, 'onChange', e, { ...this.props, value });
  };

  handleChildOverrides = (child, defaultProps) => ({
    ...defaultProps,
    ...child.props,
    ref: c => {
      _.invoke(child, 'ref', c);
      this.handleInputRef(c);
    },
  });

  handleInputRef = c => {
    this.inputRef = c;
  };

  partitionProps = () => {
    const { disabled, type } = this.props;

    const tabIndex = this.computeTabIndex();
    const unhandled = getUnhandledProps(Input, this.props);
    const [htmlInputProps, rest] = partitionHTMLProps(unhandled);

    return [
      {
        ...htmlInputProps,
        disabled,
        type,
        tabIndex,
        onChange: this.handleChange,
        ref: this.handleInputRef,
      },
      rest,
    ];
  };

  render() {
    const {
      children,
      input,
      type,
      className,
      iconPosition,
      loading,
      icon,
    } = this.props;

    const baseClasses = cx(
      {
        name: 'input',
        modifiers: [
          'disabled',
          'error',
          'fluid',
          'focus',
          'loading',
          'transparent',
        ],
      },
      this.props,
      className,
    );

    const iconClasses =
      BEM.useValueAndKey('input', iconPosition, 'icon') ||
      BEM.useKeyOnly('input', icon || loading, 'icon');

    const classes = _.join(_.compact([baseClasses, iconClasses]), ' ');

    const ElementType = getElementType(Input, this.props);
    const [htmlInputProps, rest] = this.partitionProps();

    if (!childrenUtils.isNil(children)) {
      // add htmlInputProps to the `<input />` child
      const childElements = _.map(Children.toArray(children), child => {
        if (child.type !== 'input') return child;
        return cloneElement(
          child,
          this.handleChildOverrides(child, htmlInputProps),
        );
      });

      return (
        <ElementType {...rest} className={classes}>
          {childElements}
        </ElementType>
      );
    }

    return (
      <ElementType {...rest} className={classes}>
        {createHTMLInput(input || type, {
          defaultProps: htmlInputProps,
          autoGenerateKey: false,
        })}
        {Icon.create(this.computeIcon(), { autoGenerateKey: false })}
      </ElementType>
    );
  }
}

export default Input;
