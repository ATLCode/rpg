<template>
  <button
    class="button"
    type="button"
    :disabled="props.disabled"
    :style="style"
  >
    <div class="button-content">
      <div class="prepend-slot">
        <slot name="prepend" />
      </div>

      <div class="main-slot">
        <slot></slot>
      </div>
      <div class="appendslot">
        <slot name="append" />
      </div>
    </div>
  </button>
</template>
<script lang="ts" setup>
import { onMounted, reactive } from "vue";

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

watch(
  () => props.disabled,
  (newDisabled) => {
    if (newDisabled === true) {
      handleBackgroundColor("grey");
    }
    if (newDisabled === false) {
      handleBackgroundColor(props.backgroundColor);
    }
  }
);

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
  if (props.disabled) {
    handleBackgroundColor("grey");
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
.main-slot {
  margin-left: auto;
  margin-right: auto;
}
</style>
