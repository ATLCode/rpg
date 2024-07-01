<template>
  <div v-if="props.inventoryItem" class="item-container">
    <div class="item-img">
      <img
        :src="items[props.inventoryItem.itemId].img"
        class="item-icon"
        alt=""
      />
    </div>
    <div>{{ props.inventoryItem.currentStackSize }}</div>
  </div>
  <div v-if="props.shopItem" class="item-container">
    <div class="item-img">
      <img :src="items[props.shopItem.itemId].img" class="item-icon" alt="" />
    </div>
    <div>{{ props.shopItem.currentStackSize }}</div>
  </div>
</template>

<script lang="ts" setup>
import { items } from "~/game/items";
import type { ShopItem } from "~/game/npcs";

const props = defineProps({
  inventoryItem: {
    type: Object as PropType<InventoryItem>,
    required: false,
    default: null,
  },
  shopItem: {
    type: Object as PropType<ShopItem>,
    required: false,
    default: null,
  },
});
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
</style>
