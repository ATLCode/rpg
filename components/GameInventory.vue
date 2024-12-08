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
      />
      <GameItem v-else :empty-slot="true" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useItemStore } from "@/stores/item";

const itemStore = useItemStore();
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
.inv-slot {
  background-color: var(--elevation2);
  border-radius: 10px;
}
</style>
