const portfolio = document.getElementById('portfolio');
const folds = [...portfolio.querySelectorAll('.fold')];
const buttons = folds.map(fold => fold.querySelector('.fold-toggle'));
const narrowScreen = window.matchMedia('(max-width: 760px)');
let selected = null;

function setSection(id, focus = false) {
  const active = folds.find(fold => fold.id === id) || null;
  selected = active?.id || null;
  portfolio.classList.toggle('has-open', Boolean(active));
  folds.forEach(fold => {
    const open = fold === active;
    fold.classList.toggle('is-active', open);
    const button = fold.querySelector('.fold-toggle');
    button.setAttribute('aria-expanded', String(open));
    fold.querySelector('.fold-content').hidden = !open;
    if (!open) fold.querySelectorAll('.project-media[open]').forEach(media => { media.open = false; });
    if (open && focus) button.focus({ preventScroll: true });
  });
  document.title = active ? `Eashwar — ${active.querySelector('.fold-title').textContent}` : 'Eashwar — Portfolio';
}

function route() {
  const hash = location.hash.slice(1);
  if (/^project-[1-5]$/.test(hash)) {
    if (hash === 'project-2') setSection('research');
    else {
      setSection('work');
      const project = document.getElementById(hash);
      project.open = true;
      project.scrollIntoView({ block: 'nearest' });
    }
    return;
  }
  setSection(hash === 'intro' ? 'about' : hash);
}
function navigate(id, focus = false) {
  history.pushState(null, '', `#${id || 'index'}`);
  setSection(id, focus);
}
buttons.forEach((button, index) => {
  button.addEventListener('click', () => {
    const id = folds[index].id;
    navigate(selected === id ? null : id);
    if (narrowScreen.matches && selected) {
      folds[index].scrollIntoView({ block: 'start', behavior: 'instant' });
    }
  });
  button.addEventListener('keydown', event => {
    const direction = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
    if (!direction) return;
    event.preventDefault();
    const next = (index + direction + folds.length) % folds.length;
    if (selected) navigate(folds[next].id, true);
    else buttons[next].focus();
  });
});
document.getElementById('index-button').addEventListener('click', () => {
  navigate(null);
  buttons[0].focus({ preventScroll: true });
});
document.querySelector('.name').addEventListener('click', event => {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  navigate(null);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && selected) {
    const index = folds.findIndex(fold => fold.id === selected);
    navigate(null);
    buttons[index].focus({ preventScroll: true });
  }
});
window.addEventListener('popstate', route);
window.addEventListener('hashchange', route);
// Load videos only when requested and stop them when the enclosing section closes.
document.querySelectorAll('.project-media iframe').forEach(frame => {
  frame.dataset.source = frame.getAttribute('src');
  frame.removeAttribute('src');
});
document.querySelectorAll('.project-media').forEach(media => {
  media.addEventListener('toggle', () => {
    media.querySelectorAll('iframe').forEach(frame => {
      if (media.open) frame.setAttribute('src', frame.dataset.source);
      else frame.removeAttribute('src');
    });
  });
});
document.querySelectorAll('.project-entry').forEach(project => {
  project.addEventListener('toggle', () => {
    if (!project.open) project.querySelectorAll('.project-media[open]').forEach(media => { media.open = false; });
  });
});
route();
