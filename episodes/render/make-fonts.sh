#!/usr/bin/env bash
# Génère fonts.css (polices manuscrites encodées en base64) requis par egypte-render.html.
# Les .ttf et fonts.css sont ignorés par git : relancer ce script pour les régénérer.
set -euo pipefail
cd "$(dirname "$0")"

declare -A URLS=(
  [PermanentMarker-Regular.ttf]="https://raw.githubusercontent.com/google/fonts/main/apache/permanentmarker/PermanentMarker-Regular.ttf"
  [PatrickHand-Regular.ttf]="https://raw.githubusercontent.com/google/fonts/main/ofl/patrickhand/PatrickHand-Regular.ttf"
  [Bangers-Regular.ttf]="https://raw.githubusercontent.com/google/fonts/main/apache/bangers/Bangers-Regular.ttf"
)
for f in "${!URLS[@]}"; do
  [ -f "$f" ] || curl -sSL -o "$f" "${URLS[$f]}"
done

python3 - <<'PY'
import base64
faces = [("Permanent Marker",400,"PermanentMarker-Regular.ttf"),
         ("Patrick Hand",400,"PatrickHand-Regular.ttf"),
         ("Bangers",400,"Bangers-Regular.ttf")]
out=[]
for fam,wt,fn in faces:
    b64=base64.b64encode(open(fn,"rb").read()).decode()
    out.append("@font-face{font-family:'%s';font-weight:%d;font-style:normal;font-display:block;"
               "src:url(data:font/ttf;base64,%s) format('truetype');}"%(fam,wt,b64))
open("fonts.css","w").write("\n".join(out)+"\n")
print("fonts.css OK")
PY
