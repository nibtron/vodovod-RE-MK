<template>
  <div class="min-h-screen flex flex-col">
    <Navbar />
    <main class="flex-1 bg-[#f9f5ef] px-6 pt-40 pb-20 text-green-900">
      <div class="max-w-4xl mx-auto">
        <h1 class="font-ameda text-5xl mb-6">Stran ni najdena</h1>
        <p class="mb-6">Iskane strani ni mogoče najti.</p>
        <RouterLink to="/" class="underline">Nazaj na domačo stran</RouterLink>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
</script>
