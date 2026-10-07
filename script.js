/* ============================================================
   For Kevia, on October 8. — script.js
   A quiet digital letter at midnight.

   Everything customizable lives in `birthdayConfig` below.
   ============================================================ */

const birthdayConfig = {
  name: "Kevia",
  birthday: "October 8, 2006",
  pin: "0525",

  music: {
    playerLabel: "for you, Kevia",
    file: "assets/music/birthday-song.mp3",
  },

  opening: {
    lines: [
      "Hey, Kevia.",
      "It's October 8 again.",
      "And I couldn't let today pass without making you something.",
    ],
    button: "Open it",
    note: "just take your time.",
  },

  unlock: {
    title: "Before you continue...",
    subtitle: "There's something here that I wanted you to have.",
    label: "Enter the little secret.",
    success: ["Okay... it's you.", "Let's begin."],
    wrong: ["Nice try, Kevia.", "Try again."],
  },

  letter: {
    heading: "Happy Birthday, Kevia.",
    subheading: "October 8, 2006 — the day you came into this world.",
    paragraphs: [

      "Kevia,",
      "Happy birthday.",
      "I honestly didn't know how to start this, because I know things between us are a little different now.",
      "But it's your birthday, and I still wanted to do something for you.",
      "We've been through a lot together, and even though things didn't turn out the way we thought they would, I'm still really glad I got to know you the way I did.",
      "There are a lot of things I still remember about us, even the small and stupid ones that probably didn't mean much at the time.",
      "I guess when someone becomes such a big part of your life, you don't just stop caring about them because things changed.",
      "I still care about you, and I still want you to be okay.",
      "I still want to see you happy, doing the things you like, laughing at stupid things, and becoming the person you want to be.",
      "I don't want to make today complicated or turn this into something it isn't.",
      "I just wanted you to know that I'm genuinely happy that you were born, and I'm grateful that at one point, our lives found each other.",
      "Whatever happens from here, I hope you have a really good year.",
      "I hope you get more good days than bad ones, more things to look forward to, and more reasons to be happy.",
      "And yeah, that's pretty much all I wanted to say.",
      "Happy birthday, Kevia.",
      "I'm really glad you're here."


    ],
    button: "There's more.",
  },

  appreciation: {
    heading: "Things I Still Appreciate About You",
    subheading: "Some things don't disappear just because things changed.",
    cards: [
      { title: "Your Smile", lines: ["I still think your smile is one of the easiest things to like about you."] },
      { title: "The Little Things", lines: ["The random things you do, the little habits, the way you react to things... somehow those are the things I remember most."] },
      { title: "Your Personality", lines: ["You have your moments, obviously.", "But that's what makes you, you."] },
      { title: "The Way You Care", lines: ["You probably don't realize it sometimes, but you care about people more than you let on."] },
      { title: "You", lines: ["I don't think I need a complicated reason.", "You're just someone I'm glad I met."] },
    ],
    closing: "And yes... I still mean that.",
    button: "Keep going →",
  },

  timeline: {
    heading: "Things That Happened Along The Way",
    subheading: "Not everything has to last forever to mean something.",
    entries: [
      { title: "The Beginning", lines: ["Somewhere along the way, you became someone important to me."] },
      { title: "The Good Days", lines: ["There were days when everything felt easy.", "Just talking, laughing, doing absolutely nothing...", "and somehow that was enough."] },
      { title: "The Messy Parts", lines: ["Of course, it wasn't always perfect.", "We had our arguments, misunderstandings, and moments where neither of us really knew what we were doing."] },
      { title: "The Memories", lines: ["But even the messy parts became part of the story."] },
      { title: "Where We Are Now", lines: ["Things changed.", "We're not exactly the same two people anymore.", "But somehow, we still find ourselves here."] },
      { title: "Today", lines: ["And today isn't about what we used to be.", "It's simply about you.", "And the fact that I'm still glad you're here."] },
    ],
    button: "Almost there →",
  },

  gifts: {
    heading: "A Few Things I Want You To Remember",
    subheading: "Open them whenever you're ready.",
    openLabel: "Open me",
    sealInitial: "K",
    items: [
      { lines: ["You don't have to have everything figured out yet."] },
      { lines: ["Please don't forget to be kind to yourself."] },
      { lines: ["And if you ever forget...", "You matter more than you think."] },
    ],
    afterAll: "Okay. One last thing.",
    button: "One more →",
  },

  cake: {
    heading: "Make a wish, Kevia.",
    button: "Make a wish",
    after: [
      "I hope it comes true.",
      "Whatever it is.",
      "You deserve to have something good to look forward to.",
    ],
    buttonNext: "And finally →",
  },

  finalMessage: {
    lines: [

      { text: "And I guess that's all I wanted to say." },
      { text: "I know things between us are different now, and maybe neither of us really knows what the future looks like." },
      { text: "But I don't think we need to figure all of that out today." },
      { text: "Today is just your day." },
      { text: "And I wanted to make sure you knew that someone is still genuinely happy that you were born." },
      { text: "Thank you for all the conversations, the random moments, the stupid jokes, and all the little memories that somehow stayed with me." },
      { text: "Thank you for being part of my life, and thank you for still being here.", rest: true },
      { text: "I hope this year is kind to you.", rest: true },
      { text: "I hope you laugh a lot, find things that make you excited, and have more days where you feel happy with yourself.", rest: true },
      { text: "And whatever happens from here, I'll still be quietly rooting for you.", rest: true },
      { text: "Happy birthday, Kevia.", rest: true },
      { text: "I'm really glad you were born.", rest: true }

    ],
    finale: {
      big: "Happy Birthday, Kevia.",
      date: "October 8, 2006.",
      small: "I'm glad you're here.",
      care: "Take care of yourself, okay? I'll always want good things for you.",
      signature: "— from ur little boi.",
    },
  },
};

