// Pre-release QA for the portfolio: responsive sweep, interactions, axe, comparison.
// Usage:
//   node run.mjs --base http://localhost:3242 --label r41 [--quick] [--routes /,/contact] [--skip interact,axe] [--concurrency 3]
//   node run.mjs --compare r41 prod
import { chromium } from 'playwright'
import fs from 'node:fs'
import path from 'node:path'
import http from 'node:http'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const RESULTS = path.join(__dirname, 'results')
const AXE_PATH = path.resolve(__dirname, '../node_modules/axe-core/axe.min.js')

// ------------------------------------------------------------------ args
const argv = process.argv.slice(2)
const args = { flags: new Set(), vals: {} }
for (let i = 0; i < argv.length; i++) {
  const a = argv[i]
  if (a === '--compare') { args.vals.compare = [argv[++i], argv[++i]]; continue }
  if (a === '--quick') { args.flags.add('quick'); continue }
  if (a.startsWith('--')) { args.vals[a.slice(2)] = argv[++i] }
}

const PAGE_ROUTES = [
  '/', '/timeline', '/work/air-new-zealand', '/work/walt-disney-company', '/work/independent-consultant',
  '/work/agency-experience', '/work/ai-experiments', '/about', '/contact', '/highlights', '/acento', '/magaiba',
  '/pdf_toolkit', '/comparador_imagenes', '/comparador_videos', '/unyellower', '/canva_productora',
]
const TEXT_ROUTES = ['/agents.md', '/llms.txt', '/robots.txt', '/sitemap.xml']
const ALL_VIEWPORTS = [
  { w: 360, h: 740, mobile: true }, { w: 390, h: 844, mobile: true }, { w: 768, h: 1024, mobile: true },
  { w: 1024, h: 768 }, { w: 1440, h: 900 }, { w: 1920, h: 1080 },
]
const ALL_VARIANTS = [
  { theme: 'dark', lang: 'es' }, { theme: 'light', lang: 'es' }, { theme: 'dark', lang: 'en' }, { theme: 'light', lang: 'en' },
]
const IGNORE_RE = /(youtube\.com|youtube-nocookie|ytimg\.com|googlevideo|google-analytics|googletagmanager|vercel-insights|vercel-scripts|_vercel\/(insights|speed-insights)|vimeo|_rsc=)/i
const DESKTOP_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36'

const slug = (r) => (r === '/' ? 'home' : r.replace(/^\//, '').replace(/\//g, '_'))
const vkey = (e) => `${e.w}x${e.h}`
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))
const fmtMs = (ms) => `${Math.floor(ms / 60000)}m${String(Math.round((ms % 60000) / 1000)).padStart(2, '0')}s`

// ------------------------------------------------------------------ in-page analysis (self-contained)
function analyzePage() {
  const W = window.innerWidth
  const vis = (el, r) => {
    r = r || el.getBoundingClientRect()
    if (r.width <= 0 || r.height <= 0) return false
    const cs = getComputedStyle(el)
    return cs.visibility !== 'hidden' && cs.display !== 'none' && parseFloat(cs.opacity) !== 0
  }
  const desc = (el) => ({
    tag: el.tagName.toLowerCase(),
    cls: (typeof el.className === 'string' ? el.className : '').slice(0, 70),
    text: (el.innerText || el.getAttribute('aria-label') || '').trim().replace(/\s+/g, ' ').slice(0, 50),
  })
  const all = [...document.body.querySelectorAll('*')]
  const info = new Map()
  const getInfo = (el) => {
    if (!el || el === document.body || el === document.documentElement) return { fixed: false, clip: false }
    if (info.has(el)) return info.get(el)
    const cs = getComputedStyle(el)
    const p = getInfo(el.parentElement)
    const v = { fixed: p.fixed || cs.position === 'fixed', clip: p.clip || cs.overflowX !== 'visible' }
    info.set(el, v)
    return v
  }
  const hasOwnText = (el) => [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim().length > 0)
  const out = {}

  // 2. horizontal overflow
  const docOverflow = document.documentElement.scrollWidth > W + 1
  const bodyCS = getComputedStyle(document.body)
  const bodyHidden = (bodyCS.overflowX === 'hidden' || bodyCS.overflowX === 'clip') && document.body.scrollWidth > W + 1
  out.overflow = { flag: docOverflow || bodyHidden, docScrollWidth: document.documentElement.scrollWidth, bodyScrollWidth: document.body.scrollWidth, innerWidth: W, viaBodyOnly: !docOverflow && bodyHidden, offenders: [] }
  if (out.overflow.flag) {
    const offs = []
    for (const el of all) {
      const r = el.getBoundingClientRect()
      if (r.width <= 0 || r.right <= W + 1) continue
      const inf = getInfo(el)
      if (inf.fixed || inf.clip) continue
      let depth = 0
      for (let p = el; p; p = p.parentElement) depth++
      offs.push({ depth, right: Math.round(r.right), ...desc(el) })
    }
    offs.sort((a, b) => b.depth - a.depth)
    out.overflow.offenders = offs.slice(0, 5)
  }

  // 3. clipped text
  const clipped = []
  const textEls = all.filter((el) => /^(P|LI|H1|H2|H3|H4|A|BUTTON|SPAN)$/.test(el.tagName) && hasOwnText(el))
  for (const el of textEls) {
    const r = el.getBoundingClientRect()
    if (!vis(el, r)) continue
    if (r.right <= 0 || r.left >= W) continue
    if (el.closest('[class*="marquee"]')) continue
    const cs = getComputedStyle(el)
    const hid = cs.overflowX === 'hidden' || cs.overflowX === 'clip'
    if ((hid || cs.textOverflow === 'ellipsis') && el.scrollWidth > el.clientWidth + 1) {
      clipped.push({ kind: cs.textOverflow === 'ellipsis' ? 'ellipsis' : 'self-overflow', by: el.scrollWidth - el.clientWidth, ...desc(el) })
      continue
    }
    let a = el.parentElement
    while (a && a !== document.body && a !== document.documentElement) {
      const acs = getComputedStyle(a)
      if (acs.overflowX === 'hidden' || acs.overflowX === 'clip') break
      a = a.parentElement
    }
    if (a && a !== document.body && a !== document.documentElement) {
      if (a.className && typeof a.className === 'string' && /marquee/i.test(a.className)) continue
      const ar = a.getBoundingClientRect()
      const by = Math.max(r.right - ar.right, ar.left - r.left)
      if (by > 4) clipped.push({ kind: 'beyond-ancestor', by: Math.round(by), ancestor: desc(a).tag + '.' + desc(a).cls.split(' ')[0], ...desc(el) })
    }
  }
  out.clipped = { count: clipped.length, examples: clipped.slice(0, 10) }

  // 5. tap targets, 6. font sizes (narrow viewports only)
  if (W < 768) {
    const taps = []
    for (const el of document.body.querySelectorAll('a,button,input,select,textarea,[role=button]')) {
      if (el.tagName === 'INPUT' && el.type === 'hidden') continue
      const r = el.getBoundingClientRect()
      if (!vis(el, r)) continue
      if (r.right <= 0 || r.left >= W) continue
      if (r.width < 44 || r.height < 44) {
        if (r.width <= 1 || r.height <= 1) continue
        if (el.tagName === 'A') {
          const par = el.closest('p,li')
          if (par && par.textContent.trim().length > el.textContent.trim().length + 2) continue
        }
        taps.push({ w: Math.round(r.width), h: Math.round(r.height), ...desc(el) })
      }
    }
    out.taps = { count: taps.length, examples: taps.slice(0, 10) }
    const fonts = []
    for (const el of all) {
      if (!hasOwnText(el)) continue
      const r = el.getBoundingClientRect()
      if (!vis(el, r) || r.right <= 0 || r.left >= W) continue
      const fs = parseFloat(getComputedStyle(el).fontSize)
      if (fs < 12) fonts.push({ size: fs, ...desc(el) })
    }
    out.fonts = { count: fonts.length, examples: fonts.slice(0, 10) }
  }

  // 7. images
  const imgs = [...document.images]
  const broken = imgs.filter((i) => (i.currentSrc || i.src) && i.complete && i.naturalWidth === 0)
  const noAlt = imgs.filter((i) => !i.hasAttribute('alt'))
  out.images = {
    total: imgs.length,
    broken: broken.length, brokenExamples: broken.slice(0, 5).map((i) => (i.currentSrc || i.src).slice(0, 120)),
    noAlt: noAlt.length, noAltExamples: noAlt.slice(0, 5).map((i) => (i.currentSrc || i.src).slice(0, 120)),
  }
  out.docHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)
  return out
}

