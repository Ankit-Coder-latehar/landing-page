import os
import re

css_file = r"c:\Users\Asus\Desktop\landing page\assets\css\style.css"

with open(css_file, "r", encoding="utf-8") as f:
    content = f.read()

# Separate base CSS (outside @media) and media queries
# Let's inspect base CSS rules that don't have max-width media query overrides

print("--- CSS BLOCK ANALYSIS ---")
# Find grid-template-columns in base CSS
grid_cols = re.findall(r"(\.[a-zA-Z0-9_-]+)\s*\{[^}]*grid-template-columns:\s*([^;]+);", content)
print(f"Grid column rules ({len(grid_cols)} found):")
for selector, cols in grid_cols:
    print(f"  {selector} -> {cols.strip()}")

print("\n--- FLEX / FIXED WIDTH RULES ---")
flex_fixed = re.findall(r"(\.[a-zA-Z0-9_-]+)\s*\{[^}]*width:\s*([0-9]+px)", content)
for selector, w in flex_fixed:
    print(f"  {selector} -> width: {w}")

print("\n--- MIN-WIDTH RULES ---")
min_widths = re.findall(r"(\.[a-zA-Z0-9_-]+)\s*\{[^}]*min-width:\s*([^;]+);", content)
for selector, mw in min_widths:
    print(f"  {selector} -> min-width: {mw.strip()}")
