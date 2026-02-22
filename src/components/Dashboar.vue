<template>
  <v-container class="pa-6 grey-lighten-4" fluid>
    <div class="d-flex align-center justify-space-between mb-8">
      <div>
        <h1 class="text-h4 font-weight-black mb-1">Project Insights</h1>
        <p class="text-subtitle-1 text-grey-darken-1">Real-time performance overview</p>
      </div>
      <v-btn icon="mdi-refresh" variant="elevated" color="white" @click="fetchDashboardData" :loading="loading"></v-btn>
    </div>

    <v-row>
      <v-col cols="12" md="3">
        <v-row>
          <v-col cols="6">
            <v-card elevation="2" class="rounded-xl overflow-hidden border-0 h-100">
              <v-card-text class="pa-6">
                <div class="d-flex justify-space-between align-start">
                  <div>
                    <span class="text-overline text-grey-darken-1 font-weight-bold">Total Projects</span>
                    <h2 class="text-h3 font-weight-black mt-1">{{ totalProjects }}</h2>
                  </div>
                  <v-avatar color="indigo-lighten-5" rounded="lg">
                    <v-icon color="indigo">mdi-layers-outline</v-icon>
                  </v-avatar>
                </div>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="6">
            <v-card elevation="2" class="rounded-xl overflow-hidden border-0 h-100">
              <v-card-text class="pa-6">
                <div class="d-flex justify-space-between align-start">
                  <div>
                    <span class="text-overline text-grey-darken-1 font-weight-bold">Total Tasks</span>
                    <h2 class="text-h3 font-weight-black mt-1">{{ totalTasks }}</h2>
                  </div>
                  <v-avatar color="teal-lighten-5" rounded="lg">
                    <v-icon color="teal">mdi-check-circle-outline</v-icon>
                  </v-avatar>
                </div>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12">
            <v-card elevation="2" class="rounded-xl border-0 h-100 pa-2">
              <v-card-title class="text-subtitle-2 font-weight-bold">Status Distribution</v-card-title>
              <v-card-text>
                <div v-for="item in statusCounts" :key="item.status" class="mb-3">
                  <div class="d-flex justify-space-between text-caption mb-1">
                    <span class="font-weight-medium">{{ item.status }}</span>
                    <span class="font-weight-bold text-grey-darken-2">{{ item.count }}</span>
                  </div>
                  <v-progress-linear
                    :model-value="(item.count / totalTasks) * 100"
                    :color="getStatusColor(item.status)"
                    height="6"
                    rounded
                  ></v-progress-linear>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" md="9">
        <v-card elevation="2" class="rounded-xl border-0 pa-6">
          <h3 class="text-h6 font-weight-bold mb-6">Activity Timeline</h3>
          <div style="height: 400px;">
            <LineChart v-if="!loading && chartData.labels.length" :data="chartData" :options="chartOptions" />
            <div v-else class="fill-height d-flex align-center justify-center">
               <v-progress-circular indeterminate color="indigo"></v-progress-circular>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>


  </v-container>
</template>

<script>
import { mapState, mapActions } from "pinia"
import { useDashboardStore } from "@/stores/dashboard.js"
import { Line as LineChart } from "vue-chartjs"
import {
  Chart as ChartJS, Title, Tooltip, Legend, LineElement,
  CategoryScale, LinearScale, PointElement, Filler
} from "chart.js"

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, Filler)

export default {
  components: { LineChart },
  computed: {
    ...mapState(useDashboardStore, ['totalProjects', 'totalTasks', 'statusCounts', 'chartData', 'chartOptions', 'loading'])
  },
  methods: {
    ...mapActions(useDashboardStore, ['fetchDashboardData']),
    getStatusColor(status) {
      const colors = {
        'To Do': 'grey-darken-1',
        'In Progress': 'indigo',
        'Review': 'orange-darken-1',
        'Done': 'teal'
      }
      return colors[status] || 'blue'
    }
  },
  mounted() {
    this.fetchDashboardData()
  }
}
</script>

<style scoped>
.v-card {
  transition: all 0.3s ease;
}
.v-card:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 10px rgba(0,0,0,0.08) !important;
}
</style>
