# Sinema Modu

Web sayfasında okumak istediğin alana tıkla — o alan "sahnede" aydınlık kalır, geri kalanı kararır.
**Chrome** ve **Firefox** eklentisi (Manifest V3). Tamamen çevrimdışı: veri toplamaz, ağ isteği yapmaz ([gizlilik](PRIVACY.md)).

🇬🇧 English: [README.md](README.md)

## Kurulum (geliştirici modu)

- **Chrome:** `chrome://extensions` → Geliştirici modu → *Paketlenmemiş öğe yükle* → `chrome/` klasörünü seç
- **Firefox:** `about:debugging#/runtime/this-firefox` → *Geçici Eklenti Yükle* → `firefox/manifest.json` dosyasını seç

## Kullanım

**Alt+Shift+S**'ye bas (ya da araç çubuğu simgesine tıkla), sonra bir alana tıkla.

| Tuş | İşlev |
|---|---|
| `W` / `S` | Alanı genişlet / daralt |
| `Q` / `E` | Karartmayı koyulaştır / aç |
| `R` veya karanlığa tıklama | Yeni alan seç |
| `C` | Alanı ortala |
| `,` / `.` | Nefes payı − / + |
| `Esc` | Çık |

Ayarlar sayfasından da değiştirilebilir (simgeye sağ tık → Seçenekler).

## Paketleme

```bash
bash scripts/build.sh   # → dist/cinema-mode-{chrome,firefox}-<damga>.zip
```

Sürüm her pakette otomatik damgalanır: `version` = `YYYY.A.G.SSDD`, `version_name` = `YYYYAAGG.SSDDSS`.

## Geliştiriciler

- Cem Emir YÜKSEKTEPE — cememir2017@gmail.com
- Muslu YÜKSEKTEPE — musluyuksektepe@gmail.com

[MIT](LICENSE)
