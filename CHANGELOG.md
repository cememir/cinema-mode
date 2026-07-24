# Changelog / Sürüm Notları

Version format / Sürüm formatı: `YYYYMMDD.HHMMSS` (manifest: `YYYY.M.D.HHMM`).

## [20260724.114818] — 2026-07-24

### Added / Eklendi
- Chrome + Firefox: right-click context menu item "Toggle Cinema Mode"
  (`contextMenus` permission) / Chrome + Firefox: sağ tuş menüsüne
  "Sinema Modu'nu aç / kapat" öğesi (`contextMenus` izni)

## [20260724.103251] — 2026-07-24

### Added / Eklendi
- First release: click an area to keep it lit on stage, the rest of the page dims
  / İlk sürüm: tıklanan alan sahnede kalır, sayfanın geri kalanı kararır
- Firefox port (MV3, `browser.*` promise API, event page) / Firefox portu
- Live preview while picking / Seçim sırasında canlı önizleme
- Keyboard: `Alt+Shift+S` toggle; `W/S` grow-shrink, `Q/E` dimming, `R` re-pick,
  `C` center, `,`/`.` padding, `H` hide HUD, `Esc` exit
- Options page (dimming, padding) — changes apply instantly to open tabs
  / Ayarlar sayfası — açık sekmelere anında yansır
- Settings memory (`storage.local`) / Ayar hafızası
- Turkish + English localization / Türkçe + İngilizce yerelleştirme
- Extension icons (16/32/48/128 px) / Eklenti ikonları
- Shadow DOM UI, single `clip-path` overlay / Shadow DOM arayüz, tek katman karartma

### Changed / Değişti
- Shortcut `Alt+Shift+O` → `Alt+Shift+S` (one-hand cluster / tek elle basılır)
- Overlay script is now injected on demand via `activeTab` — no `content_scripts`,
  no broad host permissions, faster Web Store review
  / Karartma betiği artık `activeTab` ile talep anında enjekte ediliyor —
  `content_scripts` ve geniş host izni yok, mağaza incelemesi hızlanır
