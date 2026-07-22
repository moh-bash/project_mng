<template>
  <v-container class="my-16 py-10">
    <v-row align="center">
      <v-col cols="12" md="6">
        <h2 class="text-h4 font-weight-bold mb-6 text-high-emphasis">{{ $t('home.showcase.title') }}</h2>
        <p class="text-body-1 text-medium-emphasis mb-6 leading-relaxed">
          {{ $t('home.showcase.desc') }}
        </p>
        <v-list class="bg-transparent">
          <v-list-item prepend-icon="mdi-check-circle" :title="$t('home.showcase.item1')" class="text-medium-emphasis px-0"></v-list-item>
          <v-list-item prepend-icon="mdi-check-circle" :title="$t('home.showcase.item2')" class="text-medium-emphasis px-0"></v-list-item>
          <v-list-item prepend-icon="mdi-check-circle" :title="$t('home.showcase.item3')" class="text-medium-emphasis px-0"></v-list-item>
        </v-list>
      </v-col>
      <v-col cols="12" md="6">
        <v-img
          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
          alt="Showcase UI"
          class="rounded-xl elevation-6"
          cover
          aspect-ratio="16/9"
        />
      </v-col>
    </v-row>
  </v-container>
</template>