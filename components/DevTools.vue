<template>
  <div class="dev-container">
    <AButton @click="worldStore.sleep(100)">Test Sleep</AButton>
    <AButton @click="saveStore.updateSave()">Test Save</AButton>
    <AButton @click="testFunction">Test Function</AButton>
    <AButton @click="addGear">Get Gear</AButton>
  </div>
</template>

<script lang="ts" setup>
import { useSaveStore } from "@/stores/save";
import { useWorldStore } from "@/stores/world";
// import { useLocationStore } from "@/stores/location";
import { useItemStore } from "@/stores/item";
import { ItemId } from "~/types/item.types";
import { items } from "~/game/items";

const saveStore = useSaveStore();
const worldStore = useWorldStore();
// const locationStore = useLocationStore();
const itemStore = useItemStore();

function testFunction() {}
function addGear() {
  itemStore.addItemsToInventory(
    {
      itemId: ItemId.IronSword,
      item: items[ItemId.IronSword],
      currentStackSize: 1,
    },
    1
  );
  itemStore.addItemsToInventory(
    {
      itemId: ItemId.LeatherBoots,
      item: items[ItemId.LeatherBoots],
      currentStackSize: 1,
    },
    1
  );
}
</script>

<style lang="scss" scoped>
.dev-container {
  height: calc(100% - 59px);
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
}
</style>
