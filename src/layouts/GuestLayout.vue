<template>
  <v-container fluid fill-height>
    <v-row align="center" justify="center">
        <v-col  cols="12" sm="8" md="6" lg="4">
            <v-card class="elevation-5 px-5 my-5 pa-5">
                <router-view />
            </v-card>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'AuthLayout',
};
</script>
