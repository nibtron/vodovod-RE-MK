<template>
  <section
    class="relative bg-cover bg-center bg-no-repeat py-20 px-8 md:px-16"
    :style="{ backgroundImage: `url(${bgUrl})` }"
  >
    <!-- soft overlay so text stays readable (optional) -->
    <div class="absolute inset-0 bg-[#f9f5ef]/80"></div>

    <div class="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row md:items-stretch md:gap-16">
      <!-- Left column: fixed width = 28rem to match Analysis -->
      <div class="relative basis-[28rem] shrink-0 md:min-h-[685px] mb-12 md:mb-0">
        <!-- Bottom-pinned title + paragraph -->
        <div class="absolute inset-x-0 bottom-0">
          <p class="uppercase text-green-900 text-sm">Vzdrževanje in kakovost</p>
          <h2 class="text-5xl text-green-900 font-ameda mb-4">Skrb za Sistem</h2>
          <p class="text-gray-700 text-sm">
            Naša ekipa skozi vse leto skrbi za vzdrževanje sistema. S tem zagotavljamo
            zanesljivo in varno oskrbo z vodo za vsak dom in kmetijo.
          </p>
        </div>
      </div>

      <!-- Right column: exactly two cards -->
      <div class="flex flex-col sm:flex-row gap-8">
        <div
          v-for="(card, i) in cards"
          :key="i"
          class="relative group rounded-3xl overflow-hidden shadow-lg w-full sm:w-[415px] h-[685px]"
        >
          <!-- Images -->
          <img
            :src="card.img"
            :alt="card.title"
            class="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
          />
          <img
            :src="card.hoverImg"
            :alt="card.title"
            class="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />

          <!-- Bottom gradient for readability -->
          <div class="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none"></div>

          <!-- Text pinned to bottom; titles aligned via fixed desc height -->
          <div class="absolute inset-x-0 bottom-6 z-10 px-7">
            <h3 class="text-white font-semibold text-2xl leading-tight mb-3">
              {{ card.title }}
            </h3>
            <p class="text-white/90 text-base leading-relaxed line-clamp-2 h-[80px]">
              {{ card.text }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// 👇 Replace with your actual asset path
import bgUrl from '@/assets/images/img-sistem-background.jpg'
import system3 from '@/assets/images/img-sistem3.jpeg'
import system3Hover from '@/assets/images/img-sistem3.1.jpeg'
import system2 from '@/assets/images/img-sistem2.jpeg'
import system2Hover from '@/assets/images/img-sistem2.1.jpeg'

const cards = [
  {
    title: "Varnost v vsaki kapljici",
    text: "Na terenu zagotavljamo, da je voda za vaše vsakdanje potrebe čista in varna.",
    img: system3,
    hoverImg: system3Hover,
  },
  {
    title: "Temelj varnosti",
    text: "Naša robustna infrastruktura zagotavlja zanesljivo oskrbo z vodo tudi v nujnih primerih.",
    img: system2,
    hoverImg: system2Hover,
  }
]
</script>

<style scoped>
.line-clamp-2{
  display:-webkit-box;
  -webkit-line-clamp:2;
  -webkit-box-orient:vertical;
  overflow:hidden;
}
</style>
