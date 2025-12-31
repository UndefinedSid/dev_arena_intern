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
function updateStatus(message) {
  setText(statusBar, message);
  statusBar.style.background = "#eef";
  statusBar.style.padding = "0.5rem";
}

// Dynamic footer year (non-breaking enhancement)
(function setFooterYear() {
  const footer = document.querySelector("footer p");
  if (footer) {
    const yr = new Date().getFullYear();
    footer.innerHTML = `&copy; ${yr} Siddharth. All rights reserved.`;
  }
})();

// ===== Day 3: Event Handling =====
// Example: highlight nav links on hover (simple interaction)
document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("mouseenter", () => {
    link.style.textDecoration = "underline";
  });
  link.addEventListener("mouseleave", () => {
    link.style.textDecoration = "none";
  });
});

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
  const isDark = theme === "dark";
  bodyEl.classList.toggle("dark", isDark);
  setText(themeToggleBtn, isDark ? "☀️ Light Mode" : "🌙 Dark Mode");
  updateStatus(isDark ? "Dark mode enabled." : "Light mode enabled.");
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
if (gallery) {
  gallery.addEventListener("click", (e) => {
    const img = e.target.closest("img.thumb");
    if (!img) return;
    openLightbox(img.src, img.alt);
  });
}
if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
if (lightbox) {
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox(); // click backdrop to close
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
  updateStatus(msg);
  setTimeout(() => setText(statusBar, ""), ms);
}

// Indicate ready
simulateStatus("Interactive features ready.");