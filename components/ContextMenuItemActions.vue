<template>
  <div class="menu-container">
    <div
      v-for="action in visibleActions"
      :key="action"
      class="action"
      @click="handleActionClick(action)"
    >
      {{ action }}
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { PropType } from "vue";
import {
  ItemAction,
  ItemContainerId,
  type GameItem,
  type ItemContainer,
} from "../types/item.types";
import { useItemStore } from "@/stores/item";

const itemStore = useItemStore();

const props = defineProps({
  clickedItem: {
    type: Object as PropType<GameItem | null>,
    default: null,
  },
  clickedItemIndex: {
    type: Number,
    default: null,
  },
  clickedItemContainer: {
    type: Object as PropType<ItemContainer | null>,
    default: null,
  },
});

const emit = defineEmits(["close"]);

const visibleActions = computed(() => {
  // const rawActions = props.clickedItem?.item.actions;
  // Form raw actions
  // Should we determine actions here based on the item or should it come from item

  let rawActions = [ItemAction.Drop];
  if (props.clickedItem?.item.equipSlot) {
    rawActions.push(ItemAction.Equip);
    rawActions.push(ItemAction.Unequip);
  }

  if (props.clickedItemContainer?.id === ItemContainerId.PlayerGear) {
    rawActions = rawActions?.filter((action) => action === ItemAction.Unequip);
  }
  if (props.clickedItemContainer?.id === ItemContainerId.PlayerInventory) {
    rawActions = rawActions?.filter((action) => action !== ItemAction.Unequip);
  }

  return rawActions;
});

function handleActionClick(action: ItemAction) {
  if (!props.clickedItem) {
    throw new Error("Selected item doesn't exist");
  }
  console.log(action);
  if (action === ItemAction.Drop) {
    console.log("Dropping");
    itemStore.removeItemFromInventoryByIndex(props.clickedItemIndex);
  }
  if (action === ItemAction.Eat) {
    console.log("Eating");
  }
  if (action === ItemAction.Equip) {
    console.log("Equipping");
  }
  if (action === ItemAction.Unequip) {
    console.log("Unequipping");
    itemStore.unequipItem(props.clickedItem);
  }
  emit("close");
}

// TODO: Context Menu can partly go below screen.
</script>
<style lang="scss" scoped>
.menu-container {
  position: absolute;
  background-color: var(--elevation1);
  min-width: 200px;
  z-index: 50;
  top: 100%;
  border: 1px solid var(--elevation2);
}
.action {
  padding: 10px;
  cursor: pointer;
}

.action:hover {
  background-color: var(--elevation2);
}
</style>
