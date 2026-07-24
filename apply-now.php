<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Apply Now | UGI - Online Degree Admissions 2026</title>
  <meta name="description" content="Apply Online for UGC-Entitled and NAAC A+ accredited Online MBA, MCA, BBA, and BCA degree programs at UGI. Start your application today.">

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
    
    <!-- EXACT APPLY NOW HERO SECTION (80vh Height) -->
    <section class="apply-hero-section">
      <div class="apply-hero-container">

        <!-- LEFT SIDE: Pointing Girl Image & Admissions Badge -->
        <div class="apply-hero-left">
          <div class="apply-hero-left-wrapper">
            <img src="assets/images/admissions_pointing_girl.png" alt="UGI Student Admissions" class="apply-hero-img">
            <div class="admissions-open-badge">
              ADMISSIONS<br>OPEN NOW
            </div>
          </div>
        </div>

        <!-- RIGHT SIDE: Section-1 Form Card -->
        <div class="apply-hero-right">
          <div class="apply-form-card">
            <h3 class="section-header-title">Section-1</h3>

            <form action="process-enquiry.php" method="POST" class="apply-lead-form">
              <div class="apply-form-grid">
                
                <!-- ROW 1: First Name & Last Name -->
                <div class="apply-form-row">
                  <div class="apply-field-group">
                    <label class="apply-field-label">First Name <span class="req">*</span></label>
                    <input type="text" name="first_name" class="apply-field-input" placeholder="Enter your first name" required>
                  </div>
                  <div class="apply-field-group">
                    <label class="apply-field-label">Last Name <span class="req">*</span></label>
                    <input type="text" name="last_name" class="apply-field-input" placeholder="Enter your last name" required>
                  </div>
                </div>

                <!-- ROW 2: Email Address -->
                <div class="apply-form-row single">
                  <div class="apply-field-group">
                    <label class="apply-field-label">Email Address <span class="req">*</span></label>
                    <input type="email" name="email" class="apply-field-input" placeholder="Enter your email address" required>
                  </div>
                </div>

                <!-- ROW 3: Mobile Number & Nationality -->
                <div class="apply-form-row">
                  <div class="apply-field-group">
                    <label class="apply-field-label">Mobile Number <span class="req">*</span></label>
                    <div class="apply-phone-wrapper">
                      <div class="apply-flag-code">
                        <svg class="apply-flag-icon" viewBox="0 0 640 480" width="20" height="14">
                          <path fill="#f93" d="0 0h640v160H0z"/>
                          <path fill="#fff" d="0 160h640v160H0z"/>
                          <path fill="#128807" d="0 320h640v160H0z"/>
                          <circle cx="320" cy="240" r="60" fill="none" stroke="#414141" stroke-width="12"/>
                        </svg>
                        +91
                      </div>
                      <input type="hidden" name="country_code" value="+91">
                      <input type="tel" name="mobile" class="apply-phone-input" placeholder="Enter mobile number" required pattern="[0-9]{10}">
                    </div>
                  </div>

                  <div class="apply-field-group">
                    <label class="apply-field-label">Nationality <span class="req">*</span></label>
                    <select name="nationality" class="apply-field-select" required>
                      <option value="">Select a option</option>
                      <option value="Indian" selected>Indian</option>
                      <option value="NRI">NRI</option>
                      <option value="Foreign National">Foreign National</option>
                    </select>
                  </div>
                </div>

                <!-- ROW 4: Program & Elective -->
                <div class="apply-form-row">
                  <div class="apply-field-group">
                    <label class="apply-field-label">Program <span class="req">*</span></label>
                    <select name="program" class="apply-field-select" required id="applyProgramSelect">
                      <option value="">Select a option</option>
                      <option value="Online MBA">Online MBA</option>
                      <option value="Online MCA">Online MCA</option>
                      <option value="Online BBA">Online BBA</option>
                      <option value="Online BCA">Online BCA</option>
                    </select>
                  </div>

                  <div class="apply-field-group">
                    <label class="apply-field-label">Elective <span class="req">*</span></label>
                    <select name="elective" class="apply-field-select" required id="applyElectiveSelect">
                      <option value="">Select a option</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Finance">Finance</option>
                      <option value="Human Resource Management">Human Resource Management</option>
                      <option value="Business Analytics">Business Analytics</option>
                      <option value="Computer Science & IT">Computer Science &amp; IT</option>
                      <option value="AI & Machine Learning">AI &amp; Machine Learning</option>
                      <option value="Data Science">Data Science</option>
                    </select>
                  </div>
                </div>

                <!-- CONSENT CHECKBOX -->
                <div class="apply-consent-box">
                  <input type="checkbox" name="consent" class="apply-consent-checkbox" id="applyConsent" checked required>
                  <label for="applyConsent" class="apply-consent-label">
                    I consent to receive communications from the University and its representatives via Email, SMS, WhatsApp, Call, or any other electronic medium for updates and notifications. This consent overrides DND/NDNC preferences.
                  </label>
                </div>

                <!-- BUTTONS -->
                <div class="apply-buttons-group">
                  <button type="submit" class="btn-apply-submit">Enquire Now</button>
                  <button type="submit" class="btn-apply-direct">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                    Apply Now
                  </button>
                </div>

              </div>
            </form>
          </div>
        </div>

      </div>
    </section>

    <!-- STEPS TO FOLLOW SECTION -->
    <section class="steps-to-follow-section">
      <div class="container">
        
        <div class="steps-header">
          <h2 class="steps-title">Steps <span class="red-text">To Follow</span></h2>
        </div>

        <div class="steps-grid">
          
          <!-- STEP 1 -->
          <div class="step-card">
            <div class="step-icon-wrapper">
              <span class="step-number">1.</span>
              <div class="step-circle">
                <svg width="46" height="46" viewBox="0 0 24 24" fill="#d32f2f">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  <circle cx="18" cy="18" r="4.5" fill="#ffffff" stroke="#d32f2f" stroke-width="1.5"/>
                  <path d="M18 15.5v5M15.5 18h5" stroke="#d32f2f" stroke-width="1.8" stroke-linecap="round"/>
                </svg>
              </div>
            </div>
            <h3 class="step-card-title">Register Yourself</h3>
          </div>

          <!-- STEP 2 -->
          <div class="step-card">
            <div class="step-icon-wrapper">
              <span class="step-number">2.</span>
              <div class="step-circle">
                <svg width="46" height="46" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="2" width="18" height="20" rx="3" fill="#d32f2f"/>
                  <rect x="6" y="5" width="5" height="5" rx="1" fill="#ffffff"/>
                  <line x1="13" y1="6" x2="18" y2="6" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
                  <line x1="13" y1="9" x2="17" y2="9" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
                  <line x1="6" y1="13" x2="18" y2="13" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
                  <line x1="6" y1="16" x2="18" y2="16" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
                  <line x1="6" y1="19" x2="14" y2="19" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </div>
            </div>
            <h3 class="step-card-title">Fill Application Form</h3>
          </div>

          <!-- STEP 3 -->
          <div class="step-card">
            <div class="step-icon-wrapper">
              <span class="step-number">3.</span>
              <div class="step-circle">
                <svg width="46" height="46" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="6" width="20" height="13" rx="3" fill="#d32f2f"/>
                  <path d="M5 14h2M5 12.5h3" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round"/>
                  <circle cx="18" cy="8" r="4" fill="#ffffff"/>
                  <path d="M16.2 8l1.2 1.2 2.4-2.4" stroke="#d32f2f" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>
            <h3 class="step-card-title">Pay Application Fee</h3>
          </div>

          <!-- STEP 4 -->
          <div class="step-card">
            <div class="step-icon-wrapper">
              <span class="step-number">4.</span>
              <div class="step-circle">
                <svg width="46" height="46" viewBox="0 0 24 24" fill="none">
                  <path d="M4 3h16a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" fill="#d32f2f"/>
                  <path d="M6.5 8l1.5 1.5L10.5 7" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <line x1="13" y1="8" x2="17" y2="8" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
                  <rect x="6.5" y="13" width="4" height="4" rx="0.5" fill="#ffffff"/>
                  <line x1="13" y1="14" x2="17" y2="14" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </div>
            </div>
            <h3 class="step-card-title">Upload Document</h3>
          </div>

        </div>
      </div>
    </section>

    <!-- INSTRUCTIONS SECTION -->
    <section class="instructions-section">
      <div class="container">
        <div class="instructions-card">
          <h2 class="instructions-title">Instructions</h2>

          <div class="instructions-content">
            <ul class="instructions-list">
              <li>
                The online application is for admission to programs offered by UGI.
              </li>

              <li>
                Email ID submitted at the time of registration will be used for all correspondences until enrolment is completed. Change in Email ID will NOT be permitted under any circumstances.
              </li>

              <li>
                <strong>UGI Query Management System:</strong>

                <div class="instructions-subtext">
                  <p>Applicants are strongly advised to use the UGI Query Management System (UGI QMS), rather than an email, to get a quick response.</p>
                  
                  <p>(Where to find the Query Management System - As and when learners get their login credentials, they can go to their user dashboard and find the Query Management System window)</p>

                  <ul class="instructions-sublist">
                    <li>Register and verify your mobile number</li>
                    <li>Click on <strong>[Raise a Query]</strong> in your dashboard</li>
                    <li>Select the query category and submit your query</li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- RECOGNITIONS & ACCREDITATIONS SUMMARY SECTION -->
    <?php include_once 'includes/accreditation.php'; ?>
    <?php include_once 'includes/faqs.php'; ?>

  </main>

  <!-- FOOTER -->
  <?php include_once 'includes/footer.php'; ?>
  <?php include_once 'includes/enquiry-modal.php'; ?>

  <!-- MAIN JAVASCRIPT -->
  <script src="assets/js/main.js"></script>
</body>
</html>
