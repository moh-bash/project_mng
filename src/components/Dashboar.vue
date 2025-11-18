<template>
  <v-container class="pa-6">
    <h1 class="text-h5 mb-6">
       Dashboard</h1>

    <v-row>
      <!-- Cards Section -->
      <v-col cols="12" md="4">
        <v-card class="pa-4 text-center">
          <v-card-title>Total Projects</v-card-title>
          <v-card-text class="text-h4 font-weight-bold">{{ totalProjects }}</v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card class="pa-4 text-center">
          <v-card-title>Total Tasks</v-card-title>
          <v-card-text class="text-h4 font-weight-bold">{{ totalTasks }}</v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card class="pa-4 text-center">
          <v-card-title>Status Count</v-card-title>
          <v-card-text>
            <div v-for="(item, index) in statusCounts" :key="index" class="d-flex justify-space-between">
              <span>{{ item.status }}</span>
              <strong>{{ item.count }}</strong>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Chart Section -->
    <v-card class="mt-8 pa-4">
      <v-card-title>Daily Activity</v-card-title>
      <v-card-text>
        <div style="height: 350px;">
          <Line :data="chartData" :options="chartOptions" />
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { onMounted } from "vue";
import { useDashboardStore } from "@/stores/dashboard.js";
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

const dashboardStore = useDashboardStore();

onMounted(() => {
  dashboardStore.fetchDashboardData();
});

const totalProjects = computed(() => dashboardStore.totalProjects);
const totalTasks = computed(() => dashboardStore.totalTasks);
const statusCounts = computed(() => dashboardStore.statusCounts);
const chartData = computed(() => dashboardStore.chartData);
const chartOptions = computed(() => dashboardStore.chartOptions);
</script>

<style scoped>
.v-card {
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}
</style>
