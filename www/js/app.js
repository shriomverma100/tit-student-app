/* Main app logic: screens, tabs, menu, edit form.
   Navigation uses the URL hash (#/home, #/idcards …) so the phone's
   Back button / swipe-back works automatically. */

const $ = (sel) => document.querySelector(sel);
let profile = Store.load();

/* ---------------- tiles for each tab ---------------- */
const TILES = {
  academic: [
    { icon: 'notice',     label: 'Notice' },
    { icon: 'library',    label: 'Library' },
    { icon: 'attendance', label: 'Attendance' },
    { icon: 'idcard',     label: 'ID/Admit Cards', go: '#/idcards' },
    { icon: 'timetable',  label: 'Time Table' },
    { icon: 'onlineAtt',  label: 'Online<br>Attendance Det...' },
    { icon: 'exam',       label: 'Exam Form' },
    { icon: 'results',    label: 'Results' },
  ],
  fee: [
    { icon: 'feeDetails', label: 'Fee Details' },
    { icon: 'payOnline',  label: 'Pay Online' },
    { icon: 'history',    label: 'Payment History' },
    { icon: 'receipt',    label: 'Fee Receipt' },
  ],
  facilities: [
    { icon: 'scholarship', label: 'Scholarship' },
    { icon: 'medical',     label: 'Medical Facility' },
    { icon: 'events',      label: 'Events' },
    { icon: 'campus',      label: 'Campus Drive' },
  ],
};

const ID_TILES = [
  { icon: 'bus',         label: 'View Bus Card',      msg: 'Bus card not issued yet' },
  { icon: 'identity',    label: 'View Identity<br>Card', go: '#/idcards/identity' },
  { icon: 'libraryCard', label: 'View Library Card',  msg: 'Library card not issued yet' },
  { icon: 'health',      label: 'View Health Card',   msg: 'Health card not issued yet' },
];

function tileHTML(t) {
  return `<button class="tile">${ICONS[t.icon]}<b>${t.label}</b></button>`;
}

function renderTiles(container, list) {
  container.innerHTML = list.map(tileHTML).join('');
  [...container.children].forEach((btn, i) => {
    const t = list[i];
    btn.addEventListener('click', () => {
      if (t.go) location.hash = t.go;
      else toast(t.msg || `${t.label.replace(/<br>/g, ' ').replace('...', '')} – coming soon`);
    });
  });
}

/* ---------------- tabs ---------------- */
function selectTab(name) {
  const tabs = [...document.querySelectorAll('.tab')];
  const idx = tabs.findIndex(t => t.dataset.tab === name);
  tabs.forEach((t, i) => t.classList.toggle('active', i === idx));
  $('#tab-pill').style.transform = `translateX(${idx * 100}%)`;
  renderTiles($('#grid'), TILES[name]);
  $('.grid-scroll').scrollTop = 0;
}
document.querySelectorAll('.tab').forEach(t => t.addEventListener('click', () => selectTab(t.dataset.tab)));

/* ---------------- header (name + enroll on top) ---------------- */
function refreshProfileUI() {
  $('#hdr-name').textContent = profile.name.toUpperCase();
  $('#hdr-enroll').textContent = `(${profile.enroll.toUpperCase()})`;
  $('#drawer-name').textContent = profile.name;
  $('#drawer-enroll').textContent = profile.enroll;
  $('#drawer-photo').src = Store.photoOf(profile);
}

/* ---------------- router ---------------- */
const SCREENS = ['home', 'idcards', 'edit', 'qrcard'];

function show(screen) {
  SCREENS.forEach(s => $('#screen-' + s).classList.toggle('hidden', s !== screen));
}

function route() {
  closeDrawer();
  const hash = location.hash || '#/home';
  const [path, query] = hash.slice(1).split('?');

  $('#idcard-modal').classList.add('hidden');

  if (path === '/idcards' || path === '/idcards/identity') {
    show('idcards');
    if (path === '/idcards/identity') openIdCard();
  } else if (path === '/edit') {
    show('edit'); fillForm();
  } else if (path === '/card') {
    // opened by scanning the QR code
    const data = decodeCardData(new URLSearchParams(query).get('d') || '');
    show('qrcard');
    const holder = $('#qrcard-holder');
    holder.innerHTML = data ? '' : '<p style="text-align:center">Invalid or damaged QR code.</p>';
    if (data) holder.appendChild(buildCard(data, { qrText: location.href }));
  } else {
    show('home');
  }
}
window.addEventListener('hashchange', route);

/* Back button: we keep our own list of visited screens.
   - came here from inside the app → real history.back() (same as phone Back)
   - opened this page directly     → replace with its parent screen */
