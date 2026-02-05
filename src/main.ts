import './style.css';

// Dark mode toggle functionality
const themeToggleBtn = document.getElementById('theme-toggle');
const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');

// Function to update icon visibility
function updateThemeIcon() {
  if (document.documentElement.classList.contains('dark')) {
    themeToggleLightIcon?.classList.remove('hidden');
    themeToggleDarkIcon?.classList.add('hidden');
  } else {
    themeToggleLightIcon?.classList.add('hidden');
    themeToggleDarkIcon?.classList.remove('hidden');
  }
}

// Initialize icon on page load
updateThemeIcon();

// Toggle dark mode on button click
themeToggleBtn?.addEventListener('click', () => {
  document.documentElement.classList.toggle('dark');

  // Save preference to localStorage
  if (document.documentElement.classList.contains('dark')) {
    localStorage.theme = 'dark';
  } else {
    localStorage.theme = 'light';
  }

  // Update icon
  updateThemeIcon();
});
