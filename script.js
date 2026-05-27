/**
 * Urban Muscle - Premium Fitness Club Script Page
 * Vanilla ES6 JavaScript for advanced animations, sliders, and calculators
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all features
  initStickyHeader();
  initMobileNavigation();
  initScrollReveal();
  initHeroParallax();
  init3dTiltEffects();
  initGalleryFiltering();
  initWorkoutSchedule();
  initBmiCalculator();
  initTestimonialCarousel();
  initFormInteractivity();
});

/* 1. STICKY HEADER WITH DYNAMIC SCROLL BAR */
function initStickyHeader() {
  const header = document.querySelector('header');
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  header.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    // Header Blur and Border Additions
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll Progress bar percentage calculation
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolledPercentage = windowHeight > 0 ? (window.scrollY / windowHeight) * 100 : 0;
    progressBar.style.width = scrolledPercentage + '%';
  });
}

/* 2. MOBILE NAVIGATION OVERLAY TOGGLER */
function initMobileNavigation() {
  const mobileToggle = document.querySelector('.mobile-toggle');
  const overlay = document.querySelector('.mobile-nav-overlay');
  const closeBtn = document.querySelector('.mobile-nav-close');
  const overlayLinks = document.querySelectorAll('.mobile-nav-links a');

  if (!mobileToggle || !overlay || !closeBtn) return;

  const toggleMenu = () => {
    overlay.classList.toggle('open');
    document.body.style.overflow = overlay.classList.contains('open') ? 'hidden' : '';
  };

  mobileToggle.addEventListener('click', toggleMenu);
  closeBtn.addEventListener('click', toggleMenu);

  overlayLinks.forEach(link => {
    link.addEventListener('click', () => {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* 3. SCROLL REVEAL VIA EXPERT INTERSECTION OBSERVER */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-element');

  if (revealElements.length === 0) return;

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Unobserve to keep site memory optimal once loaded
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(elem => {
    revealObserver.observe(elem);
  });
}

/* 4. BACKGROUND IMAGE PARALLAX EFFEC on SCROLL */
function initHeroParallax() {
  const heroBg = document.querySelector('.hero-bg');
  if (!heroBg) return;

  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    // Lower velocity movement for elegant aesthetic
    heroBg.style.transform = `scale(1.05) translateY(${scrollPosition * 0.12}px)`;
  });
}

/* 5. 3D CARD COORDINATE TILT & PARALLAX GLOW ENGINE */
function init3dTiltEffects() {
  const tiltCards = document.querySelectorAll('.badge-3d-visual, .program-card, .price-card');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const cardRect = card.getBoundingClientRect();
      const cardWidth = cardRect.width;
      const cardHeight = cardRect.height;
      
      // Calculate cursor coordinates relative to the card's center
      const cursorX = e.clientX - cardRect.left - cardWidth / 2;
      const cursorY = e.clientY - cardRect.top - cardHeight / 2;

      // Map limits (max rotation 12deg is elite and eye-comfortable)
      const maxRotation = 12;
      const rotateX = -(cursorY / (cardHeight / 2)) * maxRotation;
      const rotateY = (cursorX / (cardWidth / 2)) * maxRotation;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    card.addEventListener('mouseleave', () => {
      // Return automatically with smooth cubic ease
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'none'; // Snappy control on hover entry
    });
  });
}

/* 6. ADVANCED IMAGE GALLERY SELECTION / FILTER LAYOUTS */
function initGalleryFiltering() {
  const tabs = document.querySelectorAll('.gallery-tab');
  const items = document.querySelectorAll('.gallery-item');

  if (tabs.length === 0 || items.length === 0) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Toggle Tab Activity states
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterValue = tab.getAttribute('data-filter');

      items.forEach(item => {
        const itemCategory = item.getAttribute('data-category');

        // Apply visual scale out transition when filtering
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.classList.remove('hidden');
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.85)';
          // Fully hide after animations complete
          setTimeout(() => {
            item.classList.add('hidden');
          }, 350);
        }
      });
    });
  });
}

