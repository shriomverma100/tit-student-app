/* Student profile storage.
   Everything is saved on the phone itself (localStorage) – there is no server. */

const STORE_KEY = 'tit_student_profile_v1';

// Grey silhouette used until the student picks a passport photo
const PLACEHOLDER_PHOTO = 'data:image/svg+xml;utf8,' + encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="#dfe6ee"/>
   <circle cx="50" cy="38" r="18" fill="#a9b6c4"/><path d="M14 100c0-22 16-34 36-34s36 12 36 34z" fill="#a9b6c4"/></svg>`);

const DEFAULT_PROFILE = {
  name: 'Student Name',
  course: 'Bachelor Of Technology',
  branch: 'CSE - Artificial Intelligence & Data Science',
  mobile: '9000000000',
  enroll: '0111XX000000',
  photo: '',        // data URL (jpeg) – empty means placeholder
  qrBase: '',       // optional hosted web-app link used inside the QR
};

const Store = {
  load() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORE_KEY) || '{}');
      return { ...DEFAULT_PROFILE, ...saved };
    } catch (e) {
      return { ...DEFAULT_PROFILE };
    }
  },

  save(profile) {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(profile));
      return true;
    } catch (e) {
      // only happens if the photo is too large for storage
      return false;
    }
  },

  reset() {
    try { localStorage.removeItem(STORE_KEY); } catch (e) {}
  },

  photoOf(p) { return p.photo || PLACEHOLDER_PHOTO; },
};

/* ---- helpers to put card details inside the QR link ---- */

// Fields are joined with "|" (shorter than JSON → smaller, easier-to-scan QR),
// then Unicode-safe base64url encoded.
function encodeCardData(p) {
  const course = p.course === DEFAULT_PROFILE.course ? '' : p.course;   // default course left out -> shorter QR
  const raw = [p.name, course, p.branch, p.mobile, p.enroll].map(s => String(s || '').replace(/\|/g, '/')).join('|');
  const b64 = btoa(String.fromCharCode(...new TextEncoder().encode(raw)));
  return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function decodeCardData(str) {
  try {
    const b64 = str.replace(/-/g, '+').replace(/_/g, '/');
    const bytes = Uint8Array.from(atob(b64), ch => ch.charCodeAt(0));
    const [name, course, branch, mobile, enroll] = new TextDecoder().decode(bytes).split('|');
    if (!name || !enroll) return null;
    return { ...DEFAULT_PROFILE, name, course: course || DEFAULT_PROFILE.course, branch, mobile, enroll, photo: '' };
  } catch (e) {
    return null;
  }
}

/* What text goes inside the QR code:
   - a link that opens this card (if a hosted web-app link is known), or
   - plain text details as a fallback (e.g. inside the APK with no link set). */
function qrPayload(p) {
  let base = (p.qrBase || '').trim();
  if (!base && /^https?:$/.test(location.protocol) && !/^(localhost|127\.|10\.|192\.168\.)/.test(location.hostname)) {
    base = location.origin + location.pathname;      // running as a hosted web app
  }
  if (base) {
    base = base.split('#')[0];
    return `${base}#/card?d=${encodeCardData(p)}`;
  }
  return `TIT STUDENT ID\nName: ${p.name}\nEnroll: ${p.enroll}\nCourse: ${p.course}\nBranch: ${p.branch}\nMob: ${p.mobile}`;
}
