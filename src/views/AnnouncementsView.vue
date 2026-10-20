<template>
  <div class="min-h-screen flex flex-col">
    <Navbar />
    <main class="flex-1 bg-[#f9f5ef] pt-36 pb-16 sm:pt-32 md:pb-20">
      <section aria-labelledby="announcements-heading" class="px-6 md:px-16">
        <div class="max-w-7xl mx-auto grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16">
          <div>
            <p class="uppercase text-green-900 text-sm tracking-wide mb-2">Za našo skupnost</p>
            <h1 id="announcements-heading" class="text-4xl md:text-5xl text-green-900 font-ameda mb-4">
              Obvestila
            </h1>
            <p class="text-gray-600 text-sm leading-relaxed">
              Novosti in pomembne informacije o oskrbi z vodo ter delovanju našega vodovoda.
            </p>
          </div>
          <div class="min-w-0">
            <div v-if="announcements.length" class="space-y-10">
              <article
                v-for="announcement in announcements"
                :key="announcement.path"
                class="border-b border-green-900/15 pb-10 last:border-b-0 last:pb-0"
              >
                <time :datetime="announcement.date" class="block text-sm text-green-800 mb-3">
                  {{ formatDate(announcement.date) }}
                </time>
                <h2 class="font-ameda text-3xl md:text-4xl text-green-900 leading-tight break-words mb-4">
                  {{ announcement.title }}
                </h2>
                <p class="text-gray-700 leading-relaxed whitespace-pre-wrap break-words">{{ announcement.content }}</p>
              </article>
            </div>
            <p v-else class="border-t border-green-900/15 pt-6 text-gray-600 leading-relaxed">
              Trenutno ni objavljenih obvestil.
            </p>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

const entries = import.meta.glob('../data/announcements/*.json', { eager: true, import: 'default' })
const announcements = Object.entries(entries)
  .map(([path, entry]) => ({ ...entry, path }))
  .sort((a, b) => b.date.localeCompare(a.date) || a.path.localeCompare(b.path))

const dateFormatter = new Intl.DateTimeFormat('sl-SI', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
})
const formatDate = (date) => dateFormatter.format(new Date(`${date}T00:00:00Z`))
</script>
