<template>
    <v-row class="pa-5 mx-4">
        <v-col cols="3">
            <v-card class="mx-auto rounded-xl elevation-3" min-height="355">
                <v-card-text>
                    <div class="font-weight-bold text-h4 text-start ms-1 mb-2">
                        <v-icon class="me-1 text-success">mdi-account-details-outline</v-icon>
                        Members
                    </div>
                    <v-timeline align="start" density="compact" >
                    <v-timeline-item
                                v-for="user in currentProject.assignedUsers"
                                :key="user.id" 
                                size="small"
                                :dot-color="timelineColors[index % timelineColors.length]"
                            >
                        <div class="mb-4">
                            <div class="font-weight-normal">
                            <strong>{{ user.name }}</strong> 
                            </div>

                            <div>{{ user.email }}</div>
                        </div>
                        </v-timeline-item>
                    </v-timeline>
                </v-card-text>
            </v-card>
        </v-col>
        <v-col cols="6">
            <v-card class="mx-auto rounded-xl elevation-3" min-height="355">
                <v-card-text>
                    <div class="font-weight-bold text-h4 text-start ms-1 mb-2 ms-7">
                        <v-icon class="me-1 text-error">mdi-bookmark-multiple</v-icon>
                        Information
                    </div>
                    
                </v-card-text>
            </v-card>
        </v-col>
        <v-col>
            <v-card class="mx-auto rounded-xl elevation-3" min-height="355">
                <v-card-text>
                    <div class="font-weight-bold text-h4 text-start ms-1 mb-2">
                        <v-icon class="me-1 text-orange-darken-2">mdi-security</v-icon>
                        Admin
                    </div>
                </v-card-text>
            </v-card>
        </v-col>

    </v-row>
</template>
<script>
import { useProjectsStore } from '@/stores/projects';
import { mapActions, mapState } from 'pinia';

export default{
    name: 'details',

    data(){
        return{
            timelineColors: ['error', 'secondary', 'success', 'info', 'warning', 'error', 'blue-grey'],
        }
    },

    computed: {
        ...mapState(useProjectsStore, ['currentProject','projectsLoading', 'projectsError']),
    },

    methods: {
        ...mapActions(useProjectsStore, ['fetchProjectById']),
    },

    

}

</script>