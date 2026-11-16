/* ============================================================
   jpkim · 개인 웹사이트
   - 사이트 문구는 아래 TEXT 한곳에서 고치면 됩니다 (ko / en).
   ============================================================ */

const TEXT = {
  ko: {
    title: "jpkim · 彼岸花",
    again: "다시 피우기",
    hello: "안녕하세요,",
    name: "jpkim입니다.",
    tagline: "천천히, 그러나 매해 다시 피어나듯 배우고 만듭니다.",
    caption: "higanbana · 저편 기슭의 꽃",
    cue: "소개",
    aboutTitle: "소개",
    aboutLead:
      "꽃과 잎은 서로 만나지 못하지만, 가을이 오면 둘 다 돌아옵니다. 저도 그런 마음으로 꾸준히 무언가를 배우고 기록하고 있습니다.",
    aboutP1:
      "이곳은 제 작은 정원입니다. 깃허브를 처음 만들고, 마크다운을 연습하고, AI와 함께 웹페이지를 만들어 배포하기까지의 과정을 이 페이지에 담았습니다.",
    aboutP2: "아직은 씨앗 단계지만, 하나씩 피워 나가려 합니다. 들러 주셔서 고맙습니다.",
    pathTitle: "지나온 길",
    step1: "깃허브 계정 만들기",
    step2: "마크다운 연습하기",
    step3: "클로드와 깃허브 연결하기",
    step4: "웹페이지 만들기",
    step5: "배포하기",
    credit: "피안화 장면은 CodePen #cpc-css-random 작품을 참고했습니다.",
  },
  en: {
    title: "jpkim · 彼岸花",
    again: "bloom again",
    hello: "Hello,",
    name: "I'm jpkim.",
    tagline: "Learning and making slowly, returning each season like the bloom.",
    caption: "higanbana · flower of the other shore",
    cue: "about",
    aboutTitle: "About",
    aboutLead:
      "The flower and the leaf never meet, yet every autumn both return. That is how I try to keep learning and writing things down.",
    aboutP1:
      "This is my small garden. It holds the path from opening a GitHub account and practicing Markdown to building and publishing a web page with the help of AI.",
    aboutP2: "It is still a seed for now, but I mean to let it bloom one step at a time. Thank you for stopping by.",
    pathTitle: "The path so far",
    step1: "Create a GitHub account",
    step2: "Practice Markdown",
    step3: "Connect Claude with GitHub",
    step4: "Build a web page",
    step5: "Publish it",
    credit: "The higanbana scene is adapted from a CodePen #cpc-css-random piece.",
  },
};

/* ---------- 언어 전환 ---------- */
const store = {
  get(k) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch {} },
};

function setLang(lang) {
  const t = TEXT[lang] || TEXT.ko;
  document.documentElement.lang = lang;
  document.title = t.title;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (t[key] != null) el.textContent = t[key];
  });
  document.querySelectorAll(".lang button").forEach((b) => {
    b.setAttribute("aria-pressed", String(b.dataset.lang === lang));
  });
  store.set("lang", lang);
}

document.querySelectorAll(".lang button").forEach((b) => {
  b.addEventListener("click", () => setLang(b.dataset.lang));
});

const browserLang = (navigator.language || "ko").toLowerCase().startsWith("ko") ? "ko" : "en";
setLang(TEXT[store.get("lang")] ? store.get("lang") : browserLang);

/* ---------- 피안화 들판 ---------- */
// CSS random()을 지원하면 CSS가 주사위를 굴리고, 아니면 여기서 굴립니다.
const cssRandom = window.CSS && CSS.supports && CSS.supports("order", "random(1, 2)");
const rand = (a, b) => a + Math.random() * (b - a);

function lilyCount() {
  const w = window.innerWidth;
  return w < 560 ? 36 : w < 1000 ? 50 : 64;
}

function plantField() {
  const field = document.querySelector(".field");
  const spirits = document.querySelector(".spirits");
  const lilies = document.createDocumentFragment();
  const motes = document.createDocumentFragment();

  for (let i = 0; i < lilyCount(); i++) {
    const lily = document.createElement("div");
    lily.className = "lily";
    lily.innerHTML =
      '<i class="stem"></i><svg class="head" viewBox="-62 -66 124 100"><use href="#bloom"/></svg>';
    if (!cssRandom) {
      // 먼 쪽이 더 빽빽하도록 깊이를 치우칩니다
      const depth = Math.pow(Math.random(), 1.4);
      const s = lily.style;
      s.setProperty("--x", Math.random());
      s.setProperty("--depth", depth);
      s.setProperty("--tall", Math.random());
      s.setProperty("--hue", rand(24, 36));
      s.setProperty("--lean", rand(-7, 7) + "deg");
      s.setProperty("--sway", rand(4, 9) + "s");
      // 지평선에서 내 쪽으로 차례로 피어납니다
      s.setProperty("--t", depth * 2.2 + rand(0, 0.9) + "s");
    }
    lilies.appendChild(lily);
  }

  for (let i = 0; i < 16; i++) {
    const mote = document.createElement("i");
    mote.className = "mote";
    if (!cssRandom) {
      const s = mote.style;
      s.setProperty("--mx", Math.random());
      s.setProperty("--my", Math.random());
      s.setProperty("--mz", Math.random());
      s.setProperty("--mo", Math.random());
      s.setProperty("--md", rand(9, 18) + "s");
      s.setProperty("--mw", rand(-3, 3) + "vw");
    }
    motes.appendChild(mote);
  }

  field.replaceChildren(lilies);
  spirits.replaceChildren(motes);
}

plantField();
document.querySelector(".again").addEventListener("click", plantField);

/* ---------- 상단 바 / 스크롤 등장 ---------- */
const topbar = document.querySelector(".topbar");
const onScroll = () => topbar.classList.toggle("scrolled", window.scrollY > window.innerHeight * 0.6);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

const revealables = document.querySelectorAll(".about-body > *");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("shown");
          io.unobserve(e.target);
        }
      });
    },
    { rootMargin: "0px 0px -10% 0px" }
  );
  revealables.forEach((el) => {
    el.classList.add("reveal");
    io.observe(el);
  });
}

document.querySelector(".year").textContent = new Date().getFullYear();