function findOverlaps() {
  const W = window.innerWidth, H = window.innerHeight
  const vis = (el, r) => {
    if (r.width <= 0 || r.height <= 0) return false
    const cs = getComputedStyle(el)
    return cs.visibility !== 'hidden' && cs.display !== 'none' && parseFloat(cs.opacity) !== 0
  }
  const desc = (el) => ({
    tag: el.tagName.toLowerCase(),
    cls: (typeof el.className === 'string' ? el.className : '').slice(0, 50),
    text: (el.innerText || el.getAttribute('aria-label') || '').trim().replace(/\s+/g, ' ').slice(0, 40),
  })
  const inView = (r) => r.right > 0 && r.left < W && r.bottom > 0 && r.top < H
  const all = [...document.body.querySelectorAll('*')]
  const fixedRoot = (el) => {
    for (let p = el; p && p !== document.body; p = p.parentElement) if (getComputedStyle(p).position === 'fixed') return p
    return null
  }
  const fixeds = all.filter((el) => {
    const cs = getComputedStyle(el)
    if (cs.position !== 'fixed' || cs.pointerEvents === 'none') return false
    const r = el.getBoundingClientRect()
    if (!vis(el, r) || !inView(r)) return false
    if (r.width * r.height > W * H * 0.5) return false // backdrops / full-screen layers
    // must contain something interactive or be one
    return el.matches('a,button,input,[role=button]') || !!el.querySelector('a,button,input,[role=button]')
  })
  const targets = [...document.body.querySelectorAll('a,button,input,select,textarea,[role=button]')]
  const pairs = [], seen = new Set()
  for (const f of fixeds) {
    const fr = f.getBoundingClientRect()
    for (const t of targets) {
      if (f === t || f.contains(t) || t.contains(f)) continue
      const tr = t.getBoundingClientRect()
      if (!vis(t, tr) || !inView(tr)) continue
      const tf = fixedRoot(t)
      if (tf && (tf === f || f.contains(tf) || tf.contains(f))) continue
      const ix = Math.min(fr.right, tr.right) - Math.max(fr.left, tr.left)
      const iy = Math.min(fr.bottom, tr.bottom) - Math.max(fr.top, tr.top)
      if (ix <= 2 || iy <= 2) continue
      const area = Math.round(ix * iy)
      const key = desc(f).tag + desc(f).cls + '|' + desc(t).tag + desc(t).cls + desc(t).text
      if (seen.has(key)) continue
      seen.add(key)
      pairs.push({ fixed: desc(f), target: desc(t), area })
    }
  }
  pairs.sort((a, b) => b.area - a.area)
  return pairs.slice(0, 8)
}

async function scrollThrough(page) {
  await page.evaluate(async () => {
    const step = Math.max(300, Math.floor(window.innerHeight * 0.8))
    let y = 0, n = 0
    while (n++ < 60) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 100))
      const max = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight) - window.innerHeight
      if (y >= max) break
      y = Math.min(y + step, max)
    }
    await new Promise((r) => setTimeout(r, 300))
  })
}
const scrollTop = (page) => page.evaluate(() => window.scrollTo(0, 0))

// ------------------------------------------------------------------ helpers
async function makeContext(browser, base, { vp, theme, scheme, cookie = true, ua, storeTheme = true }) {
  const ctx = await browser.newContext({
    viewport: { width: vp.w, height: vp.h },
    isMobile: !!vp.mobile,
    hasTouch: !!vp.mobile,
    deviceScaleFactor: 1,
    colorScheme: scheme || theme || 'dark',
    ...(ua ? { userAgent: ua } : {}),
    serviceWorkers: 'block',
  })
  if (cookie) await ctx.addCookies([{ name: 'tp_intro', value: '1', url: base }])
  if (storeTheme && theme) {
    await ctx.addInitScript((t) => { try { localStorage.setItem('tp.visual-mode.choice', t) } catch {} }, theme)
  }
  return ctx
}

function attachCollectors(page, store) {
  page.on('console', (m) => {
    if (m.type() !== 'error') return
    const u = m.location()?.url || ''
    if (IGNORE_RE.test(u) || IGNORE_RE.test(m.text())) return
    store.console.push(m.text().slice(0, 240))
  })
  page.on('pageerror', (e) => store.console.push('pageerror: ' + String(e.message).slice(0, 240)))
  page.on('requestfailed', (r) => {
    const u = r.url()
    if (IGNORE_RE.test(u)) return
    const err = r.failure()?.errorText || ''
    if (/ERR_ABORTED/.test(err) && (r.resourceType() === 'media' || /_rsc/.test(u))) return
    store.failed.push(`${err} ${u.slice(0, 160)}`)
  })
  page.on('response', (r) => {
    const u = r.url()
    if (r.status() >= 400 && !IGNORE_RE.test(u) && r.request().resourceType() !== 'document') store.failed.push(`HTTP ${r.status()} ${u.slice(0, 160)}`)
  })
}

async function switchToEnglish(page, narrow) {
  const open = page.locator('button[aria-label="Abrir menú"]')
  const en = page.locator('button:text-is("EN")')
  try {
    if (narrow) {
      if ((await open.count()) === 0) return false
      await open.first().click({ timeout: 2500 })
      await sleep(400)
    }
    const visible = en.locator('visible=true')
    if ((await visible.count()) === 0) {
      if (narrow) await closeMenu(page)
      return false
    }
    await visible.first().click({ timeout: 2500 })
    await sleep(500)
    if (narrow) await closeMenu(page)
    return true
  } catch {
    return false
  }
}
async function closeMenu(page) {
  try {
    const c = page.locator('#sidebar button[aria-label="Cerrar menú"]').locator('visible=true')
    if ((await c.count()) > 0) await c.first().click({ timeout: 2000 })
    await sleep(300)
  } catch {}
}

