import css from '../css/ripple.css';
import './polyfill';

const Ripple = function () {

  let module = {};
  let handlerShow;
  let isInit = false;

  function createRipple(target) {

    const rippleEl = Object.assign(document.createElement('span'), {
      'className': 'ripple',
    });
    target.appendChild(rippleEl);

    // remove exist events
    target.removeEventListener('mouseleave', hideRipple);
    target.removeEventListener('mouseup', hideRipple);
    target.removeEventListener('dragend', hideRipple);
    // and add again
    target.addEventListener('mouseleave', hideRipple);
    target.addEventListener('mouseup', hideRipple);
    target.addEventListener('dragend', hideRipple);

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
    const halfSize = dimmension / 2;

    const ripple = createRipple(target);
    let styles = `
      top: ${isCenter ? '50%' : (posY - halfSize) + 'px'};
      left: ${isCenter ? '50%' : (posX - halfSize) + 'px'};
      width: ${dimmension}px;
      height: ${dimmension}px;
      background-color: ${bgColor};
    `;
    if (isCenter) {
      styles += `
        margin-top: ${-halfSize}px;
        margin-left: ${-halfSize}px;
      `;
    }
    ripple.setAttribute('style', styles);

    setTimeout(() => {
      ripple.style.cssText += `transform: scale(2); opacity: 0.5`;
    }, 10);
  }

  function hideRipple(evt) {

    const el = this;
    if (!el) return;

    let ripple = null;

    const ripples = el.getElementsByClassName('ripple');
    if (ripples.length > 0) {
      ripple = ripples[ripples.length - 1]
    } else {
      return false;
    }

    const computedDuration = getComputedStyle(ripple)['transition-duration'];
    const delayDuration = parseFloat(computedDuration) * 1000;

    setTimeout(() => {
      ripple.style.opacity = 0;

      setTimeout(() => {
        try {
          el.removeChild(ripple);
        } catch(e) {
          return false;
        }
        if (ripples.length < 1) el.style.position = '';

      }, delayDuration)

    }, 0);
  }

  module.init = function (selector) {
    if (isInit) return;

    if (typeof selector !== 'string') {
      throw new Error('Selector must be a string');
    }

    handlerShow = showRipple.bind(null, selector);
    document.body.addEventListener('mousedown', handlerShow);
    isInit = true;
  };

  module.destroy = function () {
    if (!isInit) return;
    document.body.removeEventListener('mousedown', handlerShow);
    handlerShow = null;
    isInit = false;
  }

  return module;
}();

export default Ripple;
