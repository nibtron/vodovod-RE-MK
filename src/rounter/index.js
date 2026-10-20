// src/router/index.js
import { createRouter, createWebHashHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import AnalysisView from '@/views/AnalysisView.vue'
import AnnouncementsView from '@/views/AnnouncementsView.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/analiza', name: 'Analiza', component: AnalysisView },
  { path: '/obvestila', name: 'Obvestila', component: AnnouncementsView },
]

const router = createRouter({
  history: createWebHashHistory(), // ✅ Use hash history here
  routes,
})

export default router
