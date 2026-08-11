import os
import re

root_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))

has_home = []
no_home = []

for root, dirs, files in os.walk(root_dir):
    dirs[:] = [d for d in dirs if d not in ['node_modules', '.git', 'scratch']]
    for file in files:
        if file.endswith('.html') or file.endswith('.php'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            nav_menu_match = re.search(r'<ul\s+class=["\']nav-menu["\']>([\s\S]*?)<\/ul>', content, re.IGNORECASE)
            if nav_menu_match:
                menu_text = nav_menu_match.group(1)
                rel = os.path.relpath(filepath, root_dir)
                if 'Home' in menu_text:
                    has_home.append(rel)
                else:
                    no_home.append(rel)

print(f"Files with Home in nav-menu: {len(has_home)}")
print(has_home)
print(f"\nFiles WITHOUT Home in nav-menu: {len(no_home)}")
print(no_home[:15])
