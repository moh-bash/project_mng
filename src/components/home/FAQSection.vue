<template>
  <v-container class="my-16 py-10">
    <v-row class="text-center mb-10">
      <v-col cols="12">
        <h2 class="text-h4 font-weight-bold mb-3 text-high-emphasis">{{ $t('home.faq.title') }}</h2>
        <p class="text-h6 text-medium-emphasis">{{ $t('home.faq.subtitle') }}</p>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-expansion-panels variant="accordion">
          <v-expansion-panel
            v-for="(faq, i) in faqs"
            :key="i"
            :title="faq.q"
            :text="faq.a"
            class="rounded-lg mb-3 bg-surface"
          ></v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const faqs = computed(() => [
  { q: t('home.faq.q1'), a: t('home.faq.a1') },
  { q: t('home.faq.q2'), a: t('home.faq.a2') },
  { q: t('home.faq.q3'), a: t('home.faq.a3') }
])
</script>