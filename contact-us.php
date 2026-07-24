<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contact Us | Vignan Online - Admissions &amp; Support</title>
  <meta name="description" content="Get in touch with Vignan Online admissions office. Phone: +91 80 10 882288 / +91 80 47 482288. Email: admissions@vignanonline.com. Campus Address: Guntur, Andhra Pradesh.">

  <!-- GOOGLE FONTS -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">

  <!-- MAIN STYLESHEET -->
  <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>

  <!-- HEADER -->
  <?php include_once 'includes/header.php'; ?>

  <!-- MAIN CONTENT -->
  <main>
    
    <!-- PAGE HERO HEADER -->
    <section style="background: linear-gradient(135deg, var(--navy-blue) 0%, #262626 100%); color: #ffffff; padding: 4rem 0; text-align: center;">
      <div class="container">
        <h1 style="font-size: 2.75rem; font-weight: 900; margin-bottom: 0.75rem;">Contact Us</h1>
        <p style="color: #cbd5e1; font-size: 1.1rem; max-width: 680px; margin: 0 auto;">
          We are here to assist you with program details, admissions, and career counseling.
        </p>
      </div>
    </section>

    <!-- CONTACT GRID SECTION -->
    <section style="padding: 5rem 0; background: #ffffff;">
      <div class="container">
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem;">
          
          <!-- CONTACT DETAILS -->
          <div>
            <span class="section-tag">Reach Out</span>
            <h2 style="font-size: 2rem; font-weight: 800; color: var(--navy-blue); margin-bottom: 1.5rem;">
              Admissions &amp; Counselor Support
            </h2>

            <div style="display: flex; flex-direction: column; gap: 1.5rem; margin-bottom: 2.5rem;">
              
              <div style="display: flex; gap: 1rem; align-items: flex-start;">
                <div style="width: 48px; height: 48px; border-radius: 12px; background: rgba(202, 37, 38, 0.1); color: var(--primary-red); display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 1.25rem;">
                  📍
                </div>
                <div>
                  <h4 style="font-weight: 800; color: var(--navy-blue); font-size: 1.05rem;">Campus Address</h4>
                  <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.6;">
                    Centre for Distance and Online Education (CDOE),<br>
                    Vignan's Foundation for Science, Technology &amp; Research,<br>
                    Vadlamudi, Guntur District, Andhra Pradesh, India - 522213.
                  </p>
                </div>
              </div>

              <div style="display: flex; gap: 1rem; align-items: flex-start;">
                <div style="width: 48px; height: 48px; border-radius: 12px; background: rgba(65, 65, 65, 0.1); color: var(--navy-blue); display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 1.25rem;">
                  📞
                </div>
                <div>
                  <h4 style="font-weight: 800; color: var(--navy-blue); font-size: 1.05rem;">Toll-Free Phone</h4>
                  <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.6;">
                    <a href="tel:+918437079999" style="color: inherit; text-decoration: none;">+91 84370 79999</a>
                  </p>
                </div>
              </div>

              <div style="display: flex; gap: 1rem; align-items: flex-start;">
                <div style="width: 48px; height: 48px; border-radius: 12px; background: rgba(37, 211, 102, 0.1); color: #25D366; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 1.25rem;">
                  💬
                </div>
                <div>
                  <h4 style="font-weight: 800; color: var(--navy-blue); font-size: 1.05rem;">WhatsApp Counseling</h4>
                  <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.6;">
                    <a href="https://api.whatsapp.com/send?phone=918437079999" target="_blank" style="color: var(--primary-red); font-weight: 700;">+91 84370 79999 (Chat Now)</a>
                  </p>
                </div>
              </div>

            </div>
          </div>

          <!-- DIRECT ENQUIRE CARD -->
          <div style="background: var(--bg-light); border-radius: 24px; padding: 2.5rem; border: 1px solid var(--border-color); box-shadow: var(--shadow-xl);">
            <h3 style="font-size: 1.5rem; font-weight: 800; color: var(--navy-blue); margin-bottom: 0.5rem;">Send Us a Message</h3>
            <p style="color: var(--text-muted); font-size: 0.875rem; margin-bottom: 1.5rem;">Fill out your contact details and our counselor will reach out within 24 hours.</p>

            <button class="btn btn-primary-red open-enquiry-modal" style="width: 100%; padding: 1rem;">
              Open Enquiry Form &rarr;
            </button>
          </div>

        </div>

      </div>
    </section>

  </main>

  <!-- ENQUIRE NOW MODAL -->
  <?php include_once 'includes/enquiry-modal.php'; ?>

  <!-- FOOTER -->
  <?php include_once 'includes/footer.php'; ?>

</body>
</html>
