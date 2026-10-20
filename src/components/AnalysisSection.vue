<template>
  <section class="bg-[#f9f5ef] py-20 px-8 md:px-16">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row md:items-start md:gap-16">
      <!-- Left column: match width with the cards section -->
      <div class="basis-[28rem] shrink-0">
        <p class="uppercase text-green-900 text-sm">Naša zaveza kakovosti</p>
        <h2 class="text-4xl text-green-900 font-ameda mb-4">Poročila</h2>
        <p class="text-gray-600 text-sm">
          Naša prva skrb je varna in kakovostna voda za vse krajane. Zaradi popolne transparentnosti tukaj javno objavljamo vsa uradna poročila in s tem krepimo medsebojno zaupanje.  
        </p>

        <div class="mt-8">
          <p class="font-semibold text-lg text-gray-700 mb-2">Izberite leto:</p>
          <ul class="flex flex-wrap gap-2">
            <li v-for="year in years" :key="year">
              <button
                class="px-4 py-1 rounded-full text-sm border"
                :class="{
                  'bg-green-800 text-white': +year === selectedYear,
                  'bg-white text-gray-700': +year !== selectedYear,
                }"
                @click="selectedYear = +year"
              >
                {{ year }}
              </button>
            </li>
          </ul>
        </div>
      </div>

      <!-- Right column (Reports) -->
      <div class="grid grid-cols-1 gap-6 mt-10 md:mt-0 flex-1">
        <div v-for="report in reports[selectedYear]" :key="report.pdf">
          <h3 class="font-semibold text-lg text-gray-800 mb-2">{{ report.title }}</h3>
          <a
            :href="reportUrl(report.pdf)"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-block border px-4 py-2 rounded-md hover:bg-gray-100 transition"
          >
            Odpri poročilo (PDF) →
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'

const baseURL = import.meta.env.BASE_URL
const reportUrl = (path) => `${baseURL}${path.replace(/^\/+/, '')}`
const yearEntries = Object.values(
  import.meta.glob('../data/report-years/*.json', { eager: true, import: 'default' })
)

const reports = computed(() =>
  Object.fromEntries(yearEntries.map(({ title, reports }) => [Number(title), reports]))
)
const years = computed(() => Object.keys(reports.value).sort((a, b) => b - a))
const selectedYear = ref(Math.max(...years.value.map(Number)))
</script>
