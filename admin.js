/* DARK MODE (self-contained: styles + toggle button)
   - Applies the saved theme before the page paints (no white flash).
   - First visit follows the device setting (light / dark).
   - Adds a sun/moon button; the choice is remembered in localStorage and
     separately for each portal (student, instructor, admin). */
(function () {
    var KEY = "cr_theme_admin";   // each portal keeps its OWN dark-mode setting
    var root = document.documentElement;

    /* Dark colors are built into this file, so no extra css file is needed. */
    if (!document.getElementById("cr-dark-css")) {
        var darkStyle = document.createElement("style");
        darkStyle.id = "cr-dark-css";
        darkStyle.textContent = `
/* =========================================================
   CLASSROOMRESERVE - DARK MODE (student, instructor, admin)
   Load AFTER the page's own css. Everything dark lives under
   html[data-theme="dark"]; light mode is not touched.
========================================================= */

/* ---------- theme button (works in light + dark) ---------- */
.theme-toggle .i-sun { display: none; }
html[data-theme="dark"] .theme-toggle .i-sun { display: block; }
html[data-theme="dark"] .theme-toggle .i-moon { display: none; }
.theme-toggle svg { flex-shrink: 0; }

.s-actions { display: flex; align-items: center; gap: 8px; }
.s-refresh.s-theme { padding: 9px 11px; }


@media print { .theme-toggle, .theme-fab { display: none !important; } }

/* =========================================================
   DARK
========================================================= */
html[data-theme="dark"] { color-scheme: dark; }

html[data-theme="dark"] {
    /* shared palette */
    --d-bg: #0E1512;
    --d-surface: #16201B;
    --d-surface-2: #1C2924;
    --d-border: #2B3A33;
    --d-text: #E4EEE8;
    --d-muted: #93A69C;
    --d-accent: #5FD39A;          /* green used for text/icons on dark */

    /* student */
    --bg: var(--d-bg);
    --white: var(--d-surface);
    --line: var(--d-border);
    --text: var(--d-text);
    --muted: var(--d-muted);
    --ink: #E4EEE8;
    --green: #2E9B68;

    --free-bg: #12362A;  --free-line: #25664A;  --free-text: #6FDDA5;
    --part-bg: #3A2E12;  --part-line: #7A5B1E;  --part-text: #F0C676;
    --full-bg: #3A1D1F;  --full-line: #7A3A3C;  --full-text: #F29A9A;
    --past-bg: #1C2420;  --past-text: #6F8179;

    /* admin */
    --light: #1B3A2C;
    --border: var(--d-border);

    /* instructor */
    --background: var(--d-bg);
    --primary-light: #1B3A2C;
    --shadow: 0 3px 12px rgba(0, 0, 0, .35);
}

html[data-theme="dark"] body {
    background: var(--d-bg);
    color: var(--d-text);
}

html[data-theme="dark"] :focus-visible { outline-color: #3FAE7B; }
html[data-theme="dark"] ::placeholder { color: #6F8179; opacity: 1; }
html[data-theme="dark"] ::selection { background: #2E9B6866; }
html[data-theme="dark"] input,
html[data-theme="dark"] select,
html[data-theme="dark"] textarea { color: var(--d-text); }
html[data-theme="dark"] option { background: #16201B; color: var(--d-text); }

/* ---------------------------------------------------------
   STUDENT PORTAL
--------------------------------------------------------- */
html[data-theme="dark"] .s-header { background: #0B1511; border-bottom: 1px solid var(--d-border); }
html[data-theme="dark"] .s-logo { background: #17382B; }
html[data-theme="dark"] .s-brand strong { color: #fff; }
html[data-theme="dark"] .s-intro h1,
html[data-theme="dark"] .s-cal-head h2,
html[data-theme="dark"] .s-day h2,
html[data-theme="dark"] .s-booked h3 { color: var(--d-text); }

html[data-theme="dark"] .s-field select,
html[data-theme="dark"] .s-roominfo,
html[data-theme="dark"] .s-calendar,
html[data-theme="dark"] .s-day,
html[data-theme="dark"] .s-nav,
html[data-theme="dark"] .s-today,
html[data-theme="dark"] .s-legend li { background: var(--d-surface); }

html[data-theme="dark"] .s-roominfo img { background: #223029; }
html[data-theme="dark"] .s-nav { color: var(--d-accent); }
html[data-theme="dark"] .s-nav:hover { background: #1F3329; }
html[data-theme="dark"] .s-today { color: var(--d-accent); border-color: #2E9B68; }
html[data-theme="dark"] .s-today:hover { background: #2E9B68; color: #fff; }

html[data-theme="dark"] .s-notice { background: #3A2E12; border-color: #7A5B1E; color: #F0D9A5; }

html[data-theme="dark"] .s-day-cell:hover { box-shadow: 0 3px 12px rgba(0, 0, 0, .5); }
html[data-theme="dark"] .s-day-cell.today { box-shadow: 0 0 0 2px #E4EEE8; }
html[data-theme="dark"] .s-day-cell.selected {
    background: #2E9B68;
    border-color: #2E9B68;
    color: #06150E;
}
html[data-theme="dark"] .s-fill { background: rgba(0, 0, 0, .35); }
html[data-theme="dark"] .s-day-cell.selected .s-fill { background: rgba(0, 0, 0, .25); }
html[data-theme="dark"] .s-day-cell.selected .s-fill b { background: #06150E; }

html[data-theme="dark"] .dot.past { border-color: #3A4A43; }
html[data-theme="dark"] .dot.free { border-color: #3FAE7B; }
html[data-theme="dark"] .dot.part { border-color: #C28C2C; }
html[data-theme="dark"] .dot.full { border-color: #C45858; }
html[data-theme="dark"] .dot.today { background: var(--d-surface); border-color: #E4EEE8; }

html[data-theme="dark"] .s-slot.passed { border-color: #2B3A33; }
html[data-theme="dark"] .s-booked li { background: #2A1A1C; border-color: #5E3032; }
html[data-theme="dark"] .s-who small + small { color: #D9A0A0; }
html[data-theme="dark"] .s-slot.reserved.done { background: #1A2B23; border-color: #2F4A3D; color: #9CC4AE; }
html[data-theme="dark"] .s-booked li.done { background: #172720; border-color: #2F4A3D; }
html[data-theme="dark"] .s-booked li.done .s-when { color: #9CC4AE; }
html[data-theme="dark"] .s-booked li.done .s-who small + small { color: var(--d-muted); }
html[data-theme="dark"] .s-done,
html[data-theme="dark"] .s-slot.done .s-state { color: #6FDDA5; }

/* ---------------------------------------------------------
   ADMIN PORTAL
--------------------------------------------------------- */
html[data-theme="dark"] .login-card,
html[data-theme="dark"] .admin-modal-content,
html[data-theme="dark"] .admin-topbar,
html[data-theme="dark"] .admin-stat,
html[data-theme="dark"] .admin-table-card,
html[data-theme="dark"] .admin-room-card,
html[data-theme="dark"] .admin-notification,
html[data-theme="dark"] .fb-card { background: var(--d-surface); }

html[data-theme="dark"] .login-card { box-shadow: 0 20px 50px rgba(0, 0, 0, .55); }
html[data-theme="dark"] .login-card h1 { color: var(--d-text); }
html[data-theme="dark"] .admin-auth { background: linear-gradient(140deg, #07100C, #14513A); }

html[data-theme="dark"] .login-card input,
html[data-theme="dark"] .admin-modal-content input,
html[data-theme="dark"] .admin-modal-content select,
html[data-theme="dark"] .admin-modal-content textarea,
html[data-theme="dark"] .admin-search,
html[data-theme="dark"] .admin-filters input,
html[data-theme="dark"] .admin-filters select,
html[data-theme="dark"] .fb-card textarea { background: #101914; border-color: var(--d-border); }

html[data-theme="dark"] .admin-sidebar { background: #0B1511; border-right: 1px solid var(--d-border); }
html[data-theme="dark"] .admin-toast { background: #1C2924; border: 1px solid var(--d-border); }
html[data-theme="dark"] .admin-modal { background: rgba(0, 0, 0, .7); }

html[data-theme="dark"] .admin-outline,
html[data-theme="dark"] .small-btn,
html[data-theme="dark"] .notif-tab { background: var(--d-surface-2); border-color: var(--d-border); }
html[data-theme="dark"] .admin-outline,
html[data-theme="dark"] .small-btn { color: var(--d-accent); }
html[data-theme="dark"] .small-btn.danger { color: #F28585; }
html[data-theme="dark"] .notif-tab.active { background: #2E9B68; border-color: #2E9B68; color: #fff; }

html[data-theme="dark"] .admin-avatar,
html[data-theme="dark"] .admin-logo,
html[data-theme="dark"] .admin-chip { background-color: #1B3A2C; color: var(--d-accent); }
html[data-theme="dark"] .admin-stat > i,
html[data-theme="dark"] .admin-notification i { color: var(--d-accent); }
html[data-theme="dark"] .admin-stat { box-shadow: 0 3px 12px rgba(0, 0, 0, .3); }

html[data-theme="dark"] .admin-welcome { background: linear-gradient(110deg, #0F2E22, #1B6B47); }

html[data-theme="dark"] th,
html[data-theme="dark"] .dept-row td { background: #1C2A23; color: #A9C4B6; }
html[data-theme="dark"] tr.group-row td { background: #1A2B23; border-top-color: #2F4A3D; color: var(--d-text); }
html[data-theme="dark"] tbody tr:hover { background: #1B2823; }
html[data-theme="dark"] .admin-room-card img { background: #223029; }
html[data-theme="dark"] .usage-bar { background: #26352E; }

html[data-theme="dark"] .admin-notification.unread,
html[data-theme="dark"] .fb-card.unread {
    background: #15332A;
    border-color: #25664A;
    box-shadow: 0 2px 10px rgba(0, 0, 0, .3);
}

html[data-theme="dark"] .danger-outline { color: #F28585; border-color: #6B3335; }

/* status pills (admin + instructor) */
html[data-theme="dark"] .status-active,
html[data-theme="dark"] .status-confirmed,
html[data-theme="dark"] .fb-status.resolved { color: #6FDDA5; background: #12362A; }
html[data-theme="dark"] .status-inactive,
html[data-theme="dark"] .status-cancelled { color: #F29A9A; background: #3A1D1F; }
html[data-theme="dark"] .status-completed,
html[data-theme="dark"] .history-count { color: #B6C2CC; background: #26313A; }
html[data-theme="dark"] .status-pending,
html[data-theme="dark"] .fb-status.reviewed { color: #F0C676; background: #3A2E12; }
html[data-theme="dark"] .fb-status.new,
html[data-theme="dark"] .status-new { color: #8DB8F5; background: #1B2B45; }

/* ---------------------------------------------------------
   INSTRUCTOR PORTAL
--------------------------------------------------------- */
html[data-theme="dark"] .auth-screen,
html[data-theme="dark"] .auth-content { background: var(--d-bg); }
html[data-theme="dark"] .auth-box h2,
html[data-theme="dark"] .form-section-title { color: var(--d-text); }
html[data-theme="dark"] .auth-box input { background: #101914; }

html[data-theme="dark"] .topbar,
html[data-theme="dark"] .stat-card,
html[data-theme="dark"] .room-card,
html[data-theme="dark"] .table-card,
html[data-theme="dark"] .form-card,
html[data-theme="dark"] .calendar-card,
html[data-theme="dark"] .notification-item,
html[data-theme="dark"] .modal-content,
html[data-theme="dark"] .modal-close,
html[data-theme="dark"] .empty-state,
html[data-theme="dark"] .footer,
html[data-theme="dark"] .date-picker,
html[data-theme="dark"] .schedule-preview,
html[data-theme="dark"] .feedback-card { background: var(--d-surface); }

html[data-theme="dark"] .sidebar { background: #0B1511; border-right: 1px solid var(--d-border); }
html[data-theme="dark"] .toast { background: #1C2924; border: 1px solid var(--d-border); }
html[data-theme="dark"] .toast.success { background: #14573B; border-color: #1F7A54; }
html[data-theme="dark"] .toast.error { background: #6B2326; border-color: #8E3236; }
html[data-theme="dark"] .modal { background: rgba(0, 0, 0, .7); }
html[data-theme="dark"] .empty-state { border-color: #2F4A3D; }
html[data-theme="dark"] .breadcrumb strong { color: var(--d-text); }

html[data-theme="dark"] .filter-bar input,
html[data-theme="dark"] .filter-bar select,
html[data-theme="dark"] .calendar-controls select,
html[data-theme="dark"] .calendar-controls input,
html[data-theme="dark"] .form-group input,
html[data-theme="dark"] .form-group select,
html[data-theme="dark"] .form-group textarea,
html[data-theme="dark"] .schedule-preview td input[type="time"] { background: #101914; border-color: var(--d-border); color: var(--d-text); }
html[data-theme="dark"] .form-group input:read-only { background: #17211C; color: var(--d-muted); }

html[data-theme="dark"] .btn-outline,
html[data-theme="dark"] .btn-light,
html[data-theme="dark"] .small-btn,
html[data-theme="dark"] .photo-upload-btn,
html[data-theme="dark"] .view-tab,
html[data-theme="dark"] .dp-head button,
html[data-theme="dark"] .action-btn { background: var(--d-surface-2); border-color: var(--d-border); }
html[data-theme="dark"] .btn-outline,
html[data-theme="dark"] .btn-light,
html[data-theme="dark"] .photo-upload-btn,
html[data-theme="dark"] .dp-head button { color: var(--d-accent); }
html[data-theme="dark"] .btn-outline:hover,
html[data-theme="dark"] .btn-light:hover,
html[data-theme="dark"] .photo-upload-btn:hover,
html[data-theme="dark"] .small-btn:hover,
html[data-theme="dark"] .dp-head button:hover { background: #24382F; }
html[data-theme="dark"] .action-btn { color: #F28585; border-color: #8E3236; }
html[data-theme="dark"] .action-btn:hover { background: #C73737; color: #fff; }
html[data-theme="dark"] .action-btn.neutral { color: var(--d-accent); border-color: #2E9B68; background: transparent; }
html[data-theme="dark"] .action-btn.neutral:hover { background: #2E9B68; color: #fff; }
html[data-theme="dark"] .view-tab.active { background: #2E9B68; border-color: #2E9B68; color: #fff; }
html[data-theme="dark"] .btn-primary { background: #1F8A5B; }
html[data-theme="dark"] .btn-primary:hover { background: #2AA06C; }
html[data-theme="dark"] .text-btn,
html[data-theme="dark"] .mobile-brand,
html[data-theme="dark"] .form-section-title i,
html[data-theme="dark"] .room-card .room-status { color: var(--d-accent); }
html[data-theme="dark"] .icon-btn:hover { background: #24382F; color: var(--d-accent); }

html[data-theme="dark"] .avatar,
html[data-theme="dark"] .profile-avatar,
html[data-theme="dark"] .notification-icon { background-color: #1B3A2C; color: var(--d-accent); }
/* keep uploaded photos exactly as they are */
html[data-theme="dark"] .avatar.has-photo,
html[data-theme="dark"] .profile-avatar.has-photo,
html[data-theme="dark"] .admin-avatar.has-photo { color: transparent; }
html[data-theme="dark"] .facility-tag,
html[data-theme="dark"] .notif-chip,
html[data-theme="dark"] .sp-summary { background: #1B3A2C; color: #9CE2B7; }
html[data-theme="dark"] .sp-end { color: #9CE2B7; }
html[data-theme="dark"] .sp-remove:hover,
html[data-theme="dark"] .small-btn.danger:hover { background: #3A1D1F; }

html[data-theme="dark"] .stat-icon.blue   { color: #5FD39A; background: #16352A; }
html[data-theme="dark"] .stat-icon.green  { color: #4FD69B; background: #123A2A; }
html[data-theme="dark"] .stat-icon.orange { color: #F2B45E; background: #3A2E12; }
html[data-theme="dark"] .stat-icon.purple { color: #B79AF0; background: #2A2142; }

html[data-theme="dark"] .room-card:hover { box-shadow: 0 7px 20px rgba(0, 0, 0, .5); }
html[data-theme="dark"] .room-card img { background: #223029; }

html[data-theme="dark"] thead,
html[data-theme="dark"] .schedule-preview th { background: #1C2A23; }
html[data-theme="dark"] th { color: #A9C4B6; }
html[data-theme="dark"] .availability-notice { background: #15332A; color: #6FDDA5; }

/* booking calendar slots */
html[data-theme="dark"] .time-slot { background: #12362A; border-color: #25664A; color: #6FDDA5; }
html[data-theme="dark"] .time-slot:hover:not(:disabled) { background: #1B4A37; border-color: #3FAE7B; color: #9CE2B7; }
html[data-theme="dark"] .time-slot.booked,
html[data-theme="dark"] .time-slot.booked:hover { background: #3A1D1F; border-color: #7A3A3C; color: #F29A9A; }
html[data-theme="dark"] .time-slot.selected { background: #1F8A5B; border-color: #3FAE7B; color: #fff; }
html[data-theme="dark"] .time-slot.done,
html[data-theme="dark"] .time-slot.done:hover { background: #1C2420; border-color: #2B3A33; color: #6F8179; }

html[data-theme="dark"] .dp-day { color: var(--d-text); }
html[data-theme="dark"] .dp-day:hover:not(:disabled) { background: #24382F; }
html[data-theme="dark"] .dp-day:disabled { color: #4A5C53; }
html[data-theme="dark"] .dp-day.selected { background: #1F8A5B; color: #fff; }

html[data-theme="dark"] .notification-item.unread {
    background: #15332A;
    border-color: #25664A;
    box-shadow: 0 2px 10px rgba(0, 0, 0, .3);
}
html[data-theme="dark"] .notification-item.unread p { color: var(--d-text); }
html[data-theme="dark"] .feedback-reply { background: #12362A; border-left-color: #3FAE7B; }

/* ---------------------------------------------------------
   Scrollbars
--------------------------------------------------------- */
html[data-theme="dark"] * { scrollbar-color: #33463D #0E1512; }

`;
        (document.head || document.documentElement).appendChild(darkStyle);
    }

    function saved() {
        try { return localStorage.getItem(KEY); } catch (e) { return null; }
    }

    function systemTheme() {
        return window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }

    function apply(theme) {
        root.setAttribute("data-theme", theme);

        var meta = document.querySelector('meta[name="theme-color"]');
        if (!meta) {
            meta = document.createElement("meta");
            meta.name = "theme-color";
            document.head.appendChild(meta);
        }
        meta.content = theme === "dark" ? "#0B1511" : "#123D2C";

        document.querySelectorAll(".theme-toggle").forEach(function (b) {
            var label = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";
            b.setAttribute("aria-label", label);
            b.title = label;
            b.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
        });
    }

    // 1) before first paint
    apply(saved() || systemTheme());

    // 2) follow the device while the user has not chosen manually
    if (window.matchMedia) {
        var mq = matchMedia("(prefers-color-scheme: dark)");
        var onChange = function () { if (!saved()) apply(systemTheme()); };
        if (mq.addEventListener) mq.addEventListener("change", onChange);
        else if (mq.addListener) mq.addListener(onChange);
    }

    // 3) keep several open tabs of THIS portal in step
    window.addEventListener("storage", function (e) {
        if (e.key === KEY && e.newValue) apply(e.newValue);
    });

    var ICONS =
        '<svg class="i-moon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>' +
        '<svg class="i-sun" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';

    function makeButton(cls) {
        var b = document.createElement("button");
        b.type = "button";
        b.className = "theme-toggle " + cls;
        b.innerHTML = ICONS;
        b.addEventListener("click", function () {
            var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
            try { localStorage.setItem(KEY, next); } catch (e) {}
            apply(next);
        });
        return b;
    }

    function init() {
        // Student page: toggle next to "Refresh"
        var refresh = document.getElementById("refreshBtn");
        if (refresh && refresh.parentNode.classList.contains("s-header")) {
            var wrap = document.createElement("div");
            wrap.className = "s-actions";
            refresh.parentNode.insertBefore(wrap, refresh);
            wrap.appendChild(makeButton("s-refresh s-theme"));
            wrap.appendChild(refresh);
        }

        // Instructor portal: inside the top bar actions
        var actions = document.querySelector(".topbar-actions");
        if (actions) actions.insertBefore(makeButton("icon-btn"), actions.firstChild);

        // Admin portal: inside the top bar, before the user name
        var adminUser = document.querySelector(".admin-user");
        if (adminUser) adminUser.insertBefore(makeButton("admin-icon"), adminUser.firstChild);


        apply(root.getAttribute("data-theme"));
    }

    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
    else init();
})();


