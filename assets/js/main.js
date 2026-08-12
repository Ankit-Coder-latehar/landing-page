/**
 * UGI - MAIN JAVASCRIPT
 * Handles interactive components, tab filters, modal triggers, dynamic electives, accordions, and AJAX form submissions.
 */

// FORMSPREE & GOOGLE SHEETS INTEGRATION CONFIGURATION
// Note: GOOGLE_SHEET_WEBHOOK_URL must be a deployed Google Apps Script Web App URL (starts with https://script.google.com/macros/s/.../exec)
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/meeywnla'; // Configurable Formspree endpoint URL
const GOOGLE_SHEET_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycby2yqfTqD_O_3HhS6d_fV6J1d4556l_4u71H_p6H7x_cK0qY6K8c5V4g/exec'; // Deployed Apps Script Web App URL for Sheet 1Stb8nmov2T_Y8Th7kdnuxV4zhQXDyI42UnZEYd_7gCc
let RAZORPAY_KEY_ID = window.RAZORPAY_KEY_ID || 'rzp_live_bWTZeZdjtDN95M';
const SEAT_BOOKING_AMOUNT_INR = 1000; // Seat Booking Fee in INR (₹1,000)

// Fetch environment configuration dynamically if available
if (typeof fetch !== 'undefined') {
  fetch('/api/config')
    .then(res => res.json())
    .then(data => {
      if (data && data.razorpay_key_id) {
        RAZORPAY_KEY_ID = data.razorpay_key_id;
      }
    })
    .catch(() => { });
}

/**
 * Dispatch lead or seat data to Formspree and Google Sheets Webhooks
 */
async function sendToExternalIntegrations(formData) {
  const data = {};
  const searchParams = new URLSearchParams();

  formData.forEach((value, key) => {
    if (typeof value === 'string') {
      data[key] = value;
      searchParams.append(key, value);
    } else if (value instanceof File) {
      data[key] = value.name;
      searchParams.append(key, value.name);
    }
  });

  // Ensure full 'name' field is populated if first_name / last_name exist
  if (!data['name'] && (data['first_name'] || data['last_name'])) {
    const combined = ((data['first_name'] || '') + ' ' + (data['last_name'] || '')).trim();
    data['name'] = combined;
    searchParams.append('name', combined);
  }

  const promises = [];

  // 1. Dispatch to Formspree Endpoint
  if (FORMSPREE_ENDPOINT && FORMSPREE_ENDPOINT.includes('formspree.io')) {
    promises.push(
      fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        keepalive: true,
        body: formData
      }).catch(err => console.log('Formspree dispatch info:', err))
    );
  }

  // 2. Dispatch to Google Sheet Webhook (Requires deployed Apps Script Web App URL, not raw docs.google.com URL)
  if (GOOGLE_SHEET_WEBHOOK_URL && GOOGLE_SHEET_WEBHOOK_URL.startsWith('http') && !GOOGLE_SHEET_WEBHOOK_URL.includes('docs.google.com')) {
    // Send as application/x-www-form-urlencoded for e.parameter compatibility
    promises.push(
      fetch(GOOGLE_SHEET_WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors',
        keepalive: true,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: searchParams.toString()
      }).catch(err => console.log('Google Sheets URLSearchParams note:', err))
    );

    // Send as text/plain JSON payload for e.postData.contents compatibility
    promises.push(
      fetch(GOOGLE_SHEET_WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors',
        keepalive: true,
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(data)
      }).catch(err => console.log('Google Sheets JSON note:', err))
    );
  }

  await Promise.allSettled(promises);
}

