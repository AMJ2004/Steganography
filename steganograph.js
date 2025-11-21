/* ============================================
   RESPONSIVE STEGANOGRAPHY TOOL JAVASCRIPT
   Complete responsive functionality for all devices
   ============================================ */

console.log('Responsive Steganography Tool Loading...');

// ============================================
// GLOBAL VARIABLES
// ============================================
var operationModeOn = 0;        // 0 - image, 1 - text
var currentMode = 'hide';       // 'hide' or 'extract'
var currentContentType = 'image'; // 'image' or 'text'
var coverChanged = 0;
var start;
var hide;
var givenImage, extractedImage;
var currentTask = 0; // 0 -> hide, 1 -> extract

// ============================================
// MOBILE MENU FUNCTIONALITY
// ============================================
function initMobileMenu() {
    console.log('Initializing mobile menu...');
    
    // Create mobile menu toggle button if it doesn't exist
    let mobileToggle = document.getElementById('mobile-nav-toggle');
    if (!mobileToggle) {
        mobileToggle = document.createElement('button');
        mobileToggle.id = 'mobile-nav-toggle';
        mobileToggle.innerHTML = '<i class="fa fa-bars"></i>';
        mobileToggle.setAttribute('aria-label', 'Toggle mobile menu');
        
        const header = document.getElementById('header');
        if (header) {
            const container = header.querySelector('.container');
            if (container) {
                container.appendChild(mobileToggle);
            }
        }
    }
    
    // Create mobile nav overlay
    let mobileNav = document.getElementById('mobile-nav');
    if (!mobileNav) {
        mobileNav = document.createElement('div');
        mobileNav.id = 'mobile-nav';
        document.body.appendChild(mobileNav);
        
        // Clone desktop menu to mobile menu
        const desktopMenu = document.querySelector('.nav-menu');
        if (desktopMenu) {
            const mobileMenuClone = desktopMenu.cloneNode(true);
            mobileMenuClone.className = 'mobile-menu-list';
            mobileNav.appendChild(mobileMenuClone);
        }
    }
    
    // Create mobile body overlay
    let mobileOverlay = document.getElementById('mobile-body-overly');
    if (!mobileOverlay) {
        mobileOverlay = document.createElement('div');
        mobileOverlay.id = 'mobile-body-overly';
        document.body.appendChild(mobileOverlay);
    }
    
    // Toggle mobile menu
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function(e) {
            e.preventDefault();
            toggleMobileMenu();
        });
    }
    
    // Close mobile menu when overlay is clicked
    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', function() {
            closeMobileMenu();
        });
    }
    
    // Close mobile menu when menu item is clicked
    const mobileMenuLinks = mobileNav.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMobileMenu();
        });
    });
    
    console.log('Mobile menu initialized');
}

function toggleMobileMenu() {
    document.body.classList.toggle('mobile-nav-active');
    console.log('Mobile menu toggled');
}

function closeMobileMenu() {
    document.body.classList.remove('mobile-nav-active');
    console.log('Mobile menu closed');
}

// ============================================
// SMOOTH SCROLLING
// ============================================
function scrollToSection(sectionId) {
    console.log('Attempting to scroll to section:', sectionId);
    
    const section = document.getElementById(sectionId);
    if (!section) {
        console.error('Section not found:', sectionId);
        return;
    }
    
    // Close mobile menu if open
    closeMobileMenu();
    
    // Get header height for proper offset
    const header = document.getElementById('header');
    const headerHeight = header ? header.offsetHeight : 80;
    
    // Calculate scroll position
    const sectionTop = section.offsetTop - headerHeight - 20;
    
    // Smooth scroll to section
    window.scrollTo({
        top: sectionTop,
        behavior: 'smooth'
    });
    
    console.log('Scrolling to section:', sectionId, 'at position:', sectionTop);
    
    // Show information popup for Learn More
    if (sectionId === 'how-it-works') {
        setTimeout(() => {
            showLearnMoreInfo();
        }, 1000);
    }
}