/************************************************************
 CLASSROOMRESERVE - ADMIN JAVASCRIPT
************************************************************/

const ADMIN_API_URL = "https://script.google.com/macros/s/AKfycbyxrdkkAAmclfl4RZDhYD6Ep6MJNlCDQQXsRsMe1_s9D6zmIreMRYXVdd7BxOgS3MmM8A/exec";

/* "Remember me" keeps the sign-in (token) and the email on this device.
   The PASSWORD is never stored by the page: the browser's own password
   manager saves and autofills it. */
let adminToken = sessionStorage.getItem("admin_token") || localStorage.getItem("admin_token") || "";

function clearAdminSession() {
    sessionStorage.removeItem("admin_token");
    localStorage.removeItem("admin_token");
    adminToken = "";
}

/* Network call with a timeout. Reads (GET) are retried once because Google
   Apps Script occasionally returns a temporary error under load. */
async function fetchJSON(url, options = {}, retries = 0) {
    for (let attempt = 0; ; attempt++) {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 30000);

        try {
            const response = await fetch(url, {...options, signal: controller.signal});
            return await response.json();
        } catch (error) {
            if (attempt >= retries) {
                throw new Error(error.name === "AbortError"
                    ? "The server is taking too long. Please try again."
                    : "Connection problem. Check your internet and try again.");
            }
            await new Promise(r => setTimeout(r, 700));
        } finally {
            clearTimeout(timer);
        }
    }
}

/* Run fn at most once every `wait` ms after the last call (search boxes) */
function debounce(fn, wait = 250) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), wait);
    };
}
let adminRooms = [];
let adminInstructors = [];
let adminReservations = [];
let adminNotifications = [];

const A = id => document.getElementById(id);

async function adminPost(action, data = {}) {
    const result = await fetchJSON(ADMIN_API_URL, {
        method:"POST",
        headers:{"Content-Type":"text/plain;charset=utf-8"},
        body:JSON.stringify({
            action,
            token:adminToken,
            ...data
        })
    });

    if (!result.success) throw new Error(result.message);
    return result;
}

async function adminGet(action, params = {}) {
    const query = new URLSearchParams({
        action,
        token:adminToken,
        ...params
    });

    const result = await fetchJSON(`${ADMIN_API_URL}?${query}`, {}, 1);

    if (!result.success) throw new Error(result.message);
    return result;
}

