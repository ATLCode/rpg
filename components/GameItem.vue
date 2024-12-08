<template>
  <div class="game-item-container">
    <div v-if="props.emptySlot" class="item-container"></div>

    <div
      v-if="props.gameItem"
      class="item-container"
      @contextmenu.prevent="showItemActionsMenu($event)"
      @mouseover="showItemInfo = true"
      @mouseleave="showItemInfo = false"
    >
      <div>{{ props.gameItem.currentStackSize }}</div>

      <div class="item-img">
        <img :src="items[props.gameItem.itemId].img" class="item-icon" alt="" />
      </div>
    </div>

    <div v-if="!(props.equipSlot === null)">
      <div
        v-if="itemStore.playerGear?.slots[props.equipSlot]"
        class="item-container gear"
        @contextmenu.prevent="showItemActionsMenu($event)"
        @mouseover="showGearInfo = true"
        @mouseleave="showGearInfo = false"
      >
        <div class="item-img">
          <img
            :src="itemStore.playerGear?.slots[props.equipSlot]?.item.img"
            class="item-icon"
            alt=""
          />
        </div>
      </div>
      <div v-else class="item-container">{{ EquipSlot[props.equipSlot] }}</div>
    </div>

    <div
      v-if="showItemActions"
      class="overlay-item"
      @click="closeItemActionsMenu"
    ></div>
    <ContextMenuItemActions
      v-if="showItemActions"
      :clicked-item="props.gameItem"
      :clicked-item-index="props.gameItemIndex"
      :clicked-item-container="props.gameItemContainer"
      @close="showItemActions = false"
    />
    <ModalItemInfo v-show="showItemInfo" :selected-item="props.gameItem" />
    <ModalItemInfo
      v-show="showGearInfo"
      :selected-item="itemStore.playerGear?.slots[props.equipSlot!]"
    />
  </div>
</template>

<script lang="ts" setup>
import {
  EquipSlot,
  type GameItem,
  type ItemContainer,
} from "../types/item.types";
import { useItemStore } from "@/stores/item";
import { items } from "~/game/items";

const props = defineProps({
  emptySlot: {
    type: Boolean,
    required: false,
    default: false,
  },
  equipSlot: {
    type: Number,
    required: false,
    default: null,
  },
  gameItem: {
    type: Object as PropType<GameItem>,
    required: false,
    default: null,
  },
  gameItemIndex: {
    type: Number,
    required: false,
    default: null,
  },
  gameItemContainer: {
    type: Object as PropType<ItemContainer>,
    required: false,
    default: undefined,
  },
  selectable: {
    type: Boolean,
    required: false,
    default: false,
  },
});

// https://medium.com/@sj.anyway/custom-right-click-context-menu-in-vue3-b323a3913684

const showItemInfo = ref(false);
const showGearInfo = ref(false);

const showItemActions = ref(false);

const itemStore = useItemStore();

function showItemActionsMenu(event: any) {
  event.preventDefault();
  showItemActions.value = true;
}
/*
function showGearActionsMenu(event: any, equipSlot: EquipSlot) {
  clickedItem.value = itemStore.gear[equipSlot];

  event.preventDefault();
  showGearActions.value = true;
}
  */
function closeItemActionsMenu() {
  showItemActions.value = false;
}
</script>

<style lang="scss" scoped>
.game-item-container {
  position: relative;
}
.item-container {
  background-color: transparent;
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
</style>