function showLearnMoreInfo() {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        padding: 20px;
        animation: fadeIn 0.3s ease;
    `;
    
    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: var(--bg-primary, white);
        padding: 30px;
        border-radius: 12px;
        max-width: 600px;
        width: 100%;
        max-height: 90vh;
        overflow-y: auto;
        position: relative;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        animation: slideIn 0.3s ease;
    `;
    
    modalContent.innerHTML = `
        <div style="text-align: right; margin-bottom: 20px;">
            <button class="modal-close-btn" style="
                background: #f44336;
                color: white;
                border: none;
                padding: 8px 12px;
                border-radius: 50%;
                cursor: pointer;
                font-size: 20px;
                width: 36px;
                height: 36px;
                display: flex;
                align-items: center;
                justify-content: center;
            ">×</button>
        </div>
        <h2 style="color: var(--text-primary, #333); margin-bottom: 20px; text-align: center; font-size: clamp(1.5rem, 4vw, 2rem);">🔐 How Steganography Works</h2>
        
        <div style="line-height: 1.6; color: var(--text-color, #555); font-size: clamp(0.9rem, 2vw, 1rem);">
            <h3 style="color: var(--primary-color, #007bff); font-size: clamp(1.1rem, 3vw, 1.3rem);">What is Steganography?</h3>
            <p>Steganography is the practice of concealing a message, image, or file within another message, image, or file. Unlike cryptography, which makes data unreadable, steganography hides the very existence of the data.</p>
            
            <h3 style="color: var(--primary-color, #007bff); font-size: clamp(1.1rem, 3vw, 1.3rem);">How Our Tool Works:</h3>
            <ol style="padding-left: 20px;">
                <li><strong>Least Significant Bit (LSB) Technique:</strong> We modify the least significant bits of pixel values in the cover image to encode your hidden message.</li>
                <li><strong>Image Hiding:</strong> Hide one image inside another by manipulating pixel data.</li>
                <li><strong>Text Hiding:</strong> Embed text messages within image pixels using advanced encoding.</li>
                <li><strong>Extraction:</strong> Recover hidden content from steganographed images.</li>
            </ol>
            
            <h3 style="color: var(--primary-color, #007bff); font-size: clamp(1.1rem, 3vw, 1.3rem);">Key Features:</h3>
            <ul style="padding-left: 20px;">
                <li>✅ Secure LSB algorithm implementation</li>
                <li>✅ Support for both image and text hiding</li>
                <li>✅ Real-time processing and preview</li>
                <li>✅ Download capabilities for results</li>
                <li>✅ User-friendly responsive interface</li>
            </ul>
            
            <h3 style="color: var(--primary-color, #007bff); font-size: clamp(1.1rem, 3vw, 1.3rem);">Security Notes:</h3>
            <p>While steganography can hide data effectively, the security depends on keeping the steganography algorithm secret and using appropriate cover images. Always use high-quality images for best results.</p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; display: flex; gap: 10px; flex-wrap: wrap; justify-content: center;">
            <button class="modal-close-btn" style="
                background: #007bff;
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 8px;
                cursor: pointer;
                font-size: clamp(0.9rem, 2vw, 1rem);
                min-width: 100px;
            ">Got it!</button>
            <button class="modal-wiki-btn" style="
                background: #28a745;
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 8px;
                cursor: pointer;
                font-size: clamp(0.9rem, 2vw, 1rem);
                min-width: 140px;
            ">Learn More</button>
        </div>
    `;
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Add event listeners
    const closeButtons = modal.querySelectorAll('.modal-close-btn');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => modal.remove());
    });
    
    const wikiBtn = modal.querySelector('.modal-wiki-btn');
    if (wikiBtn) {
        wikiBtn.addEventListener('click', () => {
            window.open('https://en.wikipedia.org/wiki/Steganography', '_blank');
        });
    }
    
    // Close on overlay click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // Add CSS animations
    if (!document.getElementById('modal-animations')) {
        const style = document.createElement('style');
        style.id = 'modal-animations';
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes slideIn {
                from { transform: scale(0.8); opacity: 0; }
                to { transform: scale(1); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
}

// ============================================
// DARK MODE FUNCTIONALITY
// ============================================
function toggleDarkMode() {
    const body = document.body;
    const themeIcon = document.getElementById('themeIcon');
    const currentTheme = body.getAttribute('data-theme');
    
    if (currentTheme === 'dark') {
        body.removeAttribute('data-theme');
        if (themeIcon) themeIcon.className = 'fa fa-moon-o';
        localStorage.setItem('theme', 'light');
        console.log('Switched to light mode');
    } else {
        body.setAttribute('data-theme', 'dark');
        if (themeIcon) themeIcon.className = 'fa fa-sun-o';
        localStorage.setItem('theme', 'dark');
        console.log('Switched to dark mode');
    }
}

function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        const themeIcon = document.getElementById('themeIcon');
        if (themeIcon) {
            themeIcon.className = 'fa fa-sun-o';
        }
    }
}