function adminEscape(value) {
    return String(value ?? "").replace(/[&<>"']/g, c => ({
        "&":"&amp;",
        "<":"&lt;",
        ">":"&gt;",
        '"':"&quot;",
        "'":"&#39;"
    })[c]);
}

/* ---------- CONFIRM DIALOG (replaces the browser's confirm() / prompt()) ----------
   adminConfirm({title, message, details:[[label,value]], confirmText, tone}) -> true/false
   adminDialog({... , input:{label, placeholder}})  -> {ok, value}  (reason is required) */
(function injectDialogStyles() {
    if (document.getElementById("acd-css")) return;
    const st = document.createElement("style");
    st.id = "acd-css";
    st.textContent = `
.acd-backdrop{position:fixed;inset:0;z-index:1000;display:flex;align-items:center;justify-content:center;
    padding:16px;background:rgba(16,39,29,.55);backdrop-filter:blur(2px);animation:acdFade .15s ease-out}
.acd-box{width:100%;max-width:420px;max-height:92vh;overflow-y:auto;background:#fff;color:#1D3329;
    border-radius:16px;padding:26px 24px 20px;text-align:center;box-shadow:0 24px 60px rgba(0,0,0,.28);
    animation:acdPop .18s ease-out}
.acd-icon{width:54px;height:54px;border-radius:50%;margin:0 auto 14px;display:flex;align-items:center;justify-content:center}
.acd-icon svg{width:26px;height:26px}
.acd-danger .acd-icon,.acd-icon.acd-danger{background:#FDECEC;color:#D94343}
.acd-warning .acd-icon,.acd-icon.acd-warning{background:#FFF1D6;color:#B87500}
.acd-box h3{font-size:19px;font-weight:700;margin:0 0 8px;color:#123D2C}
.acd-msg{margin:0 0 14px;color:#5E6F66;font-size:14px;line-height:1.55}
.acd-details{margin:0 0 14px;padding:10px 14px;border:1px solid #E1E9E3;background:#F5F7F6;border-radius:12px;text-align:left}
.acd-details div{display:flex;justify-content:space-between;gap:14px;padding:4px 0;font-size:13px}
.acd-details span{color:#75847C;flex-shrink:0}
.acd-details strong{color:#1D3329;text-align:right;word-break:break-word}
.acd-field{text-align:left;margin:0 0 14px}
.acd-field label{display:block;font-size:13px;font-weight:600;margin-bottom:6px;color:#1D3329}
.acd-field textarea{width:100%;min-height:78px;resize:vertical;padding:10px 12px;border:1px solid #E1E9E3;
    border-radius:10px;background:#fff;color:#1D3329;font:inherit;font-size:14px;outline:none}
.acd-field textarea:focus{border-color:#16784B;box-shadow:0 0 0 3px rgba(22,120,75,.15)}
.acd-field.bad textarea{border-color:#D94343}
.acd-err{display:none;color:#D94343;font-size:12px;margin-top:5px}
.acd-field.bad .acd-err{display:block}
.acd-actions{display:flex;gap:10px;margin-top:4px}
.acd-btn{flex:1;padding:11px 14px;border-radius:10px;font-weight:600;font-size:14px;border:1px solid transparent;cursor:pointer;transition:filter .15s,background .15s}
.acd-cancel{background:#fff;border-color:#CFDAD3;color:#1D3329}
.acd-cancel:hover{background:#F5F7F6}
.acd-ok{color:#fff;background:#16784B}
.acd-ok.acd-danger{background:#D94343}
.acd-ok.acd-warning{background:#C27F00}
.acd-ok:hover{filter:brightness(1.08)}
.acd-btn:focus-visible{outline:3px solid rgba(22,120,75,.35);outline-offset:2px}
@keyframes acdFade{from{opacity:0}to{opacity:1}}
@keyframes acdPop{from{opacity:0;transform:translateY(8px) scale(.97)}to{opacity:1;transform:none}}
html[data-theme="dark"] .acd-backdrop{background:rgba(0,0,0,.68)}
html[data-theme="dark"] .acd-box{background:#16201B;color:#E4EEE8;border:1px solid #2B3A33}
html[data-theme="dark"] .acd-box h3{color:#E4EEE8}
html[data-theme="dark"] .acd-msg{color:#93A69C}
html[data-theme="dark"] .acd-details{background:#101914;border-color:#2B3A33}
html[data-theme="dark"] .acd-details strong,html[data-theme="dark"] .acd-field label{color:#E4EEE8}
html[data-theme="dark"] .acd-details span{color:#93A69C}
html[data-theme="dark"] .acd-field textarea{background:#101914;border-color:#2B3A33;color:#E4EEE8}
html[data-theme="dark"] .acd-cancel{background:#1C2924;border-color:#2B3A33;color:#E4EEE8}
html[data-theme="dark"] .acd-cancel:hover{background:#24382F}
html[data-theme="dark"] .acd-danger .acd-icon,html[data-theme="dark"] .acd-icon.acd-danger{background:#3A1D1F;color:#F28585}
html[data-theme="dark"] .acd-warning .acd-icon,html[data-theme="dark"] .acd-icon.acd-warning{background:#3A2E12;color:#F0C676}
@media (max-width:420px){.acd-actions{flex-direction:column-reverse}}
@media (prefers-reduced-motion:reduce){.acd-backdrop,.acd-box{animation:none}}
`;
    document.head.appendChild(st);
})();

const ACD_ICONS = {
    danger: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/></svg>',
    warning: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/></svg>'
};

function adminDialog(o = {}) {
    return new Promise(resolve => {
        const tone = o.tone === "warning" ? "warning" : "danger";
        const previous = document.activeElement;

        const el = (tag, cls, text) => {
            const n = document.createElement(tag);
            if (cls) n.className = cls;
            if (text !== undefined) n.textContent = text;
            return n;
        };

        const backdrop = el("div", "acd-backdrop");
        backdrop.setAttribute("role", "alertdialog");
        backdrop.setAttribute("aria-modal", "true");

        const box = el("div", "acd-box");
        const icon = el("div", "acd-icon " + "acd-" + tone);
        icon.innerHTML = ACD_ICONS[tone];
        icon.setAttribute("aria-hidden", "true");

        const title = el("h3", "", o.title || "Are you sure?");
        title.id = "acdTitle";
        backdrop.setAttribute("aria-labelledby", "acdTitle");

        box.append(icon, title);

        if (o.message) box.append(el("p", "acd-msg", o.message));

        if (o.details && o.details.length) {
            const list = el("div", "acd-details");
            o.details.filter(d => d && d[1]).forEach(([label, value]) => {
                const row = el("div");
                row.append(el("span", "", label), el("strong", "", String(value)));
                list.append(row);
            });
            box.append(list);
        }

        let field = null, textarea = null;
        if (o.input) {
            field = el("div", "acd-field");
            const label = el("label", "", o.input.label || "Reason");
            textarea = el("textarea");
            textarea.placeholder = o.input.placeholder || "";
            textarea.maxLength = 300;
            label.htmlFor = textarea.id = "acdInput";
            const err = el("small", "acd-err", o.input.error || "Please enter a reason.");
            textarea.addEventListener("input", () => field.classList.remove("bad"));
            field.append(label, textarea, err);
            box.append(field);
        }

        const cancelBtn = el("button", "acd-btn acd-cancel", o.cancelText || "Cancel");
        cancelBtn.type = "button";
        const okBtn = el("button", "acd-btn acd-ok acd-" + tone, o.confirmText || "Confirm");
        okBtn.type = "button";
        box.append(el("div", "acd-actions"));
        box.lastChild.append(cancelBtn, okBtn);

        backdrop.append(box);
        document.body.append(backdrop);

        function close(result) {
            document.removeEventListener("keydown", onKey, true);
            backdrop.remove();
            if (previous && previous.focus) { try { previous.focus(); } catch (e) {} }
            resolve(result);
        }

        function submit() {
            if (textarea) {
                const value = textarea.value.trim();
                if (!value) { field.classList.add("bad"); textarea.focus(); return; }
                close({ok: true, value});
            } else {
                close({ok: true, value: ""});
            }
        }

        function onKey(e) {
            if (e.key === "Escape") { e.preventDefault(); e.stopPropagation(); close({ok: false, value: null}); return; }

            if (e.key === "Enter" && e.target !== textarea && e.target !== cancelBtn) {
                e.preventDefault();
                submit();
                return;
            }

            if (e.key === "Tab") {
                const items = [textarea, cancelBtn, okBtn].filter(Boolean);
                const first = items[0], last = items[items.length - 1];
                if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
                else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
            }
        }

        document.addEventListener("keydown", onKey, true);
        cancelBtn.onclick = () => close({ok: false, value: null});
        okBtn.onclick = submit;
        backdrop.addEventListener("mousedown", e => { if (e.target === backdrop) close({ok: false, value: null}); });

        (textarea || cancelBtn).focus();   // the safe choice is focused by default
    });
}

async function adminConfirm(o) {
    return (await adminDialog(o)).ok;
}

function adminToast(message, error = false) {
    const el = A("adminToast");
    el.textContent = message;
    el.className = "admin-toast";
    if (error) el.style.background = "#B83232";
    else el.style.background = "#123D2C";

    clearTimeout(window.adminToastTimer);
    window.adminToastTimer = setTimeout(() => {
        el.classList.add("hidden");
    }, 3500);
}


/* ---------- DATE / TIME HELPERS ----------
   Google Sheets returns dates and times as ISO strings
   (e.g. "2026-11-18T16:00:00.000Z" or "1899-12-30T..."),
   so they are normalised to "YYYY-MM-DD" and "HH:MM" first. */
const OPEN_TIME = "07:00";
const CLOSE_TIME = "21:00";

function pad2(n) { return String(n).padStart(2, "0"); }

function localToday() {
    const d = new Date();
    return `${d.getFullYear()}-${pad2(d.getMonth()+1)}-${pad2(d.getDate())}`;
}