/* ============================================================
   Helpers
   ============================================================ */

const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const wait = (ms) => new Promise((res) => setTimeout(res, ms));
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ============================================================
   Screens + transitions
   ============================================================ */

const screens = {
  open: $("#screen-open"),
  unlock: $("#screen-unlock"),
  letter: $("#screen-letter"),
  appreciation: $("#screen-appreciation"),
  timeline: $("#screen-timeline"),
  gifts: $("#screen-gifts"),
  cake: $("#screen-cake"),
  final: $("#screen-final"),
};

let activeScreen = null;
let finalStarted = false;

function goTo(key) {
  const next = screens[key];
  if (!next || next === activeScreen) return;
  if (activeScreen) {
    activeScreen.classList.remove("active");
    activeScreen.setAttribute("aria-hidden", "true");
    unobserveScreen(activeScreen);
  }
  activeScreen = next;
  next.classList.add("active");
  next.removeAttribute("aria-hidden");
  next.scrollTop = 0;
  observeReveals(next);
  if (key === "final") startFinalSequence();
  setTimeout(() => next.focus({ preventScroll: true }), 700);
}

/* Reveal-on-scroll (also reveals content already in view on entry) */

const io = "IntersectionObserver" in window
  ? new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("revealed");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    )
  : null;

function observeReveals(screen) {
  const els = $$("[data-reveal]:not(.revealed)", screen);
  if (!io) { els.forEach((el) => el.classList.add("revealed")); return; }
  els.forEach((el) => io.observe(el));
}

function unobserveScreen(screen) {
  if (!io) return;
  $$("[data-reveal]", screen).forEach((el) => io.unobserve(el));
}

function unlockButton(btn) {
  btn.disabled = false;
  btn.classList.remove("gone");
}

/* ============================================================
   Rendering — every screen is built from birthdayConfig
   ============================================================ */

function renderOpen() {
  const c = birthdayConfig.opening;
  screens.open.innerHTML = `
    <div class="wrap screen-center">
      <div class="stack opening">
        <p class="display" data-reveal>${c.lines[0]}</p>
        ${c.lines.slice(1).map((l) => `<p class="dim" data-reveal>${l}</p>`).join("")}
        <div class="actions" data-reveal>
          <button class="btn" id="openBtn">${c.button}</button>
        </div>
        <p class="tiny italic dim2" data-reveal>${c.note}</p>
      </div>
    </div>`;
  $("#openBtn").addEventListener("click", () => goTo("unlock"));
}

