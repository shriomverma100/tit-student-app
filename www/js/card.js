/* ID card: on-screen HTML version + PNG version for "Download Card". */

const COLLEGE_NAME_LINES = ['TECHNOCRATS INSTITUTE', 'OF TECHNOLOGY'];
const CARD_FOOTER = 'UNBEATABLE PLACEMENT';
const CARD_RED = '#B30000';

function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

/* ---------- QR ---------- */
function makeQR(text) {
  qrcode.stringToBytes = qrcode.stringToBytesFuncs['UTF-8'];   // allow any language in names
  const qr = qrcode(0, 'L');                                    // 0 = pick smallest size automatically
  qr.addData(text);
  qr.make();
  return qr;
}

// Draw the QR into a canvas, 1 canvas pixel per module (scaled up crisply by CSS)
function qrCanvas(text) {
  const qr = makeQR(text);
  const n = qr.getModuleCount();
  const c = document.createElement('canvas');
  c.width = c.height = n;
  const g = c.getContext('2d');
  g.fillStyle = '#fff'; g.fillRect(0, 0, n, n);
  g.fillStyle = '#000';
  for (let r = 0; r < n; r++) for (let col = 0; col < n; col++) if (qr.isDark(r, col)) g.fillRect(col, r, 1, 1);
  return c;
}

/* ---------- on-screen card ---------- */
function buildCard(p, { qrText } = {}) {
  const el = document.createElement('div');
  el.className = 'idcard';
  el.innerHTML = `
    <div class="idc-head">
      <img src="assets/logo.jpg" alt="">
      <h2>${COLLEGE_NAME_LINES.join('<br>')}</h2>
    </div>
    <div class="idc-title">IDENTITY CARD</div>
    <img class="idc-photo" src="${Store.photoOf(p)}" alt="Photo">
    <div class="idc-name">${esc(p.name)}</div>
    <div class="idc-line">${esc(p.course)}</div>
    ${p.branch ? `<div class="idc-line">${esc(p.branch)}</div>` : ''}
    <div class="idc-line"><b>Mob:</b> ${esc(p.mobile)}</div>
    <div class="idc-line"><b>Enroll:</b> ${esc(p.enroll)}</div>
    <div class="idc-qr-slot"></div>
    <div class="idc-foot">${CARD_FOOTER}</div>`;

  const qr = qrCanvas(qrText ?? qrPayload(p));
  qr.className = 'idc-qr';
  qr.title = 'Tap to enlarge';
  qr.addEventListener('click', () => showBigQR(qr));
  el.querySelector('.idc-qr-slot').replaceWith(qr);
  return el;
}

// Tapping the small QR shows it large, so another phone can scan it easily
function showBigQR(small) {
  const ov = document.createElement('div');
  ov.style.cssText = 'position:fixed;inset:0;z-index:40;background:rgba(0,0,0,.85);display:grid;place-items:center;';
  const big = document.createElement('canvas');
  big.width = big.height = small.width;
  big.getContext('2d').drawImage(small, 0, 0);
  big.style.cssText = 'width:min(75vw,320px);height:auto;image-rendering:pixelated;background:#fff;padding:14px;border-radius:12px;';
  ov.appendChild(big);
  ov.addEventListener('click', () => ov.remove());
  document.body.appendChild(ov);
}

/* ---------- PNG version (drawn by hand on a canvas) ---------- */
function loadImg(src) {
  return new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = src; });
}

function wrapText(g, text, maxW) {
  const words = String(text).split(' ');
  const lines = []; let line = '';
  for (const w of words) {
    const t = line ? line + ' ' + w : w;
    if (g.measureText(t).width > maxW && line) { lines.push(line); line = w; } else line = t;
  }
  if (line) lines.push(line);
  return lines;
}

function roundRect(g, x, y, w, h, r) {
  g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r);
  g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath();
}