document.addEventListener('DOMContentLoaded', () => {

  // MOBILE NAVIGATION DRAWER TOGGLE
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');

  function openDrawer() {
    if (mobileDrawer) mobileDrawer.classList.add('active');
    if (drawerOverlay) drawerOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (mobileDrawer) mobileDrawer.classList.remove('active');
    if (drawerOverlay) drawerOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      openDrawer();
    });
  }

  if (drawerCloseBtn) {
    drawerCloseBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeDrawer();
    });
  }

  if (drawerOverlay) {
    drawerOverlay.addEventListener('click', closeDrawer);
  }

  const drawerLinks = document.querySelectorAll('.drawer-menu a');
  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer && mobileDrawer.classList.contains('active')) {
      closeDrawer();
    }
  });

  // DYNAMIC HERO BANNER SLIDESHOW (3 SECONDS INTERVAL)
  const fullSlides = document.querySelectorAll('.hero-full-slide');
  const slideDots = document.querySelectorAll('.hero-slide-dot');
  const prevBtn = document.getElementById('heroPrevBtn');
  const nextBtn = document.getElementById('heroNextBtn');
  const slideshowContainer = document.getElementById('heroSlideshow');

  let currentSlideIndex = 0;
  let slideTimer = null;

  function showSlide(index) {
    if (!fullSlides.length) return;
    if (index >= fullSlides.length) currentSlideIndex = 0;
    else if (index < 0) currentSlideIndex = fullSlides.length - 1;
    else currentSlideIndex = index;

    fullSlides.forEach((slide, i) => {
      if (i === currentSlideIndex) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    if (slideDots.length) {
      slideDots.forEach((dot, i) => {
        if (i === currentSlideIndex) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }
  }

  function nextSlide() {
    showSlide(currentSlideIndex + 1);
  }

  function prevSlide() {
    showSlide(currentSlideIndex - 1);
  }

  function startAutoPlay() {
    stopAutoPlay();
    slideTimer = setInterval(nextSlide, 3000); // 3 seconds cycle
  }

  function stopAutoPlay() {
    if (slideTimer) clearInterval(slideTimer);
  }

  if (fullSlides.length > 0) {
    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        nextSlide();
        startAutoPlay();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        prevSlide();
        startAutoPlay();
      });
    }

    if (slideDots.length) {
      slideDots.forEach(dot => {
        dot.addEventListener('click', (e) => {
          e.preventDefault();
          const slideIdx = parseInt(dot.getAttribute('data-slide'));
          showSlide(slideIdx);
          startAutoPlay();
        });
      });
    }

    if (slideshowContainer) {
      slideshowContainer.addEventListener('mouseenter', stopAutoPlay);
      slideshowContainer.addEventListener('mouseleave', startAutoPlay);
    }

    startAutoPlay();
  }

  // Electives Database Mapping for Dynamic Form Dropdown

  const electivesData = {
    'bba': [
      'Marketing and Human Resource Management',
      'Marketing and Analytics'
    ],
    'bca': [
      'Data Science'
    ],
    'mba': [
      'Marketing',
      'Finance',
      'Human Resource Management',
      'Business Analytics',
      'Finance and Human Resource Management',
      'Information Technology',
      'Healthcare and Hospital Management',
      'Logistics and Supply Chain Management'
    ],
    'mca': [
      'Computer Science and Information Technology',
      'Artificial Intelligence and Machine Learning',
      'Data Science'
    ]
  };

  const coursesByStream = {
    'diploma': [
      'Diploma in Computer Science Engineering (CSE)',
      'Diploma in Mechanical Engineering (ME)',
      'Diploma in Electrical Engineering (EE)',
      'Diploma in Civil Engineering (CE)',
      'Diploma in Electronics & Communication Engineering',
      'Diploma in Pharmacy',
      'ANM',
      'GNM',
      'ETT- Elementary Teacher Training (D.El.Ed)',
      'Diploma - Working Professionals in CSE',
      'Diploma - Working Professionals in ME',
      'Diploma - Working Professionals in EE',
      'Diploma - Working Professionals in ECE'
    ],
    'undergraduate': [
      'B.Tech - Computer Science Engineering',
      'B.Tech CSE - Artificial Intelligence & Machine Learning (AI & ML)',
      'B.Tech - Mechanical Engineering',
      'B.Tech - Electrical Engineering',
      'B.Tech - Civil Engineering',
      'B.Tech - Electronics and Communication Engineering',
      'LLB',
      'BALLB',
      'Bachelor Of Pharmacy',
      'B.Sc. Nursing',
      'B.Sc. MLS - Medical Laboratory Science',
      'B.Sc. OTT - Operation Theatre Technology',
      'B.Sc. AOTT - Anaesthesia & Operation Theatre Technology',
      'B.Sc. RIT - Radiology & Imaging Technology',
      'B.Sc Cardiac Care Technology',
      'BA - Bachelor of Arts',
      'B.Ed.',
      'BA B.Ed',
      'B.Com (Hons.)',
      'B.Com Professionals',
      'BBA',
      'BCA',
      'B.Sc. Agriculture college in Chandigarh Punjab',
      'B.Sc Non-Medical',
      'Bachelor of Tourism & Travel Management (BTTM)',
      'B.A. Journalism & Mass Communication (BAJMC)'
    ],
    'postgraduate': [
      'M.Tech - Computer Science Engineering',
      'M.Tech Mechanical Engineering',
      'M.Tech Electronics & Communication',
      'M.Tech Civil Engineering',
      'MBA Finance',
      'MBA Human Resources Management',
      'MBA Marketing',
      'M.Sc Pharmaceutical Chemistry',
      'Master of Police Administration & Public Administration',
      'Master of Hospital Administration'
    ]
  };

  // DYNAMIC STREAM & COURSE SELECTOR LOGIC
  function initStreamCourseSelectors() {
    const streamSelects = document.querySelectorAll('select[name="stream"], .stream-select');

    streamSelects.forEach(streamSelect => {
      const form = streamSelect.closest('form');
      if (!form) return;
      const courseSelect = form.querySelector('select[name="program"], .course-select');
      if (!courseSelect) return;

      streamSelect.addEventListener('change', () => {
        const streamVal = streamSelect.value.toLowerCase();
        const currentCourseVal = courseSelect.value;
        courseSelect.innerHTML = '';

        if (!streamVal || !coursesByStream[streamVal]) {
          courseSelect.innerHTML = '<option value="">Select Stream First</option>';
          return;
        }

        const defaultOpt = document.createElement('option');
        defaultOpt.value = '';
        defaultOpt.textContent = 'Select Course';
        courseSelect.appendChild(defaultOpt);

        coursesByStream[streamVal].forEach(courseName => {
          const opt = document.createElement('option');
          opt.value = courseName;
          opt.textContent = courseName;
          if (courseName === currentCourseVal) {
            opt.selected = true;
          }
          courseSelect.appendChild(opt);
        });
      });

      if (streamSelect.value) {
        streamSelect.dispatchEvent(new Event('change'));
      }
    });
  }

  initStreamCourseSelectors();

  // 1. DYNAMIC ELECTIVES DROPDOWN IN ENQUIRE FORM
  const programSelect = document.getElementById('formProgramSelect');
  const electiveSelect = document.getElementById('formElectiveSelect');

  if (programSelect && electiveSelect) {
    programSelect.addEventListener('change', (e) => {
      const selectedProg = e.target.value.toLowerCase();
      electiveSelect.innerHTML = '<option value="">Select Elective</option>';

      if (electivesData[selectedProg]) {
        electivesData[selectedProg].forEach(elective => {
          const opt = document.createElement('option');
          opt.value = elective;
          opt.textContent = elective;
          electiveSelect.appendChild(opt);
        });
        electiveSelect.disabled = false;
      } else {
        electiveSelect.disabled = true;
      }
    });
  }

  // 2. ENQUIRE MODAL TOGGLE LOGIC
  function getModalOverlay() {
    return document.getElementById('enquiryModal');
  }

  function openModal(preselectProgram = '') {
    const modalOverlay = getModalOverlay();
    if (modalOverlay) {
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';

      const modalForm = modalOverlay.querySelector('form');
      if (modalForm) {
        const streamSelect = modalForm.querySelector('select[name="stream"]');
        const courseSelect = modalForm.querySelector('select[name="program"]');

        if (preselectProgram && streamSelect && courseSelect) {
          let foundStream = '';
          let foundCourseName = '';

          for (const [st, cList] of Object.entries(coursesByStream)) {
            for (const cName of cList) {
              if (cName.toLowerCase().includes(preselectProgram.toLowerCase()) || preselectProgram.toLowerCase().includes(st)) {
                foundStream = st;
                foundCourseName = cName;
                break;
              }
            }
            if (foundStream) break;
          }

          if (foundStream) {
            streamSelect.value = foundStream;
            streamSelect.dispatchEvent(new Event('change'));
            if (foundCourseName) {
              courseSelect.value = foundCourseName;
            }
          }
        }
      }
    }
  }

  function closeModal() {
    const modalOverlay = getModalOverlay();
    if (modalOverlay) {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  // Global Event Delegation for modal open/close
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.open-enquiry-modal');
    if (trigger) {
      e.preventDefault();
      const prog = trigger.getAttribute('data-program') || '';
      openModal(prog);
      return;
    }

    const closeBtn = e.target.closest('.close-modal-trigger');
    if (closeBtn) {
      closeModal();
      return;
    }

    const modalOverlay = getModalOverlay();
    if (modalOverlay && e.target === modalOverlay) {
      closeModal();
    }
  });

  // Close modal on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
      closeMobileDrawer();
    }
  });

  // 3. MOBILE SIDEBAR DRAWER TOGGLE (Robust Event Delegation)
  function openMobileDrawer() {
    const mobileDrawer = document.getElementById('mobileDrawer');
    const drawerOverlay = document.getElementById('drawerOverlay');
    if (mobileDrawer && drawerOverlay) {
      mobileDrawer.classList.add('active');
      drawerOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMobileDrawer() {
    const mobileDrawer = document.getElementById('mobileDrawer');
    const drawerOverlay = document.getElementById('drawerOverlay');
    if (mobileDrawer && drawerOverlay) {
      mobileDrawer.classList.remove('active');
      drawerOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  document.addEventListener('click', (e) => {
    const hamburgerTrigger = e.target.closest('#hamburgerBtn, .hamburger-btn');
    if (hamburgerTrigger) {
      e.preventDefault();
      openMobileDrawer();
      return;
    }

    const drawerCloseTrigger = e.target.closest('#drawerCloseBtn, .drawer-close-btn');
    if (drawerCloseTrigger) {
      e.preventDefault();
      closeMobileDrawer();
      return;
    }

    const overlayTrigger = e.target.closest('#drawerOverlay, .mobile-drawer-overlay');
    if (overlayTrigger && e.target === overlayTrigger) {
      closeMobileDrawer();
      return;
    }

    const drawerLink = e.target.closest('.drawer-menu a, .mobile-drawer a');
    if (drawerLink && !drawerLink.classList.contains('open-enquiry-modal')) {
      closeMobileDrawer();
    }
  });

  // 4. PROGRAM TABS FILTER
  const tabBtns = document.querySelectorAll('.tab-btn');
  const programCards = document.querySelectorAll('.program-card-col');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-tab');

      programCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 5. ACCORDION TOGGLES (Skills & FAQs)
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const parentItem = header.closest('.accordion-item');
      const isAlreadyActive = parentItem.classList.contains('active');

      // Close siblings if in standard accordion mode
      const parentGroup = parentItem.closest('.accordion-group');
      if (parentGroup) {
        parentGroup.querySelectorAll('.accordion-item').forEach(item => {
          item.classList.remove('active');
        });
      }

      if (!isAlreadyActive) {
        parentItem.classList.add('active');
      }
    });
  });

  // HELPER FUNCTION FOR STEP 1 LEAD SUBMISSION & STEP 2 REDIRECTION
  async function handleLeadSubmitAndRedirect(formElement, submitBtn, originalBtnText) {
    const formData = new FormData(formElement);
    const payload = {};
    formData.forEach((value, key) => { payload[key] = value; });

    // 1. Dispatch data to Formspree & Google Sheets Webhooks (Awaited to ensure transmission before redirect)
    await sendToExternalIntegrations(formData);

    // 2. Submit to local process-enquiry endpoint
    try {
      await fetch('/process-enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch (e) {
      console.log('Local enquiry endpoint note:', e);
    }

    // 3. Construct Step 2 Redirection URL with query params
    const name = payload.first_name || payload.name || '';
    const lastName = payload.last_name || '';
    const fullName = encodeURIComponent((name + ' ' + lastName).trim());
    const email = encodeURIComponent(payload.email || '');
    const mobile = encodeURIComponent(payload.mobile || '');
    const program = encodeURIComponent(payload.program || payload.course || '');

    const redirectUrl = `book-seat.html?name=${fullName}&email=${email}&mobile=${mobile}&program=${program}`;

    // 4. Redirect to Step 2 (Book Seat & Upload Certificates)
    window.location.href = redirectUrl;
  }

  // 6. AJAX LEAD FORM SUBMISSION TO process-enquiry.php (WITH REDIRECT TO STEP 2)
  const enquiryForm = document.getElementById('leadEnquiryForm');
  const formAlert = document.getElementById('formAlert');

  if (enquiryForm) {
    enquiryForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = enquiryForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn ? submitBtn.textContent : 'Apply Now';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Processing & Redirecting...';
      }

      await handleLeadSubmitAndRedirect(enquiryForm, submitBtn, originalBtnText);
    });
  }

  // 7. APPLY NOW HERO FORMS SUBMISSION (WITH REDIRECT TO STEP 2)
  const applyLeadForms = document.querySelectorAll('.apply-lead-form');
  applyLeadForms.forEach(form => {
    if (form.id !== 'leadEnquiryForm') {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Apply Now';
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'Processing & Redirecting...';
        }

        await handleLeadSubmitAndRedirect(form, submitBtn, originalBtnText);
      });
    }
  });

  // 7B. STEP 2 SEAT BOOKING FORM SUBMISSION (book-seat.html) WITH RAZORPAY PAYMENT & 2-FILE VALIDATION
  const seatBookingForm = document.getElementById('seatBookingForm');
  if (seatBookingForm) {
    seatBookingForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const btnBookSeat = document.getElementById('btnBookSeat');
      const seatAlert = document.getElementById('seatFormAlert');
      const originalText = btnBookSeat.innerHTML;

      if (seatAlert) {
        seatAlert.className = 'form-alert';
        seatAlert.style.display = 'none';
      }

      btnBookSeat.disabled = true;
      btnBookSeat.innerHTML = '<span>Processing Payment...</span>';

      const formData = new FormData(seatBookingForm);
      const nameVal = document.getElementById('bookName').value || 'Student';
      const courseVal = (document.getElementById('bookCourseSelect') && document.getElementById('bookCourseSelect').value) || document.getElementById('bookCourse').value || 'Selected Course';
      const batchVal = document.getElementById('bookBatch').value || 'Selected Batch';
      const emailVal = document.getElementById('paramEmail').value || '';
      const mobileVal = document.getElementById('paramMobile').value || '';

      const finalizeSeatBooking = async (paymentId) => {
        formData.append('razorpay_payment_id', paymentId);
        formData.append('payment_status', 'PAID');

        // 1. Dispatch to external webhooks in background (non-blocking for fast UI response)
        sendToExternalIntegrations(formData).catch(err => console.log('Background dispatch note:', err));

        // 2. Submit to local seat booking server endpoint in background
        fetch('/process-seat-booking', {
          method: 'POST',
          body: formData
        }).catch(err => console.log('Local seat booking backend note:', err));

        // 3. Instantly Display Success State
        const bookingHeader = document.getElementById('bookingHeader');
        const bookingSuccessCard = document.getElementById('bookingSuccessCard');
        const randomRef = 'UGI-SEAT-' + Math.floor(10000 + Math.random() * 90000);

        const elemApplicantName = document.getElementById('successApplicantName');
        const elemCourseName = document.getElementById('successCourseName');
        const elemBatchName = document.getElementById('successBatchName');
        const elemRefId = document.getElementById('successRefId');
        const elemPaymentId = document.getElementById('successPaymentId');

        if (elemApplicantName) elemApplicantName.textContent = nameVal;
        if (elemCourseName) elemCourseName.textContent = courseVal;
        if (elemBatchName) elemBatchName.textContent = batchVal;
        if (elemRefId) elemRefId.textContent = randomRef;
        if (elemPaymentId) elemPaymentId.textContent = paymentId;

        if (bookingHeader) bookingHeader.style.display = 'none';
        seatBookingForm.style.display = 'none';
        if (bookingSuccessCard) bookingSuccessCard.style.display = 'block';

        window.scrollTo({ top: 100, behavior: 'smooth' });
      };

      // Ensure Razorpay key is retrieved if not yet loaded
      if (!RAZORPAY_KEY_ID && typeof fetch !== 'undefined') {
        try {
          const cfgRes = await fetch('/api/config');
          const cfg = await cfgRes.json();
          if (cfg && cfg.razorpay_key_id) {
            RAZORPAY_KEY_ID = cfg.razorpay_key_id;
          }
        } catch (e) { }
      }

      if (!RAZORPAY_KEY_ID) {
        RAZORPAY_KEY_ID = 'rzp_live_bWTZeZdjtDN95M';
      }

      // Launch Razorpay Payment Gateway Checkout Modal
      if (typeof Razorpay !== 'undefined' && RAZORPAY_KEY_ID) {
        const options = {
          key: RAZORPAY_KEY_ID,
          amount: (typeof SEAT_BOOKING_AMOUNT_INR !== 'undefined' ? SEAT_BOOKING_AMOUNT_INR : 1000) * 100,
          currency: 'INR',
          name: 'Universal Group of Institutions',
          description: `Seat Reservation Fee - ${courseVal}`,
          image: 'assets/images/universal_logo.png',
          prefill: {
            name: nameVal,
            email: emailVal,
            contact: mobileVal
          },
          theme: {
            color: '#CA2526'
          },
          handler: async function (response) {
            const paymentId = response.razorpay_payment_id || ('pay_' + Math.random().toString(36).substring(2, 10));
            await finalizeSeatBooking(paymentId);
          },
          modal: {
            ondismiss: function () {
              btnBookSeat.disabled = false;
              btnBookSeat.innerHTML = originalText;
            }
          }
        };

        try {
          const rzp = new Razorpay(options);
          rzp.open();
        } catch (err) {
          console.error('Razorpay popup launch error:', err);
          if (seatAlert) {
            seatAlert.className = 'form-alert error';
            seatAlert.textContent = 'Unable to launch Razorpay payment popup. Please try again or check pop-up blocker settings.';
            seatAlert.style.display = 'block';
          }
          btnBookSeat.disabled = false;
          btnBookSeat.innerHTML = originalText;
        }
      } else {
        console.error('Razorpay SDK or Key not available');
        if (seatAlert) {
          seatAlert.className = 'form-alert error';
          seatAlert.textContent = 'Payment Gateway is currently unavailable. Please try again later or contact support.';
          seatAlert.style.display = 'block';
        }
        btnBookSeat.disabled = false;
        btnBookSeat.innerHTML = originalText;
      }
    });
  }

  // 8. EXACT MEGA MENU TAB & PROGRAM SWITCHING
  const megaLevelTabs = document.querySelectorAll('.mega-level-tab');
  const megaSubTabGroups = document.querySelectorAll('.mega-sub-tabs');
  const megaSubTabs = document.querySelectorAll('.mega-sub-tab');
  const megaPanels = document.querySelectorAll('.mega-program-panel');

  megaLevelTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const level = tab.dataset.level;

      megaLevelTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      let foundSubGroup = false;
      megaSubTabGroups.forEach(group => {
        if (group.classList.contains(level + '-subs')) {
          group.classList.add('active');
          foundSubGroup = true;
          const firstSub = group.querySelector('.mega-sub-tab');
          if (firstSub) firstSub.click();
        } else {
          group.classList.remove('active');
        }
      });

      if (!foundSubGroup) {
        megaPanels.forEach(panel => {
          if (panel.id === 'panel-' + level) {
            panel.classList.add('active');
          } else {
            panel.classList.remove('active');
          }
        });
      }
    });
  });

  megaSubTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const prog = tab.dataset.program;

      const parentGroup = tab.closest('.mega-sub-tabs');
      if (parentGroup) {
        parentGroup.querySelectorAll('.mega-sub-tab').forEach(t => t.classList.remove('active'));
      }
      tab.classList.add('active');

      megaPanels.forEach(panel => {
        if (panel.id === 'panel-' + prog) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });
    });
  });

  const megaCloseBtn = document.querySelector('.mega-close-btn');
  if (megaCloseBtn) {
    megaCloseBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const megaMenu = megaCloseBtn.closest('.exact-mega-menu');
      if (megaMenu) {
        megaMenu.style.display = 'none';
        setTimeout(() => { megaMenu.style.display = ''; }, 500);
      }
    });
  }

  // NEWS AND EVENTS CARD SLIDER
  const newsTrack = document.getElementById('newsSliderTrack');
  if (newsTrack) {
    const newsContainer = newsTrack.parentElement;
    const newsCards = Array.from(newsTrack.children);
    const newsPrevBtn = document.querySelector('.news-slider-arrow.news-prev');
    const newsNextBtn = document.querySelector('.news-slider-arrow.news-next');
    const newsDotsContainer = document.getElementById('newsSliderDots');

    if (newsCards.length > 0) {
      let newsCurrentIndex = 0;
      let newsAutoplayTimer = null;

      function getCardsPerView() {
        const width = window.innerWidth;
        if (width < 576) return 1;
        if (width < 850) return 2;
        if (width < 1200) return 3;
        return 4;
      }

      function getMaxIndex() {
        const cardsPerView = getCardsPerView();
        return Math.max(0, newsCards.length - cardsPerView);
      }

      function updateNewsSlider() {
        const cardWidth = newsCards[0].offsetWidth;
        const gap = 20; // 20px gap
        const maxIdx = getMaxIndex();

        if (newsCurrentIndex > maxIdx) {
          newsCurrentIndex = 0;
        } else if (newsCurrentIndex < 0) {
          newsCurrentIndex = maxIdx;
        }

        const moveAmount = newsCurrentIndex * (cardWidth + gap);
        newsTrack.style.transform = `translateX(-${moveAmount}px)`;
        updateNewsDots();
      }

      function renderNewsDots() {
        if (!newsDotsContainer) return;
        newsDotsContainer.innerHTML = '';
        const maxIdx = getMaxIndex();
        for (let i = 0; i <= maxIdx; i++) {
          const dot = document.createElement('button');
          dot.classList.add('news-dot');
          dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
          if (i === newsCurrentIndex) dot.classList.add('active');
          dot.addEventListener('click', () => {
            newsCurrentIndex = i;
            updateNewsSlider();
            resetNewsAutoplay();
          });
          newsDotsContainer.appendChild(dot);
        }
      }

      function updateNewsDots() {
        if (!newsDotsContainer) return;
        const dots = newsDotsContainer.querySelectorAll('.news-dot');
        dots.forEach((dot, idx) => {
          dot.classList.toggle('active', idx === newsCurrentIndex);
        });
      }

      function nextNewsSlide() {
        const maxIdx = getMaxIndex();
        if (newsCurrentIndex >= maxIdx) {
          newsCurrentIndex = 0;
        } else {
          newsCurrentIndex++;
        }
        updateNewsSlider();
      }

      function prevNewsSlide() {
        const maxIdx = getMaxIndex();
        if (newsCurrentIndex <= 0) {
          newsCurrentIndex = maxIdx;
        } else {
          newsCurrentIndex--;
        }
        updateNewsSlider();
      }

      if (newsNextBtn) {
        newsNextBtn.addEventListener('click', () => {
          nextNewsSlide();
          resetNewsAutoplay();
        });
      }

      if (newsPrevBtn) {
        newsPrevBtn.addEventListener('click', () => {
          prevNewsSlide();
          resetNewsAutoplay();
        });
      }

      function startNewsAutoplay() {
        stopNewsAutoplay();
        newsAutoplayTimer = setInterval(nextNewsSlide, 2800);
      }

      function stopNewsAutoplay() {
        if (newsAutoplayTimer) clearInterval(newsAutoplayTimer);
      }

      function resetNewsAutoplay() {
        stopNewsAutoplay();
        startNewsAutoplay();
      }

      if (newsContainer) {
        newsContainer.addEventListener('mouseenter', stopNewsAutoplay);
        newsContainer.addEventListener('mouseleave', startNewsAutoplay);
      }

      window.addEventListener('resize', () => {
        renderNewsDots();
        updateNewsSlider();
      });

      renderNewsDots();
      updateNewsSlider();
      startNewsAutoplay();
    }
  }

});