// ============================================
// MODE SWITCHING FUNCTIONS
// ============================================
function switchMode(mode) {
    currentMode = mode;
    
    // Update mode tabs
    document.querySelectorAll('.mode-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Find the clicked tab and add active class
    const clickedTab = event ? event.target.closest('.mode-tab') : document.querySelector(`.mode-tab[onclick*="${mode}"]`);
    if (clickedTab) {
        clickedTab.classList.add('active');
    }
    
    // Show/hide content
    document.querySelectorAll('.mode-content').forEach(content => {
        content.classList.remove('active');
    });
    
    if (mode === 'hide') {
        const hideContext = document.getElementById('hideContext');
        if (hideContext) hideContext.classList.add('active');
    } else {
        const extractContext = document.getElementById('extractContext');
        if (extractContext) extractContext.classList.add('active');
    }
    
    // Reset results
    hideResults();
    
    console.log('Mode switched to:', mode);
}

function switchContentType(type) {
    currentContentType = type;
    operationModeOn = (type === 'text') ? 1 : 0;
    
    // Update type tabs
    document.querySelectorAll('.type-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Find the clicked tab and add active class
    const clickedTab = event ? event.target.closest('.type-tab') : document.querySelector(`.type-tab[onclick*="${type}"]`);
    if (clickedTab) {
        clickedTab.classList.add('active');
    }
    
    // Show/hide appropriate input areas
    const imageUpload = document.getElementById('imageUpload');
    const textInput = document.getElementById('textInput');
    
    if (type === 'image') {
        if (imageUpload) imageUpload.style.display = 'flex';
        if (textInput) textInput.style.display = 'none';
    } else {
        if (imageUpload) imageUpload.style.display = 'none';
        if (textInput) textInput.style.display = 'block';
    }
    
    // Reset results
    hideResults();
    
    console.log('Content type switched to:', type);
}

// ============================================
// RESULTS DISPLAY FUNCTIONS
// ============================================
function hideResults() {
    const resultsSection = document.getElementById('resultsSection');
    const extractionResults = document.getElementById('extractionResults');
    
    if (resultsSection) resultsSection.style.display = 'none';
    if (extractionResults) extractionResults.style.display = 'none';
}

function showResults() {
    if (currentMode === 'hide') {
        const resultsSection = document.getElementById("resultsSection");
        if (resultsSection) {
            resultsSection.style.display = "block";
            
            // Scroll to results on mobile
            if (window.innerWidth < 768) {
                setTimeout(() => {
                    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 300);
            }
        }
    } else {
        const extractionResults = document.getElementById("extractionResults");
        if (extractionResults) {
            extractionResults.style.display = "block";
            
            // Scroll to results on mobile
            if (window.innerWidth < 768) {
                setTimeout(() => {
                    extractionResults.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 300);
            }
        }
    }
    
    console.log("Results section displayed for mode:", currentMode);
}

// ============================================
// FILE MANAGEMENT FUNCTIONS
// ============================================
function updateFileInfo(inputId, fileInfoId, fileNameId, fileSizeId, statusId) {
    const input = document.getElementById(inputId);
    const fileInfo = document.getElementById(fileInfoId);
    const fileName = document.getElementById(fileNameId);
    const fileSize = document.getElementById(fileSizeId);
    const status = document.getElementById(statusId);
    
    if (input && input.files && input.files[0]) {
        const file = input.files[0];
        
        // Update file info display
        if (fileName) fileName.textContent = file.name;
        if (fileSize) fileSize.textContent = formatFileSize(file.size);
        if (fileInfo) fileInfo.style.display = 'flex';
        
        // Update status
        if (status) {
            const statusText = status.querySelector('.status-text');
            const statusDot = status.querySelector('.status-dot');
            if (statusText) statusText.textContent = 'Uploaded';
            if (statusDot) statusDot.className = 'status-dot';
        }
        
        console.log('File uploaded:', file.name, 'Size:', formatFileSize(file.size));
    }
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function removeHideFile() {
    const input = document.getElementById('hideIMG');
    const fileInfo = document.getElementById('hideFileInfo');
    const status = document.getElementById('hideStatus');
    const canvas = document.getElementById('hideIMGcanvas');
    const overlay = canvas ? canvas.nextElementSibling : null;
    
    if (input) input.value = '';
    if (fileInfo) fileInfo.style.display = 'none';
    
    if (status) {
        const statusText = status.querySelector('.status-text');
        const statusDot = status.querySelector('.status-dot');
        if (statusText) statusText.textContent = 'Ready';
        if (statusDot) statusDot.className = 'status-dot';
    }
    
    // Hide canvas and show overlay
    if (canvas) canvas.style.display = 'none';
    if (overlay) overlay.style.display = 'flex';
    
    // Clear the hide image variable
    hide = null;
    
    console.log('Hide file removed');
}

function removeCoverFile() {
    const input = document.getElementById('inthisIMG');
    const fileInfo = document.getElementById('coverFileInfo');
    const status = document.getElementById('coverStatus');
    const canvas = document.getElementById('inthisIMGcanvas');
    const overlay = canvas ? canvas.nextElementSibling : null;
    
    if (input) input.value = '';
    if (fileInfo) fileInfo.style.display = 'none';
    
    if (status) {
        const statusText = status.querySelector('.status-text');
        const statusDot = status.querySelector('.status-dot');
        if (statusText) statusText.textContent = 'Ready';
        if (statusDot) statusDot.className = 'status-dot';
    }
    
    // Hide canvas and show overlay
    if (canvas) canvas.style.display = 'none';
    if (overlay) overlay.style.display = 'flex';
    
    // Clear the start image variable
    start = null;
    
    console.log('Cover file removed');
}

function removeExtractFile() {
    const input = document.getElementById('extractIMG');
    const fileInfo = document.getElementById('extractFileInfo');
    const status = document.getElementById('extractStatus');
    const canvas = document.getElementById('extractIMGcanvas');
    const overlay = canvas ? canvas.nextElementSibling : null;
    
    if (input) input.value = '';
    if (fileInfo) fileInfo.style.display = 'none';
    
    if (status) {
        const statusText = status.querySelector('.status-text');
        const statusDot = status.querySelector('.status-dot');
        if (statusText) statusText.textContent = 'Ready';
        if (statusDot) statusDot.className = 'status-dot';
    }
    
    // Hide canvas and show overlay
    if (canvas) canvas.style.display = 'none';
    if (overlay) overlay.style.display = 'flex';
    
    // Clear the givenImage variable
    givenImage = null;
    
    console.log('Extract file removed');
}

// ============================================
// TEXT COUNTER FUNCTIONALITY
// ============================================
function updateCharCount() {
    const textarea = document.getElementById('textToHide');
    const counter = document.getElementById('charCount');
    if (textarea && counter) {
        counter.textContent = textarea.value.length;
    }
}

// ============================================
// UPLOAD FUNCTIONS
// ============================================
function uploadHIDE() {
    try {
        const hideCanvas = document.getElementById("hideIMGcanvas");
        const hideImageHolder = document.getElementById("hideIMG");
        const overlay = hideCanvas ? hideCanvas.nextElementSibling : null;
        
        if (!hideImageHolder || !hideImageHolder.files || !hideImageHolder.files[0]) {
            alert("Please select an image file first!");
            return;
        }
        
        // Update file info
        updateFileInfo('hideIMG', 'hideFileInfo', 'hideFileName', 'hideFileSize', 'hideStatus');
        
        hide = new SimpleImage(hideImageHolder);
        hide.drawTo(hideCanvas);
        
        // Show canvas and hide overlay
        if (hideCanvas) hideCanvas.style.display = "block";
        if (overlay) overlay.style.display = "none";
        
        console.log("Hide image uploaded successfully, dimensions:", hide.getWidth(), "x", hide.getHeight());
    } catch (error) {
        console.error("Error uploading hide image:", error);
        alert("Error uploading image. Please try again.");
    }
}

function uploadINSIDE(inputForTextHandling) {
    try {
        const startCanvas = document.getElementById("inthisIMGcanvas");
        const coverHolder = document.getElementById("inthisIMG");
        const overlay = startCanvas ? startCanvas.nextElementSibling : null;
        
        if (!coverHolder || !coverHolder.files || !coverHolder.files[0]) {
            alert("Please select a cover image file first!");
            return;
        }
        
        // Update file info
        updateFileInfo('inthisIMG', 'coverFileInfo', 'coverFileName', 'coverFileSize', 'coverStatus');
        
        start = new SimpleImage(coverHolder);
        start.drawTo(startCanvas);
        
        // Show canvas and hide overlay
        if (startCanvas) startCanvas.style.display = "block";
        if (overlay) overlay.style.display = "none";
        
        console.log("Cover image uploaded successfully, dimensions:", start.getWidth(), "x", start.getHeight());
    } catch (error) {
        console.error("Error uploading cover image:", error);
        alert("Error uploading cover image. Please try again.");
    }
}

function uploadExtractSrc() {
    try {
        const givenCanvas = document.getElementById("extractIMGcanvas");
        const givenImageHolder = document.getElementById("extractIMG");
        const overlay = givenCanvas ? givenCanvas.nextElementSibling : null;
        
        if (!givenImageHolder || !givenImageHolder.files || !givenImageHolder.files[0]) {
            alert("Please select an image file first!");
            return;
        }
        
        // Update file info
        updateFileInfo('extractIMG', 'extractFileInfo', 'extractFileName', 'extractFileSize', 'extractStatus');
        
        givenImage = new SimpleImage(givenImageHolder);
        givenImage.drawTo(givenCanvas);
        
        // Show canvas and hide overlay
        if (givenCanvas) givenCanvas.style.display = "block";
        if (overlay) overlay.style.display = "none";
        
        console.log("Extraction source image uploaded successfully, dimensions:", givenImage.getWidth(), "x", givenImage.getHeight());
    } catch (error) {
        console.error("Error uploading extraction source image:", error);
        alert("Error uploading image. Please try again.");
    }
}

// ============================================
// PROGRESS BAR FUNCTIONS
// ============================================
function showProgress(text = 'Processing...') {
    const progressContainer = document.getElementById('hideProgress');
    const progressText = document.getElementById('hideProgressText');
    const progressFill = document.getElementById('hideProgressFill');
    
    if (progressContainer && progressText && progressFill) {
        progressContainer.style.display = 'block';
        progressText.textContent = text;
        
        // Animate progress bar
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress >= 90) {
                progress = 90;
                clearInterval(interval);
            }
            progressFill.style.width = progress + '%';
        }, 200);
        
        return interval;
    }
    return null;
}

function hideProgress() {
    const progressContainer = document.getElementById('hideProgress');
    const progressFill = document.getElementById('hideProgressFill');
    
    if (progressFill) {
        progressFill.style.width = '100%';
    }
    
    setTimeout(() => {
        if (progressContainer) {
            progressContainer.style.display = 'none';
        }
        if (progressFill) {
            progressFill.style.width = '0%';
        }
    }, 500);
}

// ============================================
// BUTTON LOADING STATE
// ============================================
function setButtonLoading(btnId, loadingId, isLoading) {
    const btn = document.getElementById(btnId);
    const loading = document.getElementById(loadingId);
    const btnText = btn ? btn.querySelector('span') : null;
    
    if (btn && loading && btnText) {
        if (isLoading) {
            btnText.style.display = 'none';
            loading.style.display = 'block';
            btn.disabled = true;
        } else {
            btnText.style.display = 'inline';
            loading.style.display = 'none';
            btn.disabled = false;
        }
    }
}

// ============================================
// ANIMATED COUNTERS
// ============================================
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// ============================================
// BACK TO TOP BUTTON
// ============================================
function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.style.display = 'flex';
            } else {
                backToTop.style.display = 'none';
            }
        });
        
        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ============================================
