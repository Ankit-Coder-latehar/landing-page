import glob
import os

drawer_template_root = """
  <!-- MOBILE DRAWER OVERLAY -->
  <div class="mobile-drawer-overlay" id="drawerOverlay"></div>

  <!-- MOBILE DRAWER SIDEBAR -->
  <div class="mobile-drawer" id="mobileDrawer">
    <div class="drawer-header">
      <div class="logo-title" style="font-size: 1.1rem; color: var(--navy-blue); font-weight: 800;">UGI</div>
      <button class="drawer-close-btn" id="drawerCloseBtn" aria-label="Close navigation drawer">&times;</button>
    </div>

    <ul class="drawer-menu">
      <li><a href="/index.html">Home</a></li>
      <li><a href="/about-us.html">About Us</a></li>
      <li><a href="/programs.html">Programs Offered</a></li>
      <li><a href="/contact-us.html">Contact Us</a></li>
      <li><a href="https://ugichd.edu.in" target="_blank">Student Support</a></li>
      <li><a href="/apply-now.html" style="color: var(--primary-red); font-weight: 700;">Apply Now</a></li>
    </ul>

    <div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--border-color);">
      <button class="btn btn-primary-red open-enquiry-modal" style="width: 100%;">Enquire Now</button>
    </div>
  </div>
"""

drawer_template_sub = """
  <!-- MOBILE DRAWER OVERLAY -->
  <div class="mobile-drawer-overlay" id="drawerOverlay"></div>

  <!-- MOBILE DRAWER SIDEBAR -->
  <div class="mobile-drawer" id="mobileDrawer">
    <div class="drawer-header">
      <div class="logo-title" style="font-size: 1.1rem; color: var(--navy-blue); font-weight: 800;">UGI</div>
      <button class="drawer-close-btn" id="drawerCloseBtn" aria-label="Close navigation drawer">&times;</button>
    </div>

    <ul class="drawer-menu">
      <li><a href="../index.html">Home</a></li>
      <li><a href="../about-us.html">About Us</a></li>
      <li><a href="../programs.html">Programs Offered</a></li>
      <li><a href="../contact-us.html">Contact Us</a></li>
      <li><a href="https://ugichd.edu.in" target="_blank">Student Support</a></li>
      <li><a href="../apply-now.html" style="color: var(--primary-red); font-weight: 700;">Apply Now</a></li>
    </ul>

    <div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--border-color);">
      <button class="btn btn-primary-red open-enquiry-modal" style="width: 100%;">Enquire Now</button>
    </div>
  </div>
"""

files = glob.glob('**/*.html', recursive=True)
updated_files = []

for f in files:
    with open(f, 'r', encoding='utf-8', errors='ignore') as fp:
        content = fp.read()
    
    if 'mobileDrawer' not in content and '</header>' in content:
        is_sub = '/' in f or '\\' in f
        template = drawer_template_sub if is_sub else drawer_template_root
        new_content = content.replace('</header>', '</header>\n' + template, 1)
        with open(f, 'w', encoding='utf-8') as fp:
            fp.write(new_content)
        updated_files.append(f)

print(f'Updated {len(updated_files)} files:')
for uf in updated_files:
    print(' +', uf)
