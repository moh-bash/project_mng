<template>
  <v-container class="my-16 py-10">
    <v-row>
      <v-col cols="12" class="text-center mb-10">
        <h2 class="text-h4 font-weight-bold mb-3 text-high-emphasis">{{ $t('home.features_title') }}</h2>
        <p class="text-h6 text-medium-emphasis">{{ $t('home.features_subtitle') }}</p>
      </v-col>
    </v-row>

    <v-row>
      <v-col v-for="(feature, i) in features" :key="i" cols="12" md="4">
        <v-card class="h-100 rounded-xl text-center pa-8 hover-card bg-surface" elevation="0" border>
          <v-avatar color="primary" variant="tonal" size="80" class="mb-6">
            <v-icon :icon="feature.icon" size="40" color="primary"></v-icon>
          </v-avatar>
          <v-card-title class="text-h5 font-weight-bold mb-2 text-high-emphasis">
            {{ $t(feature.titleKey) }}
          </v-card-title>
          <v-card-text class="text-body-1 text-medium-emphasis leading-relaxed">
            {{ $t(feature.descKey) }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const features = ref([
  {
    icon: 'mdi-view-dashboard-outline',
    titleKey: 'home.features.dashboard.title',
    descKey: 'home.features.dashboard.desc'
  },
  {
    icon: 'mdi-account-group-outline',
    titleKey: 'home.features.collaboration.title',
    descKey: 'home.features.collaboration.desc'
  },
  {
    icon: 'mdi-chart-line',
    titleKey: 'home.features.analytics.title',
    descKey: 'home.features.analytics.desc'
  }
])
</script>

<style scoped>
.hover-card {
  transition: all 0.3s ease;
  border: 1px solid rgba(var(--v-theme-on-surface), 0.08) !important;
}
.hover-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 30px rgba(var(--v-theme-on-surface), 0.08) !important;
  border-color: transparent !important;
}
.leading-relaxed { line-height: 1.6 !important; }
</style>