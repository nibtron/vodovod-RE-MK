// src/main.js
import { createApp, createSSRApp } from 'vue'
import { createWebHistory } from 'vue-router'
import App from './App.vue'
import { createSiteRouter } from './rounter/index.js'
import { pages } from './seo.js'

import './index.css' // if using Tailwind

// Keep bookmarks and links to the former hash-based pages working.
if (window.location.hash.startsWith('#/')) {
  const legacyUrl = new URL(window.location.hash.slice(1), window.location.origin)
  const page = pages.find(({ path }) => path.replace(/\/$/, '') === legacyUrl.pathname.replace(/\/$/, ''))
  if (legacyUrl.origin === window.location.origin && page) {
    window.history.replaceState(window.history.state, '', page.path + legacyUrl.search + legacyUrl.hash)
  }
}

const router = createSiteRouter(createWebHistory(import.meta.env.BASE_URL))
const root = document.getElementById('app')
// A legacy hash link may select a different page from the generated HTML.
const hydrate = root.dataset.page === window.location.pathname
const app = (hydrate ? createSSRApp : createApp)(App)
app.use(router)
router.isReady().then(() => app.mount(root))
