<template>
  <div class="aselect">
    <select v-model="value" :disabled="props.disabled">
      <option
        v-for="item in items"
        :key="item[itemTitle]"
        :value="item[itemValue]"
      >
        {{ item[itemTitle] }}
      </option>
    </select>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  color: {
    type: String,
    default: "",
  },
  variant: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  items: {
    type: Array<any>,
    default: [],
  },
  itemTitle: {
    type: String,
    default: "",
  },
  itemValue: {
    type: String,
    default: "",
  },
});

const value = defineModel();
</script>
<style lang="scss" scoped></style>