// HEADER SCROLL EFFECT
// ============================================
function initHeaderScroll() {
    const header = document.getElementById('header');
    if (!header) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('header-fixed');
        } else {
            header.classList.remove('header-fixed');
        }
    });
}

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================
function setupAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .upload-card, .result-card, .tip-card, .contact-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// ============================================
// TOUCH GESTURES FOR MOBILE
// ============================================
function initTouchGestures() {
    let touchStartX = 0;
    let touchEndX = 0;
    
    const mobileNav = document.getElementById('mobile-nav');
    if (!mobileNav) return;
    
    mobileNav.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    mobileNav.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            // Swipe left - close menu
            closeMobileMenu();
        }
    }
}

// ============================================
// FORM VALIDATION
// ============================================
function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const subject = document.getElementById('subject');
        const message = contactForm.querySelector('textarea[name="message"]');
        
        // Simple validation
        if (!name.value.trim()) {
            alert('Please enter your name');
            name.focus();
            return;
        }
        
        if (!email.value.trim() || !isValidEmail(email.value)) {
            alert('Please enter a valid email address');
            email.focus();
            return;
        }
        
        if (!subject.value.trim()) {
            alert('Please enter a subject');
            subject.focus();
            return;
        }
        
        if (!message.value.trim()) {
            alert('Please enter a message');
            message.focus();
            return;
        }
        
        // Success message
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ============================================
// RESPONSIVE IMAGE HANDLING
// ============================================
function handleResponsiveImages() {
    const canvases = document.querySelectorAll('canvas');
    
    canvases.forEach(canvas => {
        if (canvas.width > 0 && canvas.height > 0) {
            // Adjust canvas display for mobile
            if (window.innerWidth < 768) {
                canvas.style.maxWidth = '100%';
                canvas.style.height = 'auto';
            }
        }
    });
}