async function renderCardPNG(p) {
  const S = 3, W = 300, PAD = 12;                       // layout units x3 = sharp image
  const FONT = getComputedStyle(document.body).fontFamily;
  const measure = document.createElement('canvas').getContext('2d');
  measure.font = `13.2px ${FONT}`;
  const branchLines = p.branch ? wrapText(measure, p.branch, W - 20) : [];
  const H = 458 + Math.max(0, branchLines.length - 1) * 17 - (p.branch ? 0 : 28);

  const c = document.createElement('canvas');
  c.width = (W + PAD * 2) * S; c.height = (H + PAD * 2) * S;
  const g = c.getContext('2d');
  g.scale(S, S);
  g.fillStyle = '#F4F4F4'; g.fillRect(0, 0, W + PAD * 2, H + PAD * 2);
  g.translate(PAD, PAD);
  g.fillStyle = '#fff'; g.fillRect(0, 0, W, H);
  g.textAlign = 'center';

  // header
  g.fillStyle = CARD_RED; g.fillRect(0, 0, W, 50);
  const logo = await loadImg('assets/logo.jpg');
  g.drawImage(logo, 10, 9.5, 31, 31);
  g.fillStyle = '#fff'; g.font = `700 16.4px ${FONT}`;
  g.fillText(COLLEGE_NAME_LINES[0], 172, 22); g.fillText(COLLEGE_NAME_LINES[1], 172, 41);

  // title + photo
  g.fillStyle = '#111'; g.font = `700 14.6px ${FONT}`; g.fillText('IDENTITY CARD', W / 2, 79);
  const px = W / 2 - 40, py = 88;
  g.save(); roundRect(g, px, py, 80, 80, 9); g.clip();
  if (p.photo) g.drawImage(await loadImg(p.photo), px, py, 80, 80);
  else { g.fillStyle = '#dfe6ee'; g.fillRect(px, py, 80, 80); g.fillStyle = '#a9b6c4';
         g.beginPath(); g.arc(W / 2, py + 30, 14, 0, 7); g.fill(); g.beginPath(); g.arc(W / 2, py + 82, 29, Math.PI, 0); g.fill(); }
  g.restore();
  g.strokeStyle = '#555'; roundRect(g, px, py, 80, 80, 9); g.stroke();

  // text lines
  let y = 194;
  g.fillStyle = '#111'; g.font = `700 13.3px ${FONT}`; g.fillText(p.name, W / 2, y);
  g.font = `13.2px ${FONT}`; g.fillStyle = '#444';
  y += 28; g.fillText(p.course, W / 2, y);
  branchLines.forEach((l, i) => { y += i === 0 ? 28 : 17; g.fillText(l, W / 2, y); });
  const labelled = (label, val) => {
    y += 28;
    g.font = `700 13.2px ${FONT}`; const lw = g.measureText(label + ' ').width;
    g.font = `13.2px ${FONT}`; const vw = g.measureText(val).width;
    const x0 = W / 2 - (lw + vw) / 2;
    g.textAlign = 'left';
    g.fillStyle = '#111'; g.font = `700 13.2px ${FONT}`; g.fillText(label, x0, y);
    g.fillStyle = '#444'; g.font = `13.2px ${FONT}`; g.fillText(val, x0 + lw, y);
    g.textAlign = 'center';
  };
  labelled('Mob:', p.mobile);
  labelled('Enroll:', p.enroll);

  // QR
  const qr = qrCanvas(qrPayload(p));
  g.imageSmoothingEnabled = false;
  g.drawImage(qr, W / 2 - 25, y + 46, 50, 50);

  // footer
  g.fillStyle = CARD_RED; g.fillRect(0, H - 40, W, 40);
  g.fillStyle = '#fff'; g.font = `700 13px ${FONT}`; g.fillText(CARD_FOOTER, W / 2, H - 15);
  return c;
}

/* ---------- save the PNG (Android Chrome, iPhone Safari, desktop) ---------- */
async function saveCardImage(canvas, filename) {
  const blob = await new Promise(r => canvas.toBlob(r, 'image/png'));
  const file = new File([blob], filename, { type: 'image/png' });
  const isIOS = /iP(hone|ad|od)/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

  // iPhone -> share sheet has "Save Image" (downloads are unreliable in home-screen apps)
  if (isIOS && navigator.canShare && navigator.canShare({ files: [file] })) {
    try { await navigator.share({ files: [file], title: 'ID Card' }); } catch (e) {}
    return;
  }

  // Everything else (Android Chrome, laptop) -> normal download
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 4000);
  toast('Card downloaded');
}
