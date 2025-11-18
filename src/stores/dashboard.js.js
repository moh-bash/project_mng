import { defineStore } from 'pinia'
import { apiurl, getHeader } from "./api";

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    stats: null,
    loading: false,
    error: null
  }),

  actions: {
    async fetchDashboard() {
      this.loading = true
      this.error = null

      try {
        const response = await fetch(`${apiurl}/statistics`, {
          headers: getHeader()
        })

        if (!response.ok) {
          throw new Error('Failed to fetch dashboard data')
        }

        const data = await response.json()
        this.stats = data
      } catch (err) {
        console.error('Error fetching dashboard data:', err)
        this.error = err.message
      } finally {
        this.loading = false
      }
    }
  }
})
