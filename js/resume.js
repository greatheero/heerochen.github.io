// Renders content/resume.md into #resume-root. Format spec: content/RESUME_FORMAT.md
(function () {
  const C = {
    section: 'grid grid-cols-1 md:grid-cols-3 gap-8 py-12',
    h2: 'text-2xl font-bold',
    body: 'md:col-span-2',
    p: 'text-[14.5px] leading-relaxed c-ink',
    pill: 'text-[13px] border b-subtle rounded-full px-3 py-1',
    entry: 'grid grid-cols-1 sm:grid-cols-4 gap-2',
    dates: 'text-sm c-muted',
    h3: 'font-bold text-lg',
    org: 'text-sm c-muted',
    note: 'text-[13px] c-muted mt-2',
  };

  const inline = (s) => marked.parseInline(s);
  const bold = (html, cls) => html.replace(/<strong>/g, `<span class="${cls}">`).replace(/<\/strong>/g, '</span>');

  function titleHtml(t) {
    const words = t.trim().split(/\s+/);
    let cut = 1;
    if (words[1] === '&') cut = 2;
    const esc = (w) => w.join(' ').replace(/&/g, '&amp;');
    return words.length <= cut ? esc(words) : `${esc(words.slice(0, cut))}<br />${esc(words.slice(cut))}`;
  }

  function itemParts(item) {
    const text = item.tokens.find((t) => t.type === 'text' || t.type === 'paragraph');
    const sub = item.tokens.find((t) => t.type === 'list');
    return { text: text ? text.text : item.text, sub: sub ? sub.items : [] };
  }

  function renderBullets(list) {
    const nested = list.items.some((i) => itemParts(i).sub.length);
    const ulCls = nested ? 'mt-3 space-y-3' : 'mt-2 space-y-1.5';
    const lis = list.items.map((i) => {
      const { text, sub } = itemParts(i);
      const extra = sub.map((s) => `<br />${bold(inline(itemParts(s).text), 'font-semibold')}`).join('');
      return `<li>${bold(inline(text), 'font-bold')}${extra}</li>`;
    });
    return `<ul class="list-disc pl-5 ${ulCls} ${C.p}">${lis.join('')}</ul>`;
  }

  function renderEntry(e) {
    let dates = '', org = '';
    if (e.meta) {
      const k = e.meta.indexOf('|');
      dates = (k < 0 ? e.meta : e.meta.slice(0, k)).split(';').map((d) => d.trim()).join('<br />');
      org = k < 0 ? '' : e.meta.slice(k + 1).trim();
    }
    const hasList = e.parts.some((p) => p.type === 'list');
    let inner = `<h3 class="${C.h3}">${inline(e.title)}</h3>`;
    if (org) inner += `<p class="${C.org}">${inline(org)}</p>`;
    for (const p of e.parts) {
      if (p.type === 'list') inner += renderBullets(p);
      else if (p.type === 'paragraph') {
        const raw = p.raw.trim();
        const isNote = /^\*[^*].*\*$/s.test(raw) || /^_[^_].*_$/s.test(raw);
        inner += isNote
          ? `<p class="${C.note}">${inline(raw.slice(1, -1))}</p>`
          : `<p class="${C.p} ${hasList ? 'mt-2' : 'mt-1'}">${inline(p.text)}</p>`;
      }
    }
    return `<div class="${C.entry}"><span class="${C.dates}">${dates}</span><div class="sm:col-span-3">${inner}</div></div>`;
  }

  function renderBlocks(s) {
    if (s.entries.length) {
      const sp = s.entries.some((e) => e.parts.some((p) => p.type === 'list')) ? 'space-y-8' : 'space-y-6';
      return `<div class="${C.body} ${sp}">${s.entries.map(renderEntry).join('')}</div>`;
    }
    const out = [];
    for (const b of s.blocks) {
      if (b.type === 'paragraph') out.push(`<p class="${C.p}">${inline(b.text)}</p>`);
      else if (b.type === 'list') {
        const labelled = b.items.every((i) => /^\*\*[^*]+:\*\*/.test(i.text));
        if (labelled) {
          out.push(`<div class="space-y-4 ${C.p}">${b.items.map((i) => `<p>${bold(inline(i.text), 'font-bold')}</p>`).join('')}</div>`);
        } else {
          out.push(`<div class="flex flex-wrap gap-2 content-start">${b.items.map((i) => `<span class="${C.pill}">${inline(i.text)}</span>`).join('')}</div>`);
        }
      }
    }
    return `<div class="${C.body}">${out.join('')}</div>`;
  }

  function parse(md) {
    const doc = { subtitle: '', sections: [] };
    let sec = null, entry = null;
    for (const t of marked.lexer(md)) {
      if (t.type === 'space' || t.type === 'hr') continue;
      if (t.type === 'html' && /^\s*<!--/.test(t.raw)) continue;
      if (t.type === 'heading' && t.depth === 1) continue;
      if (t.type === 'heading' && t.depth === 2) { sec = { title: t.text, blocks: [], entries: [] }; entry = null; doc.sections.push(sec); }
      else if (t.type === 'heading' && t.depth === 3 && sec) { entry = { title: t.text, meta: '', parts: [] }; sec.entries.push(entry); }
      else if (t.type === 'blockquote' && entry) entry.meta = t.text.trim();
      else if (entry) entry.parts.push(t);
      else if (sec) sec.blocks.push(t);
      else if (t.type === 'paragraph') doc.subtitle = t.text;
    }
    return doc;
  }

  function render(doc) {
    const last = doc.sections.length - 1;
    return doc.sections.map((s, i) =>
      `<div class="${C.section}${i < last ? ' border-b b-subtle' : ''}"><h2 class="${C.h2}">${titleHtml(s.title)}</h2>${renderBlocks(s)}</div>`
    ).join('');
  }

  fetch('content/resume.md', { cache: 'no-cache' })
    .then((r) => { if (!r.ok) throw new Error(r.status); return r.text(); })
    .then((md) => {
      const doc = parse(md);
      document.getElementById('resume-root').innerHTML = render(doc);
      const sub = document.getElementById('resume-subtitle');
      if (sub && doc.subtitle) sub.textContent = doc.subtitle;
    })
    .catch((err) => {
      document.getElementById('resume-root').innerHTML =
        `<p class="text-sm" style="color: var(--status-risk)">Could not load content/resume.md (${err.message}). If you opened the file directly, run <code>python3 -m http.server</code> and visit http://localhost:8000.</p>`;
    });
})();
