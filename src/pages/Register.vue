<template>
  <guest-layout>
        <h1 class="my-5">Register</h1>
        <v-alert v-if="authError" type="error">{{ authError }}</v-alert>
        
        <v-form ref="form" @submit.prevent="handleRegister">
          <v-text-field 
            v-model="firstName" 
            label="First Name" 
            :rules="nameRules"/>
          <v-text-field 
            v-model="lastName" 
            label="Last Name" 
            :rules="nameRules"/>
          <v-text-field 
            v-model="email" 
            label="Email" 
            :rules="emailRules"/>
          <v-text-field 
            v-model="password" 
            label="Password" 
            type="password" 
            :rules="passwordRules"/>
          <v-text-field 
            v-model="confirmPassword" 
            label="Confirm Password" 
            type="password" 
            :rules="confirmPasswordRules"/>
          <v-btn 
            :loading="authLoading" 
            :disabled="authLoading" 
            type="submit"
            color="primary"
            block
            class="mt-4">{{ $t('register') }}</v-btn>
        </v-form>
  </guest-layout>
</template>

<script>
import { useAuthStore } from '@/stores/auth';
import { mapState, mapActions } from 'pinia';

export default {
  name: 'RegisterPage',

  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',

      nameRules: [
        v => !!v || 'Required',
        v => (v && v.length >= 3) || 'Min 3 chars',
      ],

      emailRules: [
        v => !!v || 'Required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],

      passwordRules: [
        v => !!v || 'Required',
        v => (v && v.length >= 8) || 'Min 8 chars',
        v => /[A-Z]/.test(v) || 'Must contain an uppercase letter',
        v => /[a-z]/.test(v) || 'Must contain a lowercase letter',
        v => /\d/.test(v) || 'Must contain a number'
      ],

      confirmPasswordRules: [
        v => !!v || 'Required',
        v => v === this.password || 'Passwords must match',
      ],
    };
  },

  computed: {
    ...mapState(useAuthStore, ['authError', 'authLoading', 'token'])
  },

  methods: {
    ...mapActions(useAuthStore, ['register']),

    async handleRegister() {
      const { valid } = await this.$refs.form.validate();
      if (!valid) return;

      try {
        await this.register(this.firstName, this.lastName, this.email, this.password);
        
        if (this.token) {
          this.$router.push('/projects'); 
        }
      } catch (error) {
        console.error('Registration failed:', error);
      }
    }
  },
};
</script>