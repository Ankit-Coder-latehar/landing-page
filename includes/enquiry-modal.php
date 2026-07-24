<!-- ENQUIRE NOW MODAL POPUP (EXACT MATCH TO DESIGN) -->
<div class="modal-overlay" id="enquiryModal">
  <div class="apply-form-card modal-exact-card" style="position: relative; max-width: 520px; width: 100%; margin: 1rem;">
    
    <!-- CLOSE BUTTON ON TOP RIGHT -->
    <button class="modal-close-black close-modal-trigger" aria-label="Close modal">&times;</button>

    <h3 class="section-header-title">Section-1</h3>

    <!-- AJAX FEEDBACK ALERT -->
    <div class="form-alert" id="formAlert" style="display:none;"></div>

    <form action="process-enquiry.php" method="POST" class="apply-lead-form" id="leadEnquiryForm">
      <div class="apply-form-grid">
        
        <!-- ROW 1: First Name & Last Name -->
        <div class="apply-form-row">
          <div class="apply-field-group">
            <label class="apply-field-label">First Name <span class="req">*</span></label>
            <input type="text" name="first_name" class="apply-field-input" placeholder="Enter your first name" required>
          </div>
          <div class="apply-field-group">
            <label class="apply-field-label">Last Name <span class="req">*</span></label>
            <input type="text" name="last_name" class="apply-field-input" placeholder="Enter your first name" required>
          </div>
        </div>

        <!-- ROW 2: Email Address -->
        <div class="apply-form-row single">
          <div class="apply-field-group">
            <label class="apply-field-label">Email Address <span class="req">*</span></label>
            <input type="email" name="email" class="apply-field-input" placeholder="" required>
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
              <input type="tel" name="mobile" class="apply-phone-input" placeholder="" required pattern="[0-9]{10}">
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
            <select name="program" class="apply-field-select" required id="modalProgramSelect">
              <option value="">Select a option</option>
              <option value="Online MBA">Online MBA</option>
              <option value="Online MCA">Online MCA</option>
              <option value="Online BBA">Online BBA</option>
              <option value="Online BCA">Online BCA</option>
            </select>
          </div>

          <div class="apply-field-group">
            <label class="apply-field-label">Elective <span class="req">*</span></label>
            <select name="elective" class="apply-field-select" required id="modalElectiveSelect">
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
          <input type="checkbox" name="consent" class="apply-consent-checkbox" id="modalConsent" checked required>
          <label for="modalConsent" class="apply-consent-label">
            I consent to receive communications from the University and its representatives via Email, SMS, WhatsApp, Call, or any other electronic medium for updates and notifications. This consent overrides DND/NDNC preferences.
          </label>
        </div>

        <!-- BUTTONS ROW -->
        <div style="display: flex; gap: 0.75rem; margin-top: 0.5rem;">
          <button type="submit" class="btn-apply-submit" style="flex: 1;">Enquire Now</button>
          <a href="apply-now.php" class="btn-apply-direct" style="flex: 1; text-decoration: none;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            Apply Now
          </a>
        </div>

      </div>
    </form>
  </div>
</div>
