# 🎥 Rendu MP4 — pipeline

Transforme une animation HTML (`*-render.html`) en vrai fichier **MP4 1080×1920** (9:16), sans montage.

## Prérequis (déjà présents dans l'environnement web)
- **Node + Playwright** (navigateur Chromium) → enregistre l'animation en `.webm`
- **ffmpeg** (via `imageio-ffmpeg`) → convertit le `.webm` en `.mp4` H.264

Installer ffmpeg si besoin :
```bash
pip3 install imageio-ffmpeg
FF=$(python3 -c "import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())")
```

## Générer une vidéo
```bash
cd episodes/render
export NODE_PATH=/opt/node22/lib/node_modules

# 1) Enregistrer l'animation (61 s) → webm dans out/
node record.js france-render.html out 61000

# 2) Convertir en MP4 propre de 60 s
WEBM=$(ls out/*.webm | head -1)
"$FF" -y -ss 0.20 -i "$WEBM" -t 60 \
  -c:v libx264 -pix_fmt yuv420p -profile:v high -level 4.0 \
  -preset medium -crf 20 -movflags +faststart -r 30 \
  -vf "scale=1080:1920:flags=lanczos" france.mp4
```

Le fichier `france.mp4` est prêt pour YouTube Shorts / TikTok / Reels.

## Pour un nouvel épisode
1. Copier `france-render.html` en `japon-render.html` et changer le contenu (dates, textes, drapeaux).
2. Relancer les 2 commandes ci-dessus en remplaçant `france` par `japon`.

## Ajouter la voix off + musique
Le MP4 est muet (visuel seul). Dans **CapCut** : importer le MP4, ajouter la voix off
(script dans `../france-script.md`) et une musique libre de droits, puis exporter.

> Les fichiers `.mp4`, `.webm` et `out/` sont ignorés par git (voir `.gitignore`) — on versionne le pipeline, pas les rendus.