function renderUnlock() {
  const c = birthdayConfig.unlock;
  screens.unlock.innerHTML = `
    <div class="wrap screen-center">
      <div class="stack">
        <h2 class="serif h2" data-reveal>${c.title}</h2>
        <p class="dim" data-reveal>${c.subtitle}</p>
        <div class="pin-block" data-reveal>
          <p class="pin-label">${c.label}</p>
          <div class="pin-boxes" id="pinBoxes">
            ${[0, 1, 2, 3].map(() => '<span class="pin-box"></span>').join("")}
            <input class="pin-hidden-input" id="pinInput" type="text" inputmode="numeric"
                   autocomplete="off" maxlength="4" aria-label="${c.label}" />
          </div>
          <div class="pin-feedback" id="pinFeedback" aria-live="polite"></div>
        </div>
      </div>
    </div>`;
  setupPin();
}

function renderLetter() {
  const c = birthdayConfig.letter;
  const paras = c.paragraphs
    .map((p, i) => `<p class="${i === 0 ? "salutation" : ""}" data-reveal>${p}</p>`)
    .join("");
  screens.letter.innerHTML = `
    <div class="wrap">
      <header class="sec-head" data-reveal>
        <h2 class="serif h1">${c.heading}</h2>
        <p class="sub">${c.subheading}</p>
      </header>
      <div class="letter">${paras}</div>
      <div class="orn" data-reveal><i></i></div>
      <div class="actions center" data-reveal>
        <button class="btn" id="toAppreciation">${c.button}</button>
      </div>
    </div>`;
  $("#toAppreciation").addEventListener("click", () => goTo("appreciation"));
}

function renderAppreciation() {
  const c = birthdayConfig.appreciation;
  const cards = c.cards
    .map(
      (card, i) => `
      <button class="ap-card" data-card="${i}" data-reveal aria-expanded="false">
        <span class="ap-head">
          <span class="ap-num">0${i + 1}</span>
          <span class="ap-title">${card.title}</span>
          <span class="ap-plus" aria-hidden="true"></span>
        </span>
        <span class="ap-body"><span class="ap-inner">
          ${card.lines.map((l) => `<span class="ap-line">${l}</span>`).join("")}
        </span></span>
      </button>`
    )
    .join("");
  screens.appreciation.innerHTML = `
    <div class="wrap">
      <header class="sec-head" data-reveal>
        <h2 class="serif h1">${c.heading}</h2>
        <p class="sub">${c.subheading}</p>
      </header>
      <div class="ap-list">${cards}</div>
      <p class="ap-closing" id="apClosing">${c.closing}</p>
      <div class="orn" data-reveal><i></i></div>
      <div class="actions center" data-reveal>
        <button class="btn gone" id="toTimeline" disabled>${c.button}</button>
      </div>
    </div>`;

  const opened = new Set();
  $$(".ap-card", screens.appreciation).forEach((card) => {
    card.addEventListener("click", () => {
      if (card.classList.contains("open")) return;
      card.classList.add("open");
      card.setAttribute("aria-expanded", "true");
      opened.add(card.dataset.card);
      if (opened.size === c.cards.length) {
        $("#apClosing").classList.add("show");
        unlockButton($("#toTimeline"));
      }
    });
  });
  $("#toTimeline").addEventListener("click", () => goTo("timeline"));
}

function renderTimeline() {
  const c = birthdayConfig.timeline;
  const entries = c.entries
    .map(
      (e, i) => `
      <li data-reveal>
        <h3 class="t-title">${e.title}</h3>
        ${e.lines.map((l) => `<p>${l}</p>`).join("")}
      </li>`
    )
    .join("");
  screens.timeline.innerHTML = `
    <div class="wrap">
      <header class="sec-head" data-reveal>
        <h2 class="serif h1">${c.heading}</h2>
        <p class="sub">${c.subheading}</p>
      </header>
      <ol class="timeline">${entries}</ol>
      <div class="orn" data-reveal><i></i></div>
      <div class="actions center" data-reveal>
        <button class="btn" id="toGifts">${c.button}</button>
      </div>
    </div>`;
  $("#toGifts").addEventListener("click", () => goTo("gifts"));
}

