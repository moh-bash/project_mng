<template>
  <v-app-bar density="comfortable" class="bg-primary px-6" height="64" elevation="4">

    <div v-if="Layoutppp && user" class="d-flex align-center">
      <v-menu offset-y location="bottom end">
        <template #activator="{ props }">
          <div v-bind="props" class="d-flex align-center cursor-pointer">
            <v-avatar color="secondary" size="36">
              <span class="text-h6 text-background">{{ user.name ? user.name[0] : '' }}</span>
            </v-avatar>
          </div>
        </template>

        <v-card min-width="250" class="mt-2">
          <v-list-item class="bg-grey-lighten-4">
            <template #prepend>
              <v-avatar color="blue-lighten-2" size="40">
                <span class="text-h6 text-white">{{ user.name ? user.name[0] : '' }}</span>
              </v-avatar>
            </template>
            <v-list-item-title class="font-weight-bold">{{ user.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
          </v-list-item>

          <v-divider></v-divider>

          <v-list density="compact">
            <v-list-item link @click="$router.push({ name: 'UserProfile' })">
              <v-icon>mdi-account-circle</v-icon>
              <v-list-item-title>{{ $t('profile') }}</v-list-item-title>
            </v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-card-actions>
            <v-btn color="error" variant="flat" block @click="handleLogout">
              <v-icon start>mdi-logout</v-icon>
              {{ $t('logout') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </div>

    <v-btn class="bg-secondary text-primary" rounded="xl" @click="$router.push({ name: 'login' })" v-else>
      {{ $t('login') }}
    </v-btn>

    <h1 class="text-h5 font-weight-bold text-white mx-2">{{ $t('project_manager') }}</h1>
    <v-spacer></v-spacer>

    <div class="d-flex align-center">
      <v-btn icon @click="toggleLanguage" class="me-2">
        <v-icon color="white">mdi-web</v-icon>
      </v-btn>

      <v-btn icon @click="toggleTheme" class="me-2">
        <v-icon color="white">{{ isDark ? 'mdi-white-balance-sunny' : 'mdi-moon-waning-crescent' }}</v-icon>
      </v-btn>

      <v-btn v-if="Layoutppp" icon @click="invitationsDrawer = true">
        <v-badge v-if="pendingCount > 0" :content="pendingCount" color="red" overlap>
          <v-icon color="white">mdi-bell-outline</v-icon>
        </v-badge>
        <v-icon v-else color="white">mdi-bell-outline</v-icon>
      </v-btn>
    </div>
  </v-app-bar>

  <v-navigation-drawer v-model="invitationsDrawer" location="end" temporary>
    <v-list-item class="bg-primary text-white">
      <v-list-item-title class="text-h6">
        <v-icon start>mdi-bell-outline</v-icon>
        {{ $t('invitations') }} ({{ pendingCount }})
      </v-list-item-title>
    </v-list-item>
    <v-divider></v-divider>

    <v-list v-if="pendingInvitations.length" class="pa-4">
      <CardInvitation v-for="invite in pendingInvitations" :key="invite.id" :invitation="invite" />
    </v-list>
    <div v-else class="pa-4 text-center text-medium-emphasis">
      {{ $t('no_invitations') }}
    </div>
  </v-navigation-drawer>
</template>

<script>
import { useTheme, useLocale } from 'vuetify';
import { useAuthStore } from '@/stores/auth';
import { useInvitationsStore } from '@/stores/invitations';
import { mapState, mapActions } from 'pinia';
import CardInvitation from '@/components/invitation/CardInvitation.vue';
import i18n from '@/plugins/i18n';

export default {
  components: { CardInvitation },
  data() {
    return {
      invitationsDrawer: false,
      vuetifyTheme: null,
      vuetifyLocale: null,
    };
  },
  computed: {
    ...mapState(useAuthStore, ['user']),
    ...mapState(useInvitationsStore, ['pendingInvitations', 'pendingCount']),
    isDark() {
      return this.vuetifyTheme?.global?.name === 'dark';
    },

    Layoutppp() {
      return this.$route.meta.layout;
    },
  },
  methods: {
    ...mapActions(useAuthStore, ['logout', 'profile']),
    ...mapActions(useInvitationsStore, ['fetchInvitations']),

    toggleTheme() {
      if (!this.vuetifyTheme) return;
      this.vuetifyTheme.global.name = this.isDark ? 'light' : 'dark';
      localStorage.setItem('theme', this.vuetifyTheme.global.name);
    },

    toggleLanguage() {
      const current = i18n.global.locale.value;
      const newLang = current === 'en' ? 'ar' : 'en';

      i18n.global.locale.value = newLang;

      if (this.$vuetify) {
        this.$vuetify.locale.current = newLang;
      } else if (this.vuetifyLocale) {
        this.vuetifyLocale.current.value = newLang;
      }

      localStorage.setItem('lang', newLang);
      document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = newLang;
    },

    handleLogout() {
      this.logout();
      this.$router.push({ name: 'login' });
    },
  },
  async created() {
    this.vuetifyTheme = useTheme();
    this.vuetifyLocale = useLocale();
    await this.profile();
    await this.fetchInvitations();

    const lang = localStorage.getItem('lang') || i18n.global.locale.value || 'en';

    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;

    if (this.$vuetify) {
      this.$vuetify.locale.current = lang;
    }
  },
};
</script>
