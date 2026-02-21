<template>
    <div>
        <v-container>
            <div class="d-flex justify-space-between align-center mb-4">
                <h2 class="text-start">{{ $t('articles.title') }}</h2>
                <div>
                    <v-btn
                        variant="outlined"
                        class="teal-darken-3 text-primary py-0 px-3 text-body-2 me-2"
                        rounded="xl"
                        prepend-icon="mdi-view-dashboard-variant"
                        :text="$t('dashboard')"
                        @click="dahgo"></v-btn>
                    <v-btn
                        class="teal-darken-3 text-primary py-0 px-5 text-body-2"
                        prepend-icon="mdi-plus-circle"
                        :text="$t('create_project')"
                        variant="outlined"
                        rounded="xl"
                        @click="openCreateDialog"
                    ></v-btn>
                </div>
            </div>
            <!-- Edit/ create -->
            <v-dialog v-model="editDialog" max-width="800">
                <v-card>
                    <v-card-title class="headline bg-primary text-white">
                        {{ projectToEdit ? $t('edit_project') : $t('create_project') }}
                    </v-card-title>

                    <FormCreateProject
                      :existing-project="projectToEdit"
                      @close="closeDialog"
                      @success="successDialog"
                      @form-error="handleFormError"
                    />
                </v-card>
            </v-dialog>

            <!-- delet -->
            <v-dialog v-model="deleteConfirmDialog" max-width="500">
                <v-card>
                    <v-card-title class="headline bg-error text-white">
                        {{ $t('delete_project') }}
                    </v-card-title>
                    <v-card-text class="py-4">
                        {{ $t('are_you_sure_you_want_to_delete_this_project') }}
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="grey"
                            variant="text"
                            @click="deleteConfirmDialog = false"
                        >
                            close
                        </v-btn>
                        <v-btn
                            color="error"
                            variant="flat"
                            @click="confirmDeletion"
                            :loading="projectsLoading"
                        >
                            Delete
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <div v-if="projectsLoading" class="text-center py-10">
                <v-progress-circular
                    indeterminate
                    color="teal-darken-3"
                    size="64"></v-progress-circular>
                <p class="mt-4 text-subtitle-1">{{ $t('loading') }}</p>
            </div>
            <v-alert
                v-else-if="projectsError"
                type="error"
                title="Error"
                :text="projectsError"
                class="mb-6"
                density="compact">
            </v-alert>
            <div v-else-if="projects && projects.length === 0" class="text-center py-10">
                <v-icon @click="openCreateDialog" size="80" color="grey-lighten-1">mdi-plus-circle</v-icon>
                <h3 class="mt-4 text-h6">{{ $t('no_project_available') }}</h3>
            </div>
            <v-row  v-else dense>
                <v-col cols="12" sm="6" md="4" lg="4" class="pa-3"
                    v-for="project in projects"
                    :key="project.id">
                    <CardProject
                        :project="project"
                        @edit-project="openEditDialog"
                        @delete-project="handleDeleteProject"
                        :srcimg="localimg"
                    />
                </v-col>
            </v-row>
            <v-snackbar
                v-model="snackbar"
                :timeout="3000"
                :color="snackbarColor"
                location="bottom"
                >
                {{ snackbarText }}
                <template #actions>
                <v-btn
                    color="red"
                    variant="text"
                    @click="snackbar = false"
                    >
                    Close
                </v-btn>
                </template>
                </v-snackbar>
        </v-container>
    </div>
</template>

<script>
import { useProjectsStore } from '@/stores/projects';
import { mapState, mapActions } from 'pinia';
import CardProject from '@/components/project/CardProject.vue';
import FormCreateProject from '@/components/project/FormCreateProject.vue';

export default {
    components:{
      CardProject,
      FormCreateProject,
    },

    data() {
      return {
        editDialog: false,
        projectToEdit: null,
        snackbar: false,
        snackbarText: '',
        snackbarColor: 'background',
        deleteConfirmDialog: false,
        projectIdToDelete: null,
        localimg: [

        ]
      };
    },

    computed: {
      ...mapState(useProjectsStore, ['projects', 'projectsLoading', 'projectsError']),
    },

    methods: {
        ...mapActions(useProjectsStore, ['fetchProjects', 'deleteProject']),

        openCreateDialog() {
            this.projectToEdit = null;
            this.editDialog = true;
        },

        openEditDialog(project) {
            this.projectToEdit = project;
            this.editDialog = true;
        },




        async successDialog() {
            const isEditing = !!this.projectToEdit;
            this.editDialog = false;
            this.projectToEdit = null;

            await this.$nextTick();
            await this.fetchProjects();
            this.snackbarText = isEditing ? 'Project updated successfully' : 'Project created successfully';
            this.snackbarColor = 'secondary';
            this.snackbar = true;

        },

        closeDialog() {
            this.editDialog = false;
            this.projectToEdit = null;
        },

        handleFormError(errorMessage) {
        this.snackbarText = errorMessage;
        this.snackbarColor = 'error';
        this.snackbar = true;
        },


        handleDeleteProject(projectId) {
            this.projectIdToDelete = projectId;
            this.deleteConfirmDialog = true;
        },

        async confirmDeletion() {
            if (!this.projectIdToDelete) return;

            try {
                await this.deleteProject(this.projectIdToDelete);
                this.snackbarText = 'Project deleted successfully';
                this.snackbarColor = 'success';
                this.snackbar = true;
                await this.$nextTick();
                await this.fetchProjects();

            } catch (error) {
                this.snackbarText = error.message || 'Failed to delete project';
                this.snackbarColor = 'error';
                this.snackbar = true;
            } finally {
                this.deleteConfirmDialog = false;
                this.projectIdToDelete = null;
            }
        },

        dahgo(){
            this.$router.push({ name: 'dash' });
        }

    },
    mounted() {
        this.fetchProjects();
    },


};
</script>
<style>
    div {
        font-family: 'Cairo', sans-serif;
        text-align: center;
    }
</style>
