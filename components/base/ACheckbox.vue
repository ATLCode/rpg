<template>
  <div
    class="checkbox"
    :class="{ checked: value }"
    @click="value = !value"
  ></div>
</template>
<script lang="ts" setup>
const value = defineModel<boolean>();

/*
  const props = defineProps({
    color: {
      type: String,
      default: "",
    },
  });
  */
</script>
<style lang="scss" scoped>
.checkbox {
  width: 22px;
  height: 22px;
  box-sizing: border-box;
  border-radius: 6px;
  border: 2px solid var(--elevation2);
  background: var(--background);
  cursor: pointer;
  user-select: none;
}
.checked {
  background-color: var(--success);
  border-color: var(--success);
}
</style>
