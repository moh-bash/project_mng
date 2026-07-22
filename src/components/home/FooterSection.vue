<template>
  <footer class="footer-section bg-surface py-12 border-top">
    <v-container>
      <v-row justify="space-between" align="center">
        <v-col cols="12" md="4" class="text-center text-md-start mb-6 mb-md-0">
          <div class="text-h6 font-weight-bold text-primary d-flex align-center justify-center justify-md-start mb-2">
            <v-icon start color="primary" class="me-2">mdi-view-dashboard</v-icon>
            {{ $t('home.footer.appName') }}
          </div>
          <p class="text-body-2 text-medium-emphasis">
            {{ $t('home.footer.desc') }}
          </p>
        </v-col>
        <v-col cols="12" md="4" class="text-center mb-6 mb-md-0">
          <div class="d-flex justify-center gap-6">
            <v-btn variant="text" :to="{ name: 'home' }" class="text-medium-emphasis">{{ $t('home.footer.home_link') }}</v-btn>
            <v-btn variant="text" :to="{ name: 'login' }" class="text-medium-emphasis">{{ $t('login') }}</v-btn>
            <v-btn variant="text" :to="{ name: 'register' }" class="text-medium-emphasis">{{ $t('register') }}</v-btn>
          </div>
        </v-col>
        <v-col cols="12" md="4" class="text-center text-md-end">
          <v-btn icon variant="text" class="mx-1 text-medium-emphasis"><v-icon>mdi-twitter</v-icon></v-btn>
          <v-btn icon variant="text" class="mx-1 text-medium-emphasis"><v-icon>mdi-linkedin</v-icon></v-btn>
          <v-btn icon variant="text" class="mx-1 text-medium-emphasis" ><v-icon>mdi-github</v-icon></v-btn>
        </v-col>
      </v-row>
      <v-divider class="my-6"></v-divider>
      <div class="text-center text-caption text-medium-emphasis">
        {{ $t('home.footer.rights') }}
      </div>
    </v-container>
  </footer>
</template>

<style scoped>
.gap-6 { gap: 24px; }
.border-top { border-top: 1px solid rgba(var(--v-theme-on-surface), 0.08); }
</style>