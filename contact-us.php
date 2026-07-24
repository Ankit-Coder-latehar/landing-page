<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contact Us | UGI - Centre for Distance &amp; Online Education</title>
  <meta name="description" content="Contact UGI Centre for Distance and Online Education. Admissions Helpline: +91 84370 79999. Email: head.careerguidance@ugichd.edu.in. Campus Address: Universal Group of Institutions (UGI), Village Ballopur, Chandigarh-Ambala Highway, Teh. Dera Bassi, Distt. Mohali, PUNJAB, Lalru, India 140501.">
  <meta name="keywords" content="UGI Contact Us, UGI Admissions Phone, UGI Email, UGI Campus Address, Distance Education Helpline">

  <!-- GOOGLE FONTS -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">

  <!-- MAIN STYLESHEET -->
  <link rel="stylesheet" href="assets/css/style.css">

  <style>
    /* CONTACT US PAGE EXACT STYLES */
    .contact-page-wrapper {
      background-color: #f8fafc;
      padding-top: 4rem;
      padding-bottom: 4rem;
    }

    .contact-cards-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
      margin-bottom: 4rem;
      margin-top: 1.5rem;
    }

    .contact-card-item {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      padding: 3.5rem 1.5rem 2rem;
      text-align: center;
      position: relative;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .contact-card-item:hover {
      transform: translateY(-5px);
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
    }

    .contact-card-icon-badge {
      position: absolute;
      top: -30px;
      left: 50%;
      transform: translateX(-50%);
      width: 64px;
      height: 64px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
    }

    .contact-card-icon-badge.red-badge {
      background: #ca2526;
      color: #ffffff;
    }

    .contact-card-icon-badge.green-badge {
      background: #25d366;
      color: #ffffff;
    }

    .contact-card-link {
      font-family: 'Montserrat', sans-serif;
      font-weight: 800;
      font-size: 1.15rem;
      color: #0f172a;
      text-decoration: none;
      word-break: break-word;
      transition: color 0.2s ease;
    }

    .contact-card-link:hover {
      color: #ca2526;
    }

    /* CAMPUS ADDRESS & MAP SECTION */
    .contact-campus-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2.5rem;
      align-items: center;
      margin-bottom: 2rem;
    }

    .campus-info-block {
      background: #ffffff;
      padding: 2.5rem;
      border-radius: 20px;
      border: 1px solid #e2e8f0;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
    }

    .campus-org-tag {
      font-size: 0.85rem;
      font-weight: 800;
      color: #64748b;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      margin-bottom: 0.5rem;
      display: block;
    }

    .campus-title-heading {
      font-size: 1.35rem;
      font-weight: 900;
      color: #0f172a;
      margin-bottom: 1.5rem;
      line-height: 1.3;
    }

    .campus-address-flex {
      display: flex;
      gap: 1rem;
      align-items: flex-start;
    }

    .campus-pin-icon {
      width: 44px;
      height: 44px;
      border-radius: 12px;
      background: rgba(202, 37, 38, 0.1);
      color: #ca2526;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .campus-address-text {
      font-size: 0.95rem;
      color: #475569;
      line-height: 1.7;
      font-weight: 600;
    }

    .campus-map-wrapper {
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
      border: 1px solid #cbd5e1;
      height: 320px;
    }

    .campus-map-iframe {
      width: 100%;
      height: 100%;
      border: 0;
    }

    /* OUR TECHNOLOGY SECTION (EXACT VIGNAN RED SECTION) */
    .contact-tech-section {
      background: #ca2526;
      color: #ffffff;
      padding: 4.5rem 0;
    }

    .contact-tech-title {
      font-size: 2.25rem;
      font-weight: 900;
      text-transform: uppercase;
      color: #ffffff;
      margin-bottom: 0.5rem;
      letter-spacing: -0.5px;
    }

    .contact-tech-sub {
      font-size: 1.1rem;
      color: rgba(255, 255, 255, 0.9);
      margin-bottom: 3rem;
      font-weight: 500;
    }

    .contact-tech-list {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
      max-width: 860px;
    }

    .contact-tech-item {
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }

    .contact-tech-icon-box {
      width: 58px;
      height: 58px;
      background: #ffffff;
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ca2526;
      flex-shrink: 0;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .contact-tech-text {
      font-size: 1rem;
      font-weight: 600;
      color: #ffffff;
      line-height: 1.5;
    }

    @media (max-width: 991px) {
      .contact-cards-grid {
        grid-template-columns: 1fr;
        gap: 3.5rem;
      }

      .contact-campus-grid {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>

  <!-- HEADER -->
  <?php include_once 'includes/header.php'; ?>

  <!-- MAIN CONTENT -->
  <main>
    
    <div class="contact-page-wrapper">
      <div class="container">

        <!-- 3 CONTACT CARDS ROW -->
        <div class="contact-cards-grid">
          
          <!-- PHONE CARD -->
          <div class="contact-card-item">
            <div class="contact-card-icon-badge red-badge">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </div>
            <a href="tel:+918437079999" class="contact-card-link">+918437079999</a>
          </div>

          <!-- WHATSAPP CARD -->
          <div class="contact-card-item">
            <div class="contact-card-icon-badge green-badge">
              <img src="assets/images/whatsapp_logo.svg" alt="WhatsApp" width="28" height="28" style="display: block;">
            </div>
            <a href="https://wa.me/918437079999" target="_blank" class="contact-card-link">+918437079999</a>
          </div>

          <!-- EMAIL CARD -->
          <div class="contact-card-item">
            <div class="contact-card-icon-badge red-badge">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </div>
            <a href="mailto:head.careerguidance@ugichd.edu.in" class="contact-card-link" style="font-size: 0.95rem;">head.careerguidance@ugichd.edu.in</a>
          </div>

        </div>

        <!-- CAMPUS ADDRESS & MAP GRID -->
        <div class="contact-campus-grid">
          
          <div class="campus-info-block">
            <span class="campus-org-tag">Universal Group of Institutions (UGI)</span>
            <h2 class="campus-title-heading">Centre for Distance and Online Education</h2>
            
            <div class="campus-address-flex">
              <div class="campus-pin-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <div class="campus-address-text">
                Universal Group of Institutions (UGI),<br>
                Village Ballopur, Chandigarh-Ambala Highway,<br>
                Teh. Dera Bassi, Distt. Mohali, PUNJAB,<br>
                Lalru, India 140501
              </div>
            </div>
          </div>

          <div class="campus-map-wrapper">
            <iframe 
              src="https://maps.google.com/maps?q=Universal+Group+of+Institutions+Village+Ballopur+Chandigarh+Ambala+Highway+Dera+Bassi&t=&z=14&ie=UTF8&iwloc=&output=embed" 
              class="campus-map-iframe" 
              allowfullscreen="" 
              loading="lazy" 
              referrerpolicy="no-referrer-when-downgrade"
              title="Universal Group of Institutions Campus Map">
            </iframe>
          </div>

        </div>

      </div>
    </div>

    <!-- OUR TECHNOLOGY SECTION -->
    <section class="contact-tech-section">
      <div class="container">
        <h2 class="contact-tech-title">OUR <span>TECHNOLOGY</span></h2>
        <div class="contact-tech-sub">Get the added advantage of kickstarting your career</div>

        <div class="contact-tech-list">
          
          <div class="contact-tech-item">
            <div class="contact-tech-icon-box">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
            </div>
            <div class="contact-tech-text">State-of-the-art Learning Management System (LMS) for a near face-to-face learning experience</div>
          </div>

          <div class="contact-tech-item">
            <div class="contact-tech-icon-box">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            </div>
            <div class="contact-tech-text">Clarify all your queries with ease using our chat and message feature</div>
          </div>

          <div class="contact-tech-item">
            <div class="contact-tech-icon-box">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
            </div>
            <div class="contact-tech-text">Join online forums and peer groups to engage in discussions on a variety of topics</div>
          </div>

          <div class="contact-tech-item">
            <div class="contact-tech-icon-box">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
            </div>
            <div class="contact-tech-text">Instant and anytime access to the learning material</div>
          </div>

          <div class="contact-tech-item">
            <div class="contact-tech-icon-box">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
            </div>
            <div class="contact-tech-text">Continuous feedback and analytics to monitor progress</div>
          </div>

        </div>
      </div>
    </section>

  </main>

  <!-- ENQUIRE NOW MODAL -->
  <?php include_once 'includes/enquiry-modal.php'; ?>

  <!-- FOOTER -->
  <?php include_once 'includes/footer.php'; ?>

  <!-- MAIN JAVASCRIPT -->
  <script src="assets/js/main.js"></script>
</body>
</html>
