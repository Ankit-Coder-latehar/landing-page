<!-- TOP TICKER ANNOUNCEMENT BAR -->
<div class="top-ticker">
  <div class="container">
    <span>Precautions to be taken by the students before enrolling: <a href="https://vignanonline.com/" target="_blank">Read Guidelines &amp; Entitlements &rarr;</a></span>
  </div>
</div>

<!-- SITE HEADER & NAVBAR -->
<header class="site-header">
  <div class="container header-container">
    
    <!-- BRAND LOGO -->
    <a href="index.php" class="brand-logo" title="Vignan Online - Centre for Distance and Online Education">
      <div style="display: flex; align-items: center; gap: 10px;">
        <div style="background: var(--navy-blue); color: #fff; padding: 6px 12px; border-radius: 8px; font-weight: 900; font-size: 1.1rem; letter-spacing: -0.5px;">
          VIGNAN'S
        </div>
        <div class="logo-text-block">
          <span class="logo-title">ONLINE</span>
          <span class="logo-subtitle">Centre for Distance &amp; Online Education</span>
        </div>
      </div>
    </a>

    <!-- DESKTOP NAVIGATION MENU -->
    <ul class="nav-menu">
      <li class="nav-item">
        <a href="about-us.php" class="nav-link">About Us</a>
      </li>

      <li class="nav-item">
        <a href="programs.php" class="nav-link">
          Programs
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
        </a>

        <!-- MEGA DROPDOWN MENU -->
        <div class="mega-dropdown">
          <div class="mega-grid">
            
            <!-- BACHELORS COLUMN -->
            <div class="mega-column">
              <h4 class="mega-column-title">Bachelors Degrees</h4>
              
              <div class="mega-program-item">
                <a href="programs.php#bba" class="mega-program-title">
                  Online BBA Degree &rarr;
                </a>
                <ul class="mega-electives-list">
                  <li>Marketing and Human Resource Management</li>
                  <li>Marketing and Analytics</li>
                </ul>
              </div>

              <div class="mega-program-item">
                <a href="programs.php#bca" class="mega-program-title">
                  Online BCA Degree &rarr;
                </a>
                <ul class="mega-electives-list">
                  <li>Data Science</li>
                </ul>
              </div>
            </div>

            <!-- MASTERS COLUMN -->
            <div class="mega-column">
              <h4 class="mega-column-title">Masters Degrees</h4>
              
              <div class="mega-program-item">
                <a href="programs.php#mba" class="mega-program-title">
                  Online MBA Degree &rarr;
                </a>
                <ul class="mega-electives-list">
                  <li>Marketing | Finance | HR Management</li>
                  <li>Business Analytics | Information Tech</li>
                  <li>Healthcare &amp; Hospital Management</li>
                  <li>Logistics &amp; Supply Chain</li>
                </ul>
              </div>

              <div class="mega-program-item">
                <a href="programs.php#mca" class="mega-program-title">
                  Online MCA Degree &rarr;
                </a>
                <ul class="mega-electives-list">
                  <li>Computer Science &amp; IT</li>
                  <li>AI &amp; Machine Learning</li>
                  <li>Data Science</li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </li>

      <li class="nav-item">
        <a href="contact-us.php" class="nav-link">Contact Us</a>
      </li>
    </ul>

    <!-- HEADER CTA ACTIONS -->
    <div class="header-actions">
      <button class="btn btn-primary-red open-enquiry-modal">Enquire Now</button>
      <a href="apply-now.php" class="btn btn-outline-navy">Apply Now</a>

      <!-- HAMBURGER BUTTON FOR MOBILE -->
      <button class="hamburger-btn" id="hamburgerBtn" aria-label="Toggle navigation drawer">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
      </button>
    </div>

  </div>
</header>

<!-- MOBILE DRAWER OVERLAY -->
<div class="mobile-drawer-overlay" id="drawerOverlay"></div>

<!-- MOBILE DRAWER SIDEBAR -->
<div class="mobile-drawer" id="mobileDrawer">
  <div class="drawer-header">
    <div class="logo-title" style="font-size: 1.1rem; color: var(--navy-blue);">VIGNAN ONLINE</div>
    <button class="drawer-close-btn" id="drawerCloseBtn">&times;</button>
  </div>

  <ul class="drawer-menu">
    <li><a href="index.php">Home</a></li>
    <li><a href="about-us.php">About Us</a></li>
    <li><a href="programs.php">Programs Offered</a></li>
    <li><a href="contact-us.php">Contact Us</a></li>
    <li><a href="https://support.vignanonline.com" target="_blank">Student Support</a></li>
    <li><a href="apply-now.php" style="color: var(--primary-red); font-weight: 700;">Apply Now</a></li>
  </ul>

  <div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--border-color);">
    <button class="btn btn-primary-red open-enquiry-modal" style="width: 100%;">Enquire Now</button>
  </div>
</div>