/* A confirmed reservation is "completed" once its end time has passed */
function adminIsDone(r) {
    if (r.Status !== "Confirmed") return false;
    const today = localToday();
    if (r.Date < today) return true;
    if (r.Date > today) return false;
    const d = new Date();
    const now = `${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
    return !!r.EndTime && r.EndTime <= now;
}

/* label + css class shown in the Status column */
function adminStatusBadge(r) {
    if (r.Status === "Cancelled") return `<span class="status status-cancelled">Cancelled</span>`;
    if (adminIsDone(r)) return `<span class="status status-completed">Completed</span>`;
    return `<span class="status status-confirmed">${adminEscape(r.Status)}</span>`;
}

function normDate(v) {
    if (!v) return "";
    const s = String(v).trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;
    const d = new Date(s);
    if (isNaN(d)) return s;
    return `${d.getFullYear()}-${pad2(d.getMonth()+1)}-${pad2(d.getDate())}`;
}

function normTime(v) {
    if (v === null || v === undefined || v === "") return "";
    const s = String(v).trim();

    let m = s.match(/^(\d{1,2}):(\d{2})(?::\d{2})?\s*(AM|PM)$/i);
    if (m) {
        let h = Number(m[1]) % 12;
        if (m[3].toUpperCase() === "PM") h += 12;
        return `${pad2(h)}:${m[2]}`;
    }

    m = s.match(/^(\d{1,2}):(\d{2})(?::\d{2})?$/);
    if (m) return `${pad2(m[1])}:${m[2]}`;

    const d = new Date(s);
    if (isNaN(d)) return s;

    let h = d.getHours(), min = d.getMinutes();
    if (d.getFullYear() < 1950) {
        // Sheets time-only cells carry a 1899 timezone offset; snap to 5 min
        const total = Math.round((h * 60 + min) / 5) * 5;
        h = Math.floor(total / 60) % 24;
        min = total % 60;
    }
    return `${pad2(h)}:${pad2(min)}`;
}

function normRes(r) {
    return {...r,
        Subject: r.Subject ?? r.subject ?? r.Course ?? r.course ?? r.SubjectName ?? r.subjectName ?? "",
        Date: normDate(r.Date),
        StartTime: normTime(r.StartTime),
        EndTime: normTime(r.EndTime)
    };
}

/* Short, readable reservation ID for display (the full ID is still used internally) */
function shortID(id) {
    // Show the exact Reservation ID saved in the database
    return String(id ?? "").trim();
}

function adminDate(value) {
    if (!value) return "";
    const p = normDate(value).split("-");
    return p.length === 3
        ? new Date(p[0],p[1]-1,p[2]).toLocaleDateString()
        : value;
}

function adminTime(value) {
    const p = normTime(value).split(":");
    if (p.length < 2) return value;

    const d = new Date();
    d.setHours(Number(p[0]),Number(p[1]));
    return d.toLocaleTimeString([], {
        hour:"numeric",minute:"2-digit"
    });
}

/* NAVIGATION */

function adminNavigate(page) {
    document.querySelectorAll(".admin-page").forEach(p =>
        p.classList.remove("active")
    );

    document.querySelectorAll(".admin-nav[data-page]").forEach(b =>
        b.classList.remove("active")
    );

    const target = A("admin-" + page);
    if (!target) return;

    target.classList.add("active");

    const nav = document.querySelector(
        `.admin-nav[data-page="${page}"]`
    );

    if (nav) nav.classList.add("active");

    const titles = {
        dashboard:"Dashboard",
        rooms:"Manage Classrooms",
        instructors:"Instructor Management",
        reservations:"Reservations",
        calendar:"Calendar Schedule",
        notifications:"Notifications",
        feedback:"Reports & Feedback",
        reports:"Usage Reports"
    };

    A("adminPageTitle").textContent = titles[page] || page;
    A("adminSidebar").classList.remove("open");

    if (page === "rooms") renderAdminRooms();
    if (page === "instructors") renderInstructors();
    if (page === "reservations") renderAdminReservations();
    if (page === "notifications") renderAdminNotifications();
    if (page === "feedback") loadAdminFeedback();
    if (page === "reports") loadReports();
}

document.addEventListener("click", e => {
    const button = e.target.closest("[data-page]");
    if (button && button.closest(".admin-app")) {
        adminNavigate(button.dataset.page);
    }
});

/* AUTHENTICATION */

function adminShowApp() {
    A("adminAuth").classList.add("hidden");
    A("adminApp").classList.remove("hidden");
    adminLoadAll();
}

function adminShowLogin() {
    A("adminAuth").classList.remove("hidden");
    A("adminApp").classList.add("hidden");
}

A("adminLoginForm").addEventListener("submit", async e => {
    e.preventDefault();

    try {
        const result = await adminPost("login", {
            role:"Admin",
            email:A("adminEmail").value,
            password:A("adminPassword").value
        });

        adminToken = result.token;
        sessionStorage.setItem("admin_token",adminToken);

        // Remember me: keep email + sign-in on this device
        if (A("rememberMe").checked) {
            localStorage.setItem("admin_email", A("adminEmail").value.trim());
            localStorage.setItem("admin_token", adminToken);
            localStorage.removeItem("admin_remember_off");

            // Ask the browser to save the password in its password manager
            if (window.PasswordCredential) {
                try {
                    navigator.credentials.store(new PasswordCredential({
                        id: A("adminEmail").value.trim(),
                        password: A("adminPassword").value,
                        name: "Administrator"
                    }));
                } catch (err) {}
            }
        } else {
            localStorage.removeItem("admin_email");
            localStorage.removeItem("admin_token");
            localStorage.setItem("admin_remember_off", "1");
        }

        adminShowApp();
        adminToast("Administrator login successful.");

    } catch(error) {
        adminToast(error.message,true);
    }
});

A("adminLogout").onclick = async () => {
    try {
        await adminPost("logout");
    } catch(e) {}

    clearAdminSession();
    adminShowLogin();
};

A("adminMenuToggle").onclick = () =>
    A("adminSidebar").classList.toggle("open");

/* LOAD DATA */

let adminDataVer = "";

async function adminLoadAll(opts = {}) {
    try {
        let data;

        try {
            // One request for everything (fast)
            // background refresh: send the version we have; the server answers
            // "unchanged" (a few bytes) when nothing new happened
            data = await adminGet("getBootstrap", opts.silent && !opts.force && adminDataVer ? {since: adminDataVer} : {});
        } catch (error) {
            if (!/unknown action/i.test(error.message)) throw error;

            // Older backend: fall back to separate requests
            const results = await Promise.all([
                adminGet("getRooms"),
                adminGet("getInstructors"),
                adminGet("getAllReservations"),
                adminGet("getNotifications"),
                adminGet("getReports")
            ]);

            data = {
                rooms: results[0].rooms,
                instructors: results[1].instructors,
                reservations: results[2].reservations,
                notifications: results[3].notifications,
                reports: results[4].reports
            };
        }

        if (data.unchanged) {
            renderAdminReservations();   // time-based list only
            return;
        }
        adminDataVer = data.ver || "";

        adminRooms = data.rooms || [];
        adminInstructors = data.instructors || [];
        adminReservations = (data.reservations || []).map(normRes);
        adminNotifications = data.notifications || [];

        renderAdminDashboard(data.reports);
        renderAdminRooms();
        renderInstructors();
        renderAdminReservations();
        renderAdminNotifications();
        populateAdminCalendar();
        loadReports();
        loadAdminFeedback({ silent: true });

    } catch(error) {
        if (!opts.silent) adminToast(error.message,true);

        if (/session|permission|administrator/i.test(error.message)) {
            clearAdminSession();
            adminShowLogin();
        }
    }
}

/* DASHBOARD */

function renderAdminDashboard(report) {
    A("totalRooms").textContent = report.totalRooms;
    A("totalInstructors").textContent = report.totalInstructors;
    A("totalBookings").textContent = report.confirmed;
    A("totalCancelled").textContent = report.cancelled;

    A("recentReservations").innerHTML =
        [...adminReservations]
        .sort((a,b) => new Date(b.CreatedAt) - new Date(a.CreatedAt))
        .slice(0,7)
        .map(r => `
            <tr>
                <td title="${adminEscape(r.ReservationID)}">${adminEscape(shortID(r.ReservationID))}</td>
                <td>${adminEscape(r.InstructorName)}</td>
                <td>${adminEscape(r.RoomName)}</td>
                <td>${adminEscape(r.Subject || "\u2014")}</td>
                <td>${adminEscape(adminDate(r.Date))}</td>
                <td>${adminEscape(adminTime(r.StartTime))} - ${adminEscape(adminTime(r.EndTime))}</td>
                <td>${adminStatusBadge(r)}</td>
            </tr>
        `).join("") ||
        `<tr><td colspan="7">No reservations available.</td></tr>`;
}

/* CLASSROOM MANAGEMENT */

function renderAdminRooms() {
    const search = (A("roomSearch").value || "").trim().toLowerCase();

    const rooms = adminRooms.filter(r =>
        !search ||
        [r.RoomName, r.Building, r.Floor, r.Facilities, r.Status, r.Capacity]
            .join(" ").toLowerCase().includes(search)
    );

    A("roomSummary").textContent = search
        ? `${rooms.length} of ${adminRooms.length} classroom${adminRooms.length === 1 ? "" : "s"} found`
        : "";

    A("adminRoomList").innerHTML = rooms.map(r => `
        <article class="admin-room-card">
            <img loading="lazy" decoding="async" src="${adminEscape(r.PhotoURL || "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800")}"
                 onerror="this.src='https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800'"
                 alt="${adminEscape(r.RoomName)}">

            <div class="admin-room-body">
                <h3>${adminEscape(r.RoomName)}</h3>
                <p>Building: ${adminEscape(r.Building)}</p>
                <p>Floor: ${adminEscape(r.Floor || "-")}</p>
                <p>Capacity: ${adminEscape(r.Capacity)} students</p>
                <p>Facilities: ${adminEscape(r.Facilities || "-")}</p>
                <span class="status ${r.Status === "Active" ? "status-active" : "status-inactive"}">
                    ${adminEscape(r.Status)}
                </span>

                <div class="admin-room-actions">
                    <button class="small-btn" data-edit-room="${adminEscape(r.RoomID)}">Edit</button>
                    <button class="small-btn danger" data-delete-room="${adminEscape(r.RoomID)}">
                        Deactivate
                    </button>
                    <button class="small-btn danger" data-remove-room="${adminEscape(r.RoomID)}">Delete</button>
                </div>
            </div>
        </article>
    `).join("") || `<p>${adminRooms.length ? "No classrooms match your search." : "No classrooms added yet."}</p>`;
}

A("roomSearch").addEventListener("input", debounce(renderAdminRooms));

let roomPhotoData = "";
let roomPhotoSmall = "";

/* Resize the chosen picture in the browser (max 1000px, JPEG) before upload */
function compressImage(file, maxSize = 1000, quality = 0.8) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = () => reject(new Error("Could not read the image."));
        reader.onload = () => {
            const img = new Image();
            img.onerror = () => reject(new Error("This file is not a valid image."));
            img.onload = () => {
                const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
                const canvas = document.createElement("canvas");
                canvas.width = Math.round(img.width * scale);
                canvas.height = Math.round(img.height * scale);
                const ctx = canvas.getContext("2d");
                ctx.fillStyle = "#fff";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                resolve(canvas.toDataURL("image/jpeg", quality));
            };
            img.src = reader.result;
        };
        reader.readAsDataURL(file);
    });
}

/* Small copy (under ~40,000 characters) kept as a fallback in the sheet
   if Google Drive refuses the upload. */
async function compressSmall(file, attempts, limit = 40000) {
    let last = "";
    for (const [size, quality] of attempts) {
        last = await compressImage(file, size, quality);
        if (last.length <= limit) return last;
    }
    return last;
}

A("roomPhotoFile").addEventListener("change", async e => {
    const file = e.target.files[0];
    roomPhotoData = "";
    roomPhotoSmall = "";

    if (!file) return;

    if (!/^image\/(jpeg|png|webp)$/.test(file.type)) {
        adminToast("Please choose a JPG, PNG or WebP image.", true);
        e.target.value = "";
        return;
    }

    if (file.size > 10 * 1024 * 1024) {
        adminToast("Image is too large. Choose a picture under 10 MB.", true);
        e.target.value = "";
        return;
    }

    try {
        roomPhotoData = await compressImage(file);
        roomPhotoSmall = await compressSmall(file, [[640,.7],[560,.6],[480,.55],[400,.5],[320,.45]]);
        A("roomPhotoPreview").src = roomPhotoData;
        A("roomPhotoPreview").classList.remove("hidden");
    } catch (error) {
        adminToast(error.message, true);
        e.target.value = "";
    }
});

function openRoomModal(room = null) {
    A("roomForm").reset();
    roomPhotoData = "";
    roomPhotoSmall = "";
    A("roomPhoto").value = "";
    A("roomPhotoPreview").removeAttribute("src");
    A("roomPhotoPreview").classList.add("hidden");
    A("editRoomID").value = room?.RoomID || "";
    A("roomModalTitle").textContent = room ? "Edit Classroom" : "Add Classroom";

    if (room) {
        A("roomName").value = room.RoomName;
        A("roomBuilding").value = room.Building;
        A("roomFloor").value = room.Floor || "";
        A("roomCapacity").value = room.Capacity;
        A("roomFacilities").value = room.Facilities || "";
        A("roomPhoto").value = room.PhotoURL || "";
        if (room.PhotoURL) {
            A("roomPhotoPreview").src = room.PhotoURL;
            A("roomPhotoPreview").classList.remove("hidden");
        }
        A("roomDescription").value = room.Description || "";
        A("roomStatus").value = room.Status;
    }

    A("roomModal").classList.remove("hidden");
}

A("addRoomBtn").onclick = () => openRoomModal();

A("closeRoomModal").onclick = () =>
    A("roomModal").classList.add("hidden");

document.addEventListener("click", async e => {
    const edit = e.target.closest("[data-edit-room]");
    if (edit) {
        const room = adminRooms.find(r =>
            r.RoomID === edit.dataset.editRoom
        );
        if (room) openRoomModal(room);
    }

    const del = e.target.closest("[data-delete-room]");
    if (del) {
        const room = adminRooms.find(r =>
            r.RoomID === del.dataset.deleteRoom
        );

        if (!room) return;

        if (!await adminConfirm({
            tone: "warning",
            title: "Deactivate classroom?",
            message: "Instructors will no longer be able to reserve this classroom.",
            details: [["Classroom", room.RoomName], ["Building", room.Building]],
            confirmText: "Deactivate"
        })) return;

        try {
            const result = await adminPost("adminDeleteRoom", {
                roomId:room.RoomID
            });

            adminToast(result.message);
            addAdminNotif("Classroom deactivated", `You deactivated ${room.RoomName}. Instructors can no longer reserve it.`, {RoomName: room.RoomName});
            await adminLoadAll();

        } catch(error) {
            adminToast(error.message,true);
        }
    }
});

document.addEventListener("click", async e => {
    const button = e.target.closest("[data-remove-room]");
    if (!button) return;

    const room = adminRooms.find(r => r.RoomID === button.dataset.removeRoom);
    if (!room) return;

    if (!await adminConfirm({
        tone: "danger",
        title: "Delete classroom?",
        message: "This permanently removes the classroom and cannot be undone. Past reservations keep the room name in the records.",
        details: [["Classroom", room.RoomName], ["Building", room.Building], ["Floor", room.Floor]],
        confirmText: "Delete classroom"
    })) return;

    try {
        const result = await adminPost("adminRemoveRoom", {roomId:room.RoomID});
        adminToast(result.message);
        addAdminNotif("Classroom deleted", `You permanently deleted ${room.RoomName}.`, {RoomName: room.RoomName});
        await adminLoadAll();
    } catch(error) {
        adminToast(error.message, true);
    }
});

A("roomForm").addEventListener("submit", async e => {
    e.preventDefault();

    try {
        const result = await adminPost("adminSaveRoom", {
            room:{
                roomId:A("editRoomID").value,
                roomName:A("roomName").value.trim(),
                building:A("roomBuilding").value.trim(),
                floor:A("roomFloor").value,
                capacity:A("roomCapacity").value,
                facilities:A("roomFacilities").value,
                photoURL:A("roomPhoto").value,
                photoData:roomPhotoData,
                photoSmall:roomPhotoSmall,
                description:A("roomDescription").value,
                status:A("roomStatus").value
            }
        });

        A("roomModal").classList.add("hidden");
        adminToast(result.message);
        await adminLoadAll();

    } catch(error) {
        adminToast(error.message,true);
    }
});

/* INSTRUCTORS */

function renderInstructors() {
    const search = (A("instructorSearch").value || "").toLowerCase();
    const select = A("instructorDepartment");
    const chosen = select.value;

    // Keep the department list in sync with the registered instructors
    const departments = [...new Set(
        adminInstructors.map(i => String(i.department || "").trim() || "No Department")
    )].sort((x, y) => x.localeCompare(y));

    select.innerHTML = `<option value="">All Departments</option>` +
        departments.map(d => `<option value="${adminEscape(d)}">${adminEscape(d)}</option>`).join("");
    select.value = departments.includes(chosen) ? chosen : "";

    const deptOf = i => String(i.department || "").trim() || "No Department";

    const list = adminInstructors
        .filter(i =>
            (!select.value || deptOf(i) === select.value) &&
            (i.fullName + " " + i.employeeID + " " + i.department + " " + i.email)
                .toLowerCase().includes(search)
        )
        .sort((x, y) => deptOf(x).localeCompare(deptOf(y)) ||
                        String(x.fullName).localeCompare(String(y.fullName)));

    let html = "";
    let lastDept = null;

    list.forEach(i => {
        const dept = deptOf(i);

        if (dept !== lastDept) {
            const count = list.filter(x => deptOf(x) === dept).length;
            html += `<tr class="dept-row"><td colspan="6">${adminEscape(dept)} &middot; ${count} instructor${count > 1 ? "s" : ""}</td></tr>`;
            lastDept = dept;
        }

        html += `
        <tr>
            <td>${adminEscape(i.fullName)}</td>
            <td>${adminEscape(i.employeeID)}</td>
            <td>${adminEscape(i.department)}</td>
            <td>${adminEscape(i.email)}</td>
            <td><span class="status ${i.status === "Active" ? "status-active" : "status-inactive"}">${adminEscape(i.status)}</span></td>
            <td>
                <button class="small-btn"
                    data-instructor="${adminEscape(i.instructorID)}"
                    data-status="${i.status === "Active" ? "Inactive" : "Active"}">
                    ${i.status === "Active" ? "Deactivate" : "Activate"}
                </button>
                <button class="small-btn danger" data-remove-instructor="${adminEscape(i.instructorID)}">Delete</button>
            </td>
        </tr>`;
    });

    A("instructorList").innerHTML = html || `<tr><td colspan="6">No instructors found.</td></tr>`;
}

A("instructorSearch").addEventListener("input",debounce(renderInstructors));
A("instructorDepartment").addEventListener("change",renderInstructors);

document.addEventListener("click",async e => {
    const button = e.target.closest("[data-instructor]");
    if (!button) return;

    try {
        const result = await adminPost("adminSaveInstructor", {
            instructorID:button.dataset.instructor,
            status:button.dataset.status
        });

        adminToast(result.message);
        await adminLoadAll();

    } catch(error) {
        adminToast(error.message,true);
    }
});

document.addEventListener("click", async e => {
    const button = e.target.closest("[data-remove-instructor]");
    if (!button) return;

    const person = adminInstructors.find(i => i.instructorID === button.dataset.removeInstructor);
    if (!person) return;

    if (!await adminConfirm({
        tone: "danger",
        title: "Delete instructor?",
        message: "This permanently removes the account and cannot be undone. Their past reservations stay in the records.",
        details: [["Name", person.fullName], ["Employee ID", person.employeeID], ["Email", person.email]],
        confirmText: "Delete instructor"
    })) return;

    try {
        const result = await adminPost("adminRemoveInstructor", {instructorID:person.instructorID});
        adminToast(result.message);
        addAdminNotif("Instructor deleted", `You permanently deleted instructor ${person.fullName}. Their past reservations stay in the records.`);
        await adminLoadAll();
    } catch(error) {
        adminToast(error.message, true);
    }
});

/* RESERVATIONS */

let adminResLimit = 50;

/* Trash / permanent delete are saved in the Reservations sheet (AdminView column),
   so every device and every administrator sees the same list. */
async function setAdminResView(ids, view) {
    const result = await adminPost("setAdminReservationView", {reservationIDs: ids, view});
    if ((result.count || 0) < ids.length) {
        await adminLoadAll({silent: true, force: true});   // show what the server really has
        throw new Error("The change could not be saved on the server. Please try again.");
    }
    adminReservations.forEach(r => { if (ids.includes(r.ReservationID)) r.AdminView = view; });
    renderAdminReservations();
}

let adminResView = "upcoming";

function renderAdminReservations() {
    const search = (A("bookingSearch").value || "").toLowerCase();
    const date = A("bookingDate").value;
    // which area a reservation belongs to
    const area = r =>
        r.Status === "Cancelled" ? "cancelled"
        : adminIsDone(r) ? (r.AdminView === "Trash" ? "trash" : "completed")
        : "upcoming";

    const visible = adminReservations.filter(r => r.AdminView !== "Deleted");

    const counts = {upcoming: 0, completed: 0, cancelled: 0, trash: 0};
    visible.forEach(r => counts[area(r)]++);

    const names = {upcoming: "Upcoming", completed: "Completed", cancelled: "Cancelled", trash: "Trash"};
    document.querySelectorAll("[data-res-view]").forEach(b => {
        const v = b.dataset.resView;
        b.classList.toggle("active", v === adminResView);
        b.textContent = `${names[v]} (${counts[v]})`;
    });
    A("emptyResTrash").classList.toggle("hidden", !(adminResView === "trash" && counts.trash));

    const list = visible.filter(r =>
        area(r) === adminResView &&
        (!date || r.Date === date) &&
        (r.ReservationID + " " + shortID(r.ReservationID) + " " + r.InstructorName + " " + r.RoomName + " " + (r.Subject || ""))
            .toLowerCase().includes(search)
    ).sort((a, b) => {
        // grouped by classroom first, then by date and time inside each classroom
        const byRoom = String(a.RoomName).localeCompare(String(b.RoomName), undefined, {numeric: true});
        if (byRoom) return byRoom;
        const k = (a.Date + a.StartTime).localeCompare(b.Date + b.StartTime);
        return adminResView === "upcoming" ? k : -k;      // history: newest first
    });

    const roomTotals = {};
    list.forEach(r => { roomTotals[r.RoomName] = (roomTotals[r.RoomName] || 0) + 1; });

    const shown = list.slice(0, adminResLimit);
    const noun = adminResView === "upcoming" ? "upcoming" : adminResView === "trash" ? "deleted" : adminResView;

    const actions = r => {
        const id = adminEscape(r.ReservationID);
        const a = area(r);
        if (a === "upcoming") return `<button class="small-btn danger" data-cancel-admin="${id}">Cancel</button>`;
        if (a === "completed") return `<button class="small-btn danger" data-res-delete="${id}">Delete</button>`;
        if (a === "trash") return `
            <button class="small-btn" data-res-restore="${id}">Restore</button>
            <button class="small-btn danger" data-res-purge="${id}">Delete permanently</button>`;
        return "-";
    };

    let lastRoom = null;

    A("allReservations").innerHTML = shown.map(r => {
        const header = r.RoomName !== lastRoom
            ? `<tr class="group-row"><td colspan="9">
                    <strong>${adminEscape(r.RoomName || "No classroom")}</strong>
                    <span>${roomTotals[r.RoomName]} reservation${roomTotals[r.RoomName] === 1 ? "" : "s"}</span>
               </td></tr>`
            : "";
        lastRoom = r.RoomName;

        return header + `
        <tr>
            <td title="${adminEscape(r.ReservationID)}">${adminEscape(shortID(r.ReservationID))}</td>
            <td>${adminEscape(r.InstructorName)}</td>
            <td>${adminEscape(r.RoomName)}</td>
            <td>${adminEscape(r.Subject || "\u2014")}</td>
            <td>${adminEscape(adminDate(r.Date))}</td>
            <td>${adminEscape(adminTime(r.StartTime))} - ${adminEscape(adminTime(r.EndTime))}</td>
            <td>${adminEscape(r.Purpose)}</td>
            <td>${adminStatusBadge(r)}</td>
            <td>${actions(r)}</td>
        </tr>`;
    }).join("") || `<tr><td colspan="9">${date ? `No ${noun} reservations on this date.` : `No ${noun} reservations found.`}</td></tr>`;

    if (list.length > shown.length) {
        A("allReservations").insertAdjacentHTML("beforeend", `
            <tr><td colspan="9" style="text-align:center">
                <button class="admin-outline" id="adminShowMore" type="button">
                    Show more (${list.length - shown.length} remaining)
                </button>
            </td></tr>`);
    }

    A("bookingSummary").textContent = (date
        ? `Showing ${noun} reservations for ${adminDate(date)}`
        : `Showing ${noun} reservations for all dates`) +
        ` · ${list.length} found`;
}

function describeAdminRes(r) {
    return `${r.InstructorName || "an instructor"}'s reservation for ${r.RoomName || "a classroom"} on ${adminDate(r.Date)}, ${adminTime(r.StartTime)} - ${adminTime(r.EndTime)}`;
}