function renderGifts() {
  const c = birthdayConfig.gifts;
  const gifts = c.items
    .map(
      (g, i) => `
      <button class="gift" data-gift="${i}" data-reveal aria-expanded="false">
        <span class="gift-seal" aria-hidden="true"><span class="seal-initial">${c.sealInitial}</span></span>
        <span class="gift-fold"><span class="gift-label">${c.openLabel}</span></span>
        <span class="gift-body"><span class="gift-inner">
          ${g.lines.map((l) => `<span class="gift-line">${l}</span>`).join("")}
        </span></span>
      </button>`
    )
    .join("");
  screens.gifts.innerHTML = `
    <div class="wrap">
      <header class="sec-head" data-reveal>
        <h2 class="serif h1">${c.heading}</h2>
        <p class="sub">${c.subheading}</p>
      </header>
      <div class="gifts">${gifts}</div>
      <p class="gifts-after" id="giftsAfter">${c.afterAll}</p>
      <div class="orn" data-reveal><i></i></div>
      <div class="actions center" data-reveal>
        <button class="btn gone" id="toCake" disabled>${c.button}</button>
      </div>
    </div>`;

  const opened = new Set();
  $$(".gift", screens.gifts).forEach((gift) => {
    gift.addEventListener("click", () => {
      if (gift.classList.contains("opened")) return;
      gift.classList.add("opened");
      gift.setAttribute("aria-expanded", "true");
      opened.add(gift.dataset.gift);
      if (opened.size === c.items.length) {
        $("#giftsAfter").classList.add("show");
        unlockButton($("#toCake"));
      }
    });
  });
  $("#toCake").addEventListener("click", () => goTo("cake"));
}

/* ============================================================
   Unlock — the little secret
   ============================================================ */

function setupPin() {
  const input = $("#pinInput");
  const boxesEl = $("#pinBoxes");
  const boxes = $$(".pin-box", boxesEl);
  const feedback = $("#pinFeedback");
  let checking = false;

  input.addEventListener("focus", () => boxesEl.classList.add("focused"));
  input.addEventListener("blur", () => boxesEl.classList.remove("focused"));

  input.addEventListener("input", () => {
    const v = input.value.replace(/\D/g, "").slice(0, 4);
    input.value = v;
    boxes.forEach((b, i) => {
      b.textContent = v[i] || "";
      b.classList.toggle("filled", i < v.length);
    });
    if (v.length === 4 && !checking) setTimeout(() => checkPin(v), 260);
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && input.value.length === 4 && !checking) checkPin(input.value);
  });

  function checkPin(value) {
    checking = true;
    if (value === birthdayConfig.pin) {
      boxesEl.classList.add("correct");
      showFeedback(birthdayConfig.unlock.success, 900);
      (async () => {
        await wait(1900);
        startMusic(); // begins at 0:00, right here in the flow
        await wait(500);
        goTo("letter");
      })();
    } else {
      boxesEl.classList.add("shake");
      showFeedback(birthdayConfig.unlock.wrong, 350);
      (async () => {
        await wait(1650);
        boxesEl.classList.remove("shake");
        feedback.classList.remove("show");
        input.value = "";
        boxes.forEach((b) => { b.textContent = ""; b.classList.remove("filled"); });
        checking = false;
        input.focus();
      })();
    }
  }

  function showFeedback(lines, subDelay) {
    feedback.innerHTML = `
      <p class="pf-main">${lines[0]}</p>
      <p class="pf-sub" style="transition-delay:${subDelay}ms">${lines[1]}</p>`;
    requestAnimationFrame(() => requestAnimationFrame(() => feedback.classList.add("show")));
  }
}

/* ============================================================
   Music — starts from 0:00, always.
   Position is never saved anywhere (no localStorage/sessionStorage).
   ============================================================ */

const audio = $("#song");
const player = $("#player");
const playBtn = $("#playBtn");
const seek = $("#seek");
const tCur = $("#tCur");
const tDur = $("#tDur");
let scrubbing = false;

function fmtTime(s) {
  if (!isFinite(s) || s < 0) return "–:––";
  const m = Math.floor(s / 60);
  const ss = Math.floor(s % 60);
  return m + ":" + String(ss).padStart(2, "0");
}

function setPlaying(playing) {
  playBtn.classList.toggle("playing", playing);
  playBtn.setAttribute("aria-label", playing ? "Pause music" : "Play music");
}

function showPlayer() {
  if (!player.hidden) return;
  player.hidden = false;
  requestAnimationFrame(() => requestAnimationFrame(() => player.classList.add("show")));
}

function startMusic() {
  try { audio.currentTime = 0; } catch (e) { /* not loaded yet */ }
  const p = audio.play();
  if (p && p.catch) p.catch(() => { /* autoplay refused — the play button still works */ });
  showPlayer();
}

