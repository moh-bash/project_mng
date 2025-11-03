<template>
    <div cols="12" v-if="tasksLoading" class="text-center">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
        <p>loading...</p>
    </div>

    <div cols="12" v-else-if="tasksError">
        <v-alert title="error" type="error" :text="tasksError"></v-alert>
    </div>

    <div cols="12" v-else-if="tasks.length === 0">
        <v-alert type="info" text="no tasks"></v-alert>
    </div>

    <v-row class="pa-5 mx-4" v-else>
        <v-col cols="3" v-for="status in taskStatuses" :key="status.id">
            <v-card class="mx-auto rounded-xl elevation-3" height="350" :color="status.color" style="overflow-y: auto; scrollbar-width: none;">
                <v-card-title class="d-flex justify-space-between align-center">
                    <span>{{ status.name }}</span>
                    <v-chip color="primary" variant="flat" class="text-white" size="small">
                        {{ filterTasks(status.id).length }}
                    </v-chip>
                </v-card-title>

                <v-card-text
                    v-for="task in filterTasks(status.id)"
                    :key="task.id"
                    class="mb-0 mt-0 py-1">
                    <TaskCard 
                        :task="task" 
                        @edittask="openEditDialog"
                        @deletetask="handleDeleteTask" />
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
<!-- 111111111111111111111111111111111111111111111111111111 -->
    <v-dialog v-model="isEditDialogOpen" max-width="600" max-height="420">
        <v-card prepend-icon="mdi-account" title="User Profile">
            <v-card-text>
                <v-form ref="editForm" v-model="isEditFormValid" @submit.prevent="saveTaskChanges">
                    <v-row>
                        <v-col cols="12">
                            <v-text-field
                                label="Task Name"
                                v-model="selectedTask.name"
                                :rules="[v => !!v || 'Required']"
                            ></v-text-field>
                        </v-col>

                        <v-col cols="12">
                            <v-text-field
                                label="Description"
                                v-model="selectedTask.description"
                                rows="2"
                                clearable
                            ></v-text-field>
                        </v-col>

                        <v-col cols="6">
                            <v-text-field
                                label="Start Date"
                                v-model="selectedTask.startDate"
                                type="date"
                            ></v-text-field>
                        </v-col>

                        <v-col cols="6">
                            <v-text-field
                                label="End Date"
                                v-model="selectedTask.endDate"
                                type="date"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card-text>
<v-divider></v-divider>
            <v-card-actions>
                <v-btn 
                    color="error" 
                    text @click="isEditDialogOpen = false"
                    >Close</v-btn>
                <v-btn 
                    color="primary" 
                    type="submit"
                    :loading="tasksLoading"
                    @click="saveTaskChanges">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { useTasksStore } from '@/stores/tasks';
import { mapActions, mapState, mapGetters } from 'pinia';
import TaskCard from '../TaskCard.vue';

export default {
    name: 'kanban',
    components: { TaskCard },

    data() {
        return {
            isEditDialogOpen: false,
            selectedTask: {},
            isEditFormValid: true,
        };
    },

    props: {
        id: {
            type: [String, Number],
            required: true,
        },
        refreshKey: {
            type: Number,
            default: 0,
        },
    },

    computed: {
        ...mapState(useTasksStore, ['tasks', 'tasksLoading', 'tasksError', 'taskStatuses']),
        ...mapGetters(useTasksStore, ['filterTasks']),
    },

    methods: {
        ...mapActions(useTasksStore, ['fetchTasks', 'updateTask']),

        openEditDialog(task) {
            this.selectedTask = { ...task };
            this.isEditDialogOpen = true;
        },

        async saveTaskChanges() {
            const form = this.$refs.editForm;
            if (!form.validate()) return;
            const payload = {
                name: this.selectedTask.name,
                description: this.selectedTask.description,
                startDate: this.selectedTask.startDate,
                endDate: this.selectedTask.endDate,
                statusId: this.selectedTask.statusId,
                userId: this.selectedTask.userId
            };

            try {
                await this.updateTask(this.selectedTask.id, payload);
                this.isEditDialogOpen = false;
            } catch (err) {
                console.error('Error updating task:', err);
            }
        },
    },

    mounted() {
        this.fetchTasks(this.id);
    },

    watch: {
        refreshKey(newVal, oldVal) {
            if (newVal !== oldVal) {
                this.fetchTasks(this.id);
            }
        },
    },
};
</script>
