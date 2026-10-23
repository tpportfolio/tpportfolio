# PROGRESS — QA antes de promover r36–r41
Última actualización: 2026-10-22
Etapa actual: 4 de 4 — r43 lista; falta el OK de Tomás para subir a `main`

## Hecho
- [Etapa 1] Nivel 0 sobre r41 — rama `release/r42-qa`.

- [Etapa 2] `qa/run.mjs` (Sonnet): barrido 17 rutas × 6 viewports × 4 variantes, interacciones, axe, comparación visual. Corridas completas sobre r41 (:3242) y producción.

## Pruebas ejecutadas
- `node run.mjs --base http://localhost:3242 --label r41` → 408 cargas, 0 errores de consola, 0 pedidos fallidos, 20/22 interacciones OK (2026-10-22)
- `node run.mjs --base https://tomaspero.vercel.app --label prod` → 1 error de hidratación React #418 en /work/agency-experience 390 (2026-10-22)
- `node run.mjs --compare r41 prod` → 312 pares de capturas (2026-10-22)
- Verificado a mano: Escape no cierra los popups de AI experiments (no hay handler); el desborde de /timeline a 360 no se reproduce sin emulación móvil (con isMobile la página queda a 370px de ancho: diferencia de 5px, confirmar en teléfono)
- `npm run lint` → 0 errores, 8 warnings (`<img>` en vez de `next/image` en magaiba y ai-experiments; script de Analytics inline en `app/layout.tsx` y `app/layoutv1.tsx`) (2026-10-22)
- `npm run typecheck` → OK (2026-10-22)
- `npm run build` → OK, 57 páginas (2026-10-22)
- Build servido con `next start -p 3242` (config `portfolio-r42-qa-prod` en `.claude/launch.json`)

## Pendiente de probar
- Barrido responsive (6 viewports × claro/oscuro × ES/EN), interacciones, axe, comparación visual contra producción.
- Safari iOS real: lo prueba Tomás en su teléfono.

- [Etapa 4] r43 (`release/r43-webapps-v2-fixes`): webapps v2, Escape en popups, botón de menú mobile, nombres de campos, sin scroll lateral en /timeline y Canva.
- `node run.mjs --label r43` → 0 errores de consola, 22/22 interacciones, 0 superposiciones, axe de las webapps en 0 tras el ajuste de radios de Canva (2026-10-22)
- `MSYS_NO_PATHCONV=1 node run.mjs --label r43b --routes /timeline,/canva_productora` → sin desborde horizontal (2026-10-22). Ojo: en Git Bash, `--routes` necesita MSYS_NO_PATHCONV=1.

## Decisiones tomadas en el camino
- `qa/` como paquete aparte con su propio Playwright — no toca el lockfile que usa Vercel ni el `node_modules` compartido con Acento — descartado: devDependency en el `package.json` del sitio.
- axe-core desde el lockfile existente — sin dependencia nueva — descartado: `@axe-core/playwright`.
- PLAN/PROGRESS en `qa/` y no en la raíz — el repo es público y la raíz ya tiene README/CHANGELOG.

- Webapps the8bureau a v2 (pedido de Tomás 2026-10-22) — se arman en el scratch y entran en r43 recién cuando termine la corrida del QA, para no cambiar el build que se está midiendo:
  - PDF Toolkit reconstruido con la piel v2 adentro de `/pdf_toolkit/` (`scratchpad/build_pdf/out`).
  - Canva Productora, Comparador de videos y Unyellower desde `the8bureau/public/tool-suite` (v2, 14/10) con la piel compartida en `/t8b/` (`scratchpad/t8b_v2`, script `scratchpad/t8b_v2.py`). `/tool-suite/` viejo queda intacto como respaldo.
  - Image Compare: no tenía versión v2 (el dashboard abre `fork_app`, de marzo, con la cabecera vieja). Se le hizo la misma adaptación que al PDF Toolkit: cabecera v2 (`components/bridge-chrome.tsx`) y ventana `.vw`; `body[data-t8b-tool="image-compare"]` (`scratchpad/build_cmp`).
  - Los dos React apps (PDF, Image Compare) usan la piel compartida `/t8b/`; se agregó una regla para el texto de la cabecera en oscuro, porque el `--muted` de shadcn es un color de fondo y dejaba los links casi negros.
  - Vista previa de las 5 en `scratchpad/t8b_v2` (servidor `t8b-v2-webapps-preview`, :3244).
  - Cabeceras: solo links a herramientas que existen en el portfolio (sin Prompt Studio, Shrink, YT-DLP ni Brand); "← the8bureau" va a `/work/ai-experiments`.

## Bloqueos / dudas abiertas
- Ninguno.

## Próximo paso
Con el OK de Tomás: backup de `main` y fast-forward a r43. Pendiente aparte: pasada de diseño (letra < 12px, botones < 44px, contraste) y Safari iOS real.
- r44 (`release/r44-home-calma`, home más calma): `node run.mjs --label r44b --quick` → 0 errores, 22/22 interacciones (2026-10-23). En r45 Clippy vuelve a estar desde el arranque y la prueba de Clippy vuelve a la de r43.
- r45 (`release/r45-home-ajustes`): `node run.mjs --label r45 --quick` → 0 errores, 22/22 interacciones, sin scroll lateral (2026-10-23).
- r46 (`release/r46-years-auto`): años desde agosto 2007 en todo el sitio, tarjetas de la home 5% más chicas. `node run.mjs --label r46 --quick` → 0 errores, 22/22 (2026-10-23).
- r47 (`release/r47-cards-tweak`): tarjetas de la home -3% de alto (alto mínimo) y letra -2 px con piso de 12 px (2026-10-23).
