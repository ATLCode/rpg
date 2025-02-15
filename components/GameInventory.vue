<template>
  <div class="inventory-container" @mouseleave="cancelDrag">
    <div
      v-for="(inventoryItem, index) in itemStore.playerInventory?.slots"
      :key="index"
      class="inv-slot"
      @mousedown="dragItem($event, inventoryItem, index)"
      @mouseup="dropItem(inventoryItem, index)"
    >
      <GameItem
        v-if="inventoryItem && inventoryItem?.itemId !== null"
        :game-item="inventoryItem"
        :game-item-index="index"
        :game-item-container="itemStore.playerInventory"
      />
      <GameItem v-else :empty-slot="true" />
    </div>
    <div
      v-if="draggedItem"
      class="item-img"
      :style="{ left: x + 'px', top: y + 'px' }"
    >
      <img
        :src="draggedItem.item.img"
        class="item-icon"
        alt=""
        :draggable="false"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useItemStore } from "@/stores/item";
import type { GameItem } from "~/types/item.types";
import { useMouse } from "@/composables/mouse";

const itemStore = useItemStore();

const { x, y } = useMouse();

const draggedItem = ref<GameItem | null>(null);
const draggedIndex = ref<number | null>(null);

function dragItem(event: MouseEvent, item: GameItem | null, index: number) {
  const target = event.target as HTMLTextAreaElement;
  if (
    item === null ||
    event.button === 2 ||
    !(target.className === "item-icon")
  ) {
    return;
  }
  draggedItem.value = item;
  draggedIndex.value = index;
}

// TODO  Mouseleave, but also cover gaps with something?
// TODO How to hide the item from starting spot while being dragged?

function dropItem(dropContent: GameItem | null, dropIndex: number) {
  if (!itemStore.playerInventory) {
    throw new Error("Can't find player inventory");
  }
  if (draggedIndex.value === null) {
    return;
  } else {
    itemStore.playerInventory.slots[draggedIndex.value] = dropContent;
    itemStore.playerInventory.slots[dropIndex] = draggedItem.value;
  }
  draggedItem.value = null;
  draggedIndex.value = null;
}

function cancelDrag() {
  draggedItem.value = null;
  draggedIndex.value = null;
}
</script>

<style lang="scss" scoped>
.inventory-container {
  height: fit-content;
  width: fit-content;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  // border: 1px solid red;
  border-radius: 10px;
  // gap: 10px;
}
.inv-slot {
  background-color: var(--elevation2);
  // border-radius: 10px;
}
.inv-slot:nth-child(1) {
  border-top-left-radius: 10px;
}
.inv-slot:nth-child(4) {
  border-top-right-radius: 10px;
}
.inv-slot:nth-child(25) {
  border-bottom-left-radius: 10px;
}
.inv-slot:nth-child(28) {
  border-bottom-right-radius: 10px;
}
.item-img {
  position: fixed;
  max-height: 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  pointer-events: none;
}
.item-icon {
  max-height: 48px;
  max-width: 48px;
}
</style>
