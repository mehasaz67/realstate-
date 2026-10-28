/* ==========================================================================
   املاک افق — هیروی اسکرول‌محور (اسکراب ویدیو)
   --------------------------------------------------------------------------
   قرارداد این ماژول: موقعیت اسکرول کاربر = موقعیت تایم‌لاین ویدیو.
   ویدیو هرگز play() نمی‌شود، هرگز loop نمی‌شود و هیچ autoplayای ندارد؛
   ما فقط video.currentTime را جابه‌جا می‌کنیم، پس با توقف اسکرول، تصویر
   دقیقاً روی همان فریم می‌ایستد.

   چرا این‌طور پیاده شده است:
   • اسکرول فقط «هدف» را می‌نویسد (targetTime). نوشتن واقعی currentTime
     فقط داخل requestAnimationFrame انجام می‌شود تا با نرخ رندر مرورگر
     هم‌زمان باشد و فریم‌های بی‌مصرف تولید نشود.
   • میان‌یابی نرم (SMOOTHING) بین مقدار فعلی و هدف، پرش‌های ناگهانی seek
     را حذف می‌کند، ولی ضریب آن به‌قدری بالاست که حس مستقیم‌بودن حفظ شود.
   • اگر مرورگر هنوز در حال seek باشد (video.seeking) هیچ seek جدیدی ارسال
     نمی‌شود؛ آخرین مقدار پس از پایان seek اعمال می‌شود. این کار «سیل seek»
     و صف‌شدن درخواست‌ها را قطع می‌کند.
   • فقط وقتی اختلاف از نصف فریم بیشتر شد seek می‌کنیم (MIN_STEP)، پس در
     اسکرول‌های ریز، ویدیو بی‌دلیل کار نمی‌کند.
   • حلقه rAF وقتی هدف و مقدار فعلی به هم رسیدند خودش متوقف می‌شود؛ در حالت
     سکون هیچ کاری در پس‌زمینه انجام نمی‌شود.

   ویژگی‌های فایل ویدیو که برای اسکراب سریع لازم است (و در فایل‌های این پروژه
   رعایت شده): کلیدفریم هر ۶ فریم (۰٫۲۵ ثانیه در ۲۴fps)، بدون B-frame،
   moov در ابتدای فایل (+faststart)، رزولوشن و بیت‌ریت متعادل، و نسخه سبک‌تر
   برای موبایل. H.264 عمداً انتخاب شده چون تقریباً همه مرورگرها آن را
   سخت‌افزاری دیکد می‌کنند؛ WebM/VP9 در seek پیاپی روی CPU کندتر است و همان
   چیزی است که باعث لگ و مکث می‌شود.
   ========================================================================== */

