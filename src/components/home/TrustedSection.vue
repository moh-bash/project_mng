<template>
  <v-container class="py-8 text-center">
    <p class="text-subtitle-2 text-medium-emphasis mb-6">
      {{ $t('home.companies.title') }}
    </p>
    <v-row justify="center" align="center">
      <v-col v-for="(company, index) in companies" :key="index" cols="6" sm="3" md="2">
        <div class="text-h6 font-weight-bold text-medium-emphasis opacity-60">
          {{ company }}
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const companies = ref(['TechCorp', 'InnoSoft', 'AlphaDev', 'NextGen', 'CloudSync'])
</script>