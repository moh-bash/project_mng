<template>
    <guest-layout>
        <h1 class="my-5">Login</h1>
        <v-alert v-if="authError" type="error" class="mb-4">
             {{ authError }}
        </v-alert>    
        <v-form @submit.prevent="handleLogin">
            <v-text-field label="Email" type="email" v-model="email"/>
            <v-text-field label="Password" type="password" v-model="password"/>
            <v-btn 
            type="submit"
                :loading="authLoading"
                :disabled="authLoading"
                size="x-large" 
                block
                rounded="xl">Login</v-btn>
            <v-btn rounded="xl" 
                size="x-large" 
                block
                :to="'/register'"
                class="mt-4"
                >login up</v-btn>
        </v-form>
    </guest-layout>
    
</template>
<script>
import { useAuthStore } from '@/stores/auth';
import { mapState , mapActions } from 'pinia';
import router from '@/router';

export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: ''
    };
  },

  computed:{
    ...mapState(useAuthStore,['authError','authLoading'])
  },

  methods:{
    ...mapActions(useAuthStore,['login']),
    async handleLogin(){
        try { 
            await this.login({
                email: this.email, 
                password: this.password
            });
        } catch (error) { 
            console.error('Login failed:', error);
        }
    }
}
};
</script>