(function () {
  "use strict";

  var hero = document.querySelector("[data-hero]");
  if (!hero) return;

  var video = hero.querySelector("[data-hero-video]");
  var content = hero.querySelector("[data-hero-content]");
  var loaderBar = hero.querySelector("[data-hero-loader-bar]");
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* حالت ساده: بدون ویدیو و بدون چسبیدن صحنه ---------------------------- */
  var useStatic = function () {
    hero.classList.add("hero--static");
    if (video) {
      video.removeAttribute("preload");
      video.removeAttribute("poster");
    }
  };

  if (!video || reducedMotion.matches) {
    useStatic();
    return;
  }

  var SMOOTHING = 0.2;      // ۰ تا ۱ — بزرگ‌تر: پاسخ سریع‌تر، کوچک‌تر: نرم‌تر
  var MIN_STEP = 1 / 48;    // نصف فریم؛ کمتر از این، seek ارسال نمی‌شود
  var EPSILON = 0.004;      // آستانه توقف حلقه (ثانیه)
  var TEXT_FADE_END = 0.3;  // متن در ۳۰٪ ابتدایی مسیر محو می‌شود

  var duration = 0;
  var heroTop = 0;
  var runway = 1;           // ارتفاع قابل اسکرول هیرو (px)
  var targetTime = 0;
  var smoothTime = 0;
  var lastSeek = -1;
  var ready = false;
  var running = false;

  /* انتخاب سورس: نسخه سبک‌تر برای صفحه‌های کوچک -------------------------- */
  var isSmallScreen = window.matchMedia("(max-width: 720px)").matches;
  var src = video.getAttribute(isSmallScreen ? "data-src-mobile" : "data-src-desktop");
  if (src) {
    video.src = src;
    video.load();
  }

  var setLoaderWidth = function (percent) {
    if (loaderBar) loaderBar.style.width = Math.min(100, Math.round(percent)) + "%";
  };

  /* اندازه‌گیری مسیر اسکرول — فقط هنگام تغییر اندازه، نه در هر فریم ------ */
  var measure = function () {
    var rect = hero.getBoundingClientRect();
    heroTop = rect.top + window.pageYOffset;
    runway = Math.max(1, hero.offsetHeight - window.innerHeight);
  };

  /* هدف: پیشرفت اسکرول در مسیر ۰..۱ → زمان ۰..duration ------------------ */
  var updateTarget = function () {
    var progress = 0;
    if (ready) {
      progress = (window.pageYOffset - heroTop) / runway;
      progress = progress < 0 ? 0 : progress > 1 ? 1 : progress;
    }
    targetTime = progress * duration;

    if (content) {
      var fade = progress / TEXT_FADE_END;
      fade = fade > 1 ? 1 : fade;
      content.style.opacity = String(1 - fade);
      content.style.transform = "translate3d(0," + (-26 * fade).toFixed(2) + "px,0)";
    }
  };

  /* حلقه رندر: تنها جایی که currentTime نوشته می‌شود --------------------- */
  var tick = function () {
    updateTarget();

    var diff = targetTime - smoothTime;
    if (Math.abs(diff) <= EPSILON) {
      smoothTime = targetTime;
    } else {
      smoothTime += diff * SMOOTHING;
    }

    var pending = Math.abs(smoothTime - lastSeek) >= MIN_STEP;
    if (pending && !video.seeking) {
      lastSeek = smoothTime;
      video.currentTime = smoothTime;
      pending = false;
    }

    if (Math.abs(targetTime - smoothTime) > EPSILON || pending) {
      requestAnimationFrame(tick);
    } else {
      running = false;
    }
  };

  var requestTick = function () {
    if (running) return;
    running = true;
    requestAnimationFrame(tick);
  };

  /* آماده‌سازی: نمایش ویدیو و هم‌تراز کردن آن با اسکرول فعلی ------------- */
  var markReady = function () {
    if (ready) return;
    ready = true;
    duration = video.duration || 0;
    smoothTime = 0;
    lastSeek = 0;
    video.currentTime = 0;
    hero.classList.add("is-ready");
    setLoaderWidth(100);
    measure();
    requestTick();
  };

  var updateLoading = function () {
    if (ready || !loaderBar) return;
    var total = video.duration;
    if (!total || !isFinite(total)) return;
    var loaded = 0;
    for (var i = 0; i < video.buffered.length; i += 1) {
      loaded = Math.max(loaded, video.buffered.end(i));
    }
    setLoaderWidth((loaded / total) * 92);
  };

  video.addEventListener("loadedmetadata", function () {
    duration = video.duration || 0;
    updateLoading();
  });

  video.addEventListener("loadeddata", updateLoading);
  video.addEventListener("progress", updateLoading);
  video.addEventListener("canplay", markReady);

  video.addEventListener("error", function () {
    hero.classList.remove("is-ready");
    hero.classList.add("is-error");
  });

  window.addEventListener("scroll", requestTick, { passive: true });

  var onResize = function () {
    measure();
    requestTick();
  };
  window.addEventListener("resize", onResize, { passive: true });
  window.addEventListener("orientationchange", onResize, { passive: true });
  window.addEventListener("pageshow", onResize);

  if (reducedMotion.addEventListener) {
    reducedMotion.addEventListener("change", function (event) {
      if (event.matches) useStatic();
    });
  }

  measure();
  requestTick();
})();
