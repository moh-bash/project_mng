<template>
  <v-container class="my-16 py-10">
    <v-card class="rounded-xl pa-8 pa-md-12 bg-surface overflow-hidden position-relative" elevation="0" border>
      <v-row align="center">
        <v-col cols="12" md="7">
          <v-chip color="purple" variant="tonal" class="mb-4 font-weight-bold" size="small">
            <v-icon start size="small">mdi-robot</v-icon>
            {{ $t('home.ai.chip') }}
          </v-chip>
          <h2 class="text-h4 font-weight-bold mb-4 text-high-emphasis">{{ $t('home.ai.title') }}</h2>
          <p class="text-body-1 text-medium-emphasis mb-6">
            {{ $t('home.ai.desc') }}
          </p>
          <v-btn color="primary" variant="flat" rounded="pill" size="large" class="font-weight-bold px-6">
            {{ $t('home.ai.button') }}
          </v-btn>
        </v-col>
        <v-col cols="12" md="5" class="text-center mt-6 mt-md-0">
          <v-icon icon="mdi-head-snowflake-outline" size="120" color="primary" class="ai-icon"></v-icon>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<style scoped>
.ai-icon {
  opacity: 0.85;
  animation: pulse 3s infinite ease-in-out;
}
@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}
</style>