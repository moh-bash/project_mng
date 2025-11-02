import { defineStore } from "pinia";
import { apiurl, getHeader } from "./api";

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
            this.tasksLoading = true; 
            this.tasksError = null;           
            try {
                const res = await fetch(`${authStore.apiurl}/tasks`, {
                    method: "POST",
                    headers: { ...getHeader(),'Content-Type': 'application/json' },
                    body: JSON.stringify(taskData)
                });

                const newTask = await res.json();
                
                if (!res.ok) {
                    throw new Error(newTask.message || 'error');
                }
                
                
                return newTask;

            } catch (error) {
                this.tasksError = error.message;
                throw error; 
            } finally {
                this.tasksLoading = false;
            }
        },
    }
});