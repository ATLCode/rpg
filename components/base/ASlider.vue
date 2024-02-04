<template>
  <input v-model="value" type="range" class="aslider" />
</template>
<script lang="ts" setup>
/*
   Props: Min, Max, Steps etc.
  
    const props = defineProps({
      height: {
        type: String,
        default: ''
      },
    })
    */
const value = defineModel<number>();
</script>
<style lang="scss" scoped></style>
