<template>
  <div v-if="value" class="dialog-mask" @click="value = !value">
    <div class="dialog-content" @click.stop>
      <slot></slot>
    </div>
  </div>
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
.dialog-mask {
  height: 100vh;
  width: 100vw;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: hsla(0, 0%, 0%, 0.5);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.dialog-content {
  background-color: white;
  color: black;
  height: 500px;
  width: 500px;
}
</style>
