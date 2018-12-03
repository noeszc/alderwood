import React from 'react';
import { shallow, mount } from 'enzyme';

import { isBrowser } from 'client/components/lib';
import domEvent from 'client/components/lib/domEvent';
import Responsive from '../index';

describe('<Responsive />', () => {
  beforeEach(() => {
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => cb());
  });

  afterEach(() => {
    window.requestAnimationFrame.mockRestore();
  });
  describe('fireOnMount', () => {
    it('do not fire onUpdate by default', () => {
      const onUpdate = jest.fn();
      mount(<Responsive onUpdate={onUpdate} />);

      expect(onUpdate).not.toBeCalled();
    });

    it('fires onUpdate after mount when true', () => {
      const onUpdate = jest.fn();
      mount(<Responsive fireOnMount onUpdate={onUpdate} />);

      expect(onUpdate).toBeCalledTimes(1);
    });
  });

  describe('getWidth', () => {
    it('defaults to window.innerWidth when is browser', () => {
      const { getWidth } = mount(<Responsive />).instance().props;
      // 1024 is the default width for innerWidth
      expect(getWidth()).toEqual(1024);
    });

    it('defaults to "0" when non-browser', () => {
      isBrowser.override = false;

      const { getWidth } = mount(<Responsive />).instance().props;
      expect(getWidth()).toEqual(0);

      isBrowser.override = null;
    });

    it('allows a custom function that returns a number', () => {
      const getWidth = jest.fn(() => 500);
      mount(<Responsive getWidth={getWidth} />);

      expect(getWidth).toBeCalledTimes(1);
      expect(getWidth.mock.results[0].value).toBe(500);
    });

    it('is called on resize', () => {
      const getWidth = jest.fn();
      mount(<Responsive getWidth={getWidth} />);

      expect(getWidth).toBeCalledTimes(1);
      getWidth.mockClear();

      domEvent.fire(window, 'resize');
      expect(getWidth).toBeCalledTimes(1);
    });
  });

  describe('maxWidth', () => {
    it('renders when fits', () => {
      window.innerWidth = Responsive.onlyMobile.maxWidth;
      expect(
        mount(
          <Responsive {...Responsive.onlyMobile}>Show me!</Responsive>,
        ).getElement(),
      ).toBeDefined();
    });

    it('renders when next maxWidth fits', () => {
      window.innerWidth = Responsive.onlyTablet.maxWidth;

      const wrapper = shallow(<Responsive {...Responsive.onlyMobile} />);
      expect(wrapper.getElement()).toBeNull();

      wrapper.setProps({ ...Responsive.onlyTablet });
      wrapper.update();
      expect(wrapper.getElement()).toBeDefined();
    });

    it('renders when next getWidth makes maxWidth fit', () => {
      window.innerWidth = Responsive.onlyTablet.maxWidth;
      const wrapper = shallow(<Responsive {...Responsive.onlyMobile} />);

      expect(wrapper.getElement()).toBeNull();

      const getWidth = () => Responsive.onlyMobile.maxWidth;

      wrapper.setProps({ getWidth });
      wrapper.update();

      expect(wrapper.getElement()).toBeDefined();
    });

    it('do not render when not fits', () => {
      window.innerWidth = Responsive.onlyTablet.maxWidth;
      expect(
        shallow(
          <Responsive {...Responsive.onlyMobile}>Hide me!</Responsive>,
        ).getElement(),
      ).toBeNull();
    });
  });

  describe('minWidth', () => {
    it('renders when fits', () => {
      window.innerWidth = Responsive.onlyMobile.minWidth;
      expect(
        shallow(
          <Responsive {...Responsive.onlyMobile}>Show me!</Responsive>,
        ).getElement(),
      ).toBeDefined();
    });

    it('renders when next minWidth fits', () => {
      window.innerWidth = Responsive.onlyMobile.minWidth;
      const wrapper = shallow(<Responsive {...Responsive.onlyTablet} />);
      expect(wrapper.getElement()).toBeNull();
      wrapper.setProps({ ...Responsive.onlyMobile });
      wrapper.instance().forceUpdate();
      expect(wrapper.getElement()).toBeDefined();
    });

    it('renders when next getWidth makes minWidth fit', () => {
      window.innerWidth = Responsive.onlyMobile.maxWidth;
      const wrapper = shallow(<Responsive {...Responsive.onlyTablet} />);
      expect(wrapper.getElement()).toBeNull();
      const getWidth = () => Responsive.onlyTablet.minWidth;
      wrapper.setProps({ getWidth });
      wrapper.instance().forceUpdate();
      expect(wrapper.getElement()).toBeDefined();
    });

    it('do not render when not fits', () => {
      window.innerWidth = Responsive.onlyTablet.minWidth;
      expect(
        shallow(
          <Responsive {...Responsive.onlyMobile}>Hide me!</Responsive>,
        ).getElement(),
      ).toBeNull();
    });
  });

  describe('on window.resize', () => {
    it('renders using new width', () => {
      window.innerWidth = Responsive.onlyMobile.minWidth;

      const wrapper = shallow(
        <Responsive {...Responsive.onlyMobile}>Mobile only</Responsive>,
      );

      expect(wrapper.getElement()).toBeDefined();

      window.innerWidth = Responsive.onlyTablet.onlyTablet;
      domEvent.fire(window, 'resize');

      // https://github.com/airbnb/enzyme/issues/622
      wrapper.instance().forceUpdate();
      expect(wrapper.getElement()).toBeNull();
    });
  });

  describe('onUpdate', () => {
    it('is called with (e, data) when window was resized', () => {
      const onUpdate = jest.fn();
      const width = Responsive.onlyTablet.minWidth;
      mount(<Responsive {...Responsive.onlyMobile} onUpdate={onUpdate} />);

      window.innerWidth = width;
      domEvent.fire(window, 'resize');

      expect(onUpdate).toBeCalledTimes(1);
    });
  });
});
