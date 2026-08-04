import re

css_path = r"c:\Users\Asus\Desktop\landing page\assets\css\style.css"
with open(css_path, "r", encoding="utf-8") as f:
    css = f.read()

# Parse all selectors and properties
# Find fixed px widths >= 280px
widths = re.findall(r"([.#a-zA-Z0-9_\-\s,>]+)\s*\{([^}]+)\}", css)

px_rules = []
for sel, body in widths:
    sel = sel.strip()
    if "@media" in sel:
        continue
    w_match = re.search(r"(?:^|;\s*)(width|min-width|max-width):\s*([0-9]+)px", body)
    grid_match = re.search(r"grid-template-columns:\s*([^;]+)", body)
    if w_match:
        prop, val = w_match.group(1), int(w_match.group(2))
        if val >= 280:
            px_rules.append((sel, prop, val))

print(f"Found {len(px_rules)} rules with px >= 280px:")
for sel, prop, val in px_rules:
    print(f"  {sel} -> {prop}: {val}px")
