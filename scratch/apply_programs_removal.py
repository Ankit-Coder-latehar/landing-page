import os
import re

def find_matching_ul_close(content, start_ul_pos):
    depth = 0
    pattern = re.compile(r'(<ul[\s>]|</ul>)', re.IGNORECASE)
    for match in pattern.finditer(content, start_ul_pos):
        tag = match.group(1).lower()
        if tag.startswith('<ul'):
            depth += 1
        elif tag == '</ul>':
            depth -= 1
            if depth == 0:
                return match.start()
    return -1

def remove_programs_from_nav_menu(content):
    start_ul = content.find('class="nav-menu"')
    if start_ul == -1:
        return content
    ul_tag_start = content.rfind('<ul', 0, start_ul)
    if ul_tag_start == -1:
        return content
        
    ul_tag_end = find_matching_ul_close(content, ul_tag_start)
    if ul_tag_end == -1:
        return content
        
    nav_menu_full = content[ul_tag_start : ul_tag_end + 5]
    
    items = []
    item_starts = [m.start() for m in re.finditer(r'<li\s+class=["\']nav-item["\']>', nav_menu_full, re.IGNORECASE)]
    
    for i, istart in enumerate(item_starts):
        if i + 1 < len(item_starts):
            iend = item_starts[i+1]
        else:
            iend = nav_menu_full.rfind('</ul>')
        
        block = nav_menu_full[istart:iend]
        if 'Programs' in block and ('nav-link' in block or 'programs' in block.lower()):
            pass # skip programs nav item
        else:
            items.append(block)
            
    # Keep indentation clean
    ul_open_tag = content[ul_tag_start : content.find('>', ul_tag_start) + 1]
    new_nav_menu = ul_open_tag + '\n' + ''.join(items) + '\n      </ul>'
    return content[:ul_tag_start] + new_nav_menu + content[ul_tag_end + 5:]

def remove_programs_from_drawer(content):
    start_ul = content.find('class="drawer-menu"')
    if start_ul == -1:
        return content
    ul_tag_start = content.rfind('<ul', 0, start_ul)
    if ul_tag_start == -1:
        return content
    ul_tag_end = find_matching_ul_close(content, ul_tag_start)
    if ul_tag_end == -1:
        return content
        
    drawer_html = content[ul_tag_start : ul_tag_end + 5]
    
    new_drawer = re.sub(r'[\t ]*<li>\s*<a href="[^"]*programs[^"]*">[^<]*<\/a>\s*<\/li>\n?', '', drawer_html, flags=re.IGNORECASE)
    
    return content[:ul_tag_start] + new_drawer + content[ul_tag_end + 5:]

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    content = remove_programs_from_nav_menu(content)
    content = remove_programs_from_drawer(content)
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

def main():
    root_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
    updated_files = []
    
    for root, dirs, files in os.walk(root_dir):
        # Skip node_modules, .git, scratch
        dirs[:] = [d for d in dirs if d not in ['node_modules', '.git', 'scratch']]
        for file in files:
            if file.endswith('.html') or file.endswith('.php'):
                filepath = os.path.join(root, file)
                if process_file(filepath):
                    updated_files.append(os.path.relpath(filepath, root_dir))
                    
    print(f"Successfully processed and updated {len(updated_files)} files:")
    for uf in updated_files:
        print(f" - {uf}")

if __name__ == '__main__':
    main()
