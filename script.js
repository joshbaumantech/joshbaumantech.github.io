/* Bauman Consulting Group — small progressive enhancements */
(function () {
  "use strict";

  /* Current year in footer */
  var yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();

  /* Mobile menu */
  var toggle = document.querySelector(".menu-toggle");
  var mobileNav = document.getElementById("mobile-nav");

  if (toggle && mobileNav) {
    toggle.addEventListener("click", function () {
      var open = mobileNav.classList.toggle("is-open");
      mobileNav.hidden = !open;
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    mobileNav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        mobileNav.classList.remove("is-open");
        mobileNav.hidden = true;
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
      }
    });
  }

  /* Scroll reveals */
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var items = document.querySelectorAll(".reveal");

  if (reduced || !("IntersectionObserver" in window)) {
    items.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        setTimeout(function () { el.classList.add("is-in"); }, i * 70);
        io.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    items.forEach(function (el) { io.observe(el); });
  }

  /* Contact form
     Posts to Formspree when configured; otherwise falls back to a mailto:
     draft so the site is never a dead end. */
  var form = document.querySelector(".form");
  if (!form) return;

  var note = form.querySelector(".form__note");
  var configured = form.action.indexOf("YOUR_FORM_ID") === -1;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var data = new FormData(form);
    var get = function (k) { return (data.get(k) || "").toString().trim(); };

    if (!configured) {
      var to = form.dataset.fallbackEmail;
      var subject = "Website inquiry — " + (get("company") || get("name") || "New contact");
      var body =
        "Name: " + get("name") + "\n" +
        "Business: " + get("company") + "\n" +
        "Email: " + get("email") + "\n" +
        "Phone: " + get("phone") + "\n\n" +
        get("message");

      window.location.href =
        "mailto:" + to +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);

      if (note) note.textContent = "Opening your email app…";
      return;
    }

    var button = form.querySelector('button[type="submit"]');
    if (button) { button.disabled = true; button.textContent = "Sending…"; }

    fetch(form.action, {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" }
    })
      .then(function (res) {
        if (!res.ok) throw new Error("Request failed");
        form.reset();
        if (note) note.textContent = "Thanks — your message is on its way. Josh will follow up shortly.";
      })
      .catch(function () {
        if (note) note.textContent = "That didn't send. Email josh@baumanconsultinggroup.com or call (636) 555-0100.";
      })
      .then(function () {
        if (button) { button.disabled = false; button.textContent = "Send message"; }
      });
  });
})();