// ============================================
// WINDOW RESIZE HANDLER
// ============================================
let resizeTimer;
function handleResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        console.log('Window resized to:', window.innerWidth, 'x', window.innerHeight);
        
        // Close mobile menu on desktop
        if (window.innerWidth >= 769) {
            closeMobileMenu();
        }
        
        // Handle responsive images
        handleResponsiveImages();
        
        // Re-adjust canvas sizes if needed
        adjustCanvasSizes();
    }, 250);
}

function adjustCanvasSizes() {
    const canvases = document.querySelectorAll('.upload-canvas, .result-canvas');
    canvases.forEach(canvas => {
        if (canvas.width > 0 && canvas.height > 0) {
            // Ensure canvases fit within their containers
            const container = canvas.parentElement;
            if (container) {
                const containerWidth = container.offsetWidth;
                if (canvas.width > containerWidth) {
                    const scale = containerWidth / canvas.width;
                    canvas.style.width = containerWidth + 'px';
                    canvas.style.height = (canvas.height * scale) + 'px';
                }
            }
        }
    });
}

// ============================================
// ORIENTATION CHANGE HANDLER
// ============================================
function handleOrientationChange() {
    console.log('Orientation changed');
    
    // Close mobile menu on orientation change
    closeMobileMenu();
    
    // Re-adjust layouts
    setTimeout(() => {
        handleResponsiveImages();
        adjustCanvasSizes();
    }, 300);
}

