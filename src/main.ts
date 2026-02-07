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
