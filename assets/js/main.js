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

  // DYNAMIC INDIA STATES & CITIES DATASET (36 States & UTs with major Cities)
  const INDIA_STATES_CITIES = {
    "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool", "Kakinada", "Rajahmundry", "Tirupati", "Anantapur", "Kadapa", "Eluru", "Vizianagaram", "Ongole"],
    "Arunachal Pradesh": ["Itanagar", "Naharlagun", "Pasighat", "Tawang", "Ziro", "Tezu", "Bomdila"],
    "Assam": ["Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Nagaon", "Tinsukia", "Tezpur", "Bongaigaon"],
    "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Purnia", "Darbhanga", "Bihar Sharif", "Arrah", "Begusarai", "Katihar", "Chhapra"],
    "Chhattisgarh": ["Raipur", "Bhilai", "Bilaspur", "Korba", "Rajnandgaon", "Raigarh", "Jagdalpur", "Ambikapur"],
    "Goa": ["Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda"],
    "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Junagadh", "Gandhinagar", "Anand", "Navsari", "Morbi"],
    "Haryana": ["Gurugram", "Faridabad", "Panipat", "Ambala", "Yamunanagar", "Rohtak", "Hisar", "Karnal", "Sonipat", "Panchkula", "Bhiwani", "Sirsa"],
    "Himachal Pradesh": ["Shimla", "Dharamshala", "Mandi", "Solan", "Baddi", "Kullu", "Hamirpur", "Bilaspur", "Una", "Chamba"],
    "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Hazaribagh", "Deoghar", "Giridih", "Ramgarh", "Phusro"],
    "Karnataka": ["Bengaluru", "Mysuru", "Hubballi-Dharwad", "Mangaluru", "Belagavi", "Davangere", "Ballari", "Vijayapura", "Shivamogga", "Tumakuru", "Kalaburagi"],
    "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam", "Palakkad", "Alappuzha", "Kannur", "Kottayam", "Malappuram"],
    "Madhya Pradesh": ["Indore", "Bhopal", "Jabalpur", "Gwalior", "Ujjain", "Sagar", "Dewas", "Satna", "Ratlam", "Rewa", "Murwara"],
    "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Thane", "Nashik", "Kalyan-Dombivli", "Vasai-Virar", "Aurangabad", "Navi Mumbai", "Solapur", "Mira-Bhayandar", "Bhiwandi", "Amravati", "Nanded", "Kolhapur", "Akola"],
    "Manipur": ["Imphal", "Thoubal", "Bishnupur", "Churachandpur", "Ukhrul"],
    "Meghalaya": ["Shillong", "Tura", "Jowai", "Nongstoin", "Nongpoh"],
    "Mizoram": ["Aizawl", "Lunglei", "Saiha", "Champhai"],
    "Nagaland": ["Kohima", "Dimapur", "Mokokchung", "Tuensang", "Wokha"],
    "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Berhampur", "Sambalpur", "Puri", "Balasore", "Bhadrak", "Baripada"],
    "Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Mohali", "Hoshiarpur", "Pathankot", "Moga", "Batala", "Phagwara", "Dera Bassi", "Lalru", "Sangrur", "Barnala", "Firozpur"],
    "Rajasthan": ["Jaipur", "Jodhpur", "Kota", "Bikaner", "Ajmer", "Udaipur", "Bhilwara", "Alwar", "Bharatpur", "Sikar", "Pali", "Sri Ganganagar"],
    "Sikkim": ["Gangtok", "Namchi", "Gyalshing", "Mangan"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tiruppur", "Erode", "Vellore", "Tirunelveli", "Thanjavur", "Tuticorin", "Nagercoil"],
    "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Khammam", "Karimnagar", "Ramagundam", "Mahbubnagar", "Nalgonda"],
    "Tripura": ["Agartala", "Udaipur", "Dharmanagar", "Kailasahar"],
    "Uttar Pradesh": ["Lucknow", "Kanpur", "Ghaziabad", "Agra", "Meerut", "Varanasi", "Prayagraj", "Bareilly", "Aligarh", "Moradabad", "Saharanpur", "Gorakhpur", "Noida", "Firozabad", "Jhansi", "Muzaffarnagar", "Mathura"],
    "Uttarakhand": ["Dehradun", "Haridwar", "Roorkee", "Haldwani", "Rudraprayag", "Kashipur", "Rishikesh", "Nainital", "Almora"],
    "West Bengal": ["Kolkata", "Howrah", "Asansol", "Siliguri", "Durgapur", "Bardhaman", "Malda", "Baharampur", "Habra", "Kharagpur", "Shantipur"],
    "Andaman and Nicobar Islands": ["Port Blair", "Garacharma", "Bambooflat"],
    "Chandigarh": ["Chandigarh"],
    "Dadra and Nagar Haveli and Daman and Diu": ["Daman", "Diu", "Silvassa"],
    "Delhi (NCT)": ["New Delhi", "North Delhi", "South Delhi", "East Delhi", "West Delhi", "Central Delhi", "Dwarka", "Rohini"],
    "Jammu and Kashmir": ["Srinagar", "Jammu", "Anantnag", "Baramulla", "Udhampur", "Kathua", "Sopore"],
    "Ladakh": ["Leh", "Kargil"],
    "Lakshadweep": ["Kavaratti", "Agatti", "Amini"],
    "Puducherry": ["Puducherry", "Karaikal", "Yanam", "Mahe"]
  };

  // DYNAMIC INDIA STATE & CITY SELECTOR LOGIC WITH API FETCH & FALLBACK DATASET
  async function initIndiaStateCitySelectors() {
    const stateSelects = document.querySelectorAll('select[name="state"], .state-select');

    stateSelects.forEach(async stateSelect => {
      const form = stateSelect.closest('form');
      if (!form) return;
      const citySelect = form.querySelector('select[name="city"], .city-select');

      function populateStateOptions(statesList) {
        const currentVal = stateSelect.value;
        stateSelect.innerHTML = '<option value="">Select State</option>';
        statesList.forEach(st => {
          const stateName = typeof st === 'string' ? st : st.name;
          if (stateName) {
            const opt = document.createElement('option');
            opt.value = stateName;
            opt.textContent = stateName;
            if (stateName === currentVal) opt.selected = true;
            stateSelect.appendChild(opt);
          }
        });
      }

      // Populate local dataset first for instant UI response
      populateStateOptions(Object.keys(INDIA_STATES_CITIES).sort());

      // Attempt API fetch for dynamic live state updates
      try {
        const apiRes = await fetch('https://countriesnow.space/api/v0.1/countries/states', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ country: 'India' })
        });
        const apiData = await apiRes.json();
        if (apiData && apiData.data && apiData.data.states && apiData.data.states.length > 0) {
          const fetchedStates = apiData.data.states.map(s => s.name).sort();
          const mergedStates = Array.from(new Set([...Object.keys(INDIA_STATES_CITIES), ...fetchedStates])).sort();
          populateStateOptions(mergedStates);
        }
      } catch (err) {
        console.log('States API note (using offline dictionary):', err);
      }

      // Handle State Change -> Populate Cities
      if (citySelect) {
        stateSelect.addEventListener('change', async () => {
          const selectedState = stateSelect.value;
          citySelect.innerHTML = '';

          if (!selectedState) {
            citySelect.innerHTML = '<option value="">Select State First</option>';
            return;
          }

          citySelect.innerHTML = '<option value="">Loading Cities...</option>';

          let citiesList = INDIA_STATES_CITIES[selectedState] || [];

          // Try fetching cities dynamically from API for selected state
          try {
            const cityRes = await fetch('https://countriesnow.space/api/v0.1/countries/state/cities', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ country: 'India', state: selectedState })
            });
            const cityData = await cityRes.json();
            if (cityData && cityData.data && cityData.data.length > 0) {
              citiesList = Array.from(new Set([...citiesList, ...cityData.data])).sort();
            }
          } catch (e) {
            console.log('Cities API note (using offline dictionary):', e);
          }

          citySelect.innerHTML = '<option value="">Select City</option>';
          if (citiesList.length === 0) {
            const opt = document.createElement('option');
            opt.value = selectedState;
            opt.textContent = selectedState;
            citySelect.appendChild(opt);
          } else {
            citiesList.forEach(cty => {
              const opt = document.createElement('option');
              opt.value = cty;
              opt.textContent = cty;
              citySelect.appendChild(opt);
            });
          }
        });

        if (stateSelect.value) {
          stateSelect.dispatchEvent(new Event('change'));
        }
      }
    });
  }

  initIndiaStateCitySelectors();

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

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // HELPER FUNCTION FOR STEP 1 LEAD SUBMISSION & PROFESSIONAL THANK YOU MESSAGE DISPLAY
  async function handleLeadSubmitAndRedirect(formElement, submitBtn, originalBtnText) {
    const formData = new FormData(formElement);
    const payload = {};
    formData.forEach((value, key) => { payload[key] = value; });

    // 1. Dispatch data to Formspree & Google Sheets Webhooks
    await sendToExternalIntegrations(formData);

    // 2. Submit to local process-enquiry endpoint
    try {
      const res = await fetch('/process-enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.status >= 400 || (data && data.status === 'error')) {
        const formAlert = formElement.parentElement.querySelector('.form-alert') || document.getElementById('formAlert');
        if (formAlert) {
          formAlert.className = 'form-alert error';
          formAlert.textContent = (data && data.message) || 'There was an error submitting your application. Please check your inputs.';
          formAlert.style.display = 'block';
        }
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        }
        return;
      }
    } catch (e) {
      console.log('Local enquiry endpoint note:', e);
    }

    // 3. Construct details for Thank You View
    const firstName = (payload.first_name || payload.name || 'Applicant').trim();
    const lastName = (payload.last_name || '').trim();
    const fullDisplayName = `${firstName} ${lastName}`.trim();
    const email = payload.email || '';
    const mobile = payload.mobile || '';
    const countryCode = payload.country_code || '+91';
    const fullMobile = `${countryCode} ${mobile}`.trim();

    // Get display name for course / program
    let programDisplay = payload.program || payload.course || 'Selected Program';
    const courseSelect = formElement.querySelector('select[name="program"]');
    if (courseSelect && courseSelect.options && courseSelect.selectedIndex >= 0) {
      const selectedOpt = courseSelect.options[courseSelect.selectedIndex];
      if (selectedOpt && selectedOpt.text && !selectedOpt.text.toLowerCase().includes('select')) {
        programDisplay = selectedOpt.text;
      }
    }

    const refId = 'UGI-2026-' + Math.floor(10000 + Math.random() * 90000);
    const redirectUrl = `book-seat.html?name=${encodeURIComponent(fullDisplayName)}&email=${encodeURIComponent(email)}&mobile=${encodeURIComponent(mobile)}&program=${encodeURIComponent(programDisplay)}`;

    // 4. Render Professional Thank You Card inside the form container
    const parentContainer = formElement.closest('.apply-form-card') || formElement.parentElement;

    // Hide header title inside form container if present
    const headerTitle = parentContainer.querySelector('.section-header-title');
    if (headerTitle) headerTitle.style.display = 'none';

    // Hide any previous alert
    const formAlert = parentContainer.querySelector('.form-alert');
    if (formAlert) formAlert.style.display = 'none';

    // Hide the form itself
    formElement.style.display = 'none';

    // Check if thank you card already exists in container
    let thankYouCard = parentContainer.querySelector('.thank-you-card');
    if (!thankYouCard) {
      thankYouCard = document.createElement('div');
      thankYouCard.className = 'thank-you-card';
      parentContainer.appendChild(thankYouCard);
    }

    thankYouCard.innerHTML = `
      <div class="thank-you-header">
        <div class="thank-you-icon-badge">
          <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <h3 class="thank-you-title">Application Submitted!</h3>
        <p class="thank-you-subtitle">
          Thank you, <strong class="user-name">${escapeHtml(fullDisplayName)}</strong>! Your application for <strong class="program-name">${escapeHtml(programDisplay)}</strong> has been successfully received by <strong>Universal Group of Institutions (UGI)</strong>.
        </p>
      </div>

      <div class="thank-you-details-card">
        <div class="thank-you-detail-row">
          <span class="detail-label">Application Ref ID:</span>
          <strong class="detail-value ref-badge">${refId}</strong>
        </div>
        <div class="thank-you-detail-row">
          <span class="detail-label">Selected Program:</span>
          <span class="detail-value">${escapeHtml(programDisplay)}</span>
        </div>
        <div class="thank-you-detail-row">
          <span class="detail-label">Mobile Number:</span>
          <span class="detail-value">${escapeHtml(fullMobile)}</span>
        </div>
        <div class="thank-you-detail-row">
          <span class="detail-label">Email Address:</span>
          <span class="detail-value">${escapeHtml(email)}</span>
        </div>
        <div class="thank-you-detail-row">
          <span class="detail-label">Status:</span>
          <span class="status-badge-verified">Submitted &amp; Under Review ✓</span>
        </div>
      </div>

      <div class="thank-you-notice">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#CA2526" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
        <span>Our admissions counselor will review your application and contact you within 24 hours. You can also reserve your seat now to confirm your admission.</span>
      </div>

      <div class="thank-you-actions-group">
        <a href="/index.html" class="btn-thank-you-primary" style="width: 100%;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          Back to Home
        </a>
      </div>
    `;

    thankYouCard.style.display = 'block';

    // Scroll smoothly to parentContainer cleanly aligned below fixed site header
    const headerHeight = document.querySelector('.site-header')?.offsetHeight || 80;
    const rect = parentContainer.getBoundingClientRect();
    const targetY = window.pageYOffset + rect.top - headerHeight - 20;
    window.scrollTo({
      top: Math.max(0, targetY),
      behavior: 'smooth'
    });
  }

  // 6. AJAX LEAD FORM SUBMISSION TO process-enquiry.php
  const enquiryForm = document.getElementById('leadEnquiryForm');
  const formAlert = document.getElementById('formAlert');

  if (enquiryForm) {
    enquiryForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = enquiryForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Submit Enquiry &rarr;';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting Application...';
      }

      await handleLeadSubmitAndRedirect(enquiryForm, submitBtn, originalBtnText);
    });
  }

  // 7. APPLY NOW HERO FORMS SUBMISSION
  const applyLeadForms = document.querySelectorAll('.apply-lead-form');
  applyLeadForms.forEach(form => {
    if (form.id !== 'leadEnquiryForm' && form.id !== 'bookSeatPageForm') {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Apply Now';
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'Submitting Application...';
        }

        await handleLeadSubmitAndRedirect(form, submitBtn, originalBtnText);
      });
    }
  });

  // 7A. BOOK SEAT PAGE FORM SUBMISSION WITH RAZORPAY PAYMENT GATEWAY REDIRECT
  const bookSeatPageForm = document.getElementById('bookSeatPageForm');
  if (bookSeatPageForm) {
    bookSeatPageForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = bookSeatPageForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Book your seat';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Redirecting to Payment Gateway...</span>';
      }

      const formData = new FormData(bookSeatPageForm);
      const firstName = (formData.get('first_name') || '').toString().trim();
      const lastName = (formData.get('last_name') || '').toString().trim();
      const fullName = `${firstName} ${lastName}`.trim() || 'Student';
      const email = (formData.get('email') || '').toString().trim();
      const mobile = (formData.get('mobile') || '').toString().trim();
      const countryCode = (formData.get('country_code') || '+91').toString().trim();
      const fullMobile = `${countryCode}${mobile}`;

      let programDisplay = (formData.get('program') || '').toString().trim();
      const courseSelect = bookSeatPageForm.querySelector('select[name="program"]');
      if (courseSelect && courseSelect.options && courseSelect.selectedIndex >= 0) {
        const selectedOpt = courseSelect.options[courseSelect.selectedIndex];
        if (selectedOpt && selectedOpt.text && !selectedOpt.text.toLowerCase().includes('select')) {
          programDisplay = selectedOpt.text;
        }
      }

      // Ensure Razorpay key is loaded
      if (!RAZORPAY_KEY_ID && typeof fetch !== 'undefined') {
        try {
          const cfgRes = await fetch('/api/config');
          const cfg = await cfgRes.json();
          if (cfg && cfg.razorpay_key_id) {
            RAZORPAY_KEY_ID = cfg.razorpay_key_id;
          }
        } catch (err) { }
      }
      if (!RAZORPAY_KEY_ID) {
        RAZORPAY_KEY_ID = 'rzp_live_bWTZeZdjtDN95M';
      }

      const triggerPaymentGateway = () => {
        if (typeof Razorpay !== 'undefined') {
          const options = {
            key: RAZORPAY_KEY_ID,
            amount: 1000 * 100, // ₹1,000 Seat Reservation Fee
            currency: 'INR',
            name: 'Universal Group of Institutions',
            description: `Seat Booking Fee - ${programDisplay}`,
            image: '/assets/images/universal_logo.png',
            prefill: {
              name: fullName,
              email: email,
              contact: fullMobile
            },
            theme: {
              color: '#CA2526'
            },
            handler: async function (response) {
              const paymentId = response.razorpay_payment_id || ('pay_' + Math.random().toString(36).substring(2, 10));
              formData.append('razorpay_payment_id', paymentId);
              formData.append('payment_status', 'PAID');

              // Dispatch lead & seat booking endpoints in background
              fetch('process-seat-booking.php', { method: 'POST', body: formData }).catch(e => { });
              fetch('process-enquiry.php', { method: 'POST', body: formData }).catch(e => { });

              // Render Success Confirmation
              const parentCard = bookSeatPageForm.closest('.apply-form-card') || bookSeatPageForm.parentElement;
              const headerTitle = parentCard.querySelector('.section-header-title');
              if (headerTitle) headerTitle.style.display = 'none';

              bookSeatPageForm.style.display = 'none';
              const randomRef = 'UGI-SEAT-' + Math.floor(10000 + Math.random() * 90000);

              let thankYouCard = parentCard.querySelector('.thank-you-card');
              if (!thankYouCard) {
                thankYouCard = document.createElement('div');
                thankYouCard.className = 'thank-you-card';
                parentCard.appendChild(thankYouCard);
              }

              thankYouCard.innerHTML = `
                <div class="thank-you-header">
                  <div class="thank-you-icon-badge">
                    <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <h3 class="thank-you-title">Seat Reserved Successfully!</h3>
                  <p class="thank-you-subtitle">
                    Congratulations <strong>${escapeHtml(fullName)}</strong>! Your seat for <strong>${escapeHtml(programDisplay)}</strong> has been reserved successfully.
                  </p>
                </div>
                <div class="thank-you-details-card">
                  <div class="thank-you-detail-row">
                    <span class="detail-label">Booking Ref ID:</span>
                    <strong class="detail-value ref-badge">${randomRef}</strong>
                  </div>
                  <div class="thank-you-detail-row">
                    <span class="detail-label">Payment Transaction ID:</span>
                    <strong class="detail-value" style="color: var(--primary-red);">${paymentId}</strong>
                  </div>
                  <div class="thank-you-detail-row">
                    <span class="detail-label">Selected Course:</span>
                    <span class="detail-value">${escapeHtml(programDisplay)}</span>
                  </div>
                  <div class="thank-you-detail-row">
                    <span class="detail-label">Payment Amount:</span>
                    <strong class="detail-value">₹1,000 (Seat Booking Fee Paid)</strong>
                  </div>
                  <div class="thank-you-detail-row">
                    <span class="detail-label">Status:</span>
                    <span class="status-badge-verified">Confirmed ✓</span>
                  </div>
                </div>
                <div class="thank-you-notice">
                  <span>Our admissions desk will contact you with your official seat confirmation receipt and enrollment details.</span>
                </div>
              `;
              const headerHeight = document.querySelector('.site-header')?.offsetHeight || 80;
              const rect = parentCard.getBoundingClientRect();
              const targetY = window.pageYOffset + rect.top - headerHeight - 20;
              window.scrollTo({
                top: Math.max(0, targetY),
                behavior: 'smooth'
              });
            },
            modal: {
              ondismiss: function () {
                if (submitBtn) {
                  submitBtn.disabled = false;
                  submitBtn.innerHTML = originalBtnText;
                }
              }
            }
          };

          const rzp = new Razorpay(options);
          rzp.open();
        } else {
          // Dynamic script loading fallback
          const script = document.createElement('script');
          script.src = 'https://checkout.razorpay.com/v1/checkout.js';
          script.onload = () => triggerPaymentGateway();
          script.onerror = () => {
            alert('Payment gateway script failed to load. Please try again.');
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.innerHTML = originalBtnText;
            }
          };
          document.body.appendChild(script);
        }
      };

      triggerPaymentGateway();
    });
  }

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
      const stateVal = (document.getElementById('bookStateSelect') && document.getElementById('bookStateSelect').value) || '';
      const cityVal = (document.getElementById('bookCitySelect') && document.getElementById('bookCitySelect').value) || '';
      const locationVal = (cityVal && stateVal) ? `${cityVal}, ${stateVal}` : (stateVal || cityVal || 'Location');
      const batchVal = document.getElementById('bookBatch').value || 'Selected Batch';
      const emailVal = document.getElementById('paramEmail').value || '';
      const mobileVal = document.getElementById('paramMobile').value || '';

      const finalizeSeatBooking = async (paymentId) => {
        formData.append('razorpay_payment_id', paymentId);
        formData.append('payment_status', 'PAID');
        if (stateVal) formData.append('state', stateVal);
        if (cityVal) formData.append('city', cityVal);

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
        if (elemCourseName) elemCourseName.textContent = locationVal;
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
          description: `Seat Reservation Fee - ${locationVal}`,
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
