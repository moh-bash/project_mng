<template>
    <div v-if="tasksLoading" class="text-center">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
        <p>loading...</p>
    </div>

    <div v-else-if="tasksError">
        <v-alert title="error" type="error" :text="tasksError"></v-alert>
    </div>

    <v-row class="pa-5 mx-4" v-else>
        <v-col cols="12" md="3" v-for="status in taskStatuses" :key="status.id">
            <v-card
                class="mx-auto rounded-xl elevation-3 px-3 pb-2"
                min-height="350"
            >
                <v-card-title class="d-flex justify-space-between align-center">
                    <span>{{ status.name }}</span>
                    <v-chip color="primary" variant="flat" size="small">
                        {{ status.tasks.length }}
                    </v-chip>
                </v-card-title>

                <VueDraggable
                    v-model="status.tasks"
                    group="tasks"
                    item-key="id"
                    :animation="150"
                    class="kanban-column"
                    ghost-class="ghost-card"
                    @change="onTaskChange($event, status.id)"
                >
                    <TaskCard
                        v-for="task in status.tasks"
                        :key="task.id"
                        :task="task"
                        :loading="updatingTaskId === task.id"
                        @edit="openEditDialog(task)"
                    />
                </VueDraggable>
            </v-card>
        </v-col>
    </v-row>

    <!-- نافذة تعديل المهمة -->
    <v-dialog v-model="isEditDialogOpen" max-width="600">
        <v-card>
            <v-card-title>Edit Task</v-card-title>
            <v-card-text>
                <v-form ref="editForm">
                    <v-text-field
                        label="Task Name"
                        v-model="selectedTask.name"
                        :rules="[v => !!v || 'Required']"
                    />
                    <v-text-field
                        label="Description"
                        v-model="selectedTask.description"
                    />
                    <v-text-field
                        label="Start Date"
                        type="date"
                        v-model="selectedTask.startDate"
                    />
                    <v-text-field
                        label="End Date"
                        type="date"
                        v-model="selectedTask.endDate"
                    />
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-btn color="error" @click="isEditDialogOpen = false">Close</v-btn>
                <v-btn color="primary" :loading="isSaving" @click="saveTaskChanges">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { useTasksStore } from '@/stores/tasks'
import { mapActions, mapState } from 'pinia'
import { VueDraggable } from 'vue-draggable-plus'
import TaskCard from '../TaskCard.vue'

export default {
    name: "Kanban",

    components: {
        TaskCard,
        VueDraggable
    },

    props: {
        id: {
            type: [String, Number],
            required: true
        },
        refreshKey: {
            type: Number,
            default: 0
        }
    },

    data() {
        return {
            isEditDialogOpen: false,
            selectedTask: {},
            updatingTaskId: null,
            isSaving: false
        }
    },

    computed: {
        ...mapState(useTasksStore, [
            "tasks",
            "tasksLoading",
            "tasksError",
            "taskStatuses"
        ])
    },

    methods: {
        ...mapActions(useTasksStore, [
            "fetchTasks",
            "updateTask"
        ]),

        openEditDialog(task) {
            this.selectedTask = JSON.parse(JSON.stringify(task));
            this.isEditDialogOpen = true;
        },

        async saveTaskChanges() {
            const { valid } = await this.$refs.editForm.validate();
            if (!valid) return;

            this.isSaving = true;
            try {
                await this.updateTask(this.selectedTask.id, {
                    name: this.selectedTask.name,
                    description: this.selectedTask.description,
                    startDate: this.selectedTask.startDate,
                    endDate: this.selectedTask.endDate,
                    statusId: Number(this.selectedTask.statusId),
                    userId: this.selectedTask.userId
                });
                this.isEditDialogOpen = false;
            } catch (error) {
                console.error("Failed to save task:", error);
            } finally {
                this.isSaving = false;
            }
        },

        async onTaskChange(event, newStatusId) {
            // event.added تتفعل فقط في العمود الذي تم الإفلات فيه
            if (event.added) {
                const task = event.added.element;

                // تحديث الحالة محلياً
                task.statusId = Number(newStatusId);

                try {
                    this.updatingTaskId = task.id;

                    // نرسل فقط statusId للباك إيند لمنع أخطاء الـ Validation
                    await this.updateTask(task.id, {
                        statusId: Number(newStatusId)
                    });
                } catch (error) {
                    console.error("Failed to update status in backend:", error);
                    // إعادة الجلب فقط إذا فشل الاتصال لضمان مزامنة الواجهة
                    await this.fetchTasks(this.id);
                } finally {
                    this.updatingTaskId = null;
                }
            }
        }
    },

    mounted() {
        this.fetchTasks(this.id);
    },

    watch: {
        refreshKey(newVal, oldVal) {
            if (newVal !== oldVal) {
                this.fetchTasks(this.id);
            }
        }
    }
}
</script>

<style scoped>
.kanban-column {
    min-height: 300px;
    transition: 0.2s;
}

.ghost-card {
    opacity: 0.4;
    background: rgba(25, 118, 210, 0.08);
    border: 2px dashed #1976d2;
}
</style>