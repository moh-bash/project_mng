<template>
  <v-container>
    <h2 class="mb-6">Dashboard</h2>
    <div style="max-height: 500px;">
      <Dashboar />

    </div>
  </v-container>
</template>

<script>
import Dashboar from '@/components/Dashboar.vue';

export default {
  components: {
    Dashboar
  }
}
</script>
