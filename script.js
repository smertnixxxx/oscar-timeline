/* ============================================================
   Оскар — стрічка часу
   Рендер подій, фільтр за епохою, анімація появи, прогрес скролу
   ============================================================ */

(function () {
  'use strict';

  /* ---------------------------------------------------------
     ДАНІ: 24 ключові події
     era  — епоха для фільтра
     kind — тип мітки (milestone | record | tech | controversy)
     --------------------------------------------------------- */
  const EVENTS = [
    {
      year: '1927',
      era: '1920-ті',
      kind: 'milestone',
      title: 'Заснування Академії',
      text: 'З ініціативи <strong>Луїса Б. Маєра</strong> засновано Американську академію кінематографічних мистецтв і наук (AMPAS) — 11 травня 1927 року.',
      tag: 'Заснування'
    },
    {
      year: '1927–1928',
      era: '1920-ті',
      kind: 'milestone',
      title: 'Ескіз і модель статуетки',
      text: '<strong>Седрік Гіббонс</strong> створює ескіз, скульптор <strong>Джордж Стенлі</strong> — модель у стилі артдеко: лицар із мечем на котушці кіноплівки.',
      tag: 'Дизайн'
    },
    {
      year: '1929',
      era: '1920-ті',
      kind: 'milestone',
      title: 'Перша церемонія',
      text: '16 травня в готелі «Рузвельт» (Голлівуд). Тривала <strong>15 хвилин</strong>, квиток — <strong>5 доларів</strong>, близько <strong>270</strong> гостей.',
      tag: 'Церемонія',
      img: 'img/ceremony-1929.jpg',
      imgAlt: 'Банкет 1-ї церемонії «Оскара», 16 травня 1929'
    },
    {
      year: '1929',
      era: '1920-ті',
      kind: 'record',
      title: 'Перший «Оскар» за чоловічу роль',
      text: 'Німецький актор <strong>Еміль Яннінгс</strong> — за «Останній наказ» і «Шлях усякої плоті».',
      tag: 'Рекорд'
    },
    {
      year: '1930',
      era: '1930-ті',
      kind: 'tech',
      title: 'Перша радіотрансляція',
      text: 'Церемонію вперше транслюють по радіо — нагорода виходить за межі зали.',
      tag: 'Технології',
      img: 'img/3rd-oscars-1930.jpg',
      imgAlt: 'Третя церемонія «Оскара», 1930'
    },
    {
      year: '1931–1939',
      era: '1930-ті',
      kind: 'milestone',
      title: 'Поява назви «Оскар»',
      text: 'Маргарет Геррік жартує, що статуетка схожа на її дядька Оскара. Офіційно назву закріплюють <strong>1939 року</strong>.',
      tag: 'Назва'
    },
    {
      year: '1936–1937',
      era: '1930-ті',
      kind: 'milestone',
      title: 'Категорії другого плану',
      text: 'Запроваджено нагороди за найкращу чоловічу та жіночу роль другого плану. Перші лауреати — <strong>Волтер Бреннан</strong> і <strong>Гейл Сондерґард</strong> (1937).',
      tag: 'Категорія'
    },
    {
      year: '1940',
      era: '1940-ві',
      kind: 'record',
      title: 'Перша темношкіра лауреатка',
      text: '<strong>Гетті Макденіел</strong> отримує «Оскар» за роль у «Звіяних вітром» (29 лютого 1940 року).',
      tag: 'Рекорд'
    },
    {
      year: '1941',
      era: '1940-ві',
      kind: 'tech',
      title: 'Запечатані конверти',
      text: 'Після витоку списку переможців 1940 року запроваджують систему таємних конвертів.',
      tag: 'Правила',
      img: 'img/james-stewart-1941.jpg',
      imgAlt: 'Вручення «Оскара» у 1941 році, Universal Newsreel'
    },
    {
      year: '1953',
      era: '1950-ті',
      kind: 'tech',
      title: 'Перша телевізійна трансляція',
      text: '19 березня 25-ту церемонію вперше показує телебачення (NBC).',
      tag: 'Технології'
    },
    {
      year: '1956–1957',
      era: '1950-ті',
      kind: 'milestone',
      title: 'Категорія іноземного фільму',
      text: 'Запроваджено нагороду «Найкращий фільм іноземною мовою» — шлях для неангломовного кіно.',
      tag: 'Категорія'
    },
    {
      year: '1966',
      era: '1960-ті',
      kind: 'tech',
      title: 'Перша кольорова трансляція',
      text: '18 квітня церемонія вперше виходить у кольорі.',
      tag: 'Технології'
    },
    {
      year: '1973',
      era: '1970-ті',
      kind: 'controversy',
      title: 'Відмова Марлона Брандо',
      text: 'Брандо відмовляється від «Оскара»; замість нього на сцену виходить активістка <strong>Сашін Літтлфезер</strong>.',
      tag: 'Скандал'
    },
    {
      year: '1998',
      era: '1990-ті',
      kind: 'record',
      title: '«Титанік» бере 11 «Оскарів»',
      text: 'Фільм повторює рекорд «Бен-Гура» (1959) — <strong>11 статуеток</strong>.',
      tag: 'Рекорд'
    },
    {
      year: '2002',
      era: '2000-ні',
      kind: 'milestone',
      title: 'Театр «Кодак»',
      text: 'Церемонія вперше відбувається в театрі «Кодак» (нині «Долбі») у Голлівуді.',
      tag: 'Місце'
    },
    {
      year: '2004',
      era: '2000-ні',
      kind: 'record',
      title: '11 з 11 для «Повернення короля»',
      text: '«Володар перснів: Повернення короля» виграє <strong>всі 11</strong> номінацій — абсолютний результат.',
      tag: 'Рекорд'
    },
    {
      year: '2010',
      era: '2010-ті',
      kind: 'milestone',
      title: '10 номінантів на «Найкращий фільм»',
      text: 'Академія розширює головну категорію до десяти учасників — більше шансів для жанрового кіно.',
      tag: 'Правила'
    },
    {
      year: '2020',
      era: '2020-ті',
      kind: 'record',
      title: '«Паразити» — перший неангломовний переможець',
      text: '9 лютого <strong>«Паразити»</strong> отримують «Оскар» за найкращий фільм — уперше в історії для неангломовної стрічки.',
      tag: 'Рекорд'
    },
    {
      year: '2021',
      era: '2020-ті',
      kind: 'tech',
      title: 'Церемонія в умовах пандемії',
      text: '93-тя церемонія, перенесена з лютого на 25 квітня, пройшла з двох місць: Dolby Theatre і вокзал Union Station у Лос-Анджелесі.',
      tag: 'Технології'
    },
    {
      year: '2021',
      era: '2020-ті',
      kind: 'record',
      title: 'Хлоя Чжао і «Земля кочівників»',
      text: 'Перша жінка азійського походження та друга жінка загалом, що отримує «Оскар» за найкращу режисуру.',
      tag: 'Рекорд'
    },
    {
      year: '2022',
      era: '2020-ті',
      kind: 'controversy',
      title: 'Ляпас Вілла Сміта',
      text: '27 березня Сміт ударив Кріса Рока на сцені, а того ж вечора отримав «Оскар» за найкращу чоловічу роль. «CODA» — найкращий фільм.',
      tag: 'Скандал'
    },
    {
      year: '2023',
      era: '2020-ті',
      kind: 'record',
      title: '«Все завжди і водночас»',
      text: '7 «Оскарів»; <strong>Мішель Йео</strong> — перша азійка з нагородою за найкращу жіночу роль.',
      tag: 'Рекорд'
    },
    {
      year: '2025',
      era: '2020-ті',
      kind: 'milestone',
      title: '97-ма церемонія',
      text: '2 березня: «Анора» — найкращий фільм, <strong>Майкі Медісон</strong> — найкраща акторка. Та сама церемонія, про яку пише джерело інфографіки.',
      tag: 'Церемонія'
    },
    {
      year: 'Поза роками',
      era: 'Поза роками',
      kind: 'record',
      title: 'Вічні рекорди',
      text: '«Звіяні вітром» досі тримає рекорд зборів з урахуванням інфляції, а «Титанік», «Бен-Гур» і «Повернення короля» ділять рекорд за кількістю статуеток.',
      tag: 'Рекорд'
    }
  ];

  /* Жарти для туру: FUN[i] відповідає EVENTS[i] */
  const FUN = [
    'Академію створили, щоб студії не билися за акторів у коридорах. Спрацювало частково.',
    'Статуетка — лицар на котушці плівки. Хтось же мусив його туди поставити.',
    '15 хвилин шоу, 270 гостей, квиток за 5 доларів. Сучасний ефірний час такого б не пробачив.',
    'Перший переможець поїхав назад у Німеччину. Романтична історія без другого акту.',
    'Радіо: картинки ще не було, зате голос був як у диктора на вокзалі.',
    'Дядько Оскар так і не отримав гонорар. Назва лишилася як сімейний мем.',
    'Перші лауреати другого плану — і ніхто не знав, як правильно дякувати зі сцени.',
    'Її посадили за окремий столик. Статуетка прийшла, а стіл лишився.',
    'Конверти придумали, щоб не спойлерили. Тепер спойлери — окрема індустрія.',
    'Телевізор увійшов у зал і сказав: тепер вас бачать усі. Включно з бабусею.',
    'Категорія про фільми іноземною мовою. Тобто фільми, які треба читати, а не просто слухати.',
    'Вперше в кольорі. Тепер видно, у що були одягнені всі, хто не спав.',
    'Брандо відмовився, а на сцену вийшла Сашін Літтлфезер. Найкрасивіша пауза в історії премії.',
    'Одинадцять статуеток. Титанік тонув, але нагороди плили.',
    'Театр Kodak — тепер Dolby. Колись плівка, тепер звук. Прогрес, діти.',
    'Одинадцять з одинадцяти. Продюсерам довелося замовити ще одну полицю.',
    'Номінантів стало 10. Тепер навіть фільм про роботів має шанс.',
    'Фільм із Південної Кореї виграв найкращий фільм. Сеул святкував так, ніби виграв чемпіонат.',
    'Два майданчики, один Лос-Анджелес і багато дистанції між кріслами. Пандемія теж має сценарій.',
    'Перша азійська жінка-режисер із Оскаром. Шлях у цій категорії тепер інший.',
    'Ляпас на сцені, а через кілька хвилин — Оскар. Такий сценарій навіть сценаристи не пишуть.',
    'Сім статуеток і мультивсесвіт у залі. Голова йде обертом, статуетки — ні.',
    'Анора і Майкі Медісон на одній сцені. Головне — не перепутати конверт.',
    'Рекорд, який ніхто не хотів би ламати. Але всі ламають.'
  ];

  /* Порядок епох у фільтрі */
  const ERAS = [
    'Усі',
    '1920-ті',
    '1930-ті',
    '1940-ві',
    '1950-ті',
    '1960-ті',
    '1970-ті',
    '1990-ті',
    '2000-ні',
    '2010-ті',
    '2020-ті',
    'Поза роками'
  ];

  const listEl = document.getElementById('timeline-list');
  const filtersEl = document.getElementById('filters');
  const emptyEl = document.getElementById('timeline-empty');
  const countEl = document.getElementById('timeline-count');

  /* ---------------------------------------------------------
     Побудова картки події
     --------------------------------------------------------- */
  function createEventEl(ev) {
    const article = document.createElement('article');
    article.className = 'event';
    article.dataset.era = ev.era;

    const dot = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    dot.setAttribute('class', 'event__dot');
    dot.setAttribute('aria-hidden', 'true');
    dot.setAttribute('viewBox', '0 0 100 220');
    const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    use.setAttribute('href', '#oscar');
    dot.appendChild(use);

    const card = document.createElement('div');
    card.className = 'event__card';

    const year = document.createElement('span');
    year.className = 'event__year';
    year.textContent = ev.year;

    const title = document.createElement('h3');
    title.className = 'event__title';
    title.textContent = ev.title;

    const text = document.createElement('p');
    text.className = 'event__text';
    text.innerHTML = ev.text; // довірений вміст — дані визначені у цьому файлі

    const tag = document.createElement('span');
    tag.className = 'event__tag';
    tag.dataset.kind = ev.kind;
    tag.textContent = ev.tag || 'Подія';

    card.append(year, title);
    if (ev.img) {
      const pic = document.createElement('img');
      pic.className = 'event__photo';
      pic.src = ev.img;
      pic.alt = ev.imgAlt || ev.title;
      pic.loading = 'lazy';
      card.append(pic);
    }
    card.append(text, tag);
    article.append(dot, card);
    return article;
  }

  /* ---------------------------------------------------------
     Рендер списку з фільтром
     --------------------------------------------------------- */
  function render(era) {
    listEl.innerHTML = '';

    const filtered = EVENTS.filter(ev => era === 'Усі' || ev.era === era);
    filtered.forEach(ev => listEl.appendChild(createEventEl(ev)));

    emptyEl.hidden = filtered.length > 0;
    countEl.textContent = 'Показано ' + filtered.length + ' з ' + EVENTS.length + ' подій';
    observeEvents();
  }

  /* ---------------------------------------------------------
     Кнопки-фільтри
     --------------------------------------------------------- */
  function buildFilters() {
    ERAS.forEach((era, i) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'filter' + (i === 0 ? ' is-active' : '');
      const count = era === 'Усі' ? EVENTS.length : EVENTS.filter(ev => ev.era === era).length;
      btn.textContent = era + ' · ' + count;
      btn.setAttribute('aria-pressed', i === 0 ? 'true' : 'false');

      btn.addEventListener('click', () => {
        filtersEl.querySelectorAll('.filter').forEach(b => {
          b.classList.remove('is-active');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('is-active');
        btn.setAttribute('aria-pressed', 'true');
        render(era);
      });

      filtersEl.appendChild(btn);
    });
  }

  /* ---------------------------------------------------------
     Поява карток при скролі
     --------------------------------------------------------- */
  let observer = null;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function observeEvents() {
    const nodes = listEl.querySelectorAll('.event');

    if (prefersReduced || !('IntersectionObserver' in window)) {
      nodes.forEach(n => n.classList.add('is-visible'));
      return;
    }

    if (observer) observer.disconnect();

    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    nodes.forEach((n, i) => {
      n.style.transitionDelay = Math.min(i % 4, 3) * 60 + 'ms';
      observer.observe(n);
    });
  }

  /* ---------------------------------------------------------
     Reveal: поява блоків при скролі
     --------------------------------------------------------- */
  function initReveal() {
    const nodes = document.querySelectorAll('.reveal');
    if (!nodes.length) return;

    if (prefersReduced || !('IntersectionObserver' in window)) {
      nodes.forEach(n => n.classList.add('is-visible'));
      return;
    }

    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (!entry.isIntersecting) return;
        entry.target.style.transitionDelay = (i % 5) * 70 + 'ms';
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

    nodes.forEach(n => obs.observe(n));
  }

  /* ---------------------------------------------------------
     Лічильники у чіпах
     --------------------------------------------------------- */
  function animateCounters() {
    const nodes = document.querySelectorAll('.chip b');
    nodes.forEach(el => {
      const raw = el.dataset.value || el.textContent.trim();
      el.dataset.value = raw;

      const match = raw.match(/^(\d+(?:[.,]\d+)?)(.*)$/);
      if (!match) return;

      const numStr  = match[1];
      const suffix  = match[2] || '';
      const sep     = numStr.includes(',') ? ',' : '.';
      const decimals = (numStr.split(/[.,]/)[1] || '').length;
      const target  = parseFloat(numStr.replace(',', '.'));

      if (prefersReduced) { el.textContent = raw; return; }

      const duration = 1100;
      const start = performance.now();

      const tick = (now) => {
        const p = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);          // easeOutCubic
        const value = target * eased;
        const shown = decimals > 0
          ? value.toFixed(decimals).replace('.', sep)
          : Math.round(value).toString();
        el.textContent = shown + suffix;
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = raw;
      };

      el.textContent = decimals > 0
        ? (0).toFixed(decimals).replace('.', sep) + suffix
        : '0' + suffix;

      requestAnimationFrame(tick);
    });
  }

  /* ---------------------------------------------------------
     Єдиний цикл на скрол: прогрес сторінки, лінія таймлайну, навігація
     --------------------------------------------------------- */
  function initScroll() {
    const pageBar   = document.getElementById('progress');
    const nav       = document.querySelector('.nav');
    const tlWrap    = document.querySelector('.timeline-wrap');
    const tlBar     = document.getElementById('timeline-progress');
    const docEl     = document.documentElement;

    const update = () => {
      const max = docEl.scrollHeight - docEl.clientHeight;
      const y   = docEl.scrollTop;

      if (pageBar) {
        pageBar.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
      }

      if (nav) {
        nav.classList.toggle('is-scrolled', y > 24);
      }

      if (tlWrap && tlBar) {
        const rect  = tlWrap.getBoundingClientRect();
        const anchor = window.innerHeight * 0.62;
        const passed = anchor - rect.top;
        const pct = rect.height > 0
          ? Math.max(0, Math.min(1, passed / rect.height))
          : 0;
        tlBar.style.height = (pct * 100) + '%';
      }
    };

    let raf = false;
    const schedule = () => {
      if (raf) return;
      raf = true;
      requestAnimationFrame(() => { update(); raf = false; });
    };

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    update();
  }

  /* ---------------------------------------------------------
     Тур: покрокове читання подій з жартом
     --------------------------------------------------------- */
  const tourEl      = document.getElementById('tour');
  const tourYear    = document.getElementById('tour-year');
  const tourTitle   = document.getElementById('tour-title');
  const tourText    = document.getElementById('tour-text');
  const tourFun     = document.getElementById('tour-fun');
  const tourCounter = document.getElementById('tour-counter');
  let tourIndex = 0;

  function showTourStep(i) {
    const ev = EVENTS[i];
    tourIndex = i;
    tourYear.textContent = ev.year;
    tourTitle.textContent = ev.title;
    tourText.innerHTML = ev.text;
    tourFun.textContent = FUN[i] || '';
    const oldPic = tourEl.querySelector('.tour__photo');
    if (oldPic) oldPic.remove();
    if (ev.img) {
      const pic = document.createElement('img');
      pic.className = 'tour__photo';
      pic.src = ev.img;
      pic.alt = ev.imgAlt || ev.title;
      tourTitle.after(pic);
    }
    tourCounter.textContent = (i + 1) + ' / ' + EVENTS.length;
    document.getElementById('tour-prev').disabled = i === 0;
    document.getElementById('tour-next').textContent = i === EVENTS.length - 1 ? 'Фінал ✓' : 'Далі →';
  }

  function openTour() {
    tourEl.hidden = false;
    showTourStep(0);
    tourEl.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'center' });
  }

  function closeTour() {
    tourEl.hidden = true;
  }

  function initTour() {
    const startBtn = document.getElementById('tour-start');
    if (!startBtn) return;

    startBtn.addEventListener('click', openTour);
    document.getElementById('tour-stop').addEventListener('click', closeTour);
    document.getElementById('tour-prev').addEventListener('click', () => {
      if (tourIndex > 0) showTourStep(tourIndex - 1);
    });
    document.getElementById('tour-next').addEventListener('click', () => {
      if (tourIndex < EVENTS.length - 1) showTourStep(tourIndex + 1);
      else closeTour();
    });

    document.addEventListener('keydown', (e) => {
      if (tourEl.hidden) return;
      if (!document.getElementById('lightbox').hidden) return;
      if (e.key === 'ArrowRight') document.getElementById('tour-next').click();
      if (e.key === 'ArrowLeft') document.getElementById('tour-prev').click();
      if (e.key === 'Escape') closeTour();
    });
  }

  /* ---------------------------------------------------------
     Лайтбокс: клік по фото — на весь екран
     --------------------------------------------------------- */
  function initLightbox() {
    const box   = document.getElementById('lightbox');
    const img   = document.getElementById('lightbox-img');
    const cap   = document.getElementById('lightbox-caption');
    if (!box || !img) return;

    function open(src, alt, caption) {
      img.src = src;
      img.alt = alt || '';
      cap.textContent = caption || alt || '';
      box.hidden = false;
      document.body.style.overflow = 'hidden';
      document.getElementById('lightbox-close').focus();
    }

    function close() {
      box.hidden = true;
      img.removeAttribute('src');
      document.body.style.overflow = '';
    }

    // делегування: працює і для статичної галереї, і для карток, що рендеряться
    document.addEventListener('click', (e) => {
      const target = e.target.closest('img');
      if (!target) return;
      const scope = target.closest('.shot, .event__card, .tour');
      if (!scope) return;

      const fig = target.closest('figure');
      const figcap = fig && fig.querySelector('figcaption');
      const caption = figcap
        ? figcap.textContent.replace(/\s+/g, ' ').trim()
        : (target.alt || '');

      open(target.currentSrc || target.src, target.alt, caption);
    });

    box.querySelector('.lightbox__close').addEventListener('click', close);

    // клік по фону (не по картинці) закриває
    box.addEventListener('click', (e) => {
      if (e.target === box) close();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !box.hidden) close();
    });
  }

  /* ---------------------------------------------------------
     Старт
     --------------------------------------------------------- */
  function init() {
    buildFilters();
    render('Усі');
    initReveal();
    initScroll();
    animateCounters();
    initTour();
    initLightbox();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
