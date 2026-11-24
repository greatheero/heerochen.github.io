# Resume Markdown Format (proposal)

`content/resume.md` is the only file you edit. A renderer (`js/resume.js`, not yet written) converts it into the HTML below, so the page looks the same as today.

## 1. HTML tags (what the page needs)

Every section shares one wrapper. Only the inner part changes.

```html
<!-- Section wrapper (all sections) -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 border-b border-[#C7C7C7]">
  <h2 class="text-2xl font-bold">SECTION TITLE</h2>   <!-- "Research<br />Practice": line break after first word, automatic -->
  <div class="md:col-span-2 ...">  CONTENT  </div>
</div>
```

| Block type | Used by | HTML inside the content column |
|---|---|---|
| **Paragraph** | Profile | `<p class="text-[14.5px] leading-relaxed text-neutral-800">` |
| **Pills** | Research Practice | `<div class="flex flex-wrap gap-2">` + `<span class="text-[13px] border border-[#C7C7C7] rounded-full px-3 py-1">` each |
| **Entry** | Work, Earlier, Education | `<div class="grid grid-cols-1 sm:grid-cols-4 gap-2">` containing: dates `<span class="text-sm text-neutral-600">`, then `<div class="sm:col-span-3">` with title `<h3 class="font-bold text-lg">`, org `<p class="text-sm text-neutral-600">`, summary `<p>`, bullets `<ul class="list-disc pl-5 ...">`, note `<p class="text-[13px] text-neutral-600">` |
| **Labelled lines** | Tools & Credentials | `<p><span class="font-bold">Label:</span> text</p>` |

Bullet extras: a bold lead-in uses `<span class="font-bold">`; nested `Result:` / `Outcome:` lines use `<br /><span class="font-semibold">`.

## 2. Markdown format (what you write)

| You write | Becomes |
|---|---|
| `# Name`, then lines under it | Page header (name, subtitle) |
| `## Section Title` | Section wrapper + `<h2>` |
| Plain paragraph directly under `##` | Paragraph block |
| Bullet list directly under `##` with no bold label | Pills |
| Bullet list directly under `##` with `**Label:** text` | Labelled lines |
| `### Job Title` | Entry (`<h3>`) |
| `> dates \| organisation` on the line after `###` | Dates column + org line. Separate multiple date ranges with `;`. Organisation is optional (Education uses dates only). |
| Paragraph after the `>` line | Entry summary |
| `- **Lead-in.** text` | Bullet with bold lead-in |
| Nested `  - **Result:** text` | `Result:` line inside that bullet (same for `Outcome:`) |
| Paragraph in italics `*...*` after the bullets | Small grey note |
| `<!-- anything -->` | Comment, never shown. Use for TODOs. |
| `**bold**`, `*italic*`, `[text](url)` | Work anywhere inside text |

### Editing cheat sheet
- **Change wording:** edit the text, nothing else.
- **Add a job:** copy a `###` block, paste it above the older ones, edit.
- **Add a skill pill:** add one `- item` line under Research Practice.
- **Reorder:** cut and paste whole `##` or `###` blocks.
- **Placeholders:** `[X]` stays visible on the page until you replace it. Put draft notes in `<!-- -->` instead if you do not want them shown.

## 3. Decisions to confirm
1. Is `>` for dates | org acceptable, or would you prefer plain lines (e.g. `Mar 2019 – Present | Logitech, Hsinchu`)?
2. Should unfinished `[X]` placeholders stay visible, or be hidden until filled?
3. Rendering: `marked.js` plus a small post-processing step (about 60 lines), loaded from a CDN as Tailwind already is.
