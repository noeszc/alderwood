import React from 'react';
import { shallow, mount } from 'enzyme';

import {
  assertBodyContains,
  assertNodeContains,
} from 'client/components/lib/assertNodeContains';
import domEvent from 'client/components/lib/domEvent';
import assertBodyClasses from 'client/components/lib/assertBodyClasses';

import Portal from 'client/components/Portal';
import Modal from '../index';
// ----------------------------------------
// Wrapper
// ----------------------------------------
let wrapper;

// we need to unmount the modal after every test to remove it from the document
// wrap the render methods to update a global wrapper that is unmounted after each test
const wrapperMount = (...args) => (wrapper = mount(...args));
const wrapperShallow = (...args) => (wrapper = shallow(...args));

describe('<Modal />', () => {
  beforeEach(() => {
    if (wrapper && wrapper.length) wrapper.unmount();
    wrapper = undefined;

    const dimmer = document.querySelector('.dimmer');
    const modal = document.querySelector('.modal');

    if (dimmer) dimmer.parentNode.removeChild(dimmer);
    if (modal) modal.parentNode.removeChild(modal);
  });

  it('renders a Portal', () => {
    expect(wrapperShallow(<Modal open />).type()).toEqual(Portal);
  });

  it('renders to the document body', () => {
    wrapperMount(<Modal open />);
    assertBodyContains('.modal');
  });

  it('renders child text', () => {
    expect(wrapperMount(<Modal open>child text</Modal>).text()).toEqual(
      'child text',
    );
  });

  it('renders child components', () => {
    const child = <div data-child />;
    wrapperMount(<Modal open>{child}</Modal>);

    expect(
      document.querySelector('.modal').querySelector('[data-child]'),
    ).not.toEqual(null, 'Modal did not render the child component.');
  });

  it("spreads the user's style prop on the Modal", () => {
    const style = { marginTop: '1em', top: 0 };

    wrapperMount(<Modal open style={style} />);
    const element = document.querySelector('.modal');

    expect(element.style).toHaveProperty('marginTop', '1em');
    expect(element.style).toHaveProperty('top', '0px');
  });

  describe('actions', () => {
    it('closes the modal on action click', () => {
      wrapperMount(<Modal actions={['OK']} defaultOpen />);

      assertBodyContains('.modal');
      domEvent.click('.modal .modal__actions .button');
      assertBodyContains('.modal', false);
    });

    it('calls shorthand onActionClick callback', () => {
      const onActionClick = jest.fn();
      const modalActions = {
        onActionClick,
        actions: [{ key: 'ok', content: 'OK' }],
      };
      wrapperMount(<Modal actions={modalActions} defaultOpen />);

      expect(onActionClick).not.toHaveBeenCalled();

      domEvent.click('.modal .modal__actions .button');
      expect(onActionClick).toBeCalledTimes(1);
    });
  });

  describe('onActionClick', () => {
    it('is called when an action is clicked', () => {
      const onActionClick = jest.fn();
      const props = { actions: ['OK'], defaultOpen: true, onActionClick };

      wrapperMount(<Modal {...props} />);
      domEvent.click('.modal .modal__actions .button');

      expect(onActionClick).toBeCalledTimes(1);
    });
  });

  describe('open', () => {
    it('is not open by default', () => {
      wrapperMount(<Modal />);
      assertBodyContains('.modal.modal--open', false);
    });

    it('is passed to Portal open', () => {
      expect(
        shallow(<Modal open />)
          .find('Portal')
          .prop('open'),
      ).toBe(true);
      expect(
        shallow(<Modal open={false} />)
          .find('Portal')
          .prop('open'),
      ).toBe(false);
    });

    it('is not passed to Modal', () => {
      expect(
        shallow(<Modal open />)
          .find('Portal')
          .children(),
      ).not.toHaveProperty('open');

      expect(
        shallow(<Modal open={false} />)
          .find('Portal')
          .children(),
      ).not.toHaveProperty('open');
    });

    it('does not show the modal when false', () => {
      wrapperMount(<Modal open={false} />);
      assertBodyContains('.modal', false);
    });

    it('does not show the dimmer when false', () => {
      wrapperMount(<Modal open={false} />);
      assertBodyContains('.dimmer', false);
    });

    it('shows the dimmer when true', () => {
      wrapperMount(<Modal open dimmer />);
      assertBodyContains('.dimmer');
    });

    it('shows the modal when true', () => {
      wrapperMount(<Modal open />);
      assertBodyContains('.modal');
    });

    it('shows the modal and dimmer on changing from false to true', () => {
      wrapperMount(<Modal open={false} />);
      assertBodyContains('.modal', false);
      assertBodyContains('.dimmer', false);

      wrapper.setProps({ open: true });

      assertBodyContains('.modal');
      assertBodyContains('.dimmer');
    });

    it('hides the modal and dimmer on changing from true to false', () => {
      wrapperMount(<Modal open />);
      assertBodyContains('.modal');
      assertBodyContains('.dimmer');

      wrapper.setProps({ open: false });

      assertBodyContains('.modal', false);
      assertBodyContains('.dimmer', false);
    });
  });

  describe('basic', () => {
    it('adds basic to the modal className', () => {
      wrapperMount(<Modal basic open />);
      assertBodyContains('.modal.modal--basic');
    });
  });

  describe('size', () => {
    const sizes = ['fullscreen', 'large', 'mini', 'small', 'tiny'];

    sizes.forEach(size => {
      it(`adds the "${size}" to the modal className`, () => {
        wrapperMount(<Modal size={size} open />);
        assertBodyContains(`.modal.modal--${size}`);
      });
    });
  });

  describe('dimmer', () => {
    describe('defaults', () => {
      it('is set to true by default', () => {
        expect(Modal.defaultProps.dimmer).toEqual(true);
      });

      it('is present by default', () => {
        wrapperMount(<Modal open />);
        assertBodyContains('.dimmer');
      });
    });

    describe('true', () => {
      it('adds/removes body classes "dimmed dimmed--dimmable" on mount/unmount', () => {
        assertBodyClasses('dimmed dimmed--dimmable', false);

        wrapperMount(<Modal open dimmer />);
        assertBodyClasses('dimmed dimmed--dimmable');

        wrapper.unmount();
        assertBodyClasses('dimmed dimmed--dimmable', false);
      });
    });
  });

  describe('onOpen', () => {
    it('is called on trigger click', () => {
      const spy = jest.fn();
      wrapperMount(<Modal onOpen={spy} trigger={<div id="trigger" />} />);

      wrapper.find('#trigger').simulate('click');
      expect(spy).toBeCalledTimes(1);
    });

    it('is not called on body click', () => {
      const spy = jest.fn();
      wrapperMount(<Modal onOpen={spy} />);

      domEvent.click(document.body);

      expect(spy).not.toBeCalled();
    });
  });

  describe('onClose', () => {
    let spy;

    beforeEach(() => {
      spy = jest.fn();
    });

    it('is called on dimmer click', () => {
      wrapperMount(<Modal onClose={spy} defaultOpen />);

      domEvent.click('.dimmer');
      expect(spy).toBeCalledTimes(1);
    });

    it('is called on click outside of the modal', () => {
      wrapperMount(<Modal onClose={spy} defaultOpen />);

      domEvent.click(document.querySelector('.modal').parentNode);
      expect(spy).toBeCalledTimes(1);
    });

    it('is not called on click inside of the modal', () => {
      wrapperMount(<Modal onClose={spy} defaultOpen />);

      domEvent.click(document.querySelector('.modal'));
      expect(spy).not.toBeCalled();
    });

    it('is not called on body click', () => {
      wrapperMount(<Modal onClose={spy} defaultOpen />);

      domEvent.click(document.body);
      expect(spy).not.toBeCalled();
    });

    it('is called when pressing escape', () => {
      wrapperMount(<Modal onClose={spy} defaultOpen />);

      domEvent.keyDown(document, { key: 'Escape' });
      expect(spy).toBeCalledTimes(1);
    });

    it('is not called when the open prop changes to false', () => {
      wrapperMount(<Modal onClose={spy} defaultOpen />);

      wrapper.setProps({ open: false });
      expect(spy).not.toBeCalled();
    });

    it('is not called when open changes to false programmatically', () => {
      wrapperMount(<Modal onClose={spy} defaultOpen />);

      wrapper.setProps({ open: false });
      expect(spy).not.toBeCalled();
    });

    it('is not called on dimmer click when closeOnDimmerClick is false', () => {
      wrapperMount(
        <Modal onClose={spy} defaultOpen closeOnDimmerClick={false} />,
      );

      domEvent.click('.dimmer');
      expect(spy).not.toBeCalled();
    });

    it('is not called on body click when closeOnDocumentClick is false', () => {
      wrapperMount(
        <Modal onClose={spy} defaultOpen closeOnDocumentClick={false} />,
      );

      domEvent.click(document.body);
      expect(spy).not.toBeCalled();
    });
  });

  describe('closeOnEscape', () => {
    it('closes the modal when Escape is pressed by default', () => {
      wrapperMount(<Modal defaultOpen closeOnEscape />);

      assertBodyContains('.dimmer');
      domEvent.keyDown(document, { key: 'Escape' });
      assertBodyContains('.dimmer', false);
    });

    it('closes the modal when true and Escape is pressed', () => {
      wrapperMount(<Modal defaultOpen closeOnEscape />);

      assertBodyContains('.dimmer');
      domEvent.keyDown(document, { key: 'Escape' });
      assertBodyContains('.dimmer', false);
    });

    it('does not close the modal when false and Escape is pressed', () => {
      wrapperMount(<Modal defaultOpen closeOnEscape={false} />);

      assertBodyContains('.dimmer');
      domEvent.keyDown(document, { key: 'Escape' });
      assertBodyContains('.dimmer');
    });
  });

  describe('closeOnDocumentClick', () => {
    it('is false by default', () => {
      expect(Modal.defaultProps.closeOnDocumentClick).toBe(false);
    });
    it('closes the modal on document click when true', () => {
      wrapperMount(<Modal defaultOpen closeOnDocumentClick />);

      assertBodyContains('.dimmer');
      domEvent.click(document.body);
      assertBodyContains('.dimmer', false);
    });
    it('does not close the modal on document click when false', () => {
      wrapperMount(<Modal defaultOpen closeOnDocumentClick={false} />);

      assertBodyContains('.dimmer');
      domEvent.click(document.body);
      assertBodyContains('.dimmer');
    });
  });

  describe('mountNode', () => {
    it('render modal within mountNode', () => {
      const mountNode = document.createElement('div');
      document.body.appendChild(mountNode);

      wrapperMount(
        <Modal mountNode={mountNode} open>
          foo
        </Modal>,
      );
      assertNodeContains(mountNode, '.modal');
    });
  });

  describe('closeIcon', () => {
    it('is not present by default', () => {
      wrapperMount(<Modal open>foo</Modal>);
      assertBodyContains('.modal .icon', false);
    });

    it('defaults to `close` when boolean', () => {
      wrapperMount(
        <Modal open closeIcon>
          foo
        </Modal>,
      );
      assertBodyContains('.modal .modal__close');
    });

    it('is present when passed', () => {
      wrapperMount(
        <Modal open closeIcon="bullseye">
          foo
        </Modal>,
      );
      assertBodyContains('.modal .icon.fa-bullseye');
    });

    it('triggers onClose when clicked', () => {
      const spy = jest.fn();

      wrapperMount(
        <Modal onClose={spy} open closeIcon="bullseye">
          foo
        </Modal>,
      );
      domEvent.click('.modal .icon.fa-bullseye');
      expect(spy).toBeCalledTimes(1);
    });
  });

  describe('scrolling', () => {
    const innerHeight = window.innerHeight;

    afterEach(() => {
      document.body.classList.remove('dimmed--scrolling');
    });

    afterAll(() => {
      window.innerHeight = innerHeight;
    });

    it('does not add the dimmed--scrolling class to the body by default', () => {
      wrapperMount(<Modal open />);
      assertBodyClasses('dimmed--scrolling', false);
    });

    it('does not add the dimmed--scrolling class to the body when equal to the window height', done => {
      wrapperMount(
        <Modal open style={{ height: window.innerHeight }}>
          foo
        </Modal>,
      );

      requestAnimationFrame(() => {
        assertBodyClasses('scrolling', false);
        done();
      });
    });
  });
});
