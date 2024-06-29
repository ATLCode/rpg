<template>
  <div v-if="value" class="dialog-mask" @click="handleOutsideClick">
    <div class="dialog-content" :style="style" @click.stop>
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps({
  height: {
    type: String,
    default: "500px",
  },
  width: {
    type: String,
    default: "500px",
  },
  fullscreen: {
    type: Boolean,
    default: false,
  },
  persistent: {
    type: Boolean,
    default: false,
  },
});

const style = reactive({
  height: props.height,
  width: props.width,
});

onMounted(() => {
  if (props.fullscreen) {
    style.height = "100vh";
    style.width = "100vw";
  }
});

const value = defineModel<boolean>();

function handleOutsideClick() {
  if (props.persistent) {
    return;
  }
  value.value = !value;
}
</script>
<style lang="scss" scoped>
.dialog-mask {
  height: 100vh;
  width: 100vw;
  z-index: 11000;
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
  background-color: var(--background);
  color: var(--text);
}
</style>
