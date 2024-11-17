<template>
  <div class="inventory-container">
    <div
      v-for="(inventoryItem, index) in itemStore.playerInventory?.slots"
      :key="index"
      class="inv-slot"
    >
      <GameItem
        v-if="inventoryItem && inventoryItem?.itemId !== null"
        :game-item="inventoryItem"
        :game-item-index="index"
        :selectable="props.shop ? true : false"
        :selected-item="itemStore.selectedItem!"
      />
      <GameItem v-else :empty-slot="true" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useItemStore } from "@/stores/item";

const itemStore = useItemStore();

const props = defineProps({
  shop: {
    type: Boolean,
    required: false,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
.inventory-container {
  height: fit-content;
  width: fit-content;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  gap: 10px;
}
</style>
