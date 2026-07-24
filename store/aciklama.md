# Chrome Web Store Mağaza Metinleri

> Bu dosya mağazaya yüklenmez; başvuru formunu doldururken kopyala-yapıştır kaynağıdır.

## Kısa açıklama (max 132 karakter)

**TR:** Tıkladığın alanı sahnede bırakır, sayfanın geri kalanını karartır. Odaklı okuma için.

**EN:** Keeps the area you click on stage and dims the rest of the page. For focused reading.

## Uzun açıklama — Türkçe

Sinema Modu, kalabalık web sayfalarında yalnızca okuduğun bölüme odaklanmanı sağlar.

Alt+Shift+S'ya bas, sayfada okumak istediğin alana tıkla — o alan aydınlık "sahnede" kalır, geri kalan her şey kararır. Reklamlar, kenar çubukları, öneri kutuları karanlığa gömülür.

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

## Uzun açıklama — English

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

## Kategori

Productivity / Verimlilik — Accessibility de uygun ikinci seçenek.

## Görsel varlık listesi (başvuru öncesi hazırla)

| Varlık | Boyut | Durum |
|---|---|---|
| Mağaza ikonu | 128×128 PNG | ✅ `icons/icon128.png` |
| Ekran görüntüsü (1–5 adet) | 1280×800 veya 640×400 | ⬜ çekilecek |
| Küçük promo karosu (opsiyonel) | 440×280 | ⬜ |
| Marquee promo (opsiyonel) | 1400×560 | ⬜ |

Ekran görüntüsü önerisi: bir haber sitesinde (1) seçim modu canlı önizleme,
(2) odak modu + HUD, (3) ayarlar sayfası.

## Başvuru notları

- **Gizlilik politikası:** depoda `PRIVACY.md` — herkese açık bir URL'de yayınla
  (GitHub repo linki yeterli) ve formda o URL'yi ver.
- **İzin gerekçeleri** formda sorulur; `PRIVACY.md` içindeki tablodan kopyala.
- **Tek amaç (single purpose) açıklaması:** "Sayfanın seçilen bölümü dışını
  karartarak odaklı okuma sağlamak."
- Paket: `bash scripts/build.sh` → `dist/cinema-mode-{chrome,firefox}-<damga>.zip`
