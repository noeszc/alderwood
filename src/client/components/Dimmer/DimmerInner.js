/**
 *
 * Inner
 *
 */
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'bem-classnames';

import {
  childrenUtils,
  customPropTypes,
  doesNodeContainClick,
  getUnhandledProps,
  getElementType,
} from 'client/components/lib';
import { BEM } from '../lib/classNameBuilders';

/* eslint-disable react/prefer-stateless-function */
class DimmerInner extends React.Component {
  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** An active dimmer will dim its parent container. */
    active: PropTypes.bool,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /** A disabled dimmer cannot be activated */
    disabled: PropTypes.bool,

    /**
     * Called on click.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onClick: PropTypes.func,

    /**
     * Handles click outside Dimmer's content, but inside Dimmer area.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onClickOutside: PropTypes.func,

    /** A dimmer can be formatted to be fixed to the page. */
    page: PropTypes.bool,

    /** A dimmer can have its content top or bottom aligned. */
    verticalAlign: PropTypes.oneOf(['bottom', 'top']),
  };

  componentWillReceiveProps({ active: nextActive }) {
    const { active: prevActive } = this.props;

    if (prevActive !== nextActive) this.toggleStyles(nextActive);
  }

  componentDidMount() {
    const { active } = this.props;

    this.toggleStyles(active);
  }

  handleClick = e => {
    _.invoke(this.props, 'onClick', e, this.props);

    if (
      this.contentRef &&
      (this.contentRef !== e.target && doesNodeContainClick(this.contentRef, e))
    ) {
      return;
    }
    _.invoke(this.props, 'onClickOutside', e, this.props);
  };

  handleRef = c => {
    this.ref = c;
  };

  handleContentRef = c => {
    this.contentRef = c;
  };

  toggleStyles(active) {
    if (!this.ref) return;

    if (active) {
      this.ref.style.setProperty('display', 'flex', 'important');
      return;
    }

    this.ref.style.removeProperty('display');
  }

  render() {
    const { children, content, className, verticalAlign } = this.props;
    const childrenContent = childrenUtils.isNil(children) ? content : children;

    const classes = cx(
      {
        name: 'dimmer',
        modifiers: ['page', 'active'],
      },
      this.props,
      BEM.useVerticalAlignProp('dimmer', verticalAlign),
      className,
    );

    const rest = getUnhandledProps(DimmerInner, this.props);
    const ElementType = getElementType(DimmerInner, this.props);

    return (
      <ElementType
        {...rest}
        className={classes}
        onClick={this.handleClick}
        ref={this.handleRef}
      >
        {childrenContent && (
          <div className="dimmer__content" ref={this.handleContentRef}>
            {childrenContent}
          </div>
        )}
      </ElementType>
    );
  }
}

export default DimmerInner;
