function switchView(viewName) {
  // Hide all views
  document.querySelectorAll('.page-section').forEach(section => {
    section.classList.remove('active');
  });

  // Reset nav active state
  ['resume', 'projects', 'contact'].forEach(item => {
    const navEl = document.getElementById('nav-' + item);
    if (navEl) navEl.classList.remove('is-active');
  });

  // Show selected view
  const target = document.getElementById('view-' + viewName);
  if (target) target.classList.add('active');

  // Highlight active nav item
  const activeNav = document.getElementById('nav-' + viewName);
  if (activeNav) activeNav.classList.add('is-active');

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Custom message box instead of alert()
function showMessage(msg) {
  const msgBox = document.getElementById('message-box');
  const msgText = document.getElementById('message-text');

  msgText.textContent = msg;

  msgBox.classList.remove('translate-y-20', 'opacity-0', 'pointer-events-none');
  msgBox.classList.add('translate-y-0', 'opacity-100');

  setTimeout(closeMessage, 4000);
}

function closeMessage() {
  const msgBox = document.getElementById('message-box');
  msgBox.classList.remove('translate-y-0', 'opacity-100');
  msgBox.classList.add('translate-y-20', 'opacity-0', 'pointer-events-none');
}

// Light/dark theme toggle (persists choice; defaults to OS preference)
function currentTheme() {
  const set = document.documentElement.getAttribute('data-theme');
  if (set) return set;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function syncThemeToggle() {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  const dark = currentTheme() === 'dark';
  btn.setAttribute('aria-pressed', String(dark));
  btn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
}

function toggleTheme() {
  const next = currentTheme() === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  try { localStorage.setItem('theme', next); } catch (e) {}
  syncThemeToggle();
}

syncThemeToggle();