const PARENT = { '/idcards/identity': '#/idcards', '/idcards': '#/home', '/edit': '#/home' };
const visited = [location.hash || '#/home'];
window.addEventListener('hashchange', () => {
  const h = location.hash || '#/home';
  if (visited[visited.length - 2] === h) visited.pop(); else visited.push(h);
});
function goBack() {
  const path = (location.hash || '#/home').slice(1).split('?')[0];
  if (visited.length > 1) history.back();
  else location.replace(PARENT[path] || '#/home');
}
document.querySelectorAll('[data-back]').forEach(b => b.addEventListener('click', goBack));

/* ---------------- ID card modal ---------------- */
function openIdCard() {
  const holder = $('#idcard-holder');
  holder.innerHTML = '';
  holder.appendChild(buildCard(profile));
  $('#idcard-modal').classList.remove('hidden');
}
// tapping the dark area outside the card closes it
$('#idcard-modal').addEventListener('click', e => { if (e.target.id === 'idcard-modal') goBack(); });

$('#btn-download').addEventListener('click', async () => {
  const btn = $('#btn-download');
  btn.disabled = true;
  try {
    const canvas = await renderCardPNG(profile);
    await saveCardImage(canvas, `ID_Card_${profile.enroll.replace(/\W/g, '')}.png`);
  } catch (e) {
    console.error(e);
    toast('Could not save the card');
  }
  btn.disabled = false;
});

/* ---------------- side drawer (☰) ---------------- */
function openDrawer() {
  $('#drawer').classList.add('open');
  $('#drawer-backdrop').classList.remove('hidden');
}
function closeDrawer() {
  $('#drawer').classList.remove('open');
  $('#drawer-backdrop').classList.add('hidden');
}
$('#btn-menu').addEventListener('click', openDrawer);
$('#drawer-backdrop').addEventListener('click', closeDrawer);

document.querySelectorAll('.drawer-list li').forEach(li => li.addEventListener('click', () => {
  const act = li.dataset.act;
  closeDrawer();
  if (act === 'edit') location.hash = '#/edit';
  else if (act === 'idcard') location.hash = '#/idcards';
}));

/* ---------------- edit form (customisation) ---------------- */
const form = $('#edit-form');
let pendingPhoto = null;   // new photo chosen but not saved yet

function fillForm() {
  pendingPhoto = null;
  ['name', 'course', 'branch', 'mobile', 'enroll', 'qrBase'].forEach(k => form.elements[k].value = profile[k] || '');
  $('#edit-photo').src = Store.photoOf(profile);
}

// Pick a photo → crop to centre square → shrink to 360×360 JPEG (keeps storage small)
$('#photo-input').addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  try {
    const img = await loadImg(URL.createObjectURL(file));
    const side = Math.min(img.naturalWidth, img.naturalHeight);
    const c = document.createElement('canvas');
    c.width = c.height = 360;
    c.getContext('2d').drawImage(img, (img.naturalWidth - side) / 2, (img.naturalHeight - side) / 2, side, side, 0, 0, 360, 360);
    pendingPhoto = c.toDataURL('image/jpeg', 0.85);
    $('#edit-photo').src = pendingPhoto;
    URL.revokeObjectURL(img.src);
  } catch (err) {
    toast('Could not read that image');
  }
  e.target.value = '';
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const f = form.elements;
  const next = {
    ...profile,
    name: f.name.value.trim().replace(/\s+/g, ' '),
    course: f.course.value.trim() || 'Bachelor Of Technology',
    branch: f.branch.value.trim(),
    mobile: f.mobile.value.trim(),
    enroll: f.enroll.value.trim().toUpperCase(),
    qrBase: f.qrBase.value.trim(),
  };
  if (pendingPhoto) next.photo = pendingPhoto;
  if (next.mobile && !/^\d{10}$/.test(next.mobile)) return toast('Mobile number must be 10 digits');

  if (!Store.save(next)) return toast('Photo too large – try a smaller one');
  profile = next;
  refreshProfileUI();
  toast('Details saved');
  goBack();
});

$('#btn-reset').addEventListener('click', () => {
  if (!confirm('Reset all details to default?')) return;
  Store.reset();
  profile = Store.load();
  refreshProfileUI();
  fillForm();
  toast('Reset to default');
});

/* ---------------- toast ---------------- */
let toastTimer;
function toast(msg, ms = 2200) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), ms);
}

/* ---------------- start-up ---------------- */
// Service worker = offline support + makes Chrome offer "Install app"
function registerServiceWorker() {
  if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
}

refreshProfileUI();
renderTiles($('#grid-idcards'), ID_TILES);
selectTab('academic');
route();
registerServiceWorker();
setTimeout(() => $('#loader').classList.add('fade'), 650);
