import re

css_path = r"c:\Users\Asus\Desktop\landing page\assets\css\style.css"
with open(css_path, "r", encoding="utf-8") as f:
    css = f.read()

def find_rules(pattern):
    matches = re.findall(pattern, css)
    for m in matches:
        print(m[0])
        print(m[1])
        print("="*40)

print("--- MODAL CSS RULES ---")
find_rules(r"([.#a-zA-Z0-9_\-\s,>]*modal[.#a-zA-Z0-9_\-\s,>]*)\s*\{([^}]+)\}")

print("\n--- HEADER & NAV RULES ---")
find_rules(r"([.#a-zA-Z0-9_\-\s,>]*header[.#a-zA-Z0-9_\-\s,>]*)\s*\{([^}]+)\}")
