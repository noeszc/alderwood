/**
 *
 * Header
 *
 */

import React from 'react';
import cx from 'bem-classnames';
import PropTypes from 'prop-types';
import { getElementType, customPropTypes } from '../lib';

import './Header.scss';

/* eslint-disable react/prefer-stateless-function */
class Header extends React.PureComponent {
  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,
    /** Additional classes. */
    className: PropTypes.string,
  };

  static defaultProps = {
    as: 'header',
  };

  render() {
    const { className } = this.props;
    const ElementType = getElementType(Header, this.props);
    const classes = {
      header: { name: 'header' },
      header__inner: { name: 'header__inner' },
      header__left: { name: 'header__left' },
      header__middle: { name: 'header__middle' },
      header__right: { name: 'header__right' },
    };

    return (
      <ElementType
        role="banner"
        className={cx(classes.header, this.props, className)}
      >
        <div className={cx(classes.header__inner, this.props)}>
          <div className={cx(classes.header__left, this.props)}>logo </div>
          <div className={cx(classes.header__middle, this.props)}>nav</div>
          <div className={cx(classes.header__right, this.props)}>user</div>
        </div>
      </ElementType>
    );
  }
}

export default Header;
