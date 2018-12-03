import React from 'react';
import { mount } from 'enzyme';

import domEvent from 'client/components/lib/domEvent';
import Sidebar from '../index';

describe('<Sidebar />', () => {
  describe('componentWillUnmount', () => {
    it('will call "clearTimeout"', () => {
      const clear = jest.spyOn(window, 'clearTimeout');
      const wrapper = mount(<Sidebar />);

      wrapper.setProps({ visible: true });
      expect(clear).toHaveBeenCalledTimes(1);
    });
  });

  describe('onHide', () => {
    it('is called when the "visible" prop changes to "false"', () => {
      const onHide = jest.fn();
      const wrapper = mount(<Sidebar onHide={onHide} visible />);

      wrapper.setProps({ visible: false });
      expect(onHide).toBeCalledTimes(1);
      expect(onHide).toBeCalledWith(
        null,
        expect.objectContaining({ visible: expect.any(Boolean) }),
      );
    });

    it('is called when a click on the document was done', () => {
      const onHide = jest.fn();
      mount(<Sidebar onHide={onHide} visible />);

      expect(onHide).not.toBeCalled();

      domEvent.click(document);

      expect(onHide).toHaveBeenCalledTimes(1);
    });

    it('is called when a click on the document was done only once', () => {
      const onHide = jest.fn();
      const wrapper = mount(<Sidebar onHide={onHide} visible />);

      domEvent.click(document);
      wrapper.setProps({ visible: false });

      expect(onHide).toHaveBeenCalledTimes(1);
    });

    it('is not called when a click was done inside the component', () => {
      const mountNode = document.createElement('div');
      const onHide = jest.fn();

      document.body.appendChild(mountNode);
      const wrapper = mount(
        <Sidebar onHide={onHide} visible>
          <div id="child" />
        </Sidebar>,
        { attachTo: mountNode },
      );

      domEvent.click('div#child');
      expect(onHide).not.toBeCalled();

      wrapper.detach();
      document.body.removeChild(mountNode);
    });
  });

  describe('onHidden', () => {
    it('is called when the "visible" prop was changed to "false"', done => {
      const onHidden = jest.fn();
      const wrapper = mount(
        <Sidebar duration={0} onHidden={onHidden} visible />,
      );

      expect(onHidden).not.toBeCalled();

      wrapper.setProps({ visible: false });

      setTimeout(() => {
        expect(onHidden).toHaveBeenCalledTimes(1);
        expect(onHidden).toBeCalledWith(
          null,
          expect.objectContaining({
            duration: expect.any(Number),
            visible: expect.any(Boolean),
          }),
        );

        done();
      }, 0);
    });
  });

  describe('onShow', () => {
    it('is called when the "visible" prop was changed to "true"', done => {
      const onShow = jest.fn();
      const wrapper = mount(<Sidebar duration={0} onShow={onShow} />);

      expect(onShow).not.toBeCalled();
      wrapper.setProps({ visible: true });

      setTimeout(() => {
        expect(onShow).toHaveBeenCalledTimes(1);
        expect(onShow).toBeCalledWith(
          null,
          expect.objectContaining({
            duration: expect.any(Number),
            visible: expect.any(Boolean),
          }),
        );

        done();
      }, 0);
    });
  });

  describe('onVisible', () => {
    it('is called when the "visible" prop changes to "true"', () => {
      const onVisible = jest.fn();
      const wrapper = mount(<Sidebar onVisible={onVisible} />);

      expect(onVisible).not.toBeCalled();

      wrapper.setProps({ visible: true });

      expect(onVisible).toHaveBeenCalledTimes(1);
      expect(onVisible).toBeCalledWith(
        null,
        expect.objectContaining({
          visible: expect.any(Boolean),
        }),
      );
    });
  });
});
