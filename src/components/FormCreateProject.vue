<template>
    <v-form ref="form" @submit.prevent="">
        <v-card-text>
            <v-row>
                <v-col cols="6">
                    <v-text-field
                    v-model="Projects.name"
                    label="Name Projects"
                    required
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
                <v-col cols="12">
                    <v-text-field
                    v-model="Projects.description"
                    label="Description"
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
              @click="dialog = false"
            ></v-btn>

            <v-btn
              color="primary"
              text="create"
              variant="tonal"
              @click="dialog = false"
            ></v-btn>
        </v-card-actions>
    </v-form>
</template>
<script>
import { useProjectsStore } from '@/stores/projects';
import { mapStores } from 'pinia';

export default {
    name: 'FormCreateProject',
    emits: ['close', 'success'],
    data() {
    return {
        Projects: {
            name: '',
            description: '',
            dueDate: new Date().toISOString().split('T')[0],
        },
    };
    },

    computed: {
        ...mapStores(useProjectsStore),
    },

    methods: {
        async submitForm() {
            const { valid } = await this.$refs.form.validate();

            if (valid) {
                try {
                    await this.projectsStore.createProject(this.Projects);
                    this.$emit('success'); 
                    this.$emit('close');                     
                    this.$refs.form.reset();
                    
                } catch (error) {
                    console.error('Failed to create project:', error);
                }
            }
        },




    },
};
</script>