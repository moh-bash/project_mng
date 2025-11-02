<template>
    <div cols="12" v-if="tasksLoading" class="text-center">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
        <p>  loading...</p>
    </div>
    <div cols="12" v-else-if="tasksError">
        <v-alert title="error" type="error" :text="tasksError"></v-alert>
    </div>
    <div cols="12" v-else-if="tasks.length === 0">
        <v-alert type="info" text="no taskes"></v-alert>
    </div>
    <v-row class="pa-5 mx-4" v-else>
        <v-col cols="3" v-for="status in taskStatuses" :key="status.id">
            <v-card class="mx-auto rounded-xl elevation-3" min-height="355" :color="status.color">
                <v-card-title class="d-flex justify-space-between align-center">
                    <span>{{ status.name }}</span>
                    <v-chip color="grey-lighten-1" size="small">
                        {{ filterTasks(status.id).length }}
                    </v-chip>
                </v-card-title>
                <v-card-text
                    v-for="task in filterTasks(status.id)" 
                    :key="task.id"
                    class="mb-3">
                    <TaskCard :task="task"/>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>
<script>
import { useTasksStore } from '@/stores/tasks';
import { mapActions,mapState ,mapGetters  } from 'pinia';
import TaskCard from '../TaskCard.vue';

export default{
    name: 'kanban',

    components: {
        TaskCard,
    },

    props: {
        id: {
            type: [String, Number],
            required: true,
        },
    },

    computed:{
        ...mapState(useTasksStore,['tasks','tasksLoading','tasksError','taskStatuses']),
    
       ...mapGetters(useTasksStore,['filterTasks'])
    },

    methods: {
        ...mapActions(useTasksStore,['fetchTasks']), 
    },

    mounted(){
        this.fetchTasks(this.id)
    }
}
</script>