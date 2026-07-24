#!/usr/bin/env bash
# Cinema Mode — Chrome ve Firefox paketlerini üretir.
# Her çalıştırmada sürüm, o anki tarih-saatle damgalanır:
#   manifest "version"      → YYYY.M.D.HHMM   (tarayıcı kuralı: her parça ≤ 65535)
#   manifest "version_name" → YYYYMMDD.HHMMSS (Chrome'da kullanıcıya görünen tam damga)
# Kullanım: bash scripts/build.sh
# Çıktı:   dist/cinema-mode-<tarayici>-<damga>.zip
set -euo pipefail

KOK="$(cd "$(dirname "$0")/.." && pwd)"
cd "$KOK"

SURUM="$(date +%Y.%-m.%-d.%H%M)"
DAMGA="$(date +%Y%m%d.%H%M%S)"

mkdir -p dist

# Manifest sürümlerini damgala + zorunlu dosyaları doğrula
SURUM="$SURUM" DAMGA="$DAMGA" python3 - <<'PY'
import json, os, sys

surum, damga = os.environ["SURUM"], os.environ["DAMGA"]

for tarayici in ("chrome", "firefox"):
    yol = f"{tarayici}/manifest.json"
    manifest = json.load(open(yol))
    manifest["version"] = surum
    if tarayici == "chrome":
        manifest["version_name"] = damga
    json.dump(manifest, open(yol, "w"), indent=2, ensure_ascii=False)
    open(yol, "a").write("\n")

    eksik = []
    dosyalar = []
    bg = manifest.get("background", {})
    dosyalar += [bg.get("service_worker")] if "service_worker" in bg else bg.get("scripts", [])
    for cs in manifest.get("content_scripts", []):
        dosyalar += cs.get("js", [])
    dosyalar += list(manifest.get("icons", {}).values())
    if "options_ui" in manifest:
        dosyalar.append(manifest["options_ui"]["page"])
    if "default_locale" in manifest:
        dosyalar.append(f"_locales/{manifest['default_locale']}/messages.json")

    for d in dosyalar:
        if not os.path.exists(os.path.join(tarayici, d)):
            eksik.append(f"{tarayici}/{d}")

    if eksik:
        print("HATA — manifest'in işaret ettiği dosyalar eksik:", *eksik, sep="\n  ")
        sys.exit(1)
    print(f"{tarayici}: manifest OK — v{surum} ({damga})")
PY

for TARAYICI in chrome firefox; do
  CIKTI="dist/cinema-mode-$TARAYICI-$DAMGA.zip"
  rm -f "$CIKTI"
  (cd "$TARAYICI" && zip -r -q "../$CIKTI" . -x ".*")
  echo "Paket hazır: $CIKTI"
done
