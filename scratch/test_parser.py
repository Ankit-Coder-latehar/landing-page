import os
import re

def find_matching_ul_close(content, start_ul_pos):
    pos = start_ul_pos + 1
    depth = 0
    # scan for <ul and </ul> tags
    # regex for <ul[\s>] or </ul>
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
    # Move back to start of <ul
    ul_tag_start = content.rfind('<ul', 0, start_ul)
    if ul_tag_start == -1:
        return content
        
    ul_tag_end = find_matching_ul_close(content, ul_tag_start)
    if ul_tag_end == -1:
        return content
        
    nav_menu_full = content[ul_tag_start : ul_tag_end + 5]
    
    # Inside nav_menu_full, find top-level <li class="nav-item"> blocks.
    # Top level nav-items are <li class="nav-item"> at depth 1 inside nav_menu_full.
    # Let's find positions of top level <li class="nav-item">
    
    items = []
    # Find all <li class="nav-item">
    item_starts = [m.start() for m in re.finditer(r'<li\s+class=["\']nav-item["\']>', nav_menu_full, re.IGNORECASE)]
    
    for i, istart in enumerate(item_starts):
        # find end of this li (which is before next item_starts[i+1] or before end </ul> of nav_menu_full)
        if i + 1 < len(item_starts):
            iend = item_starts[i+1]
        else:
            iend = nav_menu_full.rfind('</ul>')
        
        block = nav_menu_full[istart:iend]
        # check if this block is Programs
        if 'Programs' in block and ('nav-link' in block or 'programs' in block.lower()):
            # Drop it
            pass
        else:
            items.append(block)
            
    new_nav_menu = content[ul_tag_start:content.find('>', ul_tag_start)+1] + '\n' + ''.join(items) + '\n      </ul>'
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
    
    # remove <li>...programs...</li> inside drawer
    new_drawer = re.sub(r'[\t ]*<li>\s*<a href="[^"]*programs[^"]*">[^<]*<\/a>\s*<\/li>\n?', '', drawer_html, flags=re.IGNORECASE)
    
    return content[:ul_tag_start] + new_drawer + content[ul_tag_end + 5:]

# Test on index.html
with open('index.html', 'r', encoding='utf-8') as f:
    orig = f.read()

res = remove_programs_from_nav_menu(orig)
res = remove_programs_from_drawer(res)

with open('scratch/index_test.html', 'w', encoding='utf-8') as f:
    f.write(res)

print("Depth algorithm completed! Wrote scratch/index_test.html")
