<template>
       <v-card :color="task.status.color"  class="elevation-4 rounded-lg text-start">
           <v-card-text class="text-start py-0 pt-2">{{ task.name }}</v-card-text>
           <v-card-subtitle  class="text-start text-caption py-1">{{ task.description }}</v-card-subtitle>
           <div class="bg-surface py-1 mx-1 rounded-t-lg">
               <v-chip prepend-icon="mdi-sort-calendar-descending" color="surface" variant="flat" size="x-small" >
                   {{ task.startDate }}
               </v-chip>
               <v-chip prepend-icon=" mdi-sort-calendar-ascending" color="surface" variant="flat" size="x-small" class="ms-2">
                   {{ task.endDate }}
               </v-chip>
           </div>
           
            <v-divider></v-divider>
            <div>
                
                <div class="mx-1 bg-surface">
                <v-expansion-panels>
                    <v-expansion-panel>
                            <v-expansion-panel-title  class="bg-surface d-flex d-flex  align-center py-0 my-0 mx-0">
                               <v-avatar class="me-1 text-body-2" size="x-small" ><v-icon>mdi-account-circle</v-icon></v-avatar>
                                <span class="text-body-2">{{ task.user.name }}</span>
                            </v-expansion-panel-title>
                            <v-expansion-panel-text>
                                <div class="bg-surface mx-1 pb-3 d-flex align-center px-3 py-0">
                                        <v-btn 
                                            density="compact" 
                                            icon="mdi-pencil" 
                                            class="elevat me-3"   
                                            @click="$emit('edittask', task)">
                                        </v-btn>
                                        <v-btn density="compact" 
                                            icon="mdi-trash-can-outline" 
                                            class="elevat me-3 text-error"
                                            @click="openDeletl">
                                        </v-btn>
                                        <v-btn 
                                            density="compact" 
                                            icon="mdi-dots-horizontal" 
                                            class="elevat me-3">
                                        </v-btn>
                                    </div>
                                 <v-divider></v-divider>
                                <div class="d-flex align-center">
                                    <v-text-field
                                    variant="underlined"
                                    class="py-0 rounded-"
                                    label="Enter com...."
                                    type="text"  
                                    ></v-text-field>
                                    <v-btn density="compact" icon="mdi-send-outline" class="elevat ms-3"></v-btn>
                                </div>
                                <v-card class="bg-blue-grey-lighten-4 rounded-lg pa-0">
                                    <v-card-text class="pa-2">
                                        <div class=" d-flex d-flex  align-center py-0 my-0 mx-0">
                                            <v-avatar class="me-1 text-caption" size="x-small" ><v-icon>mdi-account-circle</v-icon></v-avatar>
                                            <span class="text-caption">{{ task.user.name }}</span>3
                                        </div>
                                        <p class="text-caption text-start">Lorem ips, dolor sit amet conse adipi elit. Tem illo.</p>
                                    </v-card-text>
                                </v-card>
                            </v-expansion-panel-text>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </div>
            </div>
        </v-card>
        <v-dialog v-model=" onDelete" max-width="300">
            <v-card>
                <v-card-title class="bg-error py-2">
                    Delete
                </v-card-title>
                <v-card-text>
                    are yu sure you want to delet the task
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn 
                        :loading="tasksLoading"
                        @click="closedelete">
                        close
                    </v-btn>
                    <v-btn
                        color="error" 
                        :loading="tasksLoading"
                        @click="deletetask">
                        Delete
                    </v-btn>

                </v-card-actions>
            </v-card>
        </v-dialog>
    
</template>
<script>
import { useTasksStore } from '@/stores/tasks';
import { mapActions } from 'pinia';

export default{
    name:'TaskCard',
    props: {
        task: {
            type: Object,
            required: true,
        }
    },

    data(){
        return{
            onDelete:false,
        }
    },


    methods: {
        ...mapActions(useTasksStore,['deleteTask']),

        openDeletl(){
            this.onDelete = true;
        },

        closedelete(){
            this.onDelete =false ;
        },

         async deletetask() {
            const tasksStore = useTasksStore();
            try {
                await tasksStore.deleteTask(this.task.id);
                this.onDelete = false;
            } catch (err) {
                console.error('Error deleting task:', err);
            }
        }
    },

    mounted() {
        

    
        
    }
}
</script>