// ============================================
// KEYBOARD NAVIGATION
// ============================================
function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // Escape key closes mobile menu and modals
        if (e.key === 'Escape') {
            closeMobileMenu();
            
            // Close any open modals
            const modals = document.querySelectorAll('.modal-overlay');
            modals.forEach(modal => modal.remove());
        }
        
        // Tab navigation enhancement
        if (e.key === 'Tab') {
            // Add visible focus indicators for keyboard users
            document.body.classList.add('keyboard-nav');
        }
    });
    
    // Remove focus indicators on mouse use
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-nav');
    });
}

// ============================================
// LAZY LOADING FOR IMAGES
// ============================================
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ============================================
// PERFORMANCE MONITORING
// ============================================
function logPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log('Page Load Time:', pageLoadTime + 'ms');
        });
    }
}

// ============================================
// ERROR HANDLING
// ============================================
function initErrorHandling() {
    window.addEventListener('error', (e) => {
        console.error('Global error:', e.error);
        
        // Show user-friendly error message for critical errors
        if (e.error && e.error.message) {
            // Don't show errors for minor issues
            if (!e.error.message.includes('SimpleImage')) {
                showErrorMessage('An error occurred. Please refresh the page and try again.');
            }
        }
    });
    
    window.addEventListener('unhandledrejection', (e) => {
        console.error('Unhandled promise rejection:', e.reason);
    });
}

