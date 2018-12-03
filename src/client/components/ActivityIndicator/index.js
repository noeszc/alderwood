/**
 *
 * ActivityIndicator
 * Displays a circular loading indicator.
 * that covers the entire screen
 * @see Dimmer
 * @see Loader
 */

import React from 'react';
import PropTypes from 'prop-types';
import Dimmer from '../Dimmer';
import Loader from '../Loader';

const ActivityIndicator = ({ active }) => (
  <Dimmer active={active}>
    <Loader />
  </Dimmer>
);

ActivityIndicator.propTypes = {
  active: PropTypes.bool,
};

export default ActivityIndicator;
