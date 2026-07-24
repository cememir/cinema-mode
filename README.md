# Cinema Mode

Click the part of a web page you want to read — it stays lit "on stage" while the rest fades to black.
Browser extension for **Chrome** and **Firefox** (Manifest V3). Fully offline: no data collection, no network requests ([privacy](PRIVACY.md)).

🇹🇷 Türkçe: [README.tr.md](README.tr.md)

## Install (developer mode)

- **Chrome:** `chrome://extensions` → Developer mode → *Load unpacked* → select the `chrome/` folder
- **Firefox:** `about:debugging#/runtime/this-firefox` → *Load Temporary Add-on* → select `firefox/manifest.json`

## Usage

Press **Alt+Shift+S** (or click the toolbar icon), then click an area.

| Key | Action |
|---|---|
| `W` / `S` | Expand / shrink the area |
| `Q` / `E` | Darken / lighten |
| `R` or click the dark | Pick a new area |
| `C` | Center the area |
| `,` / `.` | Padding − / + |
| `Esc` | Exit |

Settings are also available on the options page (right-click the icon → Options).

## Build

```bash
bash scripts/build.sh   # → dist/cinema-mode-{chrome,firefox}-<stamp>.zip
```

Version is auto-stamped at build time: `version` = `YYYY.M.D.HHMM`, `version_name` = `YYYYMMDD.HHMMSS`.

## Developers

- Cem Emir YÜKSEKTEPE — cememir2017@gmail.com
- Muslu YÜKSEKTEPE — musluyuksektepe@gmail.com

[MIT](LICENSE)
