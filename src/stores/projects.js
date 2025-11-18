import { defineStore } from "pinia";
import { apiurl, getHeader } from "./api";

export const useProjectsStore = defineStore('projects', {
    state: () => ({
        projects: [] , 
        projectsLoading: false,
        projectsError: null,
        currentProject: null, 
    }),

    // Retrieves all projects
    actions: {
        async fetchProjects() {
            this.projectsLoading = true;
            this.projectsError = null;
            try {
                const res = await fetch( `${apiurl}/projects`, {
                    method: "GET",
                    headers: { ...getHeader() }
                });

                let data = await res.json();
                if (!res.ok) {
                    throw new Error(data.message || 'Failed to fetch projects');
                }
                this.projects = data;
            } catch (error) {
                this.projectsError = error.message;
                this.projects = [];
            } finally {
                this.projectsLoading = false;
            }

        },

        // Creates a new project
        async createProject(project) {
            this.projectsLoading = true;
            this.projectsError = null;
            try {
                const res = await fetch( `${apiurl}/projects`, {
                    method: "POST",
                    headers: { ...getHeader(), 'Content-Type': 'application/json' },
                    body: JSON.stringify(project)
                });

                let data = await res.json();


                if (!res.ok) {
                    throw new Error(data.message||'Failed to create project');
                }
                this.projects.push(data);
                return data;

            } catch (error) {
                this.projectsError = error.message;
                return error
            } finally {
                this.projectsLoading = false;
            }
        },

        // Updates a project
        async updateProject(projectId, updatedProject) {
            this.projectsLoading = true;
            this.projectsError = null;
            try {
                const res = await fetch( `${apiurl}/projects/${projectId}`, {
                    method: "PATCH",
                    headers: { ...getHeader(), 'Content-Type': 'application/json' },
                    body: JSON.stringify(updatedProject)
                });
                let data = await res.json();
                if (!res.ok) {
                    throw new Error(data.message || 'Failed to update project');
                }
               
                return data;
            } catch (error) {
                this.projectsError = error.message;
                return error;
            } finally {
                this.projectsLoading = false;
            }
        },

        // Deletes a project
        async deleteProject(projectId){
            this.projectsLoading= true;
            this.projectsError= null;
            try{
                const res = await fetch( `${apiurl}/projects/${projectId}`, {
                    method: "DELETE",
                    headers: { ...getHeader(), 'Content-Type': 'application/json' },

                });

                if(!res.ok){
                    let data =await res.json().catch(() => ({}));
                    throw new Error(data.message);
                }
                this.projects = this.projects.filter(p => p.id !== projectId);
            }catch (error) {
                this.projectsError = error.message;
                throw error;
                
            } finally {
                this.projectsLoading = false;
            }
        },

        async fetchProjectById(projectId) {
            this.projectsLoading = true;
            this.projectsError = null;
            try {
                const res = await fetch( `${apiurl}/projects/${projectId}`, {
                    method: "GET",
                    headers: { ...getHeader() }
                });
                let data = await res.json();
                if (!res.ok) {
                    throw new Error(data.message || 'Failed to fetch project');
                }
                this.currentProject = data;
                return data;
            } catch (error) {
                this.projectsError = error.message;
                throw error;
            } finally {
                this.projectsLoading = false;
            }
        }
    }
});