#!/usr/bin/env bash
# Génère fonts.css (polices Anton + Poppins encodées en base64) requis par egypte-render.html.
# Les .ttf et fonts.css sont ignorés par git : relancer ce script pour les régénérer.
set -euo pipefail
cd "$(dirname "$0")"

declare -A URLS=(
  [Anton-Regular.ttf]="https://raw.githubusercontent.com/google/fonts/main/ofl/anton/Anton-Regular.ttf"
  [Poppins-Bold.ttf]="https://raw.githubusercontent.com/google/fonts/main/ofl/poppins/Poppins-Bold.ttf"
  [Poppins-ExtraBold.ttf]="https://raw.githubusercontent.com/google/fonts/main/ofl/poppins/Poppins-ExtraBold.ttf"
)
for f in "${!URLS[@]}"; do
  [ -f "$f" ] || curl -sSL -o "$f" "${URLS[$f]}"
done

python3 - <<'PY'
import base64
faces = [("Anton",400,"Anton-Regular.ttf"),
         ("Poppins",800,"Poppins-ExtraBold.ttf"),
         ("Poppins",700,"Poppins-Bold.ttf")]
out=[]
for fam,wt,fn in faces:
    b64=base64.b64encode(open(fn,"rb").read()).decode()
    out.append("@font-face{font-family:'%s';font-weight:%d;font-style:normal;font-display:block;"
               "src:url(data:font/ttf;base64,%s) format('truetype');}"%(fam,wt,b64))
open("fonts.css","w").write("\n".join(out)+"\n")
print("fonts.css OK")
PY
