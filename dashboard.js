const portfolio = document.getElementById('portfolio');
const folds = [...portfolio.querySelectorAll('.fold')];

function route() {
  const hash = location.hash.slice(1);
  const id = hash === 'intro' ? 'about' : hash === 'project-2' ? 'research' : hash;
  const target = document.getElementById(id);
  if (target?.classList.contains('project-entry')) target.open = true;
  if (target && hash !== id) target.scrollIntoView({ block: 'start' });
  else if (target?.classList.contains('project-entry')) target.scrollIntoView({ block: 'start' });
  const active = folds.find(fold => fold.id === id || fold.contains(target));
  document.title = active ? `Eashwar — ${active.querySelector('.fold-title').textContent}` : 'Eashwar — Portfolio';
}
document.getElementById('index-button').addEventListener('click', () => {
  location.hash = 'index';
  document.querySelector('.name').focus({ preventScroll: true });
});
window.addEventListener('popstate', route);
window.addEventListener('hashchange', route);
// Load videos only when requested and stop them when their details close.
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

const DAY_MS = 24 * 60 * 60 * 1000;
function utcDay(date) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
}
function threeMonthsBefore(date) {
  const start = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() - 3, 1));
  const lastDay = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth() + 1, 0)).getUTCDate();
  start.setUTCDate(Math.min(date.getUTCDate(), lastDay));
  return start;
}
function dayString(date) { return date.toISOString().slice(0, 10); }
function renderMonths(container, dates, firstWeekday) {
  const labels = new Map();
  let lastMonth = '';
  dates.forEach((day, index) => {
    const month = day.slice(0, 7);
    if (month === lastMonth) return;
    const column = Math.floor((index + firstWeekday) / 7) + 1;
    const label = new Intl.DateTimeFormat('en', { month: 'short', timeZone: 'UTC' }).format(new Date(`${day}T00:00:00Z`));
    labels.set(column, label);
    lastMonth = month;
  });
  container.replaceChildren();
  container.style.setProperty('--calendar-weeks', Math.ceil((dates.length + firstWeekday) / 7));
  labels.forEach((label, column) => {
    const marker = document.createElement('span');
    marker.style.gridColumn = column;
    marker.textContent = label;
    container.append(marker);
  });
}
function cropGitHubActivity() {
  const today = utcDay(new Date());
  const cutoff = threeMonthsBefore(today);
  const firstShownWeek = new Date(cutoff.getTime() - cutoff.getUTCDay() * DAY_MS);
  // The chart service renders a rolling year, starting on the preceding Sunday.
  const firstDate = new Date(today.getTime() - 364 * DAY_MS);
  const firstChartWeek = new Date(firstDate.getTime() - firstDate.getUTCDay() * DAY_MS);
  const hiddenWeeks = Math.round((firstShownWeek - firstChartWeek) / (7 * DAY_MS));
  const days = Math.round((today - cutoff) / DAY_MS) + 1;
  const weeks = Math.ceil((days + cutoff.getUTCDay()) / 7);
  const window = document.getElementById('github-chart-window');
  const image = document.getElementById('github-chart');
  if (!window || !image || hiddenWeeks < 0 || weeks < 1) return;
  window.style.width = `${weeks * 15}px`;
  image.style.left = `${-(27 + hiddenWeeks * 12) * 1.25}px`;
  const firstRow = cutoff.getUTCDay() * 15;
  window.style.clipPath = `polygon(0 ${firstRow}px, 15px ${firstRow}px, 15px 0, 100% 0, 100% 100%, 0 100%)`;
  const dates = Array.from({ length: days }, (_, index) => dayString(new Date(cutoff.getTime() + index * DAY_MS)));
  renderMonths(document.getElementById('github-months'), dates, cutoff.getUTCDay());
}
cropGitHubActivity();

async function loadOpenAIActivity() {
  const calendar = document.getElementById('openai-calendar');
  const status = document.getElementById('openai-status');
  if (!calendar || !status) return;
  try {
    const url = 'https://raw.githubusercontent.com/Eashwar-22/eashwar-22.github.io/main/openai-usage.json';
    const response = await fetch(`${url}?day=${new Date().toISOString().slice(0, 10)}`);
    if (!response.ok) throw new Error('Activity not available');
    const data = await response.json();
    if (!Array.isArray(data.days) || !data.days.length || data.days.length > 366 ||
        data.days.some(day => !/^\d{4}-\d{2}-\d{2}$/.test(day.date) ||
          (day.requests !== null && (!Number.isSafeInteger(day.requests) || day.requests < 0)))) {
      throw new Error('Invalid activity data');
    }
    const today = utcDay(new Date());
    const cutoff = dayString(threeMonthsBefore(today));
    const days = data.days.filter(day => day.date >= cutoff && day.date <= dayString(today));
    if (!days.length) throw new Error('Activity not available');
    const fragment = document.createDocumentFragment();
    const months = document.getElementById('openai-months');
    const timeline = document.getElementById('openai-timeline');
    const firstWeekday = new Date(`${days[0].date}T00:00:00Z`).getUTCDay();
    for (let i = 0; i < firstWeekday; i++) {
      const blank = document.createElement('span');
      blank.setAttribute('aria-hidden', 'true');
      fragment.append(blank);
    }
    let total = 0;
    let missing = 0;
    days.forEach(day => {
      const cell = document.createElement('span');
      cell.className = 'openai-day';
      const n = day.requests;
      cell.dataset.level = n === null ? 'unknown' : n === 0 ? '0' : n < 3 ? '1' : n < 10 ? '2' : n < 30 ? '3' : '4';
      cell.title = n === null ? `${day.date}: data unavailable` : `${day.date}: ${n} ${n === 1 ? 'request' : 'requests'}`;
      if (n === null) missing++;
      else total += n;
      fragment.append(cell);
    });
    calendar.replaceChildren(fragment);
    renderMonths(months, days.map(day => day.date), firstWeekday);
    timeline.hidden = false;
    const summary = `${total.toLocaleString()} model requests${missing ? ` · ${missing} days unavailable` : ''}`;
    calendar.setAttribute('aria-label', summary);
    status.textContent = summary;
  } catch {
    calendar.replaceChildren();
    document.getElementById('openai-timeline').hidden = true;
    status.textContent = 'OpenAI activity is not available yet.';
  }
}
loadOpenAIActivity();
