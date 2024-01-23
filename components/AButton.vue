<template>
  <button
    class="button"
    type="button"
    :disabled="props.disabled"
    :style="style"
  >
    <slot name="prepend" />
    <slot></slot>
    <slot name="append" />
  </button>
</template>
<script lang="ts" setup>
// TODO: Disabled
// TDOO: Variants

const props = defineProps({
  color: {
    type: String,
    default: "text",
  },
  backgroundColor: {
    type: String,
    default: "success",
  },
  variant: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  rules: {
    type: Array,
    default: null,
  },
});

const style = reactive({
  color: `var(--${props.color})`,
  "background-color": `var(--${props.backgroundColor})`,
});
</script>
<style lang="scss" scoped>
.button {
  padding: 1rem;
  border-radius: 10px;
  border: none;
  cursor: pointer;
}
</style>