// ------------------------------------------------------------------ sweep
async function sweepOne(browser, base, route, vp, variant, shotsDir, label) {
  const entry = { route, w: vp.w, h: vp.h, theme: variant.theme, lang: variant.lang }
  const store = { console: [], failed: [] }
  const ctx = await makeContext(browser, base, { vp, theme: variant.theme })
  const page = await ctx.newPage()
  attachCollectors(page, store)
  try {
    const resp = await page.goto(base + route, { waitUntil: 'load', timeout: 45000 })
    entry.status = resp ? resp.status() : null
    entry.finalUrl = page.url().replace(base, '')
    if (entry.status === 404) { entry.absent = true; return entry }
    await sleep(1500)
    if (variant.lang === 'en') {
      const ok = await switchToEnglish(page, vp.w < 1024)
      if (!ok) { entry.langNA = true; entry.note = 'lang toggle n/a'; return entry }
      entry.langSwitched = true
    }
    await scrollThrough(page)
    await scrollTop(page)
    await sleep(400)
    entry.mode = await page.evaluate(() => document.documentElement.getAttribute('data-visual-mode'))
    entry.htmlLang = await page.evaluate(() => document.documentElement.lang)
    Object.assign(entry, await page.evaluate(analyzePage))
    if (vp.w < 768 || true) {
      const top = vp.w < 768 ? await page.evaluate(findOverlaps) : []
      let bottom = []
      if (vp.w < 768) {
        await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight))
        await sleep(400)
        bottom = await page.evaluate(findOverlaps)
        await scrollTop(page)
        await sleep(200)
      }
      entry.overlaps = { top, bottom, count: top.length + bottom.length }
    }
    // screenshot
    const file = `${slug(route)}__${vp.w}x${vp.h}__${variant.theme}-${variant.lang}.png`
    const tall = entry.docHeight > 12000
    await page.screenshot({
      path: path.join(shotsDir, file),
      fullPage: true,
      animations: 'disabled',
      caret: 'hide',
      ...(tall ? { clip: { x: 0, y: 0, width: vp.w, height: 12000 } } : {}),
    })
    entry.shot = `shots/${file}`
    entry.shotClipped = tall
  } catch (e) {
    entry.error = String(e.message).split('\n')[0].slice(0, 300)
  } finally {
    entry.console = store.console.slice(0, 15)
    entry.consoleCount = store.console.length
    entry.failed = [...new Set(store.failed)].slice(0, 15)
    entry.failedCount = store.failed.length
    await ctx.close().catch(() => {})
  }
  return entry
}

async function runPool(tasks, concurrency, worker) {
  let i = 0, done = 0
  const total = tasks.length
  const start = Date.now()
  const results = new Array(total)
  await Promise.all(Array.from({ length: concurrency }, async () => {
    while (i < total) {
      const idx = i++
      results[idx] = await worker(tasks[idx])
      done++
      if (done % 10 === 0 || done === total) {
        const el = Date.now() - start
        console.log(`  sweep ${done}/${total}  (${fmtMs(el)} elapsed, ~${fmtMs((el / done) * (total - done))} left)`)
      }
    }
  }))
  return results
}

async function textEndpoints(base) {
  const out = []
  for (const r of TEXT_ROUTES) {
    try {
      const res = await fetch(base + r, { redirect: 'follow' })
      const body = await res.text()
      out.push({ route: r, status: res.status, contentType: res.headers.get('content-type'), bytes: body.length, ok: res.status === 200 && body.trim().length > 0 })
    } catch (e) {
      out.push({ route: r, error: String(e.message), ok: false })
    }
  }
  return out
}

// ------------------------------------------------------------------ accessibility
async function runAxe(browser, base, routes) {
  const results = []
  const axeSrc = fs.readFileSync(AXE_PATH, 'utf8')
  const vps = [ALL_VIEWPORTS[4], ALL_VIEWPORTS[1]]
  const tasks = []
  for (const r of routes) for (const vp of vps) tasks.push({ r, vp })
  await runPool(tasks, 3, async ({ r, vp }) => {
    const rec = { route: r, w: vp.w, h: vp.h, violations: [] }
    const ctx = await makeContext(browser, base, { vp, theme: 'dark' })
    const page = await ctx.newPage()
    try {
      const resp = await page.goto(base + r, { waitUntil: 'load', timeout: 45000 })
      rec.status = resp?.status()
      if (rec.status === 404) { rec.absent = true; return rec }
      await sleep(1500)
      try { await page.addScriptTag({ path: AXE_PATH }) } catch { await page.evaluate(axeSrc) }
      const res = await page.evaluate(async () => {
        const r = await window.axe.run(document, { resultTypes: ['violations'] })
        return r.violations.map((v) => ({ id: v.id, impact: v.impact, help: v.help, nodes: v.nodes.length, targets: v.nodes.slice(0, 3).map((n) => n.target.join(' ').slice(0, 140)) }))
      })
      rec.violations = res
    } catch (e) {
      rec.error = String(e.message).split('\n')[0].slice(0, 200)
    } finally {
      await ctx.close().catch(() => {})
      results.push(rec)
    }
    return rec
  })
  return results
}

// ------------------------------------------------------------------ interactions
function tinyPdf() {
  const objs = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 200 200] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>',
    null,
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
  ]
  const stream = 'BT /F1 18 Tf 20 100 Td (QA test) Tj ET'
  objs[3] = `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`
  let pdf = '%PDF-1.4\n'
  const offs = []
  objs.forEach((o, i) => { offs.push(pdf.length); pdf += `${i + 1} 0 obj\n${o}\nendobj\n` })
  const xref = pdf.length
  pdf += `xref\n0 ${objs.length + 1}\n0000000000 65535 f \n` + offs.map((o) => String(o).padStart(10, '0') + ' 00000 n \n').join('')
  pdf += `trailer\n<< /Size ${objs.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`
  return Buffer.from(pdf, 'latin1')
}
// 1x1 red PNG
const TINY_PNG = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8DwHwAFBQIAX8jx0gAAAABJRU5ErkJggg==', 'base64')