/* 7. DAILY PROGRAM TIMELINE LOADER */
function initWorkoutSchedule() {
  const dayButtons = document.querySelectorAll('.schedule-day-btn');
  const timeline = document.querySelector('.schedule-timeline');

  // Hardcoded full gym schedule representations for active tab loading
  const scheduleData = {
    monday: [
      { name: "HIIT Endurance Fusion", time: "06:00 AM - 07:30 AM", trainer: "Ananya Shrivastava", intensity: "Vigorous / High" },
      { name: "Olympic Powerlifting", time: "09:30 AM - 11:30 AM", trainer: "Rohan Malhotra", intensity: "Elite Elite" },
      { name: "Urban Athletic Build", time: "05:00 PM - 06:30 PM", trainer: "Arjun Kapoor", intensity: "Moderate - High" },
      { name: "Boxing Conditioning", time: "07:00 PM - 08:30 PM", trainer: "Rohan Malhotra", intensity: "Intense Cardio" }
    ],
    tuesday: [
      { name: "Ashtanga Flow Yoga", time: "07:00 AM - 08:30 AM", trainer: "Ananya Shrivastava", intensity: "Mild - Recovery" },
      { name: "Strength Peak Hypertrophy", time: "10:00 AM - 12:00 PM", trainer: "Arjun Kapoor", intensity: "Advanced Heavy" },
      { name: "Cross Metabolic Conditioning", time: "05:30 PM - 07:00 PM", trainer: "Rohan Malhotra", intensity: "Very Active" },
      { name: "Calisthenics & core", time: "07:30 PM - 08:30 PM", trainer: "Ananya Shrivastava", intensity: "Moderate Core" }
    ],
    wednesday: [
      { name: "Cardio Kickboxing Shred", time: "06:00 AM - 07:30 AM", trainer: "Rohan Malhotra", intensity: "Elite Cardio" },
      { name: "Functional Mobility & Body", time: "09:30 AM - 11:00 AM", trainer: "Ananya Shrivastava", intensity: "Regenerating" },
      { name: "Olympic Weight Squat Blocks", time: "05:00 PM - 07:00 PM", trainer: "Arjun Kapoor", intensity: "Max Power" },
      { name: "Pilates Power Alignment", time: "07:30 PM - 08:30 PM", trainer: "Ananya Shrivastava", intensity: "Moderate Resistance" }
    ],
    thursday: [
      { name: "Pranayama Yoga Session", time: "07:00 AM - 08:15 AM", trainer: "Ananya Shrivastava", intensity: "Relaxed Mind" },
      { name: "Upper Body Hypertrophy Blast", time: "10:00 AM - 11:30 AM", trainer: "Arjun Kapoor", intensity: "High Pumping" },
      { name: "HIIT Endurance Fusion", time: "05:30 PM - 06:45 PM", trainer: "Rohan Malhotra", intensity: "High Metabolic" },
      { name: "Kettlebell Conditioning", time: "07:00 PM - 08:15 PM", trainer: "Arjun Kapoor", intensity: "Heavy Dynamic" }
    ],
    friday: [
      { name: "Deadlift & Pull Strength", time: "06:00 AM - 07:30 AM", trainer: "Rohan Malhotra", intensity: "Peak Power" },
      { name: "Spine Mobility & Stretch", time: "10:00 AM - 11:30 AM", trainer: "Ananya Shrivastava", intensity: "Mild Healing" },
      { name: "Urban Athletic Build", time: "05:00 PM - 06:30 PM", trainer: "Arjun Kapoor", intensity: "Moderate - High" },
      { name: "Friday Night Sparring Duel", time: "07:00 PM - 08:30 PM", trainer: "Rohan Malhotra", intensity: "High Contact" }
    ],
    saturday: [
      { name: "Full Body Shred Bootcamp", time: "08:00 AM - 09:30 AM", trainer: "Arjun Kapoor", intensity: "Extreme Volume" },
      { name: "Vinyasa Core Flow Yoga", time: "10:30 AM - 12:00 PM", trainer: "Ananya Shrivastava", intensity: "Active Balance" },
      { name: "Olympic Platform Open Access", time: "02:00 PM - 05:00 PM", trainer: "Rohan Malhotra", intensity: "Self Paced" }
    ]
  };

  if (dayButtons.length === 0 || !timeline) return;

  const renderSchedule = (day) => {
    const workouts = scheduleData[day] || [];
    let html = `<div class="timeline-line"></div>`;

    workouts.forEach((item, index) => {
      html += `
        <div class="schedule-item reveal-element active" style="transition-delay: ${index * 0.12}s">
          <div class="schedule-time">${item.time}</div>
          <div class="schedule-bullet"></div>
          <div class="schedule-data">
            <h4 class="schedule-workout-name">${item.name}</h4>
            <div class="schedule-workout-details">
              <span><i class="fa-solid fa-user-ninja"></i> Coach: ${item.trainer}</span>
              <span><i class="fa-solid fa-fire text-gold"></i> Burn: ${item.intensity}</span>
            </div>
          </div>
        </div>
      `;
    });

    timeline.innerHTML = html;
  };

  dayButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      dayButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetDay = btn.getAttribute('data-day');
      
      // Fade out transition trigger
      timeline.style.opacity = '0';
      timeline.style.transform = 'translateY(15px)';
      timeline.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

      setTimeout(() => {
        renderSchedule(targetDay);
        timeline.style.opacity = '1';
        timeline.style.transform = 'translateY(0)';
      }, 300);
    });
  });

  // Default initial load
  renderSchedule('monday');
}

