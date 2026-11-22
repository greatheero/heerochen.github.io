function switchView(viewName) {
  // Hide all views
  document.querySelectorAll('.page-section').forEach(section => {
    section.classList.remove('active');
  });

  // Reset nav active state
  ['resume', 'projects', 'contact'].forEach(item => {
    const navEl = document.getElementById('nav-' + item);
    if (navEl) navEl.style.color = '#000000';
  });

  // Show selected view
  const target = document.getElementById('view-' + viewName);
  if (target) target.classList.add('active');

  // Highlight active nav item
  const activeNav = document.getElementById('nav-' + viewName);
  if (activeNav) activeNav.style.color = '#EEA302';

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