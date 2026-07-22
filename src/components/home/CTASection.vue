<template>
  <v-container class="my-16">
    <v-card class="rounded-xl pa-10 pa-md-16 text-center bg-primary text-white" elevation="6">
      <h2 class="text-h3 font-weight-black mb-4">{{ $t('home.cta.title') }}</h2>
      <p class="text-h6 mb-8 opacity-90 max-w-600 mx-auto">
        {{ $t('home.cta.subtitle') }}
      </p>
      <div class="d-flex justify-center gap-4 flex-wrap">
        <v-btn 
          color="white" 
          size="x-large" 
          :to="{ name: 'register' }" 
          rounded="pill"
          class="px-8 font-weight-bold text-primary"
        >
          {{ $t('home.cta.button') }}
        </v-btn>
      </div>
    </v-card>
  </v-container>
</template>

<style scoped>
.gap-4 { gap: 16px; }
.max-w-600 { max-width: 600px; }
</style>