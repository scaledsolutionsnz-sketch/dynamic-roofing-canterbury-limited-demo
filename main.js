/* Dynamic Roofing Canterbury Limited — shared interactions */
(function () {
  "use strict";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Intro overlay ---- */
  var intro = document.querySelector(".intro");
  if (intro) {
    var hide = function () { intro.classList.add("done"); };
    if (reduce) { setTimeout(hide, 200); }
    else { window.addEventListener("load", function () { setTimeout(hide, 1500); }); setTimeout(hide, 2600); }
  }

  /* ---- Nav scroll state + mobile toggle ---- */
  var nav = document.querySelector(".nav");
  if (nav) {
    var onScroll = function () { nav.classList.toggle("scrolled", window.scrollY > 40); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    var toggle = nav.querySelector(".nav__toggle");
    if (toggle) {
      toggle.addEventListener("click", function () { nav.classList.toggle("open"); });
      nav.querySelectorAll(".nav__links a").forEach(function (a) {
        a.addEventListener("click", function () { nav.classList.remove("open"); });
      });
    }
  }

  /* ---- Hero rotating slides ---- */
  var slidesWrap = document.querySelector(".hero__slides");
  if (slidesWrap) {
    var slides = [].slice.call(slidesWrap.querySelectorAll(".hero__slide"));
    var dots = [].slice.call(document.querySelectorAll(".hero__dot"));
    var idx = 0;
    var go = function (n) {
      slides[idx].classList.remove("active");
      if (dots[idx]) dots[idx].classList.remove("active");
      idx = (n + slides.length) % slides.length;
      slides[idx].classList.add("active");
      if (dots[idx]) dots[idx].classList.add("active");
    };
    dots.forEach(function (d, i) { d.addEventListener("click", function () { go(i); reset(); }); });
    var timer = null;
    var reset = function () {
      if (timer) clearInterval(timer);
      if (!reduce && slides.length > 1) timer = setInterval(function () { go(idx + 1); }, 6000);
    };
    if (reduce) { slides[0].classList.add("active"); if (dots[0]) dots[0].classList.add("active"); }
    else { reset(); }
  }

  /* ---- Scroll reveal ---- */
  var reveals = [].slice.call(document.querySelectorAll(".reveal"));
  if (reveals.length) {
    if (reduce || !("IntersectionObserver" in window)) {
      reveals.forEach(function (el) { el.classList.add("in"); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });
      reveals.forEach(function (el) { io.observe(el); });
    }
  }

  /* ---- Footer year ---- */
  var yr = document.querySelector("[data-year]");
  if (yr) yr.textContent = new Date().getFullYear();
})();