document.addEventListener("click", async e => {
    const del = e.target.closest("[data-res-delete]");
    const restore = e.target.closest("[data-res-restore]");
    const purge = e.target.closest("[data-res-purge]");
    if (!del && !restore && !purge) return;

    try {
        if (del) {
            const id = del.dataset.resDelete;
            const r = adminReservations.find(x => x.ReservationID === id);
            await setAdminResView([id], "Trash");
            adminToast("Moved to Trash. Open the Trash tab to restore or delete it permanently.");
            if (r) addAdminNotif("Reservation deleted", `You moved ${describeAdminRes(r)} to Trash.`, {
                RoomName: r.RoomName, BookingDate: r.Date, BookingTime: `${r.StartTime}-${r.EndTime}`
            });
            return;
        }

        if (restore) {
            await setAdminResView([restore.dataset.resRestore], "");
            adminToast("Reservation restored to Completed.");
            return;
        }

        const id = purge.dataset.resPurge;
        const r = adminReservations.find(x => x.ReservationID === id);
        await setAdminResView([id], "Deleted");
        adminToast("Reservation permanently deleted from the list.");
        if (r) addAdminNotif("Reservation permanently deleted", `You permanently deleted ${describeAdminRes(r)} from the list.`, {
            RoomName: r.RoomName, BookingDate: r.Date, BookingTime: `${r.StartTime}-${r.EndTime}`
        });
    } catch (error) {
        adminToast(error.message, true);
    }
});

