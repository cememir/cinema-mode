# Firefox Add-ons (AMO) — Başvuru Formu Metinleri

> Bu dosya AMO'ya yüklenmez; https://addons.mozilla.org/developers/ üzerindeki
> her alanı doldururken kopyala-yapıştır kaynağıdır.
> Paket: `bash scripts/build.sh` → `dist/cinema-mode-firefox-<damga>.zip`

---

## 1) Upload (Yükleme adımı)

- **Dosya:** `dist/cinema-mode-firefox-<damga>.zip`
- **Kanal:** *On this site* (Listed) — AMO'da herkese açık yayın
- **Veri toplama beyanı:** manifest'te gömülü
  (`data_collection_permissions.required = ["none"]`) — form otomatik
  "No data collected" gösterir, ek seçim gerekmez.

---

### "Do you need to submit source code?" / Kaynak kodu gerekli mi?

**Hayır (No)** işaretle. Gerekçe: pakette küçültücü, kod üreteci, bundler
(webpack vb.) veya şablon motoru kullanılmıyor — tüm JS/HTML elle yazılmış
düz kod olarak zip'e giriyor; `build.sh` yalnızca sürüm damgalar ve zip'ler.
(`scripts/make_store_assets.py` sadece mağaza PNG'lerini üretir; koda dahil
edilen dosya üretmez.) Zip'teki kod = kaynak kod.

---

## 2) Describe Add-on (Tanım)

### Name / Ad

- **English (US):** Cinema Mode
- **Türkçe:** Sinema Modu

### Add-on URL (slug)

`cinema-mode` → https://addons.mozilla.org/firefox/addon/cinema-mode/

### Summary / Özet — max 250 karakter

- **EN:** `Keeps the area you click on stage and dims the rest of the page. Live preview while picking, fully interactive spotlight, keyboard controls. Works offline — no data collection, no tracking.`
- **TR:** `Tıkladığın alanı sahnede bırakır, sayfanın geri kalanını karartır. Seçerken canlı önizleme, tamamen etkileşimli sahne, klavye kontrolleri. Çevrimdışı çalışır — veri toplamaz, izlemez.`

### Description / Açıklama

**English:**

```
Cinema Mode helps you focus on just the part of a busy web page you are actually reading.

Press Alt+Shift+S, click the area you want to read — that area stays lit "on stage" while everything else fades to black. Ads, sidebars and recommendation boxes disappear into the dark.

FEATURES

• Live preview: as you move your cursor, you instantly see which block will be selected
• The lit area stays fully interactive: select text, click links, watch videos
• Clicks in the dark area never reach the page — no accidental distractions
• The spotlight follows the selected block as you scroll
• Grow/shrink the area with W/S, adjust dimming with Q/E, center with C
• Your settings are remembered; also adjustable from the options page
• Fully offline: no data collection, no network requests, no ads, no tracking
• Nothing runs until you activate it — the overlay script is injected only when you press the shortcut or click the toolbar button

SHORTCUTS

• Alt+Shift+S — toggle
• W / S — expand / shrink the area
• Q / E — darken / lighten the dimming
• R or click the dark area — pick a new area
• C — center the selected area
• , / . — decrease / increase padding
• H — hide the hint bar
• Esc or right-click — exit

Open source, MIT licensed. Also available for Chrome.
```

**Türkçe:**

```
Sinema Modu, kalabalık web sayfalarında yalnızca okuduğun bölüme odaklanmanı sağlar.

Alt+Shift+S'ye bas, sayfada okumak istediğin alana tıkla — o alan aydınlık "sahnede" kalır, geri kalan her şey kararır. Reklamlar, kenar çubukları, öneri kutuları karanlığa gömülür.

ÖZELLİKLER

• Canlı önizleme: imlecini gezdirdikçe hangi bloğun seçileceğini anında görürsün
• Aydınlık alan tamamen canlı: metin seçebilir, linke tıklayabilir, video izleyebilirsin
• Karanlık alandaki tıklamalar sayfaya geçmez — dikkat dağılmaz
• Kaydırdıkça karartma seçili bloğu takip eder
• W/S ile alanı büyüt/küçült, Q/E ile karartmayı ayarla, C ile ortala
• Ayarların hatırlanır; ayarlar sayfasından da değiştirilebilir
• Tamamen çevrimdışı çalışır: veri toplamaz, ağ isteği yapmaz, reklam ve izleme yoktur
• Sen etkinleştirene kadar hiçbir şey çalışmaz — betik yalnızca kısayola bastığında ya da simgeye tıkladığında enjekte edilir

KISAYOLLAR

• Alt+Shift+S — aç / kapat
• W / S — alanı genişlet / daralt
• Q / E — karartmayı koyulaştır / aç
• R veya karanlığa tıklama — yeni alan seç
• C — seçili alanı ortala
• , / . — nefes payını azalt / artır
• H — ipucu çubuğunu gizle
• Esc veya sağ tık — çık

Açık kaynak, MIT lisanslı. Chrome için de mevcut.
```

