(() => {
  const body = document.body;
  if (!body) return;

  const engine = body.dataset.t8bThemeEngine || "data-theme";
  const storageKey = body.dataset.t8bThemeStorage || "t8b_tool_theme";
  const buttons = Array.from(document.querySelectorAll(".t8b-bridge-mode-btn"));

  const syncButtons = (mode) => {
    buttons.forEach((button) => {
      const target = button.getAttribute("data-mode");
      button.classList.toggle("is-active", target === mode);
      button.setAttribute("aria-pressed", target === mode ? "true" : "false");
    });
  };

  const apply = (mode) => {
    const next = mode === "light" ? "light" : "terminal";
    if (engine === "class-light") {
      document.documentElement.classList.toggle("light", next === "light");
    } else {
      document.documentElement.setAttribute("data-theme", next === "light" ? "light" : "dark");
    }
    try {
      window.localStorage.setItem(storageKey, next === "light" ? "light" : "dark");
    } catch {}
    syncButtons(next);
  };

  const initialRaw = (() => {
    try {
      return window.localStorage.getItem(storageKey);
    } catch {
      return null;
    }
  })();

  if (initialRaw === "light") {
    apply("light");
  } else if (engine === "class-light") {
    apply(document.documentElement.classList.contains("light") ? "light" : "terminal");
  } else {
    apply(document.documentElement.getAttribute("data-theme") === "light" ? "light" : "terminal");
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      apply(button.getAttribute("data-mode") === "light" ? "light" : "terminal");
    });
  });
})();
