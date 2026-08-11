import os
import re

root_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))

footer_files = []

for root, dirs, files in os.walk(root_dir):
    dirs[:] = [d for d in dirs if d not in ['node_modules', '.git', 'scratch']]
    for file in files:
        if file.endswith('.html') or file.endswith('.php'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            if 'site-footer' in content or '<footer' in content:
                footer_files.append(os.path.relpath(filepath, root_dir))

print(f"Files with footer: {len(footer_files)}")
print(footer_files)
