import { createRouter } from 'vue-router'
import { pages, notFoundPage, updateSeo } from '../seo.js'

import HomeView from '@/views/HomeView.vue'
import AnalysisView from '@/views/AnalysisView.vue'
import AnnouncementsView from '@/views/AnnouncementsView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

const routes = [
  { path: pages[0].path, name: 'Home', component: HomeView, meta: pages[0] },
  { path: pages[1].path, name: 'Analiza', component: AnalysisView, meta: pages[1] },
  { path: pages[2].path, name: 'Obvestila', component: AnnouncementsView, meta: pages[2] },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundView, meta: notFoundPage },
]

export function createSiteRouter(history) {
  const router = createRouter({
    history,
    routes,
    scrollBehavior: (_to, _from, savedPosition) => savedPosition || { top: 0 },
  })
  router.afterEach((to) => {
    if (typeof document !== 'undefined') updateSeo(to.meta)
  })
  return router
}
