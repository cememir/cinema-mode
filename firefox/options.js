/**
 * Sinema Modu — ayarlar sayfası
 * browser.storage.local üzerindeki "sinema-modu-ayar" anahtarını okur/yazar.
 * İçerik betiği aynı anahtarı storage.onChanged ile dinler, değişiklik
 * açık sekmelere anında yansır.
 */
(() => {
  "use strict";

  const KEY = "sinema-modu-ayar";
  const VARSAYILAN = { dim: 0.88, pad: 14 };

  const dimEl = document.getElementById("dim");
  const padEl = document.getElementById("pad");
  const dimVal = document.getElementById("dimVal");
  const padVal = document.getElementById("padVal");
  const kayit = document.getElementById("kayit");
  const sifirla = document.getElementById("sifirla");

  let kayitZamanlayici = null;

  /** Kaydırıcı değerlerini etiketlere yansıtır. */
  function goster() {
    dimVal.textContent = Number(dimEl.value).toFixed(2);
    padVal.textContent = padEl.value + " px";
  }

  /** Mevcut değerleri depoya yazar ve "Kaydedildi" bildirimi gösterir. */
  function kaydet() {
    browser.storage.local.set({
      [KEY]: { dim: Number(dimEl.value), pad: Number(padEl.value) }
    }).then(() => {
      kayit.classList.add("goster");
      clearTimeout(kayitZamanlayici);
      kayitZamanlayici = setTimeout(() => kayit.classList.remove("goster"), 1200);
    });
  }

  /** Depodaki ayarları forma yükler. */
  function yukle() {
    browser.storage.local.get(KEY).then((v) => {
      const a = (v && v[KEY]) || VARSAYILAN;
      dimEl.value = typeof a.dim === "number" ? a.dim : VARSAYILAN.dim;
      padEl.value = typeof a.pad === "number" ? a.pad : VARSAYILAN.pad;
      goster();
    });
  }

  dimEl.addEventListener("input", () => { goster(); kaydet(); });
  padEl.addEventListener("input", () => { goster(); kaydet(); });

  sifirla.addEventListener("click", () => {
    dimEl.value = VARSAYILAN.dim;
    padEl.value = VARSAYILAN.pad;
    goster();
    kaydet();
  });

  yukle();
})();
