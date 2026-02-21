<template>
    <guest-layout>
        <h1 class="my-5">{{$t('login')}}</h1>
        <v-alert v-if="authError" type="error" class="mb-4">
             {{ authError }}
        </v-alert>
        <v-form @submit.prevent="handleLogin">
            <v-text-field
                class="mt-6"
                :label="$t('email')"
                type="email"
                v-model="email"
                :rules="[ v => !!v || $t('required')]" />

            <v-text-field
                :label="$t('password')"
                type="password"
                v-model="password"
                :rules="[ v => !!v || $t('required')]" />

            <v-btn
              type="submit"
              color="primary"
              :loading="authLoading"
              :disabled="authLoading"
              size="x-large"
              class="mt-6"
              block
              rounded="xl">{{$t('login')}}
            </v-btn>

            <v-btn text
              color="primary"
              :to="'/register'"
              class="mt-4"
              variant="text"
              >{{$t('register')}}
            </v-btn>
        </v-form>
    </guest-layout>

</template>
<script>
import { useAuthStore } from '@/stores/auth';
import { mapState , mapActions } from 'pinia';


export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
    };
  },

  computed:{
    ...mapState(useAuthStore,['authError','authLoading','token'])
  },

  methods:{
    ...mapActions(useAuthStore,['login' ]),
    async handleLogin(){
        try {
            await this.login(this.email, this.password);
            if (this.token) {
            this.$router.push('/pages/projects');
        }
        } catch (error) {
            console.error('Login failed:', error);
        }
    },

},


};
</script>
