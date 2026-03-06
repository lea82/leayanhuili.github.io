/* ── site.js — vanilla JS, no dependencies ── */

/* ── Dark mode ───────────────────────────────────── */
(function () {
  const root = document.documentElement;
  const key  = 'theme';

  function applyTheme(t) {
    root.setAttribute('data-theme', t);
    localStorage.setItem(key, t);
  }

  // On load: restore preference or auto-detect
  const saved = localStorage.getItem(key);
  if (saved) {
    applyTheme(saved);
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    applyTheme('dark');
  }

  // Toggle button
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.dark-toggle').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const current = root.getAttribute('data-theme') || 'light';
        applyTheme(current === 'dark' ? 'light' : 'dark');
      });
    });
  });
})();

/* ── Scroll reveal ───────────────────────────────── */
document.addEventListener('DOMContentLoaded', function () {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  els.forEach(function (el, i) {
    el.style.transitionDelay = (i * 0.06) + 's';
    observer.observe(el);
  });
});

/* ── Mobile nav ──────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', function () {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });

  // Close on link click
  links.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      links.classList.remove('open');
    });
  });
});

/* ── GitHub repos ────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function () {
  const grid = document.getElementById('github-repos');
  if (!grid) return;

  // Skeleton placeholders
  grid.innerHTML = Array(6).fill(0).map(function () {
    return '<div class="repo-skeleton"><div class="skel-line short"></div><div class="skel-line long"></div><div class="skel-line med"></div></div>';
  }).join('');

  fetch('https://api.github.com/users/lea82/repos?sort=updated&per_page=6', {
    headers: { 'Accept': 'application/vnd.github.v3+json' }
  })
    .then(function (r) {
      if (!r.ok) throw new Error('GitHub API ' + r.status);
      return r.json();
    })
    .then(function (repos) {
      if (!repos.length) {
        grid.innerHTML = '<p class="repo-error">No public repositories found.</p>';
        return;
      }

      grid.innerHTML = repos.slice(0, 6).map(function (repo) {
        var desc  = repo.description ? escHtml(repo.description) : '<span style="color:var(--muted);font-style:italic;">No description</span>';
        var stars = repo.stargazers_count || 0;
        var lang  = repo.language ? '<span>◆ ' + escHtml(repo.language) + '</span>' : '';
        var updated = timeAgo(repo.updated_at);
        return (
          '<a class="repo-card" href="' + escHtml(repo.html_url) + '" target="_blank" rel="noopener">' +
            '<div class="repo-name">⬡ ' + escHtml(repo.name) + '</div>' +
            '<div class="repo-desc">' + desc + '</div>' +
            '<div class="repo-meta">' +
              (stars > 0 ? '<span>★ ' + stars + '</span>' : '') +
              lang +
              '<span>↻ ' + updated + '</span>' +
            '</div>' +
          '</a>'
        );
      }).join('');
    })
    .catch(function (err) {
      console.warn('GitHub API error:', err);
      grid.innerHTML =
        '<p class="repo-error">' +
          'Could not load repositories. ' +
          '<a href="https://github.com/lea82" target="_blank" rel="noopener">View on GitHub →</a>' +
        '</p>';
    });
});

/* ── Utilities ───────────────────────────────────── */
function escHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function timeAgo(iso) {
  var diff = Date.now() - new Date(iso).getTime();
  var mins = Math.floor(diff / 60000);
  if (mins < 60)   return mins + 'm ago';
  var hrs = Math.floor(mins / 60);
  if (hrs  < 24)   return hrs + 'h ago';
  var days = Math.floor(hrs / 24);
  if (days < 30)   return days + 'd ago';
  var mos = Math.floor(days / 30);
  if (mos  < 12)   return mos + 'mo ago';
  return Math.floor(mos / 12) + 'y ago';
}