async function runInteractions(browser, base) {
  const results = []
  const record = (name, vp, pass, detail) => {
    results.push({ name, vp: vp ? `${vp.w}x${vp.h}` : '-', pass, detail: String(detail ?? '').slice(0, 400) })
    console.log(`  [${pass === true ? 'PASS' : pass === false ? 'FAIL' : 'SKIP'}] ${name} @ ${vp ? vp.w : '-'} ${pass === true ? '' : '- ' + String(detail ?? '').slice(0, 120)}`)
  }
  const run = async (name, vp, fn) => {
    try {
      const r = await fn()
      if (r === 'absent') record(name, vp, null, 'absent in this build')
      else if (r && typeof r === 'object') record(name, vp, r.pass, r.detail)
      else record(name, vp, true, '')
    } catch (e) { record(name, vp, false, 'exception: ' + String(e.message).split('\n')[0]) }
  }
  const vps = [ALL_VIEWPORTS[1], ALL_VIEWPORTS[4]]
  const openPage = async (vp, route, opts = {}) => {
    const ctx = await makeContext(browser, base, { vp, theme: 'dark', ...opts })
    const page = await ctx.newPage()
    const store = { console: [], failed: [] }
    attachCollectors(page, store)
    const resp = await page.goto(base + route, { waitUntil: 'load', timeout: 45000 })
    await sleep(1500)
    return { ctx, page, resp, store }
  }

  // mobile menu
  {
    const vp = vps[0]
    await run('mobile menu opens and closes', vp, async () => {
      const { ctx, page } = await openPage(vp, '/')
      try {
        const openBtn = page.locator('button[aria-label="Abrir menú"]').first()
        if ((await openBtn.count()) === 0) return { pass: false, detail: 'no "Abrir menú" button' }
        await openBtn.click({ timeout: 6000 })
        await sleep(600)
        const closeBtn = page.locator('#sidebar button[aria-label="Cerrar menú"]').locator('visible=true')
        const expanded = await page.locator('button[aria-expanded="true"]').count()
        const opened = (await closeBtn.count()) > 0
        const enVisible = await page.locator('button:text-is("EN")').locator('visible=true').count()
        if (!(opened && (expanded > 0 || enVisible > 0))) return { pass: false, detail: `opened=${opened} expanded=${expanded} enVisible=${enVisible}` }
        await closeBtn.first().click({ timeout: 6000 })
        await sleep(600)
        const reopened = await page.locator('button[aria-label="Abrir menú"]').locator('visible=true').count()
        const enAfter = await page.evaluate(() => { const r = document.getElementById("sidebar").getBoundingClientRect(); return r.right > 1 ? 1 : 0 })
        return { pass: reopened > 0 && enAfter === 0, detail: `after close: openBtn=${reopened} sidebar on-screen=${enAfter}` }
      } finally { await ctx.close() }
    })
  }

  // language toggle
  for (const vp of vps) {
    await run('language toggle (EN) changes content', vp, async () => {
      const { ctx, page } = await openPage(vp, '/contact')
      try {
        const before = await page.evaluate(() => ({ h1: document.querySelector('h1')?.textContent?.trim(), lang: document.documentElement.lang, body: document.body.innerText.length }))
        const ok = await switchToEnglish(page, vp.w < 1024)
        if (!ok) return { pass: false, detail: 'EN toggle not found' }
        await sleep(400)
        const after = await page.evaluate(() => ({ h1: document.querySelector('h1')?.textContent?.trim(), lang: document.documentElement.lang, text: document.body.innerText }))
        const changed = before.h1 !== after.h1 || before.lang !== after.lang
        const extra = /When it makes sense to talk/i.test(after.text) ? ' (found "When it makes sense to talk")' : ''
        return { pass: changed, detail: `h1 "${before.h1}" -> "${after.h1}", lang ${before.lang} -> ${after.lang}${extra}` }
      } finally { await ctx.close() }
    })
  }

  // theme
  for (const vp of vps) {
    await run('theme follows prefers-color-scheme (no stored choice)', vp, async () => {
      const det = []
      for (const scheme of ['light', 'dark']) {
        const ctx = await makeContext(browser, base, { vp, scheme, storeTheme: false })
        const page = await ctx.newPage()
        await page.goto(base + '/', { waitUntil: 'load', timeout: 45000 })
        let mode = null
        for (let i = 0; i < 12; i++) {
          mode = await page.evaluate(() => document.documentElement.getAttribute('data-visual-mode'))
          if (mode === scheme) break
          await sleep(250)
        }
        det.push(`${scheme}->${mode}`)
        await ctx.close()
      }
      return { pass: det[0] === 'light->light' && det[1] === 'dark->dark', detail: det.join(', ') }
    })
  }

  // intro gate
  for (const vp of vps) {
    await run('intro gate redirects real browsers / cookie bypasses', vp, async () => {
      const det = []
      const ctx1 = await makeContext(browser, base, { vp, theme: 'dark', cookie: false, ua: DESKTOP_UA, storeTheme: false })
      const p1 = await ctx1.newPage()
      await p1.goto(base + '/', { waitUntil: 'load', timeout: 45000 }).catch(() => {})
      await sleep(800)
      const u1 = p1.url()
      det.push('no cookie -> ' + u1.replace(base, ''))
      await ctx1.close()
      const ctx2 = await makeContext(browser, base, { vp, theme: 'dark', cookie: true, ua: DESKTOP_UA, storeTheme: false })
      const p2 = await ctx2.newPage()
      await p2.goto(base + '/', { waitUntil: 'load', timeout: 45000 }).catch(() => {})
      await sleep(800)
      const u2 = p2.url()
      det.push('cookie -> ' + u2.replace(base, ''))
      await ctx2.close()
      return { pass: u1.includes('/intro.html') && !u2.includes('/intro.html'), detail: det.join('; ') }
    })
  }

  // video window
  for (const vp of vps) {
    await run('video window (air-new-zealand): next, thumb, ArrowRight, play', vp, async () => {
      const { ctx, page } = await openPage(vp, '/work/air-new-zealand')
      try {
        const vw = page.locator('section.vw:has(.vw-nav)').first()
        if ((await vw.count()) === 0) return { pass: false, detail: 'no section.vw with .vw-nav' }
        await vw.scrollIntoViewIfNeeded()
        const count = async () => (await vw.locator('.vw-count').first().textContent())?.trim()
        const activeIdx = async () => vw.locator('.vw-thumb').evaluateAll((els) => els.findIndex((e) => e.getAttribute('aria-current') === 'true'))
        const steps = []
        let ok = true
        const c0 = await count(), a0 = await activeIdx()
        await vw.locator('.vw-nav button[aria-label="Video siguiente"]').first().click({ timeout: 6000 })
        await sleep(500)
        const c1 = await count(), a1 = await activeIdx()
        const s1 = c1 !== c0; ok = ok && s1; steps.push(`next: ${c0}->${c1} ${s1 ? 'ok' : 'FAIL'}`)
        const nThumbs = await vw.locator('.vw-thumb').count()
        let s2 = false
        if (nThumbs > 1) {
          const target = a1 === 0 ? 1 : 0
          await vw.locator('.vw-thumb').nth(target).click({ timeout: 6000 })
          await sleep(500)
          const a2 = await activeIdx()
          s2 = a2 === target && a2 !== a1
          steps.push(`thumb: active ${a1}->${a2} ${s2 ? 'ok' : 'FAIL'}`)
        } else steps.push('thumb: only 1 thumb FAIL')
        ok = ok && s2
        await vw.locator('.vw-nav button[aria-label="Video siguiente"]').first().focus()
        const c3 = await count()
        await page.keyboard.press('ArrowRight')
        await sleep(500)
        const c4 = await count()
        const s3 = c3 !== c4; ok = ok && s3; steps.push(`ArrowRight: ${c3}->${c4} ${s3 ? 'ok' : 'FAIL'}`)
        const before = await vw.locator('.vw-screen iframe').count()
        await vw.locator('.vw-play').first().click({ timeout: 6000 })
        await sleep(1000)
        const after = await vw.locator('.vw-screen iframe').count()
        const s4 = after > 0; ok = ok && s4; steps.push(`play: iframes ${before}->${after} ${s4 ? 'ok' : 'FAIL'}`)
        return { pass: ok, detail: steps.join('; ') }
      } finally { await ctx.close() }
    })
  }

  // PARADISE
  {
    const vp = vps[1]
    await run('independent-consultant has PARADISE_PITCHES with 2 thumbs', vp, async () => {
      const { ctx, page } = await openPage(vp, '/work/independent-consultant')
      try {
        const sec = page.locator('section[aria-label="PARADISE_PITCHES"]')
        if ((await sec.count()) === 0) return 'absent'
        const n = await sec.first().locator('.vw-thumb').count()
        return { pass: n === 2, detail: `${n} thumbnails` }
      } finally { await ctx.close() }
    })
  }

  // AI experiments
  for (const vp of vps) {
    await run('ai-experiments: popup opens, Escape closes', vp, async () => {
      const { ctx, page } = await openPage(vp, '/work/ai-experiments')
      try {
        let trig = page.locator('button[aria-label^="Abrir la imagen"]').first()
        if ((await trig.count()) === 0) trig = page.locator('button[aria-label^="Open"]').first()
        if ((await trig.count()) === 0) return { pass: false, detail: 'no popup trigger found' }
        await trig.scrollIntoViewIfNeeded()
        await trig.click({ timeout: 6000 })
        await sleep(700)
        const dlg = page.locator('[role="dialog"]').locator('visible=true')
        const opened = (await dlg.count()) > 0
        await page.keyboard.press('Escape')
        await sleep(600)
        const closed = (await page.locator('[role="dialog"]').locator('visible=true').count()) === 0
        let byButton = ''
        if (!closed) {
          const cb = page.locator('[role="dialog"] button[aria-label^="Cerrar"], [role="dialog"] button[aria-label^="Close"]').locator('visible=true').last()
          if ((await cb.count()) > 0) {
            await cb.click({ timeout: 4000 }).catch(() => {})
            await sleep(500)
            byButton = ` (close button works: ${(await page.locator('[role="dialog"]').locator('visible=true').count()) === 0})`
          } else byButton = ' (no close button found)'
        }
        return { pass: opened && closed, detail: `opened=${opened} closedByEscape=${closed}${byButton}` }
      } finally { await ctx.close() }
    })
    await run('ai-experiments: BURGER KING / SUBWAY play inline (no dialog)', vp, async () => {
      const { ctx, page } = await openPage(vp, '/work/ai-experiments')
      try {
        const det = []
        let ok = true, found = 0
        for (const [kw, re, vid] of [['BURGER KING', /(Ad Messi|Messi Ad) BURGER KING/, 'pAdrOyzmmZs'], ['SUBWAY', /(Demo de producto|Product Demo) SUBWAY/, 'zW8DP4fr7xA']]) {
          const playBtn = () => page.locator(`button[aria-label*="${kw}"]`).locator('visible=true').first()
          if ((await playBtn().count()) === 0) {
            const t = page.getByText(re).first()
            if ((await t.count()) === 0) { det.push(`${kw}: not present`); continue }
            await t.scrollIntoViewIfNeeded()
            await t.click({ timeout: 5000 }).catch(() => {})
            await sleep(900)
          }
          if ((await playBtn().count()) === 0) { ok = false; found++; det.push(`${kw}: no play button after selecting item FAIL`); continue }
          found++
          await playBtn().scrollIntoViewIfNeeded()
          await playBtn().click({ timeout: 5000 })
          await sleep(900)
          const iframe = await page.locator(`iframe[src*="${vid}"]`).count()
          const dlg = await page.locator('[role="dialog"]').locator('visible=true').count()
          const good = iframe > 0 && dlg === 0
          ok = ok && good
          det.push(`${kw}: iframe=${iframe} dialog=${dlg} ${good ? 'ok' : 'FAIL'}`)
        }
        if (found === 0) return 'absent'
        return { pass: ok, detail: det.join('; ') }
      } finally { await ctx.close() }
    })
  }

  // contact form
  for (const vp of vps) {
    await run('contact form builds mailto:tomaspero@gmail.com', vp, async () => {
      const ctx = await makeContext(browser, base, { vp, theme: 'dark' })
      await ctx.addInitScript(() => {
        window.__mailto = null
        try {
          navigation.addEventListener('navigate', (e) => {
            if (String(e.destination.url).startsWith('mailto:')) { window.__mailto = e.destination.url; if (e.cancelable) e.preventDefault() }
          })
        } catch {}
      })
      const page = await ctx.newPage()
      try {
        await page.goto(base + '/contact', { waitUntil: 'load', timeout: 45000 })
        await sleep(1200)
        await page.fill('input[name="name"]', 'QA Tester')
        await page.fill('input[name="email"]', 'qa@example.com')
        await page.fill('textarea[name="message"]', 'Mensaje de prueba automatizada.')
        await page.locator('form button[type="submit"]').first().click({ timeout: 6000 })
        await sleep(800)
        const url = await page.evaluate(() => window.__mailto)
        return { pass: !!url && url.startsWith('mailto:tomaspero@gmail.com'), detail: url ? url.slice(0, 80) : 'no mailto navigation captured' }
      } finally { await ctx.close() }
    })
  }

  // Clippy
  for (const vp of vps) {
    await run('Clippy opens and closes', vp, async () => {
      const { ctx, page } = await openPage(vp, '/')
      try {
        const btn = page.locator('button[aria-label="Abrir assistant"]').first()
        if ((await btn.count()) === 0) return { pass: false, detail: 'no "Abrir assistant" button' }
        await btn.click({ timeout: 6000 })
        await sleep(800)
        const close = page.locator('button[aria-label="Cerrar assistant"]').locator('visible=true')
        const panel = (await close.count()) > 0
        const input = await page.locator('textarea:visible, input[type="text"]:visible').count()
        if (!panel) return { pass: false, detail: 'panel did not appear' }
        await close.last().click({ timeout: 6000 })
        await sleep(700)
        const left = await page.locator('button[aria-label="Cerrar assistant"]').count()
        return { pass: left === 0, detail: `panel open (input fields: ${input}); close buttons after close: ${left}` }
      } finally { await ctx.close() }
    })
  }

  // webapps
  for (const vp of vps) {
    await run('webapp pdf_toolkit accepts a PDF without errors', vp, async () => {
      const { ctx, page, resp, store } = await openPage(vp, '/pdf_toolkit/index.html')
      try {
        if (resp.status() === 404) return 'absent'
        const input = page.locator('input[type="file"]').first()
        if ((await input.count()) === 0) return { pass: false, detail: 'no file input' }
        const errs = []
        page.on('pageerror', (e) => errs.push(e.message))
        await input.setInputFiles({ name: 'qa.pdf', mimeType: 'application/pdf', buffer: tinyPdf() })
        await sleep(3000)
        return { pass: errs.length === 0, detail: errs.length ? errs.join(' | ') : 'no page errors in 3s' }
      } finally { await ctx.close() }
    })
    await run('webapp comparador_imagenes accepts two PNGs without errors', vp, async () => {
      const { ctx, page, resp } = await openPage(vp, '/comparador_imagenes/index.html')
      try {
        if (resp.status() === 404) return 'absent'
        const inputs = page.locator('input[type="file"]')
        const n = await inputs.count()
        if (n === 0) return { pass: false, detail: 'no file input' }
        const errs = []
        page.on('pageerror', (e) => errs.push(e.message))
        for (let i = 0; i < Math.min(n, 2); i++) {
          await inputs.nth(i).setInputFiles({ name: `qa${i}.png`, mimeType: 'image/png', buffer: TINY_PNG })
          await sleep(500)
        }
        if (n === 1) await inputs.first().setInputFiles([{ name: 'a.png', mimeType: 'image/png', buffer: TINY_PNG }, { name: 'b.png', mimeType: 'image/png', buffer: TINY_PNG }]).catch(() => {})
        await sleep(3000)
        return { pass: errs.length === 0, detail: `${n} file input(s); ` + (errs.length ? errs.join(' | ') : 'no page errors in 3s') }
      } finally { await ctx.close() }
    })
  }
  return results
}

