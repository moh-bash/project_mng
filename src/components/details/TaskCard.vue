<template>
  <v-card :color="task.status.color" class="elevation-4 rounded-lg text-start mt-3 cursor-pointer">
    <v-progress-linear v-if="loading" indeterminate color="primary"></v-progress-linear>
    <v-card-text class="text-start py-0 pt-2">{{ task.name }}</v-card-text>
    <v-card-subtitle class="text-start text-caption py-1">{{
      task.description
    }}</v-card-subtitle>
    <div class="bg-surface py-1 mx-1 rounded-t-lg">
      <v-chip prepend-icon="mdi-sort-calendar-descending" color="surface" variant="flat" size="x-small">
        {{ task.startDate }}
      </v-chip>
      <v-chip prepend-icon=" mdi-sort-calendar-ascending" color="surface" variant="flat" size="x-small" class="ms-2">
        {{ task.endDate }}
      </v-chip>
      <v-chip prepend-icon="mdi-account-circle" color="surface" variant="flat" size="x-small" class="ms-2">
        {{ task.user.name }}
      </v-chip>
    </div>
    <div class="bg-surface py-1 mx-1 rounded-t-lg">
      <v-btn density="compact" icon="mdi-pencil" class="elevat me-3" @click="$emit('edittask', task)">
      </v-btn>
      <v-btn density="compact" icon="mdi-trash-can-outline" class="elevat me-3 text-error" @click="openDeletl">
      </v-btn>
    </div>

    <v-divider></v-divider>
    <div></div>
  </v-card>
  <v-dialog v-model="onDelete" max-width="300">
    <v-card>
      <v-card-title class="bg-error py-2"> Delete </v-card-title>
      <v-card-text> are yu sure you want to delet the task </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn :loading="tasksLoading" @click="closedelete"> close </v-btn>
        <v-btn color="error" :loading="tasksLoading" @click="deletetask">
          Delete0
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { useTasksStore } from "@/stores/tasks";
import { mapActions } from "pinia";

export default {
  name: "TaskCard",
  props: {
    task: {
      type: Object,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    }
  },


  data() {
    return {
      onDelete: false,
    };
  },

  methods: {
    ...mapActions(useTasksStore, ["deleteTask"]),

    openDeletl() {
      this.onDelete = true;
    },

    closedelete() {
      this.onDelete = false;
    },

    async deletetask() {
      const tasksStore = useTasksStore();
      try {
        await tasksStore.deleteTask(this.task.id);
        this.onDelete = false;
      } catch (err) {
        console.error("Error deleting task:", err);
      }
    },
  },

  mounted() { },
};
</script>
