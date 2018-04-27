import css from '../css/ripple.css';
import './polyfill';

const Ripple = function () {

  let module = {};
  let handlerShow;
  let handlerHide;
  let ripple;
  let isInit = false;

  function createRipple(target) {

    const rippleEl = Object.assign(document.createElement('span'), {
      'className': 'ripple',
    });
    target.appendChild(rippleEl);

    return rippleEl;
  }
  function showRipple(sel, evt) {
    if (evt.which !== 1) return true;

    const target = evt.target.closest(sel);

    if (!target) return;

    const targetPosition = getComputedStyle(target)['position'];
    target.classList.add('ripple-container');
    if (targetPosition !== 'fixed' && targetPosition !== 'absolute') {
      target.style.position = 'relative';
    }


    const bgColor = target.getAttribute('data-ripple-color') || 'rgba(0,0,0, .3)';
    const isCenter = target.hasAttribute('data-ripple-center');

    const { width, height, left, top } = target.getBoundingClientRect();

    let posX = evt.clientX - left,
        posY = evt.clientY - top;

    const dimmension = Math.max(width, height);

    const el = ripple = createRipple(target);

    const halfSize = dimmension / 2;

    el.style.left = isCenter ? '50%' : `${posX - halfSize}px`;
    el.style.top = isCenter ? '50%' : `${posY - halfSize}px`;
    el.style.width = `${dimmension}px`;
    el.style.height = `${dimmension}px`;
    if (isCenter) {
      el.style.marginTop = `${-halfSize}px`;
      el.style.marginLeft = `${-halfSize}px`;
    }
    el.style.backgroundColor = bgColor;

    setTimeout(() => {
      el.style.cssText += `transform: scale(2.5); opacity: 0.5`;
    }, 10);
  }

  function hideRipple(sel, evt) {

    if (evt.type === 'mouseout' && !evt.target.closest(sel)) return true;
    if (evt.type === 'mouseup' && evt.which !== 1) return true;

    if (!ripple) return true;

    const el = ripple;
    ripple = null;
    const target = el.parentNode;
    const ripples = target.getElementsByClassName('ripple');

    el.style.opacity = 0;

    setTimeout(() => {
      target.removeChild(el);
      if (ripples.length < 1) target.style.position = '';
    }, 700);
  }

  module.init = function (selector) {
    if (isInit) return;

    if (typeof selector !== 'string') {
      throw new Error('Selector must be a string');
    }

    handlerShow = showRipple.bind(null, selector);
    handlerHide = hideRipple.bind(null, selector);
    document.body.addEventListener('mousedown', handlerShow);
    document.body.addEventListener('mouseout', handlerHide);
    document.body.addEventListener('mouseup', handlerHide);
    document.body.addEventListener('dragstart', handlerHide);
    isInit = true;
  };

  module.destroy = function () {
    if (!isInit) return;
    document.body.removeEventListener('mousedown', handlerShow);
    document.body.removeEventListener('mouseout', handlerHide);
    document.body.removeEventListener('mouseup', handlerHide);
    document.body.removeEventListener('dragstart', handlerHide);
    handlerShow = null;
    handlerHide = null;
    ripple = null;
    isInit = false;
  }

  return module;
}();

export default Ripple;
