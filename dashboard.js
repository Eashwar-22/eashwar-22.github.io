const themeToggle = document.querySelector('.theme-toggle');

try {
  document.body.classList.toggle('dark', localStorage.getItem('portfolio-theme') === 'dark');
} catch {}

themeToggle.setAttribute('aria-label', document.body.classList.contains('dark') ? 'Switch to light mode' : 'Switch to dark mode');

themeToggle.addEventListener('click', () => {
  const dark = document.body.classList.toggle('dark');
  themeToggle.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
  try {
    localStorage.setItem('portfolio-theme', dark ? 'dark' : 'light');
  } catch {}
});

const sections = ['home', 'portfolio', 'contact', 'about'];
const nav = document.querySelector('nav');

function showPage(name) {
  const current = sections.includes(name) ? name : 'home';
  const currentIndex = sections.indexOf(current);
  const activeLink = nav.querySelector(`a[href="#${current}"]`);
  nav.style.setProperty('--underline-left', `${activeLink.offsetLeft + (activeLink.offsetWidth - 44) / 2}px`);

  nav.querySelectorAll('a').forEach((link) => {
    const active = link.hash === `#${current}`;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });

  sections.forEach((section, index) => {
    const page = document.getElementById(section);
    page.style.transform = `translateX(${(index - currentIndex) * 100}%)`;
    page.classList.toggle('current', index === currentIndex);
    page.inert = index !== currentIndex;
  });
}

nav.addEventListener('click', (event) => {
  const link = event.target.closest('a');
  if (!link) return;
  event.preventDefault();
  history.pushState(null, '', link.hash);
  showPage(link.hash.slice(1));
  window.scrollTo({ top: 0 });
});
window.addEventListener('popstate', () => showPage(location.hash.slice(1)));
window.addEventListener('resize', () => showPage(location.hash.slice(1)));
showPage(location.hash.slice(1));

const carousel = document.querySelector('.research-carousel');
if (carousel) {
  const slides = [...carousel.querySelectorAll('.research-slide')];
  const track = carousel.querySelector('.research-track');
  const viewport = carousel.querySelector('.research-window');
  let slideIndex = 0;
  function resizeCarousel() { viewport.style.height = `${slides[slideIndex].offsetHeight}px`; }
  function selectSlide(index) {
    slideIndex = Math.max(0, Math.min(index, slides.length - 1));
    track.style.transform = `translateX(${-slideIndex * 100}%)`;
    slides.forEach((slide, i) => {
      slide.inert = i !== slideIndex;
      slide.setAttribute('aria-hidden', String(i !== slideIndex));
    });
    carousel.querySelector('.research-prev').disabled = slideIndex === 0;
    carousel.querySelector('.research-next').disabled = slideIndex === slides.length - 1;
    carousel.querySelector('.research-counter').textContent = `${slideIndex + 1} / ${slides.length}`;
    resizeCarousel();
  }
  carousel.querySelector('.research-prev').addEventListener('click', () => selectSlide(slideIndex - 1));
  carousel.querySelector('.research-next').addEventListener('click', () => selectSlide(slideIndex + 1));
  carousel.addEventListener('keydown', (event) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    selectSlide(slideIndex + (event.key === 'ArrowRight' ? 1 : -1));
  });
  carousel.closest('details').addEventListener('toggle', resizeCarousel);
  new ResizeObserver(resizeCarousel).observe(track);
  document.fonts.ready.then(resizeCarousel);
  selectSlide(0);
}
