# 🎨 Charte graphique — « 1 Minute d'Histoire »

> **DA validée par le créateur : DOODLE FUNKY.** Tout nouvel épisode DOIT respecter ce style.
> Références : illustration dessinée main, funky/décalée (type zine, skate, Gabriel Alcala,
> David Shrigley), traits épais tremblés, couleurs plates franches.

## Le trait (le plus important)
- **Gros contours noirs (#26201a), épais** (stroke-width ≈ 6–7 sur le perso, 7 sur les objets).
- **Aspect tremblé « fait main »** via le filtre SVG `#wob`
  (`feTurbulence` + `feDisplacementMap`, scale ≈ 5) appliqué au personnage, aux objets et au décor.
- Coins arrondis (`stroke-linejoin/linecap: round`), pas de dégradés sur les formes → **aplats**.
- Imperfection assumée : rien de parfaitement symétrique ou vectoriel-propre. **Surtout pas façon corporate / PowerPoint.**

## Les personnages
- Style **doodle expressif et rigolo** : grosse tête, **gros yeux ronds** (blanc + grosse pupille),
  sourcils marqués, **grande bouche animée** qui s'ouvre/se ferme en parlant (dents + langue).
- Proportions décalées, corps simple, membres fins.
- Chaque personnage est **adapté au sujet** (pharaon avec nemes rayé + cobra + barbe ;
  Cléopâtre en reine grecque ; ouvriers ; etc.), toujours dans le même trait.
- Le perso **vit** : respiration, balancement, pupilles qui bougent, clignements, gestes du bras,
  petits sursauts de réaction à chaque nouvelle info.

## Le lettrage
- Titres : **Permanent Marker** (manuscrit, punchy).
- Texte courant : **Patrick Hand**.
- Gros chiffres/chocs : **Bangers**.
- (Polices intégrées via `render/fonts.css`, régénérable avec `render/make-fonts.sh`.)

## Couleurs
- Fond **sable jaune** plat (#f4dc80), pyramides + soleil au trait, sol légèrement plus foncé.
- Accents : rouge brique **#c0492f**, bleu **#2f6fb0**, or **#f2b632**, peau **#e0a45c**, teal **#2aa198**.
- Un accent de couleur par mot-clé (`.pop` rouge, `.pop2` bleu).

## Le script
- **Approfondi, raconté comme une histoire** — pas des puces de faits.
- Chaque sujet = **une mini-histoire en plusieurs temps** (3 beats), avec détails concrets,
  chiffres, cause/effet, anecdote qui surprend.
- Chaque phrase à l'écran est **illustrée par un objet/personnage** qui colle exactement au texte.
- Vérifier les faits sur ≥ 2 sources.

## Rythme & effets
- Vertical 9:16, ~8 s par beat, entrées rebondissantes.
- Poussière dorée, léger zoom (Ken Burns), vignette, ombres portées.

## Rendu
- Rendu **déterministe image par image** (`render/frames.js`) → durée exacte, 30 fps fluide.
- Parallélisé en 4 segments (filtre lourd) puis concaténé. Voir `render/README.md`.
