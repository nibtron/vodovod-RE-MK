import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { createMemoryHistory } from 'vue-router'
import App from './App.vue'
import { createSiteRouter } from './rounter/index.js'

export async function render(path) {
  const app = createSSRApp(App)
  const router = createSiteRouter(createMemoryHistory())
  app.use(router)
  await router.push(path)
  await router.isReady()
  return renderToString(app)
}
