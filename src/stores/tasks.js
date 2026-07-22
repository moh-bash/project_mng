import { defineStore } from "pinia";
import { apiurl, getHeader } from "./api";


export const useTasksStore = defineStore('tasks', {

    state: () => ({
        tasks: [],

        columns: [
            {
                id: 1,
                name: "To Do",
                tasks: []
            },
            {
                id: 2,
                name: "In Progress",
                tasks: []
            },
            {
                id: 3,
                name: "In Review",
                tasks: []
            },
            {
                id: 4,
                name: "Done",
                tasks: []
            },
        ],

        tasksLoading: false,
        tasksError: null,
    }),


    getters: {

        taskStatuses: (state) => state.columns,

    },


    actions: {


        async fetchTasks(projectId) {

            this.tasksLoading = true;
            this.tasksError = null;

            try {

                const res = await fetch(
                    `${apiurl}/tasks/project/${projectId}`,
                    {
                        method: "GET",
                        headers: {
                            ...getHeader()
                        }
                    }
                );


                const data = await res.json();


                if (!res.ok) {
                    throw new Error(
                        data.message || "Failed to fetch tasks"
                    );
                }


                this.tasks = data;


                // توزيع المهام على الأعمدة
                this.columns.forEach(column => {
                    column.tasks = [];
                });


                data.forEach(task => {

                    const column = this.columns.find(
                        col => col.id === Number(task.statusId)
                    );


                    if (column) {
                        column.tasks.push(task);
                    }
                    console.log(this.columns);

                });



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

                const res = await fetch(
                    `${apiurl}/tasks`,
                    {
                        method: "POST",
                        headers: {
                            ...getHeader(),
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(taskData)
                    }
                );


                const newTask = await res.json();


                if (!res.ok) {
                    throw new Error(
                        newTask.message || "Failed to create task"
                    );
                }


                this.tasks.push(newTask);


                const column = this.columns.find(
                    col => col.id === newTask.statusId
                );


                if (column) {
                    column.tasks.push(newTask);
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

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || "Failed to update task");
        }

        // 1. تحديث بيانات المهمة في مصفوفة tasks الرئيسية بدون استبدال الكائن
        const taskInStore = this.tasks.find(t => t.id === taskId);
        if (taskInStore) {
            Object.assign(taskInStore, data);
        }

        // 2. تحديث بيانات المهمة داخل العمود مع الحفاظ على مرجع الكائن (Reference)
        this.columns.forEach(column => {
            const taskInCol = column.tasks.find(t => t.id === taskId);
            if (taskInCol) {
                Object.assign(taskInCol, data);
            }
        });

        return data;

    } catch (error) {
        this.tasksError = error.message;
        throw error;
    }
},







        async moveTask(task, newStatusId) {


            const oldColumn = this.columns.find(
                col =>
                    col.tasks.some(
                        t => t.id === task.id
                    )
            );


            const newColumn = this.columns.find(
                col => col.id === newStatusId
            );



            if (!newColumn) return;



            // إزالة من العمود القديم

            if (oldColumn) {

                const index =
                    oldColumn.tasks.findIndex(
                        t => t.id === task.id
                    );


                oldColumn.tasks.splice(index, 1);

            }



            // إضافة للعمود الجديد

            task.statusId = newStatusId;

            newColumn.tasks.push(task);



            // تحديث API

            await this.updateTask(
                task.id,
                {
                    ...task,
                    statusId: newStatusId
                }
            );


        },







        async deleteTask(taskId) {


            this.tasksLoading = true;
            this.tasksError = null;


            try {


                const res = await fetch(
                    `${apiurl}/tasks/${taskId}`,
                    {
                        method: "DELETE",
                        headers: {
                            ...getHeader()
                        }
                    }
                );


                if (!res.ok) {

                    const data = await res.json();

                    throw new Error(
                        data.message ||
                        "Failed to delete task"
                    );

                }




                this.tasks =
                    this.tasks.filter(
                        t => t.id !== taskId
                    );



                this.columns.forEach(column => {

                    column.tasks =
                        column.tasks.filter(
                            t => t.id !== taskId
                        );

                });



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