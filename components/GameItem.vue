<template>
  <div>
    <div v-if="props.emptySlot" class="item-container"></div>

    <div
      v-if="props.gameItem?.type === GameItemType.Inventory"
      class="item-container"
      :class="{
        selected: props.gameItem === props.selectedItem && props.selectable,
      }"
      @contextmenu.prevent="showItemActionsMenu($event, props.gameItem)"
      @mouseover="showItemInfo = true"
      @mouseleave="showItemInfo = false"
      @click="selectItem"
    >
      <div>{{ props.gameItem.currentStackSize }}</div>

      <div class="item-img">
        <img :src="items[props.gameItem.itemId].img" class="item-icon" alt="" />
      </div>
    </div>

    <div
      v-if="props.gameItem?.type === GameItemType.Shop"
      class="item-container"
      :class="{
        selected: props.gameItem === props.selectedItem && props.selectable,
      }"
      @mouseover="showItemInfo = true"
      @mouseleave="showItemInfo = false"
      @click="selectItem"
    >
      <div>
        {{ props.gameItem.currentStackSize }}
      </div>
      <div class="item-img">
        <img
          :src="items[props.gameItem.itemId as keyof Record<ItemId, Item>].img"
          class="item-icon"
          alt=""
        />
      </div>
    </div>

    <div v-if="props.equipSlot">
      <div
        v-if="playerStore.gear[props.equipSlot]"
        class="item-container gear"
        @contextmenu.prevent="showGearActionsMenu($event, props.equipSlot)"
        @mouseover="showGearInfo = true"
        @mouseleave="showGearInfo = false"
      >
        <div class="item-img">
          <img
            :src="playerStore.gear[props.equipSlot]?.item.img"
            class="item-icon"
            alt=""
          />
        </div>
      </div>
      <div v-else class="item-container">{{ props.equipSlot }}</div>
    </div>

    <div
      v-if="showItemActions"
      class="overlay-item"
      @click="closeItemActionsMenu"
    ></div>
    <ContextMenuItemActions
      v-if="showItemActions"
      :x="menuX"
      :y="menuY"
      :selected-item="clickedItem"
      :modes="[ContextMode.Inventory]"
      @close="showItemActions = false"
    />
    <div
      v-if="showGearActions"
      class="overlay-gear"
      @click="closeGearActionsMenu"
    ></div>
    <ContextMenuItemActions
      v-if="showGearActions"
      :x="menuX"
      :y="menuY"
      :selected-item="clickedItem"
      :modes="[ContextMode.Gear]"
      @close="showGearActions = false"
    />
    <ModalItemInfo v-show="showItemInfo" :selected-item="props.gameItem" />
    <ModalItemInfo
      v-show="showGearInfo"
      :selected-item="playerStore.gear[props.equipSlot!]"
    />
  </div>
</template>

<script lang="ts" setup>
import {
  EquipSlot,
  ContextMode,
  ItemId,
  GameItemType,
  type Item,
  type GameItem,
} from "../types/item.types";
import { usePlayerStore } from "@/stores/player";
import { items } from "~/game/items";
import type { ShopItem } from "~/game/npcs";

const props = defineProps({
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
  equipSlot: {
    type: String as PropType<EquipSlot>,
    required: false,
    default: undefined,
  },
  gameItem: {
    type: Object as PropType<GameItem>,
    required: false,
    default: undefined,
  },
  selectable: {
    type: Boolean,
    required: false,
    default: false,
  },
  selectedItem: {
    type: Object as PropType<GameItem> | undefined | null,
    required: false,
    default: undefined,
  },
});

// https://medium.com/@sj.anyway/custom-right-click-context-menu-in-vue3-b323a3913684

const showItemInfo = ref(false);
const showGearInfo = ref(false);

const clickedItem = ref<GameItem | null>(null);
const showItemActions = ref(false);
const showGearActions = ref(false);
const menuX = ref(0);
const menuY = ref(0);

const playerStore = usePlayerStore();

function showItemActionsMenu(event: any, inventoryItem: GameItem) {
  clickedItem.value = inventoryItem;

  event.preventDefault();
  showItemActions.value = true;
  menuX.value = event.clientX;
  menuY.value = event.clientY;
}
/*
function showItemBuyingMenu(event: any, itemId: ItemId) {
  event.preventDefault();
  showItemActions.value = true;
  menuX.value = event.clientX;
  menuY.value = event.clientY;
}
*/
function showGearActionsMenu(event: any, equipSlot: EquipSlot) {
  clickedItem.value = playerStore.gear[equipSlot];

  event.preventDefault();
  showGearActions.value = true;
  menuX.value = event.clientX;
  menuY.value = event.clientY;
}
function closeItemActionsMenu() {
  showItemActions.value = false;
}
function closeGearActionsMenu() {
  showGearActions.value = false;
}
function selectItem() {
  console.log("selecting item " + JSON.stringify(props.gameItem));
  console.log(props.selectable);
  if (props.selectable && props.gameItem) {
    playerStore.selectedItem = props.gameItem;
  }
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
.overlay-item {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  z-index: 49;
}
.overlay-gear {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  z-index: 49;
}

.overlay-item::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
}
.overlay-gear::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
}

.overlay-item:hover {
  cursor: pointer;
}

.overlay-gear:hover {
  cursor: pointer;
}
.selected {
  border: 1px solid red;
}
</style>
