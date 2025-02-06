/**
* Template Name: Personal - v4.10.0
* Template URL: https://bootstrapmade.com/personal-free-resume-bootstrap-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)

    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Scrolls to an element with smooth behavior
   */
  const scrollto = (el) => {
    const element = select(el);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    const navbar = select('#navbar');
    if (navbar) {
      navbar.classList.toggle('navbar-mobile');
      this.classList.toggle('bi-list');
      this.classList.toggle('bi-x');
    }
  });

  /**
   * Scroll with offset on links with .scrollto class
   */
  on('click', '#navbar .nav-link', function(e) {
    if (this.hash) {
      e.preventDefault();
      const section = select(this.hash);
      
      if (section) {
        let navbar = select('#navbar');
        let navlinks = select('#navbar .nav-link', true);
        navlinks.forEach((item) => item.classList.remove('active'));

        this.classList.add('active');

        if (navbar.classList.contains('navbar-mobile')) {
          navbar.classList.remove('navbar-mobile');
          let navbarToggle = select('.mobile-nav-toggle');
          navbarToggle.classList.toggle('bi-list');
          navbarToggle.classList.toggle('bi-x');
        }

        scrollto(this.hash);

        if (history.pushState) {
          history.pushState(null, null, this.hash);
        } else {
          window.location.hash = this.hash;
        }
      }
    }
  }, true);

  /**
   * Activate/show sections on load with hash links
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      let initial_nav = select(window.location.hash);

      if (initial_nav) {
        let navlinks = select('#navbar .nav-link', true);
        navlinks.forEach((item) => {
          item.classList.toggle('active', item.getAttribute('href') === window.location.hash);
        });

        scrollto(window.location.hash);
      }
    }
  });

  /**
   * Skills animation
   */
  let skillsContent = select('.skills-content');
  if (skillsContent) {
    new Waypoint({
      element: skillsContent,
      offset: '80%',
      handler: function() {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => el.style.width = el.getAttribute('aria-valuenow') + '%');
      }
    });
  }

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: { slidesPerView: 1, spaceBetween: 20 },
      1200: { slidesPerView: 3, spaceBetween: 20 }
    }
  });

  /**
   * Portfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);
      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach((el) => el.classList.remove('filter-active'));
        this.classList.add('filter-active');

        portfolioIsotope.arrange({ filter: this.getAttribute('data-filter') });
      }, true);
    }
  });

  /**
   * Initiate portfolio lightbox
   */
  GLightbox({ selector: '.portfolio-lightbox' });

  /**
   * Initiate portfolio details lightbox
   */
  GLightbox({ selector: '.portfolio-details-lightbox', width: '90%', height: '90vh' });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animated console text
   */
  consoleText(['Alexcitten', 'Aleeexcitten', 'alexcitten', 'Cozy Coder', 'Alex', 'SmoothDev', 'Alexcitttten', 'Developer', 'Smoothie Lover', 'Effortless Code', 'LET ME CODE!', 'Mitski Enjoyer', 'Photographer'], 'text');

  function consoleText(words, id, colors = ['#fff']) {
    let visible = true;
    let letterCount = 1;
    let x = 1;
    let waiting = false;
    let target = document.getElementById(id);
    target.style.color = colors[0];

    setInterval(() => {
      if (!waiting) {
        target.innerHTML = words[0].substring(0, letterCount);
        letterCount += x;
      }
    }, 120);

    setInterval(() => {
      document.getElementById('console').classList.toggle('hidden');
      visible = !visible;
    }, 400);
  }

  /**
   * Matrix effect
   */
  const state = { fps: 60, color: "#2f2", charset: "01" };
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  let w, h, p;
  const resize = () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    p = Array(Math.ceil(w / 10)).fill(0);
  };
  window.addEventListener("resize", resize);
  resize();

  const random = (items) => items[Math.floor(Math.random() * items.length)];
  const draw = () => {
    ctx.fillStyle = "rgba(0,0,0,.05)";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = state.color;

    for (let i = 0; i < p.length; i++) {
      let v = p[i];
      ctx.fillText(random(state.charset), i * 10, v);
      p[i] = v >= h || v >= 10000 * Math.random() ? 0 : v + 10;
    }
  };
  setInterval(draw, 1000 / state.fps);
})();

document.addEventListener('DOMContentLoaded', () => {
  function updateTime() {
    const options = { timeZone: 'Europe/Helsinki', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const now = new Date().toLocaleTimeString('en-US', options);
    const timeElement = document.getElementById('currentTime');

    if (timeElement) timeElement.innerHTML = now;
  }
  setInterval(updateTime, 1000);
  updateTime();
});
