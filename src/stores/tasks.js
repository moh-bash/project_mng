import { defineStore } from "pinia";
import { apiurl, getHeader } from "./api";
import { useAuthStore } from "./auth";

export const useTasksStore = defineStore('tasks', {
    state: () => ({
        tasks: [],
        tasksLoading: false,
        tasksError: null,
        taskStatuses: [
            { id: 1 , name:'To Do ' },
            { id: 2 , name:'In Progress' }, 
            { id: 3 , name:'In Review' },     
            { id: 4 , name:'Done' }, 
        ],
    }),

    getters: {
        filterTasks: (state) => (statusId) => {
            return state.tasks.filter(task => task.statusId === statusId); 
        },
    },

    actions: {
        async fetchTasks(projectId) {
            this.tasksLoading = true;
            this.tasksError = null;
            try {
                const res = await fetch( `${apiurl}/tasks/project/${projectId}`, {
                    method: "GET",
                    headers: { ...getHeader() }
                });

                let data = await res.json();
                if (!res.ok) {
                    throw new Error(data.message || 'Failed to fetch projects');
                }
                this.tasks = data;
            } catch (error) {
                this.tasksError = error.message;
                this.tasks = [];
            } finally {
                this.tasksLoading = false;
            }

        },

        async createTask(taskData) {
            const authStore = useAuthStore();
            this.tasksLoading = true;
            this.tasksError = null;
            try {
                const res = await fetch(`${apiurl}/tasks`, {
                method: "POST",
                headers: { ...getHeader(), 'Content-Type': 'application/json' },
                body: JSON.stringify(taskData)
                });
                const newTask = await res.json();

                if (!res.ok) {
                throw new Error(newTask.message || 'Failed to create task');
                }

                return newTask;

            } catch (error) {
                this.tasksError = error.message;
                throw error;
            } finally {
                this.tasksLoading = false;
            }
        },





        async updateTask(taskId, updatedData) {
            this.tasksLoading = true;
            this.tasksError = null;
            try {
                const res = await fetch(`${apiurl}/tasks/${taskId}`, {
                    method: "PATCH",
                    headers: { 
                        ...getHeader(),
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(updatedData)
                });

                let data = await res.json();
                if (!res.ok) {
                    throw new Error(data.message || "Failed to update task");
                }

                const index = this.tasks.findIndex(t => t.id === taskId);
                if (index !== -1) {
                    this.tasks[index] = data;
                }

                return data;
            } catch (error) {
                this.tasksError = error.message;
                throw error;
            } finally {
                this.tasksLoading = false;
            }
        },



        async deleteTask(taskId) {
            this.tasksLoading = true;
            this.tasksError = null;
            try {
                const res = await fetch(`${apiurl}/tasks/${taskId}`, {
                    method: "DELETE",
                    headers: { ...getHeader() },
                });

                if (!res.ok) {
                    const data = await res.json();
                    throw new Error(data.message || "Failed to delete task");
                }

                let index = this.tasks.findIndex(t => t.id === taskId);
                if (index !== -1) {
                    this.tasks.splice(index, 1);
                }

                return true;
            } catch (error) {
                this.tasksError = error.message;
                throw error;
            } finally {
                this.tasksLoading = false;
            }
        }



    }
});