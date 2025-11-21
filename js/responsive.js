/* ============================================
   RESPONSIVE JAVASCRIPT
   Clean and optimized for all devices
   ============================================ */

'use strict';

// ============================================
// UTILITIES
// ============================================

/**
 * Check if device is mobile
 */
function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

/**
 * Check viewport width
 */
function getViewportWidth() {
  return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
}

/**
 * Debounce function for performance
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// ============================================
// MOBILE MENU FUNCTIONALITY
// ============================================

function initMobileMenu() {
  const mobileToggle = document.getElementById('mobile-nav-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileOverlay = document.getElementById('mobile-body-overly');

  if (!mobileToggle) return;

  mobileToggle.addEventListener('click', function(e) {
    e.preventDefault();
    toggleMobileMenu();
  });

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeMobileMenu);
  }

  // Close menu when link is clicked
  const menuLinks = document.querySelectorAll('#mobile-nav a, .nav-menu a');
  menuLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });
}

function toggleMobileMenu() {
  document.body.classList.toggle('mobile-nav-active');
}

function closeMobileMenu() {
  document.body.classList.remove('mobile-nav-active');
}

// ============================================
// BACK TO TOP BUTTON
// ============================================

function initBackToTop() {
  const backToTopBtn = document.querySelector('.back-to-top');

  if (!backToTopBtn) return;

  window.addEventListener('scroll', debounce(function() {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  }, 100));

  backToTopBtn.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ============================================
// SMOOTH SCROLLING
// ============================================

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        const headerHeight = document.getElementById('header')?.offsetHeight || 80;
        const targetPosition = target.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Scroll to specific section (called from inline onclick)
 */
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (!section) {
    console.warn('Section not found:', sectionId);
    return false;
  }
  
  try {
    const header = document.getElementById('header');
    const headerHeight = header ? header.offsetHeight : 80;
    const targetPosition = section.offsetTop - headerHeight - 10;
    
    window.scrollTo({
      top: Math.max(0, targetPosition),
      behavior: 'smooth'
    });
    
    // Close mobile menu if open
    const body = document.body;
    if (body.classList.contains('mobile-nav-active')) {
      closeMobileMenu();
    }
    
    // Add focus to section for accessibility
    section.focus();
    return true;
  } catch (error) {
    console.error('Error scrolling to section:', error);
    return false;
  }
}

// ============================================
// DARK MODE TOGGLE
// ============================================

function initDarkMode() {
  const darkModeToggle = document.getElementById('darkModeToggle');
  const themeIcon = document.getElementById('themeIcon');

  if (!darkModeToggle) return;

  // Check for saved theme preference or default to light
  const currentTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme, themeIcon);

  darkModeToggle.addEventListener('click', function() {
    const theme = document.documentElement.getAttribute('data-theme');
    const newTheme = theme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme, themeIcon);
  });

  // Respect system preference
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    if (!localStorage.getItem('theme')) {
      document.documentElement.setAttribute('data-theme', 'dark');
      updateThemeIcon('dark', themeIcon);
    }
  }
}

function updateThemeIcon(theme, icon) {
  if (!icon) return;
  icon.className = theme === 'dark' ? 'fa fa-sun-o' : 'fa fa-moon-o';
}

// ============================================
// FORM VALIDATION & HANDLING
// ============================================

function initForms() {
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(this);
      const submitBtn = this.querySelector('button[type="submit"]');
      
      if (!submitBtn) return;

      submitBtn.disabled = true;
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';

      // Simulate form submission (replace with actual API call)
      setTimeout(() => {
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }, 1500);
    });
  }
}

// ============================================
// TEXT COUNTER
// ============================================

function initTextCounter() {
  const textToHide = document.getElementById('textToHide');
  const charCount = document.getElementById('charCount');

  if (textToHide && charCount) {
    textToHide.addEventListener('input', function() {
      charCount.textContent = this.value.length;
    });
  }
}

// ============================================
// UPLOAD AREA CLICK HANDLERS
// ============================================

function initUploadHandlers() {
  // Map of upload areas to their corresponding file inputs
  const uploadMappings = [
    { areaId: 'hideIMG', uploadArea: null },
    { areaId: 'inthisIMG', uploadArea: null },
    { areaId: 'extractIMG', uploadArea: null }
  ];

  uploadMappings.forEach(mapping => {
    const fileInput = document.getElementById(mapping.areaId);
    if (!fileInput) return;

    // Find parent upload-area
    const uploadArea = fileInput.closest('.upload-area');
    if (!uploadArea) return;

    // Add click handler to upload-area
    uploadArea.addEventListener('click', function(e) {
      // Prevent triggering if clicking on file info remove button
      if (e.target.closest('.remove-file')) {
        return;
      }
      fileInput.click();
    });

    // Improve keyboard accessibility
    uploadArea.setAttribute('role', 'button');
    uploadArea.setAttribute('tabindex', '0');
    
    uploadArea.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        fileInput.click();
      }
    });
  });
}

// ============================================
// MODE & CONTENT TYPE SWITCHING
// ============================================

/**
 * Switch between hide and extract mode (called from inline onclick)
 */
