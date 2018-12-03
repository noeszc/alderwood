import React from 'react';
import { shallow } from 'enzyme';

import Checkbox from 'client/components/Checkbox';
import Radio from '../index';

describe('<Radio />', () => {
  it('renders a radio Checkbox', () => {
    const wrapper = shallow(<Radio />);
    expect(wrapper.type()).toEqual(Checkbox);

    expect(wrapper.props()).toHaveProperty('radio', true);
  });
  it('is not a radio when toggle', () => {
    expect(shallow(<Radio toggle />).prop('radio')).toBeUndefined();
  });
});
