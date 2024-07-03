<template>
  <div class="item-info-container">
    <div>Item Info:</div>
    <div>Name: {{ props.selectedItem?.item.name }}</div>
    <div>Actions: {{ props.selectedItem?.item.actions }}</div>
    <div>Properties: {{ props.selectedItem?.item.properties }}</div>
    <div>Value: {{ props.selectedItem?.item.value }}</div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  selectedItem: {
    type: Object as PropType<InventoryItem | null>,
    default: null,
  },
});
</script>

<style lang="scss" scoped>
.item-info-container {
  position: absolute;
  background-color: var(--elevation1);
  border: 1px solid var(--elevation2);
  padding: 1rem;
}
</style>
