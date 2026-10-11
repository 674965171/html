/* ==========================================================================
   nav.js — 导航页交互
   渲染 · 搜索 · 状态筛选 · 行业索引 · 滚动定位 · 轻提示
   ========================================================================== */
(function () {
  'use strict';

  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  /* ---------------- 缩略图（纯 CSS 抽象稿，不依赖图片） ---------------- */
  const THUMBS = {
    hero: () => `
      <div class="b b--a2" style="height:40%;border-radius:5px;display:flex;flex-direction:column;justify-content:center;gap:5px;padding:0 9px">
        <div class="ln" style="width:52%;height:5px;background:color-mix(in srgb,var(--a) 65%,#fff)"></div>
        <div class="ln" style="width:34%"></div>
      </div>
      <div class="row3" style="flex:1">
        <div class="b b--tall"></div><div class="b b--tall"></div><div class="b b--tall"></div>
      </div>`,
    split: () => `
      <div class="spl">
        <div style="display:flex;flex-direction:column;gap:6px;justify-content:center">
          <div class="ln" style="width:80%;height:5px;background:color-mix(in srgb,var(--a) 60%,#fff)"></div>
          <div class="ln" style="width:95%"></div>
          <div class="ln" style="width:66%"></div>
          <div class="b b--a" style="width:38px;height:11px;border-radius:3px;margin-top:2px"></div>
        </div>
        <div class="b b--a2" style="border-radius:5px"></div>
      </div>`,
    grid: () => `
      <div class="row2" style="height:36%"><div class="b b--a2"></div><div class="b"></div></div>
      <div class="row3" style="flex:1">
        <div class="b b--tall"></div><div class="b b--tall"></div><div class="b b--tall"></div>
      </div>`,
    list: () => [0, 1, 2].map(i => `
      <div style="display:flex;gap:6px;flex:1;align-items:center">
        <div class="b b--a2" style="width:34%;height:100%;border-radius:4px"></div>
        <div style="flex:1;display:flex;flex-direction:column;gap:4px">
          <div class="ln" style="width:${88 - i * 14}%;height:4.5px;background:color-mix(in srgb,var(--a) 45%,#fff)"></div>
          <div class="ln" style="width:58%"></div>
        </div>
      </div>`).join(''),
    app: () => `
      <div style="flex:1;display:grid;place-items:center">
        <div style="width:40%;height:100%;border-radius:7px;background:#fff;box-shadow:0 0 0 1px #e8ecf1;display:grid;grid-template-columns:1fr 1fr;gap:4px;padding:6px">
          <div class="b b--a2" style="border-radius:4px"></div><div class="b b--a2" style="border-radius:4px"></div>
          <div class="b b--a2" style="border-radius:4px"></div><div class="b b--a2" style="border-radius:4px"></div>
        </div>
      </div>`,
    profile: () => `
      <div style="display:flex;gap:8px;align-items:center">
        <div style="width:26px;height:26px;border-radius:50%;background:color-mix(in srgb,var(--a) 55%,#fff)"></div>
        <div style="flex:1;display:flex;flex-direction:column;gap:4px">
          <div class="ln" style="width:46%;height:5px;background:color-mix(in srgb,var(--a) 60%,#fff)"></div>
          <div class="ln" style="width:70%"></div>
        </div>
      </div>
      <div class="row3" style="flex:1">
        <div class="b b--tall"></div><div class="b b--tall"></div><div class="b b--tall"></div>
      </div>`,
  };

  /* ---------------- 卡片 ---------------- */
  function card(site) {
    const ind  = INDUSTRY_MAP[site.industry] || { name: site.industry, glyph: '·' };
    const live = site.status === 'live';
    const tag  = live ? 'a' : 'div';
    const attr = live
      ? `href="sites/${site.slug}/index.html" target="_blank" rel="noopener"`
      : `role="button" tabindex="0" data-planned="${site.title}"`;

    return `
    <${tag} class="site ${live ? 'is-clickable' : 'is-planned'} rise"
        style="--a:${site.accent}" ${attr}
        data-search="${[site.title, site.desc, site.type, ind.name, ...(site.tags || [])].join(' ').toLowerCase()}"
        data-status="${site.status}">
      <div class="thumb">
        <div class="thumb__frame">
          <div class="tf-bar"><i></i><i></i><i></i></div>
          <div class="tf-body">${(THUMBS[site.layout] || THUMBS.hero)()}</div>
        </div>
      </div>
      <div class="site__body">
        <div class="site__meta">
          <span class="site__ind"><span>${ind.glyph}</span>${ind.name}</span>
          <span class="site__type">${site.type}</span>
        </div>
        <h3 class="site__title">${site.title}</h3>
        <p class="site__desc">${site.desc}</p>
        <div class="site__foot">
          ${live
            ? `<span class="site__status is-live"><i class="dot dot--live"></i>已上线</span>
               <span class="site__go">打开页面
                 <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="width:12px;height:12px"><path d="M5 11l6-6M6 5h5v5"/></svg>
               </span>`
            : `<span class="site__status"><i class="dot dot--plan"></i>规划中</span>
               <span class="site__soon">待设计</span>`}
        </div>
      </div>
    </${tag}>`;
  }

  /* ---------------- 渲染 ---------------- */
  const main = $('#sections');
  const side = $('#sideList');

  function renderSections() {
    main.insertAdjacentHTML('beforeend', INDUSTRIES.map(ind => {
      const list = SITES.filter(s => s.industry === ind.id);
      if (!list.length) return '';
      return `
      <section class="section" id="sec-${ind.id}" data-ind="${ind.id}">
        <div class="section__head">
          <span class="section__glyph">${ind.glyph}</span>
          <h2 class="section__title">${ind.name}</h2>
          <span class="section__note">${ind.note}</span>
          <span class="section__meta">${list.length} 个页面</span>
        </div>
        <div class="grid">${list.map(card).join('')}</div>
      </section>`;
    }).join(''));
  }

  function renderSide() {
    side.innerHTML = INDUSTRIES.map(ind => {
      const n = SITES.filter(s => s.industry === ind.id).length;
      if (!n) return '';
      return `<button class="side__item" data-goto="sec-${ind.id}" style="--tint:${ind.tint}">
        <span class="side__glyph">${ind.glyph}</span>
        <span class="side__name">${ind.name}</span>
        <span class="side__count">${n}</span>
      </button>`;
    }).join('');
  }

  function renderStats() {
    const live = SITES.filter(s => s.status === 'live').length;
    const set = (id, v) => { const el = $(id); if (el) el.textContent = v; };
    set('#stInd', INDUSTRIES.length);
    set('#stAll', SITES.length);
    set('#stLive', live);
    set('#stPlan', SITES.length - live);
  }

  /* ---------------- 筛选 ---------------- */
  const state = { q: '', status: 'all' };

  function applyFilter() {
    const q = state.q.trim().toLowerCase();
    let total = 0;

    $$('.section').forEach(sec => {
      let shown = 0;
      $$('.site', sec).forEach(c => {
        const okQ = !q || c.dataset.search.includes(q);
        const okS = state.status === 'all' || c.dataset.status === state.status;
        const on = okQ && okS;
        c.classList.toggle('hidden', !on);
        if (on) shown++;
      });
      sec.classList.toggle('hidden', shown === 0);
      total += shown;
    });

    $('#empty').classList.toggle('is-on', total === 0);
    $('#side').classList.toggle('hidden', !!q || state.status !== 'all');
  }

  /* ---------------- 滚动定位 ---------------- */
  function spy() {
    const secs = $$('.section:not(.hidden)');
    if (!secs.length) return;
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        $$('.side__item').forEach(b => b.classList.toggle('is-on', b.dataset.goto === e.target.id));
      });
    }, { rootMargin: '-20% 0px -70% 0px', threshold: 0 });
    secs.forEach(s => io.observe(s));
  }

  /* ---------------- 轻提示 ---------------- */
  let toastTimer;
  function toast(msg) {
    const t = $('#toast');
    t.textContent = msg;
    t.classList.add('is-on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('is-on'), 2000);
  }

  /* ---------------- 事件 ---------------- */
  function bind() {
    // 搜索
    const input = $('#q');
    input.addEventListener('input', () => { state.q = input.value; applyFilter(); });

    // 状态切换
    $$('.seg__btn').forEach(b => b.addEventListener('click', () => {
      $$('.seg__btn').forEach(x => x.classList.toggle('is-on', x === b));
      state.status = b.dataset.status;
      applyFilter();
    }));

    // 行业索引
    side.addEventListener('click', e => {
      const b = e.target.closest('.side__item');
      if (!b) return;
      const el = document.getElementById(b.dataset.goto);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    // 规划中卡片
    document.addEventListener('click', e => {
      const p = e.target.closest('[data-planned]');
      if (p) toast(`「${p.dataset.planned}」正在设计中，敬请期待`);
    });
    document.addEventListener('keydown', e => {
      if (e.key !== 'Enter') return;
      const p = e.target.closest('[data-planned]');
      if (p) toast(`「${p.dataset.planned}」正在设计中，敬请期待`);
    });

    // 快捷键：/ 聚焦搜索，Esc 清空
    document.addEventListener('keydown', e => {
      if (e.key === '/' && document.activeElement !== input) { e.preventDefault(); input.focus(); }
      if (e.key === 'Escape' && document.activeElement === input) {
        input.value = ''; state.q = ''; applyFilter(); input.blur();
      }
    });

    // 回到顶部
    const top = $('#totop');
    window.addEventListener('scroll', () => top.classList.toggle('is-on', window.scrollY > 700), { passive: true });
    top.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // 年份
    $('#year').textContent = new Date().getFullYear();
  }

  /* ---------------- 启动 ---------------- */
  renderSide();
  renderSections();
  renderStats();
  bind();
  spy();
})();