A("emptyResTrash").onclick = async () => {
    const ids = adminReservations.filter(r => r.AdminView === "Trash").map(r => r.ReservationID);
    if (!ids.length) return;
    if (!await adminConfirm({
        tone: "danger",
        title: "Empty Trash?",
        message: `Permanently delete ${ids.length} reservation(s) from the list? Usage reports still count them. This cannot be undone.`,
        confirmText: "Delete permanently"
    })) return;
    try {
        await setAdminResView(ids, "Deleted");
        adminToast("Trash emptied.");
        addAdminNotif("Trash emptied", `${ids.length} completed reservation(s) were permanently deleted from the list.`);
    } catch (error) {
        adminToast(error.message, true);
    }
};

A("bookingDate").value = localToday();
const resetAndRenderReservations = () => {
    adminResLimit = 50;
    renderAdminReservations();
};

document.addEventListener("click", e => {
    if (e.target.closest("#adminShowMore")) {
        adminResLimit += 50;
        renderAdminReservations();
    }
});

A("bookingDate").addEventListener("change",resetAndRenderReservations);
A("bookingAllDates").onclick = () => {
    A("bookingDate").value = "";
    resetAndRenderReservations();
};

A("bookingSearch").addEventListener("input",debounce(resetAndRenderReservations));
document.addEventListener("click", e => {
    const tab = e.target.closest("[data-res-view]");
    if (!tab) return;

    adminResView = tab.dataset.resView;

    // History areas should not be hidden by the default "today" filter
    if (adminResView !== "upcoming" && A("bookingDate").value === localToday()) {
        A("bookingDate").value = "";
    }

    resetAndRenderReservations();
});

document.addEventListener("click",async e => {
    const button = e.target.closest("[data-cancel-admin]");
    if (!button) return;

    const record = adminReservations.find(r =>
        r.ReservationID === button.dataset.cancelAdmin
    );

    const answer = await adminDialog({
        tone: "danger",
        title: "Cancel this reservation?",
        message: "The classroom will be freed and the instructor will be notified.",
        details: record ? [
            ["Instructor", record.InstructorName],
            ["Classroom", record.RoomName],
            ["Date", adminDate(record.Date)],
            ["Time", `${adminTime(record.StartTime)} - ${adminTime(record.EndTime)}`]
        ] : [],
        input: {label: "Reason for cancelling", placeholder: "e.g. Room needed for a school event", error: "Please enter a cancellation reason."},
        confirmText: "Cancel reservation",
        cancelText: "Keep reservation"
    });
    if (!answer.ok) return;
    const reason = answer.value;

    try {
        const result = await adminPost("adminUpdateReservation", {
            reservationID:button.dataset.cancelAdmin,
            status:"Cancelled",
            reason
        });

        adminToast(result.message);
        if (record) addAdminNotif(
            "Reservation cancelled",
            `You cancelled ${record.InstructorName || "an instructor"}'s reservation for ${record.RoomName || "a classroom"} on ${adminDate(record.Date)}, ${adminTime(record.StartTime)} - ${adminTime(record.EndTime)}. Reason: ${reason.trim()}`,
            {
                Type: "cancellation",
                RoomName: record.RoomName,
                BookingDate: record.Date,
                BookingTime: `${record.StartTime}-${record.EndTime}`
            }
        );
        await adminLoadAll();

    } catch(error) {
        adminToast(error.message,true);
    }
});

/* CALENDAR */

function populateAdminCalendar() {
    const chosenRoom = A("adminCalendarRoom").value;
    A("adminCalendarRoom").innerHTML =
        `<option value="">All Classrooms</option>` +
        adminRooms.filter(r => r.Status === "Active").map(r =>
            `<option value="${adminEscape(r.RoomID)}">${adminEscape(r.RoomName)}</option>`
        ).join("");
    if (chosenRoom && [...A("adminCalendarRoom").options].some(o => o.value === chosenRoom)) {
        A("adminCalendarRoom").value = chosenRoom;
    }
}

function renderAdminCalendar() {
    const room = A("adminCalendarRoom").value;
    const date = A("adminCalendarDate").value;

    const list = adminReservations.filter(r =>
        r.Status === "Confirmed" &&
        (!room || r.RoomID === room) &&
        (!date || r.Date === date)
    ).sort((a, b) =>
        (a.Date + a.StartTime).localeCompare(b.Date + b.StartTime)
    );

    A("adminCalendarList").innerHTML = list.map(r => `
        <tr>
            <td title="${adminEscape(r.ReservationID)}">${adminEscape(shortID(r.ReservationID))}</td>
            <td>${adminEscape(r.RoomName)}</td>
            <td>${adminEscape(adminDate(r.Date))}</td>
            <td>${adminEscape(r.InstructorName)}</td>
            <td>${adminEscape(adminTime(r.StartTime))}</td>
            <td>${adminEscape(adminTime(r.EndTime))}</td>
            <td>${adminEscape(r.Subject || "\u2014")}</td>
            <td>${adminEscape(r.Purpose)}</td>
            <td>${adminStatusBadge(r)}</td>
        </tr>
    `).join("") || `<tr><td colspan="9">No reservations for this selection.</td></tr>`;
}

A("adminCalendarBtn").onclick = renderAdminCalendar;

/* NOTIFICATIONS */

function adminDateTime(value) {
    if (!value) return "";
    const d = new Date(value);
    return isNaN(d) ? String(value) : d.toLocaleString(undefined, {
        year:"numeric", month:"short", day:"numeric",
        hour:"numeric", minute:"2-digit"
    });
}

/* ---------- Read / unread, Trash and confirmation messages (kept on this device) ---------- */

function loadJSON(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key) || "") || fallback; } catch (e) { return fallback; }
}

function saveJSON(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
}

const adminLocalNotifs = () => loadJSON("admin_local_notifs", []);
const adminReadIds = () => loadJSON("admin_read_ids", []);
const adminUnreadIds = () => loadJSON("admin_unread_ids", []);     // marked unread again
const adminTrashIds = () => loadJSON("admin_trash_ids", []);       // in Trash
const adminPurgedIds = () => loadJSON("admin_purged_ids", []);     // permanently deleted
const adminArchivedIds = () => loadJSON("admin_archived_ids", []);

function isLocalNote(id) { return String(id).startsWith("local-"); }

/* A confirmation message for something the administrator just did */
function addAdminNotif(title, message, extra = {}) {
    const list = adminLocalNotifs();
    list.unshift({
        NotificationID: "local-" + Date.now() + "-" + Math.random().toString(36).slice(2, 7),
        Title: title,
        Message: message,
        CreatedAt: new Date().toISOString(),
        IsRead: false,
        IsArchived: false,
        ...extra
    });
    saveJSON("admin_local_notifs", list.slice(0, 100));
    renderAdminNotifications();
}

function isArchivedNote(n) {
    if (adminArchivedIds().includes(String(n.NotificationID))) return true;
    const t = String(n.IsArchived).toLowerCase();
    return n.IsArchived === true || t === "yes" || t === "true";
}

function isUnreadNote(n) {
    const id = String(n.NotificationID);
    if (adminUnreadIds().includes(id)) return true;
    if (adminReadIds().includes(id)) return false;
    return n.IsRead !== true && n.IsRead !== "TRUE";
}

function adminNoteBuckets() {
    const purged = adminPurgedIds(), trashed = adminTrashIds();
    const raw = [...adminLocalNotifs(), ...adminNotifications]
        .filter(n => !purged.includes(String(n.NotificationID)))
        .sort((a, b) => {
            const da = new Date(a.CreatedAt), db = new Date(b.CreatedAt);
            return (isNaN(db) ? 0 : db) - (isNaN(da) ? 0 : da);
        });
    const live = raw.filter(n => !trashed.includes(String(n.NotificationID)));
    return {
        inbox: live.filter(n => !isArchivedNote(n)),
        archived: live.filter(isArchivedNote),
        trash: raw.filter(n => trashed.includes(String(n.NotificationID)))
    };
}

function adminUnreadCount() {
    return adminNoteBuckets().inbox.filter(isUnreadNote).length;
}

function markAdminNoteRead(id) {
    id = String(id);
    const read = adminReadIds();
    if (!read.includes(id)) read.push(id);
    saveJSON("admin_read_ids", read);
    saveJSON("admin_unread_ids", adminUnreadIds().filter(x => x !== id));
    renderAdminNotifications();
}

function markAdminNoteUnread(id) {
    id = String(id);
    saveJSON("admin_read_ids", adminReadIds().filter(x => x !== id));
    const unread = adminUnreadIds();
    if (!unread.includes(id)) unread.push(id);
    saveJSON("admin_unread_ids", unread);
    renderAdminNotifications();
}

function purgeAdminNotes(ids) {
    ids = ids.map(String);

    // permanently remove messages that live on the server
    ids.filter(id => !isLocalNote(id)).forEach(id => {
        adminPost("deleteNotification", {notificationID:id}).catch(() => {});
    });

    saveJSON("admin_purged_ids", [...new Set([...adminPurgedIds(), ...ids])]);
    saveJSON("admin_trash_ids", adminTrashIds().filter(x => !ids.includes(x)));
    saveJSON("admin_local_notifs", adminLocalNotifs().filter(n => !ids.includes(n.NotificationID)));
    renderAdminNotifications();
}

