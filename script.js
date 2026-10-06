/* Cedar Airsoft Field — spec mockup. No framework, no build step. */
(function () {
  "use strict";

  var doc = document.documentElement;
  doc.classList.remove("no-js");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- header: condense on scroll, mobile bar ---------- */
  var header = document.querySelector(".site-header");
  var mobileBar = document.querySelector(".mobile-bar");
  var ticking = false;
  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle("is-condensed", y > 24);
    if (mobileBar) mobileBar.classList.toggle("is-shown", y > 320);
    ticking = false;
  }
  window.addEventListener("scroll", function () {
    if (!ticking) { window.requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();

  /* ---------- mobile nav ---------- */
  var toggle = document.querySelector(".nav-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      if (header) doc.style.setProperty("--nav-top", Math.max(0, header.getBoundingClientRect().bottom) + "px");
      var open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && document.body.classList.contains("nav-open")) {
        document.body.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
    document.querySelectorAll(".site-nav a").forEach(function (a) {
      a.addEventListener("click", function () {
        document.body.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- scroll reveals with stagger ---------- */
  document.querySelectorAll("[data-stagger]").forEach(function (group) {
    Array.prototype.forEach.call(group.children, function (child, i) {
      child.classList.add("reveal");
      child.style.setProperty("--i", Math.min(i, 6));
    });
  });
  var reveals = document.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add("is-in"); io.unobserve(entry.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ---------- slow parallax: full-bleed photo bands only ---------- */
  var bands = document.querySelectorAll(".band__img");
  if (bands.length && !reduceMotion) {
    var bandTick = false;
    var moveBands = function () {
      var vh = window.innerHeight;
      bands.forEach(function (img) {
        var r = img.parentElement.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        var progress = (r.top + r.height / 2 - vh / 2) / vh; // -1 .. 1
        img.style.transform = "translate3d(0," + (progress * -8).toFixed(2) + "%,0)";
      });
      bandTick = false;
    };
    window.addEventListener("scroll", function () {
      if (!bandTick) { window.requestAnimationFrame(moveBands); bandTick = true; }
    }, { passive: true });
    moveBands();
  }

  /* ---------- count-up: verified figures only (10 acres) ---------- */
  document.querySelectorAll("[data-count]").forEach(function (el) {
    var target = parseInt(el.getAttribute("data-count"), 10);
    if (reduceMotion || !("IntersectionObserver" in window)) { el.textContent = target; return; }
    el.textContent = "0";
    var cio = new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting) return;
      cio.disconnect();
      var start = null, dur = 1100;
      var step = function (t) {
        if (!start) start = t;
        var p = Math.min((t - start) / dur, 1);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) window.requestAnimationFrame(step);
      };
      window.requestAnimationFrame(step);
    }, { threshold: 0.6 });
    cio.observe(el);
  });

  /* ---------- events: hide past dates, flag the next one ---------- */
  // Event cards carry data-date="YYYY-MM-DD" and data-end="HH:MM". Dates are their
  // published listings; nothing here invents an event.
  var today = new Date();
  var cards = Array.prototype.slice.call(document.querySelectorAll(".event-card[data-date]"));
  var upcoming = cards.filter(function (card) {
    var parts = card.getAttribute("data-date").split("-");
    var end = (card.getAttribute("data-end") || "23:59").split(":");
    var endAt = new Date(+parts[0], +parts[1] - 1, +parts[2], +end[0], +end[1]);
    var past = endAt < today;
    card.classList.toggle("is-past", past);
    return !past;
  });
  if (upcoming.length) {
    var firstDate = upcoming[0].getAttribute("data-date");
    cards.forEach(function (c) { c.classList.toggle("is-next", c.getAttribute("data-date") === firstDate); });
  }
  // hero "next game" fact mirrors the first upcoming card
  var nextSlot = document.querySelector("[data-next-event]");
  if (nextSlot) {
    if (upcoming.length) {
      var n = upcoming[0];
      nextSlot.innerHTML = n.getAttribute("data-summary");
    } else {
      nextSlot.innerHTML = '<span class="ph">[CONFIRM — next event date]</span>';
    }
  }
  document.querySelectorAll("[data-empty-events]").forEach(function (el) {
    el.hidden = upcoming.length > 0;
  });

  /* ---------- shop category filter ---------- */
  var catButtons = document.querySelectorAll(".shop-cats button");
  if (catButtons.length) {
    catButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var cat = btn.getAttribute("data-cat");
        catButtons.forEach(function (b) { b.setAttribute("aria-pressed", b === btn ? "true" : "false"); });
        document.querySelectorAll(".shop-grid [data-cat]").forEach(function (item) {
          item.hidden = !(cat === "all" || item.getAttribute("data-cat") === cat);
        });
      });
    });
  }

  /* ---------- party estimate (published rates only) ---------- */
  var partyForm = document.getElementById("party-form");
  if (partyForm) {
    var dateIn = partyForm.querySelector("[name=date]");
    var countIn = partyForm.querySelector("[name=headcount]");
    var out = {
      day: document.getElementById("est-day"),
      rate: document.getElementById("est-rate"),
      total: document.getElementById("est-total"),
      deposit: document.getElementById("est-deposit"),
      terms: document.getElementById("est-terms")
    };
    var leadNote = document.getElementById("lead-time-note");
    var recalc = function () {
      var n = Math.max(0, parseInt(countIn.value, 10) || 0);
      if (!dateIn.value) {
        out.day.textContent = "Pick a date";
        out.rate.textContent = "$15 weekday / $20 weekend";
        out.total.textContent = "—";
        out.deposit.textContent = "—";
        out.terms.textContent = "Mon–Fri: no money down. Sat–Sun: 50% down when scheduling — non-refundable.";
        if (leadNote) leadNote.hidden = true;
        return;
      }
      var p = dateIn.value.split("-");
      var d = new Date(+p[0], +p[1] - 1, +p[2]);
      var weekend = d.getDay() === 0 || d.getDay() === 6;
      var rate = weekend ? 20 : 15;
      var total = rate * n;
      out.day.textContent = d.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" }) + (weekend ? " · weekend" : " · weekday");
      out.rate.textContent = "$" + rate + " / person";
      out.total.textContent = n ? "$" + total : "—";
      out.deposit.textContent = weekend ? (n ? "$" + (total / 2) + " (50%)" : "50%") : "No money down";
      out.terms.textContent = weekend
        ? "Weekend parties: 50% down when scheduling — non-refundable. Admission only; rentals are extra."
        : "Weekday parties: no money down. Admission only; rentals are extra.";
      if (leadNote) {
        var days = Math.round((d - new Date(today.getFullYear(), today.getMonth(), today.getDate())) / 86400000);
        leadNote.hidden = !(days >= 0 && days < 14);
      }
    };
    dateIn.addEventListener("input", recalc);
    countIn.addEventListener("input", recalc);
    recalc();
  }

  /* ---------- demo forms: nothing is sent from this mockup ---------- */
  document.querySelectorAll("form[data-demo]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var status = form.querySelector(".form__status");
      if (status) {
        status.classList.add("is-shown");
        status.focus();
      }
    });
  });

  /* ---------- rules page: active section in the contents list ---------- */
  var tocLinks = document.querySelectorAll(".toc a");
  if (tocLinks.length && "IntersectionObserver" in window) {
    var map = {};
    tocLinks.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
    var tio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          tocLinks.forEach(function (a) { a.classList.remove("is-active"); });
          var link = map[entry.target.id];
          if (link) link.classList.add("is-active");
        }
      });
    }, { rootMargin: "-30% 0px -60% 0px" });
    Object.keys(map).forEach(function (id) {
      var sec = document.getElementById(id);
      if (sec) tio.observe(sec);
    });
  }

  /* ---------- footer year ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