function switchMode(mode) {
  currentMode = mode;

  // Update active tab
  document.querySelectorAll('.mode-tab').forEach(tab => {
    tab.classList.remove('active');
    tab.setAttribute('aria-selected', 'false');
  });

  const activeTab = document.querySelector(`[onclick*="'${mode}'"]`);
  if (activeTab) {
    activeTab.classList.add('active');
    activeTab.setAttribute('aria-selected', 'true');
  }

  // Show/hide content
  document.querySelectorAll('.mode-content').forEach(content => {
    content.classList.remove('active');
  });

  const modeContent = document.getElementById(mode === 'hide' ? 'hideContext' : 'extractContext');
  if (modeContent) {
    modeContent.classList.add('active');
  }
}

/**
 * Switch between image and text content type (called from inline onclick)
 */
function switchContentType(type) {
  currentContentType = type;

  // Update active tab
  document.querySelectorAll('.type-tab').forEach(tab => {
    tab.classList.remove('active');
    tab.setAttribute('aria-selected', 'false');
  });

  const activeTab = document.querySelector(`[onclick*="'${type}'"]`);
  if (activeTab) {
    activeTab.classList.add('active');
    activeTab.setAttribute('aria-selected', 'true');
  }

  // Show/hide content
  const imageUpload = document.getElementById('imageUpload');
  const textInput = document.getElementById('textInput');

  if (imageUpload && textInput) {
    if (type === 'image') {
      imageUpload.style.display = 'block';
      textInput.style.display = 'none';
    } else {
      imageUpload.style.display = 'none';
      textInput.style.display = 'block';
    }
  }
}

// ============================================
// FILE SIZE FORMATTER
// ============================================

function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

// ============================================
// UPLOAD PREVIEW HANDLING
// ============================================

function showFileInfo(fileInputId, fileInfoId, fileNameId, fileSizeId) {
  const fileInput = document.getElementById(fileInputId);
  const fileInfo = document.getElementById(fileInfoId);
  const fileName = document.getElementById(fileNameId);
  const fileSize = document.getElementById(fileSizeId);

  if (fileInput && fileInfo && fileName && fileSize && fileInput.files.length > 0) {
    const file = fileInput.files[0];
    fileName.textContent = file.name;
    fileSize.textContent = '(' + formatFileSize(file.size) + ')';
    fileInfo.style.display = 'flex';
  }
}

function hideFileInfo(fileInfoId, fileInputId) {
  const fileInfo = document.getElementById(fileInfoId);
  const fileInput = document.getElementById(fileInputId);

  if (fileInfo) {
    fileInfo.style.display = 'none';
  }
  if (fileInput) {
    fileInput.value = '';
  }
}

// ============================================
// RESPONSIVE UTILITIES
// ============================================

/**
 * Handle responsive image preview size
 */
function resizeCanvasContainer() {
  const canvases = document.querySelectorAll('.upload-canvas');
  const viewport = getViewportWidth();

  canvases.forEach(canvas => {
    if (viewport < 768) {
      canvas.style.maxHeight = '200px';
    } else if (viewport < 1200) {
      canvas.style.maxHeight = '300px';
    } else {
      canvas.style.maxHeight = '400px';
    }
  });
}

// ============================================
// SCROLL REVEAL ANIMATION
// ============================================

function initScrollReveal() {
  const reveals = document.querySelectorAll('.feature-card, .tip-card, .result-card');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(reveal => {
    reveal.style.opacity = '0';
    reveal.style.transform = 'translateY(20px)';
    reveal.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(reveal);
  });
}

// ============================================
// STAT COUNTER ANIMATION
// ============================================

function initStatCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  let hasAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        animateNumbers();
        observer.disconnect();
      }
    });
  });

  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) {
    observer.observe(heroStats);
  }

  function animateNumbers() {
    statNumbers.forEach(statNumber => {
      const target = parseInt(statNumber.getAttribute('data-target')) || 0;
      const duration = 2000;
      const increment = target / (duration / 16);
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          statNumber.textContent = target;
          clearInterval(timer);
        } else {
          statNumber.textContent = Math.floor(current);
        }
      }, 16);
    });
  }
}

// ============================================
// ACCESSIBILITY IMPROVEMENTS
// ============================================

function initA11y() {
  // Skip to main content link
  const skipLink = document.createElement('a');
  skipLink.href = '#main-content';
  skipLink.className = 'skip-to-main';
  skipLink.textContent = 'Skip to main content';
  skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 0;
    background: #000;
    color: #fff;
    padding: 8px;
    text-decoration: none;
    z-index: 100;
  `;
  
  skipLink.addEventListener('focus', () => {
    skipLink.style.top = '0';
  });
  
  skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
  });
  
  document.body.insertBefore(skipLink, document.body.firstChild);

  // Focus management
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMobileMenu();
    }
  });
}

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

/**
 * Lazy load images if needed
 */
function initLazyLoading() {
  if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.getAttribute('data-src');
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
  }
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  console.log('Responsive JS: Initializing...');

  // Initialize all features
  initMobileMenu();
  initBackToTop();
  initSmoothScroll();
  initDarkMode();
  initForms();
  initTextCounter();
  initUploadHandlers();
  initScrollReveal();
  initStatCounter();
  initA11y();
  initLazyLoading();

  // Responsive resize handler
  window.addEventListener('resize', debounce(resizeCanvasContainer, 250));
  resizeCanvasContainer();

  console.log('Responsive JS: Initialization complete');
});

// Handle orientation change
window.addEventListener('orientationchange', () => {
  closeMobileMenu();
  resizeCanvasContainer();
});

// Expose functions globally for inline onclick handlers
window.switchMode = switchMode;
window.switchContentType = switchContentType;
window.scrollToSection = scrollToSection;
