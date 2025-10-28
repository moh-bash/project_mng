
<template>
  <div>
    <v-container>
      <div class="d-flex justify-space-between align-center mb-6">
        <h2 class="text-start mb-4">Welcome to project</h2>
        <v-dialog v-model="dialog" max-width="600">
          <template v-slot:activator="{ props: activatorProps }">
            <v-btn
              class="teal-darken-3 bg-primary"
              prepend-icon="mdi-plus-circle"
              text="create project"
              variant="tonal"
              rounded="xl"
              v-bind="activatorProps"
            ></v-btn>
          </template>

          <v-card
            prepend-icon="mdi-account"
            title="User Profile"
          >
            <FormCreateProject
              @close="dialog = false" 
              @success="handleProjectCreationSuccess"
            />
          </v-card>
        </v-dialog>
      </div>

      <div v-if="projectsLoading" class="text-center py-10">
        <v-progress-circular 
            indeterminate 
            color="teal-darken-3" 
            size="64"></v-progress-circular>
        <p class="mt-4 text-subtitle-1">loading..</p>
      </div>
      <v-alert
        v-else-if="projectsError"
        type="error"
        title="فشل في جلب البيانات"
        :text="projectsError"
        class="mb-6"
        density="compact">
      </v-alert>
      <div v-else-if="projects.length === 0" class="text-center py-10">
        <v-icon size="80" color="grey-lighten-1">mdi-plus-circle</v-icon>
        <h3 class="mt-4 text-h6">no project</h3>
      </div>
      <v-row v-else dense>
        <v-col cols="4"
          v-for="project in projects"
          :key="project.id"> 
          <CardProject :project="project"/>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import CardProject from '@/components/CardProject.vue';
import { useProjectsStore } from '@/stores/projects';
import { onMounted, computed } from 'vue';
import FormCreateProject from '@/components/FormCreateProject.vue';
import { ref } from 'vue';


  
  export default{
    components:{
      CardProject,
      FormCreateProject,
    },

    setup() {
      const projectsStore = useProjectsStore();
      const projects = computed(() => projectsStore.projects);
      const projectsLoading = computed(() => projectsStore.projectsLoading);
      const projectsError = computed(() => projectsStore.projectsError); 
      const overdueProjects = computed(() => projectsStore.overdueProjects);
      const dialog = ref(false);

      onMounted(() => {
        projectsStore.fetchProjects();
      });

      return {
        dialog,
        projects,
        projectsError,
        projectsLoading,
        overdueProjects
      };
    }

  }
</script>
<style>
  div {
    text-align: center;
  }
</style>

