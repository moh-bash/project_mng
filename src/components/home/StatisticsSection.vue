<template>
  <v-container class="my-10">
    <v-card class="rounded-xl pa-8 bg-surface" elevation="0" border>
      <v-row class="text-center">
        <v-col v-for="(stat, index) in stats" :key="index" cols="12" sm="4">
          <div class="text-h3 font-weight-black text-primary mb-2">{{ stat.value }}</div>
          <div class="text-body-1 text-medium-emphasis font-weight-medium">{{ stat.label }}</div>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const stats = computed(() => [
  { value: '+10k', label: t('home.stats.stat1_label') },
  { value: '99.9%', label: t('home.stats.stat2_label') },
  { value: '+50k', label: t('home.stats.stat3_label') }
])
</script>