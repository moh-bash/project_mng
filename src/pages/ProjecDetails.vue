<template>
    <v-container fluid class="pa-0">
        <div v-if="projectsLoading">
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
            <div class="mt-4">  LOaginng...</div>
        </div>
        <div v-else>
            <v-card-title>
                <div class="d-flex justify-space-between align-center">
                    <div class="d-flex align-center">
                        <v-icon class="text-h5">mdi-subtitles-outline</v-icon>
                        <div class="text-start ms-3">
                            <P class="text-body-1">{{ currentProject.name }}</P>
                        </div>
                    </div>
                    <div class="d-flex  align-center ga-2 ">
                        
    
                        <v-chip color="primary" variant="flat" size="x-small">
                            <v-icon class="me-1">mdi-sort-calendar-ascending</v-icon>
                            <p>{{ currentProject.dueDate }}</p>
                        </v-chip>
    
                        <v-chip color="secondary" variant="flat" size="x-small">
                            <v-icon class="me-1">mdi-security</v-icon>
                            <p>{{ currentProject.role }}</p>
                        </v-chip>
    
                        <v-chip color="red" variant="flat" size="x-small">
                            <v-icon class="me-1">mdi-account-group</v-icon>
                            <p>{{ currentProject.assignedUsers.length }}</p>
                        </v-chip>
    
                        <v-chip color="green" variant="flat" size="x-small">
                            <v-icon class="me-1">mdi-account-circle</v-icon>
                            <p>{{ currentProject.creator.name }}</p>
                        </v-chip>
                        
                    </div>
                </div>
            </v-card-title>
            <div>
                <div class="barbuttm">
    
                    <v-tabs 
                        class="tabper elevation-5 rounded-xl px-3 bg-app" 
                        v-model="activeTab" 
                        color="primary" 
                        >
                        <v-tab class="tabch" :value="0">
                            <v-icon start>mdi-view-dashboard-variant-outline</v-icon>
                            Dashboard
                        </v-tab>
                        <v-tab class="tabch" :value="1">
                            <v-icon start>mdi-checkbox-marked-circle-auto-outline</v-icon>
                            Kanban
                        </v-tab>
                        <v-tab class="tabch" :value="2" >
                            <v-icon start>mdi-menu</v-icon>
                            Details
                        </v-tab>
                    </v-tabs>
                </div>
    
                <v-divider></v-divider>
    
                <v-window v-model="activeTab">
                    
                    <v-window-item :value="0">
                        <dashBoard/>
                    </v-window-item>
    
                    <v-window-item :value="1">
                       <kanBan :id="id"/>
                    </v-window-item>
    
                    <v-window-item :value="2">
                        <detAils/>
                    </v-window-item>
    
                </v-window>
            </div>
        </div>
    </v-container>
</template>
<script>
import { mapState, mapActions } from 'pinia';
import { useProjectsStore } from '@/stores/projects';
import DashBoard from '@/components/details/dashBoard.vue';
import DetAils from '@/components/details/detAils.vue';
import KanBan from '@/components/details/kanBan.vue';

export default{
    components: {
        DashBoard,
        DetAils,
        KanBan
    },

    props: {
        id: {
            type: [String, Number],
            required: true,
        },
    },

    data() {
        return {
            activeTab: 1,
        };
    },

    computed: {
        ...mapState(useProjectsStore, ['currentProject','projectsLoading', 'projectsError']),
    },

    methods: {
        ...mapActions(useProjectsStore, ['fetchProjectById']),
    },

    async created() {
        try {
            await this.fetchProjectById(this.id);
        } catch (error) {
            console.error('Error fetching project:', error);
        }
    }
}
</script>
<style scoped>
    .barbuttm{
        position: fixed;
        bottom: 15px;
        left:calc(50%);
        transform: translateX(-50%);
        background-color: app;
        border-radius: 20px;
        z-index: 99;
    };
    
</style>
    