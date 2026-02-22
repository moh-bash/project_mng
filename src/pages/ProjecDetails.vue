<template>
    <v-container fluid class="pa-0">
        <div v-if="projectsLoading">
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
            <div class="mt-4">{{  }}</div>
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


                    <!-- 000000000creat0000000000 -->
                    <div class="d-flex  align-center ga-2 ">
                            <div class="pa-0 text-center">
                                <v-dialog
                                v-model="dialog"
                                max-width="600"
                                max-height="420"
                                >
                                <template v-slot:activator="{ props: activatorProps }">
                                    <v-btn
                                    class="text-none font-weight-regular my-0 pa-1 ma-0 rounded-xl mb-1 px-3 ign-center"
                                    prepend-icon="mdi-plus-circle"
                                    text="create task"
                                    variant="tonal"
                                    v-bind="activatorProps"
                                    size="x-small"
                                    color="blue-darken-1"
                                    ></v-btn>
                                </template>

                                <v-card prepend-icon="mdi-account" title="User Profile">
                                    <v-form ref="taskForm">
                                    <v-card-text>
                                        <v-row dense>
                                        <v-col cols="12">
                                            <v-text-field
                                            v-model="newTask.name"
                                            :rules="[v => !!v || 'required']"
                                            label="task name"
                                            required
                                            ></v-text-field>
                                        </v-col>

                                        <v-col cols="12">
                                            <v-textarea
                                            v-model="newTask.description"
                                            label="description"
                                            rows="2"
                                            clearable
                                            ></v-textarea>
                                        </v-col>

                                        <v-col cols="6">
                                            <v-text-field
                                            v-model="newTask.startDate"
                                            label="Start Date"
                                            type="date"
                                            ></v-text-field>
                                        </v-col>

                                        <v-col cols="6">
                                            <v-text-field
                                            v-model="newTask.endDate"
                                            label="Due Date*"
                                            type="date"
                                            :rules="[v => !!v || 'required']"
                                            required
                                            ></v-text-field>
                                        </v-col>

                                        <v-col cols="6">
                                            <v-select
                                            v-model="newTask.userId"
                                            :items="projectUsers"
                                            item-title="title"
                                            item-value="value"
                                            label="users"
                                            ></v-select>
                                        </v-col>

                                        <v-col cols="6">
                                            <v-select
                                            v-model="newTask.statusId"
                                            :items="statusOptions"
                                            item-title="title"
                                            item-value="value"
                                            label="Initial Status*"
                                            :rules="[v => !!v || 'required']"
                                            required
                                            ></v-select>
                                        </v-col>
                                        </v-row>
                                    </v-card-text>

                                    <v-divider></v-divider>

                                    <v-card-actions>
                                        <v-spacer></v-spacer>

                                        <v-btn
                                        text="Close"
                                        variant="plain"
                                        @click="dialog = false;"
                                        ></v-btn>

                                        <v-btn
                                        color="primary"
                                        text="Save"
                                        variant="tonal"
                                        @click="sendTask"
                                        ></v-btn>
                                    </v-card-actions>
                                    </v-form>
                                </v-card>
                                </v-dialog>

                            </div>
                            <!-- 11111111111111111 -->


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
                       <kanBan :id="id" :key="taskRefreshKey"/>
                    </v-window-item>

                    <v-window-item :value="2">
                        <detAils :projectId="currentProjectId"/>
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
import { useTasksStore } from '@/stores/tasks';
import { useAuthStore } from '@/stores/auth';

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
            dialog: false,
            isFormValid: false,
            taskRefreshKey: 0,
            newTask: {
                name: '',
                description: '',
                startDate: new Date().toISOString().substr(0, 10),
                endDate: null,
                projectId: this.id,
                userId: null,
                statusId: 1,
            },
        };
    },

    computed: {
        ...mapState(useProjectsStore, ['currentProject','projectsLoading', 'projectsError']),
        statusOptions() {
            return [
                { title: 'To Do', value: 1 },
                { title: 'In Progress', value: 2 },
                { title: 'In Review', value: 3 },
                { title: 'Done', value: 4 }
            ];
        },

       projectUsers() {


            let users123 = this.currentProject.assignedUsers;
            let cer123 =this.currentProject.creator;
            let allusers = [...users123];

            if(cer123){

                allusers.unshift(cer123);
            }


            return allusers.map(user => ({
                title: user.name,
                value: user.id
            }));
        },
    },

    methods: {
        ...mapActions(useProjectsStore, ['fetchProjectById']),
        ...mapActions(useTasksStore,['createTask']),
        async sendTask() {
            const form = this.$refs.taskForm
            const { valid } = await form.validate()

            if (!valid) {
                console.warn("Form validation failed. Please fill all required fields.")
                return
            }

            try {
                const taskPayload = {
                ...this.newTask,
                projectId: parseInt(this.id)
                }

                await this.createTask(taskPayload)

                this.taskRefreshKey++
                this.dialog = false
                this.resetForm()
            } catch (error) {
                console.error('Failed to create task:', error)
            }
        },


        resetForm() {
             this.newTask = {
                name: '',
                description: '',
                startDate: new Date().toISOString().substr(0, 10),
                endDate: null,
                projectId: this.id,
                userId: null,
                statusId: 1,
            };
            this.isFormValid = false;
        }


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
    }

</style>
