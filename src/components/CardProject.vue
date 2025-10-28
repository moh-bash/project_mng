<template>
    <v-card
        :disabled="loading"
        :loading="loading"
        class="mx-auto"
        @click="reserve"
    >
        <template v-slot:loader="{ isActive }">
        <v-progress-linear
            :active="isActive"
            color="deep-purple"
            height="4"
            indeterminate
        ></v-progress-linear>
        </template>

        <v-img
        height="130"
        src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
        cover
        ></v-img>

        <v-card-item>
        <v-card-title>{{ project.name }}</v-card-title>
            <v-card-subtitle> 
                <v-icon icon="mdi-calendar-end" size="small"></v-icon>
                <span class="mx-3">{{ project.dueDate }} </span>
            </v-card-subtitle>
        </v-card-item> 
    </v-card>
</template>
<script setup>
defineProps({
    project: {
        type: Object,
        required: true
    }
})
 
</script>
