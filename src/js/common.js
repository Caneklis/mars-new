import AOS from 'aos';
import { Fancybox } from '@fancyapps/ui';
import Swiper from 'swiper';
import { Navigation, Pagination, EffectFade, Autoplay } from 'swiper/modules';
import mixitup from 'mixitup';

document.addEventListener('DOMContentLoaded', event => {
  (() => {
    const menu = document.querySelector('.main-nav');
    const menuButton = document.querySelector('.main-nav__toggle');
    const menuList = document.querySelector('.main-nav__sublist');
    const body = document.querySelector('.page');

    if (menuButton) {
      menuButton.addEventListener('click', () => {
        let expanded = menuButton.getAttribute('aria-expanded') === 'true';
        menuButton.setAttribute('aria-expanded', !expanded);
        menuButton.classList.toggle('main-nav__toggle--open');
        menu.classList.toggle('main-nav--open');
        body.classList.toggle('page__body--noovefflow');
      });
    }
  })();

  const initSmallSliders = () => {
    const sliders = document.querySelectorAll('.news-page__slider.swiper, .coach__photo-slider.swiper, .story__slider.swiper, .gallery-slider.swiper');

    sliders.forEach(el => {
      const swiper = new Swiper(el, {
        modules: [Navigation, Pagination],
        centeredSlides: true,
        pagination: {
          el: el.querySelector('.swiper__pagination')
        },
        navigation: {
          nextEl: el.querySelector('.swiper__button-next'),
          prevEl: el.querySelector('.swiper__button-prev')
        },
        spaceBetween: 40,
        slidesPerView: 1
      });
    });
  };

  initSmallSliders();

  const modalTriggers = document.querySelectorAll('.popup-trigger');
  const modalCloseTrigger = document.querySelector('.modal__close');
  const bodyBlackout = document.querySelector('.body-blackout');

  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', e => {
      e.preventDefault();
      const { popupTrigger } = trigger.dataset;
      const popupModal = document.querySelector(`[data-popup-modal="${popupTrigger}"]`);

      popupModal.classList.add('modal--visible');
      bodyBlackout.classList.add('body-blackout--blacked-out');

      popupModal.querySelector('.modal__close').addEventListener('click', () => {
        popupModal.classList.remove('modal--visible');
        bodyBlackout.classList.remove('body-blackout--blacked-out');
      });

      bodyBlackout.addEventListener('click', () => {
        popupModal.classList.remove('modal--visible');
        bodyBlackout.classList.remove('body-blackout--blacked-out');
      });
    });
  });

  const mainSlider = new Swiper('.main-slider__slider', {
    modules: [Navigation, EffectFade, Autoplay],
    slidesPerView: 1,
    autoplay: {
      delay: 5000
    },
    loop: true,
    effect: 'fade',
    fadeEffect: { crossFade: true },
    navigation: {
      nextEl: '.main-slider__slider-arrow--next',
      prevEl: '.main-slider__slider-arrow--prev'
    }
  });

  const table = document.querySelectorAll('.textpage__article table');

  if (table) {
    function wrap(top, selector, bottom) {
      var matches = document.querySelectorAll(selector);
      for (var i = 0; i < matches.length; i++) {
        var modified = top + matches[i].outerHTML + bottom;
        matches[i].outerHTML = modified;
      }
    }

    wrap("<div class='table-responsive'>", '.textpage__article table', '</div>');
  }

  AOS.init({
    // Global settings:
    disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
    initClassName: 'aos-init', // class applied after initialization
    animatedClassName: 'aos-animate', // class applied on animation
    useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
    disableMutationObserver: false, // disables automatic mutations' detections (advanced)
    debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
    throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    offset: 120, // offset (in px) from the original trigger point
    delay: 100, // values from 0 to 3000, with step 50ms
    duration: 400, // values from 0 to 3000, with step 50ms
    easing: 'ease', // default easing for AOS animations
    once: false, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
    anchorPlacement: 'top-bottom' // defines which position of the element regarding to window should trigger the animation
  });

  // In this example, we must bind a 'change' event handler to
  // our checkboxes, then interact with the mixer via
  // its .filter() API methods.

  const containerEl = document.querySelector('.news-page__news-list.filter');
  if (containerEl) {
    const checkboxGroup = document.querySelector('.news-page__filter-list');
    const checkboxes = checkboxGroup.querySelectorAll('input[type="checkbox"]');

    const mixer = mixitup(containerEl);

    checkboxGroup.addEventListener('change', function () {
      let selectors = [];

      for (let i = 0; i < checkboxes.length; i++) {
        const checkbox = checkboxes[i];

        if (checkbox.checked) selectors.push(checkbox.value);
      }

      const selectorString =
        selectors.length > 0
          ? selectors.join(',') // or '.' for AND logic
          : 'all';

      mixer.filter(selectorString);
    });
  }

  Fancybox.bind('[data-fancybox]');
});
