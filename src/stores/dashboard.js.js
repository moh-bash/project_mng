import { defineStore } from 'pinia'
import { apiurl, getHeader } from "./api"

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    stats: null,
    loading: false,
    error: null
  }),

  getters: {
    totalProjects: (state) => state.stats?.totalProjects || 0,
    totalTasks: (state) => state.stats?.totalTasks || 0,
    statusCounts: (state) => state.stats?.statusCounts || [],

    chartData: (state) => {
      if (!state.stats || !state.stats.dailyStats) {
        return { labels: [], datasets: [] }
      }

      const labels = state.stats.dailyStats.map(d => {
        const date = new Date(d.date)
        return `${date.getMonth() + 1}/${date.getDate()}`
      })

      return {
        labels,
        datasets: [
          {
            label: 'Tasks Created',
            borderColor: '#6366F1',
            backgroundColor: 'rgba(99, 102, 241, 0.1)',
            data: state.stats.dailyStats.map(d => d.created),
            fill: true,
            tension: 0.4,
            borderWidth: 3,
            pointRadius: 2
          },
          {
            label: 'Tasks Finished',
            borderColor: '#10B981',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            data: state.stats.dailyStats.map(d => d.finished),
            fill: true,
            tension: 0.4,
            borderWidth: 3,
            pointRadius: 2
          }
        ]
      }
    },

    chartOptions: () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: true, position: 'bottom' },
        tooltip: { mode: 'index', intersect: false }
      },
      scales: {
        y: { beginAtZero: true, grid: { color: '#F3F4F6' } },
        x: { grid: { display: false } }
      }
    })
  },

  actions: {
    async fetchDashboardData() {
      this.loading = true
      this.error = null
      try {
        const response = await fetch(`${apiurl}/statistics`, { headers: getHeader() })
        if (!response.ok) throw new Error('Failed to fetch dashboard data')
        this.stats = await response.json()
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    }
  }
})
