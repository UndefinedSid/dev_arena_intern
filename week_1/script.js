// Day 1: Setup JavaScript
console.log("script.js loaded");

/**
 * Get element by selector with a clear error if missing.
 * @param {string} sel
 * @returns {HTMLElement}
 */
function $(sel) {
  const el = document.querySelector(sel);
  if (!el) {
    console.warn(`Selector not found: ${sel}`);
  }
  return el;
}

/**
 * Set text content safely.
 * @param {HTMLElement} el
 * @param {string} text
 */
function setText(el, text) {
  if (el) el.textContent = text;
}

/**
 * Show an error message near a field.
 * @param {HTMLElement} errorEl
 * @param {string} msg
 */
function showError(errorEl, msg) {
  if (!errorEl) return;
  errorEl.textContent = msg;
  errorEl.style.display = msg ? "block" : "none";
}

/**
 * Debounce helper for performant real-time validation.
 * @param {Function} fn
 * @param {number} delay
 */
function debounce(fn, delay = 250) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), delay);
  };
}

// ===== Global State / Constants =====
const LS_KEYS = {
  theme: "sid_theme",
  formDraft: "sid_contact_draft",
};

const EMAIL_REGEX =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// ===== DOM References =====
const statusBar = $("#statusBar");

const themeToggleBtn = $("#themeToggle");
const bodyEl = document.body;

const contactForm = $("#contactForm");
const nameInput = $("#name");
const emailInput = $("#email");
const messageInput = $("#message");
const nameError = $("#nameError");
const emailError = $("#emailError");
const messageError = $("#messageError");
const formFeedback = $("#formFeedback");

const skillsControls = $("#skillsControls");
const skillsList = $("#skillsList");

const gallery = $("#gallery");
const lightbox = $("#lightbox");
const lightboxImg = $("#lightboxImg");
const lightboxClose = $("#lightboxClose");

// ===== Day 2: DOM Manipulation =====
function updateStatus(message, ms = 1400) {
  if (!statusBar) return;
  setText(statusBar, message);
  statusBar.style.display = 'block';
  clearTimeout(updateStatus._t);
  updateStatus._t = setTimeout(() => { statusBar.style.display = 'none'; }, ms);
} 

// Dynamic footer year (non-breaking enhancement)
(function setFooterYear() {
  const yearEl = document.querySelector('#year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();

// ===== Day 3: Event Handling =====
// Example: highlight nav links on hover (simple interaction)
document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("mouseenter", () => link.style.textDecoration = "underline");
  link.addEventListener("mouseleave", () => link.style.textDecoration = "none");
});

// Smooth scroll for internal links & auto-close mobile nav
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const id = link.getAttribute('href');
    if (!id || id === '#') return;
    e.preventDefault();
    const target = document.querySelector(id);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (document.querySelector('#mainNav')?.classList.contains('open')) {
      document.querySelector('#mainNav').classList.remove('open');
      document.querySelector('#navToggle')?.setAttribute('aria-expanded', 'false');
    }
  });
});

// Header shrink on scroll
(function headerScroll() {
  const header = document.getElementById('siteHeader');
  if (!header) return;
  const onScroll = () => {
    if (window.scrollY > 64) header.classList.add('shrink'); else header.classList.remove('shrink');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// Nav toggle for mobile
const navToggle = document.querySelector('#navToggle');
const mainNav = document.querySelector('#mainNav');
if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const open = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

// Reveal-on-scroll (intersection observer)
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== Day 4: Form Validation (real-time + submit) =====
function validateName(value) {
  if (!value.trim()) return "Name is required.";
  if (value.trim().length < 2) return "Name must be at least 2 characters.";
  return "";
}

function validateEmail(value) {
  if (!value.trim()) return "Email is required.";
  if (!EMAIL_REGEX.test(value.trim())) return "Enter a valid email address.";
  return "";
}

function validateMessage(value) {
  if (!value.trim()) return "Message is required.";
  if (value.trim().length < 10) return "Message must be at least 10 characters.";
  return "";
}

function validateField(inputEl, errorEl, validatorFn) {
  const msg = validatorFn(inputEl.value);
  showError(errorEl, msg);
  return !msg;
}

function validateForm() {
  const isNameValid = validateField(nameInput, nameError, validateName);
  const isEmailValid = validateField(emailInput, emailError, validateEmail);
  const isMessageValid = validateField(messageInput, messageError, validateMessage);
  return isNameValid && isEmailValid && isMessageValid;
}

// Real-time validation (debounced)
if (nameInput) nameInput.addEventListener("input", debounce(() => validateField(nameInput, nameError, validateName)));
if (emailInput) emailInput.addEventListener("input", debounce(() => validateField(emailInput, emailError, validateEmail)));
if (messageInput) messageInput.addEventListener("input", debounce(() => validateField(messageInput, messageError, validateMessage)));

// Submit handling
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    formFeedback.textContent = "";
    if (!validateForm()) {
      e.preventDefault();
      setText(formFeedback, "Please fix the errors above before submitting.");
      formFeedback.style.color = "#c0392b";
      updateStatus("Form submission blocked: validation errors.");
    } else {
      updateStatus("Form submitted. Thank you!");
      // Optional: Clear local draft on successful submission
      localStorage.removeItem(LS_KEYS.formDraft);
    }
  });
}

