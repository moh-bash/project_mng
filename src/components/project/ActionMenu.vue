<template>
  <div>
    <v-icon
      class="m-0 p-0 px-3"
      icon="mdi-dots-vertical"
      size="small"
      variant=""
      @click="showMenuOptions"
      :loading="loading"
      :disabled="loading"
      ref="activator" 
    ></v-icon>

    <v-menu
      v-model="showDropdown"
      :target="$refs.activator"
      location="bottom end"
      scroll-strategy="close"
    >
      <v-list
        class="py-0"
        density="compact"
        item-value="code"
        item-props
        slim
      >
        <template v-for="(item, index) in items" :key="index">
          <v-list-item
            v-if="item.type !== 'divider'"
            :prepend-icon="item.prependIcon"
            :title="item.title"
            @click="selectAction(item.code)"
          ></v-list-item>
          <v-divider v-else></v-divider>
        </template>
        
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
    name: 'ActionMenu',
    
    props: {
        items: {
            type: Array,
            required: true,
        },
        loading: {
            type: Boolean,
            default: false,
        },
    },

    emits: ['select'],
    

    data() {
        return {
            showDropdown: false,
        };
    },
    
    methods: {
        async showMenuOptions() {
            if (this.showDropdown) {
                this.showDropdown = false;
                await this.$nextTick(); 
            }
            this.showDropdown = true;
        },
        
        selectAction(code) {
            this.showDropdown = false;
            this.$emit('select', code);
        },
    }
};
</script>