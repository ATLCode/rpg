<template>
  <div v-if="value" class="modal-mask" @click="handleOutsideClick">
    <div class="modal-content" :style="style" @click.stop>
      <div v-if="props.title" class="modal-header">
        <ASpacer />
        <div class="header-title">{{ props.title }}</div>
        <ASpacer />
        <AButton v-if="props.closable" variant="plain" @click="value = false"
          >X</AButton
        >
      </div>
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { PropType, CSSProperties } from "vue";
import AButton from "./AButton.vue";
import ASpacer from "./ASpacer.vue";

const props = defineProps({
  height: {
    type: String,
    default: "700px",
  },
  width: {
    type: String,
    default: "1000px",
  },
  fullscreen: {
    type: Boolean,
    default: false,
  },
  persistent: {
    type: Boolean,
    default: false,
  },
  closable: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "",
  },
  position: {
    type: String as PropType<CSSProperties["position"]>,
    default: "relative",
  },
  offset: {
    type: Array<string>,
    default() {
      return ["0px", "0px", "0px", "0px"];
    },
  },
  margin: {
    type: Array<string>,
    default() {
      return ["0px", "0px", "0px", "0px"];
    },
  },
});

const style = computed(() => {
  return {
    height: props.height,
    width: props.width,
    top: props.offset[0],
    right: props.offset[1],
    bottom: props.offset[2],
    left: props.offset[3],
    margin: `${props.margin[0]} ${props.margin[1]} ${props.margin[2]} ${props.margin[3]}`,
    position: props.position,
  };
});

onMounted(() => {
  if (props.fullscreen) {
    style.value.height = "100vh";
    style.value.width = "100vw";
  }
});

const value = defineModel<boolean>();

function handleOutsideClick() {
  if (props.persistent) {
    return;
  }

  value.value = !value.value;
}
</script>
<style lang="scss" scoped>
.modal-mask {
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
  left: 0;
  bottom: 0;
}
.modal-header {
  display: flex;
  flex-direction: row;
  .header-title {
    padding: 1rem;
    font-size: x-large;
  }
}
.modal-content {
  background-color: var(--elevation1);
  color: var(--text);
}
</style>
