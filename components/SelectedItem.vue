<template>
  <div class="selected-item-container">
    <div v-if="!playerStore.selectedItem">No Item Selected</div>
    <div v-else class="selected-item">
      <div>
        <h3>{{ playerStore.selectedItem.type }}</h3>
      </div>
      <div>{{ playerStore.selectedItem.itemId }}</div>
      <div>{{ quantity }}</div>
      <ASlider
        v-model="quantity"
        :min="Number(0)"
        :max="Number(playerStore.selectedItem.maximumStackSize || 1)"
      />
      <AButton
        v-if="playerStore.selectedItem.type === GameItemType.Shop"
        @click="playerStore.buyItems(Number(quantity), props.npc)"
        >Buy Item</AButton
      >
      <AButton
        v-if="playerStore.selectedItem.type === GameItemType.Inventory"
        @click="playerStore.sellItems(Number(quantity), props.npc)"
        >Sell Item</AButton
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { usePlayerStore } from "@/stores/player";
import type { Npc } from "~/game/npcs";
import { GameItemType } from "~/types/item.types";

const playerStore = usePlayerStore();

const props = defineProps({
  npc: {
    type: Object as PropType<Npc>,
    required: true,
  },
});

const quantity = ref<string>("1");
</script>

<style lang="scss" scoped>
.selected-item-container {
  height: 100%;
  width: 100%;
  border: 1px solid grey;
}
.selected-item {
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 1rem;
}
</style>
