<template>
  <v-container class="my-16 py-10">
    <v-row class="text-center mb-12">
      <v-col cols="12">
        <h2 class="text-h4 font-weight-bold mb-3 text-high-emphasis">{{ $t('home.how_it_works.title') }}</h2>
        <p class="text-h6 text-medium-emphasis">{{ $t('home.how_it_works.subtitle') }}</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="(step, idx) in steps" :key="idx" cols="12" md="4">
        <div class="text-center px-4">
          <div class="number-badge mx-auto mb-6 d-flex align-center justify-center text-h5 font-weight-bold text-primary rounded-circle">
            {{ idx + 1 }}
          </div>
          <h3 class="text-h6 font-weight-bold mb-3 text-high-emphasis">{{ step.title }}</h3>
          <p class="text-body-1 text-medium-emphasis">{{ step.desc }}</p>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const steps = computed(() => [
  { title: t('home.how_it_works.step1_title'), desc: t('home.how_it_works.step1_desc') },
  { title: t('home.how_it_works.step2_title'), desc: t('home.how_it_works.step2_desc') },
  { title: t('home.how_it_works.step3_title'), desc: t('home.how_it_works.step3_desc') }
])
</script>

<style scoped>
.number-badge {
  width: 64px;
  height: 64px;
  background: rgba(var(--v-theme-primary), 0.1);
}
</style>