function initPlayer() {
  $("#playerTitle").textContent = birthdayConfig.music.playerLabel;
  audio.src = birthdayConfig.music.file;

  playBtn.addEventListener("click", () => {
    if (audio.paused) audio.play().catch(() => {});
    else audio.pause();
  });

  audio.addEventListener("play", () => setPlaying(true));
  audio.addEventListener("pause", () => setPlaying(false));
  audio.addEventListener("ended", () => {
    setPlaying(false);
    audio.currentTime = 0;
    seek.value = 0;
    seek.style.setProperty("--p", "0%");
    tCur.textContent = fmtTime(0);
  });

  const updateDuration = () => { tDur.textContent = fmtTime(audio.duration); };
  audio.addEventListener("loadedmetadata", updateDuration);
  audio.addEventListener("durationchange", updateDuration);

  audio.addEventListener("timeupdate", () => {
    if (scrubbing) return;
    const d = audio.duration;
    if (isFinite(d) && d > 0) {
      seek.value = Math.round((audio.currentTime / d) * 1000);
      seek.style.setProperty("--p", (audio.currentTime / d) * 100 + "%");
    }
    tCur.textContent = fmtTime(audio.currentTime);
  });

  audio.addEventListener("error", () => {
    console.warn("[music] Could not load:", birthdayConfig.music.file);
  });

  seek.addEventListener("pointerdown", () => { scrubbing = true; });
  window.addEventListener("pointerup", () => { scrubbing = false; });
  window.addEventListener("pointercancel", () => { scrubbing = false; });
  seek.addEventListener("input", () => {
    const d = audio.duration;
    if (isFinite(d) && d > 0) {
      audio.currentTime = (seek.value / 1000) * d;
      seek.style.setProperty("--p", seek.value / 10 + "%");
      tCur.textContent = fmtTime(audio.currentTime);
    }
  });
}

/* ============================================================
   Birthday cake — the wish
   ============================================================ */

function renderCake() {
  const c = birthdayConfig.cake;
  $("#cakeHeading").textContent = c.heading;
  $("#wishBtn").textContent = c.button;
  $("#cakeNext").textContent = c.buttonNext;

  $("#wishBtn").addEventListener("click", wish);
  $("#cakeNext").addEventListener("click", () => goTo("final"));
}

async function wish() {
  const wishBtn = $("#wishBtn");
  const cakeNext = $("#cakeNext");
  const scene = $("#cakeScene");
  const msgs = $("#cakeMsgs");

  wishBtn.disabled = true;
  wishBtn.classList.add("gone");

  const candles = $$(".candle", scene);
  candles.forEach((candle, i) => {
    setTimeout(() => candle.classList.add("out"), reducedMotion ? 0 : 420 + i * 300);
  });
  setTimeout(() => scene.classList.add("dim"), reducedMotion ? 0 : 1400);

  if (!reducedMotion) spawnConfetti();

  let delay = 0;
  birthdayConfig.cake.after.forEach((line, i) => {
    delay += reducedMotion ? 150 : i === 0 ? 2300 : 1900;
    setTimeout(() => {
      const p = document.createElement("p");
      p.className = "cake-msg";
      p.textContent = line;
      msgs.appendChild(p);
      requestAnimationFrame(() => requestAnimationFrame(() => p.classList.add("show")));
    }, delay);
  });

  setTimeout(() => unlockButton(cakeNext), delay + (reducedMotion ? 300 : 1900));
}

/* Subtle confetti — slow, few, palette-only */

function spawnConfetti() {
  const layer = $("#confetti");
  const colors = ["#B00000", "#8B0000", "#FFFFFF", "#B8B8B8"];
  for (let i = 0; i < 34; i++) {
    const p = document.createElement("i");
    const size = 3 + Math.random() * 4;
    p.style.cssText =
      `left:${Math.random() * 100}%;` +
      `width:${size.toFixed(1)}px;` +
      `height:${(size * (Math.random() < 0.5 ? 1 : 0.35)).toFixed(1)}px;` +
      `background:${colors[i % colors.length]};` +
      `border-radius:${Math.random() < 0.4 ? "50%" : "1.5px"};` +
      `animation-duration:${(4200 + Math.random() * 2600).toFixed(0)}ms;` +
      `animation-delay:${(Math.random() * 1400).toFixed(0)}ms;` +
      `--sway:${(Math.random() * 80 - 40).toFixed(0)}px;`;
    p.addEventListener("animationend", () => p.remove());
    layer.appendChild(p);
  }
  setTimeout(() => { layer.innerHTML = ""; }, 10000);
}

