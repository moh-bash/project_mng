<template>
  <guest-layout>
        <h1 class="my-5">Register</h1>
        <v-alert v-if="authError" type="error">{{ authError }}</v-alert>
        <v-form @submit.prevent="handleRegister">
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
            type="submit">Register</v-btn>
        </v-form>
  </guest-layout>
</template>
<script>
import { useAuthStore } from '@/stores/auth';
import { mapState , mapActions } from 'pinia';

export default {
  name: 'RegisterPage',

  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',

      nameRules:[
        v => !!v || 'required',
        v => v.length > 3 || 'min 3 chars',
      ],

      emailRules:[
        v => !!v || 'required',
        v => /.+@.+\..+/.test(v) || 'e-mail must be valid',
      ],

      passwordRules:[
        v => !!v || 'required',
        v => v.length > 8 || 'min 8 chars',
        v => /[A-Z]/.test(v) || 'A-Z',
        v => /[a-z]/.test(v) || 'a-z',
        v => /\d/.test(v) || '1-9'
      ],

      confirmPasswordRules:[
        v => !!v || 'required',
        v => v === this.password || 'passwords must match',
      ],
    };
  },

  computed:{
    ...mapState(useAuthStore,['authError','authLoading','token'])
  },

  methods:{
        ...mapActions(useAuthStore,['register']),
        async handleRegister(){
          this.authError = null;
          if(this.password !== this.confirmPassword){
              this.authError = "Passwords do not match.";
              return;
          }
          if(!this.firstName || !this.lastName || !this.email || !this.password || !this.confirmPassword){
              this.authError = "All fields are required ";
              return;
          }
          try {
            await this.register(this.firstName, this.lastName, this.email, this.password);
            if (this.token) {
            this.$router.push('/auth/login');
            }
            } catch (error) {
                console.error('Registration failed:', error);
            }
        }
    },
};
</script>