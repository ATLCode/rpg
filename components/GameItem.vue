<template>
  <div v-if="props.emptySlot" class="item-container"></div>
  <div v-if="props.emptySlotGear" class="item-container">
    {{ props.emptySlotGear }}
  </div>
  <div
    v-if="props.inventoryItem"
    class="item-container"
    @contextmenu.prevent="showItemActionsMenu($event, props.inventoryItem)"
  >
    <div>
      {{ props.inventoryItem.currentStackSize }}
    </div>
    <div class="item-img">
      <img
        :src="items[props.inventoryItem.itemId].img"
        class="item-icon"
        alt=""
      />
    </div>
  </div>
  <div v-if="props.shopItem" class="item-container">
    <div v-if="props.shopItem.currentStackSize > 1">
      {{ props.shopItem.currentStackSize }}
    </div>
    <div class="item-img">
      <img :src="items[props.shopItem.itemId].img" class="item-icon" alt="" />
    </div>
    <div class="item-price">price</div>
  </div>
  <div v-if="props.gearItem" class="item-container gear">
    <div class="item-img">
      <img :src="gearItem" class="item-icon" alt="" />
    </div>
  </div>

  <div
    v-if="showItemActions"
    class="overlay"
    @click="closeItemActionsMenu"
  ></div>
  <ContextMenuItemActions
    v-if="showItemActions"
    :x="menuX"
    :y="menuY"
    :selected-item="selectedItem"
    :mode="ContextMode.Inventory"
    @close="showItemActions = false"
  />
</template>

<script lang="ts" setup>
import { items } from "~/game/items";
import type { ShopItem } from "~/game/npcs";
import { ContextMode } from "~/game/items";

const props = defineProps({
  inventoryItem: {
    type: Object as PropType<InventoryItem> | null | undefined,
    required: false,
    default: undefined,
  },
  shopItem: {
    type: Object as PropType<ShopItem>,
    required: false,
    default: undefined,
  },
  emptySlot: {
    type: Boolean,
    required: false,
    default: false,
  },
  emptySlotGear: {
    type: String,
    required: false,
    default: undefined,
  },
  gearItem: {
    type: String,
    required: false,
    default: undefined,
  },
});

// https://medium.com/@sj.anyway/custom-right-click-context-menu-in-vue3-b323a3913684

const selectedItem = ref<InventoryItem | null>(null);
const showItemActions = ref(false);
const menuX = ref(0);
const menuY = ref(0);

function showItemActionsMenu(event: any, inventoryItem: InventoryItem) {
  selectedItem.value = inventoryItem;
  event.preventDefault();
  showItemActions.value = true;
  menuX.value = event.clientX;
  menuY.value = event.clientY;
}
function closeItemActionsMenu() {
  showItemActions.value = false;
}
</script>

<style lang="scss" scoped>
.item-container {
  background-color: var(--elevation1);
  width: 70px;
  height: 70px;
  border-radius: 10px;
  text-align: center;
  padding: 2px;
}
.gear {
  display: flex;
  justify-content: center;
  align-items: center;
}
.item-img {
  max-height: 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.item-icon {
  max-height: 48px;
  max-width: 48px;
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  z-index: 49;
}

.overlay::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
}

.overlay:hover {
  cursor: pointer;
}
</style>