/* Room + booked date/time chips for a notification */
function adminNotifDetails(n) {
    const dates = String(n.BookingDate || "").split(",").map(x => x.trim()).filter(Boolean);
    const times = String(n.BookingTime || "").split(",").map(x => x.trim()).filter(Boolean);
    const chips = [];

    if (n.RoomName) {
        chips.push(`<span class="admin-chip"><i data-lucide="door-open"></i>${adminEscape(n.RoomName)}</span>`);
    }

    dates.forEach((d, i) => {
        const t = times[times.length === 1 ? 0 : i] || "";
        const [from, to] = t.split("-");
        const range = from && to ? `${adminTime(from)} - ${adminTime(to)}` : "";
        chips.push(`<span class="admin-chip"><i data-lucide="calendar-clock"></i>${adminEscape(adminDate(d))}${range ? " · " + adminEscape(range) : ""}</span>`);
    });

    return chips.length ? `<div class="admin-notif-meta">${chips.join("")}</div>` : "";
}

let adminNotifView = "active";

function renderAdminNotifications() {
    const {inbox, archived, trash} = adminNoteBuckets();
    const unread = inbox.filter(isUnreadNote);
    const list = adminNotifView === "archived" ? archived : adminNotifView === "trash" ? trash : inbox;
    const inTrash = adminNotifView === "trash";

    A("adminNotificationCount").textContent = unread.length;
    A("adminNotificationCount").classList.toggle("hidden", unread.length === 0);

    document.querySelectorAll("[data-notif-view]").forEach(b => {
        const v = b.dataset.notifView;
        b.classList.toggle("active", v === adminNotifView);
        b.textContent = v === "archived" ? `Archived (${archived.length})`
                      : v === "trash" ? `Trash (${trash.length})`
                      : `Inbox (${inbox.length})`;
    });

    A("adminMarkRead").classList.toggle("hidden", adminNotifView !== "active");
    A("adminDeleteArchived").classList.toggle("hidden", !(adminNotifView === "archived" && archived.length));
    A("adminEmptyTrash").classList.toggle("hidden", !(inTrash && trash.length));

    const empty = adminNotifView === "archived" ? "No archived notifications."
                : inTrash ? "Trash is empty."
                : "No notifications available.";

    A("adminNotificationList").innerHTML =
        list.map(n => {
            const id = adminEscape(n.NotificationID);
            const isNew = isUnreadNote(n) && !inTrash;

            const buttons = inTrash ? `
                    <button class="small-btn" data-notif-restore="${id}">Restore</button>
                    <button class="small-btn danger" data-notif-purge="${id}">Delete permanently</button>
            ` : `
                    ${isUnreadNote(n)
                        ? `<button class="small-btn" data-notif-read="${id}">Mark read</button>`
                        : `<button class="small-btn" data-notif-unread="${id}">Mark unread</button>`}
                    <button class="small-btn" data-notif-archive="${id}"
                            data-archived="${adminNotifView === "archived" ? "0" : "1"}">
                        ${adminNotifView === "archived" ? "Restore" : "Archive"}
                    </button>
                    <button class="small-btn danger" data-notif-delete="${id}">Delete</button>
            `;

            return `
            <article class="admin-notification ${isNew ? "unread" : ""}" data-nid="${id}">
                <i data-lucide="${n.Type === "cancellation" ? "calendar-x" : "bell"}"></i>
                <div class="notif-body">
                    <h3>${adminEscape(n.Title)}${isNew ? ' <span class="new-badge">NEW</span>' : ""}</h3>
                    <p>${adminEscape(n.Message)}</p>
                    ${adminNotifDetails(n)}
                    <small class="notif-received">Received: ${adminEscape(adminDateTime(n.CreatedAt))}</small>
                </div>
                <div class="notif-actions">${buttons}</div>
            </article>`;
        }).join("") || `<p>${empty}</p>`;

    if(window.lucide) lucide.createIcons();
}

document.addEventListener("click", async e => {
    const tab = e.target.closest("[data-notif-view]");

    if (tab) {
        adminNotifView = tab.dataset.notifView;
        renderAdminNotifications();
        return;
    }

    const readOne = e.target.closest("[data-notif-read]");
    if (readOne) { markAdminNoteRead(readOne.dataset.notifRead); return; }

    const unreadOne = e.target.closest("[data-notif-unread]");
    if (unreadOne) { markAdminNoteUnread(unreadOne.dataset.notifUnread); return; }

    const archive = e.target.closest("[data-notif-archive]");

    if (archive) {
        const aid = archive.dataset.notifArchive;
        const archiveIt = archive.dataset.archived === "1";

        if (isLocalNote(aid)) {
            const list = adminLocalNotifs();
            const item = list.find(n => n.NotificationID === aid);
            if (item) item.IsArchived = archiveIt;
            saveJSON("admin_local_notifs", list);
            if (archiveIt) markAdminNoteRead(aid); else renderAdminNotifications();
            adminToast(archiveIt ? "Notification archived." : "Notification restored.");
            return;
        }

        try {
            const result = await adminPost("archiveNotification", {
                notificationID:aid,
                archived:archiveIt
            });
            adminToast(result.message);
            await adminLoadAll();
        } catch(error) {
            adminToast(error.message, true);
        }
        return;
    }

    const del = e.target.closest("[data-notif-delete]");

    if (del) {
        const id = String(del.dataset.notifDelete);
        const trash = adminTrashIds();
        if (!trash.includes(id)) trash.push(id);
        saveJSON("admin_trash_ids", trash);
        renderAdminNotifications();
        adminToast("Moved to Trash. Open the Trash tab to restore or delete it permanently.");
        return;
    }

    const restore = e.target.closest("[data-notif-restore]");

    if (restore) {
        saveJSON("admin_trash_ids", adminTrashIds().filter(x => x !== String(restore.dataset.notifRestore)));
        renderAdminNotifications();
        adminToast("Notification restored.");
        return;
    }

    const purge = e.target.closest("[data-notif-purge]");

    if (purge) {
        if (!await adminConfirm({
            tone: "danger",
            title: "Delete notification?",
            message: "This permanently deletes the notification and cannot be undone.",
            confirmText: "Delete permanently"
        })) return;
        purgeAdminNotes([purge.dataset.notifPurge]);
        adminToast("Notification permanently deleted.");
        return;
    }

    // clicking an unread message reads it
    const card = e.target.closest(".admin-notification.unread");
    if (card && !e.target.closest(".notif-actions")) markAdminNoteRead(card.dataset.nid);
});

A("adminDeleteArchived").onclick = async () => {
    const {archived} = adminNoteBuckets();
    if (!archived.length) return;
    if (!await adminConfirm({
        tone: "warning",
        title: "Move archived to Trash?",
        message: `${archived.length} archived notification(s) will move to Trash. You can restore them from the Trash tab.`,
        confirmText: "Move to Trash"
    })) return;

    const ids = archived.map(n => String(n.NotificationID));
    saveJSON("admin_trash_ids", [...new Set([...adminTrashIds(), ...ids])]);
    renderAdminNotifications();
    adminToast("Moved to Trash. You can restore them from the Trash tab.");
};

A("adminEmptyTrash").onclick = async () => {
    const {trash} = adminNoteBuckets();
    if (!trash.length) return;
    if (!await adminConfirm({
        tone: "danger",
        title: "Empty Trash?",
        message: `Permanently delete ${trash.length} notification(s)? This cannot be undone.`,
        confirmText: "Delete permanently"
    })) return;
    purgeAdminNotes(trash.map(n => String(n.NotificationID)));
    adminToast("Trash emptied.");
};

A("adminMarkRead").onclick = async () => {
    try {
        await adminPost("markNotificationsRead");
    } catch(error) { /* still mark here */ }

    const {inbox} = adminNoteBuckets();
    const ids = inbox.map(n => String(n.NotificationID));
    saveJSON("admin_read_ids", [...new Set([...adminReadIds(), ...ids])]);
    saveJSON("admin_unread_ids", adminUnreadIds().filter(x => !ids.includes(x)));
    renderAdminNotifications();
    adminToast("Notifications marked as read.");
};

/* AUTO REFRESH: keep rooms, instructors, reservations and notifications up to date */

const ADMIN_REFRESH_MS = 30000;
let adminRefreshing = false;

async function adminAutoRefresh() {
    if (adminRefreshing || document.hidden || !adminToken) return;
    if (A("adminApp").classList.contains("hidden")) return;
    if (document.querySelector(".admin-modal:not(.hidden)")) return;   // don't disturb an open form

    adminRefreshing = true;
    const before = adminUnreadCount();

    try {
        await adminLoadAll({ silent: true });
        if (adminUnreadCount() > before) adminToast("You have a new notification.");
    } finally {
        adminRefreshing = false;
    }
}

setInterval(adminAutoRefresh, ADMIN_REFRESH_MS);
document.addEventListener("visibilitychange", () => { if (!document.hidden) adminAutoRefresh(); });
window.addEventListener("online", adminAutoRefresh);

/* REPORTS & FEEDBACK FROM INSTRUCTORS */

let adminFeedback = [];
let adminFeedbackView = "All";
let pendingFeedbackDelete = "";

function normFeedback(f) {
    const pick = (...keys) => keys.map(k => f[k]).find(v => v !== undefined && v !== null);
    return {
        FeedbackID: pick("FeedbackID", "feedbackID", "id"),
        CreatedAt: pick("CreatedAt", "createdAt") || "",
        InstructorName: pick("InstructorName", "instructorName") || "Instructor",
        InstructorEmail: pick("InstructorEmail", "instructorEmail", "Email") || "",
        Type: pick("Type", "type") || "Feedback",
        RoomName: pick("RoomName", "roomName") || "",
        Title: pick("Title", "title") || "",
        Message: pick("Message", "message") || "",
        Status: pick("Status", "status") || "New",
        AdminReply: pick("AdminReply", "adminReply", "Reply", "reply") || ""
    };
}

function renderAdminFeedback() {
    const box = A("adminFeedbackList");
    if (!box) return;

    const newCount = adminFeedback.filter(f => f.Status === "New").length;
    A("adminFeedbackCount").textContent = newCount;
    A("adminFeedbackCount").classList.toggle("hidden", newCount === 0);

    // keep half-written replies when the list redraws
    const drafts = {};
    box.querySelectorAll("textarea[data-fb-reply]").forEach(t => { drafts[t.dataset.fbReply] = t.value; });

    const list = adminFeedback
        .filter(f => adminFeedbackView === "All" || f.Status === adminFeedbackView)
        .sort((a, b) => String(b.CreatedAt).localeCompare(String(a.CreatedAt)));

    box.innerHTML = list.map(f => {
        const id = adminEscape(f.FeedbackID);
        const cls = f.Status === "Resolved" ? "resolved" : f.Status === "Reviewed" ? "reviewed" : "new";
        return `
        <div class="fb-card ${f.Status === "New" ? "unread" : ""}">
            <div class="fb-top">
                <strong>${adminEscape(f.Title)}</strong>
                <span class="fb-status ${cls}">${adminEscape(f.Status)}</span>
            </div>
            <small>
                ${adminEscape(f.Type)} &middot; ${adminEscape(f.InstructorName)}${f.InstructorEmail ? " (" + adminEscape(f.InstructorEmail) + ")" : ""}
                ${f.RoomName ? " &middot; " + adminEscape(f.RoomName) : ""}
                ${f.CreatedAt ? " &middot; " + adminEscape(new Date(f.CreatedAt).toLocaleString()) : ""}
            </small>
            <p>${adminEscape(f.Message)}</p>
            <textarea rows="2" data-fb-reply="${id}" placeholder="Write a reply to the instructor (optional)...">${adminEscape(drafts[f.FeedbackID] ?? f.AdminReply)}</textarea>
            <div class="fb-actions">
                ${f.Status === "New" ? `<button class="small-btn" data-fb-set="Reviewed" data-fb-id="${id}">Mark Reviewed</button>` : ""}
                ${f.Status !== "Resolved" ? `<button class="small-btn" data-fb-set="Resolved" data-fb-id="${id}">Resolve</button>` : ""}
                <button class="small-btn" data-fb-set="${adminEscape(f.Status)}" data-fb-id="${id}">Save Reply</button>
                <button class="small-btn danger" data-fb-delete="${id}">Delete</button>
            </div>
        </div>`;
    }).join("") || `<div class="admin-table-card" style="padding:18px">No ${adminFeedbackView === "All" ? "" : adminEscape(adminFeedbackView.toLowerCase()) + " "}reports or feedback.</div>`;
}

