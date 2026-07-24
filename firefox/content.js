/**
 * Sinema Modu — içerik betiği
 *
 * Nasıl çalışıyor:
 *  1. Kısayola basınca "seçim" moduna geçer, imlecin altındaki öğe canlı önizlenir.
 *  2. Tıklayınca o öğe sahnede kalır, ekranın geri kalanı kararır.
 *  3. Karartma katmanı tek bir sabit div; içine clip-path ile delik açılıyor.
 *     Deliğin olduğu yerde tıklama/seçim sayfaya geçer, karanlık yerde geçmez.
 */
(() => {
  "use strict";

  if (window.__sinemaModuYuklendi) return;
  window.__sinemaModuYuklendi = true;

  /* ------------------------------------------------------------------ *
   * Ayarlar — zevkine göre buradan oynayabilirsin
   * ------------------------------------------------------------------ */
  const AYAR = {
    karartma: 0.88,        // odak modunda karanlığın koyuluğu (0–1)
    onizlemeOrani: 0.5,    // seçim modunda karartmanın kaçta kaçı uygulansın
    bosluk: 14,            // seçilen alanın etrafındaki nefes payı (px)
    kose: 12,              // deliğin köşe yuvarlaklığı (px)
    yumusaklik: 0.3,       // deliğin yeni yere kayma hızı (0–1, 1 = anında)
    vurgu: "#f0b45c"       // projeksiyon sarısı
  };

  const KEY = "sinema-modu-ayar";

  /* ------------------------------------------------------------------ *
   * Durum
   * ------------------------------------------------------------------ */
  let mode = "idle";        // idle | picking | focused
  let target = null;        // sahnedeki öğe
  let hover = null;         // seçim modunda imlecin altındaki öğe
  let dim = AYAR.karartma;
  let pad = AYAR.bosluk;
  let cur = null;           // ekrandaki güncel dikdörtgen (animasyon için)
  let raf = null;
  let sonKlip = "";
  let hudGizli = false;
  const yol = [];           // yukarı çıkarken bırakılan iz (geri inmek için)
  const mouse = { x: -1, y: -1 };

  /* ------------------------------------------------------------------ *
   * Arayüz (shadow DOM — sayfanın CSS'i buraya karışamasın diye)
   * ------------------------------------------------------------------ */
  const STIL = `
  * { box-sizing: border-box; margin: 0; }

  .wrap {
    position: fixed; inset: 0; pointer-events: none;
    opacity: 0; transition: opacity .18s ease;
    --dim: ${AYAR.karartma};
    --kose: ${AYAR.kose}px;
    --vurgu: ${AYAR.vurgu};
  }
  .wrap.on { opacity: 1; }

  .backdrop {
    position: fixed; inset: 0;
    background: rgb(6 5 4 / var(--dim));
    transition: background-color .12s linear, opacity .18s ease;
  }
  .wrap.focused .backdrop { pointer-events: auto; cursor: crosshair; }

  .catcher { position: fixed; inset: 0; display: none; cursor: crosshair; }
  .wrap.picking .catcher { display: block; pointer-events: auto; }

  .ring {
    position: fixed; top: 0; left: 0; width: 0; height: 0;
    border-radius: var(--kose); pointer-events: none;
    box-shadow: 0 0 0 1px rgb(255 255 255 / .10), 0 0 60px -12px rgb(240 180 92 / .35);
  }
  .wrap.picking .ring {
    box-shadow: 0 0 0 1.5px var(--vurgu), 0 0 40px -10px rgb(240 180 92 / .5);
  }

  .tag {
    position: absolute; left: 0; top: -22px;
    max-width: 60vw; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
    padding: 3px 7px; border-radius: 5px;
    background: var(--vurgu); color: #17130c;
    font: 600 11px/1.3 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    letter-spacing: .02em;
  }
  .wrap.focused .tag { display: none; }

  .hud {
    position: fixed; left: 50%; bottom: 20px; transform: translateX(-50%);
    display: flex; align-items: center; gap: 10px;
    padding: 7px 8px 7px 13px; border-radius: 999px;
    background: rgb(20 18 15 / .86);
    border: 1px solid rgb(255 255 255 / .09);
    box-shadow: 0 16px 44px -16px rgb(0 0 0 / .9);
    backdrop-filter: blur(14px) saturate(1.3);
    color: #e9e3d8; pointer-events: auto;
    font: 12px/1 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    opacity: .5; transition: opacity .2s ease;
    max-width: min(92vw, 720px);
  }
  .hud:hover { opacity: 1; }
  .hud.hidden { display: none; }

  .sel {
    color: var(--vurgu); font: 600 11px/1.3 ui-monospace, SFMono-Regular, Menlo, monospace;
    max-width: 220px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  }
  .hint { color: rgb(233 227 216 / .62); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .hint b { color: #e9e3d8; font-weight: 600; }
  .sep { width: 1px; height: 14px; background: rgb(255 255 255 / .12); flex: none; }

  .btn {
    all: unset; flex: none;
    width: 26px; height: 26px; border-radius: 50%;
    display: grid; place-items: center; cursor: pointer;
    color: rgb(233 227 216 / .7); font-size: 13px; line-height: 1;
    transition: background-color .12s ease, color .12s ease;
  }
  .btn:hover { background: rgb(255 255 255 / .1); color: #fff; }
  .btn:focus-visible { outline: 2px solid var(--vurgu); outline-offset: 1px; }

  @media (prefers-reduced-motion: reduce) {
    .wrap, .backdrop { transition: none; }
  }
  `;

  const h = (tag, cls, txt) => {
    const el = document.createElement(tag);
    if (cls) el.className = cls;
    if (txt != null) el.textContent = txt;
    return el;
  };

  const host = document.createElement("div");
  host.setAttribute("data-sinema-modu", "");
  host.style.cssText =
    "all:initial;display:block;position:fixed;inset:0;pointer-events:none;z-index:2147483647;";

  const sh = host.attachShadow({ mode: "open" });
  const styleEl = document.createElement("style");
  styleEl.textContent = STIL;

  const wrap = h("div", "wrap");
  const backdrop = h("div", "backdrop");
  const catcher = h("div", "catcher");
  const ring = h("div", "ring");
  const tagEl = h("span", "tag");
  const hud = h("div", "hud");
  const selEl = h("span", "sel", "—");
  const hintEl = h("span", "hint");
  const btnUp = h("button", "btn", "↑");
  const btnDown = h("button", "btn", "↓");
  const btnClose = h("button", "btn", "✕");

  btnUp.title = "Alanı genişlet (W)";
  btnDown.title = "Alanı daralt (S)";
  btnClose.title = "Çık (Esc)";

  ring.appendChild(tagEl);
  hud.append(selEl, h("span", "sep"), hintEl, btnUp, btnDown, btnClose);
  wrap.append(backdrop, catcher, ring, hud);
  sh.append(styleEl, wrap);

  const mount = () => {
    if (!host.isConnected) document.documentElement.appendChild(host);
  };

  /* ------------------------------------------------------------------ *
   * Geometri
   * ------------------------------------------------------------------ */
  const n = (v) => Math.round(v * 100) / 100;
  const vw = () => document.documentElement.clientWidth;
  const vh = () => document.documentElement.clientHeight;

  const destekPath =
    !!(window.CSS && window.CSS.supports &&
       window.CSS.supports("clip-path", 'path(evenodd, "M0 0 Z")'));

  function kutu(el) {
    const r = el.getBoundingClientRect();
    return { x: r.left - pad, y: r.top - pad, w: r.width + pad * 2, h: r.height + pad * 2 };
  }

  function yuvarlakYol(x, y, w, hh, r) {
    r = Math.max(0, Math.min(r, w / 2, hh / 2));
    if (!r) return `M${n(x)} ${n(y)}H${n(x + w)}V${n(y + hh)}H${n(x)}Z`;
    const x2 = x + w, y2 = y + hh;
    return (
      `M${n(x + r)} ${n(y)}H${n(x2 - r)}A${n(r)} ${n(r)} 0 0 1 ${n(x2)} ${n(y + r)}` +
      `V${n(y2 - r)}A${n(r)} ${n(r)} 0 0 1 ${n(x2 - r)} ${n(y2)}` +
      `H${n(x + r)}A${n(r)} ${n(r)} 0 0 1 ${n(x)} ${n(y2 - r)}` +
      `V${n(y + r)}A${n(r)} ${n(r)} 0 0 1 ${n(x + r)} ${n(y)}Z`
    );
  }

  function klip(r) {
    const W = vw(), H = vh();
    if (destekPath) {
      return `path(evenodd, "${yuvarlakYol(0, 0, W, H, 0)} ${yuvarlakYol(r.x, r.y, r.w, r.h, AYAR.kose)}")`;
    }
    // Yedek plan: köşeleri keskin dikdörtgen delik
    const p = (x, y) => `${n(x)}px ${n(y)}px`;
    return (
      `polygon(evenodd, ${p(0, 0)}, ${p(W, 0)}, ${p(W, H)}, ${p(0, H)}, ${p(0, 0)}, ` +
      `${p(r.x, r.y)}, ${p(r.x + r.w, r.y)}, ${p(r.x + r.w, r.y + r.h)}, ${p(r.x, r.y + r.h)}, ${p(r.x, r.y)})`
    );
  }

  /* ------------------------------------------------------------------ *
   * Çizim döngüsü
   * ------------------------------------------------------------------ */
  function tick() {
    raf = requestAnimationFrame(tick);
    if (mode === "idle") return;

    const el = mode === "picking" ? hover : target;

    if (!el || !el.isConnected) {
      if (mode === "focused") return kapat();          // öğe sayfadan silinmişse çık
      backdrop.style.clipPath = "none";
      backdrop.style.opacity = "1";
      ring.style.opacity = "0";
      cur = null;
      sonKlip = "";
      return;
    }

    const hedef = kutu(el);
    if (!cur) cur = { ...hedef };

    const k = mode === "picking" ? 0.45 : AYAR.yumusaklik;
    for (const key of ["x", "y", "w", "h"]) {
      const fark = hedef[key] - cur[key];
      cur[key] = Math.abs(fark) < 0.4 ? hedef[key] : cur[key] + fark * k;
    }

    ciz(cur);
  }

  function ciz(r) {
    const W = vw(), H = vh();
    const disarida = r.y + r.h < 4 || r.y > H - 4 || r.x + r.w < 4 || r.x > W - 4;

    // Hedef ekrandan çıktıysa karartmayı kaldır, kullanıcı karanlıkta kalmasın
    backdrop.style.opacity = disarida ? "0" : "1";
    backdrop.style.pointerEvents = disarida ? "none" : "";
    ring.style.opacity = disarida ? "0" : "1";
    if (disarida) return;

    const yeni = klip(r);
    if (yeni !== sonKlip) {
      backdrop.style.clipPath = yeni;
      sonKlip = yeni;
    }

    ring.style.transform = `translate3d(${n(r.x)}px, ${n(r.y)}px, 0)`;
    ring.style.width = n(r.w) + "px";
    ring.style.height = n(r.h) + "px";
    tagEl.style.top = r.y < 26 ? "calc(100% + 6px)" : "-22px";
  }

  /* ------------------------------------------------------------------ *
   * Öğe seçme
   * ------------------------------------------------------------------ */
  function noktadakiOge(x, y) {
    const liste = document.elementsFromPoint(x, y);
    for (const el of liste) {
      if (el === host || host.contains(el)) continue;
      if (el === document.documentElement || el === document.body) continue;
      return el;
    }
    return null;
  }

  // Satır içi / minicik öğe seçildiyse okunabilir bir bloğa kadar yukarı çık
  function duzelt(el) {
    let c = el, i = 0;
    while (c && c.parentElement && c !== document.body && i++ < 6) {
      const r = c.getBoundingClientRect();
      const d = getComputedStyle(c).display;
      const satirIci = d === "inline" || d === "contents";
      if (!satirIci && r.height >= 26 && r.width >= 50) break;
      c = c.parentElement;
    }
    return c;
  }

  function etiket(el) {
    if (!el) return "—";
    let s = el.tagName.toLowerCase();
    if (el.id) return s + "#" + el.id;
    const cls = (el.getAttribute("class") || "").trim().split(/\s+/).filter(Boolean)[0];
    return cls ? s + "." + cls : s;
  }

  /* ------------------------------------------------------------------ *
   * Mod geçişleri
   * ------------------------------------------------------------------ */
  function ac() {
    mount();
    mode = "picking";
    hover = mouse.x >= 0 ? noktadakiOge(mouse.x, mouse.y) : null;
    if (hover) hover = duzelt(hover);
    cur = null;
    sonKlip = "";
    guncelle();
    if (!raf) raf = requestAnimationFrame(tick);
  }

  function sec(el) {
    target = duzelt(el);
    yol.length = 0;
    mode = "focused";
    guncelle();
    const r = target.getBoundingClientRect();
    if (r.top < 0 || r.bottom > vh()) ortala();
  }

  function kapat() {
    mode = "idle";
    target = hover = cur = null;
    sonKlip = "";
    yol.length = 0;
    if (raf) { cancelAnimationFrame(raf); raf = null; }
    guncelle();
  }

  function guncelle() {
    wrap.classList.toggle("on", mode !== "idle");
    wrap.classList.toggle("picking", mode === "picking");
    wrap.classList.toggle("focused", mode === "focused");
    wrap.style.setProperty("--dim", String(mode === "picking" ? dim * AYAR.onizlemeOrani : dim));
    hud.classList.toggle("hidden", hudGizli || mode === "idle");

    if (mode === "picking") {
      selEl.textContent = etiket(hover);
      tagEl.textContent = etiket(hover);
      hintEl.textContent = "";
      hintEl.append(ipucu("Bir alana tıkla", ""), ipucu("Esc", "çık"));
    } else if (mode === "focused") {
      selEl.textContent = etiket(target);
      hintEl.textContent = "";
      hintEl.append(
        ipucu("W/S", "alan"),
        ipucu("Q/E", "ışık"),
        ipucu("R", "yeniden seç"),
        ipucu("C", "ortala"),
        ipucu("Esc", "çık")
      );
    }
  }

  function ipucu(tus, ne) {
    const f = document.createDocumentFragment();
    const b = document.createElement("b");
    b.textContent = tus;
    f.append(b);
    if (ne) f.append(document.createTextNode(" " + ne));
    f.append(document.createTextNode("   "));
    return f;
  }

  /* ------------------------------------------------------------------ *
   * Komutlar
   * ------------------------------------------------------------------ */
  function yukari() {
    if (mode !== "focused" || !target) return;
    const p = target.parentElement;
    if (!p || p === document.documentElement) return;
    yol.push(target);
    target = p;
    guncelle();
  }

  function asagi() {
    if (mode !== "focused" || !target) return;
    const son = yol[yol.length - 1];
    if (son && son.isConnected && target.contains(son) && son !== target) {
      target = yol.pop();
      guncelle();
      return;
    }
    yol.length = 0;
    let en = null, alan = 0;
    for (const c of target.children) {
      if (c === host) continue;
      const r = c.getBoundingClientRect();
      const a = r.width * r.height;
      if (a > alan) { alan = a; en = c; }
    }
    if (en) { target = en; guncelle(); }
  }

  function isik(delta) {
    dim = Math.min(0.97, Math.max(0.1, dim + delta));
    guncelle();
    kaydet();
  }

  function nefes(delta) {
    pad = Math.min(80, Math.max(0, pad + delta));
    kaydet();
  }

  function ortala() {
    if (!target) return;
    const r = target.getBoundingClientRect();
    if (r.height > vh() * 0.9) {
      window.scrollBy({ top: r.top - vh() * 0.08, behavior: "smooth" });
    } else {
      target.scrollIntoView({ block: "center", behavior: "smooth" });
    }
  }

  /* ------------------------------------------------------------------ *
   * Olaylar
   * ------------------------------------------------------------------ */
  window.addEventListener(
    "mousemove",
    (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    },
    { passive: true, capture: true }
  );

  catcher.addEventListener("mousemove", (e) => {
    const el = noktadakiOge(e.clientX, e.clientY);
    const yeni = el ? duzelt(el) : null;
    if (yeni !== hover) {
      hover = yeni;
      guncelle();
    }
  });

  catcher.addEventListener("mousedown", (e) => {
    e.preventDefault();
    e.stopPropagation();
  });

  catcher.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    const el = noktadakiOge(e.clientX, e.clientY);
    if (el) sec(el);
  });

  catcher.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    kapat();
  });

  // Karanlığa tıklayınca yeni alan seç
  backdrop.addEventListener("click", (e) => {
    if (mode !== "focused") return;
    e.preventDefault();
    e.stopPropagation();
    ac();
  });

  hud.addEventListener("click", (e) => {
    const b = e.target.closest && e.target.closest(".btn");
    if (!b) return;
    e.stopPropagation();
    if (b === btnUp) yukari();
    else if (b === btnDown) asagi();
    else kapat();
  });

  window.addEventListener(
    "keydown",
    (e) => {
      if (mode === "idle") return;

      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        kapat();
        return;
      }

      const ae = document.activeElement;
      if (ae && (ae.isContentEditable || /^(input|textarea|select)$/i.test(ae.tagName))) return;
      if (e.ctrlKey || e.metaKey) return;

      const k = e.key.toLowerCase();
      if (k === "w" || (e.altKey && e.key === "ArrowUp")) yukari();
      else if (k === "s" || (e.altKey && e.key === "ArrowDown")) asagi();
      else if (k === "q") isik(-0.06);
      else if (k === "e") isik(0.06);
      else if (k === "r") ac();
      else if (k === "c") ortala();
      else if (k === "h") { hudGizli = !hudGizli; guncelle(); }
      else if (k === "[" || k === ",") nefes(-6);
      else if (k === "]" || k === ".") nefes(6);
      else return;

      e.preventDefault();
      e.stopPropagation();
    },
    true
  );

  /* ------------------------------------------------------------------ *
   * Ayar hafızası + eklenti mesajı
   * ------------------------------------------------------------------ */
  function kaydet() {
    try {
      browser.storage.local.set({ [KEY]: { dim, pad } }).catch(() => {});
    } catch (e) {}
  }

  try {
    browser.storage.local.get(KEY).then((v) => {
      const a = v && v[KEY];
      if (!a) return;
      if (typeof a.dim === "number") dim = a.dim;
      if (typeof a.pad === "number") pad = a.pad;
      if (mode !== "idle") guncelle();
    }).catch(() => {});
  } catch (e) {}

  // Ayarlar sayfasından yapılan değişiklikleri açık sekmelere anında yansıt
  try {
    browser.storage.onChanged.addListener((degisenler, alan) => {
      if (alan !== "local" || !degisenler[KEY]) return;
      const a = degisenler[KEY].newValue;
      if (!a) return;
      if (typeof a.dim === "number") dim = a.dim;
      if (typeof a.pad === "number") pad = a.pad;
      if (mode !== "idle") guncelle();
    });
  } catch (e) {}

  browser.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
    if (msg && msg.type === "sinema-modu:toggle") {
      mode === "idle" ? ac() : kapat();
      sendResponse({ ok: true, mode });
    }
    return false;
  });
})();
