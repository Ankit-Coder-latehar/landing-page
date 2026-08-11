import os
import glob
import re

def update_files():
    root_dir = r"c:\Users\Asus\Desktop\landing page"
    files = glob.glob(os.path.join(root_dir, "**", "*.html"), recursive=True) + \
            glob.glob(os.path.join(root_dir, "**", "*.json"), recursive=True) + \
            glob.glob(os.path.join(root_dir, "**", "*.php"), recursive=True)

    modified_count = 0

    replacements = [
        # JSON / Badges
        ('NAAC A+ &amp; AICTE Approved', 'UGC Entitled'),
        ('NAAC A+ &amp; UGC Entitled', 'UGC Entitled'),
        ('NAAC A+ & AICTE Approved', 'UGC Entitled'),
        ('NAAC A+ & UGC Entitled', 'UGC Entitled'),
        
        # Meta & Hero descriptions
        ('and NAAC A+ accredited', ''),
        ('&amp; NAAC A+ accredited', ''),
        ('and NAAC A+ Graded', ''),
        ('&amp; NAAC A+ Graded', ''),
        ('& NAAC A+ Graded', ''),
        ('and offered by a NAAC A+ Graded University,', ','),
        ('and offered by a NAAC A+ Graded University.', '.'),
        ('and accredited with NAAC A+,', ','),
        ('delivered by NAAC A+ Accredited UGI Group of Institutions', 'delivered by UGI Group of Institutions'),
        ('UGI Group of Institutions is NAAC A+ accredited and its', 'UGI Group of Institutions is UGC-Entitled and its'),
        ('Is UGI accredited by UGC and NAAC?', 'Is UGI entitled by UGC?'),

        # Badges HTML elements
        ('<strong>NAAC A+</strong>', '<strong>UGC ENTITLED</strong>'),
        ('>NAAC A+</span>', '>UGC ENTITLED</span>'),
        ('>NAAC</span>', '>UGC ENTITLED</span>'),
        
        # Footers & standards
        ('Entitled by UGC-DEB, NAAC A+ Accredited, AICTE Entitled, ISO 9001:2015 Quality Certified.', 'Entitled by UGC-DEB, AICTE Entitled, ISO 9001:2015 Quality Certified.'),
        ('Degrees and diplomas backed by UGC, AICTE, PCI, INC &amp; NAAC standards.', 'Degrees and diplomas backed by UGC, AICTE, PCI &amp; INC standards.'),
        ('Degrees and diplomas backed by UGC, AICTE, PCI, INC & NAAC standards.', 'Degrees and diplomas backed by UGC, AICTE, PCI & INC standards.'),
        ('and NAAC A+ accredited,', ','),
    ]

    for fpath in files:
        if 'node_modules' in fpath or '.git' in fpath:
            continue

        with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()

        new_content = content
        for old_str, new_str in replacements:
            new_content = new_content.replace(old_str, new_str)

        new_content = re.sub(r'  +', ' ', new_content)

        if new_content != content:
            with open(fpath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            modified_count += 1
            print(f"Updated: {os.path.relpath(fpath, root_dir)}")

    print(f"\nTotal files updated: {modified_count}")

if __name__ == "__main__":
    update_files()
