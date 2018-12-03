/**
 *
 * Button
 * A Button indicates a possible user action.
 */

import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import cx from 'bem-classnames';

import {
  getUnhandledProps,
  getElementType,
  customPropTypes,
  createShorthandFactory,
} from 'client/components/lib';

import './Button.scss';

/* eslint-disable react/prefer-stateless-function */
class Button extends React.Component {
  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** A button can show it is currently the active user selection. */
    active: PropTypes.bool,

    /** Additional classes. */
    className: PropTypes.string,

    /** A button can show it is currently unable to be interacted with. */
    disabled: PropTypes.bool,

    /** A button can show a loading indicator. */
    loading: PropTypes.bool,

    /** A button can take the width of its container. */
    fluid: PropTypes.bool,

    /**
     * Called after user's click.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onClick: PropTypes.func,

    /** Add an Icon by name, props object, or pass an <Icon />. */
    icon: customPropTypes.some([
      PropTypes.bool,
      PropTypes.string,
      PropTypes.object,
      PropTypes.element,
    ]),

    /** The role of the HTML element. */
    role: PropTypes.string,

    /** A button can receive focus. */
    tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  };

  static defaultProps = {
    as: 'button',
    role: 'button',
  };

  computeTabIndex = ElementType => {
    const { disabled, tabIndex } = this.props;

    if (!_.isNil(tabIndex)) return tabIndex;
    if (disabled) return -1;
    if (ElementType === 'div') return 0;
  };

  focus = () => _.invoke(this.ref, 'focus');

  handleRef = c => {
    this.ref = c;
  };

  handleClick = e => {
    const { disabled } = this.props;

    if (disabled) {
      e.preventDefault();
      return;
    }

    _.invoke(this.props, 'onClick', e, this.props);
  };

  render() {
    const { className, disabled, role } = this.props;
    const classes = cx(
      {
        name: 'button',
        modifiers: ['loading', 'active', 'disabled', 'fluid'],
      },
      this.props,
      className,
    );

    const rest = getUnhandledProps(Button, this.props);
    const ElementType = getElementType(Button, this.props);
    const tabIndex = this.computeTabIndex(ElementType);

    return (
      <ElementType
        {...rest}
        className={classes}
        disabled={(disabled && ElementType === 'button') || undefined}
        onClick={this.handleClick}
        ref={this.handleRef}
        role={role}
        tabIndex={tabIndex}
      />
    );
  }
}

Button.create = createShorthandFactory(Button, value => ({ content: value }));

export default Button;