// ===== Day 5: Interactive Features =====
// Feature 1: Dark Mode Toggle (with localStorage persistence)
function applyTheme(theme) {
  const isDark = theme === 'dark';
  bodyEl.classList.toggle('dark', isDark);
  if (themeToggleBtn) {
    themeToggleBtn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
    themeToggleBtn.textContent = isDark ? '☀️' : '🌙';
  }
  updateStatus(isDark ? 'Dark mode enabled.' : 'Light mode enabled.');
} 
function initTheme() {
  const saved = localStorage.getItem(LS_KEYS.theme) || "light";
  applyTheme(saved);
}
function toggleTheme() {
  const next = bodyEl.classList.contains("dark") ? "light" : "dark";
  localStorage.setItem(LS_KEYS.theme, next);
  applyTheme(next);
}
if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", toggleTheme);
  initTheme();
}

// Feature 2: Skills Filter (DOM manipulation)
function filterSkills(category) {
  const items = skillsList ? skillsList.querySelectorAll("li") : [];
  items.forEach((li) => {
    const cat = li.getAttribute("data-cat");
    const show = category === "all" || category === cat;
    li.style.display = show ? "list-item" : "none";
  });
  updateStatus(`Skills filtered: ${category}`);
}
if (skillsControls) {
  skillsControls.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-filter]");
    if (!btn) return;
    const cat = btn.getAttribute("data-filter");
    filterSkills(cat);
  });
}

// Feature 3: Image Lightbox (gallery)
function openLightbox(src, alt = "Image") {
  if (!lightbox || !lightboxImg) return;
  lightboxImg.src = src;
  lightboxImg.alt = alt;
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
  updateStatus("Lightbox opened.");
}
function closeLightbox() {
  if (!lightbox) return;
  lightbox.hidden = true;
  document.body.style.overflow = "";
  updateStatus("Lightbox closed.");
}
// Project image interactions: open modal (if inside project-card) or lightbox otherwise
if (gallery) {
  gallery.addEventListener("click", (e) => {
    const img = e.target.closest("img.thumb");
    if (!img) return;

    const cardLink = img.closest('a.project-card');
    if (cardLink) {
      // Open project modal instead of navigating
      e.preventDefault();
      openProjectModalFromCard(cardLink);
      return;
    }

    // Otherwise open generic lightbox (for standalone images)
    openLightbox(img.src, img.alt);
  });
}

// Project modal logic
const projectModal = document.getElementById('projectModal');
const projectModalClose = document.getElementById('projectModalClose');
const projectModalImg = document.getElementById('projectModalImg');
const projectModalTitle = document.getElementById('projectModalTitle');
const projectModalDesc = document.getElementById('projectModalDesc');
const projectModalDemo = document.getElementById('projectModalDemo');
const projectModalCode = document.getElementById('projectModalCode');
const projectModalDetails = document.getElementById('projectModalDetails');
let _lastFocused = null;

function openProjectModalFromCard(card) {
  // Extract details from the card and its sibling link buttons
  const title = card.querySelector('.project h3')?.textContent || 'Project';
  const desc = card.querySelector('.project p')?.textContent || '';
  const imgEl = card.querySelector('img.thumb');
  const imgSrc = imgEl?.getAttribute('src') || imgEl?.src || '';

  // Try to find demo/code links within nearby .project-links-inline (sibling after card)
  const sibling = card.nextElementSibling;
  let demoHref = '#';
  let codeHref = '#';
  if (sibling && sibling.classList.contains('project-links-inline')) {
    demoHref = sibling.querySelector('a')?.href || '#';
    codeHref = sibling.querySelectorAll('a')[1]?.href || '#';
  }

  // Fill modal
  projectModalTitle.textContent = title;
  projectModalDesc.textContent = desc;
  projectModalImg.src = imgSrc;
  projectModalDemo.href = demoHref;
  projectModalCode.href = codeHref;
  projectModalDetails.href = card.getAttribute('href') || '#';

  // Show
  projectModal.hidden = false;
  projectModal.setAttribute('aria-hidden', 'false');

  // Focus management
  _lastFocused = document.activeElement;
  projectModalClose.focus();

  // Trap focus
  document.addEventListener('focus', trapFocus, true);
  document.addEventListener('keydown', onModalKeyDown);
}

function closeProjectModal() {
  projectModal.hidden = true;
  projectModal.setAttribute('aria-hidden', 'true');
  document.removeEventListener('focus', trapFocus, true);
  document.removeEventListener('keydown', onModalKeyDown);
  if (_lastFocused) _lastFocused.focus();
}

function trapFocus(e) {
  if (!projectModal || projectModal.hidden) return;
  if (!projectModal.contains(e.target)) {
    e.stopPropagation();
    projectModalClose.focus();
  }
}

