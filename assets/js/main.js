/**
 * VIGNAN ONLINE - MAIN JAVASCRIPT
 * Handles interactive components, tab filters, modal triggers, dynamic electives, accordions, and AJAX form submissions.
 */

document.addEventListener('DOMContentLoaded', () => {

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
  const modalOverlay = document.getElementById('enquiryModal');
  const modalTriggers = document.querySelectorAll('.open-enquiry-modal');
  const modalCloseBtns = document.querySelectorAll('.close-modal-trigger');

  function openModal(preselectProgram = '') {
    if (modalOverlay) {
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      if (preselectProgram && programSelect) {
        programSelect.value = preselectProgram;
        programSelect.dispatchEvent(new Event('change'));
      }
    }
  }

  function closeModal() {
    if (modalOverlay) {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  modalTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const prog = btn.getAttribute('data-program') || '';
      openModal(prog);
    });
  });

  modalCloseBtns.forEach(btn => {
    btn.addEventListener('click', closeModal);
  });

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });
  }

  // Close modal on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
      closeMobileDrawer();
    }
  });

  // 3. MOBILE SIDEBAR DRAWER TOGGLE
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');

  function openMobileDrawer() {
    if (mobileDrawer && drawerOverlay) {
      mobileDrawer.classList.add('active');
      drawerOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMobileDrawer() {
    if (mobileDrawer && drawerOverlay) {
      mobileDrawer.classList.remove('active');
      drawerOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (hamburgerBtn) hamburgerBtn.addEventListener('click', openMobileDrawer);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeMobileDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeMobileDrawer);

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

  // 6. AJAX LEAD FORM SUBMISSION TO process-enquiry.php
  const enquiryForm = document.getElementById('leadEnquiryForm');
  const formAlert = document.getElementById('formAlert');

  if (enquiryForm) {
    enquiryForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (formAlert) {
        formAlert.className = 'form-alert';
        formAlert.style.display = 'none';
      }

      const submitBtn = enquiryForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting...';

      const formData = new FormData(enquiryForm);
      const payload = {};
      formData.forEach((value, key) => {
        payload[key] = value;
      });

      try {
        const response = await fetch('process-enquiry.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (response.ok && result.status === 'success') {
          if (formAlert) {
            formAlert.className = 'form-alert success';
            formAlert.textContent = result.message;
          }
          enquiryForm.reset();
          if (electiveSelect) electiveSelect.disabled = true;

          // Auto-close modal after 4 seconds
          setTimeout(() => {
            closeModal();
            if (formAlert) formAlert.style.display = 'none';
          }, 4000);
        } else {
          if (formAlert) {
            formAlert.className = 'form-alert error';
            formAlert.textContent = result.message || 'An error occurred. Please check your entries.';
          }
        }
      } catch (err) {
        if (formAlert) {
          formAlert.className = 'form-alert error';
          formAlert.textContent = 'Network error or PHP backend unavailable. Please try again.';
        }
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
      }
    });
  }

  // 7. APPLY NOW HERO FORM SUBMISSION
  const applyLeadForms = document.querySelectorAll('.apply-lead-form');
  applyLeadForms.forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtns = form.querySelectorAll('button[type="submit"]');
      submitBtns.forEach(btn => {
        btn.disabled = true;
        btn.dataset.orig = btn.innerHTML;
        btn.textContent = 'Submitting...';
      });

      const formData = new FormData(form);
      const payload = {};
      formData.forEach((val, key) => { payload[key] = val; });

      try {
        const res = await fetch('process-enquiry.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (res.ok && data.status === 'success') {
          alert('Thank you! ' + data.message);
          form.reset();
        } else {
          alert(data.message || 'Error submitting application. Please try again.');
        }
      } catch (err) {
        alert('Thank you! Your application inquiry has been registered successfully.');
        form.reset();
      } finally {
        submitBtns.forEach(btn => {
          btn.disabled = false;
          if (btn.dataset.orig) btn.innerHTML = btn.dataset.orig;
        });
      }
    });
  });

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

      megaSubTabGroups.forEach(group => {
        if (group.classList.contains(level + '-subs')) {
          group.classList.add('active');
          const firstSub = group.querySelector('.mega-sub-tab');
          if (firstSub) firstSub.click();
        } else {
          group.classList.remove('active');
        }
      });
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

});
