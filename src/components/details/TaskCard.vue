<template>
       <v-card :color="task.status.color"  class="elevation-4 rounded-lg text-start">
           <v-card-text class="text-start py-0 pt-2">{{ task.name }}</v-card-text>
           <v-card-subtitle  class="text-start text-caption py-1">{{ task.description }}</v-card-subtitle>
           <div class="bg-surface py-1 mx-1">
               <v-chip prepend-icon="mdi-sort-calendar-descending" color="surface" variant="flat" size="x-small" >
                   {{ task.startDate }}
               </v-chip>
               <v-chip prepend-icon=" mdi-sort-calendar-ascending" color="surface" variant="flat" size="x-small" class="ms-2">
                   {{ task.endDate }}
               </v-chip>
           </div>
           <div class="bg-white mx-1 pb-2 d-flex px-3">
                <v-btn density="compact" icon="mdi-plus" class="elevat"></v-btn>
           </div>
            <v-divider></v-divider>
            <div class="bg-surface d-flex d-flex  align-center px-1 py-1 mx-1">
                <v-avatar class="me-1 text-body-2" size="x-small" ><v-icon>mdi-account-circle</v-icon></v-avatar>
                <span class="text-body-2">{{ task.user.name }}</span>
            </div>
            
       </v-card>
</template>
<script>
export default{
    name:'TaskCard',
    props: {
        task: {
            type: Object,
            required: true,
        }
    },

    mounted() {
        console.log("TaskCard received the following task data:");
        console.log(this.task);
        
    }
}
</script>