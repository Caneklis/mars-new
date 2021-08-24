(() => {
  const menu = document.querySelector(".main-nav");
  const menuButton = document.querySelector(".main-nav__toggle");
  const menuList = document.querySelector(".main-nav__sublist");
  const body = document.querySelector(".page");

  if (menuButton) {
    menuButton.addEventListener("click", () => {
      let expanded = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", !expanded);
      menuButton.classList.toggle("main-nav__toggle--open");
      menu.classList.toggle("main-nav--open");
      body.classList.toggle("page__body--noovefflow");
    });
  }
})();

const modalTriggers = document.querySelectorAll(".popup-trigger");
const modalCloseTrigger = document.querySelector(".modal__close");
const bodyBlackout = document.querySelector(".body-blackout");

modalTriggers.forEach((trigger) => {
  trigger.addEventListener("click", (e) => {
    e.preventDefault();
    const { popupTrigger } = trigger.dataset;
    const popupModal = document.querySelector(
      `[data-popup-modal="${popupTrigger}"]`
    );

    popupModal.classList.add("modal--visible");
    bodyBlackout.classList.add("body-blackout--blacked-out");

    popupModal.querySelector(".modal__close").addEventListener("click", () => {
      popupModal.classList.remove("modal--visible");
      bodyBlackout.classList.remove("body-blackout--blacked-out");
    });

    bodyBlackout.addEventListener("click", () => {
      // TODO: Turn into a function to close modal
      popupModal.classList.remove("modal--visible");
      bodyBlackout.classList.remove("body-blackout--blacked-out");
    });
  });
});

$(".main-slider__slider").slick({
  autoplay: false,
  speed: 300,
  fade: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  pauseOnHover: false,
  dots: false,
  infinite: true,
  pauseOnDotsHover: true,
  cssEase: "ease",
  // fade:true,
  draggable: false,
  variableWidth: false,
  prevArrow:
    '<button class="main-slider__slider-arrow  main-slider__slider-arrow--prev"><img src="/img/icons/main-slider__arrow-left.svg"></button>',
  nextArrow:
    '<button class="main-slider__slider-arrow  main-slider__slider-arrow--next"><img src="/img/icons/main-slider__arrow-right.svg"></button>',
});

$(".news-page__slider, .coach__photo-slider, .story__slider").slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  dots: true,
  arrows: true,
  infinite: true,
  variableWidth: false,
  lazyLoad: "ondemand",
  infinite: false,
});

$(".gallery-slider").slick({
  dots: true,
  infinite: true,
  speed: 300,
  slidesToShow: 1,
  slidesToScroll: 1,
  centerPadding: "40px",
  variableWidth: true,
  centerMode: true,
  arrows: true,
  lazyLoad: "ondemand",
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        variableWidth: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
      },
    },
    {
      breakpoint: 759,
      settings: {
        variableWidth: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        arrows: false,
      },
    },
  ],
});

const table = document.querySelectorAll(".textpage__article table");

if (table) {
  function wrap(top, selector, bottom) {
    var matches = document.querySelectorAll(selector);
    for (var i = 0; i < matches.length; i++) {
      var modified = top + matches[i].outerHTML + bottom;
      matches[i].outerHTML = modified;
    }
  }

  wrap("<div class='table-responsive'>", ".textpage__article table", "</div>");
}

//$('.textpage__article table').wrap('<div class="table-responsive"></div>');

// $(window).resize(function () {
//   $(".news-page__slider").slick("resize");
// });

// $(window).on("orientationchange", function () {
//   $(".news-page__slider").slick("resize");
// });

// $(window).resize(function () {
//   $(".news-page__slider")[0].slick.refresh();
// });

AOS.init({
  // Global settings:
  disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
  startEvent: "DOMContentLoaded", // name of the event dispatched on the document, that AOS should initialize on
  initClassName: "aos-init", // class applied after initialization
  animatedClassName: "aos-animate", // class applied on animation
  useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
  disableMutationObserver: false, // disables automatic mutations' detections (advanced)
  debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
  throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 120, // offset (in px) from the original trigger point
  delay: 100, // values from 0 to 3000, with step 50ms
  duration: 400, // values from 0 to 3000, with step 50ms
  easing: "ease", // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: "top-bottom", // defines which position of the element regarding to window should trigger the animation
});

// In this example, we must bind a 'change' event handler to
// our checkboxes, then interact with the mixer via
// its .filter() API methods.

var containerEl = document.querySelector(".news-page__news-list");
if (containerEl) {
  var checkboxGroup = document.querySelector(".news-page__filter-list");
  var checkboxes = checkboxGroup.querySelectorAll('input[type="checkbox"]');

  var mixer = mixitup(containerEl);

  checkboxGroup.addEventListener("change", function () {
    var selectors = [];

    // Iterate through all checkboxes, pushing the
    // values of those that are checked into an array

    for (var i = 0; i < checkboxes.length; i++) {
      var checkbox = checkboxes[i];

      if (checkbox.checked) selectors.push(checkbox.value);
    }

    // If there are values in the array, join it into a string
    // using your desired logic, and send to the mixer's .filter()
    // method, otherwise filter by 'all'

    var selectorString =
      selectors.length > 0
        ? selectors.join(",") // or '.' for AND logic
        : "all";

    mixer.filter(selectorString);
  });
}
