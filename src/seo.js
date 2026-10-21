export const siteUrl = 'https://vodovod-restanj-mali-kamen.eu'

export const pages = [
  {
    path: '/',
    title: 'Vodovod Reštanj - Mali Kamen',
    description: 'Vodovod Reštanj – Mali Kamen: informacije o vodovodnem sistemu, oskrbi s pitno vodo, poročila o kakovosti vode in obvestila za krajane.',
  },
  {
    path: '/analiza/',
    title: 'Poročila o kakovosti vode | Vodovod Reštanj - Mali Kamen',
    description: 'Analize pitne vode, letna poročila in poročila o kakovosti vode za vodovod Reštanj – Mali Kamen. Preglejte objavljena poročila po letih.',
  },
  {
    path: '/obvestila/',
    title: 'Obvestila | Vodovod Reštanj - Mali Kamen',
    description: 'Novosti in pomembna obvestila za uporabnike vodovoda Reštanj – Mali Kamen o oskrbi s pitno vodo in delovanju vodovoda.',
  },
]

export const notFoundPage = {
  title: 'Stran ni najdena | Vodovod Reštanj - Mali Kamen',
  description: 'Iskane strani ni mogoče najti. Obiščite domačo stran vodovoda Reštanj – Mali Kamen.',
  robots: 'noindex, follow',
}

const escapeHtml = (value) => value.replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[character])

// Used in generated HTML and on client-side navigation so metadata stays in sync.
export function seoTags(page) {
  return [
    { tag: 'meta', attributes: { name: 'description', content: page.description } },
    { tag: 'meta', attributes: { name: 'robots', content: page.robots || 'index, follow' } },
    { tag: 'meta', attributes: { property: 'og:type', content: 'website' } },
    { tag: 'meta', attributes: { property: 'og:locale', content: 'sl_SI' } },
    { tag: 'meta', attributes: { property: 'og:site_name', content: pages[0].title } },
    { tag: 'meta', attributes: { property: 'og:title', content: page.title } },
    { tag: 'meta', attributes: { property: 'og:description', content: page.description } },
    ...(page.path ? [
      { tag: 'link', attributes: { rel: 'canonical', href: siteUrl + page.path } },
      { tag: 'meta', attributes: { property: 'og:url', content: siteUrl + page.path } },
    ] : []),
  ]
}

export function renderSeoHead(page) {
  return [
    `<title>${escapeHtml(page.title)}</title>`,
    ...seoTags(page).map(({ tag, attributes }) =>
      `<${tag} ${Object.entries(attributes).map(([key, value]) => `${key}="${escapeHtml(value)}"`).join(' ')} />`,
    ),
  ].join('\n    ')
}

export function updateSeo(page) {
  document.title = page.title
  document.querySelectorAll('meta[name="description"], meta[name="robots"], meta[property^="og:"], link[rel="canonical"]').forEach((element) => element.remove())
  for (const { tag, attributes } of seoTags(page)) {
    const element = document.createElement(tag)
    for (const [key, value] of Object.entries(attributes)) element.setAttribute(key, value)
    document.head.appendChild(element)
  }
}