function showErrorMessage(message) {
    // Create error toast
    const toast = document.createElement('div');
    toast.className = 'error-toast';
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #f44336;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 10001;
        max-width: 300px;
        animation: slideInRight 0.3s ease;
    `;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 5000);
}

// ============================================
// NETWORK STATUS MONITORING
// ============================================
function initNetworkMonitoring() {
    window.addEventListener('online', () => {
        console.log('Network: Online');
        showSuccessMessage('Connection restored');
    });
    
    window.addEventListener('offline', () => {
        console.log('Network: Offline');
        showErrorMessage('No internet connection');
    });
}

function showSuccessMessage(message) {
    const toast = document.createElement('div');
    toast.className = 'success-toast';
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #4caf50;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 10001;
        max-width: 300px;
        animation: slideInRight 0.3s ease;
    `;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ============================================
// ACCESSIBILITY IMPROVEMENTS
// ============================================
function initAccessibility() {
    // Add ARIA labels to interactive elements
    const buttons = document.querySelectorAll('button:not([aria-label])');
    buttons.forEach(btn => {
        if (!btn.getAttribute('aria-label')) {
            const text = btn.textContent.trim();
            if (text) {
                btn.setAttribute('aria-label', text);
            }
        }
    });
    
    // Ensure all images have alt text
    const images = document.querySelectorAll('img:not([alt])');
    images.forEach(img => {
        img.setAttribute('alt', 'Image');
    });
    
    // Add focus trap for modals
    document.addEventListener('keydown', (e) => {
        const modal = document.querySelector('.modal-overlay');
        if (modal && e.key === 'Tab') {
            trapFocus(modal, e);
        }
    });
}

function trapFocus(element, event) {
    const focusableElements = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    
    if (event.shiftKey) {
        if (document.activeElement === firstFocusable) {
            event.preventDefault();
            lastFocusable.focus();
        }
    } else {
        if (document.activeElement === lastFocusable) {
            event.preventDefault();
            firstFocusable.focus();
        }
    }
}

// ============================================
// SERVICE WORKER (OPTIONAL FOR PWA)
// ============================================
function initServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            // Uncomment to enable service worker
            // navigator.serviceWorker.register('/sw.js')
            //     .then(reg => console.log('Service Worker registered:', reg))
            //     .catch(err => console.log('Service Worker registration failed:', err));
        });
    }
}

// ============================================
// LOCAL STORAGE MANAGEMENT
// ============================================
function saveToLocalStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.error('LocalStorage save failed:', e);
    }
}

function loadFromLocalStorage(key) {
    try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    } catch (e) {
        console.error('LocalStorage load failed:', e);
        return null;
    }
}

// ============================================
// HELPER UTILITY FUNCTIONS
// ============================================
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

function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ============================================
// TEST FUNCTIONS FOR DEBUGGING
// ============================================
function testScroll() {
    console.log('Testing scroll function...');
    scrollToSection('main-content');
}

function testDownload() {
    console.log("Testing download functionality...");
    
    try {
        const testCanvas = document.createElement('canvas');
        testCanvas.width = 100;
        testCanvas.height = 100;
        const ctx = testCanvas.getContext('2d');
        ctx.fillStyle = 'red';
        ctx.fillRect(0, 0, 100, 100);
        
        const downloadLink = document.createElement('a');
        downloadLink.download = 'test_image.png';
        downloadLink.href = testCanvas.toDataURL('image/png');
        
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        
        console.log("Test download successful");
        showSuccessMessage('Test download successful!');
    } catch (error) {
        console.error("Test download failed:", error);
        showErrorMessage('Test download failed: ' + error.message);
    }
}

function debugExtraction() {
    console.log("=== EXTRACTION DEBUG INFO ===");
    console.log("Operation mode:", operationModeOn, "(0=image, 1=text)");
    console.log("Current mode:", currentMode);
    console.log("Current content type:", currentContentType);
    console.log("Given image:", givenImage);
    console.log("Window dimensions:", window.innerWidth, "x", window.innerHeight);
    console.log("=== END DEBUG INFO ===");
}

// ============================================
// LOAD COVER IMAGE
// ============================================
function loadCover() {
    console.log('Loading cover image...');
    
    const img = new Image();
    img.onload = function() {
        console.log('Cover image loaded successfully');
        const canvas = document.getElementById('inthisIMGcanvas');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            console.log('Cover image drawn to canvas');
        }
    };
    
    img.onerror = function() {
        console.error('Failed to load cover image');
    };
    
    img.src = 'static/Photos/originalCover.jpg';
}

// ============================================
// DOWNLOAD FUNCTIONS
// ============================================
function download() {
    console.log("Download function called");
    try {
        const resultCanvas = document.getElementById("resultCanvas");
        if (!resultCanvas || resultCanvas.width === 0 || resultCanvas.height === 0) {
            showErrorMessage("Please process an image first");
            return;
        }
        
        const downloadLink = document.createElement('a');
        downloadLink.download = 'steganographed_image.png';
        downloadLink.href = resultCanvas.toDataURL('image/png');
        
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        
        showSuccessMessage('Download started!');
        console.log("Download initiated for steganographed image");
    } catch (error) {
        console.error("Download error:", error);
        showErrorMessage("Download failed: " + error.message);
    }
}

