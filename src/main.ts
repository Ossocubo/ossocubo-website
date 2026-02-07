import './style.css';

// Dark mode toggle functionality
const themeToggleBtn = document.getElementById('theme-toggle');
const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');

// Function to update icon visibility and logo
function updateThemeIcon() {
  const logoImg = document.getElementById('logo-img') as HTMLImageElement | null;

  if (document.documentElement.classList.contains('dark')) {
    themeToggleLightIcon?.classList.remove('hidden');
    themeToggleDarkIcon?.classList.add('hidden');
    if (logoImg) logoImg.src = '/images/ossocubo_logo_dark.webp';
  } else {
    themeToggleLightIcon?.classList.add('hidden');
    themeToggleDarkIcon?.classList.remove('hidden');
    if (logoImg) logoImg.src = '/images/ossocubo_logo.webp';
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

// Video Player functionality
const playButton = document.getElementById('play-button') as HTMLButtonElement | null;
const thumbnail = document.getElementById('video-thumbnail');
const video = document.getElementById('blue-volta-video') as HTMLVideoElement | null;

let videoLoaded = false;

function handlePlayClick() {
  if (!video || videoLoaded) return;

  // Disable button and show loading state
  if (playButton) {
    playButton.disabled = true;
    playButton.classList.add('opacity-50', 'cursor-wait');
  }

  // Create and add video sources (WebM primary, MP4 fallback)
  const sourceWebm = document.createElement('source');
  sourceWebm.src = '/videos/Blue_Volta_adventure.webm';
  sourceWebm.type = 'video/webm';
  video.appendChild(sourceWebm);

  const sourceMp4 = document.createElement('source');
  sourceMp4.src = '/videos/Blue_Volta_adventure.mp4';
  sourceMp4.type = 'video/mp4';
  video.appendChild(sourceMp4);

  // Handle video ready to play
  video.addEventListener('canplay', () => {
    videoLoaded = true;

    // Hide thumbnail and play button
    thumbnail?.classList.add('hidden');
    playButton?.classList.add('hidden');

    // Show video
    video.classList.remove('hidden');

    // Play video with sound
    video.play().catch(err => {
      console.error('Playback failed:', err);
    });
  }, { once: true });

  // Handle loading errors
  video.addEventListener('error', () => {
    if (playButton) {
      playButton.disabled = false;
      playButton.classList.remove('opacity-50', 'cursor-wait');
    }
    alert('Failed to load video. Please try again later.');
  }, { once: true });

  // Start loading the video
  video.load();
}

// Click event listener
playButton?.addEventListener('click', handlePlayClick);

// Keyboard accessibility (Enter and Space)
playButton?.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    handlePlayClick();
  }
});

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // Animate only once
    }
  });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in, .fade-in-logo').forEach(el => {
  observer.observe(el);
});


// Email obfuscation - assemble email from parts to prevent scraping
(function () {
  const emailBtn = document.getElementById('emailButton');
  const emailText = document.getElementById('emailText');

  if (emailBtn && emailText) {
    const user = emailBtn.getAttribute('data-user');
    const domain = emailBtn.getAttribute('data-domain');
    const email = user + '@' + domain;

    // Set the email text
    emailText.textContent = email;

    // Update aria-label for accessibility
    emailBtn.setAttribute('aria-label', 'Invia un email a ' + email);

    // Add click handler to open mailto
    emailBtn.addEventListener('click', function () {
      window.location.href = 'mailto:' + email;
    });
  }
})();

// Google Analytics event tracking for demo button
declare function gtag(...args: any[]): void;

const getDemoButton = document.getElementById('get-demo-button');
getDemoButton?.addEventListener('click', function () {
  gtag('event', 'get_demo_button_click', {
    event_category: 'engagement',
    event_label: 'Blue Volta itch.io demo Button',
    value: 1
  });
});
