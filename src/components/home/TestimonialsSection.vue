<template>
  <v-container class="my-16 py-10">
    <v-row class="text-center mb-10">
      <v-col cols="12">
        <h2 class="text-h4 font-weight-bold mb-3 text-high-emphasis">{{ $t('home.testimonials.title') }}</h2>
        <p class="text-h6 text-medium-emphasis">{{ $t('home.testimonials.subtitle') }}</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="(item, index) in testimonials" :key="index" cols="12" md="4">
        <v-card class="h-100 rounded-xl pa-6 bg-surface d-flex flex-column justify-space-between" elevation="0" border>
          <v-card-text class="text-body-1 text-medium-emphasis font-italic mb-4">
            "{{ item.quote }}"
          </v-card-text>
          <div class="d-flex align-center">
            <v-avatar color="primary" size="40" class="me-3 font-weight-bold text-white">
              {{ item.name[0] }}
            </v-avatar>
            <div>
              <div class="font-weight-bold text-high-emphasis">{{ item.name }}</div>
              <div class="text-caption text-medium-emphasis">{{ item.role }}</div>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const testimonials = computed(() => [
  { quote: t('home.testimonials.q1'), name: t('home.testimonials.t1_name'), role: t('home.testimonials.t1_role') },
  { quote: t('home.testimonials.q2'), name: t('home.testimonials.t2_name'), role: t('home.testimonials.t2_role') },
  { quote: t('home.testimonials.q3'), name: t('home.testimonials.t3_name'), role: t('home.testimonials.t3_role') }
])
</script>