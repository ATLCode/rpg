<template>
  <div class="acard" :style="style">
    <div class="card-header">
      <div>{{ props.title }}</div>
    </div>

    <slot></slot>
  </div>
</template>
<script lang="ts" setup>
import { type CSSProperties } from "vue";

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  color: {
    type: String,
    default: "text",
  },
  backgroundColor: {
    type: String,
    default: "elevation1",
  },
  variant: {
    type: String,
    default: "",
  },
  position: {
    type: String as PropType<CSSProperties["position"]>,
    default: "relative",
  },
  padding: {
    type: [Array, String],
    default() {
      return ["1.25rem", "1.25rem", "1.25rem", "1.25rem"];
    },
  },
  height: {
    type: String,
    default: "undefined",
  },
  width: {
    type: String,
    default: "undefined",
  },
  minHeight: {
    type: String,
    default: "undefined",
  },
  minWidth: {
    type: String,
    default: "undefined",
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
  zIndex: {
    type: String,
    default: "1",
  },
});

const style = computed(() => {
  return {
    height: props.height,
    width: props.width,
    "min-height": props.minHeight,
    "min-width": props.minWidth,
    position: props.position,
    top: props.offset[0],
    right: props.offset[1],
    bottom: props.offset[2],
    left: props.offset[3],
    margin: `${props.margin[0]} ${props.margin[1]} ${props.margin[2]} ${props.margin[3]}`,
    padding: props.padding.toString(),
    color: `var(--${props.color})`,
    "background-color": `var(--${props.backgroundColor})`,
    "z-index": props.zIndex,
  };
});
</script>
<style lang="scss" scoped>
.acard {
  display: block;
  overflow: hidden;
  overflow-wrap: break-word;
  position: relative;
  padding: 1.25rem;
  text-decoration: none;
  border-radius: 4px;
}
</style>