/* 8. DYNAMIC METRIC-IMPERIAL UNIT BMI GAUGE ENGINE */
function initBmiCalculator() {
  const submitBtn = document.querySelector('.btn-bmi-submit');
  const unitBtns = document.querySelectorAll('.unit-btn');
  
  const heightInput = document.getElementById('bmi-height');
  const weightInput = document.getElementById('bmi-weight');
  const heightLabel = document.getElementById('height-unit-label');
  const weightLabel = document.getElementById('weight-unit-label');
  
  const gaugeNeedle = document.querySelector('.gauge-needle');
  const bmiNumDisplay = document.querySelector('.gauge-bmi-num');
  const bmiLabelDisplay = document.querySelector('.gauge-bmi-label');
  const feedbackTitle = document.querySelector('.feedback-title');
  const feedbackAdvice = document.querySelector('.feedback-advice');

  let activeUnit = 'metric'; // metric or imperial

  if (!submitBtn || !heightInput || !weightInput) return;

  // 8.1 Unit Selection Actions
  unitBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      unitBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeUnit = btn.getAttribute('data-unit');

      if (activeUnit === 'metric') {
        heightLabel.textContent = 'Height (cm)';
        weightLabel.textContent = 'Weight (kg)';
        heightInput.placeholder = 'e.g. 175';
        weightInput.placeholder = 'e.g. 70';
        // Convert existing inputs if possible
        if (heightInput.value) {
          heightInput.value = Math.round(parseFloat(heightInput.value) * 2.54);
        }
        if (weightInput.value) {
          weightInput.value = Math.round(parseFloat(weightInput.value) * 0.453592);
        }
      } else {
        heightLabel.textContent = 'Height (inches)';
        weightLabel.textContent = 'Weight (lbs)';
        heightInput.placeholder = 'e.g. 69';
        weightInput.placeholder = 'e.g. 154';
        // Convert existing inputs if possible
        if (heightInput.value) {
          heightInput.value = Math.round(parseFloat(heightInput.value) / 2.54);
        }
        if (weightInput.value) {
          weightInput.value = Math.round(parseFloat(weightInput.value) / 0.453592);
        }
      }
    });
  });

  // 8.2 Core Calculator Algorithm
  submitBtn.addEventListener('click', () => {
    const heightVal = parseFloat(heightInput.value);
    const weightVal = parseFloat(weightInput.value);

    if (isNaN(heightVal) || isNaN(weightVal) || heightVal <= 0 || weightVal <= 0) {
      alert('Prestige Access: Please enter valid numbers for height and weight.');
      return;
    }

    let bmi = 0;
    if (activeUnit === 'metric') {
      const heightInMeters = heightVal / 100;
      bmi = weightVal / (heightInMeters * heightInMeters);
    } else {
      bmi = (weightVal / (heightVal * heightVal)) * 703;
    }

    bmi = parseFloat(bmi.toFixed(1));

    // Dial Needle Gauge rotation calculation:
    // BMI 15 (Underweight start) -> needles points to -100deg rotation.
    // BMI 35 (Obese target) -> needles points to +100deg rotation.
    let targetAngle = -100 + ((bmi - 15) / (35 - 15)) * 200;
    // Cap rotation between visual boundaries
    if (targetAngle < -115) targetAngle = -115;
    if (targetAngle > 115) targetAngle = 115;

    // Apply animation rotations
    gaugeNeedle.style.transform = `translate(-50%, -100%) rotate(${targetAngle}deg)`;
    
    // Dynamic value ticker helper
    animateNumericValue(parseFloat(bmiNumDisplay.textContent) || 0, bmi, 1200, (currentVal) => {
      bmiNumDisplay.textContent = currentVal.toFixed(1);
    });

    // Evaluate health state indices and provide physical athletic advices
    let healthState = '';
    let stateColor = '';
    let adviceTitle = '';
    let adviceText = '';

    if (bmi < 18.5) {
      healthState = 'Underweight';
      stateColor = '#38BDF8';
      adviceTitle = 'Athletic Strength & Bulk';
      adviceText = `Your current BMI highlights a lean state. To build robust muscle density, prioritize our extreme <strong>Olympic Powerlifting</strong> or classic resistance sessions. Focus heavily on hyper-nutrition, targeting a calculated caloric surplus packed with premium complete protein blocks.`;
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      healthState = 'Optimal Condition';
      stateColor = '#34D399';
      adviceTitle = 'Maintain Peak Performance';
      adviceText = `Outstanding balance! You are currently sitting in the prime athletic zone. To refine muscular symmetry, we highly recommend trying our complex <strong>Urban Athletic Build</strong> or pushing speed power boundaries. Focus on consistency with daily micronutrients and premium creatine levels.`;
    } else if (bmi >= 25.0 && bmi <= 29.9) {
      healthState = 'Overweight';
      stateColor = '#FBBF24';
      adviceTitle = 'Sculpt, Tone & Shred';
      adviceText = `Your physical composition indicators suggest a minor weight overload. Fuel metabolic optimization by incorporating <strong>HIIT Endurance Fusion</strong> circuits and heavy full-body squats into your program. Aim to create a subtle daily deficit with clean, lean macros and highly regulated carbs.`;
    } else {
      healthState = 'Obese Range';
      stateColor = '#EF4444';
      adviceTitle = 'Metabolic Renegade Reboot';
      adviceText = `Prioritize fat decomposition and cardiovascular defense. Begin a highly structured low-impact fitness phase featuring tailored coaching and structured mobility. We recommend gentle daily conditioning, a strong carb-restricted keto approach, and full recovery routines.`;
    }

    // Render outcomes in golden-rim UI panels
    setTimeout(() => {
      bmiLabelDisplay.textContent = healthState;
      bmiLabelDisplay.style.color = stateColor;
      feedbackTitle.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${adviceTitle}`;
      feedbackAdvice.innerHTML = adviceText;
    }, 450);
  });
}

function animateNumericValue(start, end, duration, callback) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const val = progress * (end - start) + start;
    callback(val);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}


/* 9. TESTIMONIALS SLIDER WITH STAGGER TRANSITIONS */
function initTestimonialCarousel() {
  const container = document.querySelector('.carousel-container');
  const slides = document.querySelectorAll('.carousel-slide');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  const indicatorsContainer = document.querySelector('.carousel-indicators');

  if (!container || slides.length === 0) return;

  let currentIndex = 0;
  const slideCount = slides.length;
  let autoplayTimer = null;

  // Create numeric circular indicators
  slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = `carousel-indicator ${i === 0 ? 'active' : ''}`;
    dot.setAttribute('data-slide', i);
    indicatorsContainer.appendChild(dot);
  });

  const indicators = document.querySelectorAll('.carousel-indicator');

  const goToSlide = (index) => {
    if (index < 0) index = slideCount - 1;
    if (index >= slideCount) index = 0;

    currentIndex = index;
    container.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Dynamic state update for circular checkers
    indicators.forEach((ind, idx) => {
      if (idx === currentIndex) {
        ind.classList.add('active');
      } else {
        ind.classList.remove('active');
      }
    });

    // Reset autoplay timers on manual interactions
    resetAutoplay();
  };

  const nextSlide = () => {
    goToSlide(currentIndex + 1);
  };

  const prevSlide = () => {
    goToSlide(currentIndex - 1);
  };

  // Nav clicks
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);

  // Bullet Indicator clicks
  indicators.forEach(indicator => {
    indicator.addEventListener('click', () => {
      const targetIdx = parseInt(indicator.getAttribute('data-slide'));
      goToSlide(targetIdx);
    });
  });

  // Autoplay Loop Logic
  const startAutoplay = () => {
    autoplayTimer = setInterval(nextSlide, 7000);
  };

  const resetAutoplay = () => {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      startAutoplay();
    }
  };

  startAutoplay();
}

/* 10. PREMIUM FORM FEEDBACK / NOTIFICATIONS */
function initFormInteractivity() {
  const cForm = document.querySelector('.contact-form');
  if (!cForm) return;

  cForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('cf-name').value;
    const email = document.getElementById('cf-email').value;
    
    if (!name || !email) {
      alert('Imperial standard notice: Please input matching Name & Email labels.');
      return;
    }

    // Fake sending mechanism with elegant notification block
    const submitBtn = cForm.querySelector('.btn-form-submit');
    const originalContent = submitBtn.innerHTML;

    submitBtn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Registering Profile...`;
    submitBtn.disabled = true;

    setTimeout(() => {
      // Trigger success container
      cForm.innerHTML = `
        <div class="reveal-element active" style="text-align: center; padding: 2rem 0; animation: scaleUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);">
          <i class="fa-solid fa-circle-check" style="font-size: 4.5rem; color: var(--gold-primary); text-shadow: 0 0 20px var(--gold-glow-strong); margin-bottom: 1.5rem;"></i>
          <h4 style="font-size: 1.8rem; margin-bottom: 0.8rem; letter-spacing: 0.05em; color: var(--text-white)">Welcome to Urban Muscle!</h4>
          <p style="color: var(--text-muted); max-width: 440px; margin: 0 auto 2.5rem; font-size: 0.95rem; line-height: 1.6">
            Elite Access Granted, <strong>${name}</strong>. A master trainer will reach you via <strong>${email}</strong> in less than 3 hours matching your peak goals. Prepare to break barriers.
          </p>
          <a href="#" class="btn-primary" onclick="window.location.reload()"><i class="fa-solid fa-redo"></i> Register Another Session</a>
        </div>
      `;
    }, 1800);
  });
}