// ------------------------------------------------------------------ issue counts
function issueCounts(e) {
  return {
    overflow: e.overflow?.flag ? 1 : 0,
    clipped: e.clipped?.count || 0,
    overlap: e.overlaps?.count || 0,
    taps: e.taps?.count || 0,
    fonts: e.fonts?.count || 0,
    console: e.consoleCount || 0,
    broken: e.images?.broken || 0,
    failed: e.failedCount || 0,
  }
}
const COUNT_KEYS = ['overflow', 'clipped', 'overlap', 'taps', 'fonts', 'console', 'broken', 'failed']

// ------------------------------------------------------------------ report
const CSS = `
:root{--bg:#0f1115;--fg:#e6e8ec;--mut:#8b93a1;--card:#171a21;--bd:#2a2f3a;--ok:#14532d;--okt:#86efac;--warn:#713f12;--warnt:#fde68a;--bad:#7f1d1d;--badt:#fecaca;--acc:#7dd3fc}
@media(prefers-color-scheme:light){:root{--bg:#f6f7f9;--fg:#15171c;--mut:#5b6472;--card:#fff;--bd:#d6dae1;--ok:#dcfce7;--okt:#14532d;--warn:#fef3c7;--warnt:#713f12;--bad:#fee2e2;--badt:#7f1d1d;--acc:#0369a1}}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--fg);font:14px/1.45 system-ui,Segoe UI,sans-serif;padding:20px 16px 80px;max-width:1500px;margin:0 auto}
h1{font-size:22px}h2{font-size:18px;margin-top:34px;border-bottom:1px solid var(--bd);padding-bottom:6px}h3{font-size:15px;margin:22px 0 6px}
table{border-collapse:collapse;width:100%;margin:8px 0}th,td{border:1px solid var(--bd);padding:4px 7px;text-align:left;vertical-align:top}th{background:var(--card);position:sticky;top:0}
td.c{text-align:center;font-size:12px;white-space:nowrap}.g{background:var(--ok);color:var(--okt)}.a{background:var(--warn);color:var(--warnt)}.r{background:var(--bad);color:var(--badt)}.n{color:var(--mut)}
code,.mono{font:12px ui-monospace,Consolas,monospace}.mut{color:var(--mut)}.pill{display:inline-block;padding:1px 8px;border-radius:9px;font-size:12px}
details{background:var(--card);border:1px solid var(--bd);border-radius:6px;margin:8px 0;padding:6px 10px}summary{cursor:pointer;font-weight:600}
.shots{display:flex;flex-wrap:wrap;gap:8px;margin:8px 0}.shots a{display:block;width:150px;font-size:11px;color:var(--mut)}.shots img{width:150px;height:180px;object-fit:cover;object-position:top;border:1px solid var(--bd);display:block}
ul{margin:4px 0;padding-left:20px}.cmp{display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px}.cmp img{width:100%;max-height:420px;object-fit:cover;object-position:top;border:1px solid var(--bd)}
`

