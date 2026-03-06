# leayanhuili.github.io

Personal site for Lea Yanhui Li — AI Systems Architect.

**Live:** https://lea82.github.io/leayanhuili.github.io/

---

## About

Minimalist personal website built with plain HTML, CSS, and vanilla JavaScript.
No frameworks. No dependencies. Fully compatible with GitHub Pages.

**Features:**
- Dark mode toggle (persists via localStorage, respects OS preference)
- Scroll-reveal animations
- Live GitHub repository cards via GitHub API
- Architecture diagrams on project cards
- Active AI Experiments log
- Fully responsive — mobile, tablet, desktop

---

## Structure

```
leayanhuili.github.io/
  index.html          Home page
  about.html          Bio and background
  projects.html       Projects + live GitHub repos
  experiments.html    Experiment log + AI skills table
  writing.html        Essays and notes
  assets/
    style.css         All styles (CSS variables for light/dark theming)
    site.js           Dark mode · scroll reveal · GitHub API · mobile nav
    profile.jpg       Profile photo (add your own)
    resume.pdf        Resume (add your own)
  projects/
    llm-evaluation.md
    ai-guardrails.md
    ai-workflow.md
  README.md
```

---

## Local Development

```bash
# From the repo root
python -m http.server 8000
# Open http://localhost:8000
```

---

## Deployment

```bash
# Push updates
git add .
git commit -m "Update: [describe change]"
git push
```

GitHub Pages rebuilds automatically within ~60 seconds after each push.

**GitHub Pages settings:**
- Repo: `https://github.com/lea82/leayanhuili.github.io`
- Settings → Pages → Source: `main` branch, `/ (root)` folder
- Live URL: `https://lea82.github.io/leayanhuili.github.io/`

---

## How to add a project

1. Add a `<div class="project-card">` block to `projects.html`
2. Include the architecture diagram, tech stack, and GitHub link
3. Drop a markdown file in `projects/your-project.md`
4. Optionally add a card to the home page `index.html`

**Link back from your GitHub repo README:**
```markdown
→ [Project details](https://lea82.github.io/leayanhuili.github.io/projects.html#your-project-id)
```

---

## How to add an experiment

In `experiments.html`, add an `<div class="exp-entry">` block:

```html
<div class="exp-entry reveal">
  <div class="exp-num"><span class="num-big">04</span>EXP</div>
  <div class="exp-body">
    <span class="exp-status active" style="...">Active</span>
    <h3>Experiment Name</h3>
    <p>Description...</p>
    <div class="exp-meta-row">
      <div class="exp-meta-item"><strong>Tools:</strong> Python · Claude API</div>
    </div>
    <div class="result-box"><p><strong>Results:</strong> ...</p></div>
    <div class="tech-stack"><span class="tech-tag">Python</span></div>
    <a class="btn" href="https://github.com/lea82/your-repo">GitHub Repo ↗</a>
  </div>
</div>
```

---

## How to publish an AI skill

1. Create a repo: `github.com/lea82/skill-{name}`
2. Structure:
   ```
   skill-{name}/
     SKILL.md        Description, parameters, examples
     skill.py        Implementation
     tests/
     README.md
   ```
3. Add a row to the skills table in `experiments.html`
4. Update status from `Planned` → `In dev` → `Published`

---

## Customization

| What | Where |
|------|-------|
| Colors / dark mode palette | CSS `:root` and `[data-theme="dark"]` in `style.css` |
| Profile photo | Replace placeholder div in `about.html` with `<img src="assets/profile.jpg">` |
| Resume | Add PDF as `assets/resume.pdf` |
| GitHub username | Change `lea82` in `site.js` GitHub API fetch |
| Email / LinkedIn | Find-replace across all HTML files |
