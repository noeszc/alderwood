import React from 'react';
import { shallow } from 'enzyme';
import DimmerDimmable from 'client/components/Dimmer/DimmerDimmable';

describe('<Dimmable />', () => {
  it('should have a className attribute', () => {
    const renderedComponent = shallow(<DimmerDimmable />);
    expect(renderedComponent.prop('className')).toBeDefined();
  });
});