function onModalKeyDown(e) {
  if (e.key === 'Escape') closeProjectModal();
  if (e.key === 'Tab') {
    // Simple tab trap: rotate focus inside modal
    const focusable = projectModal.querySelectorAll('a[href], button:not([disabled])');
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
}

// Close handlers
projectModalClose?.addEventListener('click', closeProjectModal);
projectModal?.addEventListener('click', (e) => { if (e.target.classList.contains('project-modal__backdrop')) closeProjectModal(); });

if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
if (lightbox) {
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox(); // click backdrop to close
  });
}

// Certificate modal logic (viewer for PDFs)
const certModal = document.getElementById('certModal');
const certModalClose = document.getElementById('certModalClose');
const certFrame = document.getElementById('certFrame');
const certModalTitle = document.getElementById('certModalTitle');
const certDownload = document.getElementById('certDownload');
const certVerify = document.getElementById('certVerify');

function openCertModal(src, title = '', verify = '') {
  if (!certModal) return;
  certFrame.src = src;
  certModalTitle.textContent = title || 'Certificate';
  certDownload.href = src;
  if (verify) { certVerify.href = verify; certVerify.hidden = false; } else { certVerify.hidden = true; certVerify.href = '#'; }

  certModal.hidden = false;
  certModal.setAttribute('aria-hidden', 'false');

  // Focus management
  _lastFocused = document.activeElement;
  certModalClose.focus();
  document.addEventListener('focus', trapCertFocus, true);
  document.addEventListener('keydown', onCertKeyDown);
}

function closeCertModal() {
  if (!certModal) return;
  certModal.hidden = true;
  certModal.setAttribute('aria-hidden', 'true');
  certFrame.src = '';
  document.removeEventListener('focus', trapCertFocus, true);
  document.removeEventListener('keydown', onCertKeyDown);
  if (_lastFocused) _lastFocused.focus();
}

function trapCertFocus(e) {
  if (!certModal || certModal.hidden) return;
  if (!certModal.contains(e.target)) {
    e.stopPropagation();
    certModalClose.focus();
  }
}

function onCertKeyDown(e) {
  if (e.key === 'Escape') closeCertModal();
  if (e.key === 'Tab') {
    const focusable = certModal.querySelectorAll('a[href], button:not([disabled])');
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
}

certModalClose?.addEventListener('click', closeCertModal);
certModal?.addEventListener('click', (e) => { if (e.target.classList.contains('project-modal__backdrop')) closeCertModal(); });

// Wire up gallery buttons
document.querySelectorAll('.cert-view').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const src = btn.dataset.src;
    const title = btn.dataset.title || '';
    const verify = btn.dataset.verify || '';
    openCertModal(src, title, verify);
  });
});

// Optional: clicking the thumbnail also opens the viewer
const certGrid = document.querySelector('.certs-grid');
if (certGrid) {
  certGrid.addEventListener('click', (e) => {
    const thumb = e.target.closest('img.cert-thumb');
    if (!thumb) return;
    const card = thumb.closest('.cert-card');
    const btn = card.querySelector('.cert-view');
    if (btn) btn.click();
  });
}

// Bonus Feature 4: Scroll-to-Top button (optional)
(function addScrollToTop() {
  const btn = document.createElement("button");
  btn.id = "scrollTop";
  btn.textContent = "↑ Top";
  btn.style.position = "fixed";
  btn.style.right = "1rem";
  btn.style.bottom = "1rem";
  btn.style.display = "none";
  btn.style.padding = "0.5rem 0.75rem";
  btn.style.border = "none";
  btn.style.borderRadius = "6px";
  btn.style.background = "#333";
  btn.style.color = "#fff";
  btn.style.cursor = "pointer";
  document.body.appendChild(btn);

  function onScroll() {
    btn.style.display = window.scrollY > 300 ? "block" : "none";
  }
  window.addEventListener("scroll", onScroll);
  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
})();

// ===== Day 6: Local Storage =====
// Persist theme already covered.
// Persist contact form draft.
function saveFormDraft() {
  const draft = {
    name: nameInput?.value || "",
    email: emailInput?.value || "",
    message: messageInput?.value || "",
    ts: Date.now(),
  };
  localStorage.setItem(LS_KEYS.formDraft, JSON.stringify(draft));
}
function restoreFormDraft() {
  const raw = localStorage.getItem(LS_KEYS.formDraft);
  if (!raw) return;
  try {
    const draft = JSON.parse(raw);
    if (nameInput && draft.name) nameInput.value = draft.name;
    if (emailInput && draft.email) emailInput.value = draft.email;
    if (messageInput && draft.message) messageInput.value = draft.message;
    updateStatus("Restored your last form draft.");
  } catch {
    // ignore parse errors
  }
}
if (contactForm) {
  const debouncedSave = debounce(saveFormDraft, 300);
  ["input", "change"].forEach((evt) => {
    contactForm.addEventListener(evt, debouncedSave);
  });
  restoreFormDraft();
}

// ===== Day 7: Testing & Debugging Hooks =====
function simulateStatus(msg, ms = 1200) {
  updateStatus(msg, ms);
}

// Indicate ready
simulateStatus('Interactive features ready.', 1200);