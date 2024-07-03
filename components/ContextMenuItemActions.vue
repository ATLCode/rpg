<template>
  <div class="menu-container" :style="{ top: y + 'px', left: x + 'px' }">
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
import { type InventoryItem, usePlayerStore } from "@/stores/player";
import { ContextMode, ItemAction } from "@/game/items";
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
    type: Object as PropType<InventoryItem | null>,
    default: null,
  },
  mode: {
    type: Number as PropType<ContextMode>,
    required: true,
  },
});

const emit = defineEmits(["close"]);

const visibleActions = computed(() => {
  const rawActions = props.selectedItem?.item.actions;

  if (props.mode === ContextMode.Inventory) {
    return rawActions?.filter((action) => action !== ItemAction.Unequip);
  }
  if (props.mode === ContextMode.Gear) {
    // Drop is shown as option for item in gear, but is bugged, need for loop to remove more than 1 word from array
    // https://stackoverflow.com/questions/11752143/remove-several-words-from-an-array-javascript
    // Either this or handle drop from gear
    return rawActions?.filter((action) => action === ItemAction.Unequip);
  }
});

function handleActionClick(action: ItemAction) {
  if (!props.selectedItem) {
    throw new Error("Selected item doesn't exist");
  }
  console.log(action);
  if (action === ItemAction.Drop) {
    console.log("Dropping");

    playerStore.removeSpecificItemFromInventory(props.selectedItem);
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
