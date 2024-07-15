<template>
  <div class="inventory-container">
    <div
      v-for="(inventoryItem, index) in playerStore.inventory"
      :key="index"
      class="inv-slot"
    >
      <GameItem
        v-if="inventoryItem && inventoryItem?.itemId !== null"
        :game-item="inventoryItem"
        :extra-context-modes="props.shop ? [ContextMode.Sell] : undefined"
        :selectable="props.shop ? true : false"
        :selected-item="playerStore.selectedItem!"
      />
      <GameItem v-else :empty-slot="true" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ContextMode } from "../types/item.types";
import { usePlayerStore } from "@/stores/player";

const playerStore = usePlayerStore();

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
