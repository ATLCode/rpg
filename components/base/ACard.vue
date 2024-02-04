<template>
  <div class="acard" :style="style">
    <div>{{ props.title }}</div>
    <slot></slot>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from "vue";

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
});

const style = reactive({
  color: `var(--${props.color})`,
  "background-color": `var(--${props.backgroundColor})`,
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
