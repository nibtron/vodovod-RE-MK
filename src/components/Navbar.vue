<!-- src/components/Navbar.vue -->
<template>
  <nav class="bg-green-950/90 backdrop-blur-sm fixed w-full z-50 text-white font-montserrat">
    <div class="container mx-auto px-6 py-4 flex flex-col gap-3 sm:flex-row sm:justify-between items-center">
      <div class="text-2xl font-semibold tracking-wide uppercase">
        <RouterLink to="/" class="hover:text-blue-300 transition-colors duration-200">Vodovod</RouterLink>
      </div>
      <ul class="flex gap-6 sm:gap-10 text-sm sm:text-nav font-medium tracking-wide">
        <li>
          <RouterLink
            to="/"
            class="hover:text-blue-300 transition-colors duration-200"
          >
            Domov
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/analiza"
            class="hover:text-blue-300 transition-colors duration-200"
          >
            Poročila
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/obvestila"
            class="hover:text-blue-300 transition-colors duration-200"
          >
            Obvestila
          </RouterLink>
        </li>
      </ul>
    </div>
  </nav>
</template>
