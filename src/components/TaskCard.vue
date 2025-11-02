<template>
    <v-card 
        :elevation="3" 
        rounded="lg" 
        class="task-card pa-3 mb-3"
        :color="task.status.color + ' lighten-5'"
        @dragstart="$emit('dragstart', $event)" 
    >
        <v-card-title class="pa-0 text-body-1 font-weight-bold mb-1">
            {{ task.name }}
        </v-card-title>
        
        <v-card-subtitle class="pa-0 text-caption text-truncate">
            {{ task.description }}
        </v-card-subtitle>

        <div class="d-flex justify-space-between align-center mt-3">
            <v-chip size="small" :color="task.status.color" label>
                {{ task.status.name }}
            </v-chip>
            <v-avatar size="24" color="blue-grey">
                <span class="text-caption text-white">{{ task.user?.name[0] || '?' }}</span>
            </v-avatar>
        </div>
    </v-card>
</template>

<script>
export default {
    name: 'TaskCard',
    props: {
        task: {
            type: Object,
            required: true
        }
    },
    emits: ['dragstart'],
};
</script>

<style scoped>
.task-card {
    cursor: grab;
    transition: all 0.2s ease-in-out;
}
</style>