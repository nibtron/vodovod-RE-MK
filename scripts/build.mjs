import { build } from 'vite'
import { mkdir, readFile, writeFile, copyFile } from 'node:fs/promises'
import { resolve, dirname } from 'node:path'
import { pathToFileURL } from 'node:url'
import { pages, notFoundPage, renderSeoHead, siteUrl } from '../src/seo.js'

// Build the browser assets, then render the same Vue views to static HTML.
await build()
await build({
  build: {
    ssr: 'src/entry-server.js',
    outDir: '.cache/prerender',
    emptyOutDir: true,
    copyPublicDir: false,
  },
})
const { render } = await import(pathToFileURL(resolve('.cache/prerender/entry-server.js')).href)
const template = await readFile('dist/index.html', 'utf8')

for (const page of [...pages, { ...notFoundPage, path: '/404.html' }]) {
  const isNotFound = page.path === '/404.html'
  const head = renderSeoHead(isNotFound ? notFoundPage : page)
  const content = await render(page.path)
  const html = template
    .replace(/<!--seo-head-start-->[\s\S]*?<!--seo-head-end-->/, head)
    .replace('<div id="app"></div>', () => `<div id="app" data-page="${page.path}">${content}</div>`)
  const destination = isNotFound ? 'dist/404.html' : `dist${page.path}index.html`
  await mkdir(dirname(destination), { recursive: true })
  await writeFile(destination, html)
  console.log(`Generated ${destination}`)
}

// One source of truth for routes and search metadata; never use hash URLs here.
await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(({ path }) => `  <url><loc>${siteUrl}${path}</loc></url>`).join('\n')}
</urlset>
`)
await copyFile('CNAME', 'dist/CNAME')
await writeFile('dist/.nojekyll', '')
