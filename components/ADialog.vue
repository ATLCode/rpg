<template>
  <dialog class="dialog" :open="value">
    <slot>test</slot>
  </dialog>
</template>
<script lang="ts" setup>
/*
const props = defineProps({
  height: {
    type: String,
    default: "",
  },
  width: {
    type: String,
    default: "",
  },
});
*/

const value = defineModel<boolean>();
</script>
<style lang="scss" scoped>
.dialog {
  height: 80vh;
  width: 80vw;
}
</style>
