import re

css_path = r"c:\Users\Asus\Desktop\landing page\assets\css\style.css"
with open(css_path, "r", encoding="utf-8") as f:
    css = f.read()

targets = [
    "top-ticker", "site-header", "header-container", "brand-logo", "header-logo-img",
    "nav-menu", "nav-item", "nav-link", "mega-dropdown", "header-actions", "hamburger-btn",
    "mobile-drawer-overlay", "mobile-drawer", "drawer-header", "drawer-menu", "drawer-close-btn"
]

print("--- NAV & HEADER CSS RULES IN BASE STYLES ---")
blocks = re.findall(r"([.#a-zA-Z0-9_\-\s,>]+)\s*\{([^}]+)\}", css)

for sel, body in blocks:
    sel_clean = sel.strip()
    if any(t in sel_clean for t in targets):
        print(f"SELECTOR: {sel_clean}")
        print(body.strip())
        print("-" * 50)
