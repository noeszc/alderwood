import React from 'react';
import { shallow } from 'enzyme';

import Dimmer from 'client/components/Dimmer';
import ActivityIndicator from '../index';

describe('<ActivityIndicator />', () => {
  it('should render the Dimmer', () => {
    expect(shallow(<ActivityIndicator active />).find(Dimmer)).toHaveLength(1);
  });
});