function cellClass(e) {
  if (e.absent) return 'n'
  if (e.error || e.langNA) return 'n'
  const c = issueCounts(e)
  const hard = c.overflow || c.broken || c.console || (e.status && e.status >= 400)
  const total = COUNT_KEYS.reduce((s, k) => s + c[k], 0)
  return hard ? 'r' : total ? 'a' : 'g'
}
function cellText(e) {
  if (e.absent) return 'absent'
  if (e.error) return 'ERR'
  if (e.langNA) return 'n/a'
  const c = issueCounts(e)
  const short = { overflow: 'O', clipped: 'C', overlap: 'V', taps: 'T', fonts: 'F', console: 'E', broken: 'B', failed: 'N' }
  const parts = COUNT_KEYS.filter((k) => c[k]).map((k) => short[k] + c[k])
  return parts.length ? parts.join(' ') : 'ok'
}

function buildReport(data) {
  const { label, base, entries, interactions, axe, text, meta } = data
  const routes = [...new Set(entries.map((e) => e.route))]
  const vps = [...new Map(entries.map((e) => [vkey(e), e])).values()].map((e) => ({ w: e.w, h: e.h }))
  const variants = [...new Set(entries.map((e) => `${e.theme}/${e.lang}`))]
  const get = (r, vp, v) => entries.find((e) => e.route === r && e.w === vp.w && e.h === vp.h && `${e.theme}/${e.lang}` === v)
  let h = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>QA ${esc(label)}</title><style>${CSS}</style></head><body>`
  h += `<h1>Portfolio QA: ${esc(label)}</h1><p class="mut">${esc(base)} &middot; ${esc(meta.date)} &middot; sweep ${esc(meta.sweepTime || '')} &middot; ${entries.length} page loads${meta.quick ? ' (quick mode)' : ''}</p>`
  h += `<p class="mut">Cell legend: O overflow, C clipped text, V overlaps with fixed elements, T small tap targets, F fonts &lt;12px, E console errors, B broken images, N failed requests. Red = overflow/console/broken/HTTP error, amber = other issues, green = clean, grey = n/a.</p>`
  h += `<h2>Summary</h2>`
  for (const v of variants) {
    h += `<h3>${esc(v)}</h3><table><tr><th>Route</th>${vps.map((vp) => `<th>${vp.w}</th>`).join('')}</tr>`
    for (const r of routes) {
      h += `<tr><td><a href="#r-${slug(r)}">${esc(r)}</a></td>`
      for (const vp of vps) {
        const e = get(r, vp, v)
        if (!e) { h += `<td class="c n">-</td>`; continue }
        const c = issueCounts(e)
        const tip = e.absent ? 'absent in this build' : (e.error || e.note || COUNT_KEYS.map((k) => `${k}:${c[k]}`).join(' '))
        h += `<td class="c ${cellClass(e)}" title="${esc(tip)}">${esc(cellText(e))}</td>`
      }
      h += `</tr>`
    }
    h += `</table>`
  }
  // text endpoints
  h += `<h2>Text endpoints</h2><table><tr><th>Route</th><th>Status</th><th>Content-Type</th><th>Bytes</th><th></th></tr>`
  for (const t of text || []) h += `<tr><td>${esc(t.route)}</td><td>${t.status ?? ''}</td><td>${esc(t.contentType || t.error || '')}</td><td>${t.bytes ?? ''}</td><td class="${t.ok ? 'g' : 'r'}">${t.ok ? 'ok' : 'FAIL'}</td></tr>`
  h += `</table>`
  // interactions
  h += `<h2>Interactions</h2><table><tr><th>Check</th><th>Viewport</th><th>Result</th><th>Detail</th></tr>`
  for (const i of interactions || []) h += `<tr><td>${esc(i.name)}</td><td>${esc(i.vp)}</td><td class="c ${i.pass === true ? 'g' : i.pass === false ? 'r' : 'n'}">${i.pass === true ? 'PASS' : i.pass === false ? 'FAIL' : 'absent'}</td><td class="mono">${esc(i.detail)}</td></tr>`
  h += `</table>`
  // axe
  h += `<h2>Accessibility (axe-core)</h2>`
  const byRule = new Map()
  for (const a of axe || []) for (const v of a.violations || []) {
    const k = v.id
    if (!byRule.has(k)) byRule.set(k, { id: v.id, impact: v.impact, help: v.help, hits: [] })
    byRule.get(k).hits.push({ route: a.route, w: a.w, nodes: v.nodes, targets: v.targets })
  }
  const order = { critical: 0, serious: 1, moderate: 2, minor: 3 }
  const rules = [...byRule.values()].sort((a, b) => (order[a.impact] ?? 9) - (order[b.impact] ?? 9) || b.hits.length - a.hits.length)
  if (!rules.length) h += `<p>No violations recorded.</p>`
  for (const r of rules) {
    const cls = r.impact === 'critical' || r.impact === 'serious' ? 'r' : r.impact === 'moderate' ? 'a' : 'n'
    h += `<details><summary><span class="pill ${cls}">${esc(r.impact)}</span> ${esc(r.id)} &mdash; ${esc(r.help)} <span class="mut">(${r.hits.length} route/viewport hits)</span></summary><table><tr><th>Route</th><th>Width</th><th>Nodes</th><th>First targets</th></tr>`
    for (const hit of r.hits) h += `<tr><td>${esc(hit.route)}</td><td>${hit.w}</td><td>${hit.nodes}</td><td class="mono">${hit.targets.map(esc).join('<br>')}</td></tr>`
    h += `</table></details>`
  }
  const axeErr = (axe || []).filter((a) => a.error)
  if (axeErr.length) h += `<p class="mut">axe could not run on: ${axeErr.map((a) => esc(a.route + '@' + a.w)).join(', ')}</p>`
  // per-route details
  h += `<h2>Per-route details</h2>`
  for (const r of routes) {
    const es = entries.filter((e) => e.route === r)
    h += `<details id="r-${slug(r)}"><summary>${esc(r)}</summary>`
    const shots = es.filter((e) => e.shot)
    if (shots.length) h += `<div class="shots">${shots.map((e) => `<a href="${esc(e.shot)}" target="_blank"><img loading="lazy" src="${esc(e.shot)}" alt=""><span>${e.w} ${e.theme}-${e.lang}</span></a>`).join('')}</div>`
    for (const e of es) {
      const c = issueCounts(e)
      const bits = []
      if (e.absent) bits.push('absent in this build (404)')
      if (e.error) bits.push('ERROR ' + e.error)
      if (e.note) bits.push(e.note)
      if (e.overflow?.flag) bits.push(`<b>overflow</b> scrollWidth ${e.overflow.docScrollWidth}/${e.overflow.bodyScrollWidth} vs ${e.overflow.innerWidth}${e.overflow.viaBodyOnly ? ' (hidden by body overflow-x)' : ''}: ` + e.overflow.offenders.map((o) => `<code>${esc(o.tag + '.' + o.cls.split(' ')[0])}</code> right=${o.right} "${esc(o.text)}"`).join('; '))
      if (c.clipped) bits.push(`clipped ${c.clipped}: ` + e.clipped.examples.map((o) => `<code>${esc(o.tag)}</code> ${o.kind} +${o.by}px "${esc(o.text)}"`).join('; '))
      if (c.overlap) bits.push(`overlaps: ` + [...e.overlaps.top.map((p) => ['top', p]), ...e.overlaps.bottom.map((p) => ['bottom', p])].map(([w, p]) => `[${w}] <code>${esc(p.fixed.tag + '.' + p.fixed.cls.split(' ')[0])}</code> over <code>${esc(p.target.tag)}</code> "${esc(p.target.text)}" (${p.area}px&sup2;)`).join('; '))
      if (c.taps) bits.push(`small taps ${c.taps}: ` + e.taps.examples.map((o) => `<code>${esc(o.tag)}</code> ${o.w}x${o.h} "${esc(o.text)}"`).join('; '))
      if (c.fonts) bits.push(`fonts &lt;12px ${c.fonts}: ` + e.fonts.examples.map((o) => `${o.size}px "${esc(o.text)}"`).join('; '))
      if (c.broken) bits.push(`broken images: ${e.images.brokenExamples.map(esc).join(', ')}`)
      if (e.images?.noAlt) bits.push(`img without alt: ${e.images.noAlt} (${e.images.noAltExamples.map(esc).join(', ')})`)
      if (c.console) bits.push(`console errors ${c.console}: ` + e.console.map(esc).join(' | '))
      if (c.failed) bits.push(`failed requests ${c.failed}: ` + e.failed.map(esc).join(' | '))
      if (bits.length) h += `<p><b>${e.w}x${e.h} ${e.theme}/${e.lang}</b> (status ${e.status}): <br>` + bits.join('<br>') + `</p>`
    }
    h += `</details>`
  }
  h += `</body></html>`
  return h
}

// ------------------------------------------------------------------ main run
async function mainRun() {
  const base = (args.vals.base || '').replace(/\/$/, '')
  const label = args.vals.label
  if (!base || !label) { console.error('usage: node run.mjs --base <url> --label <name> [--quick] [--routes /,/contact] [--skip interact,axe]'); process.exit(1) }
  const quick = args.flags.has('quick')
  const skip = new Set((args.vals.skip || '').split(',').filter(Boolean))
  const conc = Number(args.vals.concurrency || 3)
  const routes = args.vals.routes ? args.vals.routes.split(',').map((r) => (r.startsWith('/') ? r : '/' + r)) : PAGE_ROUTES
  const vps = quick ? [ALL_VIEWPORTS[1], ALL_VIEWPORTS[4]] : ALL_VIEWPORTS
  let variants = quick ? [ALL_VARIANTS[0]] : ALL_VARIANTS
  if (args.vals.variants) variants = args.vals.variants.split(',').map((s) => { const [theme, lang] = s.split('-'); return { theme, lang } })
  const outDir = path.join(RESULTS, label)
  const shotsDir = path.join(outDir, 'shots')
  fs.mkdirSync(shotsDir, { recursive: true })
  const t0 = Date.now()
  console.log(`QA ${label} @ ${base}  routes=${routes.length} viewports=${vps.length} variants=${variants.map((v) => v.theme + '-' + v.lang).join(',')}`)
  const browser = await chromium.launch()

  const tasks = []
  for (const r of routes) for (const vp of vps) for (const v of variants) tasks.push({ r, vp, v })
  const sweepStart = Date.now()
  const entries = await runPool(tasks, conc, (t) => sweepOne(browser, base, t.r, t.vp, t.v, shotsDir, label))
  const sweepTime = fmtMs(Date.now() - sweepStart)

  const text = await textEndpoints(base)
  let interactions = []
  if (!skip.has('interact')) { console.log('Interactions...'); interactions = await runInteractions(browser, base) }
  let axe = []
  if (!skip.has('axe')) { console.log('Accessibility (axe)...'); axe = await runAxe(browser, base, routes) }
  await browser.close()

  const data = { label, base, entries, interactions, axe, text, meta: { date: new Date().toISOString(), quick, sweepTime, totalTime: fmtMs(Date.now() - t0), variants, viewports: vps, routes } }
  fs.writeFileSync(path.join(outDir, 'results.json'), JSON.stringify(data, null, 1))
  fs.writeFileSync(path.join(outDir, 'report.html'), buildReport(data))

  // console summary
  const sum = {}
  for (const k of COUNT_KEYS) sum[k] = 0
  let errs = 0, absent = 0, na = 0
  for (const e of entries) {
    if (e.absent) { absent++; continue }
    if (e.langNA) { na++; continue }
    if (e.error) { errs++; continue }
    const c = issueCounts(e)
    for (const k of COUNT_KEYS) sum[k] += c[k]
  }
  const axeSerious = axe.reduce((s, a) => s + (a.violations || []).filter((v) => v.impact === 'serious' || v.impact === 'critical').length, 0)
  console.log(`\n=== ${label} done in ${fmtMs(Date.now() - t0)} (sweep ${sweepTime}) ===`)
  console.log(`page loads: ${entries.length}  absent: ${absent}  lang n/a: ${na}  errors: ${errs}`)
  console.log('issue totals:', JSON.stringify(sum))
  console.log(`interactions: ${interactions.filter((i) => i.pass === true).length} pass / ${interactions.filter((i) => i.pass === false).length} fail / ${interactions.filter((i) => i.pass === null).length} absent`)
  console.log(`axe serious+critical violation records: ${axeSerious}`)
  console.log(`report: ${path.join(outDir, 'report.html')}`)
}

// ------------------------------------------------------------------ compare
function startStatic(root) {
  const mime = { '.png': 'image/png', '.html': 'text/html' }
  const srv = http.createServer((req, res) => {
    const u = decodeURIComponent(req.url.split('?')[0])
    if (u === '/__blank') { res.writeHead(200, { 'content-type': 'text/html' }); return res.end('<!doctype html><title>diff</title>') }
    const f = path.join(root, u)
    if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); return res.end() }
    res.writeHead(200, { 'content-type': mime[path.extname(f)] || 'application/octet-stream', 'access-control-allow-origin': '*' })
    fs.createReadStream(f).pipe(res)
  })
  return new Promise((resolve) => srv.listen(0, '127.0.0.1', () => resolve({ srv, port: srv.address().port })))
}

async function diffInPage({ urlA, urlB }) {
  const load = (u) => new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = () => rej(new Error('load ' + u)); i.src = u })
  const [a, b] = await Promise.all([load(urlA), load(urlB)])
  const w = Math.min(a.naturalWidth, b.naturalWidth)
  const hA = Math.round(a.naturalHeight * (w / a.naturalWidth)), hB = Math.round(b.naturalHeight * (w / b.naturalWidth))
  const H = Math.min(hA, hB)
  const draw = (img, hh) => { const c = document.createElement('canvas'); c.width = w; c.height = H; const x = c.getContext('2d', { willReadFrequently: true }); x.drawImage(img, 0, 0, w, hh); return x.getImageData(0, 0, w, H) }
  const da = draw(a, hA), db = draw(b, hB)
  const out = document.createElement('canvas'); out.width = w; out.height = H
  const ox = out.getContext('2d'); const od = ox.createImageData(w, H)
  let diff = 0
  const A = da.data, B = db.data, O = od.data
  for (let i = 0; i < A.length; i += 4) {
    const d = Math.abs(A[i] - B[i]) > 32 || Math.abs(A[i + 1] - B[i + 1]) > 32 || Math.abs(A[i + 2] - B[i + 2]) > 32
    if (d) { diff++; O[i] = 255; O[i + 1] = 50; O[i + 2] = 50 } else { O[i] = 22; O[i + 1] = 24; O[i + 2] = 30 }
    O[i + 3] = 255
  }
  ox.putImageData(od, 0, 0)
  return { pct: (diff / (w * H)) * 100, w, H, hA, hB, dataUrl: out.toDataURL('image/png') }
}

async function compareRun(A, B) {
  const load = (l) => JSON.parse(fs.readFileSync(path.join(RESULTS, l, 'results.json'), 'utf8'))
  const da = load(A), db = load(B)
  const key = (e) => `${e.route}|${e.w}x${e.h}|${e.theme}-${e.lang}`
  const mapB = new Map(db.entries.map((e) => [key(e), e]))
  const diffDir = path.join(RESULTS, `compare-${A}-vs-${B}`, 'diff')
  fs.mkdirSync(diffDir, { recursive: true })
  const { srv, port } = await startStatic(RESULTS)
  const browser = await chromium.launch()
  const page = await browser.newPage()
  await page.goto(`http://127.0.0.1:${port}/__blank`)
  const rows = []
  const pairs = da.entries.filter((e) => e.shot && mapB.get(key(e))?.shot)
  console.log(`comparing ${pairs.length} screenshot pairs...`)
  let n = 0
  for (const ea of pairs) {
    const eb = mapB.get(key(ea))
    const file = path.basename(ea.shot)
    const t0 = Date.now()
    try {
      const r = await page.evaluate(diffInPage, { urlA: `http://127.0.0.1:${port}/${A}/${ea.shot}`, urlB: `http://127.0.0.1:${port}/${B}/${eb.shot}` })
      fs.writeFileSync(path.join(diffDir, file), Buffer.from(r.dataUrl.split(',')[1], 'base64'))
      rows.push({ key: key(ea), ea, eb, pct: r.pct, hA: r.hA, hB: r.hB, H: r.H, file })
    } catch (e) {
      rows.push({ key: key(ea), ea, eb, pct: -1, error: String(e.message).slice(0, 120), file })
    }
    if (++n % 20 === 0) console.log(`  ${n}/${pairs.length}`)
  }
  await browser.close(); srv.close()
  rows.sort((x, y) => y.pct - x.pct)

  // issue deltas
  const deltas = new Map()
  for (const ea of da.entries) {
    const eb = mapB.get(key(ea))
    if (!eb || ea.absent || eb.absent || ea.error || eb.error || ea.langNA || eb.langNA) continue
    const ca = issueCounts(ea), cb = issueCounts(eb)
    for (const k of COUNT_KEYS) {
      if (ca[k] > cb[k]) {
        const d = deltas.get(ea.route) || { route: ea.route, items: [] }
        d.items.push({ k, a: ca[k], b: cb[k], at: `${ea.w} ${ea.theme}-${ea.lang}` })
        deltas.set(ea.route, d)
      }
    }
  }
  const absentIn = (d, l) => d.entries.filter((e) => e.absent).map((e) => e.route)
  const rel = (l, p) => `${l}/${p}`
  let h = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Compare ${esc(A)} vs ${esc(B)}</title><style>${CSS}</style></head><body>`
  h += `<h1>Visual comparison: ${esc(A)} (left) vs ${esc(B)} (right)</h1><p class="mut">${rows.length} pairs. Diff % = pixels differing by more than 32 in any channel, at the common height. Sorted by diff % descending.</p>`
  h += `<p class="mut">Routes absent in ${esc(A)}: ${esc([...new Set(absentIn(da))].join(', ') || 'none')}. Absent in ${esc(B)}: ${esc([...new Set(absentIn(db))].join(', ') || 'none')}.</p>`
  h += `<h2>Issue-count deltas (more issues in ${esc(A)} than in ${esc(B)})</h2>`
  if (!deltas.size) h += `<p>None.</p>`
  else {
    h += `<table><tr><th>Route</th><th>Metric</th><th>${esc(A)}</th><th>${esc(B)}</th><th>Where</th></tr>`
    for (const d of [...deltas.values()]) for (const it of d.items) h += `<tr><td>${esc(d.route)}</td><td>${it.k}</td><td>${it.a}</td><td>${it.b}</td><td>${esc(it.at)}</td></tr>`
    h += `</table>`
  }
  h += `<h2>Per-screenshot diff</h2><table><tr><th>#</th><th>Page</th><th>Diff %</th><th>Heights</th></tr>`
  rows.forEach((r, i) => {
    h += `<tr><td>${i + 1}</td><td>${esc(r.key)}</td><td class="${r.pct > 30 ? 'r' : r.pct > 5 ? 'a' : 'g'}">${r.pct < 0 ? 'ERR ' + esc(r.error) : r.pct.toFixed(2)}</td><td>${r.hA ?? ''} / ${r.hB ?? ''}</td></tr>`
    h += `<tr><td colspan="4"><div class="cmp"><a href="${esc(rel(A, r.ea.shot))}" target="_blank"><img loading="lazy" src="${esc(rel(A, r.ea.shot))}" alt="${esc(A)}"></a><a href="${esc(rel(B, r.eb.shot))}" target="_blank"><img loading="lazy" src="${esc(rel(B, r.eb.shot))}" alt="${esc(B)}"></a>${r.pct >= 0 ? `<a href="compare-${esc(A)}-vs-${esc(B)}/diff/${esc(r.file)}" target="_blank"><img loading="lazy" src="compare-${esc(A)}-vs-${esc(B)}/diff/${esc(r.file)}" alt="diff"></a>` : ''}</div></td></tr>`
  })
  h += `</table></body></html>`
  const outFile = path.join(RESULTS, `compare-${A}-vs-${B}.html`)
  fs.writeFileSync(outFile, h)
  fs.writeFileSync(path.join(RESULTS, `compare-${A}-vs-${B}.json`), JSON.stringify({ rows: rows.map((r) => ({ key: r.key, pct: r.pct, hA: r.hA, hB: r.hB })), deltas: [...deltas.values()] }, null, 1))
  console.log(`compare report: ${outFile}`)
  console.log('top 10 diffs:')
  rows.slice(0, 10).forEach((r) => console.log(`  ${r.pct.toFixed(2)}%  ${r.key}`))
}

if (args.vals.compare) await compareRun(...args.vals.compare)
else await mainRun()
