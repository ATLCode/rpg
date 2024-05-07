<template>
  <button
    class="button"
    type="button"
    :disabled="props.disabled"
    :style="style"
  >
    <div class="button-content">
      <slot name="prepend" />
      <slot></slot>
      <slot name="append" />
    </div>
  </button>
</template>
<script lang="ts" setup>
import { onMounted, reactive } from "vue";

// TODO: Disabled
// TDOO: Variants

const props = defineProps({
  color: {
    type: String,
    default: "--text",
  },
  backgroundColor: {
    type: String,
    default: "--success",
  },
  variant: {
    type: String,
    default: "flat",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  rules: {
    type: Array,
    default: null,
  },
  padding: {
    type: String,
    default: "1rem",
  },
});

const style = reactive({
  color: "",
  "background-color": "",
  padding: props.padding,
});

function handleVariant(variant: string) {
  if (variant === "plain") {
    style["background-color"] = "transparent";
  }
}

function handleColor(color: string) {
  const id = color.charAt(0);

  if (id === "-") {
    style.color = `var(${color})`;
  } else {
    style.color = color;
  }
}
function handleBackgroundColor(color: string) {
  const id = color.charAt(0);

  if (id === "-") {
    style["background-color"] = `var(${color})`;
  } else {
    style["background-color"] = color;
  }
}

onMounted(() => {
  handleVariant(props.variant);
  handleColor(props.color);
  if (props.variant !== "plain") {
    handleBackgroundColor(props.backgroundColor);
  }
});
</script>
<style lang="scss" scoped>
.button {
  border-radius: 10px;
  border: none;
  cursor: pointer;
  .button-content {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
  }
}
</style>
