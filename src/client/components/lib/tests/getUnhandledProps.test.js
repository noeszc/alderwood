import React from 'react';
import { shallow } from 'enzyme';
import getUnhandledProps from '../getUnhandledProps';

// We spread the unhandled props onto the rendered result.
// Then, we can test the props of the rendered result.
// This is the intended usage of the util.
function TestComponent(props) {
  return <div {...getUnhandledProps(TestComponent, props)} />;
}

describe('getUnhandledProps', () => {
  it('removes the proprietary childKey prop', () => {
    expect(
      shallow(<TestComponent childKey={1} />).prop('childKey'),
    ).toBeUndefined();
  });

  it('leaves props that are not defined in handledProps', () => {
    expect(
      shallow(<TestComponent data-leave-this="it is unhandled" />).prop(
        'data-leave-this',
      ),
    ).toBe('it is unhandled');
  });

  it('removes props defined in handledProps', () => {
    TestComponent.handledProps = ['data-remove-me'];
    expect(
      shallow(<TestComponent data-remove-me="it is handled" />).prop(
        'data-remove-me',
        'thanks',
      ),
    ).toBeUndefined();
  });
});
