/**
 *
 * Radio
 * A Radio is sugar for <Checkbox radio />.
 * Useful for exclusive groups of toggles.
 *
 */

import React from 'react';
import { getUnhandledProps } from '../lib';
import Checkbox from '../Checkbox';

const Radio = props => {
  const { toggle, type } = props;
  const rest = getUnhandledProps(Radio, props);

  const radio = !toggle || undefined;

  return <Checkbox {...rest} type={type} radio={radio} toggle={toggle} />;
};

Radio.propTypes = {
  /** Format to show an on or off choice. */
  toggle: Checkbox.propTypes.toggle,

  /** HTML input type, either checkbox or radio. */
  type: Checkbox.propTypes.type,
};

Radio.defaultProps = {
  type: 'radio',
};

export default Radio;
