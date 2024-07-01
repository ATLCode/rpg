<template>
  <div class="inv-container">
    <div class="inv-header">Inventory</div>
    <div class="inv-content">
      <div
        v-for="(inventoryItem, index) in playerStore.inventory"
        :key="index"
        class="inv-slot"
      >
        <div
          v-if="inventoryItem && inventoryItem?.itemId !== null"
          class="item-slot"
          @contextmenu.prevent="showItemActionsMenu($event, inventoryItem)"
        >
          <div>{{ inventoryItem.item.name }}</div>

          <div class="item-img">
            <img :src="inventoryItem.item.img" class="item-icon" alt="" />
            <span>{{ inventoryItem.currentStackSize }}</span>
          </div>
        </div>
        <div v-else>Empty</div>
      </div>
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

<script setup lang="ts">
import { usePlayerStore, type InventoryItem } from "@/stores/player";
import { ContextMode } from "~/game/items";
const playerStore = usePlayerStore();

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
.inv-container {
  height: 100%;
  width: 100%;
  display: flex;
  border: 1px grey solid;
  .inv-header {
  }
  .inv-content {
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;

    padding: 5rem;
  }
  .item-icon {
    height: 48px;
    width: 48px;
  }
  .item-slot {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .item-img {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .inv-slot {
    border: 1px solid red;
  }
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
