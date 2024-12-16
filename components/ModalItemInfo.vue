<template>
  <div class="item-info-container">
    <div>Item Info:</div>
    <div>Item Id: {{ props.selectedItem?.itemId }}</div>
    <div>Name: {{ props.selectedItem?.item.name }}</div>
    <div>Actions: {{ props.selectedItem?.item.actions }}</div>
    <div>Properties: {{ props.selectedItem?.item.properties }}</div>
    <div>Value: {{ props.selectedItem?.item.value }}</div>
  </div>
</template>

<script lang="ts" setup>
import type { GameItem } from "~/types/item.types";

const props = defineProps({
  selectedItem: {
    type: Object as PropType<GameItem | null>,
    default: null,
  },
});
</script>

<style lang="scss" scoped>
.item-info-container {
  position: absolute;
  background-color: var(--elevation1);
  border: 1px solid var(--elevation2);
  width: max-content;
  padding: 1rem;
  z-index: 500;
}
</style>
