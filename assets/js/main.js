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
    el = el.trim();
    return all ? [...document.querySelectorAll(el)] : document.querySelector(el);
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  const smoothScrollTo = (el) => {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile');
    this.classList.toggle('bi-list');
    this.classList.toggle('bi-x');
  });

  /**
   * Activate/show sections on load with hash links
   */
 on('click', '#navbar .nav-link', function(e) {
    let section = select(this.getAttribute('href'));

    if (section) {
      e.preventDefault();

      let navbar = select('#navbar');
      let header = select('#header');
      let sections = select('section', true);
      let navlinks = select('#navbar .nav-link', true);

      navlinks.forEach((item) => item.classList.remove('active'));
      this.classList.add('active');

      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile');
        let navbarToggle = select('.mobile-nav-toggle');
        navbarToggle.classList.toggle('bi-list');
        navbarToggle.classList.toggle('bi-x');
      }

      if (!header.classList.contains('header-top')) {
        header.classList.add('header-top');
        setTimeout(() => {
          sections.forEach(item => item.classList.remove('section-show'));
          section.classList.add('section-show');
        }, 350);
      } else {
        sections.forEach(item => item.classList.remove('section-show'));
        section.classList.add('section-show');
      }

      smoothScrollTo(section);
    }
  }, true);

    window.addEventListener('load', () => {
    let initial_nav = select(window.location.hash);
    if (initial_nav) {
      let header = select('#header');
      let navlinks = select('#navbar .nav-link', true);

      header.classList.add('header-top');

      navlinks.forEach((item) => {
        item.classList.toggle('active', item.getAttribute('href') === window.location.hash);
      });

      setTimeout(() => {
        initial_nav.classList.add('section-show');
      }, 350);

      smoothScrollTo(initial_nav);
    }
  });
  
  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
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
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

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
   * Console text effect
   */
  consoleText(['Alexcitten', 'Aleeexcitten', 'alexcitten', 'Cozy Coder', 'Alex', 'SmoothDev', 'Alexcitttten', 'Developer', 'Smoothie Lover', 'Effortless Code', 'LET ME CODE!', 'Mitski Enjoyer', 'Photographer'], 'text');

  function consoleText(words, id, colors) {
    if (colors === undefined) colors = ['#fff'];
    var visible = true;
    var con = document.getElementById('console');
    var letterCount = 1;
    var x = 1;
    var waiting = false;
    var target = document.getElementById(id)
    target.setAttribute('style', 'color:' + colors[0])
    window.setInterval(function() {

      if (letterCount === 0 && waiting === false) {
        waiting = true;
        target.innerHTML = words[0].substring(0, letterCount)
        window.setTimeout(function() {
          var usedColor = colors.shift();
          colors.push(usedColor);
          var usedWord = words.shift();
          words.push(usedWord);
          x = 1;
          target.setAttribute('style', 'color:' + colors[0])
          letterCount += x;
          waiting = false;
        }, 1000)
      } else if (letterCount === words[0].length + 1 && waiting === false) {
        waiting = true;
        window.setTimeout(function() {
          x = -1;
          letterCount += x;
          waiting = false;
        }, 1000)
      } else if (waiting === false) {
        target.innerHTML = words[0].substring(0, letterCount)
        letterCount += x;
      }
    }, 120)
    window.setInterval(function() {
      if (visible === true) {
        con.className = 'console-underscore hidden'
        visible = false;

      } else {
        con.className = 'console-underscore'

        visible = true;
      }
    }, 400)
  }

  /**
   * Matrix rain effect on canvas
   */
  const state = {
    fps: 60,
    color: "#2f2",
    charset: "01"
  };

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

  let interval = setInterval(draw, 1000 / state.fps);

})();

document.addEventListener('DOMContentLoaded', () => {
  function updateTime() {
      const options = {
          timeZone: 'Europe/Helsinki',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
      };
      const now = new Date().toLocaleTimeString('en-US', options);
      const timeElement = document.getElementById('currentTime');

      if (timeElement) {
          timeElement.textContent = now;
      } else {
          console.error('Element with id "currentTime" not found');
      }
  }

  setInterval(updateTime, 1000);
  updateTime();
});
