<template>
    <v-card
        :disabled="loading"
        :loading="loading"
        class="mx-auto"
        rounded="lg"
    >
        <template v-slot:loader="{ isActive }">
        <v-progress-linear
            :active="isActive"
            color="deep-purple"
            height="4"
            indeterminate
        ></v-progress-linear>
        </template>
       
        <v-img
        height="100"
        @click="goToDetails"
        src="https://img.freepik.com/free-vector/low-poly-abstract-background-design_1048-12395.jpg?semt=ais_hybrid&w=740&q=80"
        cover
        ></v-img>

        <v-card-item>
            <div @click="goToDetails" class="d-flex justify-space-between align-center my-3">
                <span>{{ project.name }}</span>
                <span > 
                    <ActionMenu
                    :items="projectActions"
                    :loading="projectsStore.projectsLoading"
                    @select="handleAction"
                    />               </span>

            </div>
            <v-card-subtitle class="d-flex justify-space-between align-center pa-0 my-1">
                <div >
                    <v-avatar size="24" color="success">
                        <template v-if="project.avatar">
                            <img :src="project.creator.avatar">
                        </template>
                        <span class="text-h6 text-white" v-else>{{ project.creator.name ? project.creator.name[0] : '' }}</span>

                    </v-avatar>
                    <span class="mx-3">{{ project.creator.name }}</span>
                </div>
                <div>
                     <v-icon icon="mdi-account-group" size="small"></v-icon>
                    <span class="mx-3">{{ membersCount }}</span>
                </div>
            </v-card-subtitle>
            <v-card-subtitle>

            </v-card-subtitle>
            <v-card-subtitle class="d-flex justify-space-between align-center pa-0 my-1">
                <div>
                    <v-icon icon="mdi-calendar-end" size="small"></v-icon>
                    <span class="mx-3">{{ project.dueDate }} </span>
                </div>
                <v-chip color="success" small dark class="ma-0 py-0 px-4 text-capitalize">
                     Active
                </v-chip>
            </v-card-subtitle>


            <v-card-subtitle class="text-start pa-0 mt-1">
                {{ project.description }}
            </v-card-subtitle>
        </v-card-item> 
    </v-card>
</template>
<script>
import { useProjectsStore } from '@/stores/projects';
import ActionMenu from './ActionMenu.vue';
import { mapActions, mapState, mapStores } from 'pinia';
import { useAuthStore } from '@/stores/auth';

export default {
    name: 'CardProject',
    emits: ['edit-project', 'delete-project'], 
    components: {
        ActionMenu
    },
    props: {
        project: {
            type: Object,
            required: true,
        },
        srcimg: {
            type: String,
            required: true
        }
    },
    
    data() {
        return {
           
        };
    },
    computed: {
        ...mapState(useAuthStore, ['user' ,'authLoading']),
        ...mapStores(useProjectsStore),


       
       
        
        projectActions() {
            return [
                { title: 'Edit', prependIcon: 'mdi-pencil', code: 'edit' },
                { type: 'divider' },
                { title: 'Delete', prependIcon: 'mdi-trash-can', code: 'delete' },
            ];
        },

        membersCount() {
            return this.project.assignedUsers?.length || 0;
        },

        status() {
            if (this.project.status === 'Active') {
                return 'success';
            } else if (this.project.status === 'in progress') {
                return 'error';
            } else if (this.project.status === 'Inactive') {
                return 'orange lighten-2';
            } else {
                return 'grey lighten-2';
            }
        }
    },
    methods: {

        ...mapActions(useAuthStore,['profile']),
        
        handleAction(actionCode) {
            switch (actionCode) {
                case 'edit':
                    this.openEditDialog();
                    break;
                case 'delete':
                    this.$emit('delete-project', this.project.id); 
                    break;
            }
        },
        
        openEditDialog() {
            this.$emit('edit-project', this.project); 
        },

        goToDetails() {
            this.$router.push({ 
                name: 'project',
                params: { id: this.project.id }
            });
        },
    },
   
   
};
</script>
