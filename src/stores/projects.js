import { defineStore } from "pinia";

import ProjectList from '@/mock/projectList.json'; 
import mockProjectCreate from '@/mock/projectCreateSuccess.json'; 
import mockProjectUpdate from '@/mock/projectUpdateSuccess.json'; 
import mockProjectDelete from '@/mock/projectDeleteSuccess.json';


export const useProjectsStore = defineStore('projects', {
    state: () => ({
        projects: [] || null ,
        projectsLoading: false,
        projectsError: null,
        currentProject: null,
    }),

    getters:{
        overdueProjects: (state) => {
            const today = new Date();
            today.setHours(0, 0, 0, 0); 
            return state.projects.filter(project => {
                const dueDate = new Date(project.dueDate);
                dueDate.setHours(0, 0, 0, 0);
                return dueDate < today && project.status !== 'completed';
            });
        },
    },

    actions: {
        async delay() {
            return new Promise(resolve => setTimeout(resolve, 800));
        },

        async fetchProjects() {
            this.projectsLoading = true;
            this.projectsError = null; 
            
            try {
                await this.delay();
                this.projects = ProjectList;
                this.currentProject = this.projects[0] || null;

            } catch (error) {
                this.projectsError = 'error fetching projects (Mock Error)'; 
            } finally {
                this.projectsLoading = false;
            }   (محاكاة)
        },

        async createProject(projectData) {
            this.projectsLoading = true;
            this.projectsError = null;
            await this.delay();
            try {
                const newProject = mockProjectCreate; 
                this.projects.unshift(newProject);
            } catch (error) {
                this.projectsError = 'error creating project (Mock Error)';
            } finally {
                this.projectsLoading = false;
            }
        },


        async updateProject(projectId, updateData) {
            this.projectsLoading = true;
            this.projectsError = null;
            await this.delay();
            try {
                const updatedProject = mockProjectUpdate; 
                const index = this.projects.findIndex(p => p.id === projectId);
                if (index !== -1) {
                    this.projects[index] = updatedProject;
                }
            } catch (error) {
                this.projectsError = 'error updating project (Mock Error)';
            } finally {
                this.projectsLoading = false;
            }
        },


        async deleteProject(projectId) {
            this.projectsError = null;
            this.projectsLoading = true;
            await this.delay();
            try {
                // نستخدم filter لإزالة المشروع بشكل نظيف
                this.projects = this.projects.filter(p => p.id !== projectId);
            } catch (error) {
                this.projectsError = 'error deleting project (Mock Error)';
            } finally {
                this.projectsLoading = false;
            }
        },
    },
});
 

    

  

       