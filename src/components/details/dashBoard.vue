<template>
    <v-row class="pa-5 mx-4">
        <v-col cols="9">
            <v-card class="mx-auto rounded-xl elevation-3" min-height="355">
                <v-card-text>
                     <v-sparkline
      :fill="fill"
      :gradient="selectedGradient"
      :line-width="lineWidth"
      :model-value="value"
      :padding="padding"
      :smooth="smooth"
      auto-draw
    ></v-sparkline>

    <v-divider></v-divider>
    <v-row>
      <v-col
        cols="12"
        md="6"
      >
        <v-row
          align="center"
          class="fill-height"
        >
          <v-item-group
            v-model="selectedGradient"
            mandatory
          >
            <v-row
              class="pt-6 pl-6"
            >
              <v-item
                v-for="(gradient, i) in gradients"
                :key="i"
                v-slot="{ active, toggle }"
                :value="gradient"
              >
                <v-card
                  :style="{
                    background: gradient.length > 1
                      ? `linear-gradient(0deg, ${gradient})`
                      : gradient[0],
                    border: '2px solid',
                    borderColor: active ? '#222' : 'white'
                  }"
                  class="me-2"
                  height="30"
                  width="30"
                  @click="toggle"
                ></v-card>
              </v-item>
            </v-row>
          </v-item-group>
        </v-row>
      </v-col>
    </v-row>
              </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>
<script>


export default{
    name: 'dashBoard',
}
</script>