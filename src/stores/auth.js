import { defineStore } from "pinia";
import { apiurl, getHeader } from "./api";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: localStorage.getItem("token") || null,
    authLoading: false,
    authError: null,
  }),

  actions: {
    async login(email, password) {
      this.authLoading = true;
      this.authError = null;
      try {
        let res = await fetch(`${apiurl}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });
        let data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || "Login failed");
        }
        this.user = data.user;
        this.token = data.access_token;
        localStorage.setItem("token", this.token);
      } catch (error) {
        this.authError = error.message;
        this.user = null;
        this.token = null;
        localStorage.removeItem("token");
      } finally {
        this.authLoading = false;
      }
    },

    async register(firstName, lastName, email, password) {
      this.authLoading = true;
      this.authError = null;
      try {
        let res = await fetch(`${apiurl}/auth/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
          }),
        });
        let data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || "Registration failed");
        }
        this.user = data.user;
        this.token = data.access_token;
        localStorage.setItem("token", this.token);
      } catch (error) {
        this.authError = error.message;
        this.user = null;
        this.token = null;
        localStorage.removeItem("token");
      } finally {
        this.authLoading = false;
      }
    },

    async logout() {
      this.authLoading = true;
      this.authError = null;

      this.user = null;
      this.token = null;

      localStorage.removeItem("token");
      this.authLoading = false;
    },

    async profile() {
      this.authLoading = true;
      this.authError = null;
      try {
        const res = await fetch(`${apiurl}/auth/profile`, {
          method: "GET",
          headers: { ...getHeader() },
        });

        if (!res.ok) {
          let errorData = await res.json();
          throw new Error(errorData.message || "Failed to fetch user profile");
        }

        let data = await res.json();

        this.user = data;
      } catch (error) {
        console.error("Profile fetch error:", error);
        this.authError = error.message;
        this.user = null;
        throw error;
      } finally {
        this.authLoading = false;
      }
    },
  },
});
