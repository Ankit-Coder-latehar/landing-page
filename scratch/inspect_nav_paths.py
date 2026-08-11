import os
import re

root_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))

for root, dirs, files in os.walk(root_dir):
    dirs[:] = [d for d in dirs if d not in ['node_modules', '.git', 'scratch']]
    for file in files:
        if file.endswith('.html') or file.endswith('.php'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            nav_match = re.search(r'<ul\s+class=["\']nav-menu["\']>([\s\S]*?)<\/ul>', content, re.IGNORECASE)
            if nav_match:
                nav_text = nav_match.group(1)
                # check if ../ is used
                uses_dotdot = '../' in nav_text or '../' in content[:content.find('</header>')] if '</header>' in content else False
                rel = os.path.relpath(filepath, root_dir)
                print(f"{rel}: uses_dotdot={uses_dotdot}")
