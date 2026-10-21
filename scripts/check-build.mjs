import assert from 'node:assert/strict'
import { access, readFile, readdir } from 'node:fs/promises'
import { pages, siteUrl } from '../src/seo.js'

const read = (path) => readFile(path, 'utf8')
const sitemap = await read('dist/sitemap.xml')
assert(!sitemap.includes('#'), 'Sitemap must use regular URLs')
const locations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1])
assert.deepEqual(locations, pages.map(({ path }) => siteUrl + path))

for (const page of pages) {
  const html = await read(`dist${page.path}index.html`)
  assert(html.includes('<html lang="sl">'))
  assert(html.includes(`<title>${page.title}</title>`))
  assert(html.includes(`name="description" content="${page.description}"`))
  assert(html.includes(`rel="canonical" href="${siteUrl}${page.path}"`))
  assert(html.includes(`property="og:url" content="${siteUrl}${page.path}"`))
  assert.equal([...html.matchAll(/rel="canonical"/g)].length, 1)
  assert(html.includes('<h1'), `Missing rendered content for ${page.path}`)
  assert(!html.includes('noindex'))
  assert(!html.includes('file:///') && !html.includes('/src/assets/'))
  for (const other of pages) assert(html.includes(`href="${other.path}"`))

  // Check real emitted files, not a preview server's SPA fallback.
  const resources = [
    ...[...html.matchAll(/(?:src|href)="(\/(?!\/)[^"]+)"/g)].map((match) => match[1]),
    ...[...html.matchAll(/url\(['"]?(\/assets\/[^)'"\s]+)['"]?\)/g)].map((match) => match[1]),
  ]
  for (const resource of new Set(resources)) {
    const pathname = decodeURIComponent(resource.split(/[?#]/)[0])
    await access(`dist${pathname}${pathname.endsWith('/') ? 'index.html' : ''}`)
  }
}

const home = await read('dist/index.html')
assert(home.includes('Voda, ki nas povezuje'))
const reports = await read('dist/analiza/index.html')
const reportFiles = (await readdir('src/data/report-years')).filter((file) => file.endsWith('.json'))
const years = await Promise.all(reportFiles.map(async (file) => JSON.parse(await read(`src/data/report-years/${file}`))))
const latestYear = years.reduce((latest, year) => +year.title > +latest.title ? year : latest)
for (const report of latestYear.reports) {
  assert(reports.includes(report.title), `Missing latest report: ${report.title}`)
  assert(reports.includes(report.pdf), `Missing latest PDF link: ${report.pdf}`)
}
const announcements = await read('dist/obvestila/index.html')
const announcementFiles = (await readdir('src/data/announcements')).filter((file) => file.endsWith('.json'))
const escapeHtml = (value) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
for (const file of announcementFiles) {
  const entry = JSON.parse(await read(`src/data/announcements/${file}`))
  assert(announcements.includes(escapeHtml(entry.title)), `Missing announcement: ${entry.title}`)
  assert(announcements.includes(escapeHtml(entry.content)), `Missing announcement content: ${entry.title}`)
}
if (!announcementFiles.length) assert(announcements.includes('Trenutno ni objavljenih obvestil.'))

const notFound = await read('dist/404.html')
assert(notFound.includes('Stran ni najdena'))
assert(notFound.includes('noindex'))
assert(!notFound.includes('rel="canonical"'))
assert((await read('dist/admin/index.html')).includes('noindex'))
assert((await read('dist/robots.txt')).includes(`Sitemap: ${siteUrl}/sitemap.xml`))
assert.equal((await read('dist/CNAME')).trim(), new URL(siteUrl).hostname)
await access('dist/.nojekyll')
console.log('Verified all static pages, metadata, CMS content, assets, sitemap, robots.txt, and GitHub Pages files.')