function downloadOriginalIMG() {
    try {
        const extractionCanvas = document.getElementById("extractionCanvas");
        if (!extractionCanvas) {
            showErrorMessage("No image to download");
            return;
        }
        
        const downloadLink = document.createElement('a');
        downloadLink.download = 'extracted_original_image.png';
        downloadLink.href = extractionCanvas.toDataURL('image/png');
        
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        
        showSuccessMessage('Download started!');
        console.log("Download initiated for extracted original image");
    } catch (error) {
        console.error("Download error:", error);
        showErrorMessage("Download failed");
    }
}

function downloadExtractedIMG() {
    try {
        const extractResultCanvas = document.getElementById("imageResult");
        if (!extractResultCanvas) {
            showErrorMessage("No image to download");
            return;
        }
        
        const downloadLink = document.createElement('a');
        downloadLink.download = 'extracted_content.png';
        downloadLink.href = extractResultCanvas.toDataURL('image/png');
        
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        
        showSuccessMessage('Download started!');
        console.log("Download initiated for extracted content");
    } catch (error) {
        console.error("Download error:", error);
        showErrorMessage("Download failed");
    }
}

// ============================================
// ADD ANIMATION STYLES
// ============================================
function addAnimationStyles() {
    if (!document.getElementById('responsive-animations')) {
        const style = document.createElement('style');
        style.id = 'responsive-animations';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
            
            .keyboard-nav *:focus {
                outline: 2px solid var(--primary-color, #007bff) !important;
                outline-offset: 2px !important;
            }
            
            @media (max-width: 768px) {
                .hero-btn {
                    width: 100%;
                    max-width: 280px;
                }
                
                .upload-area {
                    min-height: 200px !important;
                }
                
                .result-canvas {
                    max-width: 100% !important;
                    height: auto !important;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// ============================================
// MAIN INITIALIZATION
// ============================================
function initializeApp() {
    console.log('Initializing Responsive Steganography Tool...');
    
    // Initialize theme first
    initializeTheme();
    
    // Setup dark mode toggle
    const themeBtn = document.getElementById('darkModeToggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', toggleDarkMode);
    }
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize back to top button
    initBackToTop();
    
    // Initialize header scroll effect
    initHeaderScroll();
    
    // Setup animations
    setupAnimations();
    
    // Initialize touch gestures
    initTouchGestures();
    
    // Initialize form validation
    initFormValidation();
    
    // Initialize keyboard navigation
    initKeyboardNavigation();
    
    // Initialize lazy loading
    initLazyLoading();
    
    // Initialize accessibility features
    initAccessibility();
    
    // Initialize error handling
    initErrorHandling();
    
    // Initialize network monitoring
    initNetworkMonitoring();
    
    // Add animation styles
    addAnimationStyles();
    
    // Setup text counter
    const textarea = document.getElementById('textToHide');
    if (textarea) {
        textarea.addEventListener('input', updateCharCount);
    }
    
    // Setup window resize handler
    window.addEventListener('resize', handleResize);
    
    // Setup orientation change handler
    window.addEventListener('orientationchange', handleOrientationChange);
    
    // Animate counters when hero section is visible
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    heroObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        heroObserver.observe(heroSection);
    }
    
    // Log performance
    logPerformance();
    
    console.log('✅ Responsive Steganography Tool Initialized Successfully!');
    console.log('Device:', /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? 'Mobile' : 'Desktop');
    console.log('Screen size:', window.innerWidth, 'x', window.innerHeight);
}

// ============================================
// DOM CONTENT LOADED EVENT
// ============================================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    // DOM is already loaded
    initializeApp();
}

// ============================================
// EXPORT FUNCTIONS FOR GLOBAL ACCESS
// ============================================
window.scrollToSection = scrollToSection;
window.switchMode = switchMode;
window.switchContentType = switchContentType;
window.toggleDarkMode = toggleDarkMode;
window.uploadHIDE = uploadHIDE;
window.uploadINSIDE = uploadINSIDE;
window.uploadExtractSrc = uploadExtractSrc;
window.removeHideFile = removeHideFile;
window.removeCoverFile = removeCoverFile;
window.removeExtractFile = removeExtractFile;
window.download = download;
window.downloadOriginalIMG = downloadOriginalIMG;
window.downloadExtractedIMG = downloadExtractedIMG;
window.testScroll = testScroll;
window.testDownload = testDownload;
window.debugExtraction = debugExtraction;
window.showResults = showResults;
window.hideResults = hideResults;

console.log('Responsive JavaScript Module Loaded Successfully! 🚀');