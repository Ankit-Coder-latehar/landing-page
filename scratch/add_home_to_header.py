import os
import re

def add_home_to_nav_menu(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    start_ul = content.find('class="nav-menu"')
    if start_ul == -1:
        return False
    ul_tag_start = content.rfind('<ul', 0, start_ul)
    if ul_tag_start == -1:
        return False
    ul_tag_end = content.find('</ul>', ul_tag_start)
    if ul_tag_end == -1:
        return False
        
    nav_menu_content = content[ul_tag_start : ul_tag_end + 5]
    
    # Check if Home is already inside nav_menu_content
    if re.search(r'class=["\']nav-link[^"\'\n]*["\'][^>]*>\s*Home\s*<\/a>', nav_menu_content, re.IGNORECASE) or \
       re.search(r'>\s*Home\s*<\/a>', nav_menu_content, re.IGNORECASE):
        return False
        
    filename = os.path.basename(filepath)
    is_index = (filename == 'index.html')
    is_subfolder = ('online-' in filepath)
    
    if is_subfolder:
        href = '../index.html'
    else:
        href = '/index.html'
        
    active_cls = ' active' if is_index else ''
    
    home_item = f'\n        <li class="nav-item">\n          <a href="{href}" class="nav-link{active_cls}">Home</a>\n        </li>\n'
    
    # Insert right after <ul class="nav-menu">
    ul_open_end = content.find('>', ul_tag_start) + 1
    
    new_content = content[:ul_open_end] + home_item + content[ul_open_end:]
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    return True

root_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
updated = []

for root, dirs, files in os.walk(root_dir):
    dirs[:] = [d for d in dirs if d not in ['node_modules', '.git', 'scratch']]
    for file in files:
        if file.endswith('.html') or file.endswith('.php'):
            filepath = os.path.join(root, file)
            if add_home_to_nav_menu(filepath):
                updated.append(os.path.relpath(filepath, root_dir))

print(f"Added Home link to nav-menu in {len(updated)} files:")
for u in updated:
    print(f" - {u}")
