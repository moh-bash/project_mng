<template>
  <v-container class="hero-container d-flex align-center py-12">
    <v-row align="center" justify="space-between">
      <v-col cols="12" md="6" class="text-center text-md-start z-index-1">
        <v-chip color="primary" variant="tonal" class="mb-6 font-weight-bold" size="small">
          <v-icon start size="small">mdi-star</v-icon>
          {{ $t('home.hero_chip') }}
        </v-chip>
        
        <h1 class="text-h3 text-md-h2 font-weight-black mb-6 text-high-emphasis line-height-tight">
          {{ $t('home.hero_title_1') }}<br> 
          {{ $t('home.hero_title_2') }} <span class="text-primary">{{ $t('home.hero_title_3') }}</span>
        </h1>
        
        <p class="text-h6 text-medium-emphasis mb-8 font-weight-regular">
          {{ $t('home.hero_desc') }}
        </p>
        
        <div class="d-flex justify-center justify-md-start align-center gap-4 flex-wrap">
          <v-btn 
            color="primary" 
            size="x-large" 
            :to="{ name: 'register' }" 
            rounded="pill" 
            elevation="4"
            class="px-8 font-weight-bold"
          >
            {{ $t('home.start_now') }}
            <v-icon :end="locale !== 'ar'" :start="locale === 'ar'" class="mx-2">
              {{ locale === 'ar' ? 'mdi-arrow-left' : 'mdi-arrow-right' }}
            </v-icon>
          </v-btn>
          <v-btn 
            color="surface" 
            variant="outlined" 
            size="x-large" 
            :to="{ name: 'login' }" 
            rounded="pill"
            class="px-8 font-weight-bold text-high-emphasis"
          >
            {{ $t('login') }}
          </v-btn>
        </div>
      </v-col>

      <v-col cols="12" md="6" class="mt-12 mt-md-0 text-center relative">
        <div class="blob-bg"></div>
        <v-img
          src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80"
          alt="Dashboard Preview"
          class="rounded-xl elevation-10 hero-img mx-auto"
          max-width="550"
          cover
          aspect-ratio="4/3"
        >
          <template v-slot:placeholder>
            <div class="d-flex align-center justify-center fill-height bg-surface-variant">
              <v-progress-circular indeterminate color="primary"></v-progress-circular>
            </div>
          </template>
        </v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()
</script>

<style scoped>
.hero-container {
  min-height: 85vh;
}
.gap-4 { gap: 16px; }
.line-height-tight { line-height: 1.3 !important; }
.hero-img {
  transition: transform 0.4s ease-in-out, box-shadow 0.4s ease;
  z-index: 2;
  position: relative;
}
.hero-img:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.2) !important;
}
.relative { position: relative; }
.blob-bg {
  position: absolute;
  top: -10%;
  right: 5%;
  width: 90%;
  height: 110%;
  border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
  z-index: 1;
  background-color: rgb(var(--v-theme-primary));
  opacity: 0.15;
  animation: morph 8s ease-in-out infinite alternate;
}
@keyframes morph {
  0% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
  100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
}
</style>