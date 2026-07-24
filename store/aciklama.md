# Chrome Web Store — Başvuru Formu Metinleri

> Bu dosya mağazaya yüklenmez; Developer Dashboard'daki her alanı doldururken
> kopyala-yapıştır kaynağıdır. Görseller: `store/assets/` (üretici:
> `python3 scripts/make_store_assets.py`). Paket: `bash scripts/build.sh`.

---

## 1) Store listing (Mağaza kaydı)

### Ürün adı / Product name

- **English (varsayılan):** Cinema Mode
- **Türkçe:** Sinema Modu

### Özet / Summary — max 132 karakter

- **EN** (89): `Keeps the area you click on stage and dims the rest of the page. For focused reading.`
- **TR** (91): `Tıkladığın alanı sahnede bırakır, sayfanın geri kalanını karartır. Odaklı okuma için.`

### Açıklama / Description

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

SHORTCUTS

• Alt+Shift+S — toggle
• W / S — expand / shrink the area
• Q / E — darken / lighten the dimming
• R or click the dark area — pick a new area
• C — center the selected area
• , / . — decrease / increase padding
• H — hide the hint bar
• Esc or right-click — exit

Open source, MIT licensed. Also available for Firefox.
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

KISAYOLLAR

• Alt+Shift+S — aç / kapat
• W / S — alanı genişlet / daralt
• Q / E — karartmayı koyulaştır / aç
• R veya karanlığa tıklama — yeni alan seç
• C — seçili alanı ortala
• , / . — nefes payını azalt / artır
• H — ipucu çubuğunu gizle
• Esc veya sağ tık — çık

Açık kaynak, MIT lisanslı. Firefox için de mevcut.
```

### Kategori / Category

**Productivity → Tools** (alternatif: Accessibility)

### Dil / Language

Varsayılan **English**; ek yerelleştirme **Türkçe** (eklenti arayüzü `_locales`
ile zaten iki dilli).

### Grafik varlıklar / Graphic assets

| Alan | Boyut | Dosya |
|---|---|---|
| Store icon | 128×128 | `chrome/icons/icon128.png` |
| Screenshot 1 — odak modu | 1280×800 | `store/assets/screenshot-1-focus-1280x800.png` |
| Screenshot 2 — seçim modu | 1280×800 | `store/assets/screenshot-2-picking-1280x800.png` |
| Screenshot 3 — ayarlar | 1280×800 | `store/assets/screenshot-3-options-1280x800.png` |
| Small promo tile | 440×280 | `store/assets/promo-small-440x280.png` |
| Marquee promo tile | 1400×560 | `store/assets/promo-marquee-1400x560.png` |

> Not: Yayına almadan önce ekran görüntülerini gerçek yakalamalarla değiştirmek
> incelemede avantajdır; mevcut görseller ürün arayüzünün birebir stilize halidir.

### Ek alanlar / Additional fields

- **Homepage URL:** https://github.com/cememir/cinema-mode *(repo private olduğu sürece boş bırak)*
- **Support email:** cememir2017@gmail.com

---

## 2) Privacy (Gizlilik sekmesi)

### Single purpose description / Tek amaç açıklaması

- **EN:** `Dims everything on the page except the user-selected area, to enable distraction-free reading.`
- **TR:** `Sayfada kullanıcının seçtiği alan dışındaki her şeyi karartarak dikkat dağıtmayan okuma sağlar.`

### Permission justifications / İzin gerekçeleri

**`activeTab`**
- EN: `Needed to apply the dimming overlay in the tab where the user presses the shortcut or clicks the toolbar icon. Used only on explicit user action.`
- TR: `Kullanıcı kısayola bastığında ya da simgeye tıkladığında karartmayı o sekmede çizebilmek için gerekli. Yalnızca açık kullanıcı eylemiyle kullanılır.`

**`scripting`**
- EN: `Injects the overlay script into the active tab only when the user toggles the extension (toolbar click or keyboard shortcut). The script is never injected automatically.`
- TR: `Karartma betiğini yalnızca kullanıcı eklentiyi açtığında (simge tıklaması veya klavye kısayolu) aktif sekmeye enjekte eder. Betik hiçbir zaman kendiliğinden enjekte edilmez.`

**`storage`**
- EN: `Stores two visual preferences (dimming level, padding) locally in chrome.storage.local. Nothing else is stored; nothing leaves the device.`
- TR: `İki görsel tercihi (karartma, nefes payı) yerel chrome.storage.local'da saklar. Başka hiçbir şey saklanmaz; hiçbir veri cihazdan çıkmaz.`

**Host permissions**
- **Yok.** Manifest'te `host_permissions` ve `content_scripts` bulunmaz; erişim
  yalnızca `activeTab` üzerinden, kullanıcı hareketiyle sağlanır. Form bu alanı
  sormayacak — "Geniş Ana Makine İzinleri" uyarısı bu sayede oluşmaz.

### Remote code / Uzaktan kod

**No, I am not using remote code.** — Tüm kod pakete dahildir; CDN, eval veya
harici script yoktur.

### Data usage / Veri kullanımı

Hiçbir veri türü toplanmıyor — formdaki **tüm veri kategorilerini boş bırak** ve
üç beyanı işaretle:

- ✅ I do not sell or transfer user data to third parties, outside of the approved use cases
- ✅ I do not use or transfer user data for purposes that are unrelated to my item's single purpose
- ✅ I do not use or transfer user data to determine creditworthiness or for lending purposes

### Privacy policy URL

`PRIVACY.md` herkese açık bir adreste yayınlanmalı (repo public yapılınca):
`https://github.com/cememir/cinema-mode/blob/main/PRIVACY.md`

---

## 3) Distribution (Dağıtım sekmesi)

- **Visibility:** Public
- **Distribution:** All regions
- **Pricing:** Free

---

## 4) Yükleme / Upload

```bash
bash scripts/build.sh
# → dist/cinema-mode-chrome-<damga>.zip  → Dashboard'a bu dosya yüklenir
```

Firefox (addons.mozilla.org) için aynı metinler kullanılabilir;
paket: `dist/cinema-mode-firefox-<damga>.zip`.

AMO veri toplama beyanı manifest'te gömülü:
`browser_specific_settings.gecko.data_collection_permissions.required = ["none"]`
— kurulum ekranında "No data collected" rozeti gösterilir; formda ayrıca
veri kategorisi seçme (hiçbiri) dışında işlem gerekmez.
