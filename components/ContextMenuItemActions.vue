<template>
  <div class="menu-container" :style="{ top: y + 'px', left: x + 'px' }">
    <div>{{ modes }}</div>
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
import { ContextMode, ItemAction, type GameItem } from "../types/item.types";
const playerStore = usePlayerStore();

const props = defineProps({
  x: {
    type: Number,
    required: true,
  },
  y: {
    type: Number,
    required: true,
  },
  selectedItem: {
    type: Object as PropType<GameItem | null>,
    default: null,
  },
  modes: {
    type: Array as PropType<ContextMode[]>,
    required: true,
  },
});

const emit = defineEmits(["close"]);

const visibleActions = computed(() => {
  // const rawActions = props.selectedItem?.item.actions;
  // Form raw actions

  let rawActions = [ItemAction.Drop];
  if (props.selectedItem?.item.equipSlot) {
    rawActions.push(ItemAction.Equip);
    rawActions.push(ItemAction.Unequip);
  }

  // Filters for contexxt modes
  if (props.modes.includes(ContextMode.Inventory)) {
    rawActions = rawActions?.filter((action) => action !== ItemAction.Unequip);
  }
  if (props.modes.includes(ContextMode.Gear)) {
    return rawActions?.filter((action) => action === ItemAction.Unequip);
  }
  return rawActions;
});

function handleActionClick(action: ItemAction) {
  if (!props.selectedItem) {
    throw new Error("Selected item doesn't exist");
  }
  console.log(action);
  if (action === ItemAction.Drop) {
    console.log("Dropping");

    playerStore.removeItemFromInventoryByIndex(props.selectedItem);
  }
  if (action === ItemAction.Eat) {
    console.log("Eating");
  }
  if (action === ItemAction.Equip) {
    console.log("Equipping");
    playerStore.equipItem(props.selectedItem);
  }
  if (action === ItemAction.Unequip) {
    console.log("Unequipping");
    playerStore.unequipItem(props.selectedItem);
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
}
.action {
  padding: 10px;
  cursor: pointer;
}

.action:hover {
  background-color: var(--elevation2);
}
</style>
