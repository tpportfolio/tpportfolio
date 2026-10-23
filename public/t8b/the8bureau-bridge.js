(() => {
  const body = document.body;
  if (!body) return;

  // Misma receta que /retro: una sola llave compartida + data-visual-mode en <html>.
  const RETRO_KEY = "t8b.retro.visual-mode.choice";
  const engine = body.dataset.t8bThemeEngine || "data-theme";
  const storageKey = body.dataset.t8bThemeStorage || "t8b_tool_theme";

  // Header construido por JS para las apps React (pdf/brand): insertarlo en el
  // HTML estatico romperia la hidratacion, asi que se antepone tras la carga.
  // Mismo markup y clases que las cabeceras fijas de las 6 estaticas.
  const BACK = "the8bureau";
  const ARROW = "←";
  const SIBLINGS = [
    ["Canva", "/canva_productora"],
    ["Compare", "/comparador_videos"],
    ["Unyellow", "/unyellower"],
    ["Images", "/comparador_imagenes"],
    ["PDF", "/pdf_toolkit"],
  ];
  const TOOL_META = {
    "pdf-toolkit": {
      title: "PDF <em>TOOLKIT</em>",
      tagline: "Local PDF toolkit: convert, merge and split, fully in your browser.",
      chips: ["Static", "Browser-side", "PDF"],
      self: "/pdf_toolkit",
      modeSwitch: true,
      infoTitle: "PDF TOOLKIT",
      info: "Convierte PDF a PNG/JPG con calidad ajustable, combina 2 PDF en 1 imagen, uni\u00F3n de varios PDF en uno y descarga en ZIP. Procesamiento 100% local en tu navegador, sin subir archivos.",
    },
    "brand-analyzer": {
      title: "BRAND <em>ANALYZER</em>",
      tagline: "Brand identity analyzer and restyler.",
      chips: ["Static", "Browser-side", "React"],
      self: "/tool-suite/brand-analyzer/index.html",
      modeSwitch: true,
    },
  };

  const buildHeader = () => {
    const meta = TOOL_META[body.dataset.t8bTool];
    if (!meta || document.querySelector(".t8b-bridge-wrap")) return;
    const mk = (tag, cls, text) => {
      const n = document.createElement(tag);
      if (cls) n.className = cls;
      if (text != null) n.textContent = text;
      return n;
    };
    const wrap = mk("div", "t8b-bridge-wrap");
    const header = mk("div", "t8b-bridge-header");
    const brand = mk("div", "t8b-bridge-brand");
    const logo = mk("div", "t8b-bridge-logo", "8");
    logo.setAttribute("aria-hidden", "true");
    const lockup = mk("div", "t8b-bridge-lockup");
    const h1 = mk("h1", null, BACK);
    const title = mk("p", "t8b-bridge-title");
    title.innerHTML = meta.title;
    const tagline = mk("p", "t8b-bridge-tagline", meta.tagline);
    lockup.append(h1, title, tagline);
    brand.append(logo, lockup);
    const side = mk("div", "t8b-bridge-side");
    const links = mk("div", "t8b-bridge-links");
    const home = document.createElement("a");
    home.setAttribute("href", "/work/ai-experiments");
    home.textContent = ARROW + " " + BACK;
    links.append(home);
    SIBLINGS.forEach(([label, href]) => {
      if (href === meta.self) return;
      const a = document.createElement("a");
      a.setAttribute("href", href);
      a.textContent = label;
      links.append(a);
    });
    side.append(links);
    if (meta.modeSwitch) {
      const group = mk("div", "t8b-bridge-slider");
      group.setAttribute("role", "group");
      group.setAttribute("aria-label", "Visual mode");
      const labD = mk("span", "t8b-bridge-slider-label", "Dark");
      labD.setAttribute("data-side", "dark");
      const btn = mk("button", "t8b-bridge-slider-btn");
      btn.setAttribute("type", "button");
      btn.setAttribute("data-state", "terminal");
      btn.setAttribute("aria-label", "Toggle visual mode");
      const track = mk("span", "t8b-bridge-slider-track");
      track.append(mk("span", "t8b-bridge-slider-thumb"));
      btn.append(track);
      const labL = mk("span", "t8b-bridge-slider-label", "Light");
      labL.setAttribute("data-side", "light");
      group.append(labD, btn, labL);
      side.append(group);
    }
    header.append(brand, side);
    wrap.append(header);
    const chips = mk("div", "t8b-bridge-chips");
    meta.chips.forEach((c) => chips.append(mk("span", "t8b-bridge-chip", c)));
    wrap.append(chips);
    document.body.prepend(wrap);
    // Popup informativo (nombre + descripcion) tras el header. Solo React
    // sin marco fijo: en estaticas el marco ya esta en el HTML.
    // Popup informativo solo si NO hay marco nativo (pdf ya trae su section.vw).
    if (meta.infoTitle && meta.info && !document.querySelector("section.vw")) {
      const sec = mk("section", "vw");
      sec.setAttribute("aria-label", meta.infoTitle);
      const bar = mk("header", "vw-bar");
      const dots = mk("span", "vw-dots");
      dots.setAttribute("aria-hidden", "true");
      dots.append(mk("i"), mk("i"), mk("i"));
      const tbox = mk("span", "vw-title-box");
      const tin = mk("span", "vw-title-in");
      tin.append(mk("span", "vw-title", meta.infoTitle));
      tbox.append(tin);
      bar.append(dots, tbox, mk("span", "vw-meta", "STATIC"));
      const bdy = mk("div", "vw-body");
      bdy.append(mk("p", "vw-video-desc", meta.info));
      const foot = mk("footer", "vw-foot");
      foot.append(mk("span", null, "BROWSER"), mk("span", null, "HTML"));
      sec.append(bar, bdy, foot);
      wrap.after(sec);
    }
  };

  const store = {
    get(k) {
      try {
        return window.localStorage.getItem(k);
      } catch {
        return null;
      }
    },
    set(k, v) {
      try {
        window.localStorage.setItem(k, v);
      } catch {}
    },
  };

  const engineState = () => {
    if (engine === "class-light") return document.documentElement.classList.contains("light") ? "light" : "terminal";
    if (engine === "body-dark") return document.body.classList.contains("theme-dark") ? "terminal" : "light";
    if (engine === "data-mode") return document.documentElement.getAttribute("data-mode") === "terminal" ? "terminal" : "light";
    if (engine === "class-dark") return document.documentElement.classList.contains("dark") ? "terminal" : "light";
    return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "terminal";
  };

  const syncSwitch = (mode) => {
    const side = mode === "light" ? "light" : "dark";
    document.querySelectorAll(".t8b-bridge-slider-btn").forEach((btn) => {
      btn.classList.toggle("is-light", mode === "light");
      btn.setAttribute("data-state", mode === "light" ? "light" : "terminal");
      btn.setAttribute("aria-pressed", mode === "light" ? "true" : "false");
    });
    document.querySelectorAll(".t8b-bridge-slider").forEach((sw) => {
      sw.querySelectorAll(".t8b-bridge-slider-label").forEach((lb) => {
        lb.classList.toggle("is-active", lb.getAttribute("data-side") === side);
      });
    });
  };

  const bindSwitch = () => {
    document.querySelectorAll(".t8b-bridge-slider-btn").forEach((btn) => {
      if (btn.dataset.t8bBound) return;
      btn.dataset.t8bBound = "1";
      btn.addEventListener("click", () => {
        apply(engineState() === "light" ? "terminal" : "light");
      });
    });
  };

  const apply = (mode) => {
    const next = mode === "light" ? "light" : "terminal";
    if (engine === "class-light") {
      document.documentElement.classList.toggle("light", next === "light");
    } else if (engine === "body-dark") {
      document.body.classList.toggle("theme-dark", next !== "light");
      const native = document.getElementById("theme-toggle");
      if (native) {
        native.textContent = next === "light" ? "Dark mode" : "Light mode";
        native.setAttribute("aria-pressed", next !== "light" ? "true" : "false");
      }
    } else if (engine === "data-mode") {
      document.documentElement.setAttribute("data-mode", next === "light" ? "light" : "terminal");
    } else if (engine === "class-dark") {
      // pdf-toolkit: su CSS usa .dark y :root:not(.light); se fijan ambas.
      document.documentElement.classList.toggle("dark", next !== "light");
      document.documentElement.classList.toggle("light", next === "light");
    } else {
      document.documentElement.setAttribute("data-theme", next === "light" ? "light" : "dark");
    }
    document.documentElement.dataset.visualMode = next === "light" ? "light" : "dark";
    store.set(storageKey, next === "light" ? "light" : "dark");
    store.set(RETRO_KEY, next === "light" ? "light" : "dark");
    syncSwitch(next);
  };

  const ensureCss = () => {
    if (document.querySelector('link[data-t8b-bridge-css]')) return;
    const link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("href", "/t8b/the8bureau-bridge.css?v=v2");
    link.setAttribute("data-t8b-bridge-css", "");
    document.head.appendChild(link);
  };

  // En apps React (brand) su propio efecto de tema puede pisar el nuestro
  // despues de hidratar: se vigila <html> y se re-afirma la eleccion guardada.
  const watchTheme = () => {
    const tool = body.dataset.t8bTool;
    if (tool !== "brand-analyzer" && tool !== "pdf-toolkit") return;
    if (typeof MutationObserver === "undefined") return;
    let guard = false;
    new MutationObserver(() => {
      if (guard) return;
      const want = store.get(RETRO_KEY) || store.get(storageKey);
      if (!want) return;
      const wantMode = want === "light" ? "light" : "terminal";
      if (engineState() !== wantMode) {
        guard = true;
        apply(want);
        setTimeout(() => { guard = false; }, 0);
      }
    }).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme", "class"] });
  };

  const start = () => {
    // En apps React el CSS entra tarde para no romper la hidratación.
    if (body.dataset.t8bBridgeApply === "load") ensureCss();
    buildHeader();
    const stored = store.get(RETRO_KEY) || store.get(storageKey);
    if (stored === "light" || stored === "dark" || stored === "terminal") {
      apply(stored);
    } else {
      // Sin elección guardada: no forzar nada, solo reflejar el estado actual.
      syncSwitch(engineState());
    }
    bindSwitch();
    watchTheme();
  };

  if (body.dataset.t8bBridgeApply === "load") {
    window.addEventListener("load", start, { once: true });
  } else {
    start();
  }

  bindSwitch();
})();
