<template>
    <v-form ref="form" @submit.prevent="">
        <v-card-text>
            <v-row>
                <v-col cols="6">
                    <v-text-field
                    v-model="Projects.name"
                    label="Name Projects"
                    required
                    :rules="[ v => !!v || 'required']"
                    >            
                    </v-text-field>

                </v-col>
                <v-col cols="6">
                    <v-text-field
                    v-model="Projects.dueDate"
                    label="Due Date"
                    type="date"
                    required
                    ></v-text-field>
                </v-col>
                <!-- <v-col cols="4">
                    <v-select
                        v-model="Projects.status"
                        label="Select"
                        required
                        :rules="[ v => !!v || 'required']"
                        :items="['Active', 'Inactive']"
                    ></v-select>
                </v-col> -->
                <v-col cols="12">
                    <v-text-field
                    v-model="Projects.description"
                    label="Description"
                    :rules="[ v => !!v || 'required']"
                    required
                    ></v-text-field>
                </v-col>
            </v-row>
        </v-card-text>
        
        <v-divider></v-divider>

        <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              text="Close"
              variant="plain"
              @click="$emit('close')"
            ></v-btn>

            <v-btn
              color="primary"
              text="create"
              variant="tonal"
              @click="submitForm"
              :loading="projectsStore.projectsLoading"
              :disabled="projectsStore.projectsLoading"
              
            ></v-btn>
        </v-card-actions>
    </v-form>
</template>
<script>
import { useProjectsStore } from '@/stores/projects';
import { mapStores } from 'pinia';

export default {
    name: 'FormCreateProject',
    emits: ['close', 'success', 'error'],
    props: {
        existingProject: {
            type: Object,
            default: null
        }
    },
    data() {
    return {
        Projects: {
            name: '',
            description: '',
            dueDate: new Date().toISOString().split('T')[0],
            // status: 'Active',
        },
    };
    },

    computed: {
        ...mapStores(useProjectsStore),
        isEditMode() {
            return !!this.Projects.id;
        }
    },

    watch: {
        existingProject: {
            immediate: true, 
            handler(newProject) {
                if (newProject && newProject.id) {
                    this.Projects = { 
                        id: newProject.id,
                        name: newProject.name,
                        description: newProject.description,
                        dueDate: newProject.dueDate, 
                        // status: newProject.status, 
                    };
                } else {
                    this.$refs.form?.reset(); 
                    this.Projects = { 
                        id: null,
                        name: '',
                        description: '',
                        dueDate: new Date().toISOString().split('T')[0],
                        // status: 'Active',
                    };
                }
            }
        }
    },

    methods: {
       async submitForm() {
            const { valid } = await this.$refs.form.validate();

            if (valid) {
                try {
                    if (this.isEditMode) {
                        const { id: projectId, ...projectDataToUpdate } = this.Projects;                        
                        await this.projectsStore.updateProject(projectId, projectDataToUpdate);
                    } else {
                        const { id, ...projectDataToSend } = this.Projects;
                        await this.projectsStore.createProject(projectDataToSend);
                    }
                    
                    this.$emit('success'); 
                    this.$emit('close'); 
                    
                } catch (error) {
                    console.error('Failed to submit project form:', error);
                    this.$emit('form-error', error.message || 'An unknown error occurred');
                }
            }
        },
    },
};
</script>