/* ============================================================
   Final message — text appears slowly, with pauses
   ============================================================ */

let finalLineEls = [];
let finalElEls = [];
let userTouchedFinal = false;

function renderFinal() {
  const c = birthdayConfig.finalMessage;
  const lines = c.lines
    .map((l) => `<p class="f-line${l.rest ? " rest" : ""}">${l.text}</p>`)
    .join("");
  screens.final.innerHTML = `
    <div class="wrap">
      <div class="final-lines">${lines}</div>
      <div class="finale">
        <div class="orn" data-f><i></i></div>
        <p class="finale-big" data-f>${c.finale.big}</p>
        <p class="finale-date" data-f>${c.finale.date}</p>
        <p class="finale-small" data-f>${c.finale.small}</p>
        <p class="finale-care serif italic" data-f>${c.finale.care}</p>
        <p class="signature" data-f>${c.finale.signature}</p>
      </div>
    </div>`;

  finalLineEls = $$(".f-line", screens.final);
  finalElEls = $$("[data-f]", screens.final);

  ["pointerdown", "wheel", "touchstart"].forEach((evt) =>
    screens.final.addEventListener(evt, () => { userTouchedFinal = true; }, { passive: true })
  );
}

function autoScrollFinal() {
  if (userTouchedFinal || reducedMotion) return;
  screens.final.scrollTo({ top: screens.final.scrollHeight, behavior: "smooth" });
}

function startFinalSequence() {
  if (finalStarted) return;
  finalStarted = true;

  let t = reducedMotion ? 0 : 1000;
  birthdayConfig.finalMessage.lines.forEach((line, i) => {
    setTimeout(() => { finalLineEls[i].classList.add("show"); autoScrollFinal(); }, t);
    t += reducedMotion ? 0 : line.rest ? 2700 : 1650;
  });

  t += reducedMotion ? 0 : 1500;
  finalElEls.forEach((el, i) => {
    t += reducedMotion ? 0 : i === 0 ? 500 : 950;
    setTimeout(() => { el.classList.add("show"); autoScrollFinal(); }, t);
  });
}

/* ============================================================
   Ambient motes — barely-there drifting dust
   ============================================================ */

function initMotes() {
  const canvas = $("#motes");
  const ctx = canvas.getContext("2d");
  let W = 0, H = 0, rafId = null, t = 0;

  const rand = () => ({
    x: Math.random(), y: Math.random(),
    r: 0.8 + Math.random() * 1.2,
    s: 0.05 + Math.random() * 0.14,
    ph: Math.random() * Math.PI * 2,
    red: Math.random() < 0.35,
  });
  const motes = Array.from({ length: 16 }, rand);

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function draw() {
    t += 0.016;
    ctx.clearRect(0, 0, W, H);
    for (const m of motes) {
      m.y -= m.s / H;
      if (m.y < -0.02) { Object.assign(m, rand()); m.y = 1.02; }
      const x = m.x * W + Math.sin(t * 0.5 + m.ph) * 8;
      const a = 0.05 + 0.05 * (Math.sin(t * 0.8 + m.ph) * 0.5 + 0.5);
      ctx.beginPath();
      ctx.arc(x, m.y * H, m.r, 0, Math.PI * 2);
      ctx.fillStyle = m.red ? `rgba(176,0,0,${a})` : `rgba(232,224,222,${a})`;
      ctx.fill();
    }
  }

  function loop() { draw(); rafId = requestAnimationFrame(loop); }
  function start() { if (rafId === null && !document.hidden && !reducedMotion) rafId = requestAnimationFrame(loop); }
  function stop() { if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null; } }

  resize();
  window.addEventListener("resize", resize);
  document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));
  if (reducedMotion) draw(); else start();
}

/* ============================================================
   Init
   ============================================================ */

function init() {
  renderOpen();
  renderUnlock();
  renderLetter();
  renderAppreciation();
  renderTimeline();
  renderGifts();
  renderCake();
  renderFinal();
  initPlayer();
  initMotes();

  activeScreen = screens.open;
  screens.open.classList.add("active");
  observeReveals(screens.open);
}

init();
