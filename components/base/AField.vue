<template>
  <div class="afield">
    <input
      v-model="value"
      class="input"
      :type="props.type"
      :placeholder="props.label"
      :disabled="props.disabled"
      :style="style"
    />
  </div>
</template>
<script lang="ts" setup>
import { reactive } from "vue";

const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  color: {
    type: String,
    default: "text",
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
  type: {
    type: String,
    default: "text",
  },
});

const value = defineModel();

const style = reactive({
  color: `var(--${props.color})`,
});
</script>
<style lang="scss" scoped>
.afield {
  display: flex;
  align-items: center;
}

.input {
  padding: 15px;
  border: 1px solid grey !important;
  border-radius: 5px;
  box-sizing: border-box;
  display: flex;
  border: 0px transparent;
  width: 100%;
  height: 100%;
  background-color: transparent;
  &:focus {
    border: 1px solid white !important;
    outline: none !important;
  }
}
</style>
