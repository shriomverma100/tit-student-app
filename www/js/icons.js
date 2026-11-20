/* Hand-drawn SVG icons that mimic the original app's tile icons.
   Each one is drawn on a 64x64 grid. */
const ICONS = {
  notice: `<svg viewBox="0 0 64 64"><rect x="5" y="5" width="54" height="54" rx="12" fill="none" stroke="#F6C343" stroke-width="5"/>
    <rect x="27.5" y="14" width="9" height="25" rx="4.5" fill="none" stroke="#F6C343" stroke-width="4"/>
    <circle cx="32" cy="47.5" r="4.2" fill="none" stroke="#F6C343" stroke-width="3.6"/></svg>`,

  library: `<svg viewBox="0 0 64 64" fill="#F25B5B">
    <g transform="rotate(22 14 34)"><rect x="9" y="8" width="10" height="9" rx="1"/><rect x="9" y="20" width="10" height="16" rx="1"/><rect x="9" y="39" width="10" height="6" rx="1"/><rect x="9" y="48" width="10" height="8" rx="1"/></g>
    <rect x="29" y="5" width="11" height="9" rx="1"/><rect x="29" y="17" width="11" height="19" rx="1"/><rect x="29" y="39" width="11" height="6" rx="1"/><rect x="29" y="48" width="11" height="9" rx="1"/>
    <rect x="46" y="5" width="11" height="9" rx="1"/><rect x="46" y="17" width="11" height="19" rx="1"/><rect x="46" y="39" width="11" height="6" rx="1"/><rect x="46" y="48" width="11" height="9" rx="1"/></svg>`,

  attendance: `<svg viewBox="0 0 64 64"><rect x="4" y="9" width="56" height="51" rx="5" fill="none" stroke="#3D5AF1" stroke-width="3.2"/>
    <path d="M4 14a5 5 0 0 1 5-5h46a5 5 0 0 1 5 5v8H4z" fill="#3D5AF1"/>
    <rect x="16" y="3" width="6" height="15" rx="3" fill="#fff" stroke="#3D5AF1" stroke-width="3"/><rect x="42" y="3" width="6" height="15" rx="3" fill="#fff" stroke="#3D5AF1" stroke-width="3"/>
    <rect x="29" y="5" width="6" height="11" rx="3" fill="#fff" stroke="#3D5AF1" stroke-width="3"/>
    <g fill="#3D5AF1"><rect x="12" y="30" width="10" height="7" rx="1"/><rect x="27" y="30" width="10" height="7" rx="1"/><rect x="42" y="30" width="10" height="7" rx="1"/>
    <rect x="12" y="43" width="10" height="7" rx="1"/><rect x="27" y="43" width="10" height="7" rx="1"/><rect x="42" y="43" width="10" height="7" rx="1"/></g></svg>`,

  idcard: `<svg viewBox="0 0 64 64"><rect x="2" y="9" width="60" height="46" rx="5" fill="#1a1a1a"/>
    <rect x="7" y="20" width="50" height="30" rx="2" fill="#fff"/>
    <circle cx="22" cy="30" r="5.5" fill="#1a1a1a"/><path d="M11 47c0-7 5-10 11-10s11 3 11 10z" fill="#1a1a1a"/>
    <rect x="37" y="28" width="15" height="4.5" rx="2.2" fill="#1a1a1a"/><rect x="37" y="37" width="15" height="4.5" rx="2.2" fill="#1a1a1a"/></svg>`,

  timetable: `<svg viewBox="0 0 64 64" fill="none" stroke="#111" stroke-width="3" stroke-linecap="round">
    <path d="M30 52H6a2 2 0 0 1-2-2V12a2 2 0 0 1 2-2h46a2 2 0 0 1 2 2v20"/><path d="M4 21h50"/>
    <path d="M15 5v9M27 5v9M39 5v9"/>
    <g fill="#111" stroke="none"><rect x="10" y="27" width="7" height="5"/><rect x="21" y="27" width="7" height="5"/><rect x="10" y="37" width="7" height="5"/><rect x="21" y="37" width="7" height="5"/></g>
    <circle cx="47" cy="47" r="13" fill="#fff"/><path d="M47 40v8h6"/></svg>`,

  onlineAtt: `<svg viewBox="0 0 64 64" fill="none" stroke="#111" stroke-width="2.4" stroke-linecap="round">
    <rect x="16" y="9" width="44" height="42" rx="3"/><path d="M16 18h44"/>
    <circle cx="27" cy="6" r="2.5"/><circle cx="38" cy="6" r="2.5"/><circle cx="49" cy="6" r="2.5"/><path d="M29.5 6h6M40.5 6h6"/>
    <g stroke-width="2"><rect x="25" y="23" width="7" height="5"/><rect x="35" y="23" width="7" height="5"/><rect x="45" y="23" width="7" height="5"/>
    <rect x="35" y="32" width="7" height="5"/><rect x="45" y="32" width="7" height="5"/><rect x="35" y="41" width="7" height="5"/><rect x="45" y="41" width="7" height="5"/></g>
    <circle cx="15" cy="36" r="6" fill="#fff"/><path d="M4 56c0-8 5-12 11-12s11 4 11 12z" fill="#fff"/>
    <circle cx="20" cy="56" r="6" fill="#fff"/><path d="m17 56 2.2 2.2L23.5 54"/></svg>`,

  bus: `<svg viewBox="0 0 64 64"><path d="M12 10a8 8 0 0 1 8-8h24a8 8 0 0 1 8 8v42H12z" fill="#F43F6B"/>
    <rect x="4" y="22" width="5" height="12" rx="2" fill="#F43F6B"/><rect x="55" y="22" width="5" height="12" rx="2" fill="#F43F6B"/>
    <rect x="24" y="6" width="16" height="5" rx="1.5" fill="#fff"/>
    <rect x="17" y="16" width="13.5" height="16" rx="1" fill="#fff"/><rect x="33.5" y="16" width="13.5" height="16" rx="1" fill="#fff"/>
    <circle cx="22" cy="42" r="4" fill="#fff"/><circle cx="42" cy="42" r="4" fill="#fff"/>
    <rect x="14" y="50" width="10" height="11" rx="3" fill="#F43F6B"/><rect x="40" y="50" width="10" height="11" rx="3" fill="#F43F6B"/></svg>`,

  identity: `<svg viewBox="0 0 64 64"><rect x="2" y="9" width="60" height="46" rx="4" fill="#0E9F8E"/>
    <rect x="6" y="18" width="52" height="33" rx="2" fill="#fff"/>
    <circle cx="22" cy="30" r="6" fill="#0E9F8E"/><path d="M10 49c0-8 5-11 12-11s12 3 12 11z" fill="#0E9F8E"/>
    <rect x="37" y="27" width="16" height="5" rx="2.5" fill="#0E9F8E"/><rect x="37" y="37" width="16" height="5" rx="2.5" fill="#0E9F8E"/></svg>`,

  libraryCard: `<svg viewBox="0 0 64 64" fill="#EE7350"><path d="M32 6 4 26h56z"/><rect x="2" y="26" width="60" height="4"/>
    <circle cx="40" cy="7" r="5" fill="#fff" stroke="#EE7350" stroke-width="3"/>
    <rect x="9" y="30" width="5" height="26"/><rect x="50" y="30" width="5" height="26"/><rect x="14" y="30" width="36" height="26" fill="#EE7350"/>
    <rect x="18" y="34" width="28" height="18" fill="#fff"/>
    <path d="M32 38c-3-2-7-2-10-1v13c3-1 7-1 10 1 3-2 7-2 10-1V37c-3-1-7-1-10 1zm0 0v12" fill="none" stroke="#EE7350" stroke-width="2"/>
    <rect x="4" y="56" width="56" height="5" rx="1"/></svg>`,

  health: `<svg viewBox="0 0 64 64"><path d="M32 3 19 8v11c0 9 6 15 13 18 7-3 13-9 13-18V8z" fill="#fff" stroke="#16A34A" stroke-width="3.5"/>
    <path d="M29 12h6v5h5v6h-5v5h-6v-5h-5v-6h5z" fill="#16A34A"/>
    <path d="M2 24c3 0 5 3 6 6l7 12c2 3 5 4 8 5l6 2v12H14L6 50C3 46 2 42 2 38zM62 24c-3 0-5 3-6 6l-7 12c-2 3-5 4-8 5l-6 2v12h15l8-11c3-4 4-8 4-12z" fill="#16A34A"/>
    <path d="M10 33l8 9M54 33l-8 9" stroke="#fff" stroke-width="2.5"/></svg>`,

  scholarship: `<svg viewBox="0 0 64 64" fill="none" stroke="#1FBFA0" stroke-width="3" stroke-linejoin="round">
    <path d="M32 3 6 13l26 10 26-10z" fill="#fff"/><path d="M18 18v8c8 4 20 4 28 0v-8"/><path d="M56 14v10"/><circle cx="56" cy="26" r="2" fill="#1FBFA0"/>
    <circle cx="32" cy="44" r="17" fill="#fff"/><circle cx="32" cy="44" r="12.5" fill="#1FBFA0" stroke="none"/>
    <text x="32" y="52" text-anchor="middle" font-size="21" font-weight="900" fill="#fff" stroke="none" font-family="Arial">$</text></svg>`,

  medical: `<svg viewBox="0 0 64 64"><path d="M22 14V9a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v5h-5V11H27v3z" fill="#111"/>
    <rect x="2" y="15" width="60" height="44" rx="4" fill="#111"/>
    <path d="M27 24h10v9h9v10h-9v9H27v-9h-9V33h9z" fill="#fff"/></svg>`,

  events: `<svg viewBox="0 0 64 64" fill="none" stroke="#22C55E" stroke-width="3" stroke-linecap="round">
    <path d="M38 52H5V10h50v20"/><path d="M5 19h50"/><path d="M15 4v10M30 4v10M45 4v10"/>
    <g stroke-width="3"><path d="M11 27h6M20 27h12M11 35h6M20 35h8M11 43h6M20 43h6"/></g>
    <circle cx="48" cy="48" r="14" fill="#22C55E" stroke="none"/><path d="m41 48 5 5 9-9" stroke="#fff" stroke-width="3.6"/></svg>`,

  campus: `<svg viewBox="0 0 64 64"><circle cx="27" cy="27" r="22" fill="#fff" stroke="#3B9BF5" stroke-width="5"/>
    <path d="M42 44 59 61" stroke="#3B9BF5" stroke-width="8" stroke-linecap="round"/>
    <circle cx="27" cy="21" r="7" fill="#3B9BF5"/><path d="M14 40c0-7 6-11 13-11s13 4 13 11z" fill="#3B9BF5"/></svg>`,

  feeDetails: `<svg viewBox="0 0 64 64"><path d="M10 4h44v56l-7-5-7 5-8-5-8 5-7-5-7 5z" fill="#7C4DFF"/>
    <g fill="#fff"><rect x="18" y="16" width="28" height="4" rx="2"/><rect x="18" y="26" width="28" height="4" rx="2"/><rect x="18" y="36" width="18" height="4" rx="2"/></g></svg>`,

  payOnline: `<svg viewBox="0 0 64 64"><rect x="2" y="12" width="60" height="40" rx="6" fill="#16A34A"/><rect x="2" y="20" width="60" height="8" fill="#0d6b31"/>
    <rect x="9" y="37" width="20" height="5" rx="2" fill="#fff"/><circle cx="46" cy="40" r="5" fill="#fde047"/><circle cx="52" cy="40" r="5" fill="#f97316" opacity=".85"/></svg>`,

  history: `<svg viewBox="0 0 64 64" fill="none" stroke="#F59E0B" stroke-width="5" stroke-linecap="round"><path d="M10 32a22 22 0 1 0 6-15"/><path d="M8 8v11h11"/><path d="M32 18v15l10 6"/></svg>`,

  receipt: `<svg viewBox="0 0 64 64"><path d="M12 2h28l14 14v46H12z" fill="#2563EB"/><path d="M40 2v14h14" fill="#93C5FD"/>
    <text x="32" y="47" text-anchor="middle" font-size="24" font-weight="900" fill="#fff" font-family="Arial">₹</text></svg>`,

  results: `<svg viewBox="0 0 64 64"><rect x="8" y="4" width="48" height="56" rx="5" fill="#0EA5E9"/><rect x="20" y="1" width="24" height="9" rx="3" fill="#075985"/>
    <path d="M17 44l9-12 8 7 12-15" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,

  exam: `<svg viewBox="0 0 64 64"><rect x="10" y="4" width="44" height="56" rx="5" fill="#E11D48"/>
    <g fill="#fff"><rect x="18" y="14" width="28" height="4" rx="2"/><rect x="18" y="24" width="28" height="4" rx="2"/><rect x="18" y="34" width="16" height="4" rx="2"/></g>
    <path d="m38 46 4 4 8-8" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round"/></svg>`,
};
