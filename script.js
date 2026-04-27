const slides = [...document.querySelectorAll('.slide')];
const spikeProgress = document.getElementById('spikeProgress');
const spikeHead = document.getElementById('spikeHead');
const depthReadout = document.getElementById('depthReadout');
const speciesName = document.getElementById('speciesName');
const depthMarker = document.getElementById('depthMarker');

const EARTH_RADIUS_KM = 6371;

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in-view');
      const depth = Number(entry.target.dataset.depth || EARTH_RADIUS_KM);
      const name = entry.target.dataset.name || 'Unknown';
      updateReadout(name, depth);
    });
  },
  { threshold: 0.45 }
);

slides.forEach((slide) => observer.observe(slide));

function updateReadout(name, depthKm) {
  speciesName.textContent = name;
  depthReadout.textContent = `${Math.round(depthKm).toLocaleString()} km`;

  // Marker travels up a vertical spear from core (bottom) to crust (top).
  const depthRatio = Math.max(0, Math.min(1, depthKm / EARTH_RADIUS_KM));
  const markerTop = 3 + depthRatio * 94;
  depthMarker.style.top = `${markerTop}%`;
}

window.addEventListener('scroll', () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
  const progress = Math.max(8, Math.min(100, ratio * 100));
  spikeProgress.style.height = `${progress}%`;
  spikeHead.style.bottom = `${progress}%`;
});

updateReadout('Proto-Homo', 6371);
