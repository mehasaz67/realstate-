/* ==========================================================================
   املاک افق — منطق تعاملی
   ========================================================================== */

(function () {
  "use strict";

  /* داده‌های نمونه املاک -------------------------------------------------
     تصاویر از تصویر مرجع پروژه استخراج شده‌اند. اطلاعات، نمونه و قابل ویرایش است. */
  var PROPERTIES = [
    {
      id: "lakeside",
      title: "ویلای مدرن دریاچه‌ای",
      location: "آستین، تگزاس، آمریکا",
      price: "۲٫۳۵ میلیون دلار",
      type: "ویلای لوکس",
      image: "assets/img/property-1.webp",
      alt: "ویلای مدرن دریاچه‌ای با استخر در غروب",
      wide: true,
      meta: ["۴۲۰ متر مربع", "۵ اتاق خواب", "۴ سرویس"],
      description:
        "ویلایی مدرن با پنجره‌های تمام‌قد رو به دریاچه، استخر بی‌نهایت و نورپردازی معماری. این ملک با دسترسی اختصاصی به ساحل و فضای باز وسیع، برای زندگی خانوادگی و اقامت‌های فصلی مناسب است."
    },
    {
      id: "sunset",
      title: "ویلای ساحلی آفتاب",
      location: "مالیبو، کالیفرنیا، آمریکا",
      price: "۴٫۱ میلیون دلار",
      type: "ویلای ساحلی",
      image: "assets/img/property-2.webp",
      alt: "ویلای ساحلی مدرن با نمای شیشه‌ای",
      meta: ["۳۸۰ متر مربع", "۴ اتاق خواب", "۳ سرویس"],
      description:
        "اقامتگاهی ساحلی با تراس چوبی و دید بی‌واسطه به اقیانوس. متریال طبیعی، سقف بلند و پنجره‌های سراسری، نور طبیعی را در تمام روز به فضا می‌آورد."
    },
    {
      id: "penthouse",
      title: "پنت‌هاوس مرکز شهر",
      location: "نیویورک، آمریکا",
      price: "۶٫۸ میلیون دلار",
      type: "پنت‌هاوس",
      image: "assets/img/property-3.webp",
      alt: "پنت‌هاوس مدرن با نمای شهر",
      meta: ["۲۹۰ متر مربع", "۳ اتاق خواب", "۳ سرویس"],
      description:
        "پنت‌هاوسی در قلب شهر با نمای ۳۶۰ درجه، آشپزخانه اوپن و دسترسی به امکانات ساختمان شامل سالن ورزشی و لابی اختصاصی."
    },
    {
      id: "forest",
      title: "اقامتگاه جنگلی آرام",
      location: "اسپن، کلرادو، آمریکا",
      price: "۳٫۲ میلیون دلار",
      type: "اقامتگاه ییلاقی",
      image: "assets/img/property-4.webp",
      alt: "اقامتگاه مدرن در محوطه جنگلی",
      meta: ["۳۵۰ متر مربع", "۴ اتاق خواب", "۴ سرویس"],
      description:
        "خانه‌ای میان درختان با نمای چوب و سنگ، شومینه مرکزی و تراس رو به دامنه. گزینه‌ای مناسب برای اقامت آرام در تمام فصل‌های سال."
    }
  ];

  var toFaDigits = function (value) {
    return String(value).replace(/[0-9]/g, function (d) {
      return "۰۱۲۳۴۵۶۷۸۹"[Number(d)];
    });
  };

  var header = document.getElementById("site-header");
  var nav = document.getElementById("primary-nav");
  var navToggle = document.querySelector(".nav-toggle");

  /* هدر: تغییر ظاهر پس از اسکرول ---------------------------------------- */
  var onScroll = function () {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* منوی موبایل ---------------------------------------------------------- */
  if (navToggle && nav) {
    var closeNav = function () {
      nav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "باز کردن منو");
    };

    navToggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(open));
      navToggle.setAttribute("aria-label", open ? "بستن منو" : "باز کردن منو");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeNav();
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 900) closeNav();
    });
  }

  /* اسلایدر درباره ما ---------------------------------------------------- */
  var sliderTrack = document.querySelector("[data-slider-track]");
  var sliderPrev = document.querySelector("[data-slider-prev]");

  if (sliderTrack && sliderPrev) {
    var slides = Array.prototype.slice.call(sliderTrack.children);
    var slideIndex = 0;

    sliderPrev.addEventListener("click", function () {
      slideIndex = (slideIndex + 1) % slides.length;
      slides[slideIndex].scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
    });
  }

  /* کارت‌های املاک + کاروسل ---------------------------------------------- */
  var track = document.querySelector("[data-carousel-track]");
  var carousel = document.querySelector("[data-carousel]");
  var btnPrev = document.querySelector("[data-carousel-prev]");
  var btnNext = document.querySelector("[data-carousel-next]");

  var pinIcon =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" fill="none" stroke="currentColor" stroke-width="1.7"/><circle cx="12" cy="10" r="2.4" fill="none" stroke="currentColor" stroke-width="1.7"/></svg>';

  var buildCard = function (property) {
    var card = document.createElement("article");
    card.className = "prop-card" + (property.wide ? " prop-card--wide" : "");
    card.innerHTML =
      '<div class="prop-card__media">' +
        '<img class="prop-card__img" src="' + property.image + '" alt="' + property.alt + '" loading="lazy">' +
      "</div>" +
      '<div class="prop-card__body">' +
        '<h3 class="prop-card__title">' + property.title + "</h3>" +
        '<p class="prop-card__location">' + pinIcon + "<span>" + property.location + "</span></p>" +
        '<p class="prop-card__price">' + property.price + "</p>" +
      "</div>" +
      '<button class="prop-card__button" type="button" aria-label="مشاهده جزئیات ' + property.title + '"></button>';

    card.querySelector(".prop-card__button").addEventListener("click", function () {
      openPropertyDialog(property);
    });

    return card;
  };

  if (track) {
    var cards = PROPERTIES.map(buildCard);
    cards.forEach(function (card) { track.appendChild(card); });

    if (carousel && btnPrev && btnNext) {
      var cardIndex = 0;

      var syncArrows = function () {
        btnPrev.disabled = cardIndex <= 0;
        btnNext.disabled = cardIndex >= cards.length - 1;
      };

      var goToCard = function (index) {
        cardIndex = Math.max(0, Math.min(cards.length - 1, index));
        cards[cardIndex].scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
        syncArrows();
      };

      btnPrev.addEventListener("click", function () { goToCard(cardIndex - 1); });
      btnNext.addEventListener("click", function () { goToCard(cardIndex + 1); });

      carousel.addEventListener("keydown", function (event) {
        if (event.key === "ArrowLeft") {   /* در RTL: حرکت به سمت بعدی */
          event.preventDefault();
          goToCard(cardIndex + 1);
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          goToCard(cardIndex - 1);
        }
      });

      syncArrows();
    }
  }

  /* دیالوگ جزئیات ملک ---------------------------------------------------- */
  var dialog = document.getElementById("property-dialog");

  function openPropertyDialog(property) {
    if (!dialog) return;

    document.getElementById("prop-dialog-img").src = property.image;
    document.getElementById("prop-dialog-img").alt = property.alt;
    document.getElementById("prop-dialog-type").textContent = property.type;
    document.getElementById("prop-dialog-title").textContent = property.title;
    document.getElementById("prop-dialog-location").textContent = property.location;
    document.getElementById("prop-dialog-desc").textContent = property.description;
    document.getElementById("prop-dialog-price").textContent = property.price;

    var meta = document.getElementById("prop-dialog-meta");
    meta.innerHTML = "";
    property.meta.forEach(function (item) {
      var li = document.createElement("li");
      li.textContent = item;
      meta.appendChild(li);
    });

    var requestBtn = dialog.querySelector("[data-dialog-request]");
    requestBtn.onclick = function () {
      dialog.close();
      var message = document.getElementById("message");
      if (message) {
        message.value = "درخواست بازدید از «" + property.title + "» در " + property.location + " را دارم.";
      }
      var contact = document.getElementById("contact");
      if (contact) contact.scrollIntoView({ behavior: "smooth", block: "start" });
      var nameField = document.getElementById("name");
      if (nameField) window.setTimeout(function () { nameField.focus({ preventScroll: true }); }, 500);
    };

    dialog.showModal();
  }

  if (dialog) {
    dialog.querySelector("[data-dialog-close]").addEventListener("click", function () {
      dialog.close();
    });

    dialog.addEventListener("click", function (event) {
      var rect = dialog.getBoundingClientRect();
      var outside =
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom;
      if (outside) dialog.close();
    });
  }

  /* فرم تماس ------------------------------------------------------------- */
  var form = document.getElementById("contact-form");

  if (form) {
    var status = document.getElementById("form-status");

    var setError = function (fieldName, message) {
      var input = form.elements[fieldName];
      var wrapper = input.closest(".field");
      var output = document.getElementById(fieldName + "-error");
      wrapper.classList.toggle("has-error", Boolean(message));
      input.setAttribute("aria-invalid", message ? "true" : "false");
      output.textContent = message || "";
      return !message;
    };

    var normalizePhone = function (value) {
      var fa = "۰۱۲۳۴۵۶۷۸۹";
      var ar = "٠١٢٣٤٥٦٧٨٩";
      var digits = String(value).replace(/[۰-۹٠-٩]/g, function (ch) {
        var index = fa.indexOf(ch);
        if (index === -1) index = ar.indexOf(ch);
        return index === -1 ? ch : String(index);
      }).replace(/[^\d+]/g, "");

      if (/^\+989\d{9}$/.test(digits)) return digits;
      if (/^00989\d{9}$/.test(digits)) return "+" + digits.slice(2);
      if (/^9\d{9}$/.test(digits)) return "0" + digits;
      return digits;
    };

    var validators = {
      name: function (value) {
        return value.trim().length >= 3 ? "" : "نام و نام خانوادگی را کامل وارد کنید.";
      },
      phone: function (value) {
        if (!value.trim()) return "شماره تماس را وارد کنید.";
        return /^(0|\+98)9\d{9}$/.test(normalizePhone(value))
          ? ""
          : "شماره موبایل معتبر نیست؛ نمونه: ۰۹۱۲۳۴۵۶۷۸۹";
      },
      email: function (value) {
        if (!value.trim()) return "";
        return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim()) ? "" : "ایمیل وارد شده معتبر نیست.";
      },
      message: function (value) {
        return value.trim().length >= 10 ? "" : "پیام باید حداقل ۱۰ نویسه باشد.";
      }
    };

    var validateField = function (name) {
      var field = form.elements[name];
      if (!field) return true;
      return setError(name, validators[name](field.value));
    };

    Object.keys(validators).forEach(function (name) {
      var field = form.elements[name];
      if (!field) return;
      field.addEventListener("blur", function () { validateField(name); });
      field.addEventListener("input", function () {
        if (field.closest(".field").classList.contains("has-error")) validateField(name);
      });
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var valid = Object.keys(validators).map(validateField).every(Boolean);

      if (!valid) {
        status.textContent = "";
        var firstInvalid = form.querySelector('[aria-invalid="true"]');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      status.textContent = "اطلاعات فرم معتبر است. این نسخه نمایشی پیام‌ها را به سرور ارسال نمی‌کند.";
      form.reset();
      Object.keys(validators).forEach(function (name) {
        setError(name, "");
      });
    });
  }

  /* نمایش اعداد لاتین موجود در محتوا با ارقام فارسی ----------------------- */
  document.querySelectorAll("[data-fa-digits]").forEach(function (node) {
    node.textContent = toFaDigits(node.textContent);
  });
})();