async function loadAdminFeedback(opts = {}) {
    try {
        const result = await adminGet("getAllFeedback");
        adminFeedback = (result.feedback || []).map(normFeedback);
        renderAdminFeedback();
    } catch (error) {
        if (/unknown action/i.test(error.message)) {
            if (!opts.silent) A("adminFeedbackList").innerHTML =
                `<div class="admin-table-card" style="padding:18px">Feedback is not enabled on the server yet.</div>`;
        } else if (!opts.silent) {
            adminToast(error.message, true);
        }
    }
}

document.addEventListener("click", async e => {
    const tab = e.target.closest("[data-fb-view]");
    if (tab) {
        adminFeedbackView = tab.dataset.fbView;
        document.querySelectorAll("[data-fb-view]").forEach(b => b.classList.toggle("active", b === tab));
        renderAdminFeedback();
        return;
    }

    const del = e.target.closest("[data-fb-delete]");
    if (del) {
        const item = adminFeedback.find(f => String(f.FeedbackID) === del.dataset.fbDelete);
        pendingFeedbackDelete = del.dataset.fbDelete;
        A("deleteFeedbackName").textContent = item ? `"${item.Title}"` : "this report";
        A("deleteFeedbackModal").classList.remove("hidden");
        return;
    }

    const btn = e.target.closest("[data-fb-set]");
    if (!btn) return;

    const id = btn.dataset.fbId;
    const reply = (document.querySelector(`textarea[data-fb-reply="${CSS.escape(id)}"]`)?.value || "").trim();
    btn.disabled = true;

    try {
        await adminPost("updateFeedback", {
            feedbackID: id,
            status: btn.dataset.fbSet,
            reply
        });
        adminToast("Saved.");
        await loadAdminFeedback();
    } catch (error) {
        adminToast(error.message, true);
        btn.disabled = false;
    }
});

function closeDeleteFeedbackModal() {
    A("deleteFeedbackModal").classList.add("hidden");
    pendingFeedbackDelete = "";
}

A("closeDeleteFeedback").onclick = closeDeleteFeedbackModal;
A("cancelDeleteFeedback").onclick = closeDeleteFeedbackModal;

A("confirmDeleteFeedback").onclick = async () => {
    if (!pendingFeedbackDelete) return;
    const btn = A("confirmDeleteFeedback");
    btn.disabled = true;

    try {
        await adminPost("deleteFeedback", {feedbackID: pendingFeedbackDelete});
        closeDeleteFeedbackModal();
        adminToast("Deleted.");
        await loadAdminFeedback();
    } catch (error) {
        adminToast(error.message, true);
    } finally {
        btn.disabled = false;
    }
};

/* REPORTS */

function reportRange() {
    const mode = A("reportPeriod").value;
    const now = new Date();
    const y = now.getFullYear(), m = now.getMonth();
    const iso = d => `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
    const monthName = d => d.toLocaleString("en-US", {month: "long", year: "numeric"});

    if (mode === "month")
        return {from: iso(new Date(y, m, 1)), to: iso(new Date(y, m + 1, 0)), label: monthName(new Date(y, m, 1))};
    if (mode === "lastmonth")
        return {from: iso(new Date(y, m - 1, 1)), to: iso(new Date(y, m, 0)), label: monthName(new Date(y, m - 1, 1))};
    if (mode === "30days")
        return {from: iso(new Date(y, m, now.getDate() - 30)), to: localToday(), label: "the last 30 days"};
    if (mode === "year")
        return {from: `${y}-01-01`, to: `${y}-12-31`, label: String(y)};
    return {from: "", to: "", label: "all time"};
}

function minutesOf(t) {
    const [h, m] = String(t || "").split(":").map(Number);
    return (h || 0) * 60 + (m || 0);
}

function hoursText(mins) {
    const h = mins / 60;
    return (Number.isInteger(h) ? String(h) : h.toFixed(1)) + " h";
}

const plural = (n, word) => `${n} ${word}${n === 1 ? "" : "s"}`;

function loadReports() {
    const range = reportRange();

    const list = adminReservations.filter(r =>
        (!range.from || r.Date >= range.from) && (!range.to || r.Date <= range.to)
    );

    const kind = r => r.Status === "Cancelled" ? "cancelled" : adminIsDone(r) ? "completed" : "upcoming";

    const total = list.length;
    const count = {completed: 0, upcoming: 0, cancelled: 0};
    list.forEach(r => count[kind(r)]++);
    const used = count.completed + count.upcoming;

    A("reportPeriodLabel").textContent = range.label === "all time"
        ? "Showing all reservations on record."
        : `Showing reservations from ${range.label}.`;

    A("reportTotal").textContent = total;
    A("reportUpcoming").textContent = count.upcoming;
    A("reportCompleted").textContent = count.completed;
    A("reportCancelled").textContent = count.cancelled;

    // ----- per classroom
    const rooms = new Map();
    adminRooms.forEach(r => rooms.set(r.RoomID, {
        name: r.RoomName, building: r.Building, active: r.Status === "Active",
        completed: 0, upcoming: 0, cancelled: 0, mins: 0
    }));

    list.forEach(r => {
        if (!rooms.has(r.RoomID)) rooms.set(r.RoomID, {
            name: r.RoomName, building: "", active: false,
            completed: 0, upcoming: 0, cancelled: 0, mins: 0
        });
        const row = rooms.get(r.RoomID);
        const k = kind(r);
        row[k]++;
        if (k !== "cancelled") row.mins += Math.max(0, minutesOf(r.EndTime) - minutesOf(r.StartTime));
    });

    const roomRows = [...rooms.values()]
        .sort((a, b) => (b.completed + b.upcoming) - (a.completed + a.upcoming) || a.name.localeCompare(b.name));

    A("roomUsageReport").innerHTML = roomRows.map(r => {
        const n = r.completed + r.upcoming;
        const pct = used ? Math.round(n / used * 100) : 0;
        return `
            <tr>
                <td><strong>${adminEscape(r.name)}</strong></td>
                <td>${adminEscape(r.building)}</td>
                <td>${r.completed}</td>
                <td>${r.upcoming}</td>
                <td>${r.cancelled}</td>
                <td>${n ? hoursText(r.mins) : "-"}</td>
                <td>
                    <div class="usage-cell">
                        <div class="usage-bar"><span style="width:${pct}%"></span></div>
                        <span class="usage-pct">${pct}%</span>
                    </div>
                </td>
            </tr>`;
    }).join("") || `<tr><td colspan="7">No classrooms to report on.</td></tr>`;

    // ----- per month
    const months = {};
    list.forEach(r => {
        const key = String(r.Date || "").slice(0, 7);
        if (!key) return;
        months[key] = months[key] || {completed: 0, upcoming: 0, cancelled: 0};
        months[key][kind(r)]++;
    });

    const monthRows = Object.entries(months).sort((a, b) => a[0].localeCompare(b[0]));
    const maxMonth = Math.max(1, ...monthRows.map(([, v]) => v.completed + v.upcoming + v.cancelled));
    const monthLabel = key => {
        const [yy, mm] = key.split("-").map(Number);
        return new Date(yy, mm - 1, 1).toLocaleString("en-US", {month: "long", year: "numeric"});
    };

    A("monthlyReport").innerHTML = monthRows.map(([key, v]) => {
        const t = v.completed + v.upcoming + v.cancelled;
        return `
            <tr>
                <td><strong>${adminEscape(monthLabel(key))}</strong></td>
                <td>${v.completed}</td>
                <td>${v.upcoming}</td>
                <td>${v.cancelled}</td>
                <td><strong>${t}</strong></td>
                <td>
                    <div class="usage-cell">
                        <div class="usage-bar"><span style="width:${Math.round(t / maxMonth * 100)}%"></span></div>
                    </div>
                </td>
            </tr>`;
    }).join("") || `<tr><td colspan="6">No reservations in this period.</td></tr>`;

    // ----- key findings in plain language
    const findings = [];

    if (!total) {
        findings.push("There are no reservations in this period yet.");
    } else {
        const top = roomRows[0];
        if (top && top.completed + top.upcoming > 0) {
            const n = top.completed + top.upcoming;
            findings.push(`<strong>Most used classroom:</strong> ${adminEscape(top.name)} with ${plural(n, "booking")} (${Math.round(n / used * 100)}% of all bookings, ${hoursText(top.mins)} in total).`);
        }

        const idle = roomRows.filter(r => r.active && r.completed + r.upcoming === 0).map(r => r.name);
        findings.push(idle.length
            ? `<strong>Not booked at all:</strong> ${adminEscape(idle.join(", "))}. These classrooms could be promoted or reviewed.`
            : `<strong>Every active classroom</strong> was booked at least once in this period.`);

        if (monthRows.length) {
            const [bKey, bVal] = monthRows.reduce((a, b) =>
                (b[1].completed + b[1].upcoming + b[1].cancelled) > (a[1].completed + a[1].upcoming + a[1].cancelled) ? b : a);
            findings.push(`<strong>Busiest month:</strong> ${adminEscape(monthLabel(bKey))} with ${plural(bVal.completed + bVal.upcoming + bVal.cancelled, "reservation")}.`);
        }

        const people = {};
        list.filter(r => r.Status !== "Cancelled").forEach(r => {
            const name = r.InstructorName || "Unknown";
            people[name] = (people[name] || 0) + 1;
        });
        const topPerson = Object.entries(people).sort((a, b) => b[1] - a[1])[0];
        if (topPerson) findings.push(`<strong>Most active instructor:</strong> ${adminEscape(topPerson[0])} with ${plural(topPerson[1], "booking")}.`);

        const rate = Math.round(count.cancelled / total * 100);
        findings.push(`<strong>Cancellation rate:</strong> ${rate}% (${count.cancelled} of ${plural(total, "reservation")} were cancelled).` +
            (rate >= 25 ? " This is fairly high and may be worth looking into." : ""));
    }

    A("reportHighlights").innerHTML = findings.map(f => `<li>${f}</li>`).join("");
}

A("reportPeriod").addEventListener("change", loadReports);

A("printReport").onclick = () => {
    adminNavigate("reports");
    window.print();
};

/* INITIALIZE */

(function() {
    A("adminCalendarDate").value = localToday();

    const savedEmail = localStorage.getItem("admin_email");
    if (savedEmail) A("adminEmail").value = savedEmail;
    A("rememberMe").checked = localStorage.getItem("admin_remember_off") !== "1";

    if (adminToken) {
        adminShowApp();
    } else {
        adminShowLogin();
    }
})();
