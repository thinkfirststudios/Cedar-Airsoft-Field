/* Cedar Airsoft Field — spec mockup. No framework, no build step. */
(function () {
  "use strict";

  var doc = document.documentElement;
  doc.classList.remove("no-js");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

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
    var closeNav = function () {
      document.body.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
    };
    toggle.addEventListener("click", function () {
      if (header) doc.style.setProperty("--nav-top", Math.max(0, header.getBoundingClientRect().bottom) + "px");
      var open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && document.body.classList.contains("nav-open")) { closeNav(); toggle.focus(); }
    });
    document.querySelectorAll(".site-nav a").forEach(function (a) { a.addEventListener("click", closeNav); });
  }

  /* ---------- scroll reveals ---------- */
  document.querySelectorAll("[data-stagger]").forEach(function (group) {
    Array.prototype.forEach.call(group.children, function (child, i) {
      child.classList.add("reveal");
      child.style.setProperty("--i", Math.min(i, 6));
    });
  });
  var revealables = document.querySelectorAll(".reveal, .reveal-wipe, .vscale");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealables.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add("is-in"); io.unobserve(entry.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.1 });
    revealables.forEach(function (el) { io.observe(el); });
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
        var progress = (r.top + r.height / 2 - vh / 2) / vh;
        img.style.transform = "translate3d(0," + (progress * -9).toFixed(2) + "%,0)";
      });
      bandTick = false;
    };
    window.addEventListener("scroll", function () {
      if (!bandTick) { window.requestAnimationFrame(moveBands); bandTick = true; }
    }, { passive: true });
    moveBands();
  }

  /* ---------- reticle follows the pointer over the hero ---------- */
  var hero = document.querySelector(".hero");
  var reticle = document.querySelector(".reticle");
  if (hero && reticle && finePointer && !reduceMotion) {
    var tx = 0, ty = 0, cx = 0, cy = 0, running = false;
    var follow = function () {
      cx += (tx - cx) * 0.16;
      cy += (ty - cy) * 0.16;
      reticle.style.transform = "translate3d(" + cx.toFixed(1) + "px," + cy.toFixed(1) + "px,0)";
      if (Math.abs(tx - cx) > 0.3 || Math.abs(ty - cy) > 0.3) window.requestAnimationFrame(follow);
      else running = false;
    };
    hero.addEventListener("pointermove", function (e) {
      var r = hero.getBoundingClientRect();
      tx = e.clientX - r.left; ty = e.clientY - r.top;
      var overUi = e.target.closest("a, button, .clock");
      reticle.classList.toggle("is-on", !overUi);
      if (!running) { running = true; window.requestAnimationFrame(follow); }
    });
    hero.addEventListener("pointerleave", function () { reticle.classList.remove("is-on"); });
  }

  /* ---------- loading screen: first visit to home, once per session ---------- */
  // html.show-loader is set by the inline script in <head>, so there is no flash.
  var loader = document.querySelector(".loader");
  if (loader && doc.classList.contains("show-loader")) {
    var finished = false;
    var finish = function () {
      if (finished) return;
      finished = true;
      loader.classList.add("is-done");
      window.setTimeout(function () { doc.classList.remove("show-loader"); }, 450);
    };
    loader.addEventListener("click", finish);
    document.addEventListener("keydown", finish, { once: true });
    window.setTimeout(finish, 1300);
  }

  /* ---------- compass strip: heading follows the pointer ---------- */
  var compass = document.querySelector(".compass");
  if (compass) {
    var strip = compass.querySelector(".compass__strip");
    var win = compass.querySelector(".compass__window");
    var marker = compass.querySelector(".compass__marker");
    var readout = compass.querySelector(".compass__read");
    var names = { 0: "N", 45: "NE", 90: "E", 135: "SE", 180: "S", 225: "SW", 270: "W", 315: "NW" };
    var html = "";
    for (var deg = -360; deg <= 720; deg += 15) {
      var d = ((deg % 360) + 360) % 360;
      html += names[d] !== undefined ? '<span class="major"><b>' + names[d] + "</b></span>" : "<span><b>" + d + "</b></span>";
    }
    strip.innerHTML = html;
    var PX = 2;               // 30px per 15 degrees
    var FIELD_BEARING = 40;   // where the waypoint diamond sits on the strip (decorative)
    var heading = 20, target = 20, spinning = false;
    var cardinal = function (h) { var k = Math.round(h / 45) * 45 % 360; return names[k]; };
    var draw = function () {
      heading += (target - heading) * 0.12;
      var w = win.clientWidth;
      strip.style.transform = "translate3d(" + (w / 2 - ((heading + 360) * PX + 15)).toFixed(1) + "px,0,0)";
      if (marker) marker.style.left = (w / 2 + (FIELD_BEARING - heading) * PX) + "px";
      var hh = ((Math.round(heading) % 360) + 360) % 360;
      if (readout) readout.textContent = ("00" + hh).slice(-3) + "\u00B0  " + cardinal(hh);
      if (Math.abs(target - heading) > 0.05 && !reduceMotion) window.requestAnimationFrame(draw);
      else spinning = false;
    };
    draw();
    var heroEl = document.querySelector(".hero");
    if (heroEl && !reduceMotion) {
      heroEl.addEventListener("pointermove", function (e) {
        var r = heroEl.getBoundingClientRect();
        target = 20 + ((e.clientX - r.left) / r.width - 0.5) * 90;
        if (!spinning) { spinning = true; window.requestAnimationFrame(draw); }
      });
      window.addEventListener("scroll", function () {
        target = 20 + Math.min(window.scrollY, 900) / 10;
        if (!spinning) { spinning = true; window.requestAnimationFrame(draw); }
      }, { passive: true });
    }
  }

  /* ---------- Q / E switch pages, like menu tabs ---------- */
  var tabs = Array.prototype.slice.call(document.querySelectorAll(".site-nav li a"));
  if (tabs.length) {
    var current = tabs.findIndex(function (a) { return a.getAttribute("aria-current") === "page"; });
    document.addEventListener("keydown", function (e) {
      if (e.ctrlKey || e.metaKey || e.altKey || e.repeat) return;
      var t = e.target;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
      var k = (e.key || "").toLowerCase();
      if (k !== "q" && k !== "e") return;
      var base = current < 0 ? 0 : current;
      var next = k === "e" ? (base + 1) % tabs.length : (base - 1 + tabs.length) % tabs.length;
      if (current < 0 && k === "e") next = 0;
      window.location.href = tabs[next].getAttribute("href");
    });
  }

  /* ---------- count-up: verified figures only (10 acres) ---------- */
  document.querySelectorAll("[data-count]").forEach(function (el) {
    var target = parseInt(el.getAttribute("data-count"), 10);
    if (reduceMotion || !("IntersectionObserver" in window)) { el.textContent = target; return; }
    el.textContent = "0";
    var cio = new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting) return;
      cio.disconnect();
      var start = null, dur = 1200;
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
  // Rows carry data-date (YYYY-MM-DD), data-start and data-end (HH:MM) from their
  // published listings. Nothing here invents an event.
  function at(dateStr, timeStr) {
    var d = dateStr.split("-"), t = (timeStr || "00:00").split(":");
    return new Date(+d[0], +d[1] - 1, +d[2], +t[0], +t[1]);
  }
  var now = new Date();
  var rows = Array.prototype.slice.call(document.querySelectorAll("[data-date][data-end]"));
  var upcoming = rows.filter(function (row) {
    var past = at(row.getAttribute("data-date"), row.getAttribute("data-end")) < now;
    row.classList.toggle("is-past", past);
    return !past;
  });
  if (upcoming.length) {
    var firstDate = upcoming[0].getAttribute("data-date");
    rows.forEach(function (r) { r.classList.toggle("is-next", r.getAttribute("data-date") === firstDate); });
  }
  document.querySelectorAll("[data-empty-events]").forEach(function (el) { el.hidden = upcoming.length > 0; });

  /* ---------- countdown clock to the next game ---------- */
  var clock = document.querySelector("[data-clock]");
  if (clock) {
    var parts = {};
    clock.querySelectorAll("[data-u]").forEach(function (b) { parts[b.getAttribute("data-u")] = b; });
    var title = clock.querySelector("[data-clock-title]");
    var when = clock.querySelector("[data-clock-when]");
    var status = clock.querySelector("[data-clock-status]");
    var next = upcoming[0];
    if (!next) {
      if (title) title.innerHTML = '<span class="ph">[CONFIRM — next event date]</span>';
      if (when) when.textContent = "Check Facebook for the next game.";
    } else {
      var startAt = at(next.getAttribute("data-date"), next.getAttribute("data-start"));
      var endAt = at(next.getAttribute("data-date"), next.getAttribute("data-end"));
      if (title) title.textContent = next.getAttribute("data-title");
      if (when) when.innerHTML = next.getAttribute("data-when");
      var pad = function (n) { return (n < 10 ? "0" : "") + n; };
      var tick = function () {
        var t = new Date();
        var ms = Math.max(0, startAt - t);
        if (status) status.textContent = t >= startAt && t < endAt ? "On now" : "Counting down";
        var s = Math.floor(ms / 1000);
        if (parts.d) parts.d.textContent = pad(Math.floor(s / 86400));
        if (parts.h) parts.h.textContent = pad(Math.floor(s % 86400 / 3600));
        if (parts.m) parts.m.textContent = pad(Math.floor(s % 3600 / 60));
        if (parts.s) parts.s.textContent = pad(s % 60);
      };
      tick();
      window.setInterval(tick, 1000);
    }
  }

  /* ---------- shop category filter ---------- */
  var catButtons = document.querySelectorAll(".shop-cats button");
  catButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var cat = btn.getAttribute("data-cat");
      catButtons.forEach(function (b) { b.setAttribute("aria-pressed", b === btn ? "true" : "false"); });
      document.querySelectorAll(".shop-grid [data-cat]").forEach(function (item) {
        item.hidden = !(cat === "all" || item.getAttribute("data-cat") === cat);
      });
    });
  });

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
      var d = at(dateIn.value, "00:00");
      var weekend = d.getDay() === 0 || d.getDay() === 6;
      var rate = weekend ? 20 : 15;
      var total = rate * n;
      out.day.textContent = d.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" }) + (weekend ? " (weekend)" : " (weekday)");
      out.rate.textContent = "$" + rate + " / person";
      out.total.textContent = n ? "$" + total : "—";
      out.deposit.textContent = weekend ? (n ? "$" + (total / 2) + " (50%)" : "50%") : "No money down";
      out.terms.textContent = weekend
        ? "Weekend parties: 50% down when scheduling — non-refundable. Admission only; rentals are extra."
        : "Weekday parties: no money down. Admission only; rentals are extra.";
      if (leadNote) {
        var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        var days = Math.round((d - today) / 86400000);
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
      var st = form.querySelector(".form__status");
      if (st) { st.classList.add("is-shown"); st.focus(); }
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
          if (map[entry.target.id]) map[entry.target.id].classList.add("is-active");
        }
      });
    }, { rootMargin: "-30% 0px -60% 0px" });
    Object.keys(map).forEach(function (id) {
      var sec = document.getElementById(id);
      if (sec) tio.observe(sec);
    });
  }

  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
