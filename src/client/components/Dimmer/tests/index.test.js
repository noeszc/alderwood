import React from 'react';
import { shallow, mount } from 'enzyme';

import DimmerInner from 'client/components/Dimmer/DimmerInner';
import Portal from 'client/components/Portal';
import Dimmer from '../index';

describe('<Dimmer />', () => {
  describe('children', () => {
    it('renders a Inner', () => {
      expect(shallow(<Dimmer />).type()).toEqual(DimmerInner);
    });
  });

  describe('page', () => {
    beforeEach(() => {
      document.body.classList.remove('dimmed', 'dimmed--dimmable');
    });

    it('when true, Portal is opened', () => {
      const dimmer = mount(<Dimmer page active />);
      const classes = document.body.classList;

      expect(dimmer.find(Portal).prop('open')).toBe(true);

      expect(classes.contains('dimmed')).toBe(true);
      expect(classes.contains('dimmed--dimmable')).toBe(true);
    });

    it('when false, Portal is closed', () => {
      const dimmer = mount(<Dimmer page active={false} />);
      const classes = document.body.classList;

      expect(dimmer.find(Portal).prop('open')).toBe(false);

      expect(classes.contains('dimmed')).toBe(false);
      expect(classes.contains('dimmed--dimmable')).toBe(false);
    });

    it('when changed to false, dimmer classes are removed from body', () => {
      const dimmer = mount(<Dimmer page active />);
      const classes = document.body.classList;

      dimmer.setProps({ active: false });

      expect(classes.contains('dimmed')).toBe(false);
      expect(classes.contains('dimmed--dimmable')).toBe(false);
    });
  });
});