### Categories / Kategoriler

- **Birincil:** Appearance
- **İkincil (opsiyonel):** Other

### Support email / Destek e-postası

`cememir2017@gmail.com`

### Support website / Homepage

`https://github.com/cememir/cinema-mode` *(repo private olduğu sürece boş bırak)*

### License / Lisans

**MIT License** (listeden seç — özel metin gerekmez)

### Privacy policy / Gizlilik politikası

"This add-on has a privacy policy" işaretle, metin kutusuna:

```
Cinema Mode does not collect, store, or transmit any personal data.

- The extension runs entirely inside your browser and makes no network requests.
- The content of pages you visit is never read out, recorded, or sent anywhere.
- The only stored data is two visual preferences you choose (dimming level and padding). These values live solely in your own browser's local extension storage and never leave your device.
- No analytics, ads, tracking, or cookies.

---

Sinema Modu hiçbir kişisel veri toplamaz, saklamaz ve iletmez.

- Eklenti tamamen tarayıcınızın içinde çalışır; hiçbir sunucuya ağ isteği yapmaz.
- Ziyaret ettiğiniz sayfaların içeriği okunmaz, kaydedilmez, hiçbir yere iletilmez.
- Saklanan tek veri, seçtiğiniz iki görsel tercihtir (karartma koyuluğu ve nefes payı). Bu değerler yalnızca kendi tarayıcınızın yerel eklenti deposunda tutulur ve cihazınızdan dışarı çıkmaz.
- Analitik, reklam, izleme veya çerez kullanılmaz.

Contact / İletişim: cememir2017@gmail.com
```

---

## 3) Images (Görseller)

| Alan | Öneri | Dosya |
|---|---|---|
| Add-on icon | 128×128 | `firefox/icons/icon128.png` |
| Screenshot 1 — odak modu | 1280×800 | `store/assets/screenshot-1-focus-1280x800.png` |
| Screenshot 2 — seçim modu | 1280×800 | `store/assets/screenshot-2-picking-1280x800.png` |
| Screenshot 3 — ayarlar | 1280×800 | `store/assets/screenshot-3-options-1280x800.png` |

---

## 4) Additional details (Ek ayrıntılar)

- **Tags:** `reading`, `focus`, `dark`, `spotlight`, `distraction-free`
- **Experimental?** Hayır
- **Requires payment?** Hayır
- **This add-on requires the following:** hiçbir kutu işaretlenmez

### Version notes / Sürüm notları

**EN:**
```
First release. Spotlight reading mode: click an area to keep it lit, the rest of the page dims. Live-preview picking, keyboard controls, options page, tr/en locales. No data collection; the overlay script is injected only on explicit user action (activeTab).
```

**TR:**
```
İlk sürüm. Sahne ışığı okuma modu: tıklanan alan aydınlık kalır, sayfanın geri kalanı kararır. Canlı önizlemeli seçim, klavye kontrolleri, ayarlar sayfası, tr/en yerelleştirme. Veri toplanmaz; betik yalnızca açık kullanıcı eylemiyle enjekte edilir (activeTab).
```

### Notes to Reviewer / İncelemeci notları

```
- No data collection (data_collection_permissions: none). No network requests of any kind.
- No content_scripts and no host permissions: the overlay script (content.js) is injected only on explicit user action (toolbar click or Alt+Shift+S) via activeTab + scripting.executeScript.
- All code is plain, unminified, hand-written JavaScript — no bundler, no build step, no third-party libraries, no remote code.
- The UI lives in a shadow DOM overlay; it reads element geometry (getBoundingClientRect) only to draw the dimming mask and never reads or stores page content.
- storage.local holds exactly two numbers: dimming opacity and padding.
- Source repository: https://github.com/cememir/cinema-mode (can be made available on request).
```

---

## 5) Distribution / Dağıtım

- **Firefox** ve **Firefox for Android** işaretli (manifest: masaüstü min 140,
  Android min 142 — `gecko_android` bloğu)
- **Ücretsiz**, tüm bölgeler
