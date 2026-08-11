import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

sections = re.findall(r'(<section[\s\S]*?>[\s\S]*?<\/section>)', content)
print(f"Total sections in index.html: {len(sections)}")

for i, sec in enumerate(sections):
    sec_tag = re.search(r'<section[^>]*>', sec).group(0)
    headings = re.findall(r'<(?:h1|h2|h3|h4|span)[^>]*>(.*?)</(?:h1|h2|h3|h4|span)>', sec)
    print(f"\nSection {i+1}: {sec_tag}")
    print(f"  Headings/Tags: {headings[:5]